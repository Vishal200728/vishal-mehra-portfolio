// src/components/About.jsx
import React from 'react';
import { 
  FaUser, 
  FaAward, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCode, 
  FaHeart, 
  FaBriefcase, 
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaLaptopCode,
  FaStar,
  FaCertificate,
  FaReact,
  FaNodeJs
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';

const About = () => {
  const stats = [
    { value: '3+', label: 'Years Experience', icon: <FaBriefcase className="w-6 h-6" />, gradient: 'from-purple-500 to-pink-500' },
    { value: '20+', label: 'Projects Done', icon: <FaLaptopCode className="w-6 h-6" />, gradient: 'from-blue-500 to-cyan-500' },
    { value: '500+', label: 'Hours Coding', icon: <FaCode className="w-6 h-6" />, gradient: 'from-green-500 to-emerald-500' },
    { value: '15+', label: 'Happy Clients', icon: <FaHeart className="w-6 h-6" />, gradient: 'from-orange-500 to-red-500' }
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements - Same as Projects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow delay-2000"></div>
      
      {/* Floating Tech Icons - Same as Projects */}
      <div className="absolute top-40 right-20 animate-float hidden lg:block"><FaReact className="text-6xl text-cyan-400 opacity-20" /></div>
      <div className="absolute bottom-40 left-20 animate-float-delayed hidden lg:block"><FaNodeJs className="text-6xl text-green-400 opacity-20" /></div>
      <div className="absolute top-60 left-40 animate-float-slow hidden lg:block"><SiTailwindcss className="text-5xl text-sky-400 opacity-20" /></div>
      <div className="absolute bottom-60 right-40 animate-float hidden lg:block"><SiMongodb className="text-5xl text-green-500 opacity-20" /></div>
      
      {/* Decorative Stars */}
      <div className="absolute top-10 left-1/4 animate-float"><FaStar className="text-yellow-400 opacity-20 text-2xl" /></div>
      <div className="absolute bottom-20 right-1/3 animate-float-delayed"><FaStar className="text-yellow-400 opacity-20 text-xl" /></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Same Style as Projects */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <FaStar className="text-yellow-400 w-4 h-4" />
            <span className="text-purple-200 text-sm">About Me</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Get to know me better - my journey, skills, and passion for coding
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Main Info Card - Glassmorphism Style */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 animate-fadeInLeft">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse-slow shadow-lg">
                <FaUser className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Vishal Mehra
                </h3>
                <p className="text-purple-300 font-medium flex items-center gap-2">
                  <FaAward className="w-5 h-5" />
                  Full Stack Web Developer
                  <MdVerified className="text-blue-400 w-5 h-5" />
                </p>
              </div>
            </div>

            <p className="text-purple-100 mb-6 leading-relaxed text-lg">
              Full Stack Web Developer passionate about building dynamic web applications using 
              <span className="font-bold text-purple-300"> React</span>, 
              <span className="font-bold text-green-300"> Node.js</span>, and 
              <span className="font-bold text-pink-300"> Express</span>. 
              Experienced in creating scalable solutions from e-commerce platforms to educational dashboards.
            </p>

            {/* Contact Details Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:translate-x-2 transition-all duration-300 border border-white/10 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                  <FaEnvelope className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-purple-200">Email:</span>
                <a href="mailto:godeditt78@gmail.com" className="text-purple-300 hover:text-white transition-colors">
                  godeditt78@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:translate-x-2 transition-all duration-300 border border-white/10 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                  <FaPhone className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-purple-200">Phone:</span>
                <a href="tel:8219376871" className="text-purple-300 hover:text-white transition-colors">
                  +91 8219376871
                </a>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:translate-x-2 transition-all duration-300 border border-white/10 group">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                  <FaMapMarkerAlt className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-purple-200">Location:</span>
                <span className="text-purple-300">India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <h4 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
                <FaHeart className="w-4 h-4 text-red-400 animate-pulse" />
                Connect with me
              </h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Vishal200728" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all duration-300 border border-white/20"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/vishal-mehra-a70407381" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 border border-white/20"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="https://x.com/GodEdit173142" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-sky-500 hover:scale-110 transition-all duration-300 border border-white/20"
                  aria-label="Twitter Profile"
                >
                  <FaTwitter className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Stats Grid */}
          <div className="grid grid-cols-2 gap-4 animate-fadeInRight">
            {stats.map((stat, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center border border-white/20 group`}>
                <div className="text-5xl mb-3 flex justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
                <div className="mt-3 w-full bg-white/20 rounded-full h-1 overflow-hidden">
                  <div className="bg-white h-1 rounded-full animate-shimmer" style={{ width: '70%' }}></div>
                </div>
              </div>
            ))}
            
            {/* Extra Certifications Card */}
            <div className="col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/20 text-center">
              <div className="flex items-center justify-center gap-2 text-purple-200">
                <FaCertificate className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Certified Full Stack Developer</span>
                <FaCertificate className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default About;