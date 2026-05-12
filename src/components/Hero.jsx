// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Coffee, 
  Sun, 
  Moon, 
  Download
} from 'lucide-react';
import { 
  FaCode, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaReact,
  FaNodeJs,
  FaAward,
  FaBriefcase,
  FaUserCheck
} from 'react-icons/fa';
import { 
  SiTailwindcss, 
  SiMongodb, 
  SiJavascript,
  SiExpress
} from 'react-icons/si';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const Hero = ({ scrollToContact }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  
  const roles = ['Web Developer', 'React Specialist', 'Full Stack Dev', 'Problem Solver'];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (textIndex < roles.length) {
      const currentRole = roles[textIndex];
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex <= currentRole.length) {
          setTypedText(currentRole.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % roles.length);
          }, 2000);
        }
      }, 100);
      
      return () => clearInterval(typingInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textIndex]);
  
  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const downloadCV = () => {
    const cvLink = '/cv.pdf';
    const link = document.createElement('a');
    link.href = cvLink;
    link.download = 'Vishal_Mehra_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-20 py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      
      {/* Floating Tech Icons */}
      <div className="absolute top-40 right-20 animate-float hidden lg:block">
        <FaReact className="text-6xl text-cyan-400 opacity-30" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float-delayed hidden lg:block">
        <FaNodeJs className="text-6xl text-green-400 opacity-30" />
      </div>
      <div className="absolute top-60 left-40 animate-float-slow hidden lg:block">
        <SiTailwindcss className="text-5xl text-sky-400 opacity-30" />
      </div>
      <div className="absolute bottom-60 right-40 animate-float hidden lg:block">
        <SiMongodb className="text-5xl text-green-500 opacity-30" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float-slow hidden lg:block">
        <SiJavascript className="text-5xl text-yellow-400 opacity-30" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-float-delayed hidden lg:block">
        <SiExpress className="text-5xl text-gray-400 opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-8 animate-fadeInUp">
          {/* Profile Image with Glow Effect */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl group-hover:scale-105 transition-transform duration-300">
              <img
                src="WhatsApp Image 2026-04-19 at 5.25.52 PM.jpeg"
                alt="Vishal Mehra"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online Status */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Vishal Mehra
              </span>
            </h1>
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <FaCode className="w-8 h-8 text-purple-400 animate-bounce" />
              <p className="text-2xl md:text-3xl text-purple-300">
                {typedText}
                <span className="animate-blink">|</span>
              </p>
            </div>
            
            {/* Quick Info Badges */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <FaAward className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">3+ Years Exp</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <FaBriefcase className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">20+ Projects</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <MdLocationOn className="w-4 h-4 text-red-400" />
                <span className="text-white text-sm">India</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <FaUserCheck className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">Available</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="animate-fadeInUp delay-200">
          <p className="text-gray-300 text-base md:text-lg max-w-4xl mb-8 leading-relaxed">
            Full Stack Web Developer passionate about building dynamic web applications using 
            <span className="text-purple-400 font-semibold"> React</span>, 
            <span className="text-green-400 font-semibold"> Node.js</span>, and 
            <span className="text-gray-400 font-semibold"> Express</span>. 
            Experience in creating scalable solutions from e-commerce platforms to educational dashboards.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="animate-fadeInUp delay-300 flex flex-wrap gap-4 mb-8">
          <button
            onClick={scrollToContact}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            Get In Touch
            <ArrowRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
          
          <button
            onClick={scrollToContact}
            className="border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Coffee className="w-4 h-4" />
            Hire Me
          </button>
          
          <button
            onClick={downloadCV}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download CV
          </button>
        </div>
        
        {/* Social Links - React Icons */}
        <div className="animate-fadeInUp delay-400 flex gap-4">
          <a 
            href="https://github.com/Vishal200728" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5 text-white" />
          </a>
          <a 
            href="https://www.linkedin.com/in/vishal-mehra-a70407381" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5 text-white" />
          </a>
          <a 
            href="https://x.com/GodEdit173142" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-sky-500 transition-all duration-300 hover:scale-110"
            aria-label="Twitter"
          >
            <FaTwitter className="w-5 h-5 text-white" />
          </a>
          <a 
            href="mailto:godedit178@gmail.com" 
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <MdEmail className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      {/* Weather/Time Info */}
      <div className="absolute bottom-6 right-6 text-gray-300 text-sm flex items-center gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-yellow-400" />
          <span>23°C</span>
          <span>India</span>
        </div>
        <div className="w-px h-4 bg-gray-500"></div>
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-purple-400" />
          <span>{formatTime()}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;