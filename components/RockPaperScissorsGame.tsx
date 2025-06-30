'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameChoice, GameResult, GameState, GameRound } from '@/types/game';
import { getRandomChoice, determineWinner, getResultMessage, getResultColor } from '@/lib/game-logic';
import { generateId } from '@/lib/utils';
import GameChoiceComponent from './GameChoice';
import ScoreBoard from './ScoreBoard';
import { useRouter } from 'next/navigation';

const RockPaperScissorsGame: React.FC = () => {
  const router = useRouter();
  const [isFrame, setIsFrame] = useState(false);

  useEffect(() => {
    // Detect if running in a Farcaster frame
    setIsFrame(window.location !== window.parent.location);
  }, []);

  const [gameState, setGameState] = useState<GameState>({
    playerChoice: null,
    computerChoice: null,
    result: null,
    playerScore: 0,
    computerScore: 0,
    isPlaying: false,
    gameHistory: [],
  });

  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const playGame = useCallback(async (playerChoice: GameChoice) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setGameState(prev => ({
      ...prev,
      playerChoice,
      computerChoice: null,
      result: null,
      isPlaying: true,
    }));

    // Simulate computer thinking with animation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const computerChoice = getRandomChoice();
    const result = determineWinner(playerChoice, computerChoice);

    const newRound: GameRound = {
      id: generateId(),
      playerChoice,
      computerChoice,
      result,
      timestamp: new Date(),
    };

    setGameState(prev => ({
      ...prev,
      computerChoice,
      result,
      playerScore: prev.playerScore + (result === 'win' ? 1 : 0),
      computerScore: prev.computerScore + (result === 'lose' ? 1 : 0),
      gameHistory: [newRound, ...prev.gameHistory.slice(0, 9)],
      isPlaying: false,
    }));

    setShowResult(true);
    setIsAnimating(false);

    // Auto-hide result after 3 seconds
    setTimeout(() => {
      setShowResult(false);
    }, 3000);

    // If in frame, refresh to show new state
    if (isFrame) {
      router.refresh();
    }
  }, [isAnimating, isFrame, router]);

  const resetGame = useCallback(() => {
    setGameState({
      playerChoice: null,
      computerChoice: null,
      result: null,
      playerScore: 0,
      computerScore: 0,
      isPlaying: false,
      gameHistory: [],
    });
    setShowResult(false);
    setIsAnimating(false);
  }, []);

  const playAgain = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      playerChoice: null,
      computerChoice: null,
      result: null,
      isPlaying: false,
    }));
    setShowResult(false);
    setIsAnimating(false);
  }, []);

  if (isFrame) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Playing in Frame</h1>
          <p className="text-xl">
            {gameState.playerChoice ? `You chose: ${gameState.playerChoice}` : "Make your move!"}
          </p>
          {gameState.result && (
            <p className={`text-2xl mt-4 ${getResultColor(gameState.result)}`}>
              {getResultMessage(gameState.result)}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-monad-900 via-monad-800 to-purple-900 flex flex-col items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-monad-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-monad-600/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Main Game Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-monad-300 to-purple-300 bg-clip-text text-transparent mb-4 animate-glow">
            Rock Paper Scissors
          </h1>
          <p className="text-monad-200 text-lg md:text-xl opacity-80">
            Challenge the computer in this classic game!
          </p>
        </motion.div>

        {/* Score Board */}
        <ScoreBoard
          playerScore={gameState.playerScore}
          computerScore={gameState.computerScore}
          gameHistory={gameState.gameHistory}
        />

        {/* Game Arena */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8 mb-8 shadow-2xl"
        >
          {/* Battle Display */}
          <div className="flex items-center justify-between mb-8 min-h-[120px]">
            {/* Player Choice */}
            <div className="flex-1 text-center">
              <h3 className="text-monad-200 text-lg font-semibold mb-4">You</h3>
              <AnimatePresence mode="wait">
                {gameState.playerChoice && (
                  <motion.div
                    key={gameState.playerChoice}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-6xl md:text-8xl animate-float"
                  >
                    {gameState.playerChoice === 'rock' && '🪨'}
                    {gameState.playerChoice === 'paper' && '📄'}
                    {gameState.playerChoice === 'scissors' && '✂️'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* VS Divider */}
            <div className="flex-shrink-0 mx-4 md:mx-8">
              <motion.div
                animate={{ 
                  scale: showResult ? [1, 1.2, 1] : 1,
                  rotate: showResult ? [0, 360] : 0 
                }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-4xl font-bold text-monad-300 bg-gradient-to-r from-monad-400 to-purple-400 bg-clip-text text-transparent"
              >
                VS
              </motion.div>
            </div>

            {/* Computer Choice */}
            <div className="flex-1 text-center">
              <h3 className="text-monad-200 text-lg font-semibold mb-4">Computer</h3>
              <AnimatePresence mode="wait">
                {gameState.isPlaying ? (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-4xl md:text-6xl animate-bounce"
                  >
                    🤔
                  </motion.div>
                ) : gameState.computerChoice ? (
                  <motion.div
                    key={gameState.computerChoice}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-6xl md:text-8xl animate-float"
                  >
                    {gameState.computerChoice === 'rock' && '🪨'}
                    {gameState.computerChoice === 'paper' && '📄'}
                    {gameState.computerChoice === 'scissors' && '✂️'}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* Result Display */}
          <AnimatePresence>
            {showResult && gameState.result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-center mb-6"
              >
                <div className={`text-2xl md:text-4xl font-bold ${getResultColor(gameState.result)} animate-glow`}>
                  {getResultMessage(gameState.result)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Choices */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <GameChoiceComponent
              choice="rock"
              onSelect={playGame}
              disabled={isAnimating || gameState.isPlaying}
              isSelected={gameState.playerChoice === 'rock'}
            />
            <GameChoiceComponent
              choice="paper"
              onSelect={playGame}
              disabled={isAnimating || gameState.isPlaying}
              isSelected={gameState.playerChoice === 'paper'}
            />
            <GameChoiceComponent
              choice="scissors"
              onSelect={playGame}
              disabled={isAnimating || gameState.isPlaying}
              isSelected={gameState.playerChoice === 'scissors'}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {gameState.result && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playAgain}
              className="px-6 py-3 bg-gradient-to-r from-monad-600 to-monad-700 hover:from-monad-500 hover:to-monad-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-monad-500/50"
            >
              Play Again
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/50"
          >
            Reset Game
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 text-monad-300/60 text-sm"
        >
          <p>Built with Next.js 14 • Powered by Monad</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RockPaperScissorsGame;