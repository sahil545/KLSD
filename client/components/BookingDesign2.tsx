import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Shield, Check, Phone, Plus, Minus } from "lucide-react";

export default function BookingDesign2({ 
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
      {/* Clean White Card */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-gray-900 mb-2">${basePrice}</div>
          <div className="text-gray-600">per person</div>
          
          <div className="mt-4 inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <Check className="w-4 h-4" />
            NO Booking Fees
          </div>
        </div>

        {/* Selection Controls */}
        <div className="space-y-6 mb-8">
          
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tour Date</label>
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-300 hover:border-gray-400 h-12 text-gray-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Select Date & Time
            </Button>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
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
        </div>

        {/* Price Summary */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <Button 
          onClick={onReserveClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded-lg mb-6"
        >
          Reserve Your Spot
        </Button>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500" />
            <span>All equipment included</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500" />
            <span>PADI certified guides</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500" />
            <span>Free parking included</span>
          </div>
        </div>

        {/* Trust & Contact */}
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
  );
}
