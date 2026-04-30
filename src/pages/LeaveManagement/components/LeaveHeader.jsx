import { ROLES } from '../constants';

const LeaveHeader = ({ role, onRoleChange, stats }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Leave Management</h2>
          <p className="text-blue-100 text-sm mt-1">Apply, allocate, approve and track leaves for your team.</p>
        </div>
        {/* Role switcher — for demo purposes */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
          {Object.values(ROLES).map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                role === r ? 'bg-white text-blue-700' : 'text-white hover:bg-white/30'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        {[
          { label: 'Total Requests', value: stats.total, color: 'bg-white/20' },
          { label: 'Pending',        value: stats.pending,         color: 'bg-yellow-400/30' },
          { label: 'Manager Approved', value: stats.managerApproved, color: 'bg-blue-300/30' },
          { label: 'HR Approved',    value: stats.hrApproved,      color: 'bg-green-400/30' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${color} rounded-xl p-3 text-center`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-blue-100 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveHeader;
