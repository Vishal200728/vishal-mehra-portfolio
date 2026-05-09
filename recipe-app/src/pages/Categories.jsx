import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const Categories = () => {
  const { categories, filterByCategory } = useContext(RecipeContext);

  const categoryColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🍽️ Recipe Categories
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore delicious recipes organized by category. Find your favorite dishes from around the world!
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.idCategory}
            onClick={() => filterByCategory(category.strCategory)}
            className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.strCategoryThumb} 
                  alt={category.strCategory}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className={`absolute inset-0 ${categoryColors[index % categoryColors.length]} opacity-60`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {category.strCategory === 'Beef' ? '🥩' : 
                     category.strCategory === 'Chicken' ? '🍗' :
                     category.strCategory === 'Dessert' ? '🍰' :
                     category.strCategory === 'Lamb' ? '🍖' :
                     category.strCategory === 'Pasta' ? '🍝' :
                     category.strCategory === 'Pork' ? '🥓' :
                     category.strCategory === 'Seafood' ? '🦞' :
                     category.strCategory === 'Vegan' ? '🥑' :
                     category.strCategory === 'Vegetarian' ? '🥬' : '🍽️'}
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.strCategory}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {category.strCategoryDescription?.substring(0, 100)}...
                </p>
                <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                  Explore → 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;