import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentPanel from '../components/StudentPanel';
import TeacherPanel from '../components/TeacherPanel';
import AdminPanel from '../components/AdminPanel';

const Dashboard = () => {
  const { user, role, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">School Management System</h1>
            <p className="text-sm text-gray-500">Welcome, {user.name} ({role})</p>
          </div>
          <button onClick={logout} className="btn-primary px-4 py-2">
            Logout
          </button>
        </div>
      </header>
      
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-2 font-semibold transition ${
                activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
              }`}
            >
              Overview
            </button>
            {role === 'student' && (
              <button
                onClick={() => setActiveTab('marks')}
                className={`py-3 px-2 font-semibold transition ${
                  activeTab === 'marks' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                }`}
              >
                My Marks
              </button>
            )}
            {role === 'teacher' && (
              <>
                <button
                  onClick={() => setActiveTab('marks')}
                  className={`py-3 px-2 font-semibold transition ${
                    activeTab === 'marks' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                >
                  Manage Marks
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`py-3 px-2 font-semibold transition ${
                    activeTab === 'students' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                >
                  Students List
                </button>
              </>
            )}
            {role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`py-3 px-2 font-semibold transition ${
                    activeTab === 'students' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                >
                  Manage Students
                </button>
                <button
                  onClick={() => setActiveTab('teachers')}
                  className={`py-3 px-2 font-semibold transition ${
                    activeTab === 'teachers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                >
                  Manage Teachers
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {role === 'student' && <StudentPanel activeTab={activeTab} user={user} />}
        {role === 'teacher' && <TeacherPanel activeTab={activeTab} user={user} />}
        {role === 'admin' && <AdminPanel activeTab={activeTab} user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;