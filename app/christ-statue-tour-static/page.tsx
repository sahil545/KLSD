"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "../../client/components/Navigation";
import StaticHero from "../../client/components/StaticHero";
import SimpleBookingSection from "../../client/components/SimpleBookingSection";
import TourPageNavigation from "../../client/components/TourPageNavigation";
import ModernTourContent from "../../client/components/ModernTourContent";
import Footer from "../../client/components/Footer";

// Default fallback product data
const defaultProduct = {
  id: 34450,
  name: "Christ of the Abyss Snorkeling Tour",
  price: "89.00",
  categories: [{ id: 15, name: "Snorkeling Tours", slug: "snorkeling-tours" }],
  images: [
    {
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
      alt: "Underwater tour experience",
    },
  ],
  tourData: {
    duration: "4 Hours",
    groupSize: "25 Max",
    location: "Key Largo",
    difficulty: "All Levels",
    gearIncluded: true,
    highlights: [
      "Famous 9-foot bronze Christ statue in crystal-clear water",
      "All snorkeling equipment included",
      "PADI certified guides",
      "Small group experience",
    ],
  },
};

export default function ChristStatueTourStatic() {
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(defaultProduct);

  useEffect(() => {
    // Read product data from URL parameters (sent by WordPress)
    const urlProductData = {
      id: searchParams.get("product_id") || defaultProduct.id,
      name: searchParams.get("product_name") || defaultProduct.name,
      price: searchParams.get("product_price") || defaultProduct.price,
      categories: searchParams.get("product_categories")
        ? JSON.parse(decodeURIComponent(searchParams.get("product_categories")!))
        : defaultProduct.categories,
      images: searchParams.get("product_images")
        ? JSON.parse(decodeURIComponent(searchParams.get("product_images")!))
        : defaultProduct.images,
      tourData: {
        duration: searchParams.get("tour_duration") || defaultProduct.tourData.duration,
        groupSize: searchParams.get("tour_group_size") || defaultProduct.tourData.groupSize,
        location: searchParams.get("tour_location") || defaultProduct.tourData.location,
        difficulty: searchParams.get("tour_difficulty") || defaultProduct.tourData.difficulty,
        gearIncluded: searchParams.get("tour_gear_included") === "1" || defaultProduct.tourData.gearIncluded,
        highlights: searchParams.get("tour_highlights")
          ? JSON.parse(decodeURIComponent(searchParams.get("tour_highlights")!))
          : defaultProduct.tourData.highlights,
      },
    };

    console.log("Static page using product data:", urlProductData);
    setProductData(urlProductData);
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <TourPageNavigation />
      <main>
        <StaticHero product={productData} />
        <SimpleBookingSection />
        <ModernTourContent />
      </main>
      <Footer />
    </div>
  );
}
