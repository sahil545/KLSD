import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean via-ocean/90 to-ocean-dark">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating bubbles animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-4 h-4 bg-foam/30 rounded-full animate-bounce" style={{left: '10%', top: '20%', animationDelay: '0s'}}></div>
        <div className="absolute w-6 h-6 bg-foam/20 rounded-full animate-bounce" style={{left: '80%', top: '30%', animationDelay: '1s'}}></div>
        <div className="absolute w-3 h-3 bg-foam/40 rounded-full animate-bounce" style={{left: '70%', top: '60%', animationDelay: '2s'}}></div>
        <div className="absolute w-5 h-5 bg-foam/25 rounded-full animate-bounce" style={{left: '20%', top: '70%', animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-foam/10 backdrop-blur-sm border border-foam/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-coral fill-coral" />
              <span className="text-foam text-sm font-medium">#1 Rated Snorkeling Tour</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold text-foam mb-6 leading-tight">
              Dive Into 
              <span className="block text-coral">Sacred Waters</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-foam/90 mb-8 leading-relaxed">
              Experience the iconic Christ of the Abyss statue in crystal-clear waters. 
              An unforgettable snorkeling adventure in Key Largo's most sacred site.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center gap-2 text-foam/80">
                <Clock className="w-5 h-5" />
                <span>3 Hours</span>
              </div>
              <div className="flex items-center gap-2 text-foam/80">
                <Users className="w-5 h-5" />
                <span>Small Groups</span>
              </div>
              <div className="flex items-center gap-2 text-foam/80">
                <MapPin className="w-5 h-5" />
                <span>Key Largo</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-coral hover:bg-coral/90 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Adventure
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-foam text-foam hover:bg-foam hover:text-ocean font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              >
                Watch Preview
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-foam/20">
              <div className="flex items-center justify-center lg:justify-start gap-6 text-foam/70">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foam">4.9</div>
                  <div className="flex gap-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-coral fill-coral" />
                    ))}
                  </div>
                  <div className="text-sm">500+ Reviews</div>
                </div>
                <div className="w-px h-12 bg-foam/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foam">10K+</div>
                  <div className="text-sm">Happy Divers</div>
                </div>
                <div className="w-px h-12 bg-foam/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foam">15</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image/Video */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-b from-ocean-light/20 to-ocean-dark/40 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-foam/10">
              {/* Placeholder for hero image */}
              <div className="w-full h-full flex items-center justify-center text-foam/60">
                <div className="text-center">
                  <div className="w-24 h-24 bg-foam/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-12 h-12" />
                  </div>
                  <p className="text-lg">Christ of the Abyss</p>
                  <p className="text-sm opacity-70">Iconic underwater statue</p>
                </div>
              </div>
            </div>
            
            {/* Floating price badge */}
            <div className="absolute -top-4 -right-4 bg-coral text-white rounded-2xl px-6 py-4 shadow-lg transform rotate-3">
              <div className="text-center">
                <div className="text-sm opacity-90">Starting at</div>
                <div className="text-2xl font-bold">$89</div>
                <div className="text-sm opacity-90">per person</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
