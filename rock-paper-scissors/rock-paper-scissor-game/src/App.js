import React, { useState, useEffect } from 'react';
import ChoiceButton from './components/ChoiceButton';
import ScoreBoard from './components/ScoreBoard';
import GameResult from './components/GameResult';

const App = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 });
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  const choices = [
    { id: 'rock', name: 'Rock', icon: '🪨', emoji: '✊' },
    { id: 'paper', name: 'Paper', icon: '📄', emoji: '✋' },
    { id: 'scissors', name: 'Scissors', icon: '✂️', emoji: '✌️' }
  ];

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].id;
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'draw';
    
    const rules = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };
    
    return rules[player] === computer ? 'win' : 'lose';
  };

  const playGame = (choice) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setIsAnimating(true);
    
    const computer = getComputerChoice();
    const gameResult = determineWinner(choice, computer);
    
    // Animate the result
    setTimeout(() => {
      setPlayerChoice(choice);
      setComputerChoice(computer);
      setResult(gameResult);
      
      // Update score
      setScore(prev => {
        const newScore = { ...prev };
        if (gameResult === 'win') newScore.player++;
        else if (gameResult === 'lose') newScore.computer++;
        else newScore.draw++;
        return newScore;
      });
      
      // Update history
      setGameHistory(prev => [{
        id: Date.now(),
        player: choice,
        computer: computer,
        result: gameResult,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev].slice(0, 10));
      
      setRoundsPlayed(prev => prev + 1);
      setIsAnimating(false);
      
      // Reset choices after 3 seconds
      setTimeout(() => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
        setIsPlaying(false);
      }, 3000);
    }, 500);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0, draw: 0 });
    setRoundsPlayed(0);
    setGameHistory([]);
    setIsPlaying(false);
    setIsAnimating(false);
  };

  const getGameResultMessage = () => {
    if (score.player > score.computer) return "You're winning! 🎯";
    if (score.computer > score.player) return "Computer is leading! 🤖";
    if (roundsPlayed > 0) return "It's a tie! 🤝";
    return "Make your move! 🎮";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 animate-float">
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 text-transparent bg-clip-text">
              Rock Paper Scissors
            </span>
          </h1>
          <p className="text-white/80 text-lg">Classic game. Epic battles. 🎮</p>
        </div>

        {/* Score Board */}
        <div className="max-w-md mx-auto w-full mb-8">
          <ScoreBoard score={score} roundsPlayed={roundsPlayed} />
          <div className="mt-4 text-center">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-white/90 text-sm">{getGameResultMessage()}</span>
            </div>
          </div>
        </div>

        {/* Game Result Display */}
        {(playerChoice && computerChoice && result) && (
          <div className="max-w-2xl mx-auto w-full mb-8">
            <GameResult 
              result={result}
              playerChoice={playerChoice}
              computerChoice={computerChoice}
              isAnimating={isAnimating}
            />
          </div>
        )}

        {/* Game Choices */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {!isPlaying && !playerChoice ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl text-white/90 mb-2">Choose your move!</h2>
                <p className="text-white/60 text-sm">Click on any option to play</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {choices.map(choice => (
                  <ChoiceButton
                    key={choice.id}
                    choice={choice.id}
                    label={choice.name}
                    icon={choice.icon}
                    onSelect={playGame}
                    disabled={isPlaying}
                  />
                ))}
              </div>
            </>
          ) : isPlaying && !playerChoice ? (
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🤖</div>
              <div className="text-white/80 text-xl">Computer is thinking...</div>
              <div className="mt-4 flex justify-center gap-2">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Game History */}
        {gameHistory.length > 0 && (
          <div className="mt-12 max-w-md mx-auto w-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h3 className="text-white/80 font-semibold mb-3 text-center">Recent Games</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {gameHistory.map(game => (
                  <div key={game.id} className="bg-white/5 rounded-lg p-2 text-sm flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {game.player === 'rock' ? '🪨' : game.player === 'paper' ? '📄' : '✂️'}
                      </span>
                      <span className="text-white/60">vs</span>
                      <span className="text-lg">
                        {game.computer === 'rock' ? '🪨' : game.computer === 'paper' ? '📄' : '✂️'}
                      </span>
                    </div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      game.result === 'win' ? 'bg-green-500/30 text-green-300' :
                      game.result === 'lose' ? 'bg-red-500/30 text-red-300' :
                      'bg-yellow-500/30 text-yellow-300'
                    }`}>
                      {game.result === 'win' ? 'Win' : game.result === 'lose' ? 'Lose' : 'Draw'}
                    </div>
                    <div className="text-white/40 text-xs">{game.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold transition-all transform hover:scale-105 border border-white/20"
          >
            Reset Game 🔄
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/40 text-sm">
          Made with ❤️ using React & Tailwind
        </div>
      </div>
    </div>
  );
};

export default App;