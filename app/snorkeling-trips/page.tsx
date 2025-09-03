import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import ClientTrips from "./ClientTrips";

export const dynamic = "force-dynamic";

function absoluteUrl(path: string) {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const proto =
    h.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");
  return `${proto}://${host}${path}`;
}

async function getTrips() {
  try {
    const url = absoluteUrl(`/api/trips?categories=snorkeling-trips&limit=100`);
    if (!url.includes("//") || url.endsWith("//api"))
      throw new Error("BAD_URL");
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return { trips: [] };
    return res.json();
  } catch {
    return { trips: [] };
  }
}

export default async function SnorkelingTripsIndex() {
  const data = await getTrips();
  const trips: Array<any> = data.trips || [];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Snorkeling Trips
        </h1>
        <p className="text-gray-600">
          Browse our booking-enabled snorkeling tours
        </p>
      </div>

      {trips.length === 0 ? (
        // Client fallback will fetch and render
        <ClientTrips />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((t) => (
            <Link
              key={t.id}
              href={`/snorkeling-trips/${t.slug ?? t.permalink?.split("/").filter(Boolean).pop() ?? t.id}`}
              className="block rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-56 bg-gray-50">
                <Image
                  src={t.image || "/placeholder.svg"}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="text-white text-lg font-bold line-clamp-1">
                    {t.name}
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded">
                  ${t.price}
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600">
                  Rating:{" "}
                  {t.average_rating?.toFixed?.(1) ?? (t.average_rating || 0)} (
                  {t.rating_count || 0})
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
