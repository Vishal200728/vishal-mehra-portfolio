// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ scrollToContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(item.toLowerCase());
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 py-4 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Vishal.dev
        </h1>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-gray-700 hover:text-purple-600 transition-all hover:scale-105 font-medium relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
          <button
            onClick={scrollToContact}
            className="text-white bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 rounded-lg hover:scale-105 transition-transform"
          >
            Hire Me
          </button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-gray-700 hover:text-purple-600 py-2 text-left"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToContact();
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;