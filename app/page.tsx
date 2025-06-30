"use client";

import { useState, useEffect } from 'react';
import { useFarcaster } from '../lib/useFarcaster';

type Choice = 'rock' | 'paper' | 'scissors';

const choices: Choice[] = ['rock', 'paper', 'scissors'];
const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };

export default function Home() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const { isSDKLoaded, user, isAuthenticated } = useFarcaster();

  useEffect(() => {
    // Auto-detect if we're in a frame environment
    const isInFrame = window.parent !== window;
    if (isInFrame) {
      document.body.classList.add('in-frame');
    }
  }, []);

  const getWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) return 'tie';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const playGame = (choice: Choice) => {
    setIsPlaying(true);
    setPlayerChoice(choice);

    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(computerChoice);

      const winner = getWinner(choice, computerChoice);

      if (winner === 'player') {
        setResult('You Win! 🎉');
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (winner === 'computer') {
        setResult('Computer Wins! 🤖');
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      } else {
        setResult('It\'s a Tie! 🤝');
      }

      setIsPlaying(false);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setIsPlaying(false);
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0 });
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎮 Rock Paper Scissors
          </h1>
          {isAuthenticated && user && (
            <p className="text-white/80 text-sm">
              Playing as @{user.username}
            </p>
          )}
          <div className="flex justify-center gap-8 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{score.player}</div>
              <div className="text-white/80 text-sm">You</div>
            </div>
            <div className="text-white/60 text-2xl">vs</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{score.computer}</div>
              <div className="text-white/80 text-sm">CPU</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          {!isPlaying && !result && (
            <p className="text-white/90 text-lg mb-6">Choose your weapon!</p>
          )}

          {isPlaying && (
            <div className="text-6xl mb-4 animate-bounce">🤔</div>
          )}

          {result && (
            <div className="mb-6">
              <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-2">{emojis[playerChoice!]}</div>
                  <div className="text-white/80 text-sm">You</div>
                </div>
                <div className="text-white/60 text-4xl self-center">vs</div>
                <div className="text-center">
                  <div className="text-6xl mb-2">{emojis[computerChoice!]}</div>
                  <div className="text-white/80 text-sm">CPU</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-4">{result}</div>
            </div>
          )}
        </div>

        {!isPlaying && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => playGame(choice)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl p-6 transition-all duration-200 hover:scale-105 active:scale-95 border border-white/30"
                disabled={isPlaying}
              >
                <div className="text-4xl mb-2">{emojis[choice]}</div>
                <div className="text-white font-medium capitalize">{choice}</div>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {result && (
            <button
              onClick={resetGame}
              className="flex-1 bg-green-500/80 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Play Again
            </button>
          )}
          <button
            onClick={resetScore}
            className="flex-1 bg-red-500/80 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Reset Score
          </button>
        </div>

        {isSDKLoaded && (
          <div className="mt-4 text-center">
            <div className="text-white/60 text-xs">
              🎯 Running in Farcaster Mini App
            </div>
          </div>
        )}
      </div>
    </div>
  );
}