import Layout from "../../components/Layout";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash, RefreshCw } from "lucide-react";
import axiosInstance from "../../services/axiosConfig";

const ITEMS_PER_PAGE = 5;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/api/admin/employees/");

      const apiData = Array.isArray(response.data)
        ? response.data
        : response.data?.results || response.data?.data || [];

      setEmployees(apiData);
    } catch (err) {
      console.error("Employee fetch error:", err.response || err);

      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to view employees.");
      } else {
        setError("Failed to load employees.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const fullName = `${emp.first_name || ""} ${emp.last_name || ""}`.trim();
      const email = emp.email || "";
      const role = emp.role || "";
      const phone = emp.phone || "";
      const employeeCode = emp.employee_code || "";
      const department = emp.department_name || emp.department || "";
      const designation = emp.designation_name || emp.designation || "";

      const searchText = `
        ${fullName}
        ${email}
        ${role}
        ${phone}
        ${employeeCode}
        ${department}
        ${designation}
      `.toLowerCase();

      return searchText.includes(search.toLowerCase());
    });
  }, [employees, search]);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentData = filteredEmployees.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    alert("Employee delete API is not given yet. Employee ID: " + id);
  };

  const getEmployeeName = (emp) => {
    const fullName = `${emp.first_name || ""} ${emp.last_name || ""}`.trim();

    if (fullName) return fullName;
    if (emp.name) return emp.name;
    if (emp.email) return emp.email;

    return "N/A";
  };

  const getDepartmentName = (emp) => {
    if (typeof emp.department === "object" && emp.department !== null) {
      return emp.department.name || "N/A";
    }

    return emp.department_name || emp.department || "N/A";
  };

  const getDesignationName = (emp) => {
    if (typeof emp.designation === "object" && emp.designation !== null) {
      return emp.designation.name || "N/A";
    }

    return emp.designation_name || emp.designation || "N/A";
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold">Employee List</h2>
            <p className="text-sm text-gray-500">
              Total Employees: {filteredEmployees.length}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={fetchEmployees}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-6 text-center text-gray-500">
            Loading employees...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Employee Code</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b hover:bg-gray-50 text-sm"
                    >
                      <td className="py-3 font-medium">
                        {getEmployeeName(emp)}
                      </td>

                      <td className="text-gray-600">{emp.email || "N/A"}</td>

                      <td className="capitalize">{emp.role || "N/A"}</td>

                      <td>{emp.employee_code || "N/A"}</td>

                      <td>{emp.phone || "N/A"}</td>

                      <td>{getDepartmentName(emp)}</td>

                      <td>{getDesignationName(emp)}</td>

                      <td>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            emp.status?.toLowerCase() === "active"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {emp.status || "N/A"}
                        </span>
                      </td>

                      <td className="flex justify-center gap-3 py-3">
                        <button
                          onClick={() => alert("Edit employee ID: " + emp.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="py-6 text-center text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
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
        )}
      </div>
    </Layout>
  );
};

export default EmployeeList;