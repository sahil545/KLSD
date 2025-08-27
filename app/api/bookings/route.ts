import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../client/lib/woocommerce";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "5");

    // Get recent orders and filter for booking-related products
    const orders = await wooCommerce.getRecentOrders(limit * 2); // Get more orders to filter for bookings

    // Filter orders that contain tour/booking products
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

    const bookings = orders
      .filter((order) => {
        // Check if any line item contains booking-related keywords
        return order.line_items?.some((item: { name?: string }) =>
          bookingKeywords.some((keyword) =>
            item.name?.toLowerCase().includes(keyword.toLowerCase()),
          ),
        );
      })
      .slice(0, limit) // Take only the requested number
      .map((order) => ({
        id: order.id,
        number: order.number,
        status: order.status,
        date_created: order.date_created,
        total: order.total,
        currency: order.currency,
        customer_name:
          `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.trim(),
        customer_email: order.billing?.email || "",
        booking_details:
          order.line_items?.map(
            (item: {
              name: string;
              quantity: number;
              total: string;
              meta_data?: Array<{ key: string; value: unknown }>;
            }) => {
              // Extract booking-specific metadata
              const bookingMeta =
                item.meta_data?.filter((meta: { key?: string }) =>
                  ["date", "time", "participants", "location", "notes"].some(
                    (field) => meta.key?.toLowerCase().includes(field),
                  ),
                ) || [];

              return {
                service_name: item.name,
                quantity: item.quantity,
                total: item.total,
                booking_metadata: bookingMeta.map(
                  (meta: { key: string; value: unknown }) => ({
                    key: meta.key,
                    value: meta.value,
                  }),
                ),
              };
            },
          ) || [],
        // Additional booking-specific fields
        booking_date:
          order.meta_data?.find(
            (meta: { key?: string }) =>
              meta.key?.toLowerCase().includes("booking_date") ||
              meta.key?.toLowerCase().includes("tour_date"),
          )?.value || null,
        participants:
          order.meta_data?.find(
            (meta: { key?: string }) =>
              meta.key?.toLowerCase().includes("participants") ||
              meta.key?.toLowerCase().includes("guests"),
          )?.value || null,
      }));

    return NextResponse.json({
      success: true,
      count: bookings.length,
      total_orders_checked: orders.length,
      bookings: bookings,
      message:
        bookings.length === 0
          ? "No recent bookings found. This filters orders for tour/diving services."
          : `Found ${bookings.length} recent bookings`,
    });
  } catch (error) {
    console.error("Bookings API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const isCorsError =
      errorMessage.includes("CORS Error") ||
      errorMessage.includes("Failed to fetch");
    const is401Error =
      errorMessage.includes("401") ||
      errorMessage.includes("cannot list resources");

    let message = "Failed to fetch bookings";
    if (isCorsError) {
      message =
        "CORS blocked during development - this will work when deployed";
    } else if (is401Error) {
      message =
        "WooCommerce API permissions error - check if the API key has 'read' permissions for orders";
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        isCorsError,
        is401Error,
        message,
      },
      { status: 200 },
    ); // Always return 200 to avoid body stream issues
  }
}
