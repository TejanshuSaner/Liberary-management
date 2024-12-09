import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Logged in successfully");
        window.location.href = "/books"; // Redirect after login
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };

  return (
    <div className="p-8">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="block my-4 p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block my-4 p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
