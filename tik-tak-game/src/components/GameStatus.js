import React from 'react';

const GameStatus = ({ winner, isDraw, xIsNext }) => {
  let status = "";
  let bgClass = "bg-indigo-700/60";
  
  if (winner) {
    status = `🎉 Winner: ${winner} 🎉`;
    bgClass = "bg-emerald-600/70";
  } else if (isDraw) {
    status = "🤝 Game Draw! 🤝";
    bgClass = "bg-amber-600/70";
  } else {
    status = `Next player: ${xIsNext ? '❌ X' : '⭕ O'}`;
  }
  
  return (
    <div className="mb-5 text-center">
      <h1 className="text-5xl md:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 drop-shadow-lg">
        TIC • TAC • TOE
      </h1>
      <div className={`
        mt-3 px-6 py-2 rounded-full text-center font-semibold text-lg md:text-xl inline-block
        ${bgClass} text-white backdrop-blur-sm shadow-md
      `}>
        {status}
      </div>
    </div>
  );
};

export default GameStatus;