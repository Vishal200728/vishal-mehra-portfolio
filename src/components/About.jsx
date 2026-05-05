// src/components/About.jsx
import React from 'react';
import { User, Award, Mail, Phone } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Vishal Mehra</h3>
          </div>
          <p className="text-purple-600 font-medium mb-4 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Full Stack Web Developer
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Full Stack Web Developer passionate about building dynamic web applications using React, Node.js, and Express. 
            Experienced in creating scalable solutions from e-commerce platforms to educational dashboards.
          </p>
          <div className="space-y-3">
            <p className="text-gray-700 flex items-center gap-2 hover:translate-x-1 transition-transform">
              <Mail className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">Email:</span> godeditt78@gmail.com
            </p>
            <p className="text-gray-700 flex items-center gap-2 hover:translate-x-1 transition-transform">
              <Phone className="w-4 h-4 text-purple-500" />
              <span className="font-semibold">Phone:</span> 8219376871
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;