import { Download, Printer, ReceiptText } from "lucide-react";

const PayslipsTab = ({ slips, selectedSlip, onSelectSlip, onPrintSlip, onDownloadSlip }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Generated Payslips</h3>
          <ReceiptText className="text-blue-500" size={20} />
        </div>
        <div className="mt-4 space-y-3 max-h-[540px] overflow-y-auto pr-1">
          {slips.map((slip) => (
            <button
              key={slip.id}
              onClick={() => onSelectSlip(slip)}
              className={`w-full text-left rounded-xl border p-4 transition ${selectedSlip?.id === slip.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-800">{slip.employee}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{slip.department} | {slip.month}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Net Pay</p>
                  <p className="font-bold text-green-600">₹{slip.netPay.toLocaleString()}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        {selectedSlip ? (
          <div id="payroll-payslip-preview" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Payslip Preview</h3>
                <p className="text-sm text-gray-500">{selectedSlip.employee} | {selectedSlip.month}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onDownloadSlip(selectedSlip)} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 text-sm">
                  <Download size={15} /> Download
                </button>
                <button onClick={() => onPrintSlip(selectedSlip)} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Printer size={15} /> Print / PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3"><p className="text-gray-500">Base Salary</p><p className="font-semibold">₹{selectedSlip.baseSalary.toLocaleString()}</p></div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3"><p className="text-gray-500">Gross Salary</p><p className="font-semibold">₹{selectedSlip.grossPay.toLocaleString()}</p></div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3"><p className="text-gray-500">Deductions</p><p className="font-semibold">₹{selectedSlip.deductions.toLocaleString()}</p></div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3"><p className="text-gray-500">Net Pay</p><p className="font-semibold text-green-600">₹{selectedSlip.netPay.toLocaleString()}</p></div>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-800">Breakdown</h4>
              <div className="mt-3 space-y-2 text-sm">
                {selectedSlip.breakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className={item.amount < 0 ? "text-red-600" : "text-gray-800"}>{item.amount < 0 ? `-₹${Math.abs(item.amount).toLocaleString()}` : `₹${item.amount.toLocaleString()}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 min-h-[320px]">
            Select a payslip to preview and print.
          </div>
        )}
      </div>
    </div>
  );
};

export default PayslipsTab;
