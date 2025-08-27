import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Anchor, 
  Fish, 
  Camera, 
  Star, 
  Waves, 
  Ship,
  Compass,
  Filter,
  Search
} from 'lucide-react';

export default function DiveSites() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Reef', 'Wreck', 'Shallow', 'Deep', 'Night Dive'];
  
  const diveSites = [
    {
      id: 1,
      name: "Christ of the Abyss",
      location: "John Pennekamp Coral Reef State Park",
      depth: "25 feet",
      visibility: "80-100 feet",
      type: "Reef",
      difficulty: "Beginner",
      description: "Home to the iconic 9-foot bronze Christ statue, this shallow reef site offers crystal-clear waters and abundant marine life.",
      highlights: ["Bronze Christ statue", "Shallow reef", "Perfect for snorkeling", "Vibrant coral formations"],
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      reviews: 523,
      bestFor: ["Snorkeling", "Beginner diving", "Photography"]
    },
    {
      id: 2,
      name: "USS Spiegel Grove",
      location: "6 miles southeast of Key Largo",
      depth: "60-130 feet",
      visibility: "50-80 feet",
      type: "Wreck",
      difficulty: "Advanced",
      description: "At 510 feet long, this is one of the largest artificial reefs in the world. This Navy ship was intentionally sunk in 2002.",
      highlights: ["510-foot Navy ship", "Massive artificial reef", "Penetration opportunities", "Large marine life"],
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      reviews: 387,
      bestFor: ["Advanced diving", "Wreck penetration", "Large marine life"]
    },
    {
      id: 3,
      name: "Molasses Reef",
      location: "Offshore Key Largo",
      depth: "25-40 feet",
      visibility: "60-100 feet",
      type: "Reef",
      difficulty: "Intermediate",
      description: "A vibrant spur and groove coral formation with spectacular coral gardens and diverse tropical fish populations.",
      highlights: ["Pristine coral gardens", "Tropical fish diversity", "Spur and groove formation", "Excellent photography"],
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      reviews: 298,
      bestFor: ["Coral viewing", "Fish photography", "Intermediate diving"]
    },
    {
      id: 4,
      name: "French Reef",
      location: "8 miles northeast of Key Largo",
      depth: "25-35 feet",
      visibility: "60-80 feet",
      type: "Reef",
      difficulty: "Beginner",
      description: "A shallow reef system perfect for beginners, featuring beautiful coral formations and a resident population of green moray eels.",
      highlights: ["Beginner-friendly", "Green moray eels", "Beautiful corals", "Calm conditions"],
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      reviews: 412,
      bestFor: ["Beginner diving", "Eel encounters", "Coral photography"]
    },
    {
      id: 5,
      name: "Benwood Wreck",
      location: "French Reef area",
      depth: "25-45 feet",
      visibility: "50-80 feet",
      type: "Wreck",
      difficulty: "Intermediate",
      description: "A 360-foot freighter sunk by a German U-boat in 1942. Now an artificial reef covered in marine growth.",
      highlights: ["WWII history", "Marine encrustation", "Easy wreck diving", "Historical significance"],
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      reviews: 267,
      bestFor: ["History buffs", "Wreck diving", "Marine life"]
    },
    {
      id: 6,
      name: "Pickles Reef",
      location: "Offshore Islamorada",
      depth: "15-25 feet",
      visibility: "70-100 feet",
      type: "Reef",
      difficulty: "Beginner",
      description: "A shallow patch reef system ideal for snorkeling and beginning divers, known for its diverse fish population.",
      highlights: ["Shallow diving", "Fish diversity", "Snorkel-friendly", "Clear water"],
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
      reviews: 189,
      bestFor: ["Snorkeling", "Fish watching", "Shallow diving"]
    },
    {
      id: 7,
      name: "The Elbow",
      location: "North of Key Largo",
      depth: "12-35 feet",
      visibility: "40-80 feet",
      type: "Reef",
      difficulty: "Beginner",
      description: "A historic reef that has claimed many ships over the centuries. Now a thriving ecosystem with multiple wrecks.",
      highlights: ["Multiple shipwrecks", "Historic significance", "Varied depths", "Rich marine life"],
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.3,
      reviews: 156,
      bestFor: ["Wreck exploration", "History", "Varied diving"]
    },
    {
      id: 8,
      name: "Grecian Rocks",
      location: "Offshore Key Largo",
      depth: "25-35 feet",
      visibility: "60-90 feet",
      type: "Reef",
      difficulty: "Intermediate",
      description: "A beautiful coral formation with swim-throughs and caves, home to large grouper and nurse sharks.",
      highlights: ["Swim-throughs", "Large grouper", "Nurse sharks", "Coral caves"],
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      reviews: 234,
      bestFor: ["Large fish", "Cave diving", "Photography"]
    }
  ];

  const filteredSites = activeFilter === 'All' 
    ? diveSites 
    : diveSites.filter(site => {
        if (activeFilter === 'Shallow') return parseInt(site.depth.split('-')[0]) <= 25;
        if (activeFilter === 'Deep') return parseInt(site.depth.split('-')[0]) > 40;
        if (activeFilter === 'Night Dive') return site.bestFor.some(item => item.toLowerCase().includes('night'));
        return site.type === activeFilter;
      });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-sage";
      case "Intermediate": return "bg-ocean";
      case "Advanced": return "bg-coral";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage/5 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-ocean to-ocean/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              70+ Dive Sites
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Florida Keys
              <span className="block text-coral">Dive Sites</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Explore pristine coral reefs, historic shipwrecks, and underwater wonders 
              in America's only living coral barrier reef.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-coral hover:bg-coral/90 text-white font-semibold text-lg px-8 py-4">
                <Compass className="w-5 h-5 mr-2" />
                Plan Your Dive
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ocean text-lg px-8 py-4">
                <MapPin className="w-5 h-5 mr-2" />
                View Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`${
                  activeFilter === filter 
                    ? "bg-ocean text-white" 
                    : "border-ocean/20 text-ocean hover:bg-ocean hover:text-white"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-muted-foreground">
              Showing {filteredSites.length} of {diveSites.length} dive sites
            </p>
          </div>
        </div>
      </section>

      {/* Dive Sites Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSites.map((site) => (
              <Card key={site.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={site.image}
                    alt={site.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white/90 text-ocean border-0 font-medium">
                      {site.type}
                    </Badge>
                    <Badge className={`${getDifficultyColor(site.difficulty)} text-white border-0 font-medium`}>
                      {site.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-coral fill-coral" />
                      <span className="font-bold text-ocean">{site.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{site.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{site.location}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">{site.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Depth:</span>
                      <div className="text-muted-foreground">{site.depth}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Visibility:</span>
                      <div className="text-muted-foreground">{site.visibility}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Highlights:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {site.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-coral rounded-full"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Best For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {site.bestFor.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-ocean/20 text-ocean">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-ocean hover:bg-ocean/90 text-white font-semibold">
                    <Anchor className="w-4 h-4 mr-2" />
                    Dive This Site
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Site Stats */}
      <section className="py-16 bg-sage/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Dive Site Statistics</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Anchor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">70+</h3>
              <p className="text-muted-foreground">Dive Sites Available</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <Ship className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">15+</h3>
              <p className="text-muted-foreground">Shipwrecks to Explore</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">200+</h3>
              <p className="text-muted-foreground">Marine Species</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">100ft</h3>
              <p className="text-muted-foreground">Average Visibility</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
