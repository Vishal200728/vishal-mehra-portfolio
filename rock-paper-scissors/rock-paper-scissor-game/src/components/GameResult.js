import React from 'react';

const GameResult = ({ result, playerChoice, computerChoice, isAnimating }) => {
  if (!result) return null;

  const getResultStyles = () => {
    switch(result) {
      case 'win':
        return 'bg-green-500/80 text-white';
      case 'lose':
        return 'bg-red-500/80 text-white';
      case 'draw':
        return 'bg-yellow-500/80 text-white';
      default:
        return 'bg-purple-500/80 text-white';
    }
  };

  const getResultEmoji = () => {
    switch(result) {
      case 'win': return '🏆';
      case 'lose': return '😢';
      case 'draw': return '🤝';
      default: return '🎮';
    }
  };

  const getChoiceEmoji = (choice) => {
    switch(choice) {
      case 'rock': return '🪨';
      case 'paper': return '📄';
      case 'scissors': return '✂️';
      default: return '❓';
    }
  };

  const getChoiceName = (choice) => {
    return choice ? choice.charAt(0).toUpperCase() + choice.slice(1) : '';
  };

  return (
    <div className={`${isAnimating ? 'animate-shake' : ''}`}>
      {/* Result Banner */}
      <div className={`${getResultStyles()} rounded-2xl p-6 mb-6 text-center backdrop-blur-sm transition-all duration-500`}>
        <div className="text-5xl mb-2">{getResultEmoji()}</div>
        <div className="text-2xl md:text-3xl font-bold uppercase">
          {result === 'win' ? 'You Win!' : result === 'lose' ? 'You Lose!' : "It's a Draw!"}
        </div>
      </div>

      {/* Choices Display */}
      <div className="grid grid-cols-2 gap-6">
        {/* Player Choice */}
        <div className="text-center">
          <div className="text-white/70 text-sm mb-2">You chose</div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-7xl mb-2">{getChoiceEmoji(playerChoice)}</div>
            <div className="text-white font-semibold">{getChoiceName(playerChoice)}</div>
          </div>
        </div>

        {/* VS */}
        <div className="flex items-center justify-center">
          <div className="text-3xl font-bold text-white/50">VS</div>
        </div>

        {/* Computer Choice */}
        <div className="text-center">
          <div className="text-white/70 text-sm mb-2">Computer chose</div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-7xl mb-2">{getChoiceEmoji(computerChoice)}</div>
            <div className="text-white font-semibold">{getChoiceName(computerChoice)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResult;