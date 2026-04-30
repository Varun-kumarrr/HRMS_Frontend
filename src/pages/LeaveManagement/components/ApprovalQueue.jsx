import { STATUS, STATUS_COLORS, STATUS_LABELS, LEAVE_TYPE_LABELS, ROLES } from '../constants';

const ApprovalQueue = ({ requests, onUpdateStatus, role }) => {
  const actionable = requests.filter((r) =>
    r.status === STATUS.PENDING || r.status === STATUS.MANAGER_APPROVED
  );

  const canManagerAct = role === ROLES.MANAGER || role === ROLES.HR;
  const canHRAct = role === ROLES.HR;

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Approval Queue</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {role === ROLES.HR
              ? 'Review manager-approved requests and finalize.'
              : 'Approve or reject pending leave requests.'}
          </p>
        </div>
        <span className="text-sm text-gray-400">{actionable.length} pending action{actionable.length !== 1 ? 's' : ''}</span>
      </div>

      {actionable.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No requests pending your action.</div>
      ) : (
        <div className="space-y-3">
          {actionable.map((r) => (
            <div key={r.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800">{r.employeeName}</p>
                    <span className="text-xs text-gray-400">({r.employeeId})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">
                      {r.leaveType} — {LEAVE_TYPE_LABELS[r.leaveType]}
                    </span>
                    <span>{r.startDate} → {r.endDate}</span>
                    <span className="font-medium text-gray-700">{r.totalDays} day{r.totalDays !== 1 ? 's' : ''}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 italic">"{r.reason}"</p>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_COLORS[r.status]}`}
                >
                  {STATUS_LABELS[r.status]}
                </span>
              </div>

              {/* Action buttons */}
              <div className="mt-3 flex flex-wrap gap-2">
                {/* Manager actions: can approve/reject PENDING */}
                {r.status === STATUS.PENDING && canManagerAct && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(r.id, STATUS.MANAGER_APPROVED)}
                      className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      ✓ Manager Approve
                    </button>
                    <button
                      onClick={() => onUpdateStatus(r.id, STATUS.REJECTED)}
                      className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      ✕ Reject
                    </button>
                  </>
                )}

                {/* HR actions: finalize MANAGER_APPROVED → HR_APPROVED */}
                {r.status === STATUS.MANAGER_APPROVED && canHRAct && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(r.id, STATUS.HR_APPROVED)}
                      className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      ✓ HR Finalize
                    </button>
                    <button
                      onClick={() => onUpdateStatus(r.id, STATUS.REJECTED)}
                      className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      ✕ Reject
                    </button>
                  </>
                )}

                {/* Manager seeing a MANAGER_APPROVED but not HR */}
                {r.status === STATUS.MANAGER_APPROVED && !canHRAct && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                    Awaiting HR finalization
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;
