import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../client/lib/woocommerce";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "50");

    // Try to get real WooCommerce data but timeout quickly to avoid client fetch timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API_TIMEOUT")), 3000); // 3 second timeout - faster than client
    });

    // Race between API call and timeout
    const products = await Promise.race([
      wooCommerce.makeRequest(`/products?per_page=${limit}`),
      timeoutPromise,
    ]);

    // Just use the main products without variations for simplicity
    console.log(
      `Successfully fetched ${products.length} products from WooCommerce API`,
    );

    return NextResponse.json({
      success: true,
      count: products.length,
      products: products,
      message: `Found ${products.length} products`,
    });
  } catch (error) {
    console.error("Products API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // If timeout or slow API, return mock data for development
    if (
      errorMessage.includes("API_TIMEOUT") ||
      errorMessage.includes("Failed to fetch")
    ) {
      console.log("Using fallback mock data due to slow API");

      const mockProducts = [
        // PADI E-Learning Products (6 items to match category count)
        {
          id: 1,
          name: "PADI Open Water E-Learning",
          price: "199.00",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [
            { id: 33343, name: "PADI E-Learning", slug: "padi-e-learning" },
          ],
          date_created: "2024-01-15T10:00:00",
          permalink: "https://keylargoscubadiving.com/product/padi-open-water",
          images: [],
          meta_data: [],
        },
        {
          id: 2,
          name: "PADI Advanced Open Water E-Learning",
          price: "299.00",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [
            { id: 33343, name: "PADI E-Learning", slug: "padi-e-learning" },
          ],
          date_created: "2024-01-14T10:00:00",
          permalink: "https://keylargoscubadiving.com/product/padi-advanced",
          images: [],
          meta_data: [],
        },
        {
          id: 3,
          name: "PADI Rescue Diver E-Learning",
          price: "349.00",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [
            { id: 33343, name: "PADI E-Learning", slug: "padi-e-learning" },
          ],
          date_created: "2024-01-13T10:00:00",
          permalink: "https://keylargoscubadiving.com/product/padi-rescue",
          images: [],
          meta_data: [],
        },
        {
          id: 4,
          name: "PADI Divemaster E-Learning",
          price: "449.00",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [
            { id: 33343, name: "PADI E-Learning", slug: "padi-e-learning" },
          ],
          date_created: "2024-01-12T10:00:00",
          permalink: "https://keylargoscubadiving.com/product/padi-divemaster",
          images: [],
          meta_data: [],
        },
        {
          id: 5,
          name: "PADI Nitrox E-Learning",
          price: "149.00",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [
            { id: 33343, name: "PADI E-Learning", slug: "padi-e-learning" },
          ],
          date_created: "2024-01-11T10:00:00",
          permalink: "https://keylargoscubadiving.com/product/padi-nitrox",
          images: [],
          meta_data: [],
        },
        {
          id: 6,
          name: "PADI Deep Diver E-Learning",
          price: "199.00",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [
            { id: 33343, name: "PADI E-Learning", slug: "padi-e-learning" },
          ],
          date_created: "2024-01-10T10:00:00",
          permalink: "https://keylargoscubadiving.com/product/padi-deep",
          images: [],
          meta_data: [],
        },

        // Rash Guards (2 items to match category count correctly)
        {
          id: 10,
          name: "UV Protection Rash Guard - Long Sleeve",
          price: "34.99",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [{ id: 12345, name: "Rash Guards", slug: "rash-guards" }],
          date_created: "2024-01-10T14:30:00",
          permalink: "https://keylargoscubadiving.com/product/rash-guard-long",
          images: [],
          meta_data: [],
        },
        {
          id: 11,
          name: "Women's Short Sleeve Rash Guard",
          price: "29.99",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [{ id: 12345, name: "Rash Guards", slug: "rash-guards" }],
          date_created: "2024-01-08T11:15:00",
          permalink:
            "https://keylargoscubadiving.com/product/womens-rash-guard",
          images: [],
          meta_data: [],
        },

        // Snorkeling Tours (3 items to match display)
        {
          id: 20,
          name: "Christ Statue Snorkeling Tour",
          price: "75.00",
          status: "publish",
          stock_status: "instock",
          type: "booking",
          categories: [
            { id: 67890, name: "Snorkeling Tours", slug: "snorkeling-tours" },
          ],
          date_created: "2024-01-05T09:15:00",
          permalink:
            "https://keylargoscubadiving.com/product/christ-statue-tour",
          images: [],
          meta_data: [],
        },
        {
          id: 21,
          name: "Molasses Reef Snorkeling Tour",
          price: "85.00",
          status: "publish",
          stock_status: "instock",
          type: "booking",
          categories: [
            { id: 67890, name: "Snorkeling Tours", slug: "snorkeling-tours" },
          ],
          date_created: "2024-01-04T09:15:00",
          permalink:
            "https://keylargoscubadiving.com/product/molasses-reef-tour",
          images: [],
          meta_data: [],
        },
        {
          id: 22,
          name: "Key Largo Reef Snorkeling Adventure",
          price: "65.00",
          status: "publish",
          stock_status: "instock",
          type: "booking",
          categories: [
            { id: 67890, name: "Snorkeling Tours", slug: "snorkeling-tours" },
          ],
          date_created: "2024-01-03T09:15:00",
          permalink: "https://keylargoscubadiving.com/product/key-largo-reef",
          images: [],
          meta_data: [],
        },

        // Scuba Gear Products (3 items to match category count)
        {
          id: 30,
          name: "Professional Diving Fins",
          price: "49.99",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [{ id: 99998, name: "Scuba Gear", slug: "scuba-gear" }],
          date_created: "2024-01-03T16:20:00",
          permalink: "https://keylargoscubadiving.com/product/diving-fins",
          images: [],
          meta_data: [],
        },
        {
          id: 31,
          name: "Scuba Diving Mask - Clear Vision",
          price: "89.99",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [{ id: 99998, name: "Scuba Gear", slug: "scuba-gear" }],
          date_created: "2024-01-02T13:45:00",
          permalink: "https://keylargoscubadiving.com/product/diving-mask",
          images: [],
          meta_data: [],
        },
        {
          id: 32,
          name: "Professional Snorkel Set",
          price: "69.99",
          status: "publish",
          stock_status: "instock",
          type: "simple",
          categories: [{ id: 99998, name: "Scuba Gear", slug: "scuba-gear" }],
          date_created: "2024-01-01T13:45:00",
          permalink: "https://keylargoscubadiving.com/product/snorkel-set",
          images: [],
          meta_data: [],
        },
      ];

      return NextResponse.json({
        success: true,
        count: mockProducts.length,
        products: mockProducts,
        message: `Found ${mockProducts.length} products (demo data - API slow)`,
        isDemoData: true,
      });
    }

    const isCorsError = errorMessage.includes("CORS Error");
    const is401Error =
      errorMessage.includes("401") || errorMessage.includes("cannot view");

    let message = "Failed to fetch products";
    if (isCorsError) {
      message =
        "CORS blocked during development - this will work when deployed";
    } else if (is401Error) {
      message = "WooCommerce API permissions error - check API key permissions";
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        isCorsError,
        is401Error,
        message,
      },
      { status: 200 }, // Always return 200 to avoid body stream issues
    );
  }
}
