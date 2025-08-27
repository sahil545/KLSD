import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, MapPin, Shield, Check, Calendar } from "lucide-react";

export default function ChristStatueHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 py-16 lg:py-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200")'
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Content */}
          <div className="text-white space-y-6 pt-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-blue-200">
              <span>Snorkeling Tours</span> <span className="mx-2">/</span> <span className="text-white font-medium">Christ of the Abyss</span>
            </nav>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-600 hover:bg-red-700 text-white border-0">
                ⭐ Best of Florida Keys
              </Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-900 hover:bg-blue-300">
                #1 Rated Tour
              </Badge>
              <Badge className="bg-green-600 hover:bg-green-700 text-white border-0">
                ✓ No Booking Fees
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Christ of the Abyss
                <span className="block text-2xl lg:text-3xl font-normal text-blue-200 mt-2">
                  Statue Snorkeling Tour
                </span>
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-semibold">4.9/5</span>
              <span className="text-blue-200">(487 reviews)</span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🕐</div>
                <div className="text-sm text-blue-200">Duration</div>
                <div className="font-semibold">4 Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-sm text-blue-200">Group Size</div>
                <div className="font-semibold">25 Max</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📍</div>
                <div className="text-sm text-blue-200">Location</div>
                <div className="font-semibold">Key Largo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-sm text-blue-200">Gear</div>
                <div className="font-semibold">Included</div>
              </div>
            </div>

            {/* Key Selling Points */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-lg">Famous 9-foot bronze Christ statue in 25 feet of crystal-clear water</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-lg">All snorkeling equipment included - mask, fins, snorkel, vest</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-lg">PADI certified guides & marine life education</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-lg">Free parking at John Pennekamp Coral Reef State Park</span>
              </div>
            </div>

            {/* Urgency Message */}
            <div className="bg-red-600/20 border border-red-400 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <div className="font-semibold text-lg">Limited Availability</div>
                  <div className="text-blue-200">Most tours sell out within 24 hours. Only 25 spots per departure.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
              {/* Pricing Header */}
              <div className="text-center space-y-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-gray-800">$</span>
                  <span className="text-5xl font-bold text-gray-800">89</span>
                  <div className="text-sm text-gray-600">
                    <div>per person</div>
                  </div>
                </div>
                
                <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                  ✓ NO Booking Fees (Save $15+ vs competitors)
                </div>
              </div>

              {/* Book Button */}
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold py-6"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Adventure
              </Button>

              {/* Location Info */}
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-semibold text-gray-800">Christ of the Abyss</div>
                <div className="text-sm text-gray-600">Iconic underwater statue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
