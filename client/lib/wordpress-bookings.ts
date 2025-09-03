const API = "/api/klsd";
const WP = process.env.NEXT_PUBLIC_WP_URL || "https://keylargoscubadiving.com";

type Persons = Record<string, number>;

export async function getAvailability(
  productId: number,
  startISODate: string,
  endISODate: string,
  persons: Persons = {},
  resourceId?: number,
) {
  const qs = new URLSearchParams({
    product_id: String(productId),
    start: startISODate,
    end: endISODate,
  });
  if (resourceId !== undefined && resourceId !== null)
    qs.set("resource_id", String(resourceId));
  if (persons && typeof persons === "object") {
    for (const [k, v] of Object.entries(persons)) {
      const qty = Number(v) || 0;
      if (qty > 0) qs.append(`persons[${k}]`, String(qty));
    }
  }
  try {
    const r = await fetch(`${API}/bookings/availability?${qs.toString()}`, {
      cache: "no-store",
    });
    if (!r.ok) throw new Error(`wp_availability_${r.status}`);
    const data = await r.json();
    return data;
  } catch (e) {
    const res = await fetch(
      `/api/wc-bookings?action=get_availability&product_id=${productId}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error("availability_failed");
    const j = await res.json();
    return j.data ?? j;
  }
}

function sumPersons(persons: Persons): number {
  return Object.values(persons || {}).reduce((a, b) => a + (b || 0), 0) || 1;
}

async function getLocalProduct(productId: number) {
  const r = await fetch(`/api/products/${productId}`, { cache: "no-store" });
  if (!r.ok) throw new Error("product_fetch_failed");
  const j = await r.json();
  return j.product || j;
}

function extractBookingBaseCost(
  meta: Array<{ key: string; value: any }>,
): number {
  if (!Array.isArray(meta)) return 0;
  const keys = [
    "_wc_booking_base_cost",
    "_wc_booking_cost",
    "_wc_booking_person_cost",
    "_wc_booking_cost_person",
  ];
  for (const k of keys) {
    const m = meta.find((x) => x && x.key === k);
    const val = m?.value;
    const num =
      typeof val === "string"
        ? parseFloat(val)
        : typeof val === "number"
          ? val
          : 0;
    if (!isNaN(num) && num > 0) return num;
  }
  // Some sites store booking settings in serialized arrays/objects
  for (const m of meta) {
    const v = m?.value;
    if (typeof v === "object" && v) {
      for (const prop of Object.keys(v)) {
        if (prop.includes("booking") && typeof (v as any)[prop] !== "object") {
          const num = parseFloat(String((v as any)[prop]));
          if (!isNaN(num) && num > 0) return num;
        }
      }
    }
  }
  return 0;
}

export async function getPrice(input: {
  product_id: number;
  start: string;
  end: string;
  persons: Persons;
  resource_id?: number;
}) {
  // First try WP calculator via proxy
  try {
    const r = await fetch(`${API}/bookings/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!r.ok) throw new Error(`wp_price_${r.status}`);
    const data = await r.json();
    if (data && typeof data.total === "number" && data.total > 0) return data;
    // If WP returns 0 (common when persons/date mismatch), fall through to fallback pricing
  } catch (_e) {
    // ignore and use fallback
  }

  // Fallback: derive from product meta (avoids browser CORS by using local API)
  try {
    const product = await getLocalProduct(input.product_id);
    const meta = Array.isArray(product?.meta_data) ? product.meta_data : [];
    const baseCost = extractBookingBaseCost(meta);
    const count = sumPersons(input.persons);
    const subtotal =
      (baseCost ||
        parseFloat(product?.price || product?.regular_price || "0") ||
        0) * count;
    return {
      currency: "USD",
      subtotal,
      tax: 0,
      total: subtotal,
      breakdown: [
        {
          label: baseCost
            ? "Booking base cost (fallback)"
            : "Base price fallback",
          amount: subtotal,
        },
      ],
    };
  } catch {
    const count = sumPersons(input.persons);
    return {
      currency: "USD",
      subtotal: 0 * count,
      tax: 0,
      total: 0,
      breakdown: [{ label: "Price unavailable", amount: 0 }],
    };
  }
}

export async function createBookingOrder(input: {
  product_id: number;
  start: string;
  end: string;
  persons: Persons;
  resource_id?: number;
  customer?: { email?: string; first_name?: string; last_name?: string };
}) {
  const r = await fetch(`${API}/bookings/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const out = await r.json();
  if (r.ok && out.pay_url) return out;
  if (r.status === 409 && out?.code === "SLOT_TAKEN")
    throw Object.assign(new Error("SLOT_TAKEN"), { code: "SLOT_TAKEN" });
  throw new Error(out?.message || "create_order_failed");
}
