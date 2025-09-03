import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../client/lib/woocommerce";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Caching and resilience controls
type CacheEntry = { trips: any[]; ts: number };
let CACHE: CacheEntry | null = null;
let FAIL_COUNT = 0;
let BREAKER_UNTIL = 0;

const STALE_MS = 1000 * 60 * 3; // serve cached for up to 3 minutes
const REVALIDATE_MS = 1000 * 60 * 10; // kick background refresh if older than this
const BREAKER_COOLDOWN_MS = 1000 * 60 * 2; // when tripped, use stale for this long

const WC_FIELDS = [
  "id",
  "name",
  "slug",
  "price",
  "permalink",
  "images",
  "categories",
  "average_rating",
  "rating_count",
  "meta_data",
  "type",
].join(",");

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const to = setTimeout(() => reject(new Error("API_TIMEOUT")), ms);
    p.then((v) => {
      clearTimeout(to);
      resolve(v);
    }).catch((e) => {
      clearTimeout(to);
      reject(e);
    });
  });
}

async function fetchWooProducts(pageSize: number): Promise<any[]> {
  const endpoints = [
    `/products?per_page=${pageSize}&status=publish&type=booking&_fields=${WC_FIELDS}`,
    `/products?per_page=${pageSize}&status=publish&type=bookable&_fields=${WC_FIELDS}`,
    `/products?per_page=${pageSize}&status=publish&_fields=${WC_FIELDS}`,
  ];

  const MAX_ATTEMPTS = 3;
  const TIMEOUT_MS = 7000;

  for (const ep of endpoints) {
    let attempt = 0;
    let delay = 250;
    while (attempt < MAX_ATTEMPTS) {
      attempt++;
      try {
        const res = await withTimeout(wooCommerce.makeRequest(ep), TIMEOUT_MS);
        if (Array.isArray(res)) return res;
        // Non-array unexpected, try next
        break;
      } catch (err: any) {
        if (attempt >= MAX_ATTEMPTS) {
          // Move to next endpoint
          break;
        }
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2;
      }
    }
  }
  throw new Error("UPSTREAM_TIMEOUT");
}

function toDisplayCategory(slug?: string): string {
  if (!slug) return "All";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function mapTrips(products: any[], slugs: string[], perPage: number) {
  const trips = products
    .filter((p: any) => {
      const type = (p.type || "").toLowerCase();
      const hasBookingMeta = (p.meta_data || []).some(
        (m: any) =>
          m.key === "_wc_booking_duration" ||
          m.key === "_wc_booking_has_persons",
      );
      const isBooking =
        type === "booking" || type === "bookable" || hasBookingMeta;
      if (!isBooking) return false;
      if (slugs.length === 0) return true;
      const catSlugs: string[] = (p.categories || [])
        .map((c: any) => c.slug?.toLowerCase())
        .filter(Boolean);
      return slugs.some((s) => catSlugs.includes(s.toLowerCase()));
    })
    .map((p: any) => {
      const img = (p.images && p.images[0]?.src) || "";
      const firstCatSlug = (p.categories && p.categories[0]?.slug) || "";
      const durationMeta = (p.meta_data || []).find(
        (m: any) => m.key === "_wc_booking_duration",
      )?.value;
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: parseFloat(p.price || p.regular_price || "0") || 0,
        image: img,
        categories: p.categories || [],
        categoryDisplay: toDisplayCategory(firstCatSlug),
        average_rating: parseFloat(p.average_rating || "0") || 0,
        rating_count: p.rating_count || 0,
        duration: durationMeta || null,
        permalink: p.permalink,
        short_description: p.short_description || "",
        description: p.description || "",
      };
    })
    .sort(
      (a: any, b: any) =>
        b.average_rating - a.average_rating || b.rating_count - a.rating_count,
    )
    .slice(0, perPage);
  return trips;
}

async function backgroundRefresh(
  pageSize: number,
  slugs: string[],
  perPage: number,
) {
  try {
    const products = await fetchWooProducts(pageSize);
    const trips = mapTrips(products, slugs, perPage);
    if (trips.length > 0) {
      CACHE = { trips, ts: Date.now() };
      FAIL_COUNT = 0;
    }
  } catch {}
}

export async function GET(req: NextRequest) {
  const now = Date.now();
  try {
    const { searchParams } = new URL(req.url);
    const perPage = parseInt(searchParams.get("limit") || "24", 10);
    const pageSize = Math.max(perPage, 100);
    const slugsParam = searchParams.get("categories");
    const slugs = slugsParam
      ? slugsParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    // Circuit breaker: if open, serve stale if available
    if (now < BREAKER_UNTIL && CACHE) {
      return NextResponse.json(
        {
          trips: CACHE.trips,
          count: CACHE.trips.length,
          cached: true,
          breaker: true,
        },
        { status: 200 },
      );
    }

    // Serve fresh-enough cache and refresh in background if needed
    if (CACHE) {
      const age = now - CACHE.ts;
      if (age < STALE_MS && CACHE.trips.length >= perPage) {
        if (age > REVALIDATE_MS) {
          // kick background refresh
          void backgroundRefresh(pageSize, slugs, perPage);
        }
        return NextResponse.json(
          { trips: CACHE.trips, count: CACHE.trips.length, cached: true },
          { status: 200 },
        );
      }
    }

    // Fetch upstream with retries/backoff
    const products = await fetchWooProducts(pageSize);
    const trips = mapTrips(products, slugs, perPage);

    // If empty and we have cache, serve cache
    if (trips.length === 0 && CACHE) {
      return NextResponse.json(
        { trips: CACHE.trips, count: CACHE.trips.length, cached: true },
        { status: 200 },
      );
    }

    if (trips.length > 0) {
      CACHE = { trips, ts: now };
      FAIL_COUNT = 0;
    }

    return NextResponse.json({ trips, count: trips.length }, { status: 200 });
  } catch (error: any) {
    FAIL_COUNT++;
    if (FAIL_COUNT >= 3) BREAKER_UNTIL = Date.now() + BREAKER_COOLDOWN_MS;
    if (CACHE) {
      return NextResponse.json(
        { trips: CACHE.trips, count: CACHE.trips.length, cached: true },
        { status: 200 },
      );
    }
    const message = error?.message || "Failed to load trips";
    return NextResponse.json(
      { error: message },
      { status: message.includes("TIMEOUT") ? 504 : 500 },
    );
  }
}
