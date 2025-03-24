import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/banner_7.jpg";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Convert input username to lowercase to make login case-insensitive
    if (username.toLowerCase() === "sultan" && password === "pass1234") {
      sessionStorage.setItem("adminLoggedIn", "true");
      navigate("/admin"); // Redirect to Admin Panel
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${logo})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Login box */}
      <div className="relative z-10 bg-black bg-opacity-80 p-8 rounded-lg text-center text-white w-96">
        <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
        <p className="text-red-400 text-sm mb-4">Only admin can have access to this page</p>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border rounded text-black w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded text-black w-full"
        />
        <button
          onClick={handleLogin}
          className="border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-black mb-6 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
