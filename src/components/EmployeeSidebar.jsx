import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, CalendarCheck, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const EmployeeSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-white shadow-lg border-r flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-6 text-2xl font-bold text-blue-600">
          HRMS
        </div>

        {/* Menu */}
        <nav className="mt-4 space-y-2 px-3">

          {/* Dashboard */}
          <NavLink
            to="/employee-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <User size={18} />
            Profile
          </NavLink>

          {/* Attendance (future use) */}
          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <CalendarCheck size={18} />
            Attendance
          </NavLink>

        </nav>
      </div>

      {/* Bottom Section (Logout) */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  );
};

export default EmployeeSidebar;