import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

// WooCommerce data interface
interface WooCommerceTourData {
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
    categories: string[];
    permalink: string;
    images: {
      main: string;
      gallery: string[];
    };
    attributes: Record<string, string[]>;
    meta: {
      duration: string;
      groupSize: string;
      difficulty: string;
      location: string;
      meetingPoint: string;
      included: string[];
      whatToBring: string[];
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
    klsdTourDatatwo?: WooCommerceTourData | null;
  }
}

export default function WooCommerceTour() {
  const [tourData, setTourData] = useState<WooCommerceTourData | null>(null);
  const [guests, setGuests] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get WooCommerce data from WordPress
    if (window.klsdTourDatatwo) {
      setTourData(window.klsdTourDatatwo as WooCommerceTourData);
      setIsLoading(false);
    } else {
      // Fallback timeout
      setTimeout(() => {
        if (window.klsdTourDatatwo) {
          setTourData(window.klsdTourDatatwo as WooCommerceTourData);
        }
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tourData || !tourData.isWooCommerceProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            This page requires a valid WooCommerce product.
          </p>
        </div>
      </div>
    );
  }

  const { productData, woocommerce, siteData } = tourData;
  const subtotal = productData.price * guests;
  const tax = subtotal * woocommerce.taxRate;
  const total = subtotal + tax;

  const handleAddToCart = () => {
    // Create form data for WooCommerce
    const formData = new FormData();
    formData.append("add-to-cart", productData.id.toString());
    formData.append("quantity", guests.toString());
    formData.append("woocommerce-cart-nonce", woocommerce.cartNonce);

    // Submit to WooCommerce
    fetch(window.location.href, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        // Redirect to cart or show success message
        window.location.href = woocommerce.addToCartUrl;
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Error adding to cart. Please try again.");
      });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>
            <span>→</span>
            <a href="/tours" className="hover:text-blue-600">
              Tours
            </a>
            <span>→</span>
            <span className="text-gray-900">{productData.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(30, 64, 175, 0.4), rgba(8, 145, 178, 0.4)), url('${productData.images.main || "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200"}')`,
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-blue-50 bg-opacity-5 rounded-full -top-48 -right-48"></div>
          <div className="absolute w-64 h-64 bg-red-500 bg-opacity-10 rounded-full -bottom-32 -left-32"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Hero Content */}
            <div>
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-yellow-400 bg-opacity-20 text-yellow-100 border border-yellow-400 border-opacity-30 rounded-full text-sm font-medium">
                  ⭐ Best of Florida Keys
                </span>
                <span className="px-3 py-1 bg-blue-50 bg-opacity-20 text-blue-100 border border-blue-50 border-opacity-30 rounded-full text-sm font-medium">
                  🏆 #1 Rated Tour
                </span>
                <span className="px-3 py-1 bg-green-400 bg-opacity-20 text-green-100 border border-green-400 border-opacity-30 rounded-full text-sm font-medium">
                  ✓ No Booking Fees
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                <span className="text-lg font-bold">4.9/5</span>
                <span className="text-sm opacity-80">(487 reviews)</span>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-8">
                <div className="text-center p-5 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl mb-2 text-orange-400">⏰</div>
                  <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                    Duration
                  </div>
                  <div className="text-base font-bold">
                    {productData.meta.duration}
                  </div>
                </div>
                <div className="text-center p-5 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl mb-2 text-orange-400">👥</div>
                  <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                    Group Size
                  </div>
                  <div className="text-base font-bold">
                    {productData.meta.groupSize}
                  </div>
                </div>
                <div className="text-center p-5 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl mb-2 text-orange-400">📍</div>
                  <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                    Location
                  </div>
                  <div className="text-base font-bold">
                    {productData.meta.location}
                  </div>
                </div>
                <div className="text-center p-5 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl mb-2 text-orange-400">🛡️</div>
                  <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                    Difficulty
                  </div>
                  <div className="text-base font-bold">
                    {productData.meta.difficulty}
                  </div>
                </div>
              </div>

              {/* Product Highlights */}
              <div className="my-8">
                {productData.meta.included.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 mb-4 text-base leading-relaxed"
                  >
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-blue-50 opacity-90">{item}</span>
                  </div>
                ))}
              </div>

              {/* Urgency Message */}
              <div className="flex items-center gap-4 p-5 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-xl mt-8">
                <div className="text-2xl">⚠️</div>
                <div>
                  <div className="text-base font-bold text-yellow-200">
                    Limited Availability
                  </div>
                  <div className="text-sm opacity-90">
                    Most tours sell out within 24 hours. Only{" "}
                    {productData.stockQuantity} spots per departure.
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="sticky top-24 bg-white rounded-xl shadow-2xl text-gray-900">
              {/* Price Section */}
              <div className="p-6 border-b border-gray-200 text-center">
                <div className="flex items-start justify-center gap-2 mb-4">
                  <span className="text-2xl font-semibold text-blue-700 mt-2">
                    {woocommerce.currencySymbol}
                  </span>
                  <span className="text-6xl font-bold text-blue-700 leading-none">
                    {productData.price}
                  </span>
                  <div className="ml-2 mt-3 text-sm text-gray-600 leading-tight">
                    <div>+ tax</div>
                    <div>per person</div>
                  </div>
                </div>

                {productData.onSale && (
                  <div className="text-lg text-gray-500 line-through mb-2">
                    {woocommerce.currencySymbol}
                    {productData.regularPrice}
                  </div>
                )}

                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  ✓ NO Booking Fees (Save $15+ vs competitors)
                </div>

                {/* Included Items */}
                <div className="text-left mb-4">
                  {productData.meta.included.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs text-gray-700 mb-2"
                    >
                      <span className="text-green-600 font-bold">✓</span>
                      <span>
                        {item.length > 35
                          ? item.substring(0, 35) + "..."
                          : item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div className="p-6">
                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Select Tour Date
                  </label>
                  <button className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-left hover:border-blue-500 transition-colors">
                    📅 Choose Date & Time
                  </button>
                </div>

                {/* Guest Count */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-12 h-12 bg-gray-50 hover:bg-gray-100 text-lg font-semibold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center py-3 font-semibold bg-white">
                      {guests} Adults
                    </span>
                    <button
                      onClick={() =>
                        setGuests(
                          Math.min(productData.stockQuantity, guests + 1),
                        )
                      }
                      className="w-12 h-12 bg-gray-50 hover:bg-gray-100 text-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Subtotal ({guests} adults)</span>
                    <span>
                      {woocommerce.currencySymbol}
                      {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Tax</span>
                    <span>
                      {woocommerce.currencySymbol}
                      {tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-blue-700 text-2xl">
                      {woocommerce.currencySymbol}
                      {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors mb-4"
                >
                  Reserve Your Spot Now
                </button>

                {/* Trust Signals */}
                <div className="flex justify-center gap-6 my-5 py-4 border-t border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="text-base">🛡️</span>
                    <span>Secure Booking</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="text-base">✓</span>
                    <span>Instant Confirmation</span>
                  </div>
                </div>

                {/* Phone CTA */}
                <div className="text-center mt-5 pt-5 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Prefer to book by phone?
                  </p>
                  <a
                    href={`tel:${siteData.phone.replace(/[^\d]/g, "")}`}
                    className="w-full inline-block px-4 py-3 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-colors text-center"
                  >
                    📞 Call {siteData.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Details Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
            <div>
              <h2 className="text-4xl font-bold mb-6">Tour Details</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: productData.description }}
              />

              {productData.meta.included.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold mt-8 mb-4">
                    What's Included
                  </h3>
                  <ul className="list-none pl-0">
                    {productData.meta.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 mb-3">
                        <span className="text-green-600 font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">Important Information</h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold mb-3">Meeting Point</h4>
                <p className="mb-4">{productData.meta.meetingPoint}</p>

                {productData.meta.whatToBring.length > 0 && (
                  <>
                    <h4 className="font-bold mb-3">What to Bring</h4>
                    <ul className="mb-4">
                      {productData.meta.whatToBring.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                <h4 className="font-bold mb-3">Cancellation Policy</h4>
                <p>
                  Free cancellation up to 24 hours before tour departure.
                  Weather cancellations receive full refund or reschedule
                  option.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogSection />
      <Footer />
    </div>
  );
}
