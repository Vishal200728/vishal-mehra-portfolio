import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import MoveHistory from './components/MoveHistory';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };
    }
  }
  return { winner: null, winningLine: null };
};

const isBoardFull = (squares) => {
  return squares.every(cell => cell !== null);
};

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
  </svg>
);

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const { winner, winningLine } = calculateWinner(currentSquares);
  const isDraw = !winner && isBoardFull(currentSquares);

  const handlePlay = (index) => {
    if (winner || currentSquares[index]) return;

    const newSquares = currentSquares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';

    const newHistory = history.slice(0, currentMove + 1);
    newHistory.push(newSquares);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  const moves = history.map((squares, move) => {
    let description = '';
    if (move === 0) {
      description = 'Start of game';
    } else {
      const prevSquares = history[move - 1];
      const changedIndex = squares.findIndex((val, idx) => val !== prevSquares[idx]);
      const row = Math.floor(changedIndex / 3) + 1;
      const col = (changedIndex % 3) + 1;
      const player = squares[changedIndex];
      description = `Move ${move}: ${player} at (${row},${col})`;
    }
    return { move, description, isCurrent: move === currentMove };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center p-5 md:p-6 rounded-3xl bg-black/30 backdrop-blur-sm shadow-2xl border border-white/20">
        <div className="flex-1 flex flex-col items-center">
          <GameStatus winner={winner} isDraw={isDraw} xIsNext={xIsNext} />
          <GameBoard
            squares={currentSquares}
            winningLine={winningLine}
            onPlay={handlePlay}
            disabled={!!winner || isDraw}
          />
          <button
            onClick={resetGame}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 text-lg"
          >
            <ResetIcon />
            New Game
          </button>
          <div className="mt-4 text-xs text-white/60 flex gap-3">
            <span>Move: {currentMove}</span>
            <span>{winner ? 'Game Over' : xIsNext ? 'X turn' : 'O turn'}</span>
          </div>
        </div>
        <MoveHistory
          moves={moves}
          sortAscending={sortAscending}
          onJumpTo={jumpTo}
          onToggleSort={toggleSort}
        />
      </div>
    </div>
  );
}

export default App;