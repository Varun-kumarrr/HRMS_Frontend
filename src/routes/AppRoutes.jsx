import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeList from "../pages/Employees/EmployeeList";
import TimeTracking from "../pages/TimeTracking/TimeTracking";
import LeaveManagement from "../pages/LeaveManagement/LeaveManagement";
import ProtectedRoute from "../components/ProtectedRoute";

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
    </Routes>
  );
};

export default AppRoutes;