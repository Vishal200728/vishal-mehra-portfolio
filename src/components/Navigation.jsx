// src/components/Navigation.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, ChevronDown, Home, User, Code, FolderGit2, Mail, Award } from 'lucide-react';
import { FaReact } from 'react-icons/fa';

const Navigation = ({ scrollToContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  
  // Wrap navItems in useMemo to prevent recreation on every render
  const navItems = useMemo(() => [
    { name: 'Home', icon: <Home className="w-4 h-4" />, id: 'home' },
    { name: 'About', icon: <User className="w-4 h-4" />, id: 'about' },
    { name: 'Skills', icon: <Code className="w-4 h-4" />, id: 'skills' },
    { name: 'Projects', icon: <FolderGit2 className="w-4 h-4" />, id: 'projects' },
    { name: 'Contact', icon: <Mail className="w-4 h-4" />, id: 'contact' }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar background on scroll
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]); // navItems is now stable due to useMemo

  const handleNavClick = (itemId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(itemId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl py-3' 
        : 'bg-white/80 backdrop-blur-sm shadow-lg py-4'
    } px-6 md:px-20`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group flex items-center gap-2 cursor-pointer"
          aria-label="Go to home"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <FaReact className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            Vishal.dev
          </h1>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 relative group ${
                activeSection === item.id
                  ? 'text-purple-600'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
              aria-label={`Navigate to ${item.name}`}
            >
              {item.icon}
              <span>{item.name}</span>
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </button>
          ))}
          
          {/* Hire Me Button with animation */}
          <button
            onClick={scrollToContact}
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl group"
            aria-label="Hire Me"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Hire Me
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden text-gray-700 hover:text-purple-600 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 pb-6 border-t border-gray-100 animate-slideDown">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-label={`Navigate to ${item.name}`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
                {activeSection === item.id && (
                  <ChevronDown className="w-4 h-4 ml-auto transform -rotate-90" />
                )}
              </button>
            ))}
            <div className="px-4 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToContact();
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-lg font-medium hover:scale-105 transition-transform shadow-md"
                aria-label="Hire Me"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;