// src/components/Projects.jsx
import React, { useState } from 'react';
import { 
  FiGithub, 
  FiCalendar,
  FiGrid,
  FiMonitor,
  FiChevronRight,
} from 'react-icons/fi';
import { 
  FaHeart, 
  FaGamepad, 
  FaServer, 
  FaLayerGroup,
  FaFire,
  FaRegHeart,
  FaStar
} from 'react-icons/fa';
import { 
  MdOutlineEmojiFoodBeverage, 
  MdWbSunny, 
  MdShoppingCart, 
  MdSchool, 
  MdLink, 
  MdImage, 
  MdVideogameAsset,
  MdCloud
} from 'react-icons/md';
import { GiRock,} from 'react-icons/gi';
import { SiMongodb, SiExpress, SiTailwindcss, SiReact } from 'react-icons/si';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [likedProjects, setLikedProjects] = useState({});
  const [hoveredProject, setHoveredProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const projects = [
    { 
      title: 'Food Recipe App', 
      category: 'Full Stack', 
      description: 'Search any recipe, get ingredients, cooking instructions, and video tutorials using The Meal DB API. Search by name, category, or ingredient.',
      tech: ['React', 'API', 'Tailwind CSS', 'Axios'], 
      icon: <MdOutlineEmojiFoodBeverage className="text-5xl" />,
      githubCode: 'https://github.com/Vishal200728/vishal-mehra-portfolio.git',
      demoLink: 'https://vishal-mehra-portfolio-4hkb.vercel.app',
      apiUsed: 'The Meal DB API',
      date: '2024',
      featured: true,
      likes: 24,
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      title: 'Weather App', 
      category: 'Full Stack', 
      description: 'Real-time weather updates, 5-day forecast, temperature, humidity, wind speed, and "feels like" using OpenWeatherMap API.',
      tech: ['React', 'API', 'Axios', 'Tailwind CSS'], 
      icon: <MdWbSunny className="text-5xl text-yellow-500" />,
      githubCode: 'https://github.com/Vishal200728/tik-tak-game.git',
      demoLink: 'https://tik-tak-game.vercel.app',
      apiUsed: 'OpenWeatherMap API',
      date: '2024',
      featured: false,
      likes: 18,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'E-Commerce Platform', 
      category: 'Full Stack', 
      description: 'Full-featured e-commerce website with product listings, shopping cart, user authentication, and secure payment integration.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'], 
      icon: <MdShoppingCart className="text-5xl" />,
      githubCode: 'https://github.com/Vishal200728/vishal-mehra-portfolio.git',
      demoLink: 'https://ecommerce-siteapp.vercel.app',
      date: '2024',
      featured: true,
      likes: 32,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Student Management System', 
      category: 'Full Stack', 
      description: 'Complete educational platform with role-based login (Student/Teacher/Admin). Students can check marks, teachers can edit grades, and admins can oversee all user accounts. Includes secure JWT authentication.', 
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'], 
      icon: <MdSchool className="text-5xl" />,
      githubCode: 'https://github.com/Vishal200728/vishal-mehra-portfolio.git',
      demoLink: 'https://vishal-mehra-portfolio-la7g.vercel.app/login',
      date: '2024',
      featured: true,
      likes: 27,
      gradient: 'from-green-500 to-teal-500'
    },
    { 
      title: 'URL Shortener', 
      category: 'Backend', 
      description: 'Fast URL shortening service that converts long URLs into short, shareable links. Includes analytics and custom short codes.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'], 
      icon: <MdLink className="text-5xl" />,
      githubCode: 'https://github.com/Vishal200728/vishal-mehra-portfolio.git',
      demoLink: 'https://vishal-mehra-portfolio-213u.vercel.app',
      date: '2024',
      featured: false,
      likes: 15,
      gradient: 'from-gray-600 to-gray-800'
    },
    { 
      title: 'Image Converter', 
      category: 'Full Stack', 
      description: 'Convert images to different formats (PNG, JPG, WEBP). Resize, compress, and preview images before download.', 
      tech: ['React', 'Vite', 'Tailwind CSS', 'Browser API'], 
      icon: <MdImage className="text-5xl" />,
      githubCode: 'https://github.com/Vishal200728/vishal-mehra-portfolio.git',
      demoLink: 'https://weather-project-woad-three.vercel.app',
      date: '2024',
      featured: false,
      likes: 12,
      gradient: 'from-indigo-500 to-purple-500'
    },
    { 
      title: 'Tic Tac Toe Game', 
      category: 'Game', 
      description: 'Interactive Tic Tac Toe game with smooth animations, winner detection, and score tracking. Features both single-player (vs AI) and two-player modes.',
      tech: ['React', 'JavaScript', 'Tailwind CSS'], 
      icon: <MdVideogameAsset className="text-5xl" />,
      githubCode: 'https://github.com/Vishal200728/tic-tac-toe',
      demoLink: 'https://tic-tac-toe-ten-flax-69.vercel.app',
      date: '2024',
      featured: false,
      likes: 42,
      gradient: 'from-red-500 to-orange-500'
    },
    { 
      title: 'Rock Paper Scissors', 
      category: 'Game', 
      description: 'Classic stone paper scissors game with engaging UI, animations, and score tracking. Play against computer with smart AI logic.',
      tech: ['React', 'CSS', 'Tailwind CSS'], 
      icon: <GiRock className="text-5xl" />,
      githubCode: 'https://github.com/Vishal200728/rock-paper-scissors',
      demoLink: 'https://stone-paper-scissor-bice-nu.vercel.app',
      date: '2024',
      featured: false,
      likes: 38,
      gradient: 'from-emerald-500 to-green-500'
    }
  ];

  const handleLike = (projectTitle) => {
    setLikedProjects(prev => ({
      ...prev,
      [projectTitle]: !prev[projectTitle]
    }));
  };

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);
  
  const filters = [
    { name: 'All', icon: <FiGrid className="w-4 h-4" />, count: projects.length },
    { name: 'Full Stack', icon: <FaLayerGroup className="w-4 h-4" />, count: projects.filter(p => p.category === 'Full Stack').length },
    { name: 'Game', icon: <FaGamepad className="w-4 h-4" />, count: projects.filter(p => p.category === 'Game').length },
    { name: 'Backend', icon: <FaServer className="w-4 h-4" />, count: projects.filter(p => p.category === 'Backend').length }
  ];

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow delay-2000"></div>
      
      {/* Floating Tech Icons */}
      <div className="absolute top-40 right-20 animate-float hidden lg:block"><SiReact className="text-6xl text-cyan-400 opacity-20" /></div>
      <div className="absolute bottom-40 left-20 animate-float-delayed hidden lg:block"><SiMongodb className="text-6xl text-green-400 opacity-20" /></div>
      <div className="absolute top-60 left-40 animate-float-slow hidden lg:block"><SiTailwindcss className="text-5xl text-sky-400 opacity-20" /></div>
      <div className="absolute bottom-60 right-40 animate-float hidden lg:block"><SiExpress className="text-5xl text-gray-400 opacity-20" /></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <FaStar className="text-yellow-400 w-4 h-4" />
            <span className="text-purple-200 text-sm">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            A collection of {projects.length} projects showcasing my skills and creativity
          </p>
        </div>

        {/* Filter Buttons with Count */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                activeFilter === filter.name 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {filter.icon}
              {filter.name}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeFilter === filter.name ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* View Toggle & Stats */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex gap-4">
            {featuredProjects.map((project, idx) => (
              <div key={idx} className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1">
                <FaFire className="text-orange-400 w-3 h-3" />
                <span className="text-gray-400 text-xs">{project.title}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'}`}>
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 relative"
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
              
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                    <FaFire className="w-3 h-3" />
                    Featured
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 relative z-10">
                {/* Icon and Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6">
                    {project.icon}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                    <FiCalendar className="w-3 h-3" />
                    {project.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                {/* API Badge */}
                {project.apiUsed && (
                  <div className="mb-3">
                    <span className="text-xs bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-300 px-2 py-1 rounded-full inline-flex items-center gap-1 border border-green-500/30">
                      <MdCloud className="w-3 h-3" />
                      {project.apiUsed}
                    </span>
                  </div>
                )}
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs bg-white/10 text-purple-300 px-2 py-1 rounded-full hover:scale-105 transition-transform border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <a 
                      href={project.githubCode} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-300 font-medium text-sm hover:text-purple-400 transition-all group-hover:gap-2"
                    >
                      <FiGithub className="w-4 h-4" />
                      Code
                    </a>
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-300 font-medium text-sm hover:text-purple-400 transition-all group-hover:gap-2"
                    >
                      <FiMonitor className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(project.title)}
                    className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {likedProjects[project.title] ? (
                      <FaHeart className="w-4 h-4 text-red-400 animate-pulse" />
                    ) : (
                      <FaRegHeart className="w-4 h-4" />
                    )}
                    <span className="text-xs">
                      {likedProjects[project.title] ? project.likes + 1 : project.likes}
                    </span>
                  </button>
                </div>
              </div>

              {/* Hover Overlay Effect */}
              {hoveredProject === idx && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 group">
            <span>View All Projects</span>
            <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default Projects;