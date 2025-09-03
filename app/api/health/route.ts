import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Basic health check
    type Health = {
      status: string;
      timestamp: string;
      environment?: string;
      version: string;
      services: {
        nextjs: string;
        database: string;
        external_apis: string;
        hmr?: string;
      };
      development?: {
        hotReload: boolean;
        fastRefresh: boolean;
      };
    };

    const health: Health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: "1.0.0",
      services: {
        nextjs: "operational",
        database: "not-configured", // Update when database is added
        external_apis: "operational",
      },
    };

    // Check if we're in development and having HMR issues
    if (process.env.NODE_ENV === "development") {
      health.services.hmr = "operational";
      health.development = {
        hotReload: true,
        fastRefresh: true,
      };
    }

    return NextResponse.json(health, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

export async function HEAD(request: NextRequest) {
  // Simple health check for load balancers
  return new NextResponse(null, { status: 200 });
}
