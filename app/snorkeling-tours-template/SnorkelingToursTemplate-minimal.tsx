"use client";

import { useState, useEffect } from "react";
import { tourData, type TourData } from "./data";

interface SnorkelingToursTemplateProps {
  data?: Partial<TourData>;
  loading?: boolean;
  productId?: number;
}

export default function SnorkelingToursTemplateMinimal({
  data: customData,
  loading: externalLoading = false,
  productId = 34592
}: SnorkelingToursTemplateProps) {
  const [templateData, setTemplateData] = useState<TourData>(tourData);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Minimal Hero Section */}
      <section className="relative text-white bg-gradient-to-br from-blue-500 to-blue-600 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {templateData.name}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {templateData.description}
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-sm">Duration</div>
              <div className="font-semibold">{templateData.details.duration}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-sm">Group Size</div>
              <div className="font-semibold">{templateData.details.groupSize}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-sm">Price</div>
              <div className="font-semibold">${templateData.pricing.basePrice}</div>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-xl">
            Book Your Adventure Now
          </button>
        </div>
      </section>

      {/* Simple Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {templateData.experience.title}
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            {templateData.experience.description}
          </p>
        </div>
      </section>
    </div>
  );
}
