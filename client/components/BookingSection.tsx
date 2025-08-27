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
  Shield,
  Phone
} from "lucide-react";

export default function BookingSection() {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  const pricePerPerson = 70;
  const tax = (guestCount * pricePerPerson * 0.07);
  const totalPrice = (guestCount * pricePerPerson) + tax;

  const handleReserveClick = () => {
    setShowGuestModal(true);
  };

  return (
    <section id="booking-section" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Reserve Your Underwater Adventure
            </h2>
            <p className="text-xl text-gray-600">
              Starting at $70 per person • Free cancellation up to 24 hours
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Booking Form */}
            <Card className="shadow-xl border-none">
              <CardContent className="p-8">
                
                {/* Pricing Header */}
                <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
                  <div className="text-4xl font-bold mb-2">${pricePerPerson}</div>
                  <div className="text-blue-100 mb-4">per person</div>
                  
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-blue-100 ml-2">4.9/5 (487 reviews)</span>
                  </div>
                  
                  <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                    ✓ No Booking Fees - Save $15+
                  </Badge>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Select Tour Date</div>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-12 text-left"
                  >
                    <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="text-gray-700">Choose Date & Time</span>
                  </Button>
                </div>

                {/* Guest Count */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Number of Guests</div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="h-10 w-10 p-0 border-gray-300 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900">{guestCount}</div>
                      <div className="text-sm text-gray-500">guests</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuestCount(Math.min(25, guestCount + 1))}
                      className="h-10 w-10 p-0 border-gray-300 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700">Subtotal ({guestCount} guests)</span>
                    <span className="font-semibold text-gray-900">${(guestCount * pricePerPerson).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Tax</span>
                    <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold text-blue-700 border-t border-blue-200 pt-4">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Reserve Button */}
                <Button
                  onClick={handleReserveClick}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg mb-4"
                >
                  Reserve Your Spot Now
                </Button>

                {/* Trust Indicators */}
                <div className="text-center border-t border-gray-200 pt-6">
                  <div className="flex justify-center gap-6 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Secure Booking
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Instant Confirmation
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Questions? Call{" "}
                    <button className="text-blue-600 hover:text-blue-700 font-semibold">
                      (305) 391-4040
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Why Book With Us */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Book With Key Largo Scuba Diving?</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">25+ Years Experience</h4>
                    <p className="text-gray-600">
                      We've been safely guiding guests to the Christ of the Abyss statue since 1998, 
                      with over 50,000 satisfied customers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">100% Safety Record</h4>
                    <p className="text-gray-600">
                      Perfect safety record with PADI certified dive masters and comprehensive 
                      insurance coverage for every guest.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best Value Guarantee</h4>
                    <p className="text-gray-600">
                      All equipment included, no hidden fees, and we'll match any competitor's 
                      price for the same experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Our Guarantees</h4>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Free cancellation up to 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Weather protection - reschedule or refund</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Satisfaction guarantee or your money back</span>
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
        selectedDate={selectedDate}
        onSubmit={(customerData) => {
          console.log('Booking submitted:', customerData);
          // Handle booking submission here
          setShowGuestModal(false);
        }}
        packageDetails={{
          name: "Christ Statue Snorkel Tour",
          price: pricePerPerson
        }}
      />
    </section>
  );
}
