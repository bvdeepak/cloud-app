import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { email, password });
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
