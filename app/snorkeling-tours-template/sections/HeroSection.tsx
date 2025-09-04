"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GuestDetailsModal from "@/components/GuestDetailsModal";
import { type TourData } from "../data";
import {
  Clock,
  MapPin,
  Star,
  Users,
  AlertCircle,
  CheckCircle,
  Shield,
  ArrowDown,
} from "lucide-react";

interface HeroSectionProps {
  data: TourData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Debug: open modal via query param
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get("showGuestModal") === "1" || sp.get("debug-modal") === "guest") {
        setShowGuestModal(true);
      }
    } catch {}
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)",
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url("${data.images.hero}")`,
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />


      <div className="relative container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Breadcrumb */}
            <nav className="text-sm text-white/70 mb-4">
              <span>{data.categories[0]}</span> /{" "}
              <span className="text-white">{data.name}</span>
            </nav>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
                ⭐ Best of Florida Keys
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                🏆 #1 Rated Tour
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                ✓ No Booking Fees
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {data.name}
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
              <span className="text-white/90">{data.details.rating}/5</span>
              <span className="text-white/70">({data.details.reviewCount} reviews)</span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Duration</div>
                <div className="font-semibold">{data.details.duration}</div>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Users className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Group Size</div>
                <div className="font-semibold">{data.details.groupSize}</div>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Location</div>
                <div className="font-semibold">{data.details.location}</div>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <Shield className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white/90">Gear</div>
                <div className="font-semibold">
                  {data.details.gearIncluded ? "Included" : "Not Included"}
                </div>
              </div>
            </div>

            {/* Key Selling Points */}
            <div className="space-y-3 mb-8">
              {data.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-white/90">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Urgency Message */}
            <div className="mb-6 text-sm space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-300" />
                <span className="font-semibold text-white">Trips Sell Out</span>
              </div>
              <div className="text-white/80 ml-6">
                Book in advance to secure your spots
              </div>
              <div className="text-green-300 ml-6">
                ✓ Easy Cancellation & Reschedule
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={scrollToBooking}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg"
            >
              Book Your Adventure Now
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Column - Empty space */}
          <div className="hidden lg:block">
          </div>
        </div>
      </div>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        guestCount={2}
        totalPrice={149.8}
        selectedDate=""
      />
    </section>
  );
}
