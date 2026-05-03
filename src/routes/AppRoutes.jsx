import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeList from "../pages/Employees/EmployeeList";
import TimeTracking from "../pages/TimeTracking/TimeTracking";
import LeaveManagement from "../pages/LeaveManagement/LeaveManagement";
import PayrollManagement from "../pages/PayrollManagement/PayrollManagement";
import RecruitmentManagement from "../pages/RecruitmentManagement/RecruitmentManagement";
import ProtectedRoute from "../components/ProtectedRoute";
import EmployeeDashboard from "../pages/EmployeePanel/EmployeeDashboard";
import Profile from "../pages/EmployeePanel/Profile";
import Attendance from "../pages/EmployeePanel/Attendance";
import Contact from "../pages/EmployeePanel/Contact";
import Education from "../pages/EmployeePanel/Education";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeeList />
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

      {/* EMPLOYEE ROUTE */}
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE PROFILE ROUTE */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute role="employee">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE Attendance Route */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute role="employee">
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute role="employee">
            <Contact />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Education-Qualification"
        element={
          <ProtectedRoute role="employee">
            <Education />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
