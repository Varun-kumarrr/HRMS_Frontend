import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axiosInstance from "../../services/axiosInstance";

const CreateEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    role: "Employee",
    employee_code: "",
    first_name: "",
    last_name: "",
    phone: "",
    department: "",
    designation: "",
    location: "",
    joining_date: "",
    employment_type: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get("/api/departments/");
      setDepartments(response.data.results || response.data || []);
    } catch (error) {
      console.log("Department fetch error:", error.response?.data || error);
    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await axiosInstance.get("/api/designations/");
      setDesignations(response.data.results || response.data || []);
    } catch (error) {
      console.log("Designation fetch error:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleReset = () => {
    setFormData({
      email: "",
      role: "Employee",
      employee_code: "",
      first_name: "",
      last_name: "",
      phone: "",
      department: "",
      designation: "",
      location: "",
      joining_date: "",
      employment_type: "",
      status: "Active",
    });

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const payload = {
      email: formData.email,
      role: formData.role,
      employee_code: formData.employee_code || null,
      first_name: formData.first_name,
      last_name: formData.last_name || "",
      phone: formData.phone || "",
      department: formData.department || null,
      designation: formData.designation || null,
      location: formData.location || "",
      joining_date: formData.joining_date || null,
      employment_type: formData.employment_type || "",
      status: formData.status,
    };

    try {
      const response = await axiosInstance.post("/api/create_employee/", payload);

      console.log("Employee created:", response.data);

      setMessage("Employee created successfully.");
      handleReset();
    } catch (error) {
      console.log("Create employee error:", error.response?.data || error);

      const data = error.response?.data;

      if (data?.non_field_errors) {
        setError(data.non_field_errors.join(", "));
      } else if (typeof data === "object") {
        setError(JSON.stringify(data));
      } else {
        setError("Failed to create employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold">Create Employee</h2>
        <p className="text-sm text-gray-500 mb-6">
          Add a new employee using backend API.
        </p>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="Employee">Employee</option>
              <option value="Hr">Hr</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Employee Code</label>
            <input
              type="text"
              name="employee_code"
              value={formData.employee_code}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name *</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name || dept.department_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select designation</option>
              {designations.map((des) => (
                <option key={des.id} value={des.id}>
                  {des.name || des.designation_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Joining Date</label>
            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Employment Type</label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select employment type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Intern">Intern</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEmployee;