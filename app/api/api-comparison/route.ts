import { NextResponse } from "next/server";
import { getWooCommerceConfig } from "../../../client/lib/woocommerce-config";

export async function GET() {
  try {
    const config = getWooCommerceConfig();
    const tests = [];

    // Test 1: Basic WordPress REST API (should work like other APIs)
    try {
      const wpResponse = await fetch(`${config.url}/wp-json/wp/v2/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${config.consumerKey}:${config.consumerSecret}`)}`,
          "Content-Type": "application/json",
        },
      });
      const wpText = await wpResponse.text();

      tests.push({
        name: "WordPress Users API (Basic Auth)",
        url: `${config.url}/wp-json/wp/v2/users/me`,
        status: wpResponse.status,
        success: wpResponse.ok,
        response_preview: wpText.substring(0, 200) + "...",
        comparison: "This uses same auth as other working APIs",
      });
    } catch (error) {
      tests.push({
        name: "WordPress Users API",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 2: WooCommerce API root (no specific endpoint)
    try {
      const wcRootResponse = await fetch(`${config.url}/wp-json/wc/v3`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${config.consumerKey}:${config.consumerSecret}`)}`,
          "Content-Type": "application/json",
        },
      });
      const wcRootText = await wcRootResponse.text();

      tests.push({
        name: "WooCommerce API Root",
        url: `${config.url}/wp-json/wc/v3`,
        status: wcRootResponse.status,
        success: wcRootResponse.ok,
        response_preview: wcRootText.substring(0, 200) + "...",
        comparison: "Tests if WooCommerce API itself is accessible",
      });
    } catch (error) {
      tests.push({
        name: "WooCommerce API Root",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 3: WooCommerce specific endpoint vs WordPress endpoint
    try {
      const wcProductsResponse = await fetch(
        `${config.url}/wp-json/wc/v3/products`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(`${config.consumerKey}:${config.consumerSecret}`)}`,
            "Content-Type": "application/json",
          },
        },
      );
      const wcProductsText = await wcProductsResponse.text();

      tests.push({
        name: "WooCommerce Products Endpoint",
        url: `${config.url}/wp-json/wc/v3/products`,
        status: wcProductsResponse.status,
        success: wcProductsResponse.ok,
        response_preview: wcProductsText.substring(0, 200) + "...",
        comparison: "This is where the 401 error occurs",
      });
    } catch (error) {
      tests.push({
        name: "WooCommerce Products Endpoint",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 4: Check if it's a capability/permission issue
    try {
      const capabilityResponse = await fetch(
        `${config.url}/wp-json/wp/v2/users/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(`${config.consumerKey}:${config.consumerSecret}`)}`,
            "Content-Type": "application/json",
          },
        },
      );
      const capabilityText = await capabilityResponse.text();

      tests.push({
        name: "User Capabilities Check",
        url: `${config.url}/wp-json/wp/v2/users/me`,
        status: capabilityResponse.status,
        success: capabilityResponse.ok,
        response_preview: capabilityText.substring(0, 200) + "...",
        comparison: "Shows what permissions the API key user has",
      });
    } catch (error) {
      tests.push({
        name: "User Capabilities Check",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return NextResponse.json({
      analysis: {
        working_apis: ["Metorik", "Crisp"],
        failing_api: "WooCommerce",
        hypothesis:
          "WooCommerce API has specific restrictions that other APIs don't have",
      },
      tests,
      recommendations: [
        "Check WooCommerce → Settings → Advanced → REST API settings",
        "Look for WooCommerce-specific security plugins or rules",
        "Verify the API key was created specifically for WooCommerce access",
        "Check if there's a separate WooCommerce API permission system",
      ],
    });
  } catch (error) {
    console.error("API comparison test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "API comparison test failed",
      },
      { status: 200 },
    );
  }
}
