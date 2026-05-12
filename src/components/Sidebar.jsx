import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  Calculator,
  Briefcase,
  UserPlus,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: Users,
    },
    {
      name: "Time Tracking",
      path: "/time-tracking",
      icon: Clock,
    },
    {
      name: "Create HR",
      path: "/create-employee",
      icon: UserPlus,
    },
    {
      name: "Leave Management",
      path: "/leave-management",
      icon: CalendarDays,
    },
    {
      name: "Payroll Management",
      path: "/payroll-management",
      icon: Calculator,
    },
    {
      name: "Recruitment",
      path: "/recruitment",
      icon: Briefcase,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 px-4 py-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">HRMS</h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;