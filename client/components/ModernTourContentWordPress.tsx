import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Star,
  Shield,
  Camera,
  Fish,
  Waves,
  Award,
  Phone,
  Calendar,
  ArrowRight,
} from "lucide-react";

import Image from "next/image";

interface ProductData {
  id: number;
  name: string;
  price: number | string;
  description?: string;
  shortDescription?: string;
  tourData?: {
    duration: string;
    groupSize: string;
    location: string;
    difficulty: string;
    gearIncluded: boolean;
    meetingPoint?: string;
    cancellationPolicy?: string;
    highlights?: string[];
    included?: string[];
  };
}

interface SiteData {
  phone?: string;
  businessName?: string;
}

interface Props {
  product: ProductData;
  siteData?: SiteData;
  onAddToCart?: (quantity: number, guestData: any[]) => Promise<void>;
}

export default function ModernTourContentWordPress({
  product,
  siteData,
  onAddToCart,
}: Props) {
  const tourData = product.tourData || null;

  const businessPhone = siteData?.phone || "(305) 391-4040";
  const businessName = siteData?.businessName || "Key Largo Scuba Diving";

  // Default highlights and included items if not provided
  const highlights = tourData.highlights || [
    "Famous 9-foot bronze Christ statue in crystal-clear water",
    "All snorkeling equipment included",
    "PADI certified guides",
    "Small group experience",
    "Underwater photography opportunities",
  ];

  const includedItems = tourData.included || [
    "Professional guide and safety briefing",
    "All snorkeling equipment provided",
    "Underwater photography opportunities",
    "Transportation to/from dive sites",
    "Light refreshments and water",
  ];

  const handleBookNow = () => {
    if (onAddToCart) {
      onAddToCart(1, []);
    } else {
      // Scroll to booking section
      const bookingSection = document.getElementById("booking-section");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCallNow = () => {
    window.location.href = `tel:${businessPhone.replace(/[^\d]/g, "")}`;
  };

  return (
    <div className="bg-white">
      {/* Tour Details Section */}
      <section
        id="overview"
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative"
      >
        <div className="absolute inset-0 bg-blue-50/70" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Makes This Experience Special
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.shortDescription ??
                  "Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park"}
              </p>
            </div>

            <div className="mb-16">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200"
                alt="Christ of the Abyss bronze statue underwater in Key Largo Florida Keys snorkeling tour"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>

            {/* Experience Grid */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  The Experience
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Fish className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Iconic Underwater Statue
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Visit the famous 9-foot bronze Christ of the Abyss
                        statue, standing majestically in 25 feet of
                        crystal-clear water as a beacon of peace and wonder.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Waves className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Pristine Marine Sanctuary
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Snorkel through vibrant coral gardens teeming with
                        tropical fish in America's first underwater park,
                        protected since 1963.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Expert Guidance
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Our PADI certified dive masters provide comprehensive
                        safety briefings and marine life education throughout
                        your journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  What's Included
                </h3>
                <div className="bg-blue-50 rounded-2xl p-8">
                  <div className="space-y-4">
                    {includedItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">
                        Florida Keys Excellence Award Winner
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section id="journey" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your {tourData.duration || "4-Hour"} Journey
            </h2>
            <p className="text-xl text-gray-600">
              From arrival to unforgettable memories
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-teal-300 hidden lg:block transform translate-x-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Welcome & Preparation
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Meet our team at{" "}
                  {tourData?.location || "John Pennekamp State Park"} for
                  equipment fitting and comprehensive safety briefing.
                </p>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  8:00 AM - 30 minutes
                </Badge>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-teal-300 to-orange-300 hidden lg:block transform translate-x-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Scenic Boat Journey
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Cruise through crystal-clear waters to the statue location
                  while learning about the area's history.
                </p>
                <Badge
                  variant="outline"
                  className="bg-teal-50 text-teal-700 border-teal-200"
                >
                  8:30 AM - 30 minutes
                </Badge>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-300 to-green-300 hidden lg:block transform translate-x-10"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Underwater Adventure
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Snorkel around the iconic Christ statue and explore the
                  vibrant coral reef ecosystem.
                </p>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  9:00 AM - 2.5 hours
                </Badge>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Return & Reflection
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Relax on the return journey while sharing your experience and
                  planning future adventures.
                </p>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  11:30 AM - 30 minutes
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Description */}
      {product.description && (
        <section id="description" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Tour Details
              </h2>
              <div
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Important Information */}
              <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Important Information
                </h3>

                {/* Meeting Point */}
                {tourData?.meetingPoint && (
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Meeting Point
                    </h4>
                    <p className="text-gray-600">{tourData.meetingPoint}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  {/* What to Bring */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">
                      What to Bring
                    </h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Swimwear and towel</li>
                      <li>• Sunscreen (reef-safe)</li>
                      <li>• Camera (waterproof housing available)</li>
                      <li>• Light jacket for boat ride</li>
                    </ul>
                  </div>

                  {/* Cancellation Policy */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">
                      Cancellation Policy
                    </h4>
                    <p className="text-gray-600">
                      {tourData?.cancellationPolicy ||
                        "Free cancellation up to 24 hours before tour departure. Weather cancellations receive full refund or reschedule option."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Indicators */}
      <section
        id="why-us"
        className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why {businessName}</h2>
            <p className="text-xl text-blue-100 mb-12">
              The Florida Keys' most trusted diving experience
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-blue-200">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-blue-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-200">Safety Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book-now" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready for Your Underwater Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book your {product.name} experience today and create memories that
              will last a lifetime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={handleBookNow}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg"
              >
                Book Your Tour Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleCallNow}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {businessPhone}
              </Button>
            </div>

            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Instant confirmation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Free cancellation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Best price guarantee
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
