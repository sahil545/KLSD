import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Shield, CircleCheckBig, Phone, Plus, Minus } from "lucide-react";

export default function BookingDesign1({ 
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
      {/* Modern Glass Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
        
        {/* Pricing Header */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-white mb-1">${basePrice}</div>
          <div className="text-white/80 text-sm">per person + tax</div>
          
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mt-3">
            ✓ NO Booking Fees
          </Badge>
        </div>

        {/* Quick Features */}
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex items-center gap-2 text-white/90">
            <CircleCheckBig className="w-4 h-4 text-green-400" />
            <span>All equipment included</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CircleCheckBig className="w-4 h-4 text-green-400" />
            <span>PADI certified guides</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CircleCheckBig className="w-4 h-4 text-green-400" />
            <span>Free parking</span>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <Button 
            variant="outline" 
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 justify-start h-12"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Choose Date & Time
          </Button>
        </div>

        {/* Guest Count */}
        <div className="mb-6">
          <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-white font-semibold">
              {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => guestCount < 25 && setGuestCount(guestCount + 1)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <div className="flex justify-between text-white/80 text-sm mb-1">
            <span>Subtotal ({guestCount} guests)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/80 text-sm mb-3">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Reserve Button */}
        <Button 
          onClick={onReserveClick}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg mb-4"
        >
          Reserve Your Spot Now
        </Button>

        {/* Trust Indicators */}
        <div className="flex justify-center gap-4 text-xs text-white/70 mb-4">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <CircleCheckBig className="w-3 h-3" />
            <span>Instant</span>
          </div>
        </div>

        {/* Phone Option */}
        <div className="text-center border-t border-white/20 pt-4">
          <p className="text-white/60 text-xs mb-2">Prefer to book by phone?</p>
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 text-sm"
          >
            <Phone className="w-3 h-3 mr-1" />
            (305) 391-4040
          </Button>
        </div>
      </div>
    </div>
  );
}
