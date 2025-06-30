import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData } = body;

    const appUrl = process.env.NEXT_PUBLIC_URL || 'https://rock-paper-scissors-farcaster.vercel.app';

    // Handle button clicks
    if (untrustedData?.buttonIndex === 1) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${appUrl}/images/game.png" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="🪨 Rock" />
            <meta property="fc:frame:button:1:action" content="post" />
            <meta property="fc:frame:button:2" content="📄 Paper" />
            <meta property="fc:frame:button:2:action" content="post" />
            <meta property="fc:frame:button:3" content="✂️ Scissors" />
            <meta property="fc:frame:button:3:action" content="post" />
            <meta property="fc:frame:post_url" content="${appUrl}/api/frame/play" />
            <meta property="og:image" content="${appUrl}/images/game.png" />
          </head>
          <body>
            <h1>Choose your move!</h1>
          </body>
        </html>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Default response
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${appUrl}/images/feed.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="🎮 Play Game" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:post_url" content="${appUrl}/api/frame" />
          <meta property="og:image" content="${appUrl}/images/feed.png" />
        </head>
        <body>
          <h1>Rock Paper Scissors</h1>
          <p>Click to play!</p>
        </body>
      </html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || 'https://rock-paper-scissors-farcaster.vercel.app';

  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${appUrl}/images/feed.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🎮 Play Game" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="${appUrl}/api/frame" />
        <meta property="og:image" content="${appUrl}/images/feed.png" />
      </head>
      <body>
        <h1>Rock Paper Scissors</h1>
        <p>A fun Farcaster mini app!</p>
      </body>
    </html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}