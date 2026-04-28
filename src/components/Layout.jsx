import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import EmployeeSidebar from "./EmployeeSidebar";

const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="flex h-screen bg-gray-100">
      {user?.role === "admin" ? <Sidebar /> : <EmployeeSidebar />}

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;