import { CANDIDATE_STATUS, CANDIDATE_STATUS_COLORS } from '../constants';

const CandidatePipelineBoard = ({ candidates, onUpdateStatus, onViewDetails }) => {
  const statusOrder = [
    'Applied',
    'Shortlisted',
    'Interview Scheduled',
    'Interviewed',
    'Offer Extended',
    'Offer Accepted',
    'Hired',
    'Rejected',
    'Withdrawn',
  ];

  const groupedByStatus = statusOrder.reduce((acc, status) => {
    acc[status] = candidates.filter((c) => c.status === status);
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 p-4 shadow-sm">
      <div className="flex gap-4" style={{ minWidth: 'fit-content' }}>
        {statusOrder.map((status) => (
          <div key={status} className="w-80 flex-shrink-0">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className={`border-b border-slate-200 px-4 py-3 ${JOB_STATUS_COLORS_LIGHT[status]}`}>
                <h3 className="font-semibold text-slate-900">{status}</h3>
                <p className="mt-1 text-xs text-slate-500">{groupedByStatus[status].length} candidate(s)</p>
              </div>

              <div className="min-h-96 space-y-3 p-4">
                {groupedByStatus[status].length === 0 ? (
                  <p className="py-8 text-center text-sm text-slate-400">No candidates</p>
                ) : (
                  groupedByStatus[status].map((candidate) => (
                    <div
                      key={candidate.id}
                      className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-3 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                      onClick={() => onViewDetails(candidate)}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-slate-900">{candidate.name}</h4>
                          <p className="text-xs text-slate-500">{candidate.currentCompany}</p>
                        </div>
                        {candidate.ratings && candidate.ratings.technical > 0 && (
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < candidate.ratings.technical ? 'text-amber-400' : 'text-slate-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="mb-3 text-xs text-slate-600">{candidate.experience} yrs exp.</p>

                      <div className={`mb-3 rounded-full border px-3 py-1 text-center text-xs font-semibold ${CANDIDATE_STATUS_COLORS[candidate.status]}`}>
                        {candidate.status}
                      </div>

                      <div className="flex gap-1">
                        <button
                          className="flex-1 rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white transition hover:bg-slate-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(candidate);
                          }}
                        >
                          View
                        </button>
                        <select
                          className="flex-1 rounded-full border border-slate-300 px-2 py-1 text-xs transition hover:border-slate-400"
                          value={candidate.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            onUpdateStatus(candidate.id, e.target.value);
                          }}
                        >
                          {statusOrder.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Lighter colors for column headers
const JOB_STATUS_COLORS_LIGHT = {
  Applied: 'bg-gradient-to-r from-sky-50 to-cyan-50',
  Shortlisted: 'bg-gradient-to-r from-indigo-50 to-violet-50',
  'Interview Scheduled': 'bg-gradient-to-r from-purple-50 to-fuchsia-50',
  Interviewed: 'bg-gradient-to-r from-amber-50 to-yellow-50',
  'Offer Extended': 'bg-gradient-to-r from-emerald-50 to-green-50',
  'Offer Accepted': 'bg-gradient-to-r from-emerald-50 to-teal-50',
  Hired: 'bg-gradient-to-r from-green-100 to-emerald-50',
  Rejected: 'bg-gradient-to-r from-red-50 to-rose-50',
  Withdrawn: 'bg-gradient-to-r from-slate-100 to-slate-50',
};

export default CandidatePipelineBoard;
