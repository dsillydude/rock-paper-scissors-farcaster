export type GameChoice = 'rock' | 'paper' | 'scissors';

export type GameResult = 'win' | 'lose' | 'tie';

export interface GameState {
  playerChoice: GameChoice | null;
  computerChoice: GameChoice | null;
  result: GameResult | null;
  playerScore: number;
  computerScore: number;
  isPlaying: boolean;
  gameHistory: GameRound[];
}

export interface GameRound {
  id: string;
  playerChoice: GameChoice;
  computerChoice: GameChoice;
  result: GameResult;
  timestamp: Date;
}

export interface ChoiceConfig {
  name: GameChoice;
  emoji: string;
  icon: string;
  beats: GameChoice;
}
