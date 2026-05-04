import { LEAVE_TYPES, LEAVE_TYPE_LABELS } from '../constants';

const ApplyLeaveForm = ({ form, onChange, onSubmit, balances, currentEmployeeId, message }) => {
  // Find balance record for selected type
  const balanceRecord = balances.find(
    (b) =>
      b.employeeId === currentEmployeeId &&
      b.leaveType === form.leaveType &&
      b.year === new Date().getFullYear()
  );
  const remaining = balanceRecord ? balanceRecord.remaining : 0;
  const insufficient = form.totalDays > remaining;
  const isSubmitDisabled = form.totalDays <= 0 || insufficient || !balanceRecord;

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800">Apply for Leave</h3>
      <p className="text-sm text-gray-500 mt-1">Fill details and submit for manager approval.</p>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LEAVE_TYPES.map((t) => {
              const bal = balances.find(
                (b) => b.employeeId === currentEmployeeId && b.leaveType === t && b.year === new Date().getFullYear()
              );
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onChange('leaveType', t)}
                  className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 text-sm transition ${
                    form.leaveType === t
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
                  }`}
                >
                  <span className="font-bold text-base">{t}</span>
                  <span className="text-xs text-gray-500">{LEAVE_TYPE_LABELS[t]}</span>
                  {bal ? (
                    <span className={`mt-1 text-xs font-semibold ${bal.remaining === 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {bal.remaining} left
                    </span>
                  ) : (
                    <span className="mt-1 text-xs text-gray-400">Not allocated</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => onChange('startDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={form.endDate}
              min={form.startDate}
              onChange={(e) => onChange('endDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Total days indicator */}
        {form.totalDays > 0 && (
          <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${insufficient ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
            <span>
              <strong>{form.totalDays}</strong> working day{form.totalDays !== 1 ? 's' : ''} selected
              {balanceRecord
                ? ` · ${remaining} day${remaining !== 1 ? 's' : ''} remaining in ${form.leaveType}`
                : ` · No balance allocated for ${form.leaveType}`}
            </span>
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
          <textarea
            rows={3}
            value={form.reason}
            onChange={(e) => onChange('reason', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Brief reason for leave"
          />
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-sm rounded-lg px-3 py-2.5 border ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-2.5 rounded-lg font-semibold transition ${
            isSubmitDisabled
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default ApplyLeaveForm;
