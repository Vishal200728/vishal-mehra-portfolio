// src/components/Projects.jsx
import React, { useState } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const projects = [
    { 
      title: 'Food Recipe App', 
      category: 'Full Stack', 
      description: 'Search any recipe, get ingredients, cooking instructions, and video tutorials using The Meal DB API. Search by name, category, or ingredient.',
      tech: ['React', 'API', 'Tailwind CSS', 'Axios'], 
      icon: '🍔',
      githubCode: 'https://github.com/Vishal200728/food-recipe-app',
      demoLink: 'https://vishal-mehra-portfolio-4hkb.vercel.app',
      apiUsed: 'The Meal DB API'
    },
    { 
      title: 'Weather App', 
      category: 'Full Stack', 
      description: 'Real-time weather updates, 5-day forecast, temperature, humidity, wind speed, and "feels like" using OpenWeatherMap API.',
      tech: ['React', 'API', 'Axios', 'Tailwind CSS'], 
      icon: '🌤️',
      githubCode: 'https://github.com/Vishal200728/tik-tak-game.git',
      demoLink: 'https://tik-tak-game.vercel.app',
      apiUsed: 'OpenWeatherMap API'
    },
    { 
      title: 'E-Commerce Platform', 
      category: 'Full Stack', 
      description: 'Full-featured e-commerce website with product listings, shopping cart, user authentication, and secure payment integration.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'], 
      icon: '🛒',
      githubCode: 'https://github.com/Vishal200728/ecommerce-platform',
      demoLink: 'https://ecommerce-siteapp.vercel.app'
    },
   { 
  title: 'Student Management System', 
  category: 'Full Stack', 
  description: 'Complete educational platform with role-based login (Student/Teacher/Admin). Students can check marks, teachers can edit grades, and admins can oversee all user accounts. Includes secure JWT authentication.', 
  tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'], 
  icon: '🎓',
  githubCode: 'https://github.com/Vishal200728/student-management-system',
  demoLink: 'https://vishal-mehra-portfolio-la7g.vercel.app/login'
},
    { 
      title: 'URL Shortener', 
      category: 'Backend', 
      description: 'Fast URL shortening service that converts long URLs into short, shareable links. Includes analytics and custom short codes.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'], 
      icon: '🔗',
      githubCode: 'https://github.com/Vishal200728/url-shortener',
      demoLink: 'https://vishal-mehra-portfolio-213u.vercel.app'
    },
    { 
  title: 'Image Converter', 
  category: 'Full Stack', 
  description: 'Convert images to different formats (PNG, JPG, WEBP). Resize, compress, and preview images before download.', 
  tech: ['React', 'Vite', 'Tailwind CSS', 'Browser API'], 
  icon: '🖼️',
  githubCode: 'https://github.com/Vishal200728/image-converter',
  demoLink: 'https://weather-project-woad-three.vercel.app'
},
    { 
      title: 'Tic Tac Toe Game', 
      category: 'Game', 
      description: 'Interactive Tic Tac Toe game with smooth animations, winner detection, and score tracking. Features both single-player (vs AI) and two-player modes.',
      tech: ['React', 'JavaScript', 'Tailwind CSS'], 
      icon: '🎮',
      githubCode: 'https://github.com/Vishal200728/tic-tac-toe',
      demoLink: 'https://tic-tac-toe-ten-flax-69.vercel.app'
    },
    { 
      title: 'Rock Paper Scissors', 
      category: 'Game', 
      description: 'Classic stone paper scissors game with engaging UI, animations, and score tracking. Play against computer with smart AI logic.',
      tech: ['React', 'CSS', 'Tailwind CSS'], 
      icon: '🪨',
      githubCode: 'https://github.com/Vishal200728/rock-paper-scissors',
      demoLink: 'https://stone-paper-scissor-bice-nu.vercel.app'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);
  
  const filters = ['All', 'Full Stack', 'Game', 'Backend'];

  return (
    <section id="projects" className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4">A collection of {projects.length} projects showcasing my skills</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
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
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
              
              {/* API Badge - for Food & Weather apps */}
              {project.apiUsed && (
                <div className="mb-3">
                  <span className="text-xs bg-gradient-to-r from-green-100 to-teal-100 text-green-700 px-2 py-1 rounded-full inline-flex items-center gap-1">
                    🔌 {project.apiUsed}
                  </span>
                </div>
              )}
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              
              {/* Buttons */}
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