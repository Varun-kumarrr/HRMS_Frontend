import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Users, Activity, Clock, RefreshCw } from "lucide-react";
import axiosInstance from "../../services/axiosConfig";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    pendingLeaves: 12,
  });

  const [loading, setLoading] = useState(false);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/api/admin/employees/");

      const employees = Array.isArray(response.data)
        ? response.data
        : response.data?.results || response.data?.data || [];

      const activeEmployees = employees.filter(
        (emp) => emp.status?.toLowerCase() === "active"
      ).length;

      setStats({
        totalEmployees: employees.length,
        activeEmployees,
        pendingLeaves: 12,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500 text-sm">
              HRMS overview and employee summary
            </p>
          </div>

          <button
            onClick={fetchDashboardStats}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Total Employees</h3>
              <Users className="text-blue-500" />
            </div>

            <p className="text-3xl font-bold mt-4">
              {loading ? "..." : stats.totalEmployees}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Active Employees</h3>
              <Activity className="text-green-500" />
            </div>

            <p className="text-3xl font-bold mt-4">
              {loading ? "..." : stats.activeEmployees}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Pending Leaves</h3>
              <Clock className="text-orange-500" />
            </div>

            <p className="text-3xl font-bold mt-4">
              {stats.pendingLeaves}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Static until leave API is available
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;