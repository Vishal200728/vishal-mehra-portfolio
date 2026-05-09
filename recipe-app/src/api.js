// API Configuration
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const TEST_KEY = '1';

export const API = {
  // Search meal by name
  searchByName: (name) => `${BASE_URL}/search.php?s=${name}`,
  
  // Search by first letter
  searchByLetter: (letter) => `${BASE_URL}/search.php?f=${letter}`,
  
  // Lookup by ID
  lookupById: (id) => `${BASE_URL}/lookup.php?i=${id}`,
  
  // Random meal
  randomMeal: () => `${BASE_URL}/random.php`,
  
  // All categories
  categories: () => `${BASE_URL}/categories.php`,
  
  // Filter by ingredient
  filterByIngredient: (ingredient) => `${BASE_URL}/filter.php?i=${ingredient}`,
  
  // Filter by category
  filterByCategory: (category) => `${BASE_URL}/filter.php?c=${category}`,
  
  // Filter by area
  filterByArea: (area) => `${BASE_URL}/filter.php?a=${area}`,
  
  // List all categories
  listCategories: () => `${BASE_URL}/list.php?c=list`,
  
  // List all areas
  listAreas: () => `${BASE_URL}/list.php?a=list`,
  
  // List all ingredients
  listIngredients: () => `${BASE_URL}/list.php?i=list`,
};

// Image URLs
export const IMAGES = {
  mealThumbnail: (id, size = 'medium') => {
    // This will be handled dynamically
    return '';
  },
  ingredientIcon: (name) => `https://www.themealdb.com/images/ingredients/${name}-small.png`,
};