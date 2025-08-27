import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  Users, 
  MapPin, 
  Star, 
  Waves, 
  Anchor, 
  Camera,
  Calendar,
  Phone
} from 'lucide-react';

export default function TripsTours() {
  const trips = [
    {
      id: 1,
      title: "Christ of the Abyss Snorkeling",
      description: "Visit the iconic 9-foot bronze Christ statue underwater in crystal-clear waters",
      price: 89,
      duration: "3 hours",
      groupSize: "Up to 6",
      rating: 4.9,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Best Seller", "Beginner Friendly"],
      includes: ["All equipment", "Professional guide", "Underwater photos", "Light refreshments"]
    },
    {
      id: 2,
      title: "Molasses Reef Diving",
      description: "Explore vibrant coral gardens with tropical fish at 25-40 feet depth",
      price: 125,
      duration: "4 hours",
      groupSize: "Up to 6",
      rating: 4.8,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Reef Diving"],
      includes: ["2 tank dive", "Equipment included", "Marine life guide", "Safety briefing"]
    },
    {
      id: 3,
      title: "USS Spiegel Grove Wreck",
      description: "Dive the 510-foot Navy ship wreck, one of the largest artificial reefs",
      price: 145,
      duration: "5 hours",
      groupSize: "Up to 4",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Advanced", "Wreck Diving"],
      includes: ["2 tank dive", "Wreck penetration", "Advanced briefing", "Certification required"]
    },
    {
      id: 4,
      title: "Night Diving Adventure",
      description: "Experience the underwater world after dark with unique marine life",
      price: 95,
      duration: "3 hours",
      groupSize: "Up to 6",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Night Dive", "Unique Experience"],
      includes: ["Underwater lights", "Night creatures spotting", "Equipment included", "Safety protocols"]
    },
    {
      id: 5,
      title: "Private Charter Experience",
      description: "Customize your perfect day with private boat and diving guide",
      price: 850,
      duration: "8 hours",
      groupSize: "Up to 12",
      rating: 5.0,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Private", "Luxury"],
      includes: ["Private boat", "Captain & guide", "Custom itinerary", "Gourmet lunch"]
    },
    {
      id: 6,
      title: "Spearfishing Charter",
      description: "Target hogfish, grouper, and snapper with professional guides",
      price: 175,
      duration: "6 hours",
      groupSize: "Up to 6",
      rating: 4.8,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Spearfishing", "Licensed"],
      includes: ["Equipment provided", "Fish cleaning", "Licensed guides", "Safety gear"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage/5 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-ocean to-ocean/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              25+ Years of Excellence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Key Largo Diving
              <span className="block text-coral">Adventures</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Explore the crystal-clear waters of the Florida Keys with our expert guides. 
              From iconic underwater statues to vibrant coral reefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-coral hover:bg-coral/90 text-white font-semibold text-lg px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Adventure
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ocean text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Call (305) 391-4040
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Trips Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Adventure</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a beginner or experienced diver, we have the perfect underwater experience for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <Card key={trip.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {trip.badges.map((badge, index) => (
                      <Badge 
                        key={index}
                        className="bg-coral/90 text-white border-0 font-medium"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg px-3 py-1">
                    <span className="text-2xl font-bold text-ocean">${trip.price}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{trip.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{trip.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{trip.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-coral fill-coral" />
                      <span className="font-medium">{trip.rating}</span>
                      <span>({trip.reviews})</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {trip.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-coral rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold">
                    Book This Trip
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-sage/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Key Largo Scuba Diving</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">25+ Years Experience</h3>
              <p className="text-muted-foreground">Professional diving services since 1998</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">70+ Dive Sites</h3>
              <p className="text-muted-foreground">Exclusive access to the best locations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Small Groups</h3>
              <p className="text-muted-foreground">Maximum 6 people for personalized experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Photo Memories</h3>
              <p className="text-muted-foreground">Complimentary underwater photography</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
