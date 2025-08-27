import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../client/lib/woocommerce";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const TIMEOUT_MS = 30000; // 30 second timeout

  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q")?.toLowerCase().trim();
    const fastMode = searchParams.get("fast") === "true";

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        results: [],
        message: "Please enter at least 2 characters to search",
      });
    }

    let allOrders: Array<any> = [];
    let page = 1;
    const perPage = 100;
    let hasMoreOrders = true;
    const maxPages = fastMode ? 5 : 10;

    console.log(
      `Search: Starting ${fastMode ? "fast" : "comprehensive"} search for "${query}"`,
    );

    while (hasMoreOrders && page <= maxPages) {
      const elapsed = Date.now() - startTime;
      if (elapsed > TIMEOUT_MS - 5000) {
        console.log(
          `Search: Stopping due to timeout approach (${elapsed}ms elapsed)`,
        );
        break;
      }

      try {
        const pageOrders = await Promise.race([
          wooCommerce.makeRequest(
            `/orders?per_page=${perPage}&page=${page}&orderby=date&order=desc`,
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Page fetch timeout")), 10000),
          ),
        ]);

        if (pageOrders && pageOrders.length > 0) {
          allOrders = [...allOrders, ...pageOrders];

          const currentMatches = allOrders.filter((order) => {
            const customerName =
              `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.toLowerCase();
            const customerEmail = (order.billing?.email || "").toLowerCase();
            const orderNumber = (order.number || "").toLowerCase();
            return (
              customerName.includes(query) ||
              customerEmail.includes(query) ||
              orderNumber.includes(query)
            );
          });

          if (fastMode && currentMatches.length >= 5 && page >= 3) {
            console.log(
              `Search: Found ${currentMatches.length} matches in fast mode, stopping early`,
            );
            break;
          }

          hasMoreOrders = pageOrders.length === perPage;
          page++;
        } else {
          hasMoreOrders = false;
        }
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        page++;
        if (page > 3) break;
      }
    }

    console.log(
      `Search: Found ${allOrders.length} total orders to search through`,
    );

    const searchResults = allOrders.filter((order) => {
      const customerName =
        `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.toLowerCase();
      const customerEmail = (order.billing?.email || "").toLowerCase();
      const customerPhone = (order.billing?.phone || "").toLowerCase();
      const orderNumber = (order.number || "").toLowerCase();
      const orderId = (order.id || "").toString().toLowerCase();

      return (
        customerName.includes(query) ||
        customerEmail.includes(query) ||
        customerPhone.includes(query) ||
        orderNumber.includes(query) ||
        orderId.includes(query)
      );
    });

    const bookingKeywords = [
      "tour",
      "diving",
      "snorkeling",
      "booking",
      "scuba",
      "certification",
      "charter",
      "trip",
      "excursion",
    ];

    const bookingResults = searchResults.map((order) => {
      const isBooking = order.line_items?.some((item: { name?: string }) =>
        bookingKeywords.some((keyword) =>
          item.name?.toLowerCase().includes(keyword.toLowerCase()),
        ),
      );

      return {
        id: order.id,
        number: order.number,
        status: order.status,
        date_created: order.date_created,
        total: order.total,
        currency: order.currency,
        customer_name:
          `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.trim(),
        customer_email: order.billing?.email || "",
        customer_phone: order.billing?.phone || "",
        booking_details:
          order.line_items?.map((item: any) => ({
            service_name: item.name,
            quantity: item.quantity,
            total: item.total,
            booking_metadata:
              item.meta_data
                ?.filter((meta: { key?: string }) =>
                  ["date", "time", "participants", "location", "notes"].some(
                    (field) => meta.key?.toLowerCase().includes(field),
                  ),
                )
                .map((meta: { key?: string; value: unknown }) => ({
                  key: meta.key,
                  value: meta.value,
                })) || [],
          })) || [],
        is_booking: isBooking,
        search_relevance: calculateSearchRelevance(order, query),
      };
    });

    const sortedResults = bookingResults
      .sort((a, b) => {
        if (a.is_booking && !b.is_booking) return -1;
        if (!a.is_booking && b.is_booking) return 1;
        return b.search_relevance - a.search_relevance;
      })
      .slice(0, 20);

    return NextResponse.json({
      success: true,
      results: sortedResults,
      total_found: sortedResults.length,
      total_searched: allOrders.length,
      query,
      message:
        sortedResults.length === 0
          ? `No results found for "${query}" (searched ${allOrders.length} orders)`
          : `Found ${sortedResults.length} result${sortedResults.length === 1 ? "" : "s"} for "${query}" (searched ${allOrders.length} total orders)`,
    });
  } catch (error) {
    console.error("Search API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        results: [],
        message: "Failed to search bookings",
      },
      { status: 200 },
    );
  }
}

function calculateSearchRelevance(order: any, query: string): number {
  let score = 0;
  const lowerQuery = query.toLowerCase();

  const customerName =
    `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.toLowerCase();
  const customerEmail = (order.billing?.email || "").toLowerCase();
  const orderNumber = (order.number || "").toLowerCase();

  if (customerName === lowerQuery) score += 100;
  else if (customerName.startsWith(lowerQuery)) score += 50;
  else if (customerName.includes(lowerQuery)) score += 25;

  if (customerEmail === lowerQuery) score += 100;
  else if (customerEmail.startsWith(lowerQuery)) score += 50;
  else if (customerEmail.includes(lowerQuery)) score += 25;

  if (orderNumber === lowerQuery) score += 100;
  else if (orderNumber.includes(lowerQuery)) score += 30;

  return score;
}
