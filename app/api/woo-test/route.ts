import { NextResponse } from "next/server";
import { getWooCommerceConfig } from "../../../client/lib/woocommerce-config";

export async function GET() {
  try {
    const config = getWooCommerceConfig();
    const auth = btoa(`${config.consumerKey}:${config.consumerSecret}`);

    // Test multiple endpoints and methods
    const tests = [];

    // Test 1: System Status (usually requires less permissions)
    try {
      const systemUrl = `${config.url}/wp-json/wc/v3/system_status`;
      const systemResponse = await fetch(systemUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      });

      const systemData = await systemResponse.text();
      tests.push({
        name: "System Status",
        url: systemUrl,
        status: systemResponse.status,
        success: systemResponse.ok,
        data: systemData.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        name: "System Status",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 2: Data endpoint (sometimes works when products don't)
    try {
      const dataUrl = `${config.url}/wp-json/wc/v3/data`;
      const dataResponse = await fetch(dataUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      });

      const dataData = await dataResponse.text();
      tests.push({
        name: "Data Endpoint",
        url: dataUrl,
        status: dataResponse.status,
        success: dataResponse.ok,
        data: dataData.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        name: "Data Endpoint",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 3: Products with URL parameters (alternative auth method)
    try {
      const productsUrlAuth = `${config.url}/wp-json/wc/v3/products?consumer_key=${encodeURIComponent(config.consumerKey)}&consumer_secret=${encodeURIComponent(config.consumerSecret)}&per_page=1`;
      const productsUrlResponse = await fetch(productsUrlAuth, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const productsUrlData = await productsUrlResponse.text();
      tests.push({
        name: "Products (URL Auth)",
        url: productsUrlAuth.replace(config.consumerSecret, "cs_***"),
        status: productsUrlResponse.status,
        success: productsUrlResponse.ok,
        data: productsUrlData.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        name: "Products (URL Auth)",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 4: Single product by ID (sometimes works when listing doesn't)
    try {
      const singleProductUrl = `${config.url}/wp-json/wc/v3/products/1`;
      const singleResponse = await fetch(singleProductUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      });

      const singleData = await singleResponse.text();
      tests.push({
        name: "Single Product",
        url: singleProductUrl,
        status: singleResponse.status,
        success: singleResponse.ok,
        data: singleData.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        name: "Single Product",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Test 5: Original products call
    try {
      const productsUrl = `${config.url}/wp-json/wc/v3/products?per_page=1`;
      const productsResponse = await fetch(productsUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      });

      const productsData = await productsResponse.text();
      tests.push({
        name: "Products List",
        url: productsUrl,
        status: productsResponse.status,
        success: productsResponse.ok,
        data: productsData.substring(0, 200) + "...",
      });
    } catch (error) {
      tests.push({
        name: "Products List",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    return NextResponse.json({
      config: {
        url: config.url,
        keyLength: config.consumerKey?.length || 0,
        secretLength: config.consumerSecret?.length || 0,
        keyPreview: config.consumerKey?.substring(0, 15) + "...",
        secretPreview: config.consumerSecret?.substring(0, 15) + "...",
      },
      tests: tests,
      summary: {
        totalTests: tests.length,
        successful: tests.filter((t) => t.success).length,
        failed: tests.filter((t) => !t.success && !t.error).length,
        errors: tests.filter((t) => t.error).length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        type: error instanceof TypeError ? "Network/CORS Error" : "Other Error",
      },
      { status: 500 },
    );
  }
}
