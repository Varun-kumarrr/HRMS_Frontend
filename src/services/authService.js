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

    const data = response.data;
  
    


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