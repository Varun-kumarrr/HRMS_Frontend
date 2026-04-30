import { useMemo, useState } from "react";

const today = new Date().toISOString().slice(0, 10);

const ApplyLeaveForm = ({ leaveTypes, employeeId, countLeaveDays, onApply }) => {
  const [form, setForm] = useState({
    employeeId,
    leaveType: leaveTypes[0] || "CL",
    startDate: today,
    endDate: today,
    reason: "",
  });

  const totalDays = useMemo(
    () => countLeaveDays(form.startDate, form.endDate),
    [countLeaveDays, form.startDate, form.endDate],
  );

  const submit = async (event) => {
    event.preventDefault();
    if (!form.leaveType || !form.startDate || !form.endDate || !form.reason.trim()) return;

    const ok = await onApply(form);
    if (ok) {
      setForm((prev) => ({
        ...prev,
        leaveType: leaveTypes[0] || "CL",
        startDate: today,
        endDate: today,
        reason: "",
      }));
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
        <h3 className="text-lg font-bold text-slate-800">Apply Leave</h3>
        <p className="text-sm text-slate-600">Weekend and holiday dates are excluded automatically.</p>
      </div>

      <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
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
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Employee Id</span>
          <input
            type="text"
            value={form.employeeId}
            disabled
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
          />
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Start Date</span>
          <input
            type="date"
            value={form.startDate}
            onChange={(event) => setForm((prev) => ({ ...prev, startDate: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">End Date</span>
          <input
            type="date"
            value={form.endDate}
            onChange={(event) => setForm((prev) => ({ ...prev, endDate: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
          />
        </label>

        <textarea
          rows={3}
          value={form.reason}
          onChange={(event) => setForm((prev) => ({ ...prev, reason: event.target.value }))}
          className="md:col-span-2 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
          placeholder="Reason for leave"
        />

        <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700">
          Total Working Days: <span className="font-bold">{totalDays}</span>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          Submit Request (PENDING)
        </button>
      </form>
    </div>
  );
};

export default ApplyLeaveForm;
