import Layout from "../../components/Layout";
import { useState } from "react";

const CheckIn = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString();
    setCheckInTime(time);
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
    const time = new Date().toLocaleTimeString();
    setCheckOutTime(time);
    setCheckedIn(false);
  };

  return (
    <Layout>
      <div className="p-6 max-w-xl mx-auto">

        <h1 className="text-2xl font-semibold mb-6">
          Attendance Actions
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow text-center">

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

          <div className="mt-6 text-gray-600">
            {checkInTime && <p>Check In: {checkInTime}</p>}
            {checkOutTime && <p>Check Out: {checkOutTime}</p>}
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default CheckIn;