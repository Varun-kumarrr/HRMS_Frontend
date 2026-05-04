const LeaveTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-3 border border-gray-100">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
