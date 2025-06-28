import { GameChoice, GameResult, ChoiceConfig } from '@/types/game';

export const GAME_CHOICES: ChoiceConfig[] = [
  {
    name: 'rock',
    emoji: '🪨',
    icon: 'Mountain',
    beats: 'scissors',
  },
  {
    name: 'paper',
    emoji: '📄',
    icon: 'FileText',
    beats: 'rock',
  },
  {
    name: 'scissors',
    emoji: '✂️',
    icon: 'Scissors',
    beats: 'paper',
  },
];

export function getRandomChoice(): GameChoice {
  const choices: GameChoice[] = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

export function determineWinner(
  playerChoice: GameChoice,
  computerChoice: GameChoice
): GameResult {
  if (playerChoice === computerChoice) {
    return 'tie';
  }

  const playerConfig = GAME_CHOICES.find(choice => choice.name === playerChoice);
  if (playerConfig && playerConfig.beats === computerChoice) {
    return 'win';
  }

  return 'lose';
}

export function getChoiceConfig(choice: GameChoice): ChoiceConfig {
  const config = GAME_CHOICES.find(c => c.name === choice);
  if (!config) {
    throw new Error(`Invalid choice: ${choice}`);
  }
  return config;
}

export function getResultMessage(result: GameResult): string {
  switch (result) {
    case 'win':
      return 'You Win! 🎉';
    case 'lose':
      return 'You Lose! 😢';
    case 'tie':
      return "It's a Tie! 🤝";
    default:
      return '';
  }
}

export function getResultColor(result: GameResult): string {
  switch (result) {
    case 'win':
      return 'text-green-400';
    case 'lose':
      return 'text-red-400';
    case 'tie':
      return 'text-yellow-400';
    default:
      return 'text-white';
  }
}
