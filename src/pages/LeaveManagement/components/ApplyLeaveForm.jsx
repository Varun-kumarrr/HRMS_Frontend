const ApplyLeaveForm = ({ form, onChange, onSubmit, balances, message }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800">Apply for Leave</h3>
      <p className="text-sm text-gray-500 mt-1">Fill details and submit for manager approval.</p>

      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Leave Type</label>
          <select
            value={form.type}
            onChange={(e) => onChange('type', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(balances).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">From</label>
            <input
              type="date"
              value={form.from}
              onChange={(e) => onChange('from', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">To</label>
            <input
              type="date"
              value={form.to}
              onChange={(e) => onChange('to', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Reason</label>
          <textarea
            rows={3}
            value={form.reason}
            onChange={(e) => onChange('reason', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Reason for leave"
          />
        </div>

        <div className="text-sm text-gray-600">Estimated days: <strong>{form.days || 0}</strong></div>

        {message && <p className="text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-2.5">{message}</p>}

        <button
          type="submit"
          disabled={form.days <= 0 || form.days > (balances[form.type] || 0)}
          aria-disabled={form.days <= 0 || form.days > (balances[form.type] || 0)}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            form.days <= 0 || form.days > (balances[form.type] || 0)
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
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
