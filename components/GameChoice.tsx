
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GameChoice } from '@/types/game';
import { getChoiceConfig } from '@/lib/game-logic';
import { cn } from '@/lib/utils';

interface GameChoiceProps {
  choice: GameChoice;
  onSelect: (choice: GameChoice) => void;
  disabled?: boolean;
  isSelected?: boolean;
}

const GameChoiceComponent: React.FC<GameChoiceProps> = ({
  choice,
  onSelect,
  disabled = false,
  isSelected = false,
}) => {
  const config = getChoiceConfig(choice);

  const handleClick = () => {
    if (!disabled) {
      onSelect(choice);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, y: -5 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        hover: { duration: 0.2 },
        tap: { duration: 0.1 }
      }}
      className={cn(
        "relative group p-6 md:p-8 rounded-2xl transition-all duration-300 transform",
        "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm",
        "border border-white/20 hover:border-monad-400/50",
        "shadow-lg hover:shadow-2xl hover:shadow-monad-500/25",
        disabled && "opacity-50 cursor-not-allowed",
        isSelected && "ring-2 ring-monad-400 bg-gradient-to-br from-monad-500/20 to-monad-600/10",
        !disabled && "hover:bg-gradient-to-br hover:from-monad-500/20 hover:to-monad-600/10"
      )}
    >
      {/* Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        "bg-gradient-to-br from-monad-400/20 to-purple-500/20 blur-xl",
        isSelected && "opacity-50"
      )} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-3">
        {/* Emoji */}
        <motion.div
          animate={isSelected ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0] 
          } : {}}
          transition={{ duration: 0.6, repeat: isSelected ? Infinity : 0, repeatDelay: 2 }}
          className="text-4xl md:text-6xl filter drop-shadow-lg"
        >
          {config.emoji}
        </motion.div>

        {/* Choice Name */}
        <div className="text-center">
          <h3 className={cn(
            "text-lg md:text-xl font-bold capitalize transition-colors duration-300",
            "bg-gradient-to-r from-monad-200 to-purple-200 bg-clip-text text-transparent",
            isSelected && "from-monad-100 to-purple-100",
            !disabled && "group-hover:from-white group-hover:to-monad-100"
          )}>
            {config.name}
          </h3>

          {/* Beats indicator */}
          <p className={cn(
            "text-xs md:text-sm text-monad-300/70 mt-1 transition-colors duration-300",
            !disabled && "group-hover:text-monad-200/90"
          )}>
            Beats {config.beats}
          </p>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-monad-400 to-monad-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}

        {/* Hover Effect Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-monad-400 rounded-full opacity-0 group-hover:opacity-100"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Ripple Effect on Click */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-monad-400/30 opacity-0"
        animate={isSelected ? { 
          scale: [0, 1.5],
          opacity: [0.5, 0] 
        } : {}}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default GameChoiceComponent;
