"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../client/components/ui/button";
import { Badge } from "../../client/components/ui/badge";
import { Card, CardContent, CardHeader } from "../../client/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../client/components/ui/tabs";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  MessageCircle,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Bookmark,
  Scale,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Zap,
  Info,
  Camera,
  Play,
  Download,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  User,
  Settings,
  Palette,
} from "lucide-react";

// Sample product data with community features
const sampleProduct = {
  id: "AL-LEGEND-LX-REG",
  name: "Aqua Lung Legend LX Supreme Regulator",
  brand: "Aqua Lung",
  price: 599.99,
  originalPrice: 649.99,
  rating: 4.7,
  reviewCount: 284,
  communityRating: 4.8,
  communityReviews: 156,
  expertRating: 4.6,
  availability: "In Stock",
  categoryRank: 3,
  categories: ["Regulators", "Life Support", "Recreational"],
  images: {
    Standard: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    Yoke: [
      "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    DIN: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  configurations: [
    {
      name: "Standard",
      description: "Yoke connection",
      price: 599.99,
      available: true,
    },
    {
      name: "Yoke",
      description: "International Yoke (A-clamp)",
      price: 599.99,
      available: true,
    },
    {
      name: "DIN",
      description: "DIN 300 bar connection",
      price: 629.99,
      available: true,
    },
  ],
  colors: [
    { name: "Black", hex: "#1a1a1a", available: true },
    { name: "Blue", hex: "#2563eb", available: true },
    { name: "Silver", hex: "#9ca3af", available: false },
  ],
  keyFeatures: [
    "Pneumatically balanced first stage",
    "Over-balanced design for depth performance",
    "Heat exchanger for cold water",
    "Adjustable second stage",
    "Nitrox compatible up to 40%",
    "Lifetime free parts warranty",
  ],
  communityInsights: {
    popularWith: ["Recreational Divers", "Technical Divers", "Instructors"],
    bestFor: ["Cold Water", "Deep Diving", "Tropical Diving"],
    difficulty: "Beginner Friendly",
    maintenance: "Easy",
  },
};

const expertReviews = [
  {
    id: 1,
    expert: "Dr. Sarah Mitchell",
    title: "Technical Diving Instructor & Equipment Specialist",
    rating: 4.8,
    date: "2024-01-10",
    summary: "Excellent breathing performance across all conditions",
    pros: [
      "Outstanding cold water performance",
      "Very reliable",
      "Easy to service",
    ],
    cons: ["Slightly heavier than competitors", "Price point"],
    fullReview:
      "After testing this regulator in conditions ranging from tropical waters to 4°C North Atlantic diving, I'm impressed with its consistent performance. The over-balanced design really shines at depth, and the heat exchanger makes it a top choice for cold water diving.",
  },
  {
    id: 2,
    expert: "Mark Thompson",
    title: "Dive Shop Owner & Master Instructor",
    rating: 4.5,
    date: "2024-01-05",
    summary: "Great all-around regulator for recreational diving",
    pros: ["User-friendly", "Good value", "Reliable brand"],
    cons: ["Not as premium feeling as higher-end models"],
    fullReview:
      "We've sold dozens of these to recreational divers, and the feedback has been consistently positive. It's a solid, dependable regulator that performs well for the vast majority of diving activities.",
  },
];

const communityDiscussions = [
  {
    id: 1,
    title: "Legend LX vs ScubaPro MK25 - Which to choose?",
    author: "DiveEnthusiast92",
    replies: 23,
    views: 1240,
    lastActivity: "2 hours ago",
    tags: ["comparison", "beginner"],
  },
  {
    id: 2,
    title: "Cold water performance - Real world experience",
    author: "ColdWaterDiver",
    replies: 15,
    views: 890,
    lastActivity: "1 day ago",
    tags: ["cold-water", "experience"],
  },
  {
    id: 3,
    title: "Service tips and maintenance schedule",
    author: "TechDivePro",
    replies: 8,
    views: 456,
    lastActivity: "3 days ago",
    tags: ["maintenance", "tips"],
  },
];

const comparisonProducts = [
  {
    id: "SP-MK25-EVO",
    name: "ScubaPro MK25 EVO",
    brand: "ScubaPro",
    price: 649.99,
    rating: 4.8,
    reviewCount: 247,
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    pros: ["Industry standard", "Excellent performance"],
    cons: ["Higher price", "Complex service"],
  },
  {
    id: "AP-XTX50",
    name: "Apeks XTX50",
    brand: "Apeks",
    price: 549.99,
    rating: 4.6,
    reviewCount: 189,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    pros: ["Great value", "Technical diving ready"],
    cons: ["Bulkier design", "Learning curve"],
  },
  {
    id: "CR-MIKRON",
    name: "Cressi Mikron",
    brand: "Cressi",
    price: 459.99,
    rating: 4.4,
    reviewCount: 134,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    pros: ["Compact size", "Budget friendly"],
    cons: ["Basic features", "Limited adjustability"],
  },
];

const learningResources = [
  {
    title: "Regulator Buying Guide 2024",
    type: "Article",
    readTime: "8 min read",
    author: "Scuba.com Team",
    thumbnail:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Understanding Regulator Maintenance",
    type: "Video",
    duration: "12:30",
    author: "TechDivePro",
    thumbnail:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Cold Water Diving Equipment Setup",
    type: "Guide",
    readTime: "15 min read",
    author: "Arctic Diver",
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProductTemplate3() {
  const [selectedConfig, setSelectedConfig] = useState("Standard");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [showComparison, setShowComparison] = useState(false);

  const currentImages =
    sampleProduct.images[selectedConfig] || sampleProduct.images["Standard"];
  const selectedConfigData = sampleProduct.configurations.find(
    (c) => c.name === selectedConfig,
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Community Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Scuba.com
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/gear"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Gear
              </Link>
              <Link
                href="/guides"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Guides
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Community
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Courses
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Community Breadcrumb with Social Proof */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="text-sm text-gray-600 flex items-center gap-2">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/regulators" className="hover:text-blue-600">
                Regulators
              </Link>
              <span>/</span>
              <span className="text-gray-900">Aqua Lung Legend LX Supreme</span>
            </nav>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">2,341 views this week</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Trending in Regulators</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Product Section */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Product Images */}
              <div>
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden mb-4 border border-gray-200">
                  <Image
                    src={currentImages[selectedImage]}
                    alt={`${sampleProduct.name} - ${selectedConfig}`}
                    fill
                    className="object-cover"
                  />

                  {/* Community Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white">
                      <Users className="w-3 h-3 mr-1" />
                      Community Choice
                    </Badge>
                  </div>

                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {currentImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedImage === index ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="border-blue-200 text-blue-700"
                    >
                      {sampleProduct.brand}
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-700 border border-orange-200">
                      #{sampleProduct.categoryRank} in Regulators
                    </Badge>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {sampleProduct.name}
                  </h1>

                  {/* Multi-tier Rating System */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(sampleProduct.communityRating)}
                        </div>
                        <span className="font-semibold">
                          {sampleProduct.communityRating}
                        </span>
                        <span className="text-sm text-gray-600">
                          Community ({sampleProduct.communityReviews})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(sampleProduct.expertRating)}
                        </div>
                        <span className="font-semibold">
                          {sampleProduct.expertRating}
                        </span>
                        <span className="text-sm text-gray-600">
                          Expert Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${selectedConfigData?.price || sampleProduct.price}
                    </span>
                    {sampleProduct.originalPrice > sampleProduct.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${sampleProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">
                      {sampleProduct.availability}
                    </span>
                  </div>

                  <div className="text-sm text-blue-700">
                    💡 <strong>Community Tip:</strong> Best price we've seen in
                    6 months
                  </div>
                </div>

                {/* Configuration Selection */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    Configuration: {selectedConfig}
                  </h3>

                  <div className="space-y-2">
                    {sampleProduct.configurations.map((config) => (
                      <button
                        key={config.name}
                        onClick={() => {
                          setSelectedConfig(config.name);
                          setSelectedImage(0);
                        }}
                        disabled={!config.available}
                        className={`w-full p-3 text-left border rounded-lg transition-all ${
                          selectedConfig === config.name
                            ? "border-blue-500 bg-blue-50"
                            : config.available
                              ? "border-gray-200 hover:border-gray-300 bg-white"
                              : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{config.name}</div>
                            <div className="text-sm text-gray-600">
                              {config.description}
                            </div>
                          </div>
                          {config.price !== sampleProduct.price && (
                            <div className="font-semibold">${config.price}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-gray-600" />
                    Color: {selectedColor}
                  </h3>

                  <div className="flex gap-3">
                    {sampleProduct.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        disabled={!color.available}
                        className={`relative w-10 h-10 rounded-lg border-2 transition-all ${
                          selectedColor === color.name
                            ? "border-blue-500 scale-110"
                            : "border-gray-200"
                        } ${!color.available ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div
                          className="w-full h-full rounded-md"
                          style={{ backgroundColor: color.hex }}
                        />
                        {selectedColor === color.name && (
                          <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Community Insights */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Community Insights
                  </h4>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Popular with:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {sampleProduct.communityInsights.popularWith.map(
                          (group, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {group}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-600">Best for:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {sampleProduct.communityInsights.bestFor.map(
                          (use, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {use}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100"
                      >
                        <span className="w-4 h-4 flex items-center justify-center">
                          −
                        </span>
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <span className="w-4 h-4 flex items-center justify-center">
                          +
                        </span>
                      </button>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask Community
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Scale className="w-4 h-4 mr-2" />
                      Compare
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="expert">Expert Reviews</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-semibold">
                        Product Overview
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        The Aqua Lung Legend LX Supreme represents the perfect
                        balance of performance, reliability, and value. Trusted
                        by divers worldwide, this regulator delivers consistent
                        breathing performance from the surface to recreational
                        diving depths.
                      </p>

                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {sampleProduct.keyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="community" className="mt-6">
                <div className="space-y-6">
                  {/* Community Stats */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-semibold">
                        Community Feedback
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {sampleProduct.communityRating}
                          </div>
                          <div className="text-sm text-gray-600">
                            Community Rating
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            87%
                          </div>
                          <div className="text-sm text-gray-600">
                            Would Recommend
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            156
                          </div>
                          <div className="text-sm text-gray-600">Reviews</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            94%
                          </div>
                          <div className="text-sm text-gray-600">
                            Satisfaction
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">
                          Recent Community Reviews
                        </h4>

                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <span className="font-medium">
                                    RecDiver2023
                                  </span>
                                  <div className="flex items-center gap-1">
                                    {renderStars(5)}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                3 days ago
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              "Perfect regulator for recreational diving. Been
                              using it for 8 months now and it's performed
                              flawlessly in tropical and temperate waters. Easy
                              to breathe from and the adjustability is great."
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                                <ThumbsUp className="w-4 h-4" />
                                Helpful (12)
                              </button>
                              <button className="text-blue-600 hover:text-blue-700">
                                Reply
                              </button>
                            </div>
                          </div>

                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <span className="font-medium">
                                    TechDiveMaster
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs"
                                  >
                                    Verified Pro
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    {renderStars(4)}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                1 week ago
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              "Solid choice for most diving scenarios. The
                              over-balanced design works well at depth. Only
                              minor complaint is it's a bit bulkier than some
                              competitors, but that's nitpicking."
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                                <ThumbsUp className="w-4 h-4" />
                                Helpful (8)
                              </button>
                              <button className="text-blue-600 hover:text-blue-700">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Community Discussions */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-semibold">
                        Community Discussions
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {communityDiscussions.map((discussion) => (
                          <div
                            key={discussion.id}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer mb-1">
                                  {discussion.title}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <span>by {discussion.author}</span>
                                  <span>{discussion.replies} replies</span>
                                  <span>{discussion.views} views</span>
                                  <span>{discussion.lastActivity}</span>
                                </div>
                                <div className="flex gap-2">
                                  {discussion.tags.map((tag, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full mt-4">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Start New Discussion
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="expert" className="mt-6">
                <div className="space-y-6">
                  {expertReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {review.expert
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{review.expert}</h4>
                            <p className="text-sm text-gray-600">
                              {review.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="font-medium">
                                {review.rating}
                              </span>
                              <span className="text-sm text-gray-500">
                                • {review.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">
                          {review.fullReview}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-green-700 mb-2">
                              Pros:
                            </h5>
                            <ul className="text-sm space-y-1">
                              {review.pros.map((pro, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-orange-700 mb-2">
                              Cons:
                            </h5>
                            <ul className="text-sm space-y-1">
                              {review.cons.map((con, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <AlertCircle className="w-4 h-4 text-orange-500" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compare" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">
                      Product Comparison
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {comparisonProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {product.brand}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {renderStars(product.rating)}
                                  </div>
                                  <span className="text-sm">
                                    {product.rating}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({product.reviewCount})
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">
                                  ${product.price}
                                </div>
                                <Button size="sm" variant="outline">
                                  Compare
                                </Button>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-green-700">
                                  Pros:
                                </span>
                                <ul className="mt-1 space-y-1">
                                  {product.pros.map((pro, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-1"
                                    >
                                      <CheckCircle className="w-3 h-3 text-green-500" />
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <span className="font-medium text-orange-700">
                                  Cons:
                                </span>
                                <ul className="mt-1 space-y-1">
                                  {product.cons.map((con, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-1"
                                    >
                                      <AlertCircle className="w-3 h-3 text-orange-500" />
                                      {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="qa" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">
                      Questions & Answers
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-medium mb-2">
                          Q: How does this compare to the ScubaPro MK25?
                        </h4>
                        <div className="text-sm text-gray-600 mb-2">
                          Asked by DiveNewbie • 2 days ago
                        </div>
                        <p className="text-gray-700 mb-2">
                          <strong>A:</strong> Both are excellent regulators. The
                          Legend LX offers better value and easier maintenance,
                          while the MK25 has slightly better performance at
                          extreme depths. For recreational diving, the Legend LX
                          is an excellent choice.
                        </p>
                        <div className="text-sm text-gray-600">
                          Answered by TechDivePro • Verified Expert • 1 day ago
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful (15)
                          </button>
                        </div>
                      </div>

                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-medium mb-2">
                          Q: Is this suitable for cold water diving?
                        </h4>
                        <div className="text-sm text-gray-600 mb-2">
                          Asked by ColdWaterDiver • 5 days ago
                        </div>
                        <p className="text-gray-700 mb-2">
                          <strong>A:</strong> Yes! The Legend LX has a heat
                          exchanger that makes it very reliable in cold water
                          conditions. I've used mine in 4°C water without any
                          issues.
                        </p>
                        <div className="text-sm text-gray-600">
                          Answered by ArcticDiver • Community Member • 4 days
                          ago
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful (23)
                          </button>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask a Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expert Recommendation */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Expert Recommendation
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    SM
                  </div>
                  <div>
                    <div className="font-medium">Dr. Sarah Mitchell</div>
                    <div className="text-sm text-gray-600">
                      Technical Diving Instructor
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  "An excellent choice for divers seeking reliability and
                  performance. The Legend LX offers professional-grade features
                  at a reasonable price point."
                </p>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Learn More
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningResources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={resource.thumbnail}
                          alt={resource.title}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">
                          {resource.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.readTime || resource.duration}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          by {resource.author}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Community Activity
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>12 divers discussing this product</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>3 new reviews this week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Featured in "Best Regulators 2024"</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask Expert
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with Friend
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
