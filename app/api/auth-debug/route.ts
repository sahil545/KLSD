import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const authDebug = {
      status: 'success',
      message: 'Auth debug endpoint',
      data: {
        authenticated: false,
        user: null,
        session: null,
        provider: 'none',
        debugInfo: {
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'development'
        }
      }
    };

    return NextResponse.json(authDebug);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch auth debug info' },
      { status: 500 }
    );
  }
}
