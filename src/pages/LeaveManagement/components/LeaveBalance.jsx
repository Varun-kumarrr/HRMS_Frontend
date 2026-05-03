import { LEAVE_TYPE_LABELS } from '../constants';

const LeaveBalance = ({ balances, employeeFilter }) => {
  const rows = employeeFilter
    ? balances.filter((b) => b.employeeId === employeeFilter)
    : balances;

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Leave Balance</h3>
          <p className="text-sm text-gray-500 mt-0.5">Allocated, used and remaining days per employee.</p>
        </div>
        <span className="text-sm text-gray-400">{rows.length} record{rows.length !== 1 ? 's' : ''}</span>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No leave balances found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3 rounded-tl-lg">Employee</th>
                <th className="px-4 py-3">Leave Type</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3 text-center">Allocated</th>
                <th className="px-4 py-3 text-center">Used</th>
                <th className="px-4 py-3 text-center rounded-tr-lg">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{b.employeeName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <span className="font-semibold text-blue-700">{b.leaveType}</span>
                      <span className="text-gray-400 hidden sm:inline">— {LEAVE_TYPE_LABELS[b.leaveType]}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{b.year}</td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-700">{b.totalAllocated}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${b.used > 0 ? 'text-orange-600' : 'text-gray-400'}`}>{b.used}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        b.remaining === 0
                          ? 'bg-red-100 text-red-700'
                          : b.remaining <= 3
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {b.remaining} days
                    </span>
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

export default LeaveBalance;
