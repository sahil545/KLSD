import { NextResponse } from "next/server";

export async function GET() {
  try {
    const consumerKey = process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_SECRET;
    const url = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://keylargoscubadiving.com";

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({
        success: false,
        error: "Missing credentials"
      });
    }

    const results = [];

    // Method 1: Basic Auth with Buffer.from
    try {
      const authString = `${consumerKey}:${consumerSecret}`;
      const base64Auth = Buffer.from(authString).toString('base64');
      
      const response1 = await fetch(`${url}/wp-json/wc/v3/system_status`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${base64Auth}`,
          'Content-Type': 'application/json',
        },
      });
      
      const text1 = await response1.text();
      
      results.push({
        method: "Basic Auth (Buffer.from)",
        status: response1.status,
        success: response1.ok,
        response_preview: text1.substring(0, 100)
      });
    } catch (error) {
      results.push({
        method: "Basic Auth (Buffer.from)",
        error: String(error)
      });
    }

    // Method 2: Basic Auth with btoa
    try {
      const authString = `${consumerKey}:${consumerSecret}`;
      const base64Auth = btoa(authString);
      
      const response2 = await fetch(`${url}/wp-json/wc/v3/system_status`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${base64Auth}`,
          'Content-Type': 'application/json',
        },
      });
      
      const text2 = await response2.text();
      
      results.push({
        method: "Basic Auth (btoa)",
        status: response2.status,
        success: response2.ok,
        response_preview: text2.substring(0, 100)
      });
    } catch (error) {
      results.push({
        method: "Basic Auth (btoa)",
        error: String(error)
      });
    }

    // Method 3: URL Parameters
    try {
      const urlWithParams = `${url}/wp-json/wc/v3/system_status?consumer_key=${encodeURIComponent(consumerKey)}&consumer_secret=${encodeURIComponent(consumerSecret)}`;
      
      const response3 = await fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const text3 = await response3.text();
      
      results.push({
        method: "URL Parameters",
        status: response3.status,
        success: response3.ok,
        response_preview: text3.substring(0, 100)
      });
    } catch (error) {
      results.push({
        method: "URL Parameters",
        error: String(error)
      });
    }

    // Method 4: Different headers
    try {
      const authString = `${consumerKey}:${consumerSecret}`;
      const base64Auth = btoa(authString);
      
      const response4 = await fetch(`${url}/wp-json/wc/v3/system_status`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${base64Auth}`,
          'Accept': 'application/json',
          'User-Agent': 'WooCommerce-Test/1.0',
        },
      });
      
      const text4 = await response4.text();
      
      results.push({
        method: "Basic Auth (different headers)",
        status: response4.status,
        success: response4.ok,
        response_preview: text4.substring(0, 100)
      });
    } catch (error) {
      results.push({
        method: "Basic Auth (different headers)",
        error: String(error)
      });
    }

    return NextResponse.json({
      test_results: results,
      analysis: {
        any_success: results.some(r => r.success),
        all_failed: results.every(r => !r.success),
        consistent_401: results.every(r => r.status === 401)
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
      message: "Auth methods test failed"
    });
  }
}
