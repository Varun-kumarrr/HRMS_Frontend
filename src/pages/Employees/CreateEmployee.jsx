import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  createEmployee,
  getDepartments,
  getDesignations,
} from "../../services/authService";

const CreateEmployee = () => {
  const initialFormData = {
    email: "",
    role: "hr",
    employee_code: "",
    first_name: "",
    last_name: "",
    phone: "",
    department: "",
    designation: "",
    location: "",
    joining_date: "",
    employment_type: "",
    status: "active",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.log("Department fetch error:", err);
    }
  };

  const loadDesignations = async () => {
    try {
      const data = await getDesignations();
      setDesignations(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.log("Designation fetch error:", err);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadDesignations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatError = (err) => {
    if (err.response?.data) {
      return JSON.stringify(err.response.data);
    }

    return "Something went wrong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        email: formData.email,
        role: "hr",
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

      await createEmployee(payload);

      setMessage("HR created successfully.");
      setFormData(initialFormData);
    } catch (err) {
      console.log("Create HR error:", err);
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setMessage("");
    setError("");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Create HR</h2>
          <p className="text-sm text-gray-500">
            Admin can create HR users from this page.
          </p>
        </div>

        {message && (
          <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled
              className="w-full border rounded-lg px-3 py-2 outline-none bg-gray-100 cursor-not-allowed"
            >
              <option value="hr">HR</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Employee Code
            </label>

            <input
              type="text"
              name="employee_code"
              value={formData.employee_code}
              onChange={handleChange}
              placeholder="Enter employee code"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Enter first name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Name
            </label>

            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select department</option>

              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Designation
            </label>

            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select designation</option>

              {designations.map((des) => (
                <option key={des.id} value={des.id}>
                  {des.name}
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
              placeholder="Enter location"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Joining Date
            </label>

            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Employment Type
            </label>

            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select employment type</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="intern">Intern</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create HR"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEmployee;