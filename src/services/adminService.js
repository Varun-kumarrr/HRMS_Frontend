import axiosInstance from "./axiosInstance";

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/auth/login/", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("Login error status:", error.response?.status);
    console.log("Login error data:", error.response?.data);
    console.log("Login error full:", error);

    throw error;
  }
};

// LOGOUT
export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await axiosInstance.post("/api/auth/logout/", {
        refresh: refreshToken,
      });
    }
  } catch (error) {
    console.log("Logout API error:", error.response?.data || error.message);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

// CURRENT EMPLOYEE PROFILE
export const getEmployeeProfile = async () => {
  const response = await axiosInstance.get("/api/me/");
  return response.data;
};

// UPDATE CURRENT EMPLOYEE PROFILE
export const updateEmployeeProfile = async (data) => {
  const response = await axiosInstance.patch("/api/me/", data);
  return response.data;
};