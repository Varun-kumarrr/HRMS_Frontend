import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; // ✅ ADD THIS
import "./index.css";
import "./services/axiosConfig";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>   {/* ✅ WRAP APP */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);