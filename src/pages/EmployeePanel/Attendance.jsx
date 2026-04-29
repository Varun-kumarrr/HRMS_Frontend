import Layout from "../../components/Layout";
import { useState } from "react";
const attendanceData = [
  { date: "2026-04-01", status: "Present" },
  { date: "2026-04-02", status: "Absent" },
  { date: "2026-04-03", status: "Present" },
  { date: "2026-04-04", status: "Present" },
  { date: "2026-04-05", status: "Absent" },
];

const Attendance = () => {
    const [selectedMonth, setSelectedMonth] = useState("04"); // April default
    const [search, setSearch] = useState("");
const filteredData = attendanceData.filter((item) => {
  const monthMatch = item.date.split("-")[1] === selectedMonth;
  const searchMatch = item.date.includes(search);
  return monthMatch && searchMatch;
});

    return (
    <Layout>
      <div className="p-6">
        {/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-sm text-gray-500">Total Days</h2>
    <p className="text-2xl font-bold mt-2">
      {filteredData.length}
    </p>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-sm text-gray-500">Present</h2>
    <p className="text-2xl font-bold mt-2 text-green-600">
      {filteredData.filter(a => a.status === "Present").length}
    </p>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-sm text-gray-500">Absent</h2>
    <p className="text-2xl font-bold mt-2 text-red-600">
      {filteredData.filter(a => a.status === "Absent").length}
    </p>
  </div>
     
</div>
<div className="flex justify-between items-center mb-4 gap-4">

  <h1 className="text-2xl font-semibold">
    My Attendance
  </h1>

  <div className="flex gap-3">
    <input
      type="text"
      placeholder="Search date (YYYY-MM-DD)"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="p-2 border rounded-lg"
    />

    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="p-2 border rounded-lg"
    >
      <option value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
    </select>
  </div>

</div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-3">Date</th>
                <th>Status</th>
              </tr>
            </thead>

           <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((item, index) => (
      <tr key={index} className="border-b">
        <td className="py-3">{item.date}</td>
        <td>
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              item.status === "Present"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {item.status}
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2" className="text-center py-6 text-gray-500">
        No attendance data found
      </td>
    </tr>
  )}
</tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
};

export default Attendance;