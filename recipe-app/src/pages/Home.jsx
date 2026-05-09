import React, { useContext, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import MealCard from '../components/MealCard';

const Home = () => {
  const { meals, loading, fetchRandomMeal, searchQuery } = useContext(RecipeContext);

  useEffect(() => {
    if (!searchQuery && meals.length === 0) {
      fetchRandomMeal();
    }
  }, []);

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <SearchBar />
        <CategoryFilter />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {searchQuery ? `Results for "${searchQuery}"` : '🍽️ Featured Recipes'}
            </h2>
            <span className="text-gray-500">{meals?.length || 0} recipes found</span>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : meals && meals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">😢</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes found</h3>
              <p className="text-gray-500">Try searching for something else!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;