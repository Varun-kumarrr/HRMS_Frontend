const Form16Tab = ({ records, onDownload }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Form 16 / Tax Documents</h3>
          <p className="text-sm text-gray-500 mt-1">Track generation status and export tax documents when ready.</p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Financial Year</th>
              <th>Generated On</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{item.fiscalYear}</td>
                <td>{item.generatedOn}</td>
                <td>
                  <span className={`px-2.5 py-1 text-xs rounded-full ${item.status === 'Downloaded' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{item.status}</span>
                </td>
                <td className="text-right">
                  <button onClick={() => onDownload(item)} className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form16Tab;
