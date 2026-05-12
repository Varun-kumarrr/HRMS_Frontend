import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);

      console.log("Login success data:", data);

      const accessToken =
        data.access ||
        data.token ||
        data.access_token ||
        data.jwt ||
        data.tokens?.access;

      const refreshToken =
        data.refresh ||
        data.refresh_token ||
        data.tokens?.refresh ||
        "";

      if (!accessToken) {
        return {
          success: false,
          message: "Login successful but access token not found.",
        };
      }

      const loggedInUser =
        data.user || {
          email,
          role: data.role || "admin",
        };

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setToken(accessToken);
      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);

      return {
        success: false,
        message:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.response?.data?.non_field_errors?.[0] ||
          "Invalid email or password",
      };
    }
  };

  const logout = async () => {
    await logoutUser();

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};