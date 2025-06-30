import { NextResponse } from 'next/server'

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || 'https://rock-paper-scissors-farcaster.vercel.app'

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhkZjIwNGJjNzY0YTI4NGU0MmE3YzU3N2IxMGU2Yzk0ZGQyNzFlNDA5In0",
      payload: "eyJkb21haW4iOiJyb2NrLXBhcGVyLXNjaXNzb3JzLWZhcmNhc3Rlci52ZXJjZWwuYXBwIn0",
      signature: "MHhkZjIwNGJjNzY0YTI4NGU0MmE3YzU3N2IxMGU2Yzk0ZGQyNzFlNDA5"
    },
    frame: {
      version: "1",
      name: "Rock Paper Scissors",
      iconUrl: `${appUrl}/images/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/images/feed.png`,
      buttonTitle: "🎮 Play Game",
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#8b5aff",
      websiteUrl: appUrl
    }
  }

  return NextResponse.json(config, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}