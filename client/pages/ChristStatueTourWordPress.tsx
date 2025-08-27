"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import WooCommerceHeroNoBooking from "@/components/WooCommerceHeroNoBookingWordPress";
import SimpleBookingSection from "@/components/SimpleBookingSectionWordPress";
import TourPageNavigation from "@/components/TourPageNavigation";
import ModernTourContent from "@/components/ModernTourContentWordPress";
import Footer from "@/components/Footer";
import {
  useWooCommerceProductEnhanced,
  useWordPressCartFunctions,
} from "@/hooks/useWooCommerceProduct-enhanced";

// WordPress-provided tour data interface
interface WordPressTourData {
  isWooCommerceProduct: boolean;
  isTourProduct: boolean;
  productId: number;
  productData: {
    id: number;
    name: string;
    price: number;
    regularPrice: number;
    salePrice: number | null;
    description: string;
    shortDescription: string;
    stockQuantity: number;
    inStock: boolean;
    onSale: boolean;
    featured: boolean;
    categories: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
    permalink: string;
    images: {
      main: string;
      gallery: string[];
    };
    attributes: Record<string, string[]>;
    tourData: {
      duration: string;
      groupSize: string;
      location: string;
      difficulty: string;
      gearIncluded: boolean;
      meetingPoint: string;
      included: string[];
      highlights: string[];
    };
  };
  woocommerce: {
    addToCartUrl: string;
    cartNonce: string;
    currencySymbol: string;
    taxRate: number;
  };
  siteData: {
    siteUrl: string;
    themePath: string;
    phone: string;
    businessName: string;
  };
}

declare global {
  interface Window {
    klsdTourDataone?: WordPressTourData;
    klsdAddToCart?: (
      productId: number,
      quantity: number,
      guestData: any[],
    ) => Promise<void>;
    klsdWooCommerce?: {
      addToCartUrl: string;
      cartNonce: string;
      currencySymbol: string;
      productId: number;
    };
  }
}

export default function ChristStatueTourWordPress() {
  const { product, loading, error, isWordPressMode } =
    useWooCommerceProductEnhanced();
  const { addToCart } = useWordPressCartFunctions();
  const [tourData, setTourData] = useState<WordPressTourData | null>(null);

  useEffect(() => {
    // Check for WordPress-provided data
    if (typeof window !== "undefined" && window.klsdTourDataone) {
      setTourData(window.klsdTourDataone as WordPressTourData);
    }
  }, []);

  // Loading state
  if (loading && !tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tour details...</p>
          {isWordPressMode && (
            <p className="text-sm text-gray-500">WordPress mode detected</p>
          )}
        </div>
      </div>
    );
  }

  // Error state (only for API errors, not WordPress mode)
  if (error && !tourData && !isWordPressMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Tour
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please refresh the page or try again later.
          </p>
        </div>
      </div>
    );
  }

  // Main render - prioritize WordPress data if available
  const activeProduct = tourData?.productData || product;
  const activeWooCommerceData = tourData?.woocommerce;
  const activeSiteData = tourData?.siteData;

  if (!activeProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tour Not Found
          </h2>
          <p className="text-gray-600">This page requires valid tour data.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (
    quantity: number = 1,
    guestData: any[] = [],
  ) => {
    try {
      if (isWordPressMode && tourData) {
        await addToCart(tourData.productId, quantity, guestData);
      } else if (product) {
        await addToCart(product.id, quantity, guestData);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation - only show if not in WordPress iframe */}
      {!isWordPressMode && <Navigation />}

      {/* Tour Page Navigation - show breadcrumb */}
      <TourPageNavigation
        // category={activeProduct.categories?.[0]?.name || "Tours"}
        // tourName={activeProduct.name}
      />

      <main>
        {/* Hero Section */}
        <WooCommerceHeroNoBooking product={activeProduct} tourData={tourData} />

        {/* Booking Section */}
        <SimpleBookingSection
          product={activeProduct}
          wooCommerceData={activeWooCommerceData}
          onAddToCart={handleAddToCart}
        />

        {/* Tour Content */}
        <ModernTourContent
          product={activeProduct}
          siteData={activeSiteData}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Footer - only show if not in WordPress iframe */}
      {!isWordPressMode && <Footer />}

      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
          Mode: {isWordPressMode ? "WordPress" : "Next.js"} | Product:{" "}
          {activeProduct.name} | Price: $
          {typeof activeProduct.price === "number"
            ? activeProduct.price
            : activeProduct.price}
        </div>
      )}
    </div>
  );
}

// Also export for use in WordPress template
export { ChristStatueTourWordPress };
