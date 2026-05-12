import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentPanel = ({ activeTab, user }) => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'marks') {
      fetchMarks();
    }
  }, [activeTab]);

  const fetchMarks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/marks/${user.rollNo}`);
      const data = await response.json();
      setMarks(data.marks || []);
    } catch (error) {
      console.error('Error fetching marks:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = marks.map(m => ({
    exam: m.examType,
    percentage: m.percentage,
    total: m.total
  }));

  if (activeTab === 'overview') {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-4xl mb-2">📚</div>
          <h3 className="text-lg font-semibold">Class</h3>
          <p className="text-2xl font-bold text-primary">{user.class || '10th'}</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-2">🎓</div>
          <h3 className="text-lg font-semibold">Roll Number</h3>
          <p className="text-2xl font-bold text-primary">{user.rollNo}</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-2">📊</div>
          <h3 className="text-lg font-semibold">Total Exams</h3>
          <p className="text-2xl font-bold text-primary">{marks.length}</p>
        </div>
        
        <div className="card md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Academic Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exam" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="percentage" stroke="#6366f1" name="Percentage" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Subjects</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Physics</span>
              <span className="font-semibold">{marks[0]?.physics || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Chemistry</span>
              <span className="font-semibold">{marks[0]?.chemistry || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Mathematics</span>
              <span className="font-semibold">{marks[0]?.mathematics || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>English</span>
              <span className="font-semibold">{marks[0]?.english || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Computer</span>
              <span className="font-semibold">{marks[0]?.computer || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'marks') {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">My Marks</h2>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : marks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No marks available yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Exam</th>
                  <th className="px-4 py-3 text-left">Physics</th>
                  <th className="px-4 py-3 text-left">Chemistry</th>
                  <th className="px-4 py-3 text-left">Math</th>
                  <th className="px-4 py-3 text-left">English</th>
                  <th className="px-4 py-3 text-left">Computer</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">%</th>
                  <th className="px-4 py-3 text-left">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {marks.map((mark, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{mark.examType}</td>
                    <td className="px-4 py-3">{mark.physics || '-'}</td>
                    <td className="px-4 py-3">{mark.chemistry || '-'}</td>
                    <td className="px-4 py-3">{mark.mathematics || '-'}</td>
                    <td className="px-4 py-3">{mark.english || '-'}</td>
                    <td className="px-4 py-3">{mark.computer || '-'}</td>
                    <td className="px-4 py-3 font-semibold">{mark.total}</td>
                    <td className="px-4 py-3 font-semibold">{mark.percentage?.toFixed(1)}%</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        mark.grade === 'A+' ? 'bg-green-100 text-green-700' :
                        mark.grade === 'A' ? 'bg-blue-100 text-blue-700' :
                        mark.grade === 'B+' ? 'bg-indigo-100 text-indigo-700' :
                        mark.grade === 'B' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {mark.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default StudentPanel;