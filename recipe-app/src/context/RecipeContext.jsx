import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../api';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch random meal
  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API.randomMeal());
      setMeals(response.data.meals || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  };

  // Search meals by name
  const searchMeals = async (query) => {
    setLoading(true);
    setSearchQuery(query);
    try {
      const response = await axios.get(API.searchByName(query));
      setMeals(response.data.meals || []);
      setError(null);
    } catch (err) {
      setError('Failed to search meals');
    } finally {
      setLoading(false);
    }
  };

  // Get meal by ID
  const getMealById = async (id) => {
    try {
      const response = await axios.get(API.lookupById(id));
      return response.data.meals ? response.data.meals[0] : null;
    } catch (err) {
      console.error('Error fetching meal:', err);
      return null;
    }
  };

  // Filter by category
  const filterByCategory = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    try {
      const response = await axios.get(API.filterByCategory(category));
      setMeals(response.data.meals || []);
      setError(null);
    } catch (err) {
      setError('Failed to filter meals');
    } finally {
      setLoading(false);
    }
  };

  // Filter by ingredient
  const filterByIngredient = async (ingredient) => {
    setLoading(true);
    try {
      const response = await axios.get(API.filterByIngredient(ingredient));
      setMeals(response.data.meals || []);
      setError(null);
    } catch (err) {
      setError('Failed to filter meals');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(API.categories());
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Add to favorites
  const addToFavorites = (meal) => {
    if (!favorites.find(fav => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
      localStorage.setItem('favorites', JSON.stringify([...favorites, meal]));
    }
  };

  // Remove from favorites
  const removeFromFavorites = (id) => {
    const updated = favorites.filter(meal => meal.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
    fetchCategories();
  }, []);

  return (
    <RecipeContext.Provider value={{
      meals,
      loading,
      error,
      favorites,
      searchQuery,
      selectedCategory,
      categories,
      fetchRandomMeal,
      searchMeals,
      getMealById,
      filterByCategory,
      filterByIngredient,
      addToFavorites,
      removeFromFavorites,
    }}>
      {children}
    </RecipeContext.Provider>
  );
};