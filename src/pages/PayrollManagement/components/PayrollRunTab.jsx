import { FileText, CircleCheck } from "lucide-react";

const PayrollRunTab = ({ month, onMonthChange, employees, onProcessPayroll, runStatus }) => {
  const readyCount = employees.filter((item) => item.status === "Ready").length;

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Monthly Payroll Run</h3>
          <p className="text-sm text-gray-500 mt-1">Process payroll for the selected month and inspect employee pay.</p>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Payroll Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => onMonthChange(e.target.value)}
              className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={onProcessPayroll}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <CircleCheck size={16} /> Process Payroll
          </button>
        </div>
      </div>

      {runStatus && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
          {runStatus}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Employees Ready</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{readyCount}</p>
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Processed Count</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{employees.filter((item) => item.status === "Processed").length}</p>
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Payroll Notes</p>
          <p className="text-sm text-gray-700 mt-2">Leave deduction and loan EMI are automatically applied in calculations.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Employee</th>
              <th>Department</th>
              <th>Base</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{item.employee}</td>
                <td>{item.department}</td>
                <td>₹{item.baseSalary.toLocaleString()}</td>
                <td>₹{item.gross.toLocaleString()}</td>
                <td>₹{item.deductions.toLocaleString()}</td>
                <td className="font-semibold text-green-600">₹{item.netPay.toLocaleString()}</td>
                <td>
                  <span className={`px-2.5 py-1 text-xs rounded-full ${item.status === 'Processed' ? 'bg-green-100 text-green-700' : item.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollRunTab;
