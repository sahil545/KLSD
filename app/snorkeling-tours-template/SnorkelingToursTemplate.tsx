"use client";

import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Navigation from "../../client/components/Navigation";
import TourPageNavigation from "../../client/components/TourPageNavigation";
import Footer from "../../client/components/Footer";
import { tourData, type TourData } from "./data";

// Individual section components with unified architecture
import HeroSection from "./sections/HeroSection";
import BookingSection from "./sections/BookingSection";
import ExperienceSection from "./sections/ExperienceSection";
import JourneySection from "./sections/JourneySection";
import MarineLifeSection from "./sections/MarineLifeSection";
import TrustSection from "./sections/TrustSection";
import FinalCTASection from "./sections/FinalCTASection";

interface SnorkelingToursTemplateProps {
  // Optional props to override data for different tours
  data?: Partial<TourData>;
  loading?: boolean;
  productId?: number;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          There was an error loading the page. Please refresh to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

export default function SnorkelingToursTemplate({
  data: customData,
  loading: externalLoading = false,
  productId = 34592,
}: SnorkelingToursTemplateProps) {
  // Unified data state - no artificial loading since we have static data
  const [templateData, setTemplateData] = useState<TourData>(() => {
    // Merge custom data with default data if provided
    if (customData) {
      return {
        ...tourData,
        ...customData,
        // Deep merge nested objects
        details: { ...tourData.details, ...customData.details },
        pricing: { ...tourData.pricing, ...customData.pricing },
        experience: { ...tourData.experience, ...customData.experience },
        included: { ...tourData.included, ...customData.included },
        journey: { ...tourData.journey, ...customData.journey },
        marineLife: { ...tourData.marineLife, ...customData.marineLife },
        trustIndicators: {
          ...tourData.trustIndicators,
          ...customData.trustIndicators,
        },
        finalCTA: { ...tourData.finalCTA, ...customData.finalCTA },
      };
    }
    return tourData;
  });

  // Removed hydration check to prevent scroll glitches

  // Update data when customData changes
  useEffect(() => {
    if (customData) {
      setTemplateData({
        ...tourData,
        ...customData,
        // Deep merge nested objects
        details: { ...tourData.details, ...customData.details },
        pricing: { ...tourData.pricing, ...customData.pricing },
        experience: { ...tourData.experience, ...customData.experience },
        included: { ...tourData.included, ...customData.included },
        journey: { ...tourData.journey, ...customData.journey },
        marineLife: { ...tourData.marineLife, ...customData.marineLife },
        trustIndicators: {
          ...tourData.trustIndicators,
          ...customData.trustIndicators,
        },
        finalCTA: { ...tourData.finalCTA, ...customData.finalCTA },
      });
    }
  }, [customData]);

  // Only show loading if explicitly requested externally
  const showLoading = externalLoading;

  // Loading component
  if (showLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <TourPageNavigation />
        <main>
          {/* Loading skeleton that matches the layout */}
          <div className="animate-pulse">
            {/* Hero skeleton */}
            <div className="h-96 bg-gradient-to-br from-blue-500 to-blue-600"></div>
            {/* Content skeleton */}
            <div className="container mx-auto px-4 py-20">
              <div className="space-y-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-64 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Removed simplified version to prevent layout shifts

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen">
        <Navigation />
        <TourPageNavigation />
        <main>
          {/* All sections use the same data and loading pattern */}
          <HeroSection data={templateData} />
          <BookingSection data={templateData} productId={productId} />
          <ExperienceSection data={templateData} />
          <JourneySection data={templateData} />
          <MarineLifeSection data={templateData} />
          <TrustSection data={templateData} />
          <FinalCTASection data={templateData} />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
