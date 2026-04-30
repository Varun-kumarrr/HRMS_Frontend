import axios from "axios";
import {
  EMPLOYEES,
  HOLIDAYS,
  INITIAL_BALANCES,
  INITIAL_REQUESTS,
  LEAVE_STATUS,
  LEAVE_TYPES,
} from "../constants";

let leaveBalances = [...INITIAL_BALANCES];
let leaveRequests = [...INITIAL_REQUESTS];

const json = (data, status = 200, statusText = "OK") => ({
  data,
  status,
  statusText,
  headers: {},
  config: {},
});

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === "string") return JSON.parse(body);
  return body;
};

const getBalanceKey = (item) => `${item.employeeId}-${item.leaveType}-${item.year}`;

const api = axios.create({
  adapter: async (config) => {
    const method = (config.method || "get").toLowerCase();
    const url = config.url || "";
    const params = config.params || {};

    if (method === "get" && url === "/leave/meta") {
      return json({ leaveTypes: LEAVE_TYPES, employees: EMPLOYEES });
    }

    if (method === "get" && url === "/leave/holidays") {
      return json(HOLIDAYS);
    }

    if (method === "get" && url === "/leave/balance") {
      const target = leaveBalances.find(
        (b) =>
          b.employeeId === params.employeeId &&
          b.leaveType === params.leaveType &&
          Number(b.year) === Number(params.year),
      );

      if (!target) {
        return json({ message: "Leave balance not found" }, 404, "Not Found");
      }

      return json(target);
    }

    if (method === "get" && url === "/leave/balances") {
      const filtered = leaveBalances.filter((b) => {
        if (params.employeeId && b.employeeId !== params.employeeId) return false;
        if (params.year && Number(b.year) !== Number(params.year)) return false;
        return true;
      });
      return json(filtered);
    }

    if (method === "post" && url === "/leave/balances") {
      const payload = parseBody(config.data);
      const record = {
        employeeId: payload.employeeId,
        leaveType: payload.leaveType,
        year: Number(payload.year),
        totalAllocated: Number(payload.totalAllocated),
        used: 0,
        remaining: Number(payload.totalAllocated),
      };

      const index = leaveBalances.findIndex((b) => getBalanceKey(b) === getBalanceKey(record));
      if (index >= 0) {
        leaveBalances[index] = { ...record };
      } else {
        leaveBalances = [record, ...leaveBalances];
      }
      return json(record, 201, "Created");
    }

    if (method === "get" && url === "/leave/requests") {
      const filtered = leaveRequests.filter((r) => {
        if (params.employeeId && r.employeeId !== params.employeeId) return false;
        if (params.managerId && r.managerId !== params.managerId) return false;
        return true;
      });
      return json(filtered);
    }

    if (method === "post" && url === "/leave/requests") {
      const payload = parseBody(config.data);
      const balance = leaveBalances.find(
        (b) =>
          b.employeeId === payload.employeeId &&
          b.leaveType === payload.leaveType &&
          Number(b.year) === Number(payload.year),
      );

      if (!balance) {
        return json(
          { message: "No leave allocation found for selected employee/type/year" },
          400,
          "Bad Request",
        );
      }

      if (Number(balance.remaining) < Number(payload.totalDays)) {
        return json({ message: "Insufficient leave balance" }, 400, "Bad Request");
      }

      const newRequest = {
        id: `LR-${Date.now()}`,
        employeeId: payload.employeeId,
        leaveType: payload.leaveType,
        startDate: payload.startDate,
        endDate: payload.endDate,
        totalDays: Number(payload.totalDays),
        status: LEAVE_STATUS.PENDING,
        reason: payload.reason,
        year: Number(payload.year),
        managerId: payload.managerId,
      };

      leaveRequests = [newRequest, ...leaveRequests];
      return json(newRequest, 201, "Created");
    }

    if (method === "patch" && url.startsWith("/leave/requests/") && url.endsWith("/manager")) {
      const payload = parseBody(config.data);
      const id = url.split("/")[3];

      leaveRequests = leaveRequests.map((request) => {
        if (request.id !== id) return request;
        if (request.status !== LEAVE_STATUS.PENDING) return request;

        return {
          ...request,
          status: payload.action === "approve" ? LEAVE_STATUS.MANAGER_APPROVED : LEAVE_STATUS.REJECTED,
        };
      });

      return json({ success: true });
    }

    if (method === "patch" && url.startsWith("/leave/requests/") && url.endsWith("/finalize")) {
      const id = url.split("/")[3];
      const request = leaveRequests.find((item) => item.id === id);

      if (!request) {
        return json({ message: "Request not found" }, 404, "Not Found");
      }

      if (request.status !== LEAVE_STATUS.MANAGER_APPROVED) {
        return json({ message: "Only manager approved request can be finalized" }, 400, "Bad Request");
      }

      const balanceIndex = leaveBalances.findIndex(
        (b) =>
          b.employeeId === request.employeeId &&
          b.leaveType === request.leaveType &&
          Number(b.year) === Number(request.year),
      );

      if (balanceIndex < 0) {
        return json({ message: "Matching leave balance not found" }, 404, "Not Found");
      }

      const currentBalance = leaveBalances[balanceIndex];
      if (currentBalance.remaining < request.totalDays) {
        return json({ message: "Cannot finalize. Remaining balance too low." }, 400, "Bad Request");
      }

      const used = currentBalance.used + request.totalDays;
      leaveBalances[balanceIndex] = {
        ...currentBalance,
        used,
        remaining: currentBalance.totalAllocated - used,
      };

      leaveRequests = leaveRequests.map((item) =>
        item.id === id ? { ...item, status: LEAVE_STATUS.HR_APPROVED } : item,
      );

      return json({ success: true });
    }

    return json({ message: `Unknown route: ${method.toUpperCase()} ${url}` }, 404, "Not Found");
  },
});

export const leaveService = {
  getMeta: async () => (await api.get("/leave/meta")).data,
  getHolidays: async () => (await api.get("/leave/holidays")).data,
  getBalances: async (params = {}) => (await api.get("/leave/balances", { params })).data,
  getBalanceByKey: async (params) => (await api.get("/leave/balance", { params })).data,
  allocateLeave: async (payload) => (await api.post("/leave/balances", payload)).data,
  getRequests: async (params = {}) => (await api.get("/leave/requests", { params })).data,
  applyLeave: async (payload) => (await api.post("/leave/requests", payload)).data,
  managerDecision: async (requestId, action) =>
    (await api.patch(`/leave/requests/${requestId}/manager`, { action })).data,
  finalizeLeave: async (requestId) => (await api.patch(`/leave/requests/${requestId}/finalize`)).data,
};
