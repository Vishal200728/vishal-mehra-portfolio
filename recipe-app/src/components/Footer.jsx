import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍳</span>
              <h3 className="text-xl font-bold">RecipeFinder</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Discover amazing recipes from around the world. Cook like a pro!
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-orange-400 transition">Home</a></li>
              <li><a href="/categories" className="hover:text-orange-400 transition">Categories</a></li>
              <li><a href="/favorites" className="hover:text-orange-400 transition">Favorites</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">API Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Powered by TheMealDB</li>
              <li>Free Recipe API</li>
              <li>1000+ Recipes</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <button 
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="text-2xl hover:text-orange-400 transition"
                aria-label="Facebook"
              >
                📘
              </button>
              <button 
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="text-2xl hover:text-orange-400 transition"
                aria-label="Instagram"
              >
                📷
              </button>
              <button 
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="text-2xl hover:text-orange-400 transition"
                aria-label="Twitter"
              >
                🐦
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 RecipeFinder. Powered by TheMealDB API.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;