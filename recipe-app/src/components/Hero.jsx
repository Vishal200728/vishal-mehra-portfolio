import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const Hero = () => {
  const { fetchRandomMeal } = useContext(RecipeContext);

  return (
    <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
        <div className="animate-bounce mb-6">
          <span className="text-7xl">🍕</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Amazing Recipes
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Find thousands of delicious recipes from around the world. Search by name, ingredient, or category!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={fetchRandomMeal}
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-100 transition transform hover:scale-105"
          >
            🎲 Random Meal
          </button>
          <a 
            href="#search"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
          >
            Browse Recipes →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;