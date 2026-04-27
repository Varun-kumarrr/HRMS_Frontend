const LeaveBalance = ({ balances }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(balances).map(([type, days]) => (
        <div key={type} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">{type} Balance</p>
          <p className="text-2xl font-bold mt-2 text-gray-800">{days} days</p>
        </div>
      ))}
    </div>
  );
};

export default LeaveBalance;
