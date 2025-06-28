import RockPaperScissorsGame from '@/components/RockPaperScissorsGame';

export default function Home() {
  return (
    <main className="min-h-screen">
      <RockPaperScissorsGame />
    </main>
  );
}

export const metadata = {
  title: 'Rock Paper Scissors | Farcaster Mini App',
  description: 'Play rock paper scissors in this fun Farcaster mini app with Monad purple theme',
  openGraph: {
    title: 'Rock Paper Scissors | Farcaster Mini App',
    description: 'Play rock paper scissors in this fun Farcaster mini app with Monad purple theme',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rock Paper Scissors | Farcaster Mini App',
    description: 'Play rock paper scissors in this fun Farcaster mini app with Monad purple theme',
  },
};
