import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

const Navbar = () => {
  const { searchMeals, favorites } = useContext(RecipeContext);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchMeals(searchInput);
      navigate('/');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🍳</span>
            <span className="text-2xl font-bold text-white">RecipeFinder</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for delicious recipes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-full border-none focus:ring-2 focus:ring-yellow-400 outline-none text-gray-700"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-white hover:text-yellow-200 transition">Home</Link>
            <Link to="/categories" className="text-white hover:text-yellow-200 transition">Categories</Link>
            <Link to="/favorites" className="relative text-white hover:text-yellow-200 transition">
              Favorites
              {favorites && favorites.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;