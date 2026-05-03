const RecruitmentTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-2 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentTabs;
