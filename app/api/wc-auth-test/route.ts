import { NextResponse } from "next/server";

export async function GET() {
  try {
    const consumerKey =
      process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY ||
      "ck_355eea87ceae6ae4d2e9c1ca3df129a0791d1b29";
    const consumerSecret =
      process.env.WOOCOMMERCE_SECRET ||
      "cs_4ca514b579f156da6209c938ad3a10a823b5c3ec";
    const baseUrl = "https://keylargoscubadiving.com";

    const tests = [];

    // Test 1: Basic Auth Header
    try {
      const authString = `${consumerKey}:${consumerSecret}`;
      const base64Auth = Buffer.from(authString).toString("base64");

      const response = await fetch(`${baseUrl}/wp-json/wc/v3/system_status`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${base64Auth}`,
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      tests.push({
        method: "Basic Auth Header",
        status: response.status,
        success: response.ok,
        response_preview: text.substring(0, 200),
      });
    } catch (error) {
      tests.push({
        method: "Basic Auth Header",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 2: URL Parameters Auth
    try {
      const urlWithAuth = `${baseUrl}/wp-json/wc/v3/system_status?consumer_key=${encodeURIComponent(consumerKey)}&consumer_secret=${encodeURIComponent(consumerSecret)}`;

      const response = await fetch(urlWithAuth, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      tests.push({
        method: "URL Parameters Auth",
        status: response.status,
        success: response.ok,
        response_preview: text.substring(0, 200),
      });
    } catch (error) {
      tests.push({
        method: "URL Parameters Auth",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 3: Different endpoint (products)
    try {
      const authString = `${consumerKey}:${consumerSecret}`;
      const base64Auth = Buffer.from(authString).toString("base64");

      const response = await fetch(
        `${baseUrl}/wp-json/wc/v3/products?per_page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${base64Auth}`,
            "Content-Type": "application/json",
          },
        },
      );

      const text = await response.text();
      tests.push({
        method: "Products Endpoint",
        status: response.status,
        success: response.ok,
        response_preview: text.substring(0, 200),
      });
    } catch (error) {
      tests.push({
        method: "Products Endpoint",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 4: No auth (should fail)
    try {
      const response = await fetch(`${baseUrl}/wp-json/wc/v3/system_status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      tests.push({
        method: "No Auth (should fail)",
        status: response.status,
        success: response.ok,
        response_preview: text.substring(0, 200),
      });
    } catch (error) {
      tests.push({
        method: "No Auth (should fail)",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      credentials: {
        hasKey: !!consumerKey,
        hasSecret: !!consumerSecret,
        keyPreview: consumerKey
          ? `${consumerKey.substring(0, 10)}...`
          : "missing",
        secretPreview: consumerSecret
          ? `${consumerSecret.substring(0, 10)}...`
          : "missing",
      },
      tests,
      summary: {
        totalTests: tests.length,
        successful: tests.filter((t) => t.success).length,
        failed: tests.filter((t) => !t.success && !t.error).length,
        errors: tests.filter((t) => t.error).length,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Auth test failed",
    });
  }
}
