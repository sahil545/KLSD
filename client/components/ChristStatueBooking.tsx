import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, Phone, Check, Star } from "lucide-react";

export default function ChristStatueBooking() {
  const [guestCount, setGuestCount] = useState(2);
  
  const basePrice = 89;
  const total = basePrice * guestCount;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Reserve Your Spot
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Book Your Christ Statue Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for an unforgettable snorkeling experience at Key Largo's most sacred underwater site.
          </p>
        </div>

        {/* Main Booking Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left Side - Tour Details */}
              <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Christ of the Abyss</h3>
                    <p className="text-blue-100">Statue Snorkeling Tour</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold">4.9/5</span>
                    <span className="text-blue-200">(487 reviews)</span>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Clock className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Duration</div>
                      <div className="font-semibold">4 Hours</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Max Group</div>
                      <div className="font-semibold">25 People</div>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Location</div>
                      <div className="font-semibold">Key Largo</div>
                    </div>
                    <div className="text-center">
                      <Check className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Equipment</div>
                      <div className="font-semibold">Included</div>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Professional snorkeling equipment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>PADI certified guide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Safety briefing & instruction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Free parking at state park</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Booking Form */}
              <div className="p-8">
                <div className="space-y-6">
                  
                  {/* Pricing */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">${basePrice}</span>
                      <span className="text-gray-600">per person</span>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      ✓ No Booking Fees
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                        disabled={guestCount <= 1}
                        className="h-8 w-8 p-0"
                      >
                        -
                      </Button>
                      <span className="mx-6 font-semibold text-lg">
                        {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => guestCount < 25 && setGuestCount(guestCount + 1)}
                        disabled={guestCount >= 25}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Choose Your Date
                    </Button>
                  </div>

                  {/* Total */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total for {guestCount} {guestCount === 1 ? 'guest' : 'guests'}:</span>
                      <span className="text-2xl font-bold text-blue-600">${total}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 text-lg">
                    Book Your Adventure
                  </Button>

                  {/* Call Option */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Prefer to book by phone?</p>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call (305) 391-4040
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex justify-center gap-4 text-xs text-gray-500 pt-2">
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Secure Booking</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Instant Confirmation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Join over 10,000 satisfied adventurers who have experienced the sacred waters
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600" />
              <span>100% Refund if weather cancels</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600" />
              <span>Professional equipment included</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600" />
              <span>Expert PADI guides</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
