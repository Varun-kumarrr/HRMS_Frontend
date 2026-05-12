import axiosInstance from "./axiosConfig";

// Employees
export const getAdminEmployees = async () => {
  const response = await axiosInstance.get("/api/admin/employees/");
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await axiosInstance.post("/api/create_employee/", employeeData);
  return response.data;
};

// Departments
export const getDepartments = async () => {
  const response = await axiosInstance.get("/api/departments/");
  return response.data;
};

export const createDepartment = async (departmentData) => {
  const response = await axiosInstance.post("/api/departments/", departmentData);
  return response.data;
};

export const updateDepartment = async (id, departmentData) => {
  const response = await axiosInstance.patch(`/api/departments/${id}/`, departmentData);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await axiosInstance.delete(`/api/departments/${id}/`);
  return response.data;
};

// Designations
export const getDesignations = async () => {
  const response = await axiosInstance.get("/api/designations/");
  return response.data;
};

export const createDesignation = async (designationData) => {
  const response = await axiosInstance.post("/api/designations/", designationData);
  return response.data;
};

export const updateDesignation = async (id, designationData) => {
  const response = await axiosInstance.patch(`/api/designations/${id}/`, designationData);
  return response.data;
};

export const deleteDesignation = async (id) => {
  const response = await axiosInstance.delete(`/api/designations/${id}/`);
  return response.data;
};

// Users / Password
export const getUsers = async () => {
  const response = await axiosInstance.get("/api/auth/users/");
  return response.data;
};

export const setUserPassword = async (passwordData) => {
  const response = await axiosInstance.post(
    "/api/auth/admin/set-password/",
    passwordData
  );
  return response.data;
};