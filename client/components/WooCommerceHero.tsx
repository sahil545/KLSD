import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWooCommerceProduct } from "@/hooks/useWooCommerceProduct";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import GuestDetailsModal from "@/components/GuestDetailsModal";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Shield,
  Plus,
  Minus,
  Phone,
} from "lucide-react";

export default function WooCommerceHero() {
  const { product, loading, error } = useWooCommerceProduct();
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  // Use dynamic pricing from product data
  const pricePerPerson = product ? parseFloat(product.price) : 70;
  const tax = guestCount * pricePerPerson * 0.07;
  const totalPrice = guestCount * pricePerPerson + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-deep via-ocean-medium to-ocean-light flex items-center justify-center">
        <div className="text-white text-xl">Loading tour details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-deep via-ocean-medium to-ocean-light flex items-center justify-center">
        <div className="text-white text-xl">Error loading tour details</div>
      </div>
    );
  }

  const handleReserveClick = () => {
    setShowGuestModal(true);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage:
            'url("https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200")',
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-foam/5 rounded-full -top-48 -right-48"></div>
        <div className="absolute w-64 h-64 bg-klsd-red/10 rounded-full -bottom-32 -left-32"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Breadcrumb */}
            <nav className="text-sm text-foam/70 mb-4">
              <span>Snorkeling Tours</span> /{" "}
              <span className="text-foam">Christ of the Abyss</span>
            </nav>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-klsd-red/20 text-klsd-red border-klsd-red/30 hover:bg-klsd-red/30">
                ⭐ Best of Florida Keys
              </Badge>
              <Badge className="bg-foam/20 text-foam border-foam/30 hover:bg-foam/30">
                🏆 #1 Rated Tour
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                ✓ No Booking Fees
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {product.name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-foam/90">4.9/5</span>
              <span className="text-foam/70">(487 reviews)</span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center bg-foam/10 rounded-lg p-3 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-sm text-foam/90">Duration</div>
                <div className="font-semibold">{product.tourData.duration}</div>
              </div>
              <div className="text-center bg-foam/10 rounded-lg p-3 backdrop-blur-sm">
                <Users className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-sm text-foam/90">Group Size</div>
                <div className="font-semibold">
                  {product.tourData.groupSize}
                </div>
              </div>
              <div className="text-center bg-foam/10 rounded-lg p-3 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-sm text-foam/90">Location</div>
                <div className="font-semibold">{product.tourData.location}</div>
              </div>
              <div className="text-center bg-foam/10 rounded-lg p-3 backdrop-blur-sm">
                <Shield className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-sm text-foam/90">Gear</div>
                <div className="font-semibold">
                  {product.tourData.gearIncluded ? "Included" : "Not Included"}
                </div>
              </div>
            </div>

            {/* Key Selling Points */}
            <div className="space-y-3 mb-8">
              {product.tourData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-coral flex-shrink-0" />
                  <span className="text-foam/90">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Urgency Message */}
            <div className="mb-6 text-sm space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-300" />
                <span className="font-semibold text-white">Trips Sell Out</span>
              </div>
              <div className="text-foam/80 ml-6">
                Book in advance to secure your spots
              </div>
              <div className="text-green-300 ml-6">
                ✓ Easy Cancellation & Reschedule
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="flex justify-center lg:justify-end items-start">
            <div className="w-full max-w-xs lg:max-w-sm">
              {/* Compact Booking Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Top Section - Pricing */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white text-center">
                  <div className="text-3xl font-bold mb-1">
                    ${pricePerPerson}
                  </div>
                  <div className="text-blue-100 text-sm mb-3">per person</div>

                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-xs text-blue-100 ml-1">4.9</span>
                  </div>

                  <Badge className="bg-green-500/20 text-green-200 border-green-400/30 text-xs">
                    No Booking Fees
                  </Badge>
                </div>

                {/* Booking Controls */}
                <div className="p-4">
                  {/* Date Selection */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Select Tour Date
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-200 hover:border-blue-300 h-10 text-sm"
                    >
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-gray-700">Choose Date & Time</span>
                    </Button>
                  </div>

                  {/* Guest Count */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setGuestCount(Math.max(1, guestCount - 1))
                        }
                        className="h-8 w-8 p-0 border-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="text-center">
                        <div className="font-semibold text-lg text-gray-900">
                          {guestCount}
                        </div>
                        <div className="text-xs text-gray-500">guests</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setGuestCount(Math.min(25, guestCount + 1))
                        }
                        className="h-8 w-8 p-0 border-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        ${(guestCount * pricePerPerson).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700">Tax</span>
                      <span className="font-semibold text-gray-900">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold text-blue-700 border-t border-blue-200 pt-3">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Reserve Button */}
                  <Button
                    onClick={handleReserveClick}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md mb-3"
                  >
                    Reserve Now
                  </Button>

                  {/* Key Features */}
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>All equipment included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>PADI certified guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>Free cancellation</span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="text-center border-t border-gray-200 pt-3 mt-3">
                    <div className="text-xs text-gray-500">
                      Questions?{" "}
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        (305) 391-4040
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        guestCount={guestCount}
        totalPrice={Number.isFinite(totalPrice) ? totalPrice : 0}
        selectedDate={selectedDate}
      />
    </section>
  );
}
