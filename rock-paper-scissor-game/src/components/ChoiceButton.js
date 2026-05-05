import React from 'react';

const ChoiceButton = ({ choice, onSelect, disabled, icon, label }) => {
  const getButtonStyles = () => {
    switch(choice) {
      case 'rock':
        return 'from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700';
      case 'paper':
        return 'from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600';
      case 'scissors':
        return 'from-red-500 to-red-700 hover:from-red-400 hover:to-red-600';
      default:
        return 'from-purple-500 to-purple-700';
    }
  };

  return (
    <button
      onClick={() => onSelect(choice)}
      disabled={disabled}
      className={`
        relative group w-32 h-32 md:w-40 md:h-40 rounded-full
        bg-gradient-to-br ${getButtonStyles()}
        transform transition-all duration-300
        hover:scale-110 hover:rotate-12
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        shadow-2xl hover:shadow-3xl
        focus:outline-none focus:ring-4 focus:ring-white/50
      `}
    >
      <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-all"></div>
      <div className="relative flex flex-col items-center justify-center h-full">
        <span className="text-6xl md:text-7xl mb-2">{icon}</span>
        <span className="text-white font-semibold text-sm md:text-base uppercase tracking-wider">
          {label}
        </span>
      </div>
    </button>
  );
};

export default ChoiceButton;