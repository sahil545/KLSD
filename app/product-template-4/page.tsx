"use client";

import React, { useState } from "react";
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
  Phone,
  Mail,
  MapPin,
  Clock,
  CreditCard,
  Package,
} from "lucide-react";

// Sample product data - simplified for cleaner presentation
const sampleProduct = {
  id: "SP-BCD-CARRY-BAG",
  name: "BCD Carry Bag",
  brand: "ScubaPro",
  price: 90.0,
  originalPrice: 110.0,
  discount: 18,
  rating: 4.6,
  reviewCount: 23,
  availability: "In Stock",
  shipsIn: "1-2 business days",
  categories: ["BCD Accessories", "Travel Gear"],
  images: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ],
  description: [
    "Durable and versatile BCD carry bag designed specifically for transporting and storing your buoyancy control device.",
    "Features reinforced handles, heavy-duty zippers, and water-resistant material to protect your equipment.",
    "Compact design fits most standard BCDs while providing easy access and organization.",
    "Perfect for travel, dive boat trips, or storage at home.",
  ],
  whatsIncluded: [
    "BCD Carry Bag",
    "Adjustable shoulder strap",
    "Internal mesh pocket",
    "Care instructions",
  ],
  specifications: {
    Dimensions: '24" x 18" x 8"',
    Weight: "1.2 lbs",
    Material: "600D Polyester",
    Color: "Black with blue accents",
    "Water Resistance": "Water-resistant coating",
    Closure: "Heavy-duty YKK zippers",
  },
  sizing: [
    "Fits most standard adult BCDs",
    "Internal dimensions accommodate BCDs up to size XXL",
    "Adjustable compression straps for smaller BCDs",
  ],
};

