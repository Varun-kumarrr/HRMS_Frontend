import axiosInstance from "./axiosInstance";

// LOGIN API
export const loginUser = async (email, password) => {
  try {
    // First try email payload
    const response = await axiosInstance.post("/api/auth/login/", {
      email,
      password,
    });

    return response.data;
  } catch (firstError) {
    console.log("First login attempt failed:", firstError.response?.data);

    try {
      // Second try username payload
      const response = await axiosInstance.post("/api/auth/login/", {
        username: email,
        password,
      });

      return response.data;
    } catch (secondError) {
      console.log("Login error status:", secondError.response?.status);
      console.log("Login error data:", secondError.response?.data);
      console.log("Login error full:", secondError);

      throw secondError;
    }
  }
};

// LOGOUT API
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

// GET CURRENT EMPLOYEE PROFILE
export const getEmployeeProfile = async () => {
  const response = await axiosInstance.get("/api/me/");
  return response.data;
};

// UPDATE CURRENT EMPLOYEE PROFILE
export const updateEmployeeProfile = async (data) => {
  const response = await axiosInstance.patch("/api/me/", data);
  return response.data;
};