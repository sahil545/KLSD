import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiComparison = {
      status: 'success',
      message: 'API comparison endpoint',
      data: {
        apis: [
          {
            name: 'REST API',
            type: 'Traditional',
            status: 'active'
          },
          {
            name: 'GraphQL API',
            type: 'Query Language',
            status: 'active'
          }
        ]
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(apiComparison);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch API comparison' },
      { status: 500 }
    );
  }
}
