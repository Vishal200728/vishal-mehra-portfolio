// src/components/Skills.jsx
import React, { useRef, useState } from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaCss3Alt, 
  FaHtml5, 
  FaGithub,
  FaTimes,
  FaCheckCircle,
  FaProjectDiagram,
  FaBookOpen,
  FaAward
} from 'react-icons/fa';
import { 
  SiExpress, 
  SiMongodb, 
  SiTailwindcss, 
  SiJavascript, 
  SiCloudinary,
  
} from 'react-icons/si';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Skills = () => {
  const sliderRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const skills = [
    { 
      name: 'React', 
      gradient: 'from-cyan-500 to-blue-600',
      icon: <FaReact className="text-5xl text-cyan-500" />, 
      level: '90%',
      description: 'Frontend Library for building user interfaces',
      longDescription: 'React is a JavaScript library for building interactive UIs. I have built 10+ projects using React including e-commerce platforms, dashboards, and social media apps.',
      projects: ['E-Commerce App', 'Portfolio Website', 'Task Manager', 'Chat Application'],
      resources: ['React Official Docs', 'Full Stack Open', 'React Beta Docs'],
      achievements: ['Built 10+ React apps', 'Optimized performance by 40%', 'Used Hooks & Context API']
    },
    { 
      name: 'Node.js', 
      gradient: 'from-green-500 to-emerald-600',
      icon: <FaNodeJs className="text-5xl text-green-600" />, 
      level: '85%',
      description: 'JavaScript runtime for server-side development',
      longDescription: 'Node.js allows me to build scalable backend services. I have created REST APIs, real-time applications, and microservices.',
      projects: ['REST API Service', 'Real-time Chat Server', 'Authentication System'],
      resources: ['Node.js Docs', 'Express.js Guide', 'Node Design Patterns'],
      achievements: ['Handled 1000+ concurrent requests', 'Reduced response time by 30%']
    },
    { 
      name: 'Express', 
      gradient: 'from-gray-600 to-gray-800',
      icon: <SiExpress className="text-5xl text-gray-700" />, 
      level: '85%',
      description: 'Web framework for Node.js',
      longDescription: 'Express.js is my go-to for building REST APIs and web applications with Node.js.',
      projects: ['Blog API', 'E-commerce Backend', 'Task Management API'],
      resources: ['Express Docs', 'MDN Web Docs'],
      achievements: ['Built 15+ REST APIs', 'Implemented JWT authentication']
    },
    { 
      name: 'MongoDB', 
      gradient: 'from-green-600 to-teal-600',
      icon: <SiMongodb className="text-5xl text-green-600" />, 
      level: '80%',
      description: 'NoSQL database for modern applications',
      longDescription: 'MongoDB provides flexible schema design. I use it with Mongoose ODM for data modeling.',
      projects: ['User Management System', 'Product Catalog', 'Analytics Database'],
      resources: ['MongoDB University', 'Mongoose Docs'],
      achievements: ['Optimized queries for 50% speedup', 'Designed scalable schemas']
    },
    { 
      name: 'Tailwind CSS', 
      gradient: 'from-sky-500 to-blue-600',
      icon: <SiTailwindcss className="text-5xl text-sky-500" />, 
      level: '90%',
      description: 'Utility-first CSS framework',
      longDescription: 'Tailwind CSS helps me build beautiful UIs quickly without leaving my HTML.',
      projects: ['All my projects use Tailwind', 'Landing Pages', 'Admin Dashboards'],
      resources: ['Tailwind Docs', 'Tailwind UI'],
      achievements: ['Reduced CSS size by 60%', 'Faster development by 2x']
    },
    { 
      name: 'JavaScript', 
      gradient: 'from-yellow-500 to-amber-600',
      icon: <SiJavascript className="text-5xl text-yellow-500" />, 
      level: '88%',
      description: 'Programming language for web development',
      longDescription: 'JavaScript is my primary language. I master ES6+, async programming, and modern features.',
      projects: ['Interactive Web Apps', 'Browser Extensions', 'Game Development'],
      resources: ['JavaScript.info', 'MDN Web Docs', 'You Dont Know JS'],
      achievements: ['Solved 200+ LeetCode problems', 'Mentored 5+ junior developers']
    },
    { 
      name: 'HTML5', 
      gradient: 'from-orange-500 to-red-600',
      icon: <FaHtml5 className="text-5xl text-orange-600" />, 
      level: '95%',
      description: 'Standard markup language',
      longDescription: 'I create semantic, accessible HTML5 structures for all my projects.',
      projects: ['All Web Projects', 'Email Templates'],
      resources: ['MDN HTML Guide', 'W3C Standards'],
      achievements: ['100% accessible websites', 'SEO optimized structures']
    },
    { 
      name: 'CSS3', 
      gradient: 'from-blue-500 to-indigo-600',
      icon: <FaCss3Alt className="text-5xl text-blue-600" />, 
      level: '92%',
      description: 'Styling and animations',
      longDescription: 'Master of CSS Grid, Flexbox, animations, and responsive design.',
      projects: ['Responsive Websites', 'CSS Animations Gallery'],
      resources: ['CSS Tricks', 'Kevin Powell Channel'],
      achievements: ['Created 50+ custom animations', 'Mobile-first designs']
    },
    { 
      name: 'Cloudinary', 
      gradient: 'from-blue-500 to-purple-600',
      icon: <SiCloudinary className="text-5xl text-purple-500" />, 
      level: '75%',
      description: 'Cloud-based image management',
      longDescription: 'I use Cloudinary for image optimization, transformation, and delivery.',
      projects: ['Photo Gallery App', 'E-commerce Product Images'],
      resources: ['Cloudinary Docs', 'Video Tutorials'],
      achievements: ['Optimized images load time by 70%', 'Implemented upload widgets']
    },
    { 
      name: 'GitHub', 
      gradient: 'from-gray-800 to-black',
      icon: <FaGithub className="text-5xl text-gray-800" />, 
      level: '85%',
      description: 'Version control and collaboration',
      longDescription: 'I use Git and GitHub for version control, collaboration, and open source contributions.',
      projects: ['50+ repositories', 'Open Source Contributions'],
      resources: ['GitHub Guides', 'Git Documentation'],
      achievements: ['50+ contributions this year', 'Collaborated with 10+ developers']
    }
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSkill(null);
  };

  return (
    <>
      <section id="skills" className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              My Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
              Technologies and tools I specialize in - <span className="text-purple-400">Click on any skill</span> to learn more
            </p>
          </div>

          {/* Slider Controls */}
          <div className="relative group">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 ml-2 transition-all duration-300 hover:scale-110"
            >
              <IoIosArrowBack className="text-white text-2xl" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 mr-2 transition-all duration-300 hover:scale-110"
            >
              <IoIosArrowForward className="text-white text-2xl" />
            </button>

            {/* Skills Slider */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex-none w-80 group/card cursor-pointer"
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className={`bg-gradient-to-br ${skill.gradient} rounded-2xl p-6 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl`}>
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-12">
                        {skill.icon}
                      </div>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-2xl font-bold text-white text-center mb-2">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 text-center text-sm mb-4">
                      {skill.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden mb-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-1000 relative overflow-hidden"
                        style={{ width: skill.level }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                      </div>
                    </div>

                    {/* Level */}
                    <div className="flex justify-between text-white/90 text-sm">
                      <span>Proficiency</span>
                      <span className="font-bold">{skill.level}</span>
                    </div>

                    {/* Click Hint */}
                    <div className="mt-4 text-center text-white/60 text-xs">
                      👆 Click to view details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {skills.length}+
              </div>
              <div className="text-gray-300 mt-2">Technologies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                3+
              </div>
              <div className="text-gray-300 mt-2">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                20+
              </div>
              <div className="text-gray-300 mt-2">Projects Done</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-300 mt-2">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {showModal && selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    {selectedSkill.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-white/80 text-sm">{selectedSkill.description}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Proficiency */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Proficiency Level</h4>
                <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                  <div
                    className={`bg-gradient-to-r ${selectedSkill.gradient} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: selectedSkill.level }}
                  ></div>
                </div>
                <p className="text-purple-400 font-bold">{selectedSkill.level} - Advanced</p>
              </div>

              {/* Description */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <FaBookOpen /> About this skill
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedSkill.longDescription}
                </p>
              </div>

              {/* Projects */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaProjectDiagram /> Projects using {selectedSkill.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedSkill.projects?.map((project, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <FaCheckCircle className="text-green-400 text-sm" />
                      <span>{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaAward /> Key Achievements
                </h4>
                <ul className="space-y-2">
                  {selectedSkill.achievements?.map((achievement, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Resources */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-white mb-3">📚 Learning Resources</h4>
                <div className="space-y-2">
                  {selectedSkill.resources?.map((resource, idx) => (
                    <div key={idx} className="text-purple-400 hover:text-purple-300 cursor-pointer">
                      🔗 {resource}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-800 p-4 rounded-b-2xl border-t border-white/10">
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default Skills;