import axios from "axios";

const API = "https://hrms-6639.onrender.com";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API}/api/auth/login/`, {
      email: email,     // 🔥 correct field
      password: password,
    });

    const data = response.data;

    if (data.access) {
      localStorage.setItem("token", data.access);
    }

    return data;

  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw error;
  }
};

// Employee profile
export const getEmployeeProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // 🔥 missing tha

    const response = await axios.get("/api/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    console.error("Employee fetch error:", error.response?.data);
    throw error;
  }
};