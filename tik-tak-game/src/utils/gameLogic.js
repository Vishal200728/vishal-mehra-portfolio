// utils/gameLogic.js - Reusable game logic functions
export const calculateWinner = (squares) => {
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

export const isBoardFull = (squares) => {
  return squares.every(cell => cell !== null);
};

export const getMoveDescription = (prevSquares, currentSquares, moveNumber) => {
  const changedIndex = currentSquares.findIndex((val, idx) => val !== prevSquares[idx]);
  const row = Math.floor(changedIndex / 3) + 1;
  const col = (changedIndex % 3) + 1;
  const player = currentSquares[changedIndex];
  return `Move ${moveNumber}: ${player} at (${row},${col})`;
};