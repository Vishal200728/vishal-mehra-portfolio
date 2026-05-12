import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AdminPanel = ({ activeTab }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/dashboard');
      const data = await response.json();
      setStudents(data.students || []);
      setTeachers(data.teachers || []);
      setStats(data.stats || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await fetch(`http://localhost:5000/api/admin/student/${id}`, { method: 'DELETE' });
        toast.success('Student deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const deleteTeacher = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await fetch(`http://localhost:5000/api/admin/teacher/${id}`, { method: 'DELETE' });
        toast.success('Teacher deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete teacher');
      }
    }
  };

  if (activeTab === 'overview') {
    return (
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card text-center bg-gradient-to-r from-primary to-secondary text-white">
          <div className="text-4xl mb-2">👨‍🎓</div>
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-3xl font-bold">{stats.totalStudents || 0}</p>
        </div>
        <div className="card text-center bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="text-4xl mb-2">👩‍🏫</div>
          <h3 className="text-lg font-semibold">Total Teachers</h3>
          <p className="text-3xl font-bold">{stats.totalTeachers || 0}</p>
        </div>
        <div className="card text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="text-4xl mb-2">📝</div>
          <h3 className="text-lg font-semibold">Total Exams</h3>
          <p className="text-3xl font-bold">{stats.totalExams || 0}</p>
        </div>
        <div className="card text-center bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="text-4xl mb-2">📊</div>
          <h3 className="text-lg font-semibold">Avg Percentage</h3>
          <p className="text-3xl font-bold">{stats.averagePercentage?.toFixed(1) || 0}%</p>
        </div>
      </div>
    );
  }

  if (activeTab === 'students') {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Manage Students</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Roll No</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.rollNo}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.class}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'teachers') {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Manage Teachers</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Qualification</th>
                <th className="px-4 py-3 text-left">Experience</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {teachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{teacher.name}</td>
                  <td className="px-4 py-3">{teacher.email}</td>
                  <td className="px-4 py-3">{teacher.subject}</td>
                  <td className="px-4 py-3">{teacher.qualification || '-'}</td>
                  <td className="px-4 py-3">{teacher.experience || 0} yrs</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteTeacher(teacher._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminPanel;