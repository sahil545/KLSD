"use client";

import React, { useState } from "react";
import { Navigation } from "../../client/components/Navigation";
import { Footer } from "../../client/components/Footer";
import { Button } from "../../client/components/ui/button";
import { Badge } from "../../client/components/ui/badge";
import { Card, CardContent } from "../../client/components/ui/card";
import { MapPin, Anchor, Compass, Map } from "lucide-react";
import DiveSitesMapWrapper from "../../client/components/DiveSitesMapWrapper";
import { DiveSiteData } from "../../client/components/DiveSitesMap";

import Image from "next/image";

export default function DiveSites() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSite, setSelectedSite] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(true);

  const filters = ["All", "Reef", "Wreck", "Shallow", "Deep", "Night Dive"];

  const diveSites: DiveSiteData[] = [
    {
      id: 1,
      name: "Christ of the Abyss",
      location: "John Pennekamp Coral Reef State Park",
      depth: "25 feet",
      type: "Reef",
      difficulty: "Beginner",
      description:
        "World-famous 9-foot bronze Christ statue surrounded by marine life",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Bronze Christ statue",
        "Excellent visibility",
        "Perfect for snorkeling",
      ],
      marineLife: ["Angelfish", "Parrotfish", "Sergeant Major", "Yellow Tangs"],
      coordinates: [25.0784, -80.2937], // Christ of the Abyss actual coordinates
    },
    {
      id: 2,
      name: "Spiegel Grove",
      location: "Key Largo Marine Sanctuary",
      depth: "130 feet",
      type: "Wreck",
      difficulty: "Advanced",
      description:
        "Massive 510-foot Navy ship wreck, one of the largest artificial reefs",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        "510-foot Navy ship",
        "Penetration opportunities",
        "Goliath grouper sightings",
      ],
      marineLife: [
        "Goliath Grouper",
        "Barracuda",
        "Nurse Sharks",
        "Moray Eels",
      ],
      coordinates: [25.0711, -80.2825], // Spiegel Grove actual coordinates
    },
    {
      id: 3,
      name: "Molasses Reef",
      location: "Key Largo Marine Sanctuary",
      depth: "40 feet",
      type: "Reef",
      difficulty: "Intermediate",
      description:
        "Pristine coral reef with diverse marine life and excellent underwater photography",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Pristine coral formations",
        "Excellent for photography",
        "Diverse marine ecosystem",
      ],
      marineLife: ["Sea Turtles", "Eagle Rays", "Reef Sharks", "Tropical Fish"],
      coordinates: [25.0117, -80.3767], // Molasses Reef actual coordinates
    },
    {
      id: 4,
      name: "French Reef",
      location: "Key Largo Marine Sanctuary",
      depth: "35 feet",
      type: "Reef",
      difficulty: "Intermediate",
      description:
        "Large coral reef system with swim-throughs, caves, and abundant marine life",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Swim-through formations",
        "Cave systems",
        "Large school of fish",
      ],
      marineLife: ["Grouper", "Snappers", "Angelfish", "Lobsters"],
      coordinates: [25.0378, -80.3497], // French Reef coordinates
    },
    {
      id: 5,
      name: "Benwood Wreck",
      location: "Key Largo Marine Sanctuary",
      depth: "45 feet",
      type: "Wreck",
      difficulty: "Intermediate",
      description:
        "Historic freighter wreck from WWII, now home to abundant marine life",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        "WWII history",
        "Easy penetration",
        "Shallow wreck diving",
      ],
      marineLife: ["Sergeant Majors", "Yellowtail Snappers", "Barracuda", "Jacks"],
      coordinates: [25.0547, -80.3281], // Benwood Wreck coordinates
    },
    {
      id: 6,
      name: "Grecian Rocks",
      location: "Key Largo Marine Sanctuary",
      depth: "25 feet",
      type: "Reef",
      difficulty: "Beginner",
      description:
        "Shallow reef perfect for beginners with excellent snorkeling opportunities",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Perfect for beginners",
        "Great snorkeling",
        "Calm waters",
      ],
      marineLife: ["Parrotfish", "Angelfish", "Grunts", "Blue Tangs"],
      coordinates: [25.0664, -80.3072], // Grecian Rocks coordinates
    },
  ];

  const filteredSites =
    activeFilter === "All"
      ? diveSites
      : diveSites.filter(
          (site) =>
            site.type === activeFilter || site.difficulty === activeFilter,
        );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-ocean to-sage text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-coral/20 text-coral border-coral/30 text-lg px-4 py-2">
              World-Class Dive Sites
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Key Largo Dive Sites
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore the most beautiful underwater destinations in the Florida
              Keys Marine Sanctuary.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-ocean mb-4">
                Dive Site Locations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the exact locations of our world-class dive sites in the Florida Keys Marine Sanctuary.
                Click on any marker to learn more about each site.
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMap(!showMap)}
                  className="border-ocean text-ocean hover:bg-ocean hover:text-white"
                >
                  <Map className="w-4 h-4 mr-2" />
                  {showMap ? "Hide Map" : "Show Map"}
                </Button>
              </div>
            </div>

            {showMap && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <DiveSitesMapWrapper
                  diveSites={filteredSites}
                  selectedSite={selectedSite}
                  onSiteSelect={setSelectedSite}
                  className="h-96"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-ocean mb-2">Filter Dive Sites</h2>
            <p className="text-gray-600">Find the perfect dive site for your skill level and interests</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant="outline"
                className={`${
                  activeFilter === filter
                    ? "bg-ocean text-white border-ocean"
                    : "border-ocean text-ocean hover:bg-ocean hover:text-white"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Dive Sites Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSites.map((site) => (
              <Card
                key={site.id}
                className={`overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
                  selectedSite === site.id
                    ? "ring-2 ring-ocean shadow-xl border-ocean"
                    : "border-ocean/20"
                }`}
                onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-ocean">
                    {site.type}
                  </Badge>
                  <Badge className="absolute top-4 right-4 bg-coral text-white">
                    {site.difficulty}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">
                    {site.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-ocean" />
                    <span>{site.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Anchor className="w-4 h-4 text-ocean" />
                      <span>{site.depth}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Compass className="w-4 h-4 text-ocean" />
                      <span>{site.type}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{site.description}</p>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm text-ocean">
                      Highlights:
                    </h4>
                    {site.highlights.slice(0, 2).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="text-coral">✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-sm text-ocean">
                      Marine Life:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {site.marineLife.slice(0, 3).map((animal, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-sage text-sage"
                        >
                          {animal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-coral hover:bg-coral/90 text-white">
                    Dive This Site
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
