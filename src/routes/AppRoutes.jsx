import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeDashboard from "../pages/EmployeePanel/EmployeeDashboard";
import Profile from "../pages/EmployeePanel/Profile";
import Attendance from "../pages/EmployeePanel/Attendance";
import Contact from "../pages/EmployeePanel/Contact";
import Education from "../pages/EmployeePanel/Education";

import EmployeeList from "../pages/Employees/EmployeeList";
import LeaveManagement from "../pages/LeaveManagement/LeaveManagement";
import PayrollManagement from "../pages/PayrollManagement/PayrollManagement";
import RecruitmentManagement from "../pages/RecruitmentManagement/RecruitmentManagement";
import TimeTracking from "../pages/TimeTracking/TimeTracking";
import CreateEmployee from "../pages/Employees/CreateEmployee";

const AppRoutes = () => {
  const { user } = useAuth();

  const getHomeRoute = () => {
    const role = user?.role?.toLowerCase();

    if (role === "admin" || role === "hr" || role === "manager") {
      return "/dashboard";
    }

    return "/employee-dashboard";
  };

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/"
        element={user ? <Navigate to={getHomeRoute()} replace /> : <Login />}
      />

      {/* Admin / HR / Manager Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Dashboard */}
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Panel */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-employee"
        element={
          <ProtectedRoute>
            <CreateEmployee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />

      <Route
        path="/education-qualification"
        element={
          <ProtectedRoute>
            <Education />
          </ProtectedRoute>
        }
      />

      {/* Admin / HR / Manager Pages */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leave-management"
        element={
          <ProtectedRoute>
            <LeaveManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payroll-management"
        element={
          <ProtectedRoute>
            <PayrollManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruitment-management"
        element={
          <ProtectedRoute>
            <RecruitmentManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/time-tracking"
        element={
          <ProtectedRoute>
            <TimeTracking />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route
        path="*"
        element={<Navigate to={user ? getHomeRoute() : "/"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;