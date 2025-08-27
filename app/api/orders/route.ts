import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../client/lib/woocommerce";

// Force dynamic API route
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get("limit");
    const limit =
      limitParam && !isNaN(Number(limitParam)) ? Number(limitParam) : 5;

    const orders = await wooCommerce.getRecentOrders(limit);

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders: orders.map((order) => ({
        id: order.id,
        number: order.number,
        status: order.status,
        date_created: order.date_created,
        total: order.total,
        currency: order.currency,
        customer_name:
          `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.trim(),
        customer_email: order.billing?.email || "",
        line_items:
          order.line_items?.map(
            (item: { name: string; quantity: number; total: string }) => ({
              name: item.name,
              quantity: item.quantity,
              total: item.total,
            }),
          ) || [],
      })),
    });
  } catch (error) {
    console.error("Orders API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const isCorsError =
      errorMessage.includes("CORS Error") ||
      errorMessage.includes("Failed to fetch");
    const is401Error =
      errorMessage.includes("401") ||
      errorMessage.includes("cannot list resources");

    let message = "Failed to fetch orders";
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
    );
  }
}
