import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hrms-6639.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every protected request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;