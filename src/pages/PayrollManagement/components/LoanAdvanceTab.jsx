import { IndianRupee, CircleCheck, CircleX } from "lucide-react";

const LoanAdvanceTab = ({ form, requests, onChange, onSubmit, onUpdateStatus, message }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Loan / Advance Request</h3>
          <IndianRupee className="text-blue-500" size={20} />
        </div>

        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Employee</label>
            <input value={form.employee} onChange={(e) => onChange('employee', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Employee name" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Amount</label>
              <input type="number" min="0" value={form.amount} onChange={(e) => onChange('amount', Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tenure (months)</label>
              <input type="number" min="1" value={form.tenure} onChange={(e) => onChange('tenure', Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Purpose</label>
            <textarea rows={3} value={form.purpose} onChange={(e) => onChange('purpose', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Reason for loan / advance" />
          </div>

          {message && <p className="text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-2.5">{message}</p>}

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Submit Request</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Approval Queue</h3>
        <p className="text-sm text-gray-500 mt-1">Approved EMI is reflected in payroll calculations.</p>

        <div className="mt-4 space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {requests.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-800">{item.employee}</p>
                  <p className="text-sm text-gray-500 mt-0.5">₹{item.amount.toLocaleString()} | {item.tenure} months</p>
                  <p className="text-sm text-gray-600 mt-2">{item.purpose}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.status === 'Approved' ? 'bg-green-100 text-green-700' : item.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{item.status}</span>
              </div>

              {item.status === 'Pending' && (
                <div className="mt-3 flex gap-2">
                  <button onClick={() => onUpdateStatus(item.id, 'Approved')} className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-lg"><CircleCheck size={15} /> Approve</button>
                  <button onClick={() => onUpdateStatus(item.id, 'Rejected')} className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg"><CircleX size={15} /> Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanAdvanceTab;
