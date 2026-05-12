import axiosInstance from "./axiosConfig";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/token/", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const getEmployeeProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/me/");
    return response.data;
  } catch (error) {
    console.error("Employee fetch error:", error.response?.data || error.message);
    throw error;
  }
};