import axios from "axios";

// base URL
axios.defaults.baseURL = "https://hrms-6639.onrender.com";

// token auto attach (FIXED)
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // 🔥 LOGIN API ko skip karo
  if (token && !config.url.includes("/api/auth/login/")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});