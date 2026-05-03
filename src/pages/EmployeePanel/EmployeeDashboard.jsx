import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const attendanceData = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

const totalDays = attendanceData.length;
const present = attendanceData.filter(a => a.status === "Present").length;
const absent = totalDays - present;

const percentage = totalDays
  ? ((present / totalDays) * 100).toFixed(1)
  : 0;

  return (
    <Layout>
      <div className="p-6">

        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-6">
          Welcome, {user?.email} 👋
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-gray-500 text-sm">Total Days</h2>
    <p className="text-2xl font-bold mt-2">{totalDays}</p>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-gray-500 text-sm">Present</h2>
    <p className="text-2xl font-bold text-green-600 mt-2">{present}</p>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-gray-500 text-sm">Absent</h2>
    <p className="text-2xl font-bold text-red-600 mt-2">{absent}</p>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-gray-500 text-sm">Attendance %</h2>
    <p className="text-2xl font-bold text-blue-600 mt-2">{percentage}%</p>
  </div>

</div>

      </div>
    </Layout>
  );
};

export default EmployeeDashboard;