import React from 'react';

const MoveHistory = ({ moves, sortAscending, onJumpTo, onToggleSort }) => {
  const sortedMoves = sortAscending ? moves : [...moves].reverse();
  
  return (
    <div className="w-full lg:w-72 bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-xl">
      <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
        <h2 className="text-xl font-bold text-white tracking-wide">📜 Game Log</h2>
        <button
          onClick={onToggleSort}
          className="text-xs bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-white transition font-medium flex items-center gap-1"
        >
          {sortAscending ? '⬆️ Oldest first' : '⬇️ Newest first'}
        </button>
      </div>
      <div className="overflow-y-auto max-h-[420px] pr-1 custom-scroll">
        {moves.length === 0 ? (
          <p className="text-white/50 text-center">No moves yet</p>
        ) : (
          <ul className="space-y-1">
            {sortedMoves.map(({ move, description, isCurrent }) => (
              <li key={move} className="mb-2">
                <button
                  onClick={() => onJumpTo(move)}
                  className={`
                    w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all
                    ${isCurrent 
                      ? 'bg-indigo-500 text-white shadow-md ring-2 ring-white/50' 
                      : 'bg-white/10 text-white/90 hover:bg-white/20 backdrop-blur-sm'
                    }
                  `}
                >
                  {description} {isCurrent && '(current)'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-5 pt-3 text-center text-white/40 text-xs border-t border-white/10">
        Click any move to revisit
      </div>
    </div>
  );
};

export default MoveHistory;