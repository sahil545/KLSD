"use client";

import React from "react";
import { Navigation } from "../../client/components/Navigation";
import { Footer } from "../../client/components/Footer";
import { Button } from "../../client/components/ui/button";
import { Badge } from "../../client/components/ui/badge";
import { Card, CardContent } from "../../client/components/ui/card";
import { Clock, Users, Star } from "lucide-react";
import Image from "next/image";

export default function TripsTours() {
  const trips = [
    {
      id: 1,
      title: "Christ of the Abyss Snorkeling",
      description:
        "Visit the iconic 9-foot bronze Christ statue underwater in crystal-clear waters",
      price: 89,
      duration: "3 hours",
      groupSize: "Up to 6",
      rating: 4.9,
      reviews: 342,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Snorkeling",
      highlights: [
        "World-famous underwater statue",
        "Crystal clear waters",
        "All equipment included",
      ],
    },
    {
      id: 2,
      title: "Coral Gardens Reef Dive",
      description:
        "Explore vibrant coral formations and tropical marine life in shallow reefs",
      price: 125,
      duration: "4 hours",
      groupSize: "Up to 8",
      rating: 4.8,
      reviews: 267,
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Reef Diving",
      highlights: [
        "Pristine coral gardens",
        "Tropical fish encounters",
        "Two-tank dive",
      ],
    },
    {
      id: 3,
      title: "Spiegel Grove Wreck Dive",
      description:
        "Dive the massive 510-foot Navy ship wreck, one of the largest artificial reefs",
      price: 145,
      duration: "6 hours",
      groupSize: "Up to 12",
      rating: 4.9,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Wreck Diving",
      highlights: [
        "510-foot Navy ship",
        "Advanced certification required",
        "Historic wreck site",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-ocean to-ocean/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              Adventure Awaits
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Trips & Tours in Key Largo
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover the underwater wonders of the Florida Keys with our
              expert-guided tours and diving expeditions.
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <Card
                key={trip.id}
                className="overflow-hidden hover:shadow-xl transition-shadow border-ocean/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-coral text-white px-3 py-1 rounded-full font-semibold">
                    ${trip.price}
                  </div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-ocean">
                    {trip.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">
                    {trip.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(trip.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-sm">{trip.rating}</span>
                    <span className="text-gray-500 text-sm">
                      ({trip.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{trip.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-ocean" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-ocean" />
                      <span>{trip.groupSize}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {trip.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="text-coral">✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-coral hover:bg-coral/90 text-white">
                    Book This Trip
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
