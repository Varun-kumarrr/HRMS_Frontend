import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeList from "../pages/Employees/EmployeeList";
import ProtectedRoute from "../components/ProtectedRoute";
import EmployeeDashboard from "../pages/EmployeePanel/EmployeeDashboard";
import Profile from "../pages/EmployeePanel/Profile";
import Attendance from "../pages/EmployeePanel/Attendance";
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
      {/* EMPLOYEE Attendence Route */}
      <Route
  path="/attendance"
  element={
    <ProtectedRoute role="employee">
      <Attendance />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;
