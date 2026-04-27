import axios from "axios";

const API_URL = "/api/auth/login/";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response);
    throw error;
  }
};