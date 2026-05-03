const StatCard = ({ label, value, valueClass = "text-gray-800" }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-3xl font-bold mt-2 ${valueClass}`}>{value}</p>
  </div>
);

const PayrollOverview = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard label="Employees in Run" value={stats.employeeCount} valueClass="text-blue-600" />
      <StatCard label="Gross Payroll" value={`₹${stats.grossPayroll.toLocaleString()}`} valueClass="text-emerald-600" />
      <StatCard label="Net Payroll" value={`₹${stats.netPayroll.toLocaleString()}`} valueClass="text-green-600" />
      <StatCard label="Pending Reviews" value={stats.pendingReviews} valueClass="text-amber-600" />
    </div>
  );
};

export default PayrollOverview;
