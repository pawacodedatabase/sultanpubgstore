import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
      <button 
        className="bg-blue-500 px-6 py-2 rounded-lg mb-4 hover:bg-blue-600"
        onClick={() => navigate("/add")}
      >
        Add  Account
      </button>
      <button 
        className="bg-yellow-500 px-6 py-2 rounded-lg mb-4 hover:bg-yellow-600"
        onClick={() => navigate("/manage")}
      >
        Manage Accounts
      </button>
      <button 
        className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