const relatedProducts = [
  {
    id: "SP-REGULATOR-BAG",
    name: "Regulator Travel Case",
    price: 45.0,
    originalPrice: 55.0,
    rating: 4.8,
    reviewCount: 67,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Best Seller",
  },
  {
    id: "SP-MASK-FINS-BAG",
    name: "Mask & Fins Mesh Bag",
    price: 28.0,
    rating: 4.5,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "SP-WETSUIT-HANGER",
    name: "Wetsuit Hanger Set",
    price: 35.0,
    rating: 4.7,
    reviewCount: 45,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "SP-DIVE-COMPUTER",
    name: "Dive Computer Watch",
    price: 399.0,
    originalPrice: 449.0,
    rating: 4.9,
    reviewCount: 234,
    image:
      "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Premium",
  },
  {
    id: "SP-SAFETY-WHISTLE",
    name: "Emergency Safety Whistle",
    price: 12.0,
    rating: 4.3,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "SP-MESH-GEAR-BAG",
    name: "Large Mesh Gear Bag",
    price: 42.0,
    originalPrice: 50.0,
    rating: 4.6,
    reviewCount: 78,
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProductTemplate4() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Collapsible states
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isIncludedOpen, setIsIncludedOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isSizingOpen, setIsSizingOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KL</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">Key Largo</div>
                <div className="text-sm text-blue-600 font-medium">
                  SCUBA DIVING
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/trips-tours"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Trips & Tours
              </Link>
              <Link
                href="/certification"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Certification
              </Link>
              <Link
                href="/dive-sites"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dive Sites
              </Link>
              <Link
                href="/scuba-gear"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Scuba Gear
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>305-391-4040</span>
              </div>
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link
              href="/key-largo-dive-shop"
              className="hover:text-blue-600 hover:underline"
            >
              Key Largo Dive Shop
            </Link>
            <span className="mx-2">›</span>
            <Link
              href="/scuba-gear"
              className="hover:text-blue-600 hover:underline"
            >
              Scuba Gear
            </Link>
            <span className="mx-2">›</span>
            <Link
              href="/bcd-accessories"
              className="hover:text-blue-600 hover:underline"
            >
              BCD Accessories
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">
              {sampleProduct.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Product Images - Sticky on desktop only */}
            <div className="space-y-4 md:sticky md:top-8 md:self-start">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                <Image
                  src={sampleProduct.images[selectedImage]}
                  alt={sampleProduct.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Discount Badge */}
                {sampleProduct.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white font-semibold">
                    -{sampleProduct.discount}% OFF
                  </Badge>
                )}

                {/* Image Navigation */}
                <button
                  onClick={() =>
                    setSelectedImage(Math.max(0, selectedImage - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(
                      Math.min(
                        sampleProduct.images.length - 1,
                        selectedImage + 1,
                      ),
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={selectedImage === sampleProduct.images.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-3">
                {sampleProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === index
                        ? "border-blue-500 shadow-md"
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
                  <p className="text-blue-600 font-semibold mb-2 hover:underline">
                    {sampleProduct.brand}
                  </p>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {sampleProduct.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {renderStars(sampleProduct.rating)}
                  </div>
                  <Link
                    href="#reviews"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Be the first to leave a review
                  </Link>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 pb-4 border-b border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${sampleProduct.price.toFixed(2)}
                  </span>
                  {sampleProduct.originalPrice > sampleProduct.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${sampleProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Savings */}
                {sampleProduct.discount > 0 && (
                  <p className="text-red-600 font-medium">
                    Save $
                    {(
                      sampleProduct.originalPrice - sampleProduct.price
                    ).toFixed(2)}{" "}
                    ({sampleProduct.discount}%)
                  </p>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium bg-gray-50 border-x border-gray-300 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                  Add To Cart
                </Button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="border-gray-300 hover:bg-gray-50 text-gray-700"
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                    />
                    Wishlist
                  </Button>

                  <Button
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 text-gray-700"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Availability and Shipping */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-700">
                    {sampleProduct.availability}
                  </span>
                </div>
                <div className="text-sm text-green-700">
                  <p>Ships in {sampleProduct.shipsIn}</p>
                  <p>Free shipping on orders over $75</p>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">
                    1-Year Warranty
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">
                    30-Day Returns
                  </p>
                </div>
                <div className="text-center">
                  <CreditCard className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">
                    Secure Payment
                  </p>
                </div>
              </div>

              {/* Collapsible Product Details */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                {/* Description */}
                <Collapsible
                  open={isDescriptionOpen}
                  onOpenChange={setIsDescriptionOpen}
                >
                  <CollapsibleTrigger className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Description
                    </h3>
                    {isDescriptionOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="bg-white border-x border-b border-gray-200 rounded-b-lg p-6">
                      <div className="space-y-4">
                        {sampleProduct.description.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-gray-700 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* What's Included */}
                <Collapsible
                  open={isIncludedOpen}
                  onOpenChange={setIsIncludedOpen}
                >
                  <CollapsibleTrigger className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900">
                      What's Included?
                    </h3>
                    {isIncludedOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="bg-white border-x border-b border-gray-200 rounded-b-lg p-6">
                      <ul className="space-y-2">
                        {sampleProduct.whatsIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Package className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Specs & Details */}
                <Collapsible open={isSpecsOpen} onOpenChange={setIsSpecsOpen}>
                  <CollapsibleTrigger className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Specs & Details
                    </h3>
                    {isSpecsOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="bg-white border-x border-b border-gray-200 rounded-b-lg p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(sampleProduct.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between border-b border-gray-100 pb-2"
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

                {/* Product Sizing */}
                <Collapsible open={isSizingOpen} onOpenChange={setIsSizingOpen}>
                  <CollapsibleTrigger className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Product Sizing
                    </h3>
                    {isSizingOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="bg-white border-x border-b border-gray-200 rounded-b-lg p-6">
                      <ul className="space-y-2">
                        {sampleProduct.sizing.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Most Popular & Suggestions
            </h2>
            <div
              className="flex gap-4 overflow-x-auto pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onMouseDown={(e) => {
                const container = e.currentTarget;
                const startX = e.pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;

                const handleMouseMove = (e: MouseEvent) => {
                  const x = e.pageX - container.offsetLeft;
                  const walk = (x - startX) * 2;
                  container.scrollLeft = scrollLeft - walk;
                };

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            >
              {relatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow flex-shrink-0 w-48"
                >
                  <CardContent className="p-3">
                    <div className="relative aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-base">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <span className="text-xs text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-xs py-2"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
