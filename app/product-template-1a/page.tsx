"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../client/components/ui/button";
import { Badge } from "../../client/components/ui/badge";
import { Card, CardContent } from "../../client/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../client/components/ui/collapsible";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Users,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Gift,
  CreditCard,
  Zap,
  Palette,
} from "lucide-react";

// Sample product data - replace with actual data
const sampleProduct = {
  id: "SP-EVERFLEX-WETSUIT",
  name: "ScubaPro Everflex 5/4mm Wetsuit",
  brand: "ScubaPro",
  price: 249.99,
  originalPrice: 299.99,
  discount: 17,
  rating: 4.8,
  reviewCount: 247,
  availability: "In Stock",
  shipsIn: "1-2 business days",
  categories: ["Wetsuits", "Thermal Protection", "ScubaPro"],
  images: {
    "Black/Blue": [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    "Black/Red": [
      "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    "All Black": [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  colors: [
    { name: "Black/Blue", hex: "#1e40af", available: true },
    { name: "Black/Red", hex: "#dc2626", available: true },
    { name: "All Black", hex: "#1f2937", available: true },
  ],
  sizes: [
    {
      name: "XS",
      chest: '32-34"',
      waist: '28-30"',
      available: true,
      price: 249.99,
    },
    {
      name: "S",
      chest: '34-36"',
      waist: '30-32"',
      available: true,
      price: 249.99,
    },
    {
      name: "M",
      chest: '36-38"',
      waist: '32-34"',
      available: true,
      price: 249.99,
    },
    {
      name: "L",
      chest: '38-40"',
      waist: '34-36"',
      available: true,
      price: 249.99,
    },
    {
      name: "XL",
      chest: '40-42"',
      waist: '36-38"',
      available: true,
      price: 249.99,
    },
    {
      name: "XXL",
      chest: '42-44"',
      waist: '38-40"',
      available: false,
      price: 269.99,
    },
  ],
  features: [
    "Balanced diaphragm first stage design",
    "Environmental seal for cold water diving",
    "High-flow rate: 5,800 L/min at 200 bar",
    "Five low-pressure ports plus one high-pressure port",
    "Compatible with Nitrox up to 40% oxygen",
    "Professional grade construction",
  ],
  specs: {
    Weight: "1.2 kg (2.6 lbs)",
    Material: "Marine-grade brass and stainless steel",
    "Working Pressure": "300 bar (4,351 psi)",
    "Flow Rate": "5,800 L/min at 200 bar",
    "Temperature Range": "-2°C to 50°C (28°F to 122°F)",
    Certification: "CE, ANSI/ACDE",
  },
};

const relatedProducts = [
  {
    id: "SP-HYDROS-PRO",
    name: "ScubaPro Hydros Pro BCD",
    price: 459.99,
    originalPrice: 529.99,
    rating: 4.7,
    reviewCount: 189,
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Best Seller",
  },
  {
    id: "SP-SEAWING-NOVA",
    name: "ScubaPro Seawing Nova Fins",
    price: 179.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "New",
  },
  {
    id: "SP-DEFINITION-WETSUIT",
    name: "ScubaPro Definition 3mm Wetsuit",
    price: 299.99,
    rating: 4.5,
    reviewCount: 98,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "OR-NEPTUNE-SPACE",
    name: "Ocean Reef Neptune Space G.divers",
    price: 749.99,
    originalPrice: 849.99,
    rating: 4.9,
    reviewCount: 67,
    image:
      "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Premium",
  },
];

const reviews = [
  {
    id: 1,
    author: "Mike Johnson",
    rating: 5,
    date: "January 15, 2024",
    verified: true,
    title: "Excellent regulator for technical diving",
    content:
      "I've been using this regulator for over a year now on technical dives up to 60m. The breathing performance is exceptional even at depth, and the build quality is outstanding. Highly recommend for serious divers.",
    helpful: 23,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    ],
  },
  {
    id: 2,
    author: "Sarah Martinez",
    rating: 4,
    date: "December 3, 2023",
    verified: true,
    title: "Great performance, slightly heavy",
    content:
      "The regulator performs very well underwater with smooth breathing. The only downside is it's a bit heavier than my previous reg, but the performance makes up for it. Good value for money.",
    helpful: 15,
  },
  {
    id: 3,
    author: "David Chen",
    rating: 5,
    date: "November 20, 2023",
    verified: true,
    title: "Professional grade quality",
    content:
      "As a dive instructor, I need reliable equipment. This regulator has performed flawlessly in all conditions - warm water, cold water, and everything in between. Worth every penny.",
    helpful: 31,
  },
];

export default function ProductTemplate1a() {
  const [selectedColor, setSelectedColor] = useState("Black/Blue");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [mounted, setMounted] = useState(false);

  // States for collapsible sections
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isQaOpen, setIsQaOpen] = useState(false);

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    setIsDescriptionOpen(true); // Open product details by default after mounting
  }, []);

  const currentImages =
    sampleProduct.images[selectedColor] || sampleProduct.images["Black/Blue"];
  const selectedSizeData = sampleProduct.sizes.find(
    (s) => s.name === selectedSize,
  );
  const selectedColorData = sampleProduct.colors.find(
    (c) => c.name === selectedColor,
  );

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              ScubaGear Pro
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <Heart className="w-4 h-4 mr-2" />
                Lists
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600 hover:underline">
              Home
            </Link>
            <span className="mx-2 text-gray-300">›</span>
            <Link
              href="/scuba-gear"
              className="hover:text-orange-600 hover:underline"
            >
              Scuba Gear
            </Link>
            <span className="mx-2 text-gray-300">›</span>
            <Link
              href="/wetsuits"
              className="hover:text-orange-600 hover:underline"
            >
              Wetsuits
            </Link>
            <span className="mx-2 text-gray-300">›</span>
            <span className="text-gray-900 font-medium">
              {sampleProduct.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Images - Sticky on desktop only */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 shadow-lg group">
              <Image
                src={currentImages[selectedImage]}
                alt={`${sampleProduct.name} in ${selectedColor}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Discount Badge */}
              {sampleProduct.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white font-semibold px-3 py-1 shadow-md">
                  -{sampleProduct.discount}% OFF
                </Badge>
              )}

              {/* Image Navigation */}
              <button
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                disabled={selectedImage === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedImage(
                    Math.min(currentImages.length - 1, selectedImage + 1),
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                disabled={selectedImage === currentImages.length - 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {currentImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedImage === index
                      ? "border-orange-500 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              <Link
                href={`/brand/${sampleProduct.brand.toLowerCase()}`}
                className="inline-block"
              >
                <p className="text-blue-700 font-semibold mb-3 hover:underline">
                  {sampleProduct.brand}
                </p>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {sampleProduct.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {renderStars(sampleProduct.rating)}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {sampleProduct.rating}
                </span>
                <Link
                  href="#reviews"
                  className="text-blue-700 hover:text-blue-800 hover:underline font-medium"
                >
                  {sampleProduct.reviewCount} ratings
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-600">
                  #1 Best Seller in Wetsuits
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-3 pb-4 border-b border-gray-200">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-medium text-gray-900">
                  ${selectedSizeData?.price || sampleProduct.price}
                </span>
                {sampleProduct.originalPrice > sampleProduct.price && (
                  <span className="text-lg text-gray-500 line-through">
                    List: ${sampleProduct.originalPrice}
                  </span>
                )}
              </div>

              {/* Savings */}
              {sampleProduct.discount > 0 && (
                <div className="flex items-center gap-2">
                  <p className="text-red-700 font-semibold">
                    Save $
                    {(
                      sampleProduct.originalPrice - sampleProduct.price
                    ).toFixed(2)}{" "}
                    ({sampleProduct.discount}%)
                  </p>
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    Limited time
                  </Badge>
                </div>
              )}

              <div className="text-sm text-gray-600">
                <span>Award-winning customer service</span>
                <span className="mx-2">•</span>
                <span>Expert diving advice</span>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-900">Color: </span>
                <span className="text-gray-700 font-medium">
                  {selectedColor}
                </span>
              </div>

              <div className="flex gap-2">
                {sampleProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setSelectedImage(0);
                    }}
                    disabled={!color.available}
                    className={`group relative w-14 h-14 rounded-lg border-2 transition-all shadow-sm hover:shadow-md ${
                      selectedColor === color.name
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-gray-300 hover:border-gray-400"
                    } ${!color.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div
                      className="w-full h-full rounded-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor === color.name && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {!color.available && (
                      <div className="absolute inset-0 bg-white/70 rounded-md flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          Out
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-900">Size: </span>
                  <span className="text-gray-700 font-medium">
                    {selectedSize}
                  </span>
                </div>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-blue-700 hover:text-blue-800 text-sm font-medium hover:underline"
                >
                  Size chart
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {sampleProduct.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`p-4 border rounded-lg text-center transition-all font-medium ${
                      selectedSize === size.name
                        ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200"
                        : size.available
                          ? "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <div className="font-semibold text-lg">{size.name}</div>
                    {!size.available && (
                      <div className="text-xs text-red-600 mt-1">
                        Currently unavailable
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {showSizeChart && selectedSizeData && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">
                    Size {selectedSize} measurements
                  </h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <strong>Chest:</strong> {selectedSizeData.chest}
                    </p>
                    <p>
                      <strong>Waist:</strong> {selectedSizeData.waist}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Availability and Shipping */}
            <div className="space-y-3 py-4 border-y border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">
                  {sampleProduct.availability}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-900">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Free Delivery</span>
                </div>
                <div className="text-sm text-gray-600 ml-7">
                  Order within{" "}
                  <span className="text-green-700 font-semibold">
                    3 hrs 42 mins
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-900">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Pick-up Today In-Store</span>
                <span className="font-bold text-orange-700">FREE</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">
                  FREE Returns through Jan 31, 2025
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900">
                About this item
              </h3>
              <ul className="space-y-3">
                {sampleProduct.features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#description"
                className="inline-flex items-center text-blue-700 hover:text-blue-800 hover:underline font-medium text-sm"
              >
                See more product details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold bg-gray-50 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold text-base py-3 rounded-full shadow-md hover:shadow-lg transition-all">
                  Add to Cart
                </Button>

                <Button className="w-full bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base py-3 rounded-full shadow-md hover:shadow-lg transition-all">
                  Buy Now
                </Button>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg"
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                    />
                    Add to List
                  </Button>

                  <Button
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">
                    2-Year Warranty
                  </p>
                  <p className="text-xs text-gray-600">Manufacturer</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-600">Free 30 days</p>
                </div>
                <div className="text-center">
                  <CreditCard className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-600">SSL encrypted</p>
                </div>
              </div>
            </div>

            {/* Product Details Collapsible Sections */}
            <div className="space-y-4 mt-8">
              {/* Product Description */}
              <Collapsible
                open={mounted && isDescriptionOpen}
                onOpenChange={setIsDescriptionOpen}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-900">
                      Product Details
                    </span>
                    {mounted && isDescriptionOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg">
                    <div className="prose max-w-none">
                      <p className="mb-4 text-gray-700">
                        The ScubaPro MK25 EVO represents the pinnacle of
                        regulator technology, designed for serious divers who
                        demand the highest performance and reliability. This
                        balanced diaphragm first stage delivers exceptional
                        breathing performance at any depth or breathing rate.
                      </p>
                      <p className="mb-4 text-gray-700">
                        Features include an environmental seal for cold water
                        diving, high-flow performance, and multiple port
                        configurations. The MK25 EVO is compatible with Nitrox
                        up to 40% oxygen and meets all major international
                        diving standards.
                      </p>

                      <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">
                        Complete Features:
                      </h4>
                      <ul className="list-disc pl-6 space-y-1">
                        {sampleProduct.features.map((feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Specifications */}
              <Collapsible
                open={mounted && isSpecsOpen}
                onOpenChange={setIsSpecsOpen}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-900">
                      Specifications
                    </span>
                    {mounted && isSpecsOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg">
                    <div className="grid md:grid-cols-1 gap-4">
                      {Object.entries(sampleProduct.specs).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between border-b border-gray-200 pb-2"
                          >
                            <span className="font-medium text-gray-900">
                              {key}:
                            </span>
                            <span className="text-gray-700">{value}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Reviews */}
              <Collapsible
                open={mounted && isReviewsOpen}
                onOpenChange={setIsReviewsOpen}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-900">
                      Reviews ({sampleProduct.reviewCount})
                    </span>
                    {mounted && isReviewsOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg">
                    <div className="space-y-6">
                      {/* Review Summary */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-gray-900">
                            Customer Reviews
                          </h4>
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl font-bold text-gray-900">
                              {sampleProduct.rating}
                            </span>
                            <div>
                              <div className="flex items-center mb-1">
                                {renderStars(sampleProduct.rating)}
                              </div>
                              <p className="text-gray-600">
                                {sampleProduct.reviewCount} total reviews
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-3 text-gray-900">
                            Rating Breakdown
                          </h5>
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div
                              key={star}
                              className="flex items-center gap-2 mb-2"
                            >
                              <span className="text-sm w-8 text-gray-700">
                                {star}★
                              </span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{
                                    width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm text-gray-500 w-8">
                                {star === 5
                                  ? 70
                                  : star === 4
                                    ? 20
                                    : star === 3
                                      ? 7
                                      : star === 2
                                        ? 2
                                        : 1}
                                %
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Individual Reviews */}
                      <div className="space-y-4">
                        {reviews.slice(0, 2).map((review) => (
                          <div
                            key={review.id}
                            className="bg-white p-4 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900">
                                    {review.author}
                                  </span>
                                  {review.verified && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Verified Purchase
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <h5 className="font-medium mb-2 text-gray-900">
                              {review.title}
                            </h5>
                            <p className="text-gray-700 text-sm">
                              {review.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Questions & Answers */}
              <Collapsible
                open={mounted && isQaOpen}
                onOpenChange={setIsQaOpen}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-900">
                      Questions & Answers
                    </span>
                    {mounted && isQaOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg">
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 pb-4">
                        <h5 className="font-medium mb-2 text-gray-900">
                          Q: Is this regulator suitable for cold water diving?
                        </h5>
                        <p className="text-gray-700 mb-2 text-sm">
                          A: Yes, the MK25 EVO features an environmental seal
                          specifically designed for cold water conditions. It's
                          tested and certified for diving in temperatures as low
                          as -2°C (28°F).
                        </p>
                        <p className="text-xs text-gray-500">
                          Answered by ScubaGear Pro Expert • 3 days ago
                        </p>
                      </div>

                      <div className="border-b border-gray-200 pb-4">
                        <h5 className="font-medium mb-2 text-gray-900">
                          Q: What's included in the box?
                        </h5>
                        <p className="text-gray-700 mb-2 text-sm">
                          A: The package includes the MK25 EVO first stage, user
                          manual, warranty card, and a protective dust cap.
                          Second stage, octopus, and pressure gauge are sold
                          separately.
                        </p>
                        <p className="text-xs text-gray-500">
                          Answered by Product Specialist • 1 week ago
                        </p>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Ask a Question
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">
            Customers who bought this item also bought
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">${product.price}</span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-3 bg-orange-500 hover:bg-orange-600"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-16 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recently Viewed</h3>
          <div className="flex gap-4 overflow-x-auto">
            {relatedProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="flex-shrink-0 w-32">
                <div className="relative aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-medium line-clamp-2">
                  {product.name}
                </p>
                <p className="text-sm font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
