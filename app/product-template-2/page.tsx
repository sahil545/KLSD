"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../client/components/ui/button";
import { Badge } from "../../client/components/ui/badge";
import { Card, CardContent } from "../../client/components/ui/card";
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
  Truck,
  Shield,
  Award,
  CheckCircle,
  Download,
  Play,
  Users,
  MapPin,
  Clock,
  ChevronDown,
  Ruler,
  Palette,
  Info,
  Zap,
  Target,
  Settings,
  Camera,
  Globe,
} from "lucide-react";

// Sample product data with size and color options
const sampleProduct = {
  id: "SP-DEFINITION-WETSUIT",
  name: "Definition Steamer 3mm Wetsuit",
  brand: "ScubaPro",
  model: "Definition Series",
  price: 299.99,
  originalPrice: 349.99,
  rating: 4.8,
  reviewCount: 143,
  availability: "In Stock",
  sku: "SP-DEF-3MM-2024",
  categories: ["Wetsuits", "Thermal Protection", "ScubaPro"],
  images: {
    "Black/Blue": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    "Black/Red": [
      "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    "All Black": [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  },
  colors: [
    { name: "Black/Blue", hex: "#1a365d", available: true },
    { name: "Black/Red", hex: "#c53030", available: true },
    { name: "All Black", hex: "#1a202c", available: true },
  ],
  sizes: [
    {
      name: "XS",
      measurements: 'Chest: 32-34"',
      available: true,
      price: 299.99,
    },
    {
      name: "S",
      measurements: 'Chest: 34-36"',
      available: true,
      price: 299.99,
    },
    {
      name: "M",
      measurements: 'Chest: 36-38"',
      available: true,
      price: 299.99,
    },
    {
      name: "L",
      measurements: 'Chest: 38-40"',
      available: true,
      price: 299.99,
    },
    {
      name: "XL",
      measurements: 'Chest: 40-42"',
      available: true,
      price: 299.99,
    },
    {
      name: "XXL",
      measurements: 'Chest: 42-44"',
      available: false,
      price: 329.99,
    },
  ],
  keyFeatures: [
    "Premium 3mm neoprene construction",
    "Diamond span panels for flexibility",
    "Flatlock seams for comfort",
    "Back zipper with long cord",
    "Reinforced knee and shoulder panels",
    "Quick-dry interior lining",
  ],
  technicalSpecs: {
    "Neoprene Thickness": "3mm premium grade",
    "Seam Construction": "Flatlock stitching",
    "Zipper Type": "YKK back zipper with cord",
    "Panel Design": "Diamond span flex panels",
    Lining: "Quick-dry plush interior",
    Reinforcement: "Supratex knee and shoulder panels",
    "Temperature Range": "22-28°C (72-82°F)",
    Certification: "CE approved",
    "Care Instructions": "Cold water wash, hang dry",
    Warranty: "2 years manufacturer warranty",
  },
  sustainability: {
    "Eco Materials": "Limestone-based neoprene",
    "Water-based Glue": "Aqua Alpha adhesive",
    Packaging: "Recycled materials",
    Certification: "Oeko-Tex Standard 100",
  },
};

const relatedProducts = [
  {
    id: "SP-BOOTS-5MM",
    name: "ScubaPro Delta 5mm Boots",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Accessories",
  },
  {
    id: "SP-GLOVES-3MM",
    name: "ScubaPro Everflex 3mm Gloves",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Accessories",
  },
  {
    id: "SP-HOOD-3MM",
    name: "ScubaPro Everflex 3mm Hood",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Accessories",
  },
];

export default function ProductTemplate2() {
  const [selectedColor, setSelectedColor] = useState("Black/Blue");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const currentImages =
    sampleProduct.images[selectedColor] || sampleProduct.images["Black/Blue"];
  const selectedSizeData = sampleProduct.sizes.find(
    (s) => s.name === selectedSize,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Premium Header */}
      <header className="bg-white border-b border-slate-200 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-white font-bold text-xl">SP</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent">
                ScubaPro
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/products"
                className="text-slate-700 hover:text-blue-700 font-semibold transition-colors"
              >
                Products
              </Link>
              <Link
                href="/technology"
                className="text-slate-700 hover:text-blue-700 font-semibold transition-colors"
              >
                Technology
              </Link>
              <Link
                href="/dealers"
                className="text-slate-700 hover:text-blue-700 font-semibold transition-colors"
              >
                Dealers
              </Link>
              <Link
                href="/support"
                className="text-slate-700 hover:text-blue-700 font-semibold transition-colors"
              >
                Support
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="text-sm text-gray-600 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/wetsuits" className="hover:text-blue-600">
              Wetsuits
            </Link>
            <span>/</span>
            <Link href="/wetsuits/3mm" className="hover:text-blue-600">
              3mm Wetsuits
            </Link>
            <span>/</span>
            <span className="text-gray-900">Definition Steamer 3mm</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-6">
              <Image
                src={currentImages[selectedImage]}
                alt={`${sampleProduct.name} in ${selectedColor}`}
                fill
                className="object-cover"
              />

              {/* Image Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {currentImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      selectedImage === index ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* 360° View Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-black/80 text-white">
                  <Camera className="w-3 h-3 mr-1" />
                  360° View
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {currentImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent"
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

            {/* Product Video */}
            <div className="mt-6">
              <button className="w-full aspect-video bg-gray-900 rounded-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Product Overview</p>
                  <p className="text-sm text-white/80">
                    See the Definition Series in action
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-700"
                >
                  {sampleProduct.brand}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-green-200 text-green-700"
                >
                  <Award className="w-3 h-3 mr-1" />
                  Pro Series
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {sampleProduct.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {renderStars(sampleProduct.rating)}
                  <span className="font-semibold">{sampleProduct.rating}</span>
                </div>
                <span className="text-gray-500">
                  ({sampleProduct.reviewCount} reviews)
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-600">
                  SKU: {sampleProduct.sku}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${selectedSizeData?.price || sampleProduct.price}
                </span>
                {sampleProduct.originalPrice > sampleProduct.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${sampleProduct.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-green-600 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  {sampleProduct.availability}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over $199</span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-gray-600" />
                <span className="font-semibold">Color: {selectedColor}</span>
              </div>

              <div className="flex gap-3">
                {sampleProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setSelectedImage(0);
                    }}
                    disabled={!color.available}
                    className={`group relative w-12 h-12 rounded-lg border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-blue-500 scale-110"
                        : "border-gray-200 hover:border-gray-300"
                    } ${!color.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div
                      className="w-full h-full rounded-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor === color.name && (
                      <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                    )}
                    {!color.available && (
                      <div className="absolute inset-0 bg-white/50 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">Out</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold">Size: {selectedSize}</span>
                </div>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {sampleProduct.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`p-3 border rounded-lg text-center transition-all ${
                      selectedSize === size.name
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : size.available
                          ? "border-gray-200 hover:border-gray-300"
                          : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <div className="font-semibold">{size.name}</div>
                    {!size.available && (
                      <div className="text-xs text-red-500">Out of Stock</div>
                    )}
                  </button>
                ))}
              </div>

              {showSizeGuide && selectedSizeData && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Size {selectedSize}:</strong>{" "}
                    {selectedSizeData.measurements}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {sampleProduct.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
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

              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">2-Year Warranty</p>
                <p className="text-xs text-gray-500">Manufacturer guarantee</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Eco-Friendly</p>
                <p className="text-xs text-gray-500">Sustainable materials</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Pro Choice</p>
                <p className="text-xs text-gray-500">Used by professionals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Product Overview</h3>
                  <div className="prose text-gray-700">
                    <p className="mb-4">
                      The Definition Steamer 3mm wetsuit represents ScubaPro's
                      commitment to combining comfort, performance, and style.
                      Designed for tropical and temperate water diving, this
                      wetsuit offers excellent thermal protection while
                      maintaining the flexibility you need for extended dive
                      sessions.
                    </p>
                    <p className="mb-4">
                      Featuring premium 3mm neoprene with diamond span flex
                      panels, the Definition series ensures unrestricted
                      movement underwater. The quick-dry interior lining and
                      flatlock seam construction provide exceptional comfort
                      both in and out of the water.
                    </p>
                    <p>
                      Perfect for recreational diving, snorkeling, and water
                      sports in temperatures ranging from 22-28°C (72-82°F).
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4">
                    What's Included
                  </h4>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Definition Steamer 3mm Wetsuit</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Care and maintenance guide</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>2-year manufacturer warranty</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>ScubaPro quality certificate</span>
                    </li>
                  </ul>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-1">
                          Pro Tip
                        </h5>
                        <p className="text-sm text-blue-800">
                          For optimal fit and performance, consider our complete
                          thermal protection system including boots, gloves, and
                          hood.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="technology" className="mt-8">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">Advanced Technology</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-4">
                        Diamond Span Panels
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Strategic placement of diamond-shaped flex panels in
                        high-movement areas ensures maximum flexibility without
                        compromising thermal protection.
                      </p>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <strong>Benefit:</strong> 40% more flexibility in
                          shoulder and knee areas
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-4">
                        Quick-Dry Lining
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Advanced plush interior lining wicks moisture away from
                        skin and dries quickly between dives for enhanced
                        comfort.
                      </p>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <strong>Benefit:</strong> 60% faster drying time than
                          standard linings
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-4">
                        Flatlock Seams
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Precision flatlock stitching eliminates bulk and chafing
                        while maintaining watertight integrity throughout the
                        wetsuit.
                      </p>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <strong>Benefit:</strong> Zero irritation during
                          extended wear
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-4">
                        Supratex Reinforcement
                      </h4>
                      <p className="text-gray-700 mb-4">
                        High-wear areas like knees and shoulders feature
                        Supratex reinforcement for enhanced durability and
                        abrasion resistance.
                      </p>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                          <strong>Benefit:</strong> 3x longer lifespan in
                          critical wear areas
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">
                    Technical Specifications
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(sampleProduct.technicalSpecs).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b border-gray-200 pb-2"
                        >
                          <span className="font-medium text-gray-900">
                            {key}:
                          </span>
                          <span className="text-gray-700 text-right max-w-xs">
                            {value}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4">Size Chart</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">Size</th>
                          <th className="p-3 text-left font-semibold">Chest</th>
                          <th className="p-3 text-left font-semibold">Waist</th>
                          <th className="p-3 text-left font-semibold">
                            Height
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200">
                          <td className="p-3 font-medium">XS</td>
                          <td className="p-3">32-34"</td>
                          <td className="p-3">28-30"</td>
                          <td className="p-3">5'2"-5'6"</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="p-3 font-medium">S</td>
                          <td className="p-3">34-36"</td>
                          <td className="p-3">30-32"</td>
                          <td className="p-3">5'4"-5'8"</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="p-3 font-medium">M</td>
                          <td className="p-3">36-38"</td>
                          <td className="p-3">32-34"</td>
                          <td className="p-3">5'6"-5'10"</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="p-3 font-medium">L</td>
                          <td className="p-3">38-40"</td>
                          <td className="p-3">34-36"</td>
                          <td className="p-3">5'8"-6'0"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sustainability" className="mt-8">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">
                  Environmental Responsibility
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">
                      Sustainable Materials
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(sampleProduct.sustainability).map(
                        ([key, value]) => (
                          <div key={key} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                              <span className="font-medium">{key}:</span>
                              <span className="text-gray-700 ml-2">
                                {value}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h5 className="font-semibold text-green-900 mb-3">
                      Our Commitment
                    </h5>
                    <p className="text-green-800 text-sm">
                      ScubaPro is committed to protecting the oceans we love.
                      Our Definition series uses limestone-based neoprene and
                      water-based adhesives to minimize environmental impact
                      while delivering uncompromising performance.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Customer Support</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Download className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">
                          Download Resources
                        </h4>
                        <div className="space-y-2">
                          <Link
                            href="#"
                            className="block text-blue-600 hover:underline text-sm"
                          >
                            Care & Maintenance Guide (PDF)
                          </Link>
                          <Link
                            href="#"
                            className="block text-blue-600 hover:underline text-sm"
                          >
                            Size & Fit Guide (PDF)
                          </Link>
                          <Link
                            href="#"
                            className="block text-blue-600 hover:underline text-sm"
                          >
                            Warranty Information (PDF)
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Users className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Expert Support</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          Get personalized advice from our product specialists
                        </p>
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4">
                    Frequently Asked Questions
                  </h4>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium mb-2">
                        How do I choose the right size?
                      </h5>
                      <p className="text-sm text-gray-700">
                        Use our size chart and consider a snug but comfortable
                        fit. The wetsuit should feel tight initially as neoprene
                        will stretch slightly with use.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium mb-2">
                        How do I care for my wetsuit?
                      </h5>
                      <p className="text-sm text-gray-700">
                        Rinse with fresh water after each use, wash with wetsuit
                        shampoo occasionally, and hang dry away from direct
                        sunlight.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium mb-2">
                        What's the temperature range?
                      </h5>
                      <p className="text-sm text-gray-700">
                        This 3mm wetsuit is ideal for water temperatures between
                        22-28°C (72-82°F). Consider adding accessories for
                        cooler waters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Complete the Look */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">
            Complete Your Thermal Protection
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-1">
                      {product.category}
                    </div>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">
                        ${product.price}
                      </span>
                      <Button size="sm" variant="outline">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
