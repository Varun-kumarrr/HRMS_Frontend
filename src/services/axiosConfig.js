import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hrms-6639.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// token auto attach
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;