import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get environment variables directly without any helper functions
    const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_SECRET;
    const url = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://keylargoscubadiving.com";

    // Basic validation
    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({
        success: false,
        message: "Missing API credentials",
        has_key: Boolean(consumerKey),
        has_secret: Boolean(consumerSecret)
      });
    }

    // Create basic auth header
    const authString = `${consumerKey}:${consumerSecret}`;
    const base64Auth = Buffer.from(authString).toString('base64');
    
    // Simple fetch test
    const testUrl = `${url}/wp-json/wc/v3/system_status`;
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    
    // Return simple response without any complex objects
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      url: testUrl,
      response_size: responseText.length,
      first_100_chars: responseText.substring(0, 100)
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
      message: "Minimal test failed"
    });
  }
}
