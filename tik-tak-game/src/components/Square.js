import React from 'react';

const Square = ({ value, onSquareClick, isWinning, disabled }) => {
  let bgColor = "bg-white/10 backdrop-blur-sm";
  let hoverEffect = "hover:bg-white/30 hover:scale-105";
  let textColor = "text-white";
  let shadow = "shadow-lg shadow-black/20";
  
  if (isWinning) {
    bgColor = "bg-emerald-500/40 border-emerald-300";
    textColor = "text-emerald-100";
  } else if (value === 'X') {
    textColor = "text-sky-200";
  } else if (value === 'O') {
    textColor = "text-amber-200";
  }
  
  return (
    <button
      className={`
        w-full aspect-square rounded-2xl font-bold text-6xl md:text-7xl
        flex items-center justify-center transition-all duration-200
        ${bgColor} ${hoverEffect} ${shadow}
        border-2 border-white/30 focus:outline-none focus:ring-4 focus:ring-white/40
        disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100
      `}
      onClick={onSquareClick}
      disabled={disabled || value !== null}
      style={{ textShadow: '0 2px 5px rgba(0,0,0,0.3)' }}
    >
      {value}
    </button>
  );
};

export default Square;