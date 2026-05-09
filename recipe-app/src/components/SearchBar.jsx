import React, { useState, useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const SearchBar = () => {
  const { searchMeals, filterByIngredient } = useContext(RecipeContext);
  const [searchType, setSearchType] = useState('name');
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (searchType === 'name') {
        searchMeals(query);
      } else {
        filterByIngredient(query);
      }
    }
  };

  const popularIngredients = ['Chicken', 'Beef', 'Salmon', 'Pasta', 'Rice', 'Eggs', 'Milk', 'Cheese'];

  return (
    <div id="search" className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select 
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="name">🔍 Search by Name</option>
            <option value="ingredient">🥕 Search by Ingredient</option>
          </select>
          
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder={searchType === 'name' ? 'Enter recipe name...' : 'Enter ingredient (e.g., Chicken, Garlic)...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-3">Popular ingredients:</p>
        <div className="flex flex-wrap gap-2">
          {popularIngredients.map((ing) => (
            <button
              key={ing}
              onClick={() => {
                setQuery(ing);
                filterByIngredient(ing);
                setSearchType('ingredient');
              }}
              className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-500 hover:text-white transition"
            >
              {ing}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;