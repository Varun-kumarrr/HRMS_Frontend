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

// Get logged-in employee profile
export const getEmployeeProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/me/");
    return response.data;
  } catch (error) {
    console.error("Employee fetch error:", error.response || error);
    throw error;
  }
};

// Update logged-in employee profile
export const updateEmployeeProfile = async (profileData) => {
  try {
    const response = await axiosInstance.patch("/api/me/", profileData);
    return response.data;
  } catch (error) {
    console.error("Employee update error:", error.response || error);
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout/");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response || error);
    throw error;
  }
};