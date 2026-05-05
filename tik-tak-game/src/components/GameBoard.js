import React from 'react';
import Square from './Square';

const GameBoard = ({ squares, winningLine, onPlay, disabled }) => {
  const isWinningSquare = (index) => {
    if (!winningLine) return false;
    return winningLine.includes(index);
  };

  const renderBoard = () => {
    const boardRows = [];
    for (let i = 0; i < 3; i++) {
      const rowCells = [];
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        rowCells.push(
          <Square
            key={idx}
            value={squares[idx]}
            onSquareClick={() => onPlay(idx)}
            isWinning={isWinningSquare(idx)}
            disabled={disabled}
          />
        );
      }
      boardRows.push(
        <div key={i} className="grid grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
          {rowCells}
        </div>
      );
    }
    return boardRows;
  };

  return (
    <div id="board-container" className="p-3 bg-white/5 rounded-3xl shadow-inner">
      {renderBoard()}
    </div>
  );
};

export default GameBoard;