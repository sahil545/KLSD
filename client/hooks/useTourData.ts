/* eslint-disable @typescript-eslint/no-explicit-any */
// client/hooks/useTourData.ts
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-woocommerce-data";

// If you don't have a product type, infer it from your mock data:
type Product = (typeof MOCK_PRODUCTS)[number];

export interface TourData {
  /** Product resolved from slug/id/sku in the URL */
  product?: Product;
  /** Last segment of the path (often your product/tour slug) */
  slug: string;
  /** Optional date from ?date=YYYY-MM-DD */
  date?: string;
  /** Guests count from ?guests= */
  guests: number;
  /** Raw searchParams in case callers need to read more keys */
  searchParams: ReturnType<typeof useSearchParams>;
}

/**
 * Reads the current URL using Next.js App Router and resolves
 * the tour/product and common booking params.
 *
 * Works in Client Components only.
 */
export default function useTourData(): TourData {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // last non-empty segment as a "slug" guess
  const slug = pathname?.split("/").filter(Boolean).slice(-1)[0] ?? "";

  const idParam = searchParams.get("id");
  const skuParam = searchParams.get("sku");

  // Try resolving the product by id, slug, or sku
  let product: Product | undefined;
  if (idParam) {
    product = MOCK_PRODUCTS.find((p) => String((p as any).id) === idParam);
  }
  if (!product && slug) {
    product =
      MOCK_PRODUCTS.find((p) => (p as any).slug === slug) ??
      MOCK_PRODUCTS.find((p) => (p as any).handle === slug);
  }
  if (!product && skuParam) {
    product = MOCK_PRODUCTS.find((p) => (p as any).sku === skuParam);
  }

  const date = searchParams.get("date") || undefined;

  // Coerce guests to a safe positive integer, default 1
  const guestsRaw = searchParams.get("guests");
  const guestsParsed = guestsRaw ? Number(guestsRaw) : 1;
  const guests =
    Number.isFinite(guestsParsed) && guestsParsed > 0
      ? Math.floor(guestsParsed)
      : 1;

  return { product, slug, date, guests, searchParams };
}
