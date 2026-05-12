import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaSchool, FaTachometerAlt, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';

const Header = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <FaSchool className="text-2xl" />
            <span className="font-bold text-xl">School Management</span>
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden sm:inline">{user?.name || 'User'}</span>
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;