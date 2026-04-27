const LeaveHistory = ({ requests }) => {
  const exportCsv = () => {
    const header = 'Employee,Type,From,To,Days,Reason,Status\n';
    const rows = requests.map(r => `${r.employee},${r.type},${r.from},${r.to},${r.days},"${r.reason}",${r.status}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'leave-history.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Leave History</h3>
        <button onClick={exportCsv} className="bg-blue-600 text-white px-3 py-2 rounded">Export CSV</button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Employee</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{r.employee}</td>
                <td>{r.type}</td>
                <td>{r.from}</td>
                <td>{r.to}</td>
                <td>{r.days}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
