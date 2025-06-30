import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const appUrl = process.env.NEXT_PUBLIC_URL || 'https://rock-paper-scissors-farcaster.vercel.app';

export const metadata: Metadata = {
  title: "Rock Paper Scissors - Farcaster Mini App",
  description: "Play Rock Paper Scissors in Farcaster!",
  openGraph: {
    title: "Rock Paper Scissors",
    description: "Play Rock Paper Scissors in Farcaster!",
    images: [`${appUrl}/images/feed.png`],
  },
  other: {
    // Farcaster Frame Meta Tags
    "fc:frame": "vNext",
    "fc:frame:image": `${appUrl}/images/feed.png`,
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "🎮 Play Game",
    "fc:frame:button:1:action": "post",
    "fc:frame:post_url": `${appUrl}/api/frame`,

    // Mini App Meta Tags
    "farcaster:frame": "vNext",
    "farcaster:frame:image": `${appUrl}/images/feed.png`,
    "farcaster:frame:button:1": "🎮 Play Game",
    "farcaster:frame:button:1:action": "post",
    "farcaster:frame:post_url": `${appUrl}/api/frame`,

    // Additional Meta Tags
    "og:image": `${appUrl}/images/feed.png`,
    "twitter:card": "summary_large_image",
    "twitter:image": `${appUrl}/images/feed.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${appUrl}/images/feed.png`} />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🎮 Play Game" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content={`${appUrl}/api/frame`} />

        <meta name="farcaster:frame" content="vNext" />
        <meta name="farcaster:frame:image" content={`${appUrl}/images/feed.png`} />
        <meta name="farcaster:frame:button:1" content="🎮 Play Game" />
        <meta name="farcaster:frame:post_url" content={`${appUrl}/api/frame`} />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <div id="farcaster-root">
          {children}
        </div>
      </body>
    </html>
  );
}