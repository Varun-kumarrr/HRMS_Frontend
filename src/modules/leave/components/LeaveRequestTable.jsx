import { useMemo, useState } from "react";
import { STATUS_STYLES } from "../constants";

const statusLabel = {
  PENDING: "PENDING",
  MANAGER_APPROVED: "MANAGER APPROVED",
  HR_APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const LeaveRequestTable = ({ role, requests, employees, onManagerAction, onFinalize }) => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("ALL");

  const getName = (id) => employees.find((item) => item.id === id)?.name || id;

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      if (statusFilter !== "ALL" && request.status !== statusFilter) return false;
      if (leaveTypeFilter !== "ALL" && request.leaveType !== leaveTypeFilter) return false;
      return true;
    });
  }, [requests, statusFilter, leaveTypeFilter]);

  const leaveTypeOptions = useMemo(
    () => ["ALL", ...Array.from(new Set(requests.map((request) => request.leaveType)))],
    [requests],
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Leave Request Table</h3>
          <p className="text-sm text-slate-500">Track pending, approvals, rejection and HR finalization.</p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="MANAGER_APPROVED">Manager Approved</option>
            <option value="HR_APPROVED">HR Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={leaveTypeFilter}
            onChange={(event) => setLeaveTypeFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500"
          >
            {leaveTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option === "ALL" ? "All Leave Types" : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-3">Employee</th>
              <th>Leave Type</th>
              <th>Days</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400">
                  No leave requests to display.
                </td>
              </tr>
            ) : (
              filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-slate-100">
                  <td className="py-3">
                    <p className="font-semibold text-slate-700">{getName(request.employeeId)}</p>
                    <p className="text-xs text-slate-400">{request.employeeId}</p>
                  </td>
                  <td>{request.leaveType}</td>
                  <td>{request.totalDays}</td>
                  <td>
                    {request.startDate} to {request.endDate}
                  </td>
                  <td>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[request.status]}`}>
                      {statusLabel[request.status] || request.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {role === "manager" && request.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => onManagerAction(request.id, "approve")}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onManagerAction(request.id, "reject")}
                            className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500"
                          >
                            Reject
                          </button>
                        </>
                      ) : null}

                      {(role === "admin" || role === "hr") && request.status === "MANAGER_APPROVED" ? (
                        <button
                          onClick={() => onFinalize(request.id)}
                          className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                        >
                          Finalize
                        </button>
                      ) : null}

                      {(role === "admin" || role === "hr") && request.status === "PENDING" ? (
                        <button
                          onClick={() => onManagerAction(request.id, "reject")}
                          className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500"
                        >
                          Reject
                        </button>
                      ) : null}

                      {role === "employee" ? <span className="text-xs text-slate-400">No actions</span> : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequestTable;
