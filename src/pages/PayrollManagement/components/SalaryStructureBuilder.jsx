import { Plus, Trash2, Calculator, IndianRupee } from "lucide-react";

const LineItemEditor = ({ title, items, onAdd, onChange, onRemove }) => {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/60">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              value={item.label}
              onChange={(e) => onChange(item.id, "label", e.target.value)}
              className="col-span-7 border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Label"
            />
            <input
              type="number"
              min="0"
              value={item.amount}
              onChange={(e) => onChange(item.id, "amount", Number(e.target.value))}
              className="col-span-4 border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amount"
            />
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="col-span-1 flex justify-center text-red-500 hover:text-red-700"
              aria-label={`Remove ${title} item ${index + 1}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SalaryStructureBuilder = ({
  baseSalary,
  allowances,
  deductions,
  onBaseSalaryChange,
  onAddAllowance,
  onUpdateAllowance,
  onRemoveAllowance,
  onAddDeduction,
  onUpdateDeduction,
  onRemoveDeduction,
  totals,
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Salary Structure Builder</h3>
            <Calculator className="text-blue-500" size={20} />
          </div>
          <p className="text-sm text-gray-500 mt-1">Create and adjust a reusable payroll structure.</p>

          <div className="mt-5">
            <label className="block text-sm text-gray-600 mb-1">Base Salary</label>
            <div className="relative">
              <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                min="0"
                value={baseSalary}
                onChange={(e) => onBaseSalaryChange(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2.5 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <LineItemEditor title="Allowances" items={allowances} onAdd={onAddAllowance} onChange={onUpdateAllowance} onRemove={onRemoveAllowance} />
        <LineItemEditor title="Deductions" items={deductions} onAdd={onAddDeduction} onChange={onUpdateDeduction} onRemove={onRemoveDeduction} />
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h4 className="font-semibold text-gray-800">Preview</h4>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Base Salary</span><strong>₹{baseSalary.toLocaleString()}</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Allowances</span><strong>₹{totals.allowances.toLocaleString()}</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Gross Salary</span><strong>₹{totals.gross.toLocaleString()}</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Deductions</span><strong>₹{totals.deductions.toLocaleString()}</strong></div>
            <div className="flex justify-between border-t pt-3"><span className="text-gray-700 font-medium">Projected Net</span><strong className="text-green-600">₹{totals.net.toLocaleString()}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryStructureBuilder;
