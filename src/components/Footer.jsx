// src/components/Footer.jsx
import React, { useState } from 'react';
import { ChevronRight, Heart, ArrowUp, Code, Coffee, Zap, Star, TrendingUp } from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const quickLinks = [
    { name: 'About', icon: '👤', href: '#about' },
    { name: 'Skills', icon: '💻', href: '#skills' },
    { name: 'Projects', icon: '🚀', href: '#projects' },
    { name: 'Contact', icon: '📧', href: '#contact' }
  ];

  const services = [
    { name: 'Web Development', icon: '🌐' },
    { name: 'UI/UX Design', icon: '🎨' },
    { name: 'API Integration', icon: '🔌' },
    { name: 'Database Design', icon: '🗄️' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white pt-16 pb-8 px-6 md:px-20">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group"
        aria-label="Back to top"
      >
        <ArrowUp className={`w-5 h-5 transition-transform duration-300 ${isHovered ? '-translate-y-1' : ''}`} />
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              Vishal Mehra
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Building innovative web solutions with modern technologies. Let's create something amazing together!
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Code className="w-4 h-4 text-purple-400" />
              <span>Full Stack Developer</span>
              <Zap className="w-4 h-4 text-yellow-400 ml-2" />
              <span>Problem Solver</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.name}>
                  <div className="text-gray-300 flex items-center gap-2">
                    <span className="text-lg">{service.icon}</span>
                    <span>{service.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stats
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Projects Completed
                </span>
                <span className="text-purple-400 font-bold">20+</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-orange-400" />
                  Cups of Coffee
                </span>
                <span className="text-purple-400 font-bold">500+</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  Happy Clients
                </span>
                <span className="text-purple-400 font-bold">15+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="font-semibold text-lg">Connect With Me</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://www.linkedin.com/in/vishal-mehra-a70407381" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm rounded-full p-3 hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  LinkedIn
                </span>
              </a>
              
              <a 
                href="https://github.com/Vishal200728" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm rounded-full p-3 hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  GitHub
                </span>
              </a>
              
              <a 
                href="https://x.com/GodEdit173142" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm rounded-full p-3 hover:bg-sky-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Twitter
                </span>
              </a>
              
              <a 
                href="https://wa.me/918219376871" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-sm rounded-full p-3 hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  WhatsApp
                </span>
              </a>
              
              <a 
                href="mailto:godedit178@gmail.com" 
                className="group relative bg-white/5 backdrop-blur-sm rounded-full p-3 hover:bg-red-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Email
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Privacy Policy & Terms with valid hrefs */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Vishal Mehra.</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> 
                <span>using React & Tailwind CSS</span>
              </span>
            </div>
            
            <div className="flex gap-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </button>
              <a href="#contact" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-xs mt-4">
            <span>Built with ☕ and 💻 | Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;