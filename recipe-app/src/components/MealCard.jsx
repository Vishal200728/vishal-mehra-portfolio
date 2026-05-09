import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

const MealCard = ({ meal }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useContext(RecipeContext);
  const isFavorite = favorites?.some(fav => fav?.idMeal === meal?.idMeal);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(meal.idMeal);
    } else {
      addToFavorites(meal);
    }
  };

  if (!meal) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <Link to={`/meal/${meal.idMeal}`}>
        <div className="relative overflow-hidden h-56">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal}
            className="w-full h-full object-cover hover:scale-110 transition duration-500"
          />
          <div className="absolute top-2 right-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite();
              }}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition"
            >
              <span className="text-2xl">{isFavorite ? '❤️' : '🤍'}</span>
            </button>
          </div>
          {meal.strCategory && (
            <span className="absolute bottom-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {meal.strCategory}
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/meal/${meal.idMeal}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-2 hover:text-orange-500 transition line-clamp-1">
            {meal.strMeal}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {meal.strArea && (
            <div className="flex items-center gap-1">
              <span>🌍</span>
              <span>{meal.strArea}</span>
            </div>
          )}
          {meal.strTags && (
            <div className="flex items-center gap-1">
              <span>🏷️</span>
              <span>{meal.strTags.split(',')[0]}</span>
            </div>
          )}
        </div>
        
        <Link to={`/meal/${meal.idMeal}`}>
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition">
            View Recipe →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MealCard;