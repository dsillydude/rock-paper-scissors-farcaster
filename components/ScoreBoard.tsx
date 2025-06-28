
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameRound } from '@/types/game';
import { formatDate } from '@/lib/utils';
import { Trophy, User, Bot, History, ChevronDown, ChevronUp } from 'lucide-react';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
  gameHistory: GameRound[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  playerScore,
  computerScore,
  gameHistory,
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const totalGames = playerScore + computerScore + gameHistory.filter(g => g.result === 'tie').length;
  const winRate = totalGames > 0 ? Math.round((playerScore / totalGames) * 100) : 0;

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'win':
        return '🎉';
      case 'lose':
        return '😢';
      case 'tie':
        return '🤝';
      default:
        return '❓';
    }
  };

  const getChoiceEmoji = (choice: string) => {
    switch (choice) {
      case 'rock':
        return '🪨';
      case 'paper':
        return '📄';
      case 'scissors':
        return '✂️';
      default:
        return '❓';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-8"
    >
      {/* Main Score Display */}
      <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Player Score */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center p-4 rounded-xl bg-gradient-to-br from-monad-500/20 to-monad-600/10 border border-monad-400/30"
          >
            <div className="flex items-center justify-center mb-2">
              <User className="w-5 h-5 text-monad-300 mr-2" />
              <h3 className="text-monad-200 font-semibold">You</h3>
            </div>
            <motion.div
              key={playerScore}
              initial={{ scale: 1.2, color: '#9d5aff' }}
              animate={{ scale: 1, color: '#e4d1ff' }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-monad-200"
            >
              {playerScore}
            </motion.div>
            <p className="text-monad-300/70 text-sm mt-1">Wins</p>
          </motion.div>

          {/* Stats */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-purple-300 mr-2" />
              <h3 className="text-purple-200 font-semibold">Stats</h3>
            </div>
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-purple-200">
                {winRate}%
              </div>
              <p className="text-purple-300/70 text-sm">Win Rate</p>
              <p className="text-purple-300/50 text-xs">
                {totalGames} games played
              </p>
            </div>
          </div>

          {/* Computer Score */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center p-4 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-400/30"
          >
            <div className="flex items-center justify-center mb-2">
              <Bot className="w-5 h-5 text-red-300 mr-2" />
              <h3 className="text-red-200 font-semibold">Computer</h3>
            </div>
            <motion.div
              key={computerScore}
              initial={{ scale: 1.2, color: '#ef4444' }}
              animate={{ scale: 1, color: '#fca5a5' }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-red-200"
            >
              {computerScore}
            </motion.div>
            <p className="text-red-300/70 text-sm mt-1">Wins</p>
          </motion.div>
        </div>

        {/* Game History Toggle */}
        {gameHistory.length > 0 && (
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 p-3 bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 rounded-xl border border-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <History className="w-4 h-4 text-monad-300" />
            <span className="text-monad-200 font-medium">Game History</span>
            {showHistory ? (
              <ChevronUp className="w-4 h-4 text-monad-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-monad-300" />
            )}
          </motion.button>
        )}
      </div>

      {/* Game History */}
      <AnimatePresence>
        {showHistory && gameHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-4">
              <h4 className="text-monad-200 font-semibold mb-4 flex items-center">
                <History className="w-4 h-4 mr-2" />
                Recent Games
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {gameHistory.map((round, index) => (
                  <motion.div
                    key={round.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {getChoiceEmoji(round.playerChoice)}
                      </span>
                      <span className="text-monad-300 text-sm">vs</span>
                      <span className="text-lg">
                        {getChoiceEmoji(round.computerChoice)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {getResultIcon(round.result)}
                      </span>
                      <span className={`text-sm font-medium ${
                        round.result === 'win' ? 'text-green-400' :
                        round.result === 'lose' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {round.result.toUpperCase()}
                      </span>
                      <span className="text-xs text-monad-400 hidden sm:block">
                        {formatDate(round.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(157, 90, 255, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(157, 90, 255, 0.7);
        }
      `}</style>
    </motion.div>
  );
};

export default ScoreBoard;
