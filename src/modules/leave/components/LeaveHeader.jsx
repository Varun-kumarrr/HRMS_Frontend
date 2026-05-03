const roleLabels = {
  admin: "Admin / HR",
  hr: "Admin / HR",
  manager: "Manager",
  employee: "Employee",
};

const LeaveHeader = ({ role, selectedYear, onYearChange }) => {
  const yearOptions = Array.from({ length: 6 }, (_, index) => new Date().getFullYear() - 1 + index);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-200/70 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 p-6 text-white shadow-[0_20px_45px_-22px_rgba(2,132,199,0.8)] md:p-7">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-cyan-300/30 blur-2xl" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/95">Leave Management</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">Policy safe approvals with staged deduction</h2>
          <p className="mt-1 text-sm text-sky-100/95">
            Signed in as {roleLabels[role] || "Employee"}. Deduction happens only after HR finalization.
          </p>
        </div>

        <div className="w-full rounded-2xl border border-white/30 bg-white/10 p-3 backdrop-blur-sm md:w-auto md:min-w-52">
          <label htmlFor="year-filter" className="mb-1 block text-xs uppercase tracking-[0.12em] text-sky-100">
            Working Year
          </label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(event) => onYearChange(Number(event.target.value))}
            className="w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white outline-none focus:border-white/70"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year} className="text-slate-900">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LeaveHeader;
