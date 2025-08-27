import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GuestDetailsModal from "@/components/GuestDetailsModal";
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

interface ProductData {
  id: number;
  name: string;
  price: number | string;
  images?: {
    main?: string;
    gallery?: string[];
  } | Array<{ src: string; alt: string; }>;
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tourData?: {
    duration: string;
    groupSize: string;
    location: string;
    difficulty: string;
    gearIncluded: boolean;
    highlights?: string[];
    included?: string[];
  };
}

interface WordPressTourData {
  productData: ProductData;
  woocommerce?: {
    currencySymbol: string;
  };
}

interface Props {
  product: ProductData;
  tourData?: WordPressTourData | null;
}

export default function WooCommerceHeroNoBookingWordPress({ product, tourData }: Props) {
  const [showGuestModal, setShowGuestModal] = useState(false);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle different image data formats
  const getMainImage = () => {
    if (product.images) {
      if (Array.isArray(product.images) && product.images.length > 0) {
        return product.images[0].src;
      }
      if (typeof product.images === 'object' && 'main' in product.images) {
        return product.images.main;
      }
    }
    return "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop";
  };

  // Get tour data with fallbacks
  const getTourData = () => {

    const baseTourData = product.tourData;

    return {
      duration: baseTourData.duration || "4 Hours",
      groupSize: baseTourData.groupSize || "25 Max",
      location: baseTourData.location || "Key Largo",
      difficulty: baseTourData.difficulty || "All Levels",
      gearIncluded: baseTourData.gearIncluded ?? true,
      highlights: baseTourData.highlights || [
        "Famous 9-foot bronze Christ statue in crystal-clear water",
        "All snorkeling equipment included",
        "PADI certified guides",
        "Small group experience",
        "Underwater photography opportunities"
      ],
      included: baseTourData.included || [
        "Professional guide and safety briefing",
        "All snorkeling equipment provided",
        "Underwater photography opportunities",
        "Transportation to/from dive sites",
        "Light refreshments and water"
      ]
    };
  };

  const activeTourData = getTourData();
  const currencySymbol = tourData?.woocommerce?.currencySymbol || "$";

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url("${getMainImage()}")`,
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
              <span>{product.categories?.[0]?.name || "Tours"}</span> /{" "}
              <span className="text-foam">{product.name}</span>
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
                <div className="font-semibold">{activeTourData.duration}</div>
              </div>
              <div className="text-center bg-foam/10 rounded-lg p-3 backdrop-blur-sm">
                <Users className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-sm text-foam/90">Group Size</div>
                <div className="font-semibold">{activeTourData.groupSize}</div>
              </div>
              <div className="text-center bg-foam/10 rounded-lg p-3 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-sm text-foam/90">Location</div>
                <div className="font-semibold">{activeTourData.location}</div>
              </div>
              <div className="text-center bg-foam/10 rounded-lg p-3 backdrop-blur-sm">
                <Shield className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-sm text-foam/90">Gear</div>
                <div className="font-semibold">
                  {activeTourData.gearIncluded ? "Included" : "Not Included"}
                </div>
              </div>
            </div>

            {/* Key Selling Points */}
            <div className="space-y-3 mb-8">
              {activeTourData.highlights.slice(0, 4).map((highlight, index) => (
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

            {/* CTA Button */}
            <Button
              onClick={scrollToBooking}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg"
            >
              Book Your Adventure Now
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>

            {/* Price Display */}
            <div className="mt-6 flex items-center gap-4">
              <div className="text-2xl font-bold">
                Starting at {currencySymbol}
                {typeof product.price === 'number' ? product.price : product.price}
              </div>
              <div className="text-sm text-foam/80">per person</div>
            </div>
          </div>

          {/* Right Column - Empty space where booking form was */}
          <div className="hidden lg:block">
            {/* This space intentionally left empty - booking form removed */}
          </div>
        </div>
      </div>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        guestCount={2}
        totalPrice={typeof product.price === 'number' ? product.price * 2 : parseFloat(product.price.toString()) * 2}
        selectedDate=""
      />
    </section>
  );
}
