import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const CategoryFilter = () => {
  const { categories, filterByCategory, selectedCategory } = useContext(RecipeContext);

  const categoryIcons = {
    'Beef': '🥩',
    'Chicken': '🍗',
    'Dessert': '🍰',
    'Lamb': '🍖',
    'Miscellaneous': '🍽️',
    'Pasta': '🍝',
    'Pork': '🥓',
    'Seafood': '🦞',
    'Side': '🥗',
    'Starter': '🍲',
    'Vegan': '🥑',
    'Vegetarian': '🥬',
    'Breakfast': '🍳',
    'Goat': '🐐',
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-3 mb-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🍽️ Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <button
          onClick={() => filterByCategory('')}
          className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
            selectedCategory === '' 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
          }`}
        >
          All
        </button>
        {categories.slice(0, 14).map((category) => (
          <button
            key={category.idCategory}
            onClick={() => filterByCategory(category.strCategory)}
            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedCategory === category.strCategory
                ? 'bg-orange-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:scale-105'
            }`}
          >
            <span className="text-xl">
              {categoryIcons[category.strCategory] || '🍽️'}
            </span>
            <span className="truncate">{category.strCategory}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;