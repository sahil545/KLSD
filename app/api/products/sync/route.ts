import { NextResponse } from "next/server";
import { wooCommerce } from "../../../../client/lib/woocommerce";

export async function GET() {
  try {
    console.log(
      "🔍 Fetching REAL WooCommerce products with timeout protection...",
    );

    // Timeout protection
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("SYNC_TIMEOUT")), 15000),
    );

    // Fetch products
    const realProducts = await Promise.race([
      wooCommerce.makeRequest("/products?per_page=50"),
      timeoutPromise,
    ]);

    console.log(`✅ Found ${realProducts.length} real WooCommerce products`);

    // Fetch categories
    const realCategories = await Promise.race([
      wooCommerce.makeRequest("/products/categories?per_page=50"),
      timeoutPromise,
    ]);

    console.log(
      `✅ Found ${realCategories.length} real WooCommerce categories`,
    );

    // Transform data
    const syncData = {
      real_products: realProducts.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        status: product.status,
        type: product.type,
        price: product.price,
        permalink: product.permalink,
        categories:
          product.categories?.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
          })) || [],
      })),
      real_categories: realCategories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
        parent: cat.parent,
      })),
      sync_info: {
        total_products: realProducts.length,
        total_categories: realCategories.length,
        message:
          "These are your ACTUAL WooCommerce products and their real IDs",
      },
    };

    return NextResponse.json({
      success: true,
      data: syncData,
      message: `Successfully synced ${realProducts.length} real products and ${realCategories.length} categories`,
    });
  } catch (error) {
    console.error("Sync API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("SYNC_TIMEOUT")) {
      console.log("🔄 Sync timeout - providing fallback mock data");

      const mockSyncData = {
        real_products: [
          {
            id: 1234,
            name: "Key Largo Christ Statue Snorkeling Tour",
            slug: "key-largo-christ-statue-snorkeling-tour",
            status: "publish",
            type: "simple",
            price: "99.00",
            permalink:
              "https://keylargoscubadiving.com/product/key-largo-christ-statue-snorkeling-tour/",
            categories: [
              { id: 123, name: "Snorkeling Tours", slug: "snorkeling-tours" },
              { id: 456, name: "Tours & Trips", slug: "tours-trips" },
            ],
          },
        ],
        real_categories: [
          {
            id: 123,
            name: "Snorkeling Tours",
            slug: "snorkeling-tours",
            count: 1,
            parent: 0,
          },
          {
            id: 456,
            name: "Tours & Trips",
            slug: "tours-trips",
            count: 1,
            parent: 0,
          },
        ],
        sync_info: {
          total_products: 1,
          total_categories: 2,
          message: "Timeout fallback data - API was slow to respond",
        },
      };

      return NextResponse.json({
        success: true,
        data: mockSyncData,
        message: "Sync timeout - using fallback data",
        isDemoData: true,
        timeoutOccurred: true,
      });
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
      message: "Failed to sync with WooCommerce. Check API credentials.",
      troubleshooting: {
        check_api_keys: "Verify WooCommerce API keys in .env.local",
        check_permissions: "Ensure API keys have read permissions for products",
        check_url: "Verify WORDPRESS_URL is correct",
        timeout_help:
          "If seeing timeout errors, check WooCommerce server performance",
      },
    });
  }
}
