import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../client/lib/woocommerce";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "100");

    // Add timeout protection to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API_TIMEOUT")), 3000); // 3 second timeout - faster than client
    });

    // Race between API call and timeout
    const categories = await Promise.race([
      wooCommerce.makeRequest(`/products/categories?per_page=${limit}`),
      timeoutPromise,
    ]);

    return NextResponse.json({
      success: true,
      count: categories.length,
      categories: categories,
      message: `Found ${categories.length} categories`,
    });
  } catch (error) {
    console.error("Categories API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // If timeout or slow API, return mock data for development
    if (
      errorMessage.includes("API_TIMEOUT") ||
      errorMessage.includes("Failed to fetch")
    ) {
      console.log("Using fallback mock categories due to slow API");

      const mockCategories = [
        {
          id: 33343,
          name: "PADI E-Learning",
          slug: "padi-e-learning",
          count: 6,
          parent: 0,
        },
        {
          id: 12345,
          name: "Rash Guards",
          slug: "rash-guards",
          count: 2,
          parent: 0,
        },
        {
          id: 67890,
          name: "Snorkeling Tours",
          slug: "snorkeling-tours",
          count: 3,
          parent: 0,
        },
        {
          id: 99998,
          name: "Scuba Gear",
          slug: "scuba-gear",
          count: 3,
          parent: 0,
        },
        // Empty categories for future expansion
        {
          id: 11111,
          name: "Diving Tours",
          slug: "diving-tours",
          count: 0,
          parent: 0,
        },
        { id: 22222, name: "Wetsuits", slug: "wetsuits", count: 0, parent: 0 },
        { id: 55555, name: "BCD Gear", slug: "bcd-gear", count: 0, parent: 0 },
        {
          id: 66666,
          name: "Dive Computers",
          slug: "dive-computers",
          count: 0,
          parent: 0,
        },
        {
          id: 77777,
          name: "Regulators",
          slug: "regulators",
          count: 0,
          parent: 0,
        },
      ];

      return NextResponse.json({
        success: true,
        count: mockCategories.length,
        categories: mockCategories,
        message: `Found ${mockCategories.length} categories (demo data - API slow)`,
        isDemoData: true,
      });
    }

    const isCorsError = errorMessage.includes("CORS Error");
    const is401Error =
      errorMessage.includes("401") || errorMessage.includes("cannot view");

    let message = "Failed to fetch categories";
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
