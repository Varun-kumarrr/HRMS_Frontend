import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Clock3, CalendarCheck, Calculator, Briefcase } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg border-r">

      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-blue-600">
        HRMS
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-2 px-3">

        <NavLink
          to="/dashboard"
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

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Users size={18} />
          Employees
        </NavLink>

        <NavLink
          to="/time-tracking"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Clock3 size={18} />
          Time Tracking
        </NavLink>

        <NavLink
          to="/leave-management"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <CalendarCheck size={18} />
          Leave Management
        </NavLink>

        <NavLink
          to="/payroll-management"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Calculator size={18} />
          Payroll Management
        </NavLink>

        <NavLink
          to="/recruitment-management"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Briefcase size={18} />
          Recruitment
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;