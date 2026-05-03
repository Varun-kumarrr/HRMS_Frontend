import Layout from "../../components/Layout";
import { useState, useEffect } from "react";

const Attendance = () => {

  const currentMonth = new Date().toISOString().split("-")[1];
  const today = new Date().toISOString().split("T")[0];

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [search, setSearch] = useState("");

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  // Load attendance records
  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("attendanceRecords"));
    if (savedRecords) {
      setAttendanceData(savedRecords);
    }
  }, []);

  // Load check-in state
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("attendance"));

    if (savedData && savedData.date === today) {
      setCheckedIn(savedData.checkedIn);
      setCheckInTime(savedData.checkInTime);
      setCheckOutTime(savedData.checkOutTime);
    } else {
      setCheckedIn(false);
      setCheckInTime("");
      setCheckOutTime("");
    }
  }, [today]);

  // Save check-in state
  useEffect(() => {
    localStorage.setItem(
      "attendance",
      JSON.stringify({
        date: today,
        checkedIn,
        checkInTime,
        checkOutTime,
      })
    );
  }, [checkedIn, checkInTime, checkOutTime, today]);

  // Generate all dates of month
  const getAllDatesOfMonth = () => {
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, selectedMonth, 0).getDate();

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = i.toString().padStart(2, "0");
      dates.push(`${year}-${selectedMonth}-${day}`);
    }

    return dates;
  };

  const allDates = getAllDatesOfMonth();

  // Merge Present + Absent
  const finalData = allDates.map((date) => {
    const record = attendanceData.find((item) => item.date === date);

    if (record) {
      return record;
    } else {
      return {
        date,
        checkIn: "-",
        checkOut: "-",
        status: "Absent",
      };
    }
  });

  // Apply search
  const displayedData = finalData.filter((item) =>
    item.date.includes(search)
  );

const totalDays = attendanceData.length;

const presentDays = attendanceData.filter(
  (item) => item.status === "Present"
).length;

const absentDays = totalDays - presentDays;

const attendancePercentage =
  totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
  // Check In
  const handleCheckIn = () => {
    const alreadyExists = attendanceData.find(
      (item) => item.date === today
    );

    if (alreadyExists) {
      alert("Attendance already completed for today");
      return;
    }

    const time = new Date().toLocaleTimeString();
    setCheckInTime(time);
    setCheckedIn(true);
  };

  // Check Out
  const handleCheckOut = () => {
    const time = new Date().toLocaleTimeString();

    const alreadyExists = attendanceData.find(
      (item) => item.date === today
    );

    if (alreadyExists) {
      alert("Attendance already marked for today");
      return;
    }

    const newRecord = {
      date: today,
      checkIn: checkInTime,
      checkOut: time,
      status: "Present",
    };

    const updatedData = [...attendanceData, newRecord];

    setAttendanceData(updatedData);
    localStorage.setItem("attendanceRecords", JSON.stringify(updatedData));

    setCheckOutTime(time);
    setCheckedIn(false);
  };

  return (
    <Layout>

      {/* Check In / Check Out */}
      <div className="mb-6 text-center">
        {!checkedIn ? (
          <button
            onClick={handleCheckIn}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Check In
          </button>
        ) : (
          <button
            onClick={handleCheckOut}
            className="bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            Check Out
          </button>
        )}

        <div className="mt-4 text-gray-600">
          {checkInTime && <p>Check In: {checkInTime}</p>}
          {checkOutTime && <p>Check Out: {checkOutTime}</p>}
        </div>
      </div>

      <div className="p-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Total Days</h2>
            <p className="text-2xl font-bold mt-2">
              {totalDays}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Present</h2>
            <p className="text-2xl font-bold mt-2 text-green-600">
              {presentDays}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Absent</h2>
            <p className="text-2xl font-bold mt-2 text-red-600">
              {absentDays}
            </p>
          </div>

        </div>

        {/* Attendance Analytics */}
<div className="bg-white p-6 rounded-2xl shadow mb-6">

  <h2 className="text-lg font-semibold mb-4">
    Attendance Analytics
  </h2>

  {/* Percentage */}
  <div className="mb-3">
    <p className="text-sm text-gray-500">Attendance Percentage</p>
    <p className="text-2xl font-bold text-blue-600">
      {attendancePercentage}%
    </p>
  </div>

  {/* Progress Bar */}
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div
      className="bg-blue-600 h-3 rounded-full"
      style={{ width: `${attendancePercentage}%` }}
    ></div>
  </div>

  {/* Extra stats */}
  <div className="flex justify-between mt-4 text-sm text-gray-600">
    <span>Present: {presentDays}</span>
    <span>Absent: {absentDays}</span>
  </div>

</div>

        {/* Filters */}
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
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
            </select>

          </div>

        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <table className="w-full text-left">

            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-3">Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {displayedData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    item.date === today ? "bg-blue-50 font-semibold" : ""
                  }`}
                >
                  <td className="py-3">
                    {item.date}
                    {item.date === today && (
                      <span className="ml-2 text-xs text-blue-600">(Today)</span>
                    )}
                  </td>

                  <td>{item.checkIn}</td>
                  <td>{item.checkOut}</td>

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
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
};

export default Attendance;