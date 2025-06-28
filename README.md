# Rock Paper Scissors Farcaster Mini App

A Rock Paper Scissors game built as a Farcaster Mini App with Monad purple theming.

## Features

- 🎮 Interactive Rock Paper Scissors gameplay
- 🎨 Monad-inspired purple gradient design
- 📱 Mobile-responsive interface
- 🏆 Score tracking system
- ✨ Smooth animations and transitions
- 🔗 Farcaster Mini App integration

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rock-paper-scissors-farcaster
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings
4. Update your environment variables in Vercel dashboard

### Manual Deployment

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
├── lib/               # Utility functions
├── styles/            # Additional styles
└── types/             # TypeScript types
```

## Game Rules

- Rock beats Scissors
- Scissors beats Paper  
- Paper beats Rock
- First to reach the target score wins!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
