import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import axios from 'axios';

const LoginPage = () => {
  const [credentials, setCredentialsState] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      dispatch(setCredentials(response.data));
      alert('Login successful!');
    } catch (error) {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="w-1/3 p-5 bg-white rounded shadow" onSubmit={handleSubmit}>
        <h1 className="mb-5 text-2xl font-bold text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentialsState({ ...credentials, username: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentialsState({ ...credentials, password: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
