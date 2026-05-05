// src/components/Hero.jsx
import React from 'react';
import { ArrowRight, Coffee, Code2, Sun } from 'lucide-react';

const Hero = ({ scrollToContact }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-20 py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 animate-fadeInUp">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
            <img
              src="WhatsApp Image 2026-04-19 at 5.25.52 PM.jpeg"
              alt="Vishal Mehra"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Vishal Mehra
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-purple-300 mb-4 flex items-center gap-2">
              <Code2 className="w-8 h-8 text-purple-400 animate-bounce" />
              Web Developer
            </p>
          </div>
        </div>
        <div className="animate-fadeInUp delay-200">
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
            Full Stack Web Developer passionate about building dynamic web applications using React, Node.js, and Express. 
            Experience in creating scalable solutions from e-commerce platforms to educational dashboards.
          </p>
        </div>
        <div className="animate-fadeInUp delay-300 flex gap-4">
          <button
            onClick={scrollToContact}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToContact}
            className="border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Coffee className="w-4 h-4" />
            Hire Me
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-gray-400 text-sm flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <Sun className="w-4 h-4 text-yellow-400" />
        <span>23°C</span>
        <span>Mostly cloudy</span>
      </div>
    </section>
  );
};

export default Hero;