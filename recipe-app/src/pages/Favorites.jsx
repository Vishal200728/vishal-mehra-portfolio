import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import MealCard from '../components/MealCard';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(RecipeContext);

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <span className="text-8xl mb-6 block">🤍</span>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">No favorites yet!</h2>
        <p className="text-gray-500 mb-8">Start saving your favorite recipes by clicking the heart icon.</p>
        <a 
          href="/"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Browse Recipes →
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          ❤️ My Favorite Recipes
        </h1>
        <p className="text-gray-600 text-lg">
          You have {favorites.length} favorite {favorites.length === 1 ? 'recipe' : 'recipes'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((meal) => (
          <div key={meal.idMeal} className="relative">
            <MealCard meal={meal} />
            <button
              onClick={() => removeFromFavorites(meal.idMeal)}
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition z-10"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;