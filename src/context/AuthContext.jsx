import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 LOGIN FUNCTION (API CONNECTED)
  const login = async (email, password) => {
  try {
    const response = await loginUser(email, password);

    console.log("FULL RESPONSE:", response);

    // 🔥 IMPORTANT CHECK
    if (response.status === 200 || response.status === 201) {
      setUser({ email }); // store minimal user

      localStorage.setItem("user", JSON.stringify({ email }));

      return true;
    }

    return false;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

  // 🚪 LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);