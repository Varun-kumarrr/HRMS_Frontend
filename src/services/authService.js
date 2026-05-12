import axiosInstance from "./axiosConfig";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/auth/login/", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error;
  }
};

export const getEmployeeProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/me/");
    return response.data;
  } catch (error) {
    console.error("Employee fetch error:", error.response || error);
    throw error;
  }
};