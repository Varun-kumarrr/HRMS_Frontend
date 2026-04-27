import { Clock3, FileDown, Filter } from "lucide-react";

const ReportStatusBadge = ({ status }) => {
  const statusClass =
    status === "Present"
      ? "bg-green-100 text-green-700"
      : status === "Late"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-700";

  return <span className={`px-2.5 py-1 text-xs rounded-full ${statusClass}`}>{status}</span>;
};

const ReportsTab = ({
  reportStatus,
  reportShift,
  reports,
  onStatusChange,
  onShiftChange,
  onExport,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Attendance Reports</h3>
          <p className="text-sm text-gray-500 mt-1">Filter by shift and status, then export as CSV.</p>
        </div>
        <button
          onClick={onExport}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <FileDown size={16} /> Export CSV
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 px-3 py-2.5">
          <Filter size={16} className="text-gray-500" />
          <select
            value={reportStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-sm"
          >
            <option>All</option>
            <option>Present</option>
            <option>Late</option>
            <option>Absent</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 px-3 py-2.5">
          <Clock3 size={16} className="text-gray-500" />
          <select
            value={reportShift}
            onChange={(e) => onShiftChange(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-sm"
          >
            <option>All</option>
            <option>General</option>
            <option>Evening</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Employee</th>
              <th>Date</th>
              <th>Shift</th>
              <th>In</th>
              <th>Out</th>
              <th>OT</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{item.employee}</td>
                <td>{item.date}</td>
                <td>{item.shift}</td>
                <td>{item.inTime}</td>
                <td>{item.outTime}</td>
                <td>{item.overtime}</td>
                <td>
                  <ReportStatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTab;
