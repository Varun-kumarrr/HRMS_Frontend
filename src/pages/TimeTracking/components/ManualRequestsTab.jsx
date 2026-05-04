import { CircleCheck, CircleX } from "lucide-react";

const RequestStatusBadge = ({ status }) => {
  const statusClass =
    status === "Approved"
      ? "bg-green-100 text-green-700"
      : status === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-700";

  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusClass}`}>{status}</span>;
};

const ManualRequestsTab = ({
  requestForm,
  requestMessage,
  requests,
  onDateChange,
  onTypeChange,
  onReasonChange,
  onSubmit,
  onUpdateStatus,
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Submit Manual Entry</h3>
        <p className="text-sm text-gray-500 mt-1">
          Use this when punch data is missing due to network or device issues.
        </p>

        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Request Date</label>
            <input
              type="date"
              value={requestForm.date}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Request Type</label>
            <select
              value={requestForm.type}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Missed Punch-In</option>
              <option>Missed Punch-Out</option>
              <option>Regularization</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Reason</label>
            <textarea
              rows={4}
              value={requestForm.reason}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="Write reason for attendance correction request"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {requestMessage && (
            <p className="text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-2.5">
              {requestMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit For Approval
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Approval Queue</h3>
        <p className="text-sm text-gray-500 mt-1">Manager or HR can approve or reject pending requests.</p>

        <div className="mt-4 space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {requests.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-800">{item.employee}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.date} | {item.type}</p>
                  <p className="text-sm text-gray-600 mt-2">{item.reason}</p>
                </div>
                <RequestStatusBadge status={item.status} />
              </div>

              {item.status === "Pending" && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onUpdateStatus(item.id, "Approved")}
                    className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-lg"
                  >
                    <CircleCheck size={15} /> Approve
                  </button>
                  <button
                    onClick={() => onUpdateStatus(item.id, "Rejected")}
                    className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg"
                  >
                    <CircleX size={15} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualRequestsTab;
