const LeaveTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-2 shadow-sm backdrop-blur">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "bg-slate-900 text-white shadow-[0_8px_20px_-14px_rgba(2,6,23,0.9)]"
                : "bg-slate-100/90 text-slate-600 hover:-translate-y-0.5 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaveTabs;
