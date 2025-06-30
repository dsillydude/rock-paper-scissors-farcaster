import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',  // Critical for Vercel OG
};

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters
    const userChoice = searchParams.get('user') || '❓';
    const computerChoice = searchParams.get('computer') || '❓';
    const result = searchParams.get('result') || 'Game';
    
    // Custom OG image design
    return new ImageResponse(
      (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #1a1a2e, #16213e)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: 72, marginBottom: '2rem' }}>Rock Paper Scissors</h1>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginBottom: '3rem'
          }}>
            <div>
              <p style={{ fontSize: 48 }}>You</p>
              <p style={{ fontSize: 64 }}>{userChoice}</p>
            </div>
            <div>
              <p style={{ fontSize: 48 }}>Computer</p>
              <p style={{ fontSize: 64 }}>{computerChoice}</p>
            </div>
          </div>
          
          <p style={{ 
            fontSize: 64, 
            color: result.includes('win') ? '#4ade80' : 
                  result.includes('lose') ? '#f87171' : '#fbbf24'
          }}>
            {result}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
    
  } catch (error) {
    console.error('Image generation failed:', error);
    return new Response('Image generation failed', { status: 500 });
  }
}