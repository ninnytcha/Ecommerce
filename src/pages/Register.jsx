import React, { useState } from "react";
import "../styles/register.css"
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "",
    avatar: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.name || !formData.password || !formData.avatar || !formData.role  )  {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
        await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (response.ok) {
            localStorage.setItem("token",data.access_token)
            localStorage.setItem("refresh_token",data.refresh_token)
            navigate("/")
        } 
      console.log("Registered user:", formData);
      setMessage("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage(error.message);
    }
  };

  

  return (
    <div  className="main-cont">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Register
          </h2>

          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>

          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Avatar URL
          </label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Paste avatar image URL"
            className="w-full p-2 border rounded-md mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>

          {message && (
            <p className="mt-4 text-center text-gray-700 font-medium">
              {message}
            </p>
          )}
          <label className="block mb-2 text-sm font-semibold text-gray-600"><br/>
            <span>Already have account? <Link to="/auth/login">Login!</Link></span>
          </label>
        </form>
      </div>
    </div>
  );
}
