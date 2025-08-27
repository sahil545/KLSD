import { NextResponse } from "next/server";
import { getWooCommerceConfig } from "../../../client/lib/woocommerce-config";

export async function GET() {
  try {
    const config = getWooCommerceConfig();

    // Test multiple authentication methods
    const tests = [];

    // Test 1: Basic Auth (current method)
    const basicAuth = btoa(`${config.consumerKey}:${config.consumerSecret}`);
    const basicAuthUrl = `${config.url}/wp-json/wc/v3/products?per_page=1`;

    try {
      const basicResponse = await fetch(basicAuthUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
      });
      const basicResponseText = await basicResponse.text();

      tests.push({
        method: "Basic Auth",
        url: basicAuthUrl,
        status: basicResponse.status,
        success: basicResponse.ok,
        headers_sent: {
          Authorization: `Basic ${basicAuth.substring(0, 20)}...`,
          "Content-Type": "application/json",
        },
        response_preview: basicResponseText.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        method: "Basic Auth",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 2: URL parameters (alternative method)
    const urlParamsUrl = `${config.url}/wp-json/wc/v3/products?consumer_key=${encodeURIComponent(config.consumerKey)}&consumer_secret=${encodeURIComponent(config.consumerSecret)}&per_page=1`;

    try {
      const urlResponse = await fetch(urlParamsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const urlResponseText = await urlResponse.text();

      tests.push({
        method: "URL Parameters",
        url: urlParamsUrl.replace(config.consumerSecret, "cs_***"),
        status: urlResponse.status,
        success: urlResponse.ok,
        response_preview: urlResponseText.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        method: "URL Parameters",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 3: Simple system status check with auth
    const systemUrl = `${config.url}/wp-json/wc/v3/system_status`;
    try {
      const systemResponse = await fetch(systemUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
      });
      const systemResponseText = await systemResponse.text();

      tests.push({
        method: "System Status (Basic Auth)",
        url: systemUrl,
        status: systemResponse.status,
        success: systemResponse.ok,
        response_preview: systemResponseText.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        method: "System Status",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return NextResponse.json({
      config_debug: {
        url: config.url,
        consumer_key_length: config.consumerKey?.length || 0,
        consumer_secret_length: config.consumerSecret?.length || 0,
        consumer_key_preview: config.consumerKey?.substring(0, 15) + "...",
        consumer_secret_preview:
          config.consumerSecret?.substring(0, 15) + "...",
        basic_auth_preview: basicAuth.substring(0, 30) + "...",
      },
      auth_tests: tests,
      recommendations: [
        "Check if API key was created with your Administrator user account",
        "Verify WooCommerce → Settings → Advanced → REST API has 'Enable the REST API' checked",
        "Check for security plugins blocking API access",
        "Ensure WordPress permalinks are set to 'Post name' format",
      ],
    });
  } catch (error) {
    console.error("Auth debug error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Authentication debug test failed",
      },
      { status: 200 },
    );
  }
}
