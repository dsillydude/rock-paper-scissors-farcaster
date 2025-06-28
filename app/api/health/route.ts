import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();

    // Basic health check data
    const healthData = {
      status: 'healthy',
      timestamp,
      uptime: Math.floor(uptime),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      app: 'rock-paper-scissors-farcaster',
      description: 'Rock Paper Scissors Farcaster Mini App',
      checks: {
        server: 'ok',
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          unit: 'MB'
        },
        node_version: process.version,
      },
      endpoints: {
        game: '/',
        health: '/api/health',
      },
      features: [
        'Rock Paper Scissors Game',
        'Score Tracking',
        'Game History',
        'Responsive Design',
        'Farcaster Integration',
        'Monad Purple Theme'
      ]
    };

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Health-Check': 'ok',
        'X-Timestamp': timestamp,
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);

    const errorResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      app: 'rock-paper-scissors-farcaster',
    };

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'X-Health-Check': 'error',
      },
    });
  }
}

export async function HEAD(request: NextRequest) {
  // Simple HEAD request for basic health check
  try {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Health-Check': 'ok',
        'X-Timestamp': new Date().toISOString(),
      },
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      headers: {
        'X-Health-Check': 'error',
      },
    });
  }
}

// Optional: POST endpoint for more detailed health checks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const includeDetailed = body.detailed === true;

    const timestamp = new Date().toISOString();
    const uptime = process.uptime();

    let healthData: any = {
      status: 'healthy',
      timestamp,
      uptime: Math.floor(uptime),
      app: 'rock-paper-scissors-farcaster',
    };

    if (includeDetailed) {
      healthData = {
        ...healthData,
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        platform: process.platform,
        arch: process.arch,
        node_version: process.version,
        memory: {
          rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
          heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          external: Math.round(process.memoryUsage().external / 1024 / 1024),
          unit: 'MB'
        },
        cpu: {
          usage: process.cpuUsage(),
        },
        env_vars: {
          NODE_ENV: process.env.NODE_ENV,
          NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
          NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ? '[SET]' : '[NOT_SET]',
        },
        features: [
          'Rock Paper Scissors Game',
          'Real-time Score Tracking',
          'Game History with Persistence',
          'Mobile-First Responsive Design',
          'Farcaster Frame Integration',
          'Monad Purple Theme',
          'Framer Motion Animations',
          'Glassmorphism UI Effects',
          'TypeScript Support',
          'Tailwind CSS Styling'
        ],
        api_endpoints: {
          health_get: '/api/health',
          health_post: '/api/health',
          health_head: '/api/health',
        }
      };
    }

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Health-Check': 'ok',
        'X-Timestamp': timestamp,
      },
    });
  } catch (error) {
    console.error('Detailed health check failed:', error);

    const errorResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      app: 'rock-paper-scissors-farcaster',
    };

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'X-Health-Check': 'error',
      },
    });
  }
}
