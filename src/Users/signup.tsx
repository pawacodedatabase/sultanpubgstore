import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiInstagram,
  FiMapPin,
  // FiCamera,
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa'

import bg from '../images/banner_4.jpg'


const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    location: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    bio: "",
    instagram: "",
    tiktok: "",
    profilePictures: [] as string[]
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sultan");
      formData.append("cloud_name", "dx90y9zdx");

      const res = await fetch("https://api.cloudinary.com/v1_1/dx90y9zdx/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      uploadedUrls.push(data.secure_url);
    }

    setForm(prev => ({
      ...prev,
      profilePictures: [...prev.profilePictures, ...uploadedUrls]
    }));

    setUploading(false);
  };

  const handleImageDelete = (url: string) => {
    setForm(prev => ({
      ...prev,
      profilePictures: prev.profilePictures.filter(img => img !== url)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match.");
    }

    const newUser = {
      id: uuidv4(),
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
      location: form.location,
      dateSignedUp: new Date().toISOString(),
      phoneNumber: form.phoneNumber,
      profilePicture: form.profilePictures,
      bio: form.bio,
      socialMedia: {
        instagram: form.instagram,
        tiktok: form.tiktok
      },
      comments: []
    };

    const binId = "67f4ece28561e97a50fae858";
    const apiKey = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu";

    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: {
        "X-Master-Key": apiKey
      }
    });

    const binData = await response.json();
    const users = binData.record.users || [];

    users.push(newUser);

    await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey
      },
      body: JSON.stringify({ users })
    });

    alert("Signup successful!");
    setForm({
      fullName: "",
      username: "",
      email: "",
      location: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      bio: "",
      instagram: "",
      tiktok: "",
      profilePictures: []
    });
    navigate("/userlogin");
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center relative"
  style={{
    backgroundImage: `url(${bg})`, // Replace with your image path
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-70 z-0" />

  {/* Form */}
  <div className="relative z-10 max-w-2xl w-full bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 text-white">
    <h2 className="text-xl font-semibold mb-6 text-center">Create An Account</h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Input Fields */}
      {[
        { name: "fullName", label: "Full Name", icon: <FiUser /> },
        { name: "username", label: "Username", icon: <FiUser /> },
        { name: "email", label: "Email", icon: <FiMail />, type: "email" },
        { name: "location", label: "Location", icon: <FiMapPin /> },
        { name: "phoneNumber", label: "Phone Number", icon: <FiPhone /> },
        { name: "password", label: "Password", icon: <FiLock />, type: "password" },
        { name: "confirmPassword", label: "Confirm Password", icon: <FiLock />, type: "password" },
        { name: "instagram", label: "Instagram", icon: <FiInstagram /> },
        { name: "tiktok", label: "TikTok", icon: <FaTiktok /> },
      ].map(({ name, label, icon, type = "text" }) => (
        <div key={name}>
          <label className="block text-sm font-semibold mb-1">{label}</label>
          <div className="flex items-center border border-gray-300 bg-white/20 rounded-md px-3 py-2">
            <span className="mr-2 text-lg">{icon}</span>
            <input
              type={type}
              name={name}
              value={(form as any)[name]}
              onChange={handleChange}
              placeholder={label}
              className="bg-transparent w-full focus:outline-none text-white placeholder:text-gray-300"
              required
            />
          </div>
        </div>
      ))}

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold mb-1">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="w-full border border-gray-300 bg-white/20 backdrop-blur-sm text-white placeholder:text-gray-300 px-3 py-2 rounded-md focus:outline-none"
          required
        />
      </div>

      {/* Profile Pictures Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2">Upload Profile Pictures</label>
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
          className="block mb-2 text-white"
        />
        {uploading && <p className="text-sm text-blue-400">Uploading...</p>}
        <div className="flex flex-wrap gap-3 mt-2">
          {form.profilePictures.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt="profile"
                className="h-16 w-16 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(url)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>
  );
};

export default Signup;
