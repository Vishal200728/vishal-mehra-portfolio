import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaUserGraduate, FaChalkboardTeacher, FaKey, FaEnvelope, FaIdCard } from 'react-icons/fa';

const Login = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({ rollNo: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === 'student' 
      ? 'http://localhost:5000/api/students/login'
      : 'http://localhost:5000/api/teachers/login';
    
    const body = role === 'student' 
      ? { rollNo: formData.rollNo, password: formData.password }
      : { email: formData.email, password: formData.password };
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (res.ok) {
        const userData = role === 'student' ? data.student : data.teacher;
        login(userData, data.token, role);
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Server not running. Please start backend server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
          <h1 className="text-2xl font-bold">School Management</h1>
          <p className="text-sm mt-1">Login to your account</p>
        </div>
        
        <div className="flex border-b">
          <button 
            onClick={() => setRole('student')} 
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-2 ${
              role === 'student' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
            }`}
          >
            <FaUserGraduate /> Student
          </button>
          <button 
            onClick={() => setRole('teacher')} 
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-2 ${
              role === 'teacher' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
            }`}
          >
            <FaChalkboardTeacher /> Teacher
          </button>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {role === 'student' ? (
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Roll Number" 
                  value={formData.rollNo} 
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} 
                  className="input-field pl-10" 
                  required 
                />
              </div>
            ) : (
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  className="input-field pl-10" 
                  required 
                />
              </div>
            )}
            
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                className="input-field pl-10" 
                required 
              />
            </div>
            
            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              <FaKey /> Login
            </button>
          </form>
          
          <p className="text-center mt-4 text-sm">
            Don't have an account? <Link to="/register" className="text-primary font-semibold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;