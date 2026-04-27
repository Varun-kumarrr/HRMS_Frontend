import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold text-gray-800">
        Dashboard
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