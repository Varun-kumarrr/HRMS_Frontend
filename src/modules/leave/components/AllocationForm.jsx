import { useState } from "react";

const defaultState = {
  employeeId: "",
  leaveType: "CL",
  year: new Date().getFullYear(),
  totalAllocated: "",
};

const AllocationForm = ({ employees, leaveTypes, onAllocate }) => {
  const [form, setForm] = useState(defaultState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.employeeId || !form.leaveType || !form.totalAllocated || Number(form.totalAllocated) < 0) {
      return;
    }

    const ok = await onAllocate({
      employeeId: form.employeeId,
      leaveType: form.leaveType,
      year: Number(form.year),
      totalAllocated: Number(form.totalAllocated),
    });

    if (ok) setForm({ ...defaultState, leaveType: leaveTypes[0] || "CL" });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
        <h3 className="text-lg font-bold text-slate-800">Allocate Leave</h3>
        <p className="text-sm text-slate-600">On creation: used = 0 and remaining = totalAllocated</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Employee</span>
          <select
            value={form.employeeId}
            onChange={(event) => setForm((prev) => ({ ...prev, employeeId: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} ({employee.id})
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Leave Type</span>
          <select
            value={form.leaveType}
            onChange={(event) => setForm((prev) => ({ ...prev, leaveType: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
          >
            {leaveTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Year</span>
          <input
            type="number"
            min="2024"
            max="2035"
            value={form.year}
            onChange={(event) => setForm((prev) => ({ ...prev, year: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
            placeholder="Year"
          />
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Allocated</span>
          <input
            type="number"
            min="0"
            value={form.totalAllocated}
            onChange={(event) => setForm((prev) => ({ ...prev, totalAllocated: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
            placeholder="Total Allocated"
          />
        </label>

        <button
          type="submit"
          className="md:col-span-4 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Save Allocation
        </button>
      </form>
    </div>
  );
};

export default AllocationForm;
