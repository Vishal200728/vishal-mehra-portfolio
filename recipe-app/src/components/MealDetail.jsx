import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../api';

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');

  const fetchMealDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API.lookupById(id));
      setMeal(response.data.meals ? response.data.meals[0] : null);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMealDetails();
  }, [fetchMealDetails]);

  const getIngredients = () => {
    const ingredients = [];
    if (!meal) return ingredients;
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Recipe not found!</h2>
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8 shadow-2xl">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{meal.strMeal}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {meal.strCategory && (
                <span className="bg-orange-500 px-4 py-1 rounded-full">🍽️ {meal.strCategory}</span>
              )}
              {meal.strArea && (
                <span className="bg-blue-500 px-4 py-1 rounded-full">🌍 {meal.strArea}</span>
              )}
              {meal.strTags && (
                <span className="bg-green-500 px-4 py-1 rounded-full">🏷️ {meal.strTags}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'ingredients'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-orange-500'
          }`}
        >
          🥕 Ingredients
        </button>
        <button
          onClick={() => setActiveTab('instructions')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'instructions'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-orange-500'
          }`}
        >
          📖 Instructions
        </button>
        {meal.strYoutube && (
          <button
            onClick={() => setActiveTab('video')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'video'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-orange-500'
            }`}
          >
            🎥 Video Tutorial
          </button>
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {activeTab === 'ingredients' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients & Measurements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {ingredients.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-small.png`}
                    alt={item.ingredient}
                    className="w-12 h-12 object-cover rounded-full"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/48'}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.ingredient}</p>
                    <p className="text-sm text-gray-500">{item.measure}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'instructions' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cooking Instructions</h2>
            <div className="prose max-w-none">
              {meal.strInstructions.split('\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        )}

        {activeTab === 'video' && meal.strYoutube && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Tutorial</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={meal.strYoutube.replace('watch?v=', 'embed/')}
                title="YouTube video player"
                className="w-full h-96 rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetail;