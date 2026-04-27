const ApprovalQueue = ({ requests, onUpdateStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800">Approval Queue</h3>
      <p className="text-sm text-gray-500 mt-1">Manager / HR can approve or reject pending leaves.</p>

      <div className="mt-4 space-y-3 max-h-[520px] overflow-y-auto pr-1">
        {requests.map((r) => (
          <div key={r.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-800">{r.employee}</p>
                <p className="text-sm text-gray-500 mt-0.5">{r.from} → {r.to} | {r.type} | {r.days} days</p>
                <p className="text-sm text-gray-600 mt-2">{r.reason}</p>
              </div>
              <div className="text-sm">
                <div className={`px-2 py-1 rounded-full ${r.status==='Pending' ? 'bg-amber-100 text-amber-700' : r.status==='Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {r.status}
                </div>
              </div>
            </div>

            {r.status === 'Pending' && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Approve this leave request?')) onUpdateStatus(r.id, 'Approved');
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Reject this leave request?')) onUpdateStatus(r.id, 'Rejected');
                  }}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalQueue;
