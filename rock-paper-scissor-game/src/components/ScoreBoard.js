import React from 'react';

const ScoreBoard = ({ score, roundsPlayed }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Score Board</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">{score.player}</div>
          <div className="text-sm text-white/70 mt-1">Player</div>
        </div>
        <div className="text-center border-x border-white/20">
          <div className="text-3xl font-bold text-yellow-400">{score.draw}</div>
          <div className="text-sm text-white/70 mt-1">Draws</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400">{score.computer}</div>
          <div className="text-sm text-white/70 mt-1">Computer</div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-white/20 text-center">
        <div className="text-white/60 text-sm">Rounds Played: {roundsPlayed}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;