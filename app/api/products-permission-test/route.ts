import { NextResponse } from "next/server";

export async function GET() {
  try {
    const consumerKey =
      process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY ||
      "ck_d0e9e6f20a1ecc40f797058c27e46aee21bf10b9";
    const consumerSecret =
      process.env.WOOCOMMERCE_SECRET ||
      "cs_3d3aa1c520bd3687d83ae3932b70683a7126af28";
    const baseUrl = "https://keylargoscubadiving.com";

    const tests = [];

    // Test products endpoint specifically
    const authString = `${consumerKey}:${consumerSecret}`;
    const base64Auth = Buffer.from(authString).toString("base64");

    // Test 1: GET products
    try {
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

      const responseText = await response.text();
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch {
        parsedResponse = responseText;
      }

      tests.push({
        endpoint: "GET /products",
        status: response.status,
        success: response.ok,
        response: parsedResponse,
        headers: Object.fromEntries(response.headers.entries()),
      });
    } catch (error) {
      tests.push({
        endpoint: "GET /products",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 2: GET orders (for comparison)
    try {
      const response = await fetch(
        `${baseUrl}/wp-json/wc/v3/orders?per_page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${base64Auth}`,
            "Content-Type": "application/json",
          },
        },
      );

      const responseText = await response.text();
      tests.push({
        endpoint: "GET /orders",
        status: response.status,
        success: response.ok,
        response_preview: responseText.substring(0, 100),
      });
    } catch (error) {
      tests.push({
        endpoint: "GET /orders",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 3: GET categories
    try {
      const response = await fetch(
        `${baseUrl}/wp-json/wc/v3/products/categories?per_page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${base64Auth}`,
            "Content-Type": "application/json",
          },
        },
      );

      const responseText = await response.text();
      tests.push({
        endpoint: "GET /categories",
        status: response.status,
        success: response.ok,
        response_preview: responseText.substring(0, 100),
      });
    } catch (error) {
      tests.push({
        endpoint: "GET /categories",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      credentials_source: {
        using_env_vars: !!(
          process.env.NEXT_PUBLIC_WOOCOMMERCE_KEY &&
          process.env.WOOCOMMERCE_SECRET
        ),
        key_preview: consumerKey.substring(0, 15) + "...",
        secret_preview: consumerSecret.substring(0, 15) + "...",
      },
      tests,
      diagnosis: {
        products_works:
          tests.find((t) => t.endpoint === "GET /products")?.success || false,
        orders_works:
          tests.find((t) => t.endpoint === "GET /orders")?.success || false,
        categories_works:
          tests.find((t) => t.endpoint === "GET /categories")?.success || false,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Permission test failed",
    });
  }
}
