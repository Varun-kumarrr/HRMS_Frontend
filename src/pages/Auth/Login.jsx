import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("admin@hrms.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await login(email, password);

      if (success) {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user?.role === "admin" || user?.role === "hr" || user?.role === "manager") {
          navigate("/dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login page error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (role) => {
    if (role === "admin") {
      setEmail("admin@hrms.com");
      setPassword("admin123");
    }

    if (role === "hr") {
      setEmail("hr2@hrms.com");
      setPassword("password");
    }

    if (role === "manager") {
      setEmail("manager@hrms.com");
      setPassword("password");
    }

    if (role === "employee") {
      setEmail("employee@hrms.com");
      setPassword("password");
    }

    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          HRMS Login
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Welcome back! Please login to your account
        </p>

        {/* Quick Login Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            type="button"
            onClick={() => fillCredentials("admin")}
            className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-2 rounded-lg text-sm hover:bg-blue-100"
          >
            Admin
          </button>

          <button
            type="button"
            onClick={() => fillCredentials("hr")}
            className="bg-purple-50 text-purple-700 border border-purple-100 px-3 py-2 rounded-lg text-sm hover:bg-purple-100"
          >
            HR
          </button>

          <button
            type="button"
            onClick={() => fillCredentials("manager")}
            className="bg-orange-50 text-orange-700 border border-orange-100 px-3 py-2 rounded-lg text-sm hover:bg-orange-100"
          >
            Manager
          </button>

          <button
            type="button"
            onClick={() => fillCredentials("employee")}
            className="bg-green-50 text-green-700 border border-green-100 px-3 py-2 rounded-lg text-sm hover:bg-green-100"
          >
            Employee
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;