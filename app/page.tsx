"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [activeAdventureFilter, setActiveAdventureFilter] = useState("All");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

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
      subtext: "Crystal clear waters ⚓ 50+ dive sites • Year-round diving",
      cta: "Discover What's Below",
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

  const adventures = [
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

  const filteredAdventures =
    activeAdventureFilter === "All"
      ? adventures
      : adventures.filter(
          (adventure) => adventure.category === activeAdventureFilter,
        );

  const adventureFilterOptions = [
    { name: "All", icon: Users, color: "ocean" },
    { name: "Snorkeling Trips", icon: Waves, color: "coral" },
    { name: "Reef Dive Trips", icon: Fish, color: "sage" },
    { name: "Wreck Dive Trips", icon: Ship, color: "ocean" },
    { name: "Night Dives", icon: Moon, color: "coral" },
    { name: "Spearfishing Trips", icon: Target, color: "sage" },
    { name: "Lobster Trips", icon: Zap, color: "coral" },
    { name: "Private Charters", icon: Anchor, color: "ocean" },
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

      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-900">
              Key Largo Diving
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Tours</Link>
              <Link href="/certification" className="text-gray-700 hover:text-blue-600">Certification</Link>
              <Link href="/equipment" className="text-gray-700 hover:text-blue-600">Equipment</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Book Now
            </Button>
          </div>
        </div>
      </nav>

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
        <FloatingBubbles />

        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/6 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                <Badge className="bg-white/90 text-orange-600 border-orange-300 backdrop-blur-sm">
                  #1 Rated in Florida Keys
                </Badge>
                <Badge className="bg-white/90 text-blue-600 border-blue-300 backdrop-blur-sm">
                  4.9/5 Rating
                </Badge>
                <Badge className="bg-white/90 text-green-600 border-green-300 backdrop-blur-sm">
                  Platinum ScubaPro Dealer
                </Badge>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight drop-shadow-lg">
                <span className="text-white">Key Largo</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent font-black">
                  Scuba Diving
                </span>
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
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 drop-shadow-lg"
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
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={openBooking}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
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
                          <div className="font-bold text-blue-600">
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
                    className="w-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white text-sm"
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-600 border-orange-200">
              Adventures & Tours
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Underwater Paradise Awaits
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
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
                    sage: isActive
                      ? "bg-green-600 text-white border-green-600"
                      : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
                    coral: isActive
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
                  };

                  return (
                    <Button
                      key={filter.name}
                      variant="outline"
                      className={`${colorClasses[filter.color]} text-sm`}
                      onClick={() => setActiveAdventureFilter(filter.name)}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {filter.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Adventure Cards */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 w-max">
              {filteredAdventures.map((adventure) => (
                <Card
                  key={adventure.id}
                  className="w-80 flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{adventure.duration}</span>
                      </div>
                      {adventure.features.slice(0, 2).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <span className="text-green-600">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transform hover:scale-105 transition-all duration-300">
                      Book Adventure
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3"
              onClick={openBooking}
            >
              View All Adventures
            </Button>
          </div>
        </div>
      </section>

      {/* PADI Certifications Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-blue-50"></div>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 border-blue-200">
              PADI Certifications
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Learn to Dive in the{" "}
              <span className="text-blue-600">Florida Keys</span>
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
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
                  sage: isActive
                    ? "bg-green-600 text-white border-green-600"
                    : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
                  coral: isActive
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3"
              onClick={openBooking}
            >
              View All Certifications
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Dive In?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied divers who have experienced the magic of Key Largo's underwater world
          </p>
          <Button 
            onClick={openBooking}
            className="bg-white text-blue-600 font-semibold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Adventure Today
          </Button>
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold mb-4">Book Your Adventure</h3>
            <p className="text-gray-600 mb-6">
              Ready to experience the magic of Key Largo diving?
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Call (305) 555-DIVE
              </Button>
              <Button variant="outline" className="w-full">
                Email Us
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
