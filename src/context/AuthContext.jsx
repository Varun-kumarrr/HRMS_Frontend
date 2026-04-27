import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

// 🔥 Toggle between MOCK and REAL API
const USE_MOCK_AUTH = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN FUNCTION
  const login = async (email, password) => {
    // 🔥 MOCK LOGIN
    if (USE_MOCK_AUTH) {
      if (email === "admin@hrms.com" && password === "admin123") {
        const fakeUser = {
          email,
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(fakeUser));
        setUser(fakeUser);

        return true;
      }

      return false;
    }

    // 🔥 REAL API LOGIN
    try {
      const response = await loginUser(email, password);
      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // 🚪 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ⏳ Prevent UI flicker before auth check
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);