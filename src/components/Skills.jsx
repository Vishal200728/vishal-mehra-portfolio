// src/components/Skills.jsx
import React from 'react';

const Skills = () => {
  const skills = [
    { name: 'React', color: 'from-cyan-400 to-blue-500', icon: '⚛️', level: '90%' },
    { name: 'Node.js', color: 'from-green-400 to-emerald-500', icon: '💚', level: '85%' },
    { name: 'Express', color: 'from-gray-400 to-gray-600', icon: '🚂', level: '85%' },
    { name: 'MongoDB', color: 'from-green-500 to-teal-500', icon: '🍃', level: '80%' },
    { name: 'Tailwind CSS', color: 'from-sky-400 to-blue-500', icon: '🎨', level: '90%' },
    { name: 'JavaScript', color: 'from-yellow-400 to-amber-500', icon: '💛', level: '88%' },
    { name: 'HTML5', color: 'from-orange-500 to-red-500', icon: '🌐', level: '95%' },
    { name: 'CSS3', color: 'from-blue-500 to-indigo-500', icon: '🎨', level: '92%' },
    { name: 'Cloudinary', color: 'from-blue-400 to-purple-500', icon: '☁️', level: '75%' }
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{skill.icon}</span>
                <h3 className="text-xl font-bold text-gray-800">{skill.name}</h3>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 group-hover:opacity-80`}
                  style={{ width: skill.level }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">{skill.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;