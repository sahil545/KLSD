import { NextRequest, NextResponse } from "next/server";

const WP = process.env.NEXT_PUBLIC_WP_URL!;
const ALLOW = new Set([
  "bookings/availability",
  "bookings/price",
  "bookings/create-order",
  "bookings/person-types",
  "bookings/resources",
  "bookings/debug",
]);

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function handler(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const subpath = (params.path || []).join("/");
  if (!ALLOW.has(subpath)) {
    return NextResponse.json({ error: "not_allowed" }, { status: 404 });
  }

  const url = new URL(`${WP}/wp-json/klsd/v1/${subpath}`);
  if (req.method === "GET") {
    const inQs = new URL(req.url).searchParams;
    inQs.forEach((v, k) => url.searchParams.append(k, v));
  }

  const init: RequestInit = {
    method: req.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "KLSD-NextProxy/1.0 (+builder-integration)",
    },
    cache: "no-store",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    const body = await req.text();
    if (body) (init as any).body = body;
  }

  let r: Response;
  try {
    r = await fetch(url.toString(), init);
  } catch (e: any) {
    return NextResponse.json(
      { error: "upstream_fetch_failed", message: String(e), target: url.toString() },
      { status: 502 },
    );
  }

  const text = await r.text();
  return new NextResponse(text || JSON.stringify({ error: "empty_upstream" }), {
    status: r.status,
    headers: {
      "Content-Type": r.headers.get("Content-Type") || "application/json",
    },
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
