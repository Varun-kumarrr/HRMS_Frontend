import axios from "axios";

// base URL
axios.defaults.baseURL = "";

// token auto attach
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});