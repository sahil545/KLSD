import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Shield, Check, Phone, Plus, Minus, Star } from "lucide-react";

export default function BookingDesign4({ 
  onReserveClick 
}: { 
  onReserveClick: () => void 
}) {
  const [guestCount, setGuestCount] = useState(2);
  const basePrice = 70;
  const taxRate = 0.07;
  const subtotal = guestCount * basePrice;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="w-full max-w-sm">
      {/* Modern Card with Split Sections - Base Design 3 */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Section - Pricing & Features (Design 3) */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold mb-1">${basePrice}</div>
            <div className="text-blue-100 text-sm">per person</div>
          </div>

          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-blue-100 ml-2">4.9/5</span>
          </div>

          <Badge className="w-full bg-green-500/20 text-green-200 border-green-400/30 justify-center">
            ✓ NO Booking Fees (Save $15+)
          </Badge>
        </div>

        {/* Bottom Section - Booking Controls */}
        <div className="p-6">
          
          {/* Date Selection (Design 3) */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Select Tour Date</div>
            <Button 
              variant="outline" 
              className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-11"
            >
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-gray-700">Choose Date & Time</span>
            </Button>
          </div>

          {/* Guest Count - Design 2 Style with Design 3 Heading */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Number of Guests</div>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                className="h-8 w-8 p-0 border-gray-300"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-semibold text-gray-900">
                {guestCount} {guestCount === 1 ? 'Adult' : 'Adults'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => guestCount < 25 && setGuestCount(guestCount + 1)}
                className="h-8 w-8 p-0 border-gray-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Price Display (Design 3) */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-blue-700 border-t border-blue-200 pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Reserve Button (Design 3) */}
          <Button 
            onClick={onReserveClick}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg mb-4"
          >
            Reserve Your Spot Now
          </Button>

          {/* Included Features (Design 3) */}
          <div className="grid grid-cols-1 gap-2 mb-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span>All snorkeling equipment</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span>PADI certified guide</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span>Free parking included</span>
            </div>
          </div>

          {/* Footer - Design 2 Style */}
          <div className="text-center border-t border-gray-200 pt-4">
            <div className="flex justify-center gap-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure Booking
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                Instant Confirmation
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Questions? Call{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                (305) 391-4040
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
