import { useEffect, useMemo, useState } from "react";
import { leaveService } from "../services/leaveService";
import { LEAVE_STATUS } from "../constants";

const toIsoDate = (value) => new Date(value).toISOString().slice(0, 10);

const countLeaveDays = (startDate, endDate, holidays) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) return 0;

  const holidaySet = new Set(holidays.map((holiday) => holiday.date));
  let total = 0;

  for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const day = cursor.getDay();
    const iso = toIsoDate(cursor);

    if (day === 0 || day === 6) continue;
    if (holidaySet.has(iso)) continue;
    total += 1;
  }

  return total;
};

export const useLeaveManagement = (user) => {
  const currentYear = new Date().getFullYear();
  const role = (user?.role || "employee").toLowerCase();

  const [meta, setMeta] = useState({ leaveTypes: [], employees: [] });
  const [holidays, setHolidays] = useState([]);
  const [balances, setBalances] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const employeeId = user?.employeeId || "EMP001";
  const managerId = user?.employeeId || "MGR001";

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [metaData, holidayData, balanceData, requestData] = await Promise.all([
        leaveService.getMeta(),
        leaveService.getHolidays(),
        leaveService.getBalances(role === "employee" ? { employeeId, year: selectedYear } : { year: selectedYear }),
        leaveService.getRequests(
          role === "employee"
            ? { employeeId }
            : role === "manager"
              ? { managerId }
              : {},
        ),
      ]);

      setMeta(metaData);
      setHolidays(holidayData);
      setBalances(balanceData);
      setRequests(requestData);
    } catch (loadError) {
      setError(loadError?.response?.data?.message || "Unable to load leave management data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedYear, role]);

  const applyLeave = async (payload) => {
    setError("");
    setNotice("");

    const totalDays = countLeaveDays(payload.startDate, payload.endDate, holidays);
    if (totalDays <= 0) {
      setError("Selected dates do not contain any working day after holiday/weekend exclusion");
      return false;
    }

    try {
      const year = new Date(payload.startDate).getFullYear();
      await leaveService.getBalanceByKey({ employeeId: payload.employeeId, leaveType: payload.leaveType, year });

      await leaveService.applyLeave({
        ...payload,
        totalDays,
        year,
      });

      await loadData();
      setNotice("Leave request submitted with PENDING status.");
      return true;
    } catch (submitError) {
      setError(submitError?.response?.data?.message || "Failed to submit leave request");
      return false;
    }
  };

  const allocateLeave = async (payload) => {
    setError("");
    setNotice("");

    try {
      await leaveService.allocateLeave(payload);
      await loadData();
      setNotice("Leave allocated successfully.");
      return true;
    } catch (allocationError) {
      setError(allocationError?.response?.data?.message || "Failed to allocate leave");
      return false;
    }
  };

  const takeManagerAction = async (requestId, action) => {
    setError("");
    setNotice("");

    try {
      await leaveService.managerDecision(requestId, action);
      await loadData();
      setNotice(action === "approve" ? "Leave moved to manager approved state." : "Leave request rejected.");
      return true;
    } catch (decisionError) {
      setError(decisionError?.response?.data?.message || "Failed to update request");
      return false;
    }
  };

  const finalizeLeave = async (requestId) => {
    setError("");
    setNotice("");

    try {
      await leaveService.finalizeLeave(requestId);
      await loadData();
      setNotice("Leave finalized and balance deducted.");
      return true;
    } catch (finalizeError) {
      setError(finalizeError?.response?.data?.message || "Failed to finalize request");
      return false;
    }
  };

  const stats = useMemo(() => {
    const pending = requests.filter((r) => r.status === LEAVE_STATUS.PENDING).length;
    const managerApproved = requests.filter((r) => r.status === LEAVE_STATUS.MANAGER_APPROVED).length;
    const hrApproved = requests.filter((r) => r.status === LEAVE_STATUS.HR_APPROVED).length;
    const rejected = requests.filter((r) => r.status === LEAVE_STATUS.REJECTED).length;

    return {
      total: requests.length,
      pending,
      managerApproved,
      hrApproved,
      rejected,
      totalRemaining: balances.reduce((acc, current) => acc + Number(current.remaining), 0),
    };
  }, [requests, balances]);

  return {
    role,
    employeeId,
    managerId,
    selectedYear,
    setSelectedYear,
    loading,
    error,
    notice,
    stats,
    holidays,
    balances,
    requests,
    leaveTypes: meta.leaveTypes,
    employees: meta.employees,
    applyLeave,
    allocateLeave,
    takeManagerAction,
    finalizeLeave,
    countLeaveDays: (startDate, endDate) => countLeaveDays(startDate, endDate, holidays),
  };
};
