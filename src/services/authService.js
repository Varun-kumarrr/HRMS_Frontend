import axios from "axios";

const API_URL = "/api/auth/login/";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login/", {
      email,
      password,
    });

    const data = response.data;

    // 🔥 IMPORTANT
    if (data.access) {
      localStorage.setItem("token", data.access);
    }

    return data;

  } catch (error) {
    console.error("Login error:", error.response);
    throw error;
  }
};


// Employee profile
export const getEmployeeProfile = async () => {
  try {
    const response = await axios.get("/api/me/");

    const data = response.data;

    return data;

  } catch (error) {
    console.error("Employee fetch error:", error.response);
    throw error;
  }
};