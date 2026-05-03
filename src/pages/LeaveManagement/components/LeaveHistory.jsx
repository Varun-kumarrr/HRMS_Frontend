import { STATUS_COLORS, STATUS_LABELS, LEAVE_TYPE_LABELS } from '../constants';

const StatusBadge = ({ status }) => (
  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
    {STATUS_LABELS[status] || status}
  </span>
);

const LeaveHistory = ({ requests, employeeFilter }) => {
  const rows = employeeFilter
    ? requests.filter((r) => r.employeeId === employeeFilter)
    : requests;

  const exportCsv = () => {
    const header = 'Employee,Leave Type,Start Date,End Date,Days,Reason,Status\n';
    const body = rows
      .map(
        (r) =>
          `${r.employeeName},${r.leaveType},${r.startDate},${r.endDate},${r.totalDays},"${r.reason}",${STATUS_LABELS[r.status] || r.status}`
      )
      .join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leave-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Leave History</h3>
          <p className="text-sm text-gray-500 mt-0.5">Full audit trail of all leave requests.</p>
        </div>
        <button
          onClick={exportCsv}
          className="flex items-center gap-1.5 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ↓ Export CSV
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No leave history found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3 rounded-tl-lg">Employee</th>
                <th className="px-4 py-3">Leave Type</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3 text-center">Days</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.employeeName}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-blue-700">{r.leaveType}</span>
                    <span className="text-gray-400 ml-1 hidden sm:inline text-xs">
                      {LEAVE_TYPE_LABELS[r.leaveType]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.startDate}</td>
                  <td className="px-4 py-3 text-gray-600">{r.endDate}</td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-700">{r.totalDays}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">{r.reason}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveHistory;
