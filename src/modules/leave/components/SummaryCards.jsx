const SummaryCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Requests",
      value: stats.total,
      tone: "text-slate-800",
      chip: "bg-slate-100 text-slate-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      tone: "text-amber-600",
      chip: "bg-amber-100 text-amber-700",
    },
    {
      title: "Manager Approved",
      value: stats.managerApproved,
      tone: "text-emerald-600",
      chip: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "HR Approved",
      value: stats.hrApproved,
      tone: "text-teal-600",
      chip: "bg-teal-100 text-teal-700",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      tone: "text-rose-600",
      chip: "bg-rose-100 text-rose-700",
    },
    {
      title: "Total Remaining",
      value: stats.totalRemaining,
      tone: "text-sky-700",
      suffix: "days",
      chip: "bg-sky-100 text-sky-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${card.chip}`}>
            {card.title}
          </span>
          <p className={`mt-2 text-2xl font-bold ${card.tone}`}>
            {card.value}
            {card.suffix ? <span className="ml-1 text-sm font-semibold text-slate-500">{card.suffix}</span> : null}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
