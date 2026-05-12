import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const TeacherPanel = ({ activeTab, user }) => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    rollNo: '',
    physics: '',
    chemistry: '',
    mathematics: '',
    english: '',
    computer: '',
    examType: 'Final'
  });

  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teachers/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/teachers/marks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success('Marks saved successfully!');
        setFormData({
          rollNo: '',
          physics: '',
          chemistry: '',
          mathematics: '',
          english: '',
          computer: '',
          examType: 'Final'
        });
      } else {
        toast.error('Failed to save marks');
      }
    } catch (error) {
      toast.error('Error saving marks');
    }
  };

  if (activeTab === 'overview') {
    return (
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-4xl mb-2">👨‍🏫</div>
          <h3 className="text-lg font-semibold">Subject</h3>
          <p className="text-xl font-bold text-primary">{user.subject}</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-2">🎓</div>
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-2xl font-bold text-primary">{students.length}</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-2">📝</div>
          <h3 className="text-lg font-semibold">Exams Conducted</h3>
          <p className="text-2xl font-bold text-primary">-</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-2">⭐</div>
          <h3 className="text-lg font-semibold">Average Performance</h3>
          <p className="text-2xl font-bold text-primary">-</p>
        </div>
      </div>
    );
  }

  if (activeTab === 'marks') {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Enter Student Marks</h2>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Roll Number</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="Enter student roll number"
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Exam Type</label>
            <select name="examType" value={formData.examType} onChange={handleChange} className="input-field">
              <option value="Mid Term">Mid Term</option>
              <option value="Final">Final</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half Yearly">Half Yearly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Physics</label>
            <input type="number" name="physics" value={formData.physics} onChange={handleChange} placeholder="0-100" className="input-field" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Chemistry</label>
            <input type="number" name="chemistry" value={formData.chemistry} onChange={handleChange} placeholder="0-100" className="input-field" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Mathematics</label>
            <input type="number" name="mathematics" value={formData.mathematics} onChange={handleChange} placeholder="0-100" className="input-field" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">English</label>
            <input type="number" name="english" value={formData.english} onChange={handleChange} placeholder="0-100" className="input-field" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Computer</label>
            <input type="number" name="computer" value={formData.computer} onChange={handleChange} placeholder="0-100" className="input-field" required />
          </div>
          
          <div className="md:col-span-2">
            <button type="submit" className="btn-primary w-full py-3">
              Save Marks
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (activeTab === 'students') {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Students List</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Roll No</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Class</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{student.rollNo}</td>
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.class}</td>
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

export default TeacherPanel;