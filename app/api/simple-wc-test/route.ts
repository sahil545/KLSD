import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get config directly from environment variables to avoid any circular references
    const config = {
      url:
        process.env.NEXT_PUBLIC_WOOCOMMERCE_URL ||
        "https://keylargoscubadiving.com",
      consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY || "",
      consumerSecret: process.env.WOOCOMMERCE_SECRET || "",
    };

    // Simple validation
    if (!config.consumerKey || !config.consumerSecret) {
      return NextResponse.json({
        success: false,
        error: "Missing API credentials",
        config_check: {
          has_key: !!config.consumerKey,
          has_secret: !!config.consumerSecret,
          url: config.url,
        },
      });
    }

    // Basic auth string
    const auth = btoa(`${config.consumerKey}:${config.consumerSecret}`);

    // Test simple WooCommerce endpoint
    const testUrl = `${config.url}/wp-json/wc/v3/system_status`;

    const response = await fetch(testUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000),
    });

    const responseText = await response.text();

    // Safe response object without circular references
    const result = {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      url: testUrl,
      response_length: responseText.length,
      response_preview: responseText.substring(0, 300),
      headers: {
        "content-type": response.headers.get("content-type"),
        server: response.headers.get("server"),
      },
      config_preview: {
        url: config.url,
        key_length: config.consumerKey.length,
        key_prefix: config.consumerKey.substring(0, 10) + "...",
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    // Safe error handling
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({
      success: false,
      error: errorMessage,
      message: "Simple WooCommerce test failed",
    });
  }
}
