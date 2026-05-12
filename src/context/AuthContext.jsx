import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getEmployeeProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      // Step 1: get token
      const data = await loginUser(email, password);

      if (!data.access) {
        throw new Error("No access token returned");
      }

      // Step 2: save token so axiosInstance interceptor can attach it
      localStorage.setItem("token", data.access);
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }

      // Step 3: fetch user profile
      const userProfile = await getEmployeeProfile();

      console.log("USER PROFILE:", userProfile);

      // Step 4: save user
      localStorage.setItem("user", JSON.stringify(userProfile));
      setUser(userProfile);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      // Clean up if something failed
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      return false;
    }
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setUser(null);
  };

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

export const useAuth = () => useContext(AuthContext);