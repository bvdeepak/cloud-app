import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">📁 CloudVault</Link>
      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/upload" className="hover:underline">Upload</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
