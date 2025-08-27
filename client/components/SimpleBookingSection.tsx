import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import GuestDetailsModal from "@/components/GuestDetailsModal";
import {
  Calendar,
  Star,
  Plus,
  Minus,
  CheckCircle,
  Users,
  DollarSign,
} from "lucide-react";

export default function SimpleBookingSection() {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  const pricePerPerson = 70;
  const tax = guestCount * pricePerPerson * 0.07;
  const totalPrice = guestCount * pricePerPerson + tax;

  const handleReserveClick = () => {
    setShowGuestModal(true);
  };

  return (
    <section
      id="booking-section"
      className="py-16 bg-white border-t border-gray-100"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Experience
          </h2>
          <p className="text-gray-600">
            Starting at $70 per person • Free cancellation up to 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Date & Guest Selection */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Tour Details
              </h3>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Date
                </label>
                <Button
                  variant="outline"
                  className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-12"
                >
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="text-gray-700">Choose Date & Time</span>
                </Button>
              </div>

              {/* Guest Count */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Number of Guests
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="text-center">
                    <div className="font-bold text-3xl text-gray-900">
                      {guestCount}
                    </div>
                    <div className="text-sm text-gray-500">guests</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuestCount(Math.min(25, guestCount + 1))}
                    className="h-12 w-12 p-0 border-gray-300 rounded-full"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 rating from 487 reviews</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>No booking fees - save $15+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Pricing & Booking */}
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Pricing & Payment
              </h3>

              {/* Price Display */}
              <div className="text-center mb-6 p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  for {guestCount} {guestCount === 1 ? "guest" : "guests"}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>
                    ${pricePerPerson} × {guestCount} guests
                  </span>
                  <span>${(guestCount * pricePerPerson).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-gray-900 text-lg border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <Button
                onClick={handleReserveClick}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-lg rounded-lg mb-4"
              >
                Reserve Your Spot Now
              </Button>

              <div className="text-center text-sm text-gray-500">
                You won't be charged until your booking is confirmed
              </div>
            </CardContent>
          </Card>
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
