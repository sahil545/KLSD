"use client";

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "../client/components/Navigation";
import { Footer } from "../client/components/Footer";
import { Button } from "../client/components/ui/button";
import { Badge } from "../client/components/ui/badge";
import { Card } from "../client/components/ui/card";
import { Dialog, DialogContent } from "../client/components/ui/dialog";
import Booking from "../client/components/Booking";

import EnhancedCard from "../client/components/EnhancedCard";
import ScrollAnimation from "../client/components/ScrollAnimation";

import {
  Star,
  Calendar,
  Users,
  Clock,
  MapPin,
  Award,
  Shield,
  Anchor,
  Waves,
  BookOpen,
  UserCheck,
  Fish,
  Ship,
  Moon,
  Target,
  Zap,
  Store,
  Package,
  Truck,
  Settings,
  X,
} from "lucide-react";

export default function Homepage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeAdventureFilter, setActiveAdventureFilter] = useState("all");
  const [adventures, setAdventures] = useState<
    Array<{
      id: number;
      slug?: string;
      title: string;
      category: string;
      price: number;
      duration?: string;
      rating: number;
      reviews: number;
      description: string;
      image: string;
      permalink?: string;
      features?: string[];
      catSlugs?: string[];
      catNames?: string[];
    }>
  >([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  // Load live trips from WooCommerce
  useEffect(() => {
    let ignore = false;
    async function loadTrips() {
      try {
        const res = await fetch(`/api/trips?limit=100`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const trips = (data.trips || []).map((t: any) => ({
          id: t.id,
          slug: t.slug,
          title: t.name,
          category: t.categoryDisplay || (t.categories?.[0]?.name ?? "All"),
          price: Number(t.price) || 0,
          duration: t.duration || undefined,
          rating: Number(t.average_rating) || 0,
          reviews: Number(t.rating_count) || 0,
          description: (t.short_description || "").replace(/<[^>]+>/g, ""),
          image:
            t.image ||
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          permalink: t.permalink,
          features: [],
          catSlugs: (t.categories || []).map((c: any) =>
            (c.slug || "").toLowerCase(),
          ),
          catNames: (t.categories || []).map((c: any) =>
            (c.name || "").toLowerCase(),
          ),
        }));
        if (!ignore) {
          if (trips.length > 0) {
            setAdventures(trips);
          }
        }
      } catch (e) {
        console.warn("Trips API error; keeping current adventures", e);
      } finally {
        if (!ignore) setLoadingTrips(false);
      }
    }
    loadTrips();
    return () => {
      ignore = true;
    };
  }, []);

  const heroSlides = [
    {
      id: 1,
      headline: "25+ Years of Diving Excellence",
      subtext: "Platinum ScubaPro Dealer • 10K+ Happy Divers",
      cta: "Explore All Adventures",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Professional diving instructor with students underwater",
      featuredProduct: {
        title: "Christ of the Abyss",
        category: "Most Popular Tour",
        price: 89,
        description: "World-famous underwater statue",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Best Seller",
        location: "Key Largo, Florida Keys",
        highlights: "4.9★ rating • 500+ reviews • Daily departures",
      },
      topProducts: [
        { name: "Christ Statue Tour", price: "$89", category: "Snorkeling" },
        { name: "Coral Gardens Dive", price: "$125", category: "Reef Diving" },
        {
          name: "Night Dive Adventure",
          price: "$95",
          category: "Night Diving",
        },
      ],
    },
    {
      id: 2,
      headline: "Only in Key Largo",
      subtext: "Crystal clear waters ��� 50+ dive sites • Year-round diving",
      cta: "Discover What&apos;s Below",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Aerial view of crystal clear Key Largo waters with coral reefs",
      featuredProduct: {
        title: "Spiegel Grove Wreck",
        category: "Exclusive Location",
        price: 145,
        description: "510ft Navy ship wreck dive",
        image:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Key Largo Exclusive",
        location: "Key Largo Marine Sanctuary",
        highlights: "Advanced dive • 100ft depth • Wreck penetration",
      },
      topProducts: [
        {
          name: "Spiegel Grove Wreck",
          price: "$145",
          category: "Wreck Diving",
        },
        { name: "Coral Gardens", price: "$125", category: "Reef Diving" },
        { name: "Private Charter", price: "$1200", category: "Private" },
      ],
    },
    {
      id: 3,
      headline: "From Beginner to Certified Pro",
      subtext: "PADI courses • Equipment • Guided tours",
      cta: "Start Your Journey",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Diverse group of newly certified divers celebrating achievement",
      featuredProduct: {
        title: "Open Water Certification",
        category: "PADI Training",
        price: 499,
        description: "Complete diving certification",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Beginner Friendly",
        location: "PADI 5-Star Dive Center",
        highlights: "3-day course • E-learning included • Lifetime cert",
      },
      topProducts: [
        { name: "Open Water Cert", price: "$499", category: "Beginner" },
        { name: "Advanced Cert", price: "$375", category: "Advanced" },
        { name: "Rescue Diver", price: "$550", category: "Professional" },
      ],
    },
  ];

  // Auto-advance slider every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const defaultAdventures = [
    {
      id: 1,
      title: "Christ of the Abyss",
      category: "Snorkeling Trips",
      price: 89,
      duration: "4 hours",
      rating: 4.9,
      reviews: 487,
      description:
        "Experience the world-famous 9-foot bronze Christ statue in crystal-clear waters",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "All equipment included",
        "Small groups",
        "Professional guides",
      ],
    },
    {
      id: 2,
      title: "Coral Gardens Reef Dive",
      category: "Reef Dive Trips",
      price: 125,
      duration: "6 hours",
      rating: 4.8,
      reviews: 324,
      description:
        "Explore pristine coral gardens with vibrant marine life at 40-60 feet",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["2 tank dive", "Certified divers only", "Underwater photos"],
    },
    {
      id: 3,
      title: "Spiegel Grove Wreck",
      category: "Wreck Dive Trips",
      price: 145,
      duration: "8 hours",
      rating: 4.9,
      reviews: 198,
      description:
        "Dive the massive 510-foot Navy ship wreck, one of the largest artificial reefs",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Advanced dive", "2 tank dive", "Wreck penetration"],
    },
    {
      id: 4,
      title: "Night Dive Adventure",
      category: "Night Dives",
      price: 95,
      duration: "3 hours",
      rating: 4.7,
      reviews: 156,
      description:
        "Experience the underwater world after dark with unique marine life behavior",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Underwater lights", "Night creatures", "Small groups"],
    },
    {
      id: 5,
      title: "Spearfishing Expedition",
      category: "Spearfishing Trips",
      price: 175,
      duration: "6 hours",
      rating: 4.6,
      reviews: 89,
      description:
        "Target hogfish, grouper, and snapper in pristine waters with expert guides",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Equipment included", "Cleaning service", "Licensed guides"],
    },
    {
      id: 6,
      title: "Lobster Hunting",
      category: "Lobster Trips",
      price: 155,
      duration: "5 hours",
      rating: 4.8,
      reviews: 112,
      description:
        "Hunt for spiny lobsters in season with professional guides and equipment",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Season: Aug-Mar", "Equipment provided", "Cleaning included"],
    },
    {
      id: 7,
      title: "Private Charter",
      category: "Private Charters",
      price: 1200,
      duration: "8 hours",
      rating: 5.0,
      reviews: 67,
      description:
        "Customize your perfect day with private boat, captain, and diving guide",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Up to 12 guests", "Custom itinerary", "Gourmet lunch"],
    },
  ];

  const sortedAdventures = React.useMemo(() => {
    if ((activeAdventureFilter || "").toLowerCase() === "all")
      return adventures;
    const wanted = (activeAdventureFilter || "").toLowerCase();
    return adventures.filter((a) => {
      const slugs = (a.catSlugs || []).map((s) => (s || "").toLowerCase());
      return slugs.includes(wanted);
    });
  }, [adventures, activeAdventureFilter]);

  const adventureFilterOptions = [
    { name: "all", icon: Users, color: "ocean" },
    { name: "sunset-cruise", icon: Ship, color: "coral" },
    { name: "snorkeling-trips", icon: Waves, color: "coral" },
    { name: "dive-trips", icon: Fish, color: "sage" },
    { name: "spearfishing", icon: Target, color: "sage" },
    { name: "reef-dives", icon: Fish, color: "sage" },
    { name: "wreck-dives", icon: Ship, color: "ocean" },
    { name: "shark-dive", icon: Fish, color: "ocean" },
    { name: "night-dive", icon: Moon, color: "coral" },
    { name: "coral-restoration-dives", icon: Shield, color: "sage" },
    { name: "private-dive-charters", icon: Anchor, color: "ocean" },
    { name: "private-snorkeling-trips", icon: Waves, color: "coral" },
  ];

  const certifications = [
    {
      id: 1,
      title: "PADI Open Water",
      category: "Beginner",
      price: 499,
      duration: "3 Days",
      dives: "4 Dives",
      eLearning: true,
      description: "Your diving adventure begins here",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "sage",
      features: [
        "Pool training & theory",
        "Digital learning materials",
        "Lifetime certification card",
      ],
    },
    {
      id: 2,
      title: "Advanced Open Water",
      category: "Advanced",
      price: 375,
      duration: "2 Days",
      dives: "5 Dives",
      eLearning: true,
      description: "Expand your underwater skills",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "ocean",
      features: [
        "Deep diving to 100 feet",
        "Underwater navigation",
        "Specialty dive options",
      ],
    },
    {
      id: 3,
      title: "Rescue Diver",
      category: "Advanced",
      price: 550,
      duration: "3 Days",
      dives: "2 Dives",
      eLearning: true,
      description: "Become a dive leader",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "coral",
      features: [
        "Emergency response training",
        "Rescue scenarios",
        "First aid certification",
      ],
    },
    {
      id: 4,
      title: "Private Instruction",
      category: "Private",
      price: 800,
      duration: "Flexible",
      dives: "4+ Dives",
      eLearning: true,
      description: "One-on-one personalized training",
      image:
        "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "sage",
      features: [
        "Personal instructor",
        "Flexible scheduling",
        "Customized curriculum",
      ],
    },
    {
      id: 5,
      title: "Night Diving Specialty",
      category: "Specialty",
      price: 275,
      duration: "1 Day",
      dives: "3 Dives",
      eLearning: false,
      description: "Explore the underwater world after dark",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "ocean",
      features: [
        "Underwater lighting techniques",
        "Marine life behavior",
        "Safety procedures",
      ],
    },
    {
      id: 6,
      title: "Underwater Photography",
      category: "Specialty",
      price: 325,
      duration: "2 Days",
      dives: "2 Dives",
      eLearning: true,
      description: "Capture the beauty beneath the waves",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "coral",
      features: [
        "Camera techniques",
        "Composition skills",
        "Digital processing",
      ],
    },
  ];

  const filteredCertifications =
    activeFilter === "All"
      ? certifications
      : certifications.filter((cert) => cert.category === activeFilter);

  const filterOptions = [
    { name: "All", icon: Users, color: "ocean" },
    { name: "Beginner", icon: Star, color: "sage" },
    { name: "Advanced", icon: Award, color: "coral" },
    { name: "Private", icon: UserCheck, color: "ocean" },
    { name: "Specialty", icon: BookOpen, color: "sage" },
  ];

  return (
    <div className="min-h-screen">
      {/* Demo Navigation Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm mb-2">
            <span className="text-lg">🎯</span>
            <span className="font-semibold">
              Builder.io + WooCommerce Integration Demos:
            </span>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/demo-mode"
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
            >
              📋 Integration Status
            </Link>
            <Link
              href="/product-demo"
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
            >
              🛍️ Product Demo
            </Link>
            <Link
              href="/api-test"
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
            >
              🔧 API Testing
            </Link>
          </div>
        </div>
      </div>
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        {/* Dynamic Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>

        {/* Floating Bubbles for Underwater Ambiance */}

        {/* Floating Gradient Orbs */}

        {/* Additional floating elements */}

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                <Badge className="bg-white/90 text-coral border-coral/30 backdrop-blur-sm">
                  #1 Rated in Florida Keys
                </Badge>
                <Badge className="bg-white/90 text-ocean border-ocean/30 backdrop-blur-sm">
                  4.9/5 Rating
                </Badge>
                <Badge className="bg-white/90 text-sage border-sage/30 backdrop-blur-sm">
                  Platinum ScubaPro Dealer
                </Badge>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                Key Largo
                <br />
                Scuba Diving
              </h1>

              {/* Hero Slider */}
              <div className="relative">
                {/* Slide Content */}
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    {heroSlides[currentSlide].headline}
                  </h2>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed drop-shadow-md">
                    {heroSlides[currentSlide].subtext}
                  </p>
                  <Button
                    size="lg"
                    className="bg-coral hover:bg-coral/90 text-white font-semibold text-lg px-8 py-4 drop-shadow-lg"
                    onClick={openBooking}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {heroSlides[currentSlide].cta}
                  </Button>
                </div>

                {/* Slider Navigation Dots */}
                <div className="flex justify-center lg:justify-start gap-3 mb-6">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Dynamic Product Showcase */}
            <div className="relative">
              {/* Section 1: Featured Product */}
              <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroSlides[currentSlide].featuredProduct.image}
                  alt={heroSlides[currentSlide].featuredProduct.title}
                  width={1000}
                  height={1000}
                  className="w-full h-80 object-cover transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {heroSlides[currentSlide].featuredProduct.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {heroSlides[currentSlide].featuredProduct.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-2">
                    {heroSlides[currentSlide].featuredProduct.highlights}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      ${heroSlides[currentSlide].featuredProduct.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-coral hover:bg-coral/90 text-white"
                      onClick={openBooking}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-coral text-white">
                  {heroSlides[currentSlide].featuredProduct.badge}
                </Badge>
                <Badge className="absolute top-4 left-4 bg-white/20 text-white backdrop-blur-sm">
                  {heroSlides[currentSlide].featuredProduct.category}
                </Badge>
              </div>

              {/* Section 2: Top 3 Products in Category */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4 text-center">
                  Popular in This Category
                </h4>
                <div className="space-y-4">
                  {heroSlides[currentSlide].topProducts.map(
                    (product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {product.name}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {product.category}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-ocean">
                            {product.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            per person
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Quick Action */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="w-full text-ocean border-ocean hover:bg-ocean hover:text-white text-sm"
                  >
                    View All in Category
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snorkeling Tours Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-ocean/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-ocean/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-coral/10 text-coral border-coral/20">
              Adventures & Tours
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Best Key Largo Dive Trips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the magic beneath the surface with our world-famous
              diving and snorkeling experiences in the crystal-clear waters of
              Key Largo.
            </p>
          </div>

          {/* Adventure Filter Buttons */}
          <div className="mb-12">
            <div className="overflow-x-auto pb-2 mb-8">
              <div className="flex justify-center gap-3 min-w-max">
                {adventureFilterOptions.map((filter) => {
                  const IconComponent = filter.icon;
                  const isActive = activeAdventureFilter === filter.name;
                  const colorClasses = {
                    ocean: isActive
                      ? "bg-ocean text-white border-ocean"
                      : "border-ocean text-ocean hover:bg-ocean hover:text-white",
                    sage: isActive
                      ? "bg-sage text-white border-sage"
                      : "border-sage text-sage hover:bg-sage hover:text-white",
                    coral: isActive
                      ? "bg-coral text-white border-coral"
                      : "border-coral text-coral hover:bg-coral hover:text-white",
                  };

                  return (
                    <Button
                      key={filter.name}
                      variant="outline"
                      className={`${colorClasses[filter.color]} text-sm`}
                      onClick={() => setActiveAdventureFilter(filter.name)}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      <span className="capitalize">
                        {filter.name.replace(/-/g, " ")}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Adventure Cards - animations removed for stability */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 w-max">
              {sortedAdventures.map((adventure) => (
                <EnhancedCard
                  key={adventure.id}
                  className="w-80 flex-shrink-0"
                  hoverScale={1}
                  glowColor="blue"
                  tilting={false}
                >
                  <Link
                    href={(() => {
                      const slugs = (adventure.catSlugs || []).map((s) =>
                        (s || "").toLowerCase(),
                      );
                      const names = (adventure.catNames || []).map((n) =>
                        (n || "").toLowerCase(),
                      );
                      const isSnorkeling =
                        slugs.includes("snorkeling-trips") ||
                        names.some((n) => n.includes("snorkel"));
                      const rawSlug =
                        adventure.slug ||
                        (adventure.permalink || "")
                          .split("/")
                          .filter(Boolean)
                          .pop() ||
                        String(adventure.id);
                      const snorkelish =
                        isSnorkeling ||
                        rawSlug.toLowerCase().includes("snorkel");
                      const href = snorkelish
                        ? `/snorkeling-trips/${rawSlug}`
                        : `/trips/${rawSlug}`;
                      return href;
                    })()}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={adventure.image}
                        alt={adventure.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                      <div className="absolute inset-0 p-4 text-white flex flex-col justify-end">
                        <Badge className="bg-white/20 text-white mb-2 w-fit text-xs">
                          {adventure.category}
                        </Badge>
                        <h3 className="text-lg font-bold text-white">
                          {adventure.title}
                        </h3>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 rounded-lg px-3 py-1">
                        <span className="text-white font-semibold">
                          ${adventure.price}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(adventure.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-sm">
                        {adventure.rating}
                      </span>
                      <span className="text-gray-500 text-xs">
                        ({adventure.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {adventure.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-ocean" />
                        <span>{adventure.duration || ""}</span>
                      </div>
                      {(adventure.features || [])
                        .slice(0, 2)
                        .map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <span className="text-green-600">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                    </div>

                    {(() => {
                      const slugs = (adventure.catSlugs || []).map((s) =>
                        (s || "").toLowerCase(),
                      );
                      const names = (adventure.catNames || []).map((n) =>
                        (n || "").toLowerCase(),
                      );
                      const isSnorkeling =
                        slugs.includes("snorkeling-trips") ||
                        names.some((n) => n.includes("snorkel"));
                      const rawSlug =
                        adventure.slug ||
                        (adventure.permalink || "")
                          .split("/")
                          .filter(Boolean)
                          .pop() ||
                        String(adventure.id);
                      const snorkelish =
                        isSnorkeling ||
                        rawSlug.toLowerCase().includes("snorkel");
                      const href = snorkelish
                        ? `/snorkeling-trips/${rawSlug}`
                        : `/trips/${rawSlug}`;
                      return (
                        <Link href={href} className="block w-full">
                          <Button className="w-full bg-coral hover:bg-coral/90 text-white font-semibold text-sm">
                            Book Adventure
                          </Button>
                        </Link>
                      );
                    })()}
                  </div>
                </EnhancedCard>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-ocean hover:bg-ocean/90 text-white font-semibold px-8 py-3"
              onClick={openBooking}
            >
              View All Adventures
            </Button>
          </div>
        </div>
      </section>

      {/* PADI Certifications Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-ocean/5"></div>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-sage/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-ocean/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-ocean/10 text-ocean border-ocean/20">
              PADI Certifications
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Learn to Dive in the{" "}
              <span className="text-ocean">Florida Keys</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your underwater journey with world-class PADI instruction
              from beginner to professional levels.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filterOptions.map((filter) => {
                const IconComponent = filter.icon;
                const isActive = activeFilter === filter.name;
                const colorClasses = {
                  ocean: isActive
                    ? "bg-ocean text-white border-ocean"
                    : "border-ocean text-ocean hover:bg-ocean hover:text-white",
                  sage: isActive
                    ? "bg-sage text-white border-sage"
                    : "border-sage text-sage hover:bg-sage hover:text-white",
                  coral: isActive
                    ? "bg-coral text-white border-coral"
                    : "border-coral text-coral hover:bg-coral hover:text-white",
                };

                return (
                  <Button
                    key={filter.name}
                    variant="outline"
                    className={colorClasses[filter.color]}
                    onClick={() => setActiveFilter(filter.name)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {filter.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Cards Container - Mobile Scroll */}
          <div className="overflow-x-auto pb-4">
            <div
              className={`flex md:grid gap-6 w-max md:w-full ${
                filteredCertifications.length <= 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-4"
              }`}
            >
              {filteredCertifications.map((cert) => {
                return (
                  <Card
                    key={cert.id}
                    className="overflow-hidden border border-gray-200 shadow-lg w-72 md:w-auto flex-shrink-0 relative group hover:shadow-xl transition-all duration-300"
                  >
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-blue-500 z-10"></div>

                    {/* Category Icon in Corner */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center z-20 shadow-md">
                      {cert.category === "Beginner" && (
                        <Star className="w-3 h-3 text-blue-600" />
                      )}
                      {cert.category === "Advanced" && (
                        <Award className="w-3 h-3 text-blue-600" />
                      )}
                      {cert.category === "Private" && (
                        <UserCheck className="w-3 h-3 text-blue-600" />
                      )}
                      {cert.category === "Specialty" && (
                        <BookOpen className="w-3 h-3 text-blue-600" />
                      )}
                    </div>

                    {/* Image section */}
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={cert.image}
                        alt={`${cert.title} Training`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50"></div>
                      <div className="absolute inset-0 p-4 text-white flex flex-col justify-between">
                        {/* Top info tags */}
                        <div className="flex gap-2">
                          <div className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-blue-500 text-white">
                            <Clock className="w-3 h-3" />
                            {cert.duration}
                          </div>
                          <div className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-blue-500 text-white">
                            <Users className="w-3 h-3" />
                            {cert.dives}
                          </div>
                        </div>

                        {/* Bottom content */}
                        <div>
                          <Badge className="bg-white/20 text-white mb-1 w-fit text-xs">
                            {cert.category}
                          </Badge>
                          <h3 className="text-lg font-bold text-white">
                            {cert.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Content section with colored accent */}
                    <div className="p-4 bg-gradient-to-b from-white to-gray-50/30">
                      {/* Top border accent */}
                      <div className="h-1 w-full mb-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>

                      {/* Price and E-Learning Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-2xl font-bold text-gray-900">
                          ${cert.price}
                        </div>
                        {cert.eLearning && (
                          <div className="px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 bg-blue-100 text-blue-700">
                            <BookOpen className="w-3 h-3" />
                            E-Learning
                          </div>
                        )}
                      </div>

                      {/* Key features with colored checkmarks */}
                      <div className="space-y-2 mb-4">
                        {cert.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm text-blue-600">✓</span>
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full text-white font-semibold text-sm py-2 relative overflow-hidden group bg-blue-600 hover:bg-blue-700">
                        <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <span className="relative z-10">
                          {cert.category === "Private"
                            ? "Book Session"
                            : cert.category === "Specialty"
                              ? "Learn More"
                              : cert.category === "Beginner"
                                ? "Start Now"
                                : "Book Course"}
                        </span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-ocean hover:bg-ocean/90 text-white font-semibold px-8 py-3"
              onClick={openBooking}
            >
              View All Certifications
            </Button>
          </div>
        </div>
      </section>

      {/* Dive Shop Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sage/5 to-gray-50/50"></div>

        {/* Subtle Equipment Icons Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
            <g className="text-sage">
              <rect
                x="100"
                y="100"
                width="20"
                height="40"
                rx="2"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <rect
                x="700"
                y="200"
                width="25"
                height="35"
                rx="2"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <rect
                x="300"
                y="350"
                width="18"
                height="45"
                rx="2"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <rect
                x="850"
                y="450"
                width="22"
                height="38"
                rx="2"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </g>
            <g className="text-ocean">
              <circle
                cx="200"
                cy="250"
                r="15"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="600"
                cy="150"
                r="18"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="450"
                cy="450"
                r="12"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle
                cx="800"
                cy="350"
                r="16"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </g>
          </svg>
        </div>

        {/* Hexagonal Pattern */}
        <div className="absolute inset-0 opacity-[0.008]">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="hexagons"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="10,2 18,7 18,13 10,18 2,13 2,7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-coral"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-0 w-96 h-96 bg-ocean/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-sage/10 text-sage border-sage/20">
              Professional Dive Shop
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Platinum Dealer & Full Service{" "}
              <span className="text-sage">Dive Shop</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Brick & mortar store with shipping warehouse. Platinum dealer
              status for premium brands and professional equipment service.
            </p>
          </div>

          {/* Featured Scuba Gear Products */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Featured Scuba Gear
              </h3>
              <p className="text-gray-600">
                Premium equipment from our platinum dealer partners
              </p>
            </div>

            {/* Product Cards Grid */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 w-max md:w-full md:grid md:grid-cols-6">
                {/* ScubaPro MK25 Regulator */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-48 flex-shrink-0">
                  <div className="relative h-32 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                      alt="ScubaPro MK25 Regulator"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                      ScubaPro
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    MK25 EVO Regulator
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    Professional Grade
                  </p>
                  <div className="text-lg font-bold text-ocean">$649</div>
                </div>

                {/* ScubaPro Hydros Pro BCD */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-48 flex-shrink-0">
                  <div className="relative h-32 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                      alt="ScubaPro Hydros Pro BCD"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                      ScubaPro
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    Hydros Pro BCD
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">Modular Design</p>
                  <div className="text-lg font-bold text-ocean">$459</div>
                </div>

                {/* Ocean Reef Neptune Space G.divers */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-48 flex-shrink-0">
                  <div className="relative h-32 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                      alt="Ocean Reef Neptune Space"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-teal-600 text-white text-xs">
                      Ocean Reef
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    Neptune Space G.divers
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">Full Face Mask</p>
                  <div className="text-lg font-bold text-ocean">$749</div>
                </div>

                {/* ScubaPro Seawing Nova Fins */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-48 flex-shrink-0">
                  <div className="relative h-32 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                      alt="ScubaPro Seawing Nova Fins"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                      ScubaPro
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    Seawing Nova Fins
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    Advanced Propulsion
                  </p>
                  <div className="text-lg font-bold text-ocean">$179</div>
                </div>

                {/* Ocean Reef Diving Mask */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-48 flex-shrink-0">
                  <div className="relative h-32 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                      alt="Ocean Reef Aria Classic"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-teal-600 text-white text-xs">
                      Ocean Reef
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    Aria Classic Mask
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">Low Volume</p>
                  <div className="text-lg font-bold text-ocean">$89</div>
                </div>

                {/* ScubaPro Wetsuit */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-48 flex-shrink-0">
                  <div className="relative h-32 mb-3 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                      alt="ScubaPro Definition Wetsuit"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                      ScubaPro
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    Definition 3mm Wetsuit
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">Tropical Diving</p>
                  <div className="text-lg font-bold text-ocean">$299</div>
                </div>
              </div>
            </div>

            {/* Dealer Status Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">
                  Platinum ScubaPro Dealer
                </span>
              </div>
              <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2">
                <Shield className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-teal-900">
                  Platinum Ocean Reef Dealer
                </span>
              </div>
            </div>
          </div>

          {/* Shop Services */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-ocean/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Brick & Mortar Store
              </h3>
              <p className="text-gray-600 mb-4">
                Full retail dive shop with complete equipment selection, fitting
                rooms, and expert staff
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Complete gear selection</li>
                <li>• Professional fitting</li>
                <li>• Expert recommendations</li>
                <li>• Try before you buy</li>
              </ul>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Equipment Service
              </h3>
              <p className="text-gray-600 mb-4">
                Factory-certified technicians providing professional equipment
                service and repairs
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Regulator service</li>
                <li>• BCD repairs</li>
                <li>• Tank inspections</li>
                <li>• Warranty work</li>
              </ul>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-sage/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-sage" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Shipping Warehouse
              </h3>
              <p className="text-gray-600 mb-4">
                Full shipping capabilities with fast delivery anywhere in the
                United States
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Nationwide shipping</li>
                <li>• Same-day processing</li>
                <li>• Secure packaging</li>
                <li>• Order tracking</li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 bg-gradient-to-r from-ocean/5 to-sage/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Visit Our Pro Shop
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Stop by our retail location or browse our online store. Our expert
              staff can help you find the perfect equipment for your diving
              adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-ocean hover:bg-ocean/90 text-white font-semibold px-8 py-3"
              >
                <Store className="w-5 h-5 mr-2" />
                Visit Store
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sage text-sage hover:bg-sage hover:text-white font-semibold px-8 py-3"
              >
                <Package className="w-5 h-5 mr-2" />
                Shop Online
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Private Charters Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-sage/10"></div>

        {/* Luxury Yacht Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
            <path
              d="M100,300 Q200,280 300,300 Q400,320 500,300"
              stroke="currentColor"
              strokeWidth="1"
              className="text-sage"
              fill="none"
            />
            <path
              d="M600,200 Q700,180 800,200 Q900,220 1000,200"
              stroke="currentColor"
              strokeWidth="1"
              className="text-coral"
              fill="none"
            />
            <path
              d="M50,450 Q150,430 250,450 Q350,470 450,450"
              stroke="currentColor"
              strokeWidth="1"
              className="text-ocean"
              fill="none"
            />
            <circle
              cx="150"
              cy="200"
              r="3"
              fill="currentColor"
              className="text-sage"
            />
            <circle
              cx="750"
              cy="350"
              r="3"
              fill="currentColor"
              className="text-coral"
            />
            <circle
              cx="350"
              cy="500"
              r="3"
              fill="currentColor"
              className="text-ocean"
            />
          </svg>
        </div>

        {/* Diamond Pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="diamonds"
                width="15"
                height="15"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="7.5,2 12,7.5 7.5,13 3,7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-sage"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diamonds)" />
          </svg>
        </div>

        <div className="absolute top-0 left-1/3 w-64 h-64 bg-coral/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-sage/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-sage/10 text-sage border-sage/20">
              Luxury Charters
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Private Charter Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create unforgettable memories with our exclusive private charter
              experiences tailored to your group.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Family Charter */}
            <Card className="overflow-hidden border border-gray-200 shadow-lg">
              <div className="bg-sage p-8 text-white">
                <Badge className="bg-white/20 text-white mb-4">Family</Badge>
                <h3 className="text-3xl font-bold mb-4">
                  Family Adventure Charter
                </h3>
                <p className="text-white/90 text-lg mb-6">
                  Perfect for families and groups up to 12
                </p>
                <div className="text-4xl font-bold">$1,200</div>
                <div className="text-white/80">for 6 hours</div>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-sage text-lg mt-1">✓</span>
                    <span className="text-gray-700">
                      Private yacht with captain & crew
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage text-lg mt-1">✓</span>
                    <span className="text-gray-700">
                      Snorkeling equipment for all ages
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage text-lg mt-1">✓</span>
                    <span className="text-gray-700">
                      Gourmet lunch & refreshments
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sage text-lg mt-1">✓</span>
                    <span className="text-gray-700">
                      Professional photography
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-sage hover:bg-sage/90 text-white font-semibold py-3 text-lg"
                  onClick={openBooking}
                >
                  Book Family Charter
                </Button>
              </div>
            </Card>

            {/* Luxury Charter */}
            <Card className="overflow-hidden border border-gray-200 shadow-lg">
              <div className="bg-coral p-8 text-white">
                <Badge className="bg-white/20 text-white mb-4">VIP</Badge>
                <h3 className="text-3xl font-bold mb-4">VIP Luxury Charter</h3>
                <p className="text-white/90 text-lg mb-6">
                  Ultimate luxury for up to 8 guests
                </p>
                <div className="text-4xl font-bold">$2,500</div>
                <div className="text-white/80">for 8 hours</div>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-coral text-lg mt-1">✓</span>
                    <span className="text-gray-700">
                      Luxury yacht with premium amenities
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-coral text-lg mt-1">✓</span>
                    <span className="text-gray-700">
                      Personal dive master & concierge
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-coral text-lg mt-1">✓</span>
                    <span className="text-gray-700">
                      Champagne service & gourmet dining
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-coral text-lg mt-1">��</span>
                    <span className="text-gray-700">
                      Exclusive dive sites & activities
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-coral hover:bg-coral/90 text-white font-semibold py-3 text-lg"
                  onClick={openBooking}
                >
                  Book VIP Charter
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative bg-ocean text-white overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Dive Into Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join thousands of adventurers who have discovered the magic of Key
            Largo&apos;s underwater world with us.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-coral hover:bg-coral/90 text-white font-semibold px-8 py-3"
              onClick={openBooking}
            >
              Book Snorkeling Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-ocean font-semibold px-8 py-3"
              onClick={openBooking}
            >
              Explore Dive Trips
            </Button>
            <Button
              size="lg"
              className="bg-sage hover:bg-sage/90 text-white font-semibold px-8 py-3"
              onClick={openBooking}
            >
              Get Certified
            </Button>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 inline-block border border-white/20">
            <p className="text-white/90 mb-3 text-lg">
              Questions? We&apos;re here to help!
            </p>
            <p className="text-3xl font-bold mb-3">(305) 555-DIVE</p>
            <p className="text-white/80">
              Open 7 days a week • 7:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0 border-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8 p-0"
              onClick={closeBooking}
            >
              <X className="w-4 h-4" />
            </Button>
            <Booking />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
