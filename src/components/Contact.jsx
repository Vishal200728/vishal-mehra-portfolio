// src/components/Contact.jsx
import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MapPin,  
  Clock,
  CheckCircle,
} from 'lucide-react';
import { FaLinkedin, FaWhatsapp, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // WhatsApp number (without + or spaces)
  const whatsappNumber = '918219376871'; // 91 + 8219376871

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    if (formData.message.trim().length < 10) {
      toast.error('Message should be at least 10 characters');
      return false;
    }
    return true;
  };

  const sendToWhatsApp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Create formatted message
    const message = `*📬 NEW CONTACT FROM PORTFOLIO*%0A%0A
*👤 Name:* ${formData.name}%0A
*📧 Email:* ${formData.email}%0A
*📝 Subject:* ${formData.subject}%0A
*💬 Message:* ${formData.message}%0A%0A
*🕐 Sent from:* Portfolio Website`;
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    toast.success('Redirecting to WhatsApp...');
    setSubmitted(true);
    
    // Optional: Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
    
    setIsSubmitting(false);
  };

  const directWhatsApp = () => {
    const message = encodeURIComponent('Hi Vishal! 👋 I visited your portfolio and would like to connect with you.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }} />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's work together and create something amazing!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-white">
              <Send className="w-6 h-6 text-purple-400" />
              Send Me a Message
            </h3>
            <p className="text-gray-300 mb-6">Fill out the form and I'll get back to you on WhatsApp!</p>
            
            <form onSubmit={sendToWhatsApp} className="space-y-5">
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  placeholder="your.email@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              
              <div className="relative">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              
              <div className="relative">
                <textarea 
                  name="message"
                  rows="4" 
                  placeholder="Tell me about your project..." 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                ></textarea>
                <div className="text-right text-xs text-gray-400 mt-1">
                  {formData.message.length}/500 characters
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaWhatsapp className="w-5 h-5" />
                )}
                {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
              </button>

              {submitted && (
                <div className="flex items-center gap-2 text-green-400 justify-center mt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Message sent successfully!</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Working Hours Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Working Hours</h4>
                  <p className="text-gray-300">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                  <p className="text-gray-400 text-sm">Weekend available on request</p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div 
              onClick={() => copyToClipboard('godedit178@gmail.com', 'Email')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-300">godedit178@gmail.com</p>
                </div>
                <div className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to copy
                </div>
              </div>
            </div>
            
            <div 
              onClick={directWhatsApp}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">WhatsApp</h4>
                  <p className="text-gray-300">+91 8219376871</p>
                </div>
                <div className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to chat
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => copyToClipboard('India', 'Location')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-300">India</p>
                </div>
                <div className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to copy
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <button 
                onClick={directWhatsApp}
                className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp className="w-5 h-5" />
                Let's Work Together on WhatsApp!
              </button>
              <p className="text-white/90 text-sm mt-4 text-center leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              <a 
                href="https://www.linkedin.com/in/vishal-mehra-a70407381" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <FaLinkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://github.com/Vishal200728" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <FaGithub className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-sky-500 transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <FaTwitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://instagram.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;