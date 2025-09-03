import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const productId =
      searchParams.get("product_id") || searchParams.get("productId");
    if (!productId) {
      return NextResponse.json(
        { error: "Missing product_id" },
        { status: 400 },
      );
    }

    const url = new URL("/api/wc-bookings", origin);
    url.searchParams.set("action", "get_availability");
    url.searchParams.set("product_id", productId);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch availability" },
      { status: 500 },
    );
  }
}
