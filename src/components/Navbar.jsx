import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const titleMap = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/time-tracking": "Time Tracking",
    "/leave-management": "Leave Management",
  };

  const pageTitle = titleMap[location.pathname] || "HRMS";

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold text-gray-800">
        {pageTitle}
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">
          {user?.email}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;