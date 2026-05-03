const monthFormat = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const HolidayCalendar = ({ holidays }) => {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800">Holiday Calendar</h3>
      <p className="text-sm text-slate-500">These dates are automatically excluded from leave day calculation.</p>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {holidays.map((holiday) => (
          <div
            key={holiday.date}
            className={`rounded-xl border p-3 ${
              holiday.date >= today ? "border-cyan-100 bg-cyan-50" : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-cyan-800">{holiday.name}</p>
              <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-slate-500">
                {holiday.date >= today ? "Upcoming" : "Past"}
              </span>
            </div>
            <p className="mt-1 text-xs text-cyan-600">{monthFormat(holiday.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayCalendar;
