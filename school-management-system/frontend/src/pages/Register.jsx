import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', rollNo: '', class: '10th', subject: '', qualification: '', experience: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === 'student' 
      ? 'http://localhost:5000/api/students/register'
      : 'http://localhost:5000/api/teachers/register';
    
    const body = role === 'student' 
      ? { name: formData.name, email: formData.email, password: formData.password, rollNo: formData.rollNo, class: formData.class }
      : { name: formData.name, email: formData.email, password: formData.password, subject: formData.subject, qualification: formData.qualification, experience: formData.experience };
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm">Register as Student or Teacher</p>
        </div>
        
        <div className="flex border-b">
          <button onClick={() => setRole('student')} className={`flex-1 py-3 font-semibold ${role === 'student' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}>Student</button>
          <button onClick={() => setRole('teacher')} className={`flex-1 py-3 font-semibold ${role === 'teacher' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}>Teacher</button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="name" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
            <input type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" required />
            <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input-field" required />
            
            {role === 'student' ? (
              <>
                <input type="text" name="rollNo" placeholder="Roll Number" onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} className="input-field" required />
                <select name="class" onChange={(e) => setFormData({ ...formData, class: e.target.value })} className="input-field">
                  <option>9th</option><option>10th</option><option>11th</option><option>12th</option>
                </select>
              </>
            ) : (
              <>
                <input type="text" name="subject" placeholder="Subject" onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="input-field" required />
                <input type="text" name="qualification" placeholder="Qualification" onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} className="input-field" />
                <input type="number" name="experience" placeholder="Experience (years)" onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="input-field" />
              </>
            )}
            
            <button type="submit" className="btn-primary w-full py-3">Register</button>
          </form>
          <p className="text-center mt-4 text-sm">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;