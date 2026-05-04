const StatCard = ({ label, value, valueClass }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${valueClass}`}>{value}</p>
    </div>
  );
};

const OverviewTab = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard label="Present Today" value={stats.presentCount} valueClass="text-green-600" />
      <StatCard label="Late Check-ins" value={stats.lateCount} valueClass="text-orange-500" />
      <StatCard label="Absent Today" value={stats.absentCount} valueClass="text-red-500" />
      <StatCard label="Pending Approvals" value={stats.pendingApprovals} valueClass="text-blue-600" />
    </div>
  );
};

export default OverviewTab;
