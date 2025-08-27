import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get environment variables directly
    const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_SECRET;
    const url = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://keylargoscubadiving.com";

    console.log("Debug - Raw environment variables:");
    console.log("NEXT_PUBLIC_WOOCOMMERCE_KEY:", consumerKey);
    console.log("WOOCOMMERCE_SECRET:", consumerSecret ? `${consumerSecret.substring(0, 10)}...` : "undefined");
    console.log("NEXT_PUBLIC_WOOCOMMERCE_URL:", url);

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({
        success: false,
        error: "Missing credentials",
        debug: {
          has_key: Boolean(consumerKey),
          has_secret: Boolean(consumerSecret),
          key_length: consumerKey?.length || 0,
          secret_length: consumerSecret?.length || 0
        }
      });
    }

    // Test different authentication methods
    const results = [];

    // Method 1: Buffer.from (current method)
    const authString1 = `${consumerKey}:${consumerSecret}`;
    const base64Auth1 = Buffer.from(authString1).toString('base64');
    
    results.push({
      method: "Buffer.from",
      auth_string_length: authString1.length,
      base64_length: base64Auth1.length,
      base64_preview: base64Auth1.substring(0, 20) + "...",
      header_value: `Basic ${base64Auth1}`.substring(0, 30) + "..."
    });

    // Method 2: btoa (browser method)
    const base64Auth2 = btoa(authString1);
    
    results.push({
      method: "btoa",
      auth_string_length: authString1.length,
      base64_length: base64Auth2.length,
      base64_preview: base64Auth2.substring(0, 20) + "...",
      header_value: `Basic ${base64Auth2}`.substring(0, 30) + "...",
      same_as_buffer: base64Auth1 === base64Auth2
    });

    // Method 3: URL parameters (alternative)
    const urlWithParams = `${url}/wp-json/wc/v3/system_status?consumer_key=${encodeURIComponent(consumerKey)}&consumer_secret=${encodeURIComponent(consumerSecret)}`;
    
    results.push({
      method: "URL parameters",
      url_length: urlWithParams.length,
      url_preview: urlWithParams.replace(consumerSecret, 'cs_***').substring(0, 100) + "..."
    });

    return NextResponse.json({
      debug_info: {
        environment: process.env.NODE_ENV,
        url: url,
        credential_lengths: {
          key: consumerKey.length,
          secret: consumerSecret.length
        },
        credential_previews: {
          key: consumerKey.substring(0, 15) + "...",
          secret: consumerSecret.substring(0, 15) + "..."
        }
      },
      auth_methods: results,
      next_step: "Try each method to see which one works"
    });
    
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json({
      success: false,
      error: String(error),
      message: "Debug endpoint failed"
    });
  }
}
