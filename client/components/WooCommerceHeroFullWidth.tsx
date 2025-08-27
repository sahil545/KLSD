import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GuestDetailsModal from "@/components/GuestDetailsModal";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  AlertCircle,
  CheckCircle,
  Shield,
  ArrowDown,
} from "lucide-react";

export default function WooCommerceHeroFullWidth() {
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleReserveClick = () => {
    setShowGuestModal(true);
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
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

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="text-sm text-foam/70 mb-6">
            <span>Snorkeling Tours</span> /{" "}
            <span className="text-foam">Christ of the Abyss</span>
          </nav>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
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
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white">
            Christ of the Abyss
            <span className="block text-white text-4xl lg:text-5xl mt-4">
              Statue Snorkeling Tour
            </span>
          </h1>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-foam/90 text-lg">4.9/5</span>
            <span className="text-foam/70 text-lg">(487 reviews)</span>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center bg-foam/10 rounded-xl p-4 backdrop-blur-sm">
              <Clock className="w-6 h-6 text-coral mx-auto mb-3" />
              <div className="text-sm text-foam/90">Duration</div>
              <div className="font-semibold text-lg">4 Hours</div>
            </div>
            <div className="text-center bg-foam/10 rounded-xl p-4 backdrop-blur-sm">
              <Users className="w-6 h-6 text-coral mx-auto mb-3" />
              <div className="text-sm text-foam/90">Group Size</div>
              <div className="font-semibold text-lg">25 Max</div>
            </div>
            <div className="text-center bg-foam/10 rounded-xl p-4 backdrop-blur-sm">
              <MapPin className="w-6 h-6 text-coral mx-auto mb-3" />
              <div className="text-sm text-foam/90">Location</div>
              <div className="font-semibold text-lg">Key Largo</div>
            </div>
            <div className="text-center bg-foam/10 rounded-xl p-4 backdrop-blur-sm">
              <Shield className="w-6 h-6 text-coral mx-auto mb-3" />
              <div className="text-sm text-foam/90">Gear</div>
              <div className="font-semibold text-lg">Included</div>
            </div>
          </div>

          {/* Key Selling Points */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto text-left">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <span className="text-foam/90 text-lg">
                Famous 9-foot bronze Christ statue in 25 feet of crystal-clear
                water
              </span>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <span className="text-foam/90 text-lg">
                All snorkeling equipment included - mask, fins, snorkel, vest
              </span>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <span className="text-foam/90 text-lg">
                PADI certified guides & marine life education
              </span>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <span className="text-foam/90 text-lg">
                Free parking at John Pennekamp Coral Reef State Park
              </span>
            </div>
          </div>

          {/* Urgency Message */}
          <div className="mb-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-300" />
              <span className="font-semibold text-white text-lg">
                Trips Sell Out Fast
              </span>
            </div>
            <div className="text-foam/80 mb-2">
              Book in advance to secure your spots
            </div>
            <div className="text-green-300">
              ✓ Easy Cancellation & Reschedule
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-xl"
            >
              Book Your Adventure Now
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-lg rounded-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Check Availability
            </Button>
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
