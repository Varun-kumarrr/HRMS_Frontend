import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="p-6">

        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-6">
          Welcome, {user?.email} 👋
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Attendance</h2>
            <p className="text-2xl font-bold mt-2">22 Days</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Leaves Taken</h2>
            <p className="text-2xl font-bold mt-2">4 Days</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Pending Tasks</h2>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>

          

        </div>

      </div>
    </Layout>
  );
};

export default EmployeeDashboard;