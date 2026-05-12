import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/api/auth/login/", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const refreshToken = async (refresh) => {
  try {
    const response = await axiosInstance.post("/api/auth/refresh/", {
      refresh,
    });
    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

export const logoutUser = async (refresh) => {
  try {
    const response = await axiosInstance.post("/api/auth/logout/", {
      refresh,
    });
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getEmployeeProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/me/");
    return response.data;
  } catch (error) {
    console.error("Get employee profile error:", error);
    throw error;
  }
};

export const updateEmployeeProfile = async (data) => {
  try {
    const response = await axiosInstance.patch("/api/me/", data);
    return response.data;
  } catch (error) {
    console.error("Update employee profile error:", error);
    throw error;
  }
};

export const getDepartments = async () => {
  try {
    const response = await axiosInstance.get("/api/departments/");
    return response.data;
  } catch (error) {
    console.error("Get departments error:", error);
    throw error;
  }
};

export const getDesignations = async () => {
  try {
    const response = await axiosInstance.get("/api/designations/");
    return response.data;
  } catch (error) {
    console.error("Get designations error:", error);
    throw error;
  }
};

export const getAdminEmployees = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/employees/");
    return response.data;
  } catch (error) {
    console.error("Get admin employees error:", error);
    throw error;
  }
};

export const createEmployee = async (data) => {
  try {
    const response = await axiosInstance.post("/api/create_employee/", data);
    return response.data;
  } catch (error) {
    console.error("Create employee error:", error);
    throw error;
  }
};