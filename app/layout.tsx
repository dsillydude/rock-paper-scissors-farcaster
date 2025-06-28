import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rock Paper Scissors | Farcaster Mini App',
  description: 'A fun rock-paper-scissors game built for Farcaster with Monad purple theme',
  keywords: ['rock paper scissors', 'game', 'farcaster', 'mini app', 'monad', 'web3'],
  authors: [{ name: 'Monad Labs' }],
  creator: 'Monad Labs',
  publisher: 'Monad Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),

  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'Rock Paper Scissors | Farcaster Mini App',
    description: 'A fun rock-paper-scissors game built for Farcaster with Monad purple theme',
    siteName: 'Rock Paper Scissors',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rock Paper Scissors Game',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Rock Paper Scissors | Farcaster Mini App',
    description: 'A fun rock-paper-scissors game built for Farcaster with Monad purple theme',
    images: ['/og-image.png'],
    creator: '@monad_xyz',
  },

  // Farcaster Frame metadata
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/og-image.png',
    'fc:frame:button:1': 'Play Game',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'og:image': '/og-image.png',
  },

  // Viewport and mobile optimization
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },

  // App-specific metadata
  applicationName: 'Rock Paper Scissors',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rock Paper Scissors',
  },

  // Manifest for PWA capabilities
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Farcaster Frame meta tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/og-image.png" />
        <meta property="fc:frame:button:1" content="Play Game" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'} />

        {/* Additional Farcaster compatibility */}
        <meta name="farcaster:frame" content="vNext" />
        <meta name="farcaster:frame:image" content="/og-image.png" />
        <meta name="farcaster:frame:button:1" content="🎮 Play Now" />
        <meta name="farcaster:frame:button:1:action" content="link" />
        <meta name="farcaster:frame:button:1:target" content={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'} />

        {/* Theme and styling */}
        <meta name="theme-color" content="#9d5aff" />
        <meta name="msapplication-TileColor" content="#9d5aff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-monad-900 via-monad-800 to-purple-900 min-h-screen antialiased`}>
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-monad-900/90 via-monad-800/90 to-purple-900/90 pointer-events-none" />

        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Global background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-monad-500/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-monad-600/3 rounded-full blur-3xl animate-spin-slow" />
          </div>
        </div>

        {/* Farcaster integration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Farcaster mini app integration
              if (typeof window !== 'undefined') {
                window.addEventListener('message', (event) => {
                  if (event.data.type === 'farcaster_frame_ready') {
                    console.log('Farcaster frame ready');
                  }
                });

                // Notify parent frame that app is ready
                if (window.parent !== window) {
                  window.parent.postMessage({ type: 'app_ready' }, '*');
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
