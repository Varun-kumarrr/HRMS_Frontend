import Layout from "../../components/Layout";
import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

const mockEmployees = [
  { id: 1, name: "Rahul Kumar", email: "rahul@gmail.com", role: "Developer", status: "Active" },
  { id: 2, name: "Priya Singh", email: "priya@gmail.com", role: "HR", status: "Inactive" },
  { id: 3, name: "Amit Sharma", email: "amit@gmail.com", role: "Manager", status: "Active" },
  { id: 4, name: "Neha Verma", email: "neha@gmail.com", role: "Designer", status: "Active" },
  { id: 5, name: "Ravi Patel", email: "ravi@gmail.com", role: "Developer", status: "Inactive" },
  { id: 6, name: "Sneha Roy", email: "sneha@gmail.com", role: "HR", status: "Active" },
];

const ITEMS_PER_PAGE = 3;

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Filter
  const filtered = mockEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    alert("Delete employee " + id);
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold">Employee List</h2>

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">

                  <td className="py-3 font-medium">{emp.name}</td>
                  <td className="text-gray-600">{emp.email}</td>
                  <td>{emp.role}</td>

                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="flex justify-center gap-3 py-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </Layout>
  );
};

export default EmployeeList;