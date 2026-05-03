import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

// 🔥 Toggle between MOCK and REAL API
const USE_MOCK_AUTH = false;

const MOCK_USERS = [
  { email: "admin@hrms.com", password: "admin123", role: "admin", employeeId: "HR001" },
  { email: "hr@hrms.com", password: "hr123", role: "hr", employeeId: "HR001" },
  { email: "manager@hrms.com", password: "manager123", role: "manager", employeeId: "MGR001" },
  { email: "employee@hrms.com", password: "employee123", role: "employee", employeeId: "EMP001" },
];

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
    if (USE_MOCK_AUTH) {
      // ADMIN
      if (email === "admin@hrms.com" && password === "admin123") {
        const fakeUser = {
          email,
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(fakeUser));
        setUser(fakeUser);
        return true;
      }

      // EMPLOYEE
      if (email === "employee@hrms.com" && password === "employee123") {
        const fakeUser = {
          email,
          role: "employee",
        };

        localStorage.setItem("user", JSON.stringify(fakeUser));
        setUser(fakeUser);
        return true;
      }

      return false;
    }

    // 🔥 REAL API LOGIN
    try {
      const data = await loginUser(email, password);

      const user = data.user || data;
      if (!user) {
        throw new Error("User data not found");
      }
      const token = data.access;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // 🚪 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // ⏳ Prevent UI flicker
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
