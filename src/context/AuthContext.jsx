import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

// false = real API login
// true = fake login
const USE_MOCK_AUTH = false;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    // Fake login mode
    if (USE_MOCK_AUTH) {
      let fakeUser = null;

      if (email === "admin@hrms.com" && password === "admin123") {
        fakeUser = {
          email,
          role: "admin",
        };
      } else if (email === "hr2@hrms.com" && password === "password") {
        fakeUser = {
          email,
          role: "hr",
        };
      } else if (email === "manager@hrms.com" && password === "password") {
        fakeUser = {
          email,
          role: "manager",
        };
      } else if (email === "employee@hrms.com" && password === "password") {
        fakeUser = {
          email,
          role: "employee",
        };
      }

      if (!fakeUser) {
        return false;
      }

      localStorage.setItem("user", JSON.stringify(fakeUser));
      localStorage.setItem("token", "fake-token");
      setUser(fakeUser);

      return true;
    }

    // Real API login
    try {
      const data = await loginUser(email, password);

      console.log("Login response:", data);

      // Backend may return token in different keys
      const token =
        data.access ||
        data.token ||
        data?.tokens?.access ||
        data?.data?.access ||
        data?.data?.token;

      if (!token) {
        console.error("Token not found in login response:", data);
        throw new Error("Token not found in login response");
      }

      localStorage.setItem("token", token);

      // Backend may return user directly or inside user key
      let loggedInUser =
        data.user ||
        data.data?.user ||
        data.employee ||
        null;

      // If backend does not return user, create user using email
      if (!loggedInUser) {
        let role = "employee";

        if (email === "admin@hrms.com") {
          role = "admin";
        } else if (email === "hr2@hrms.com") {
          role = "hr";
        } else if (email === "manager@hrms.com") {
          role = "manager";
        } else if (email === "employee@hrms.com") {
          role = "employee";
        }

        loggedInUser = {
          email,
          role,
        };
      }

      // Normalize role
      loggedInUser = {
        ...loggedInUser,
        email: loggedInUser.email || email,
        role: (loggedInUser.role || "employee").toLowerCase(),
      };

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // Prevent UI flicker
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