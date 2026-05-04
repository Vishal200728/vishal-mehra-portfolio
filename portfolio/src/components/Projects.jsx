// src/components/Projects.jsx
import React, { useState } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const projects = [
    { 
      title: 'E-Commerce Platform', 
      category: 'Full Stack', 
      description: 'Full-featured e-commerce with cart, auth, and payments.', 
      tech: ['React', 'Node.js', 'MongoDB'], 
      icon: '🛒',
      githubCode: 'https://github.com/Vishal200728/websites.git',
      demoLink: '#'
    },
    { 
      title: 'Tic Tac Toe Game', 
      category: 'Game', 
      description: 'Classic game with AI and two-player modes.', 
      tech: ['React', 'JavaScript'], 
      icon: '🎮',
      githubCode: 'https://github.com/Vishal200728/tic-tac-toe',
      demoLink: '#'
    },
    { 
      title: 'Rock Paper Scissors', 
      category: 'Game', 
      description: 'Classic game with smart AI logic.', 
      tech: ['React', 'CSS'], 
      icon: '🪨',
      githubCode: 'https://github.com/Vishal200728/rock-paper-scissors',
      demoLink: '#'
    },
    { 
      title: 'Student Dashboard', 
      category: 'Full Stack', 
      description: 'Educational platform for marks and grades.', 
      tech: ['React', 'Node.js', 'MongoDB'], 
      icon: '📚',
      githubCode: 'https://github.com/Vishal200728/student-dashboard',
      demoLink: '#'
    },
    { 
      title: 'Auth System', 
      category: 'Backend', 
      description: 'Secure auth with JWT and password hashing.', 
      tech: ['Node.js', 'Express', 'MongoDB'], 
      icon: '🔐',
      githubCode: 'https://github.com/Vishal200728/auth-system',
      demoLink: '#'
    },
    { 
      title: 'URL Shortener', 
      category: 'Full Stack', 
      description: 'Short links with analytics.', 
      tech: ['React', 'Node.js', 'MongoDB'], 
      icon: '🔗',
      githubCode: 'https://github.com/Vishal200728/url-shortener',
      demoLink: '#'
    }
  ];

  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);
  const filters = ['All', 'Full Stack', 'Game', 'Backend'];

  return (
    <section id="projects" className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {project.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a 
                  href={project.githubCode} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 font-medium text-sm hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Code <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 font-medium text-sm hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Demo <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;