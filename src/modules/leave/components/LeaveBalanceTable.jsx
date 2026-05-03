import { useMemo, useState } from "react";
import { LEAVE_TYPE_LABELS } from "../constants";

const LeaveBalanceTable = ({ balances, employees }) => {
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("ALL");

  const getEmployeeName = (id) => employees.find((employee) => employee.id === id)?.name || id;

  const filteredBalances = useMemo(() => {
    if (leaveTypeFilter === "ALL") return balances;
    return balances.filter((balance) => balance.leaveType === leaveTypeFilter);
  }, [balances, leaveTypeFilter]);

  const leaveTypeOptions = useMemo(
    () => ["ALL", ...Array.from(new Set(balances.map((balance) => balance.leaveType)))],
    [balances],
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Leave Balance Table</h3>
          <p className="text-sm text-slate-500">Year wise balance by employee and leave type</p>
        </div>

        <select
          value={leaveTypeFilter}
          onChange={(event) => setLeaveTypeFilter(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-cyan-500 sm:w-52"
        >
          {leaveTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type === "ALL" ? "All Leave Types" : type}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-3">Employee</th>
              <th>Leave Type</th>
              <th>Year</th>
              <th>Total Allocated</th>
              <th>Used</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {filteredBalances.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400">
                  No balances found for selected filters.
                </td>
              </tr>
            ) : (
              filteredBalances.map((balance) => (
                <tr key={`${balance.employeeId}-${balance.leaveType}-${balance.year}`} className="border-b border-slate-100">
                  <td className="py-3 font-semibold text-slate-700">{getEmployeeName(balance.employeeId)}</td>
                  <td>{LEAVE_TYPE_LABELS[balance.leaveType] || balance.leaveType}</td>
                  <td>{balance.year}</td>
                  <td>{balance.totalAllocated}</td>
                  <td>{balance.used}</td>
                  <td className="font-semibold">
                    <span
                      className={
                        balance.remaining <= 2
                          ? "rounded-lg bg-rose-100 px-2 py-1 text-rose-700"
                          : "rounded-lg bg-cyan-100 px-2 py-1 text-cyan-700"
                      }
                    >
                      {balance.remaining}
                    </span>
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

export default LeaveBalanceTable;
