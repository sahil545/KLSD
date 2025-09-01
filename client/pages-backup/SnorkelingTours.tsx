import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, MapPin, Clock, Users, Award, Camera } from 'lucide-react';

const tours = [
  {
    id: 1,
    name: "Christ of the Abyss Snorkeling",
    price: 89,
    duration: "4 hours",
    groupSize: "25 max",
    rating: 4.9,
    reviews: 487,
    description: "Visit the iconic underwater statue and explore vibrant coral reefs in crystal clear waters.",
    highlights: ["Famous 9-foot bronze statue", "Professional guide", "All equipment included"],
    image: "christ-statue",
    badge: "Most Popular"
  },
  {
    id: 2,
    name: "Coral Gardens Snorkeling",
    price: 75,
    duration: "3 hours",
    groupSize: "20 max",
    rating: 4.7,
    reviews: 256,
    description: "Explore pristine coral gardens teeming with tropical fish and marine life.",
    highlights: ["Vibrant coral formations", "Tropical fish", "Shallow water snorkeling"],
    image: "coral-gardens",
    badge: "Best for Beginners"
  },
  {
    id: 3,
    name: "Key Largo Lighthouse Snorkel",
    price: 95,
    duration: "5 hours",
    groupSize: "15 max",
    rating: 4.8,
    reviews: 198,
    description: "Snorkel around the historic Key Largo Lighthouse and surrounding reefs.",
    highlights: ["Historic lighthouse", "Multiple snorkel sites", "Lunch included"],
    image: "lighthouse",
    badge: "Premium Experience"
  },
  {
    id: 4,
    name: "Family Snorkel Adventure",
    price: 65,
    duration: "2.5 hours",
    groupSize: "30 max",
    rating: 4.6,
    reviews: 342,
    description: "Perfect family-friendly snorkeling experience in calm, shallow waters.",
    highlights: ["Kid-friendly", "Shallow waters", "Family photos included"],
    image: "family",
    badge: "Family Friendly"
  },
  {
    id: 5,
    name: "Sunset Snorkel & Sail",
    price: 125,
    duration: "4 hours",
    groupSize: "12 max",
    rating: 4.9,
    reviews: 156,
    description: "Combine snorkeling with a beautiful sunset sailing experience.",
    highlights: ["Sunset sailing", "Premium snorkel sites", "Champagne toast"],
    image: "sunset",
    badge: "Romantic"
  },
  {
    id: 6,
    name: "Photography Snorkel Tour",
    price: 110,
    duration: "4.5 hours",
    groupSize: "8 max",
    rating: 4.8,
    reviews: 89,
    description: "Specialized tour for underwater photography enthusiasts.",
    highlights: ["Photography instruction", "Best photo spots", "Small groups"],
    image: "photography",
    badge: "Photography Focus"
  }
];

function SnorkelingTours() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-ocean via-ocean/90 to-ocean-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 bg-foam/5 rounded-full -top-32 -right-32"></div>
          <div className="absolute w-48 h-48 bg-coral/10 rounded-full -bottom-24 -left-24"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="text-foam/70 mb-6">
              <span>Home</span> / <span className="text-foam font-semibold">Snorkeling Tours</span>
            </nav>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-coral/20 text-coral border-coral/30">🏆 #1 Rated Tours</Badge>
              <Badge className="bg-foam/20 text-foam border-foam/30">⭐ 4.8/5 Average Rating</Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓ All Levels Welcome</Badge>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Key Largo Snorkeling Tours
            </h1>
            
            <p className="text-xl lg:text-2xl text-foam/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover the underwater paradise of the Florida Keys with our expert guides. From the famous Christ of the Abyss to pristine coral gardens, experience the best snorkeling in Key Largo.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-foam/10 backdrop-blur-sm border border-foam/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-coral">6</div>
                <div className="text-sm text-foam/80">Tour Options</div>
              </div>
              <div className="bg-foam/10 backdrop-blur-sm border border-foam/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-coral">25+</div>
                <div className="text-sm text-foam/80">Snorkel Sites</div>
              </div>
              <div className="bg-foam/10 backdrop-blur-sm border border-foam/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-coral">1,500+</div>
                <div className="text-sm text-foam/80">Happy Guests</div>
              </div>
              <div className="bg-foam/10 backdrop-blur-sm border border-foam/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-coral">4.8</div>
                <div className="text-sm text-foam/80">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Sort Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-ocean text-ocean bg-ocean/5">All Tours</Button>
              <Button variant="ghost" size="sm">Beginner Friendly</Button>
              <Button variant="ghost" size="sm">Family Tours</Button>
              <Button variant="ghost" size="sm">Premium</Button>
              <Button variant="ghost" size="sm">Photography</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Showing {tours.length} tours</span>
              <select className="text-sm border rounded px-3 py-1">
                <option>Sort by Popularity</option>
                <option>Sort by Price</option>
                <option>Sort by Duration</option>
                <option>Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gradient-to-b from-background to-ocean-light/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center">
                    <div className="text-center text-foam">
                      <div className="w-16 h-16 bg-foam/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <p className="font-semibold">{tour.name}</p>
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-coral text-white">{tour.badge}</Badge>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white font-semibold">${tour.price}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-coral text-coral' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="text-muted-foreground text-sm">({tour.reviews} reviews)</span>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Tour Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-ocean" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-ocean" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <p className="font-semibold text-sm mb-2">Highlights:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tour.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-coral">${tour.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">per person</span>
                    </div>
                    <Button className="bg-ocean hover:bg-ocean/90">
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Snorkeling Tours */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold mb-6">Why Our Snorkeling Tours Are Special</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the difference that expert guides, premium equipment, and local knowledge make in your underwater adventure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean to-ocean/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Local Guides</h3>
              <p className="text-muted-foreground">
                Our PADI certified guides know every reef, current, and secret spot in Key Largo waters. They'll show you marine life you'd never find on your own.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Small Group Experience</h3>
              <p className="text-muted-foreground">
                With limited group sizes, you get personalized attention and a more intimate experience with nature. No crowded boats or rushed schedules.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-coral to-coral/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Equipment</h3>
              <p className="text-muted-foreground">
                All top-quality snorkeling gear included. From comfortable masks to professional-grade fins, we provide everything you need for the perfect experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-ocean to-ocean-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore Underwater Paradise?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied guests who have discovered the magic of Key Largo's underwater world with us.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" className="bg-coral hover:bg-coral/90 text-white">
              Book Your Adventure Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ocean">
              Call (305) 555-DIVE
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm opacity-75 mb-2">Questions? We're here to help!</p>
            <p className="font-semibold">Open 7 days a week • 7:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SnorkelingTours;
