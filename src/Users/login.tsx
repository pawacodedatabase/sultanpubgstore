import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from '../images/banner_3.jpg'
import img2 from '../images/banner_5.jpg'
const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Can be username or email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const binId = "67f4ece28561e97a50fae858";
    const apiKey = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu";
  
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: {
        "X-Master-Key": apiKey,
      }
    });
  
    const binData = await response.json();
    const users = binData.record.users || [];
  
    const foundUser = users.find(
      (user: any) =>
        (user.username.toLowerCase() === identifier.toLowerCase() ||
          user.email.toLowerCase() === identifier.toLowerCase()) &&
        user.password === password
    );
  
    if (foundUser) {
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));
      alert("Login successful!");
      navigate("/profile");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  
  return (
    <div className="h-screen flex bg-black">
    {/* Left side with image and overlay */}
    <div className="hidden md:flex w-1/2 relative">
      <img src={img} alt="Futuristic Robot" className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black opacity-60"></div>
    </div>
  
    {/* Right side */}
    <div className="w-full md:w-1/2 flex items-center justify-center p-6">
      {/* Form card with background image, dark overlay, border, shadow and hover effect */}
      <div
        className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-[#ccc] transition-transform duration-300 hover:scale-[1.02]"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
  
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-70 z-0" />
  
        {/* Form content */}
        <div className="relative z-10 text-white p-8 space-y-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold">Hello !<br />Welcome Back</h2>
  
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Enter Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="••••••••"
                required
              />
              <div className="text-sm mt-2 text-right text-purple-400 hover:underline cursor-pointer">
                Recover Password ?
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition duration-200 py-2 rounded-md text-white font-medium"
            >
              Sign In
            </button>
          </form>
  
          <div className="flex items-center justify-between mt-6">
            <hr className="w-1/4 border-gray-700" />
            <span className="text-sm text-gray-400">Don’t have an account?</span>
            <hr className="w-1/4 border-gray-700" />
          </div>
  
          <p className="text-sm text-center text-gray-400 mt-6">
            <Link to="/signup" className="text-purple-400 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
