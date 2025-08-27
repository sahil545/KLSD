import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_PRODUCTS } from "@/lib/mock-woocommerce-data";
import {
  Star,
  Users,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

function ProductDemo() {
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);
  const [bookingData, setBookingData] = useState({
    date: "",
    guests: 2,
    leadGuest: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Booking submitted for ${selectedProduct.name}!\n\nIn production, this would:\n• Add to WooCommerce cart\n• Process payment\n• Send confirmation email\n• Update inventory`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 WooCommerce Integration Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This demonstrates how your actual WooCommerce products will display
            in the new Builder.io frontend. All data shown represents real
            products from your store.
          </p>

          {/* Link to actual tour template */}
          <div className="mt-6">
            <Link
              href="/christ-statue-tour"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🏊 View Tour Template (Used for All Tours)
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              This same conversion-optimized template is used for all tour
              products
            </p>
          </div>
        </div>

        {/* Product Selection */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Select a Product to Preview:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MOCK_PRODUCTS.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedProduct.id === product.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium text-gray-900 text-left">
                  {product.name}
                </p>
                <p className="text-sm text-blue-600 font-semibold text-left">
                  ${product.price}
                </p>
              </button>
            ))}
          </div>
        </Card>

        {/* Product Page Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Details */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">⭐ Best Seller</Badge>
                  <Badge variant="outline">🏆 #1 Rated</Badge>
                  <Badge variant="default">✓ Instant Confirmation</Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedProduct.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-600">(487 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="mb-6">
                <img
                  src={selectedProduct.images[0].src}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-xs text-gray-600">4 Hours</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-medium">Group Size</p>
                  <p className="text-xs text-gray-600">25 Max</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-xs text-gray-600">Key Largo</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Star className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-sm font-medium">Difficulty</p>
                  <p className="text-xs text-gray-600">All Levels</p>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Professional guide and safety briefing",
                    "All snorkeling equipment provided",
                    "Underwater photography spots",
                    "Transportation to/from dive sites",
                    "Light refreshments and water",
                    "Small group experience (max 25)",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div>
            <Card className="p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  ${selectedProduct.price}
                </div>
                <div className="text-sm text-gray-600">per person</div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setBookingData({
                          ...bookingData,
                          guests: Math.max(1, bookingData.guests - 1),
                        })
                      }
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-medium">
                      {bookingData.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setBookingData({
                          ...bookingData,
                          guests: Math.min(25, bookingData.guests + 1),
                        })
                      }
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Lead Guest Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Guest Information
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={bookingData.leadGuest.name}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          leadGuest: {
                            ...bookingData.leadGuest,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={bookingData.leadGuest.email}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          leadGuest: {
                            ...bookingData.leadGuest,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={bookingData.leadGuest.phone}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          leadGuest: {
                            ...bookingData.leadGuest,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      $
                      {(
                        parseFloat(selectedProduct.price) * bookingData.guests
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <Button type="submit" className="w-full py-3 text-lg">
                  🏊 Book This Adventure
                </Button>
              </form>

              {/* Trust Signals */}
              <div className="text-center mt-4 pt-4 border-t">
                <div className="flex justify-center gap-4 text-sm text-gray-600">
                  <span>🛡️ Fully Insured</span>
                  <span>💳 Secure Payment</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Free cancellation up to 24 hours before tour
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Integration Info */}
        <Card className="p-6 mt-8 bg-green-50 border-green-200">
          <h2 className="text-lg font-semibold text-green-900 mb-3">
            ✅ How This Works in Production
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-800">
            <div>
              <h3 className="font-semibold mb-2">Data Flow:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Product data pulled from WooCommerce API</li>
                <li>• Inventory checked in real-time</li>
                <li>• Bookings create WooCommerce orders</li>
                <li>• Payment processed through existing gateways</li>
                <li>• Email confirmations sent automatically</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">SEO & URLs:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Same URLs as current site</li>
                <li>• No loss of search rankings</li>
                <li>• Faster loading = better SEO</li>
                <li>• Mobile-optimized = higher rankings</li>
                <li>• Rich snippets and structured data</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProductDemo;
