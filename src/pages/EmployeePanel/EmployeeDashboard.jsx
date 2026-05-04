import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/me/");
        setProfile(res.data);
      } catch (error) {
        console.log("Error:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  // 📊 Attendance Data
  const attendanceData =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [];

  const totalDays = attendanceData.length;
  const present = attendanceData.filter(
    (a) => a.status === "Present"
  ).length;
  const absent = totalDays - present;

  const percentage = totalDays
    ? ((present / totalDays) * 100).toFixed(1)
    : 0;

  // 🔥 Department Mapping (optional)
  const deptMap = {
    1: "HR",
    2: "IT",
    3: "Sales",
  };

  return (
    <Layout>
      <div className="p-6">

        {/* 👋 Welcome */}
        <h1 className="text-2xl font-semibold mb-6">
          Welcome, {profile?.first_name || "User"} 👋
        </h1>

        {/* 🧾 Profile Info */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          <p><b>Full Name:</b> {profile?.first_name || "N/A"}</p>

          <p><b>Email:</b> {profile?.email || "N/A"}</p>

          <p><b>Phone:</b> {profile?.phone || "N/A"}</p>

          <p><b>Role:</b> {profile?.role || "N/A"}</p>

          <p>
            <b>Department:</b>{" "}
            {deptMap[profile?.department] || "N/A"}
          </p>

          <p>
            <b>Designation:</b>{" "}
            {profile?.designation || "Not Assigned"}
          </p>

          <p><b>Location:</b> {profile?.location || "N/A"}</p>

          <p>
            <b>Joining Date:</b>{" "}
            {profile?.joining_date || "Not Available"}
          </p>

          <p>
            <b>Employment Type:</b>{" "}
            {profile?.employment_type || "N/A"}
          </p>

          <p><b>Status:</b> {profile?.status || "N/A"}</p>

        </div>

        {/* 📊 Attendance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Total Days</h2>
            <p className="text-2xl font-bold mt-2">{totalDays}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Present</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {present}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Absent</h2>
            <p className="text-2xl font-bold text-red-600 mt-2">
              {absent}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Attendance %</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {percentage}%
            </p>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default EmployeeDashboard;