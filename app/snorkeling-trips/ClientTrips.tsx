"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ClientTrips() {
  const [trips, setTrips] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(
          `/api/trips?categories=snorkeling-trips&limit=100`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        if (!ignore) setTrips(json.trips || []);
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Failed to load");
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  if (error)
    return (
      <div className="text-center text-gray-600">Unable to load trips.</div>
    );
  if (trips === null)
    return <div className="text-center text-gray-600">Loading trips…</div>;
  if (trips.length === 0)
    return (
      <div className="text-center text-gray-600">
        No snorkeling trips available right now.
      </div>
    );

  return (
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
  );
}
