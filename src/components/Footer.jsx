// src/components/Footer.jsx
import React from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Vishal Mehra
            </h2>
            <p className="text-gray-400 mt-2 max-w-md">Building innovative web solutions with modern technologies. Let's create something amazing together!</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.linkedin.com/in/vishal-mehra-a70407381?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 transform inline-flex items-center gap-2">
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a href="https://github.com/Vishal200728/websites.git" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-all hover:scale-110 transform inline-flex items-center gap-2">
                <FaGithub className="w-5 h-5" /> GitHub
              </a>
              <a href="https://x.com/GodEdit173142" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 transform inline-flex items-center gap-2">
                <FaTwitter className="w-5 h-5" /> Twitter
              </a>
              <a href="mailto:godedit178@gmail.com" className="text-gray-400 hover:text-green-400 transition-all hover:scale-110 transform inline-flex items-center gap-2">
                <FaEnvelope className="w-5 h-5" /> Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p className="flex items-center gap-1">
            © 2026 Vishal Mehra. Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> and React
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Made with Emergent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;