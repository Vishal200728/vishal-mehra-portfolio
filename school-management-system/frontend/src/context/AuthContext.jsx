import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
    }
  }, []);

  const login = (userData, authToken, userRole) => {
    console.log('🔐 Login called with:', { userData, authToken, userRole });
    setUser(userData);
    setToken(authToken);
    setRole(userRole);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', userRole);
    toast.success('Login successful!');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.clear();
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};