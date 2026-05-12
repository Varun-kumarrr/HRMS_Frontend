import axiosInstance from "./axiosConfig";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/auth/login/", {
      email,
      password,
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Employee profile
export const getEmployeeProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/me/");
    return response.data;
  } catch (error) {
    console.error("Employee fetch error:", error.response?.data || error.message);
    throw error;
  }
};

// Edit employee profile
export const updateEmployeeProfile = async (employeeData) => {
  try {
    const response = await axiosInstance.patch("/api/me/", employeeData);
    return response.data;
  } catch (error) {
    console.error("Employee update error:", error.response?.data || error.message);
    throw error;
  }
};