import { CalendarClock } from "lucide-react";

const ShiftManagementTab = ({ shifts }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Weekly Shift Plan</h3>
        <CalendarClock className="text-blue-500" size={20} />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Shift planning with overtime reference for attendance operations.
      </p>

      <div className="overflow-x-auto mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Day</th>
              <th>Shift</th>
              <th>Start</th>
              <th>End</th>
              <th>Overtime Rule</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((row) => (
              <tr key={row.day} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{row.day}</td>
                <td>{row.shift}</td>
                <td>{row.start}</td>
                <td>{row.end}</td>
                <td className="text-gray-600">After 9 hours: OT eligible</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftManagementTab;
