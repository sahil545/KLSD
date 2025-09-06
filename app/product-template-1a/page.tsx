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

// Function to convert API product data to template format
const convertApiProductToTemplate = (apiProduct: any) => {
  const productImages = apiProduct.images || [];
  const productCategories = apiProduct.categories || [];
  const productAttributes = apiProduct.attributes || [];

  // Extract brand from attributes
  const brandAttr = productAttributes.find(
    (attr: any) =>
      attr.name?.toLowerCase().includes("brand") ||
      attr.slug?.includes("brand"),
  );
  const brand = brandAttr?.options?.[0] || "ScubaPro";

  // Extract colors from attributes or use default
  const colorAttr = productAttributes.find(
    (attr: any) =>
      attr.name?.toLowerCase().includes("color") ||
      attr.slug?.includes("color"),
  );
  const colors = colorAttr?.options || ["Black/Blue", "Black", "Blue"];

  // Extract sizes from attributes or use default
  const sizeAttr = productAttributes.find(
    (attr: any) =>
      attr.name?.toLowerCase().includes("size") || attr.slug?.includes("size"),
  );
  const sizes = sizeAttr?.options || ["XS", "S", "M", "L", "XL"];

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price
      ? `$${parseFloat(apiProduct.price).toFixed(2)}`
      : "$0.00",
    originalPrice:
      apiProduct.regular_price &&
      apiProduct.sale_price &&
      apiProduct.regular_price !== apiProduct.sale_price
        ? `$${parseFloat(apiProduct.regular_price).toFixed(2)}`
        : null,
    description: apiProduct.description || apiProduct.short_description || "",
    images:
      productImages.length > 0
        ? productImages.map((img: any) => img.src)
        : ["/placeholder.svg"],
    category: productCategories[0]?.name || "Scuba Gear",
    brand,
    colors,
    sizes,
    inStock: apiProduct.stock_status === "instock",
    stockQuantity: apiProduct.stock_quantity || 0,
    rating: parseFloat(apiProduct.average_rating) || 4.5,
    reviewCount: apiProduct.rating_count || 0,
    sku: apiProduct.sku || "",
    weight: apiProduct.weight || "",
    dimensions: apiProduct.dimensions || { length: "", width: "", height: "" },
    features: [
      "Professional grade construction",
      "High quality materials",
      "Durable design",
      "Trusted by divers worldwide",
    ],
    specifications: [
      { label: "Brand", value: brand },
      { label: "Category", value: productCategories[0]?.name || "Scuba Gear" },
      { label: "SKU", value: apiProduct.sku || "N/A" },
      { label: "Weight", value: apiProduct.weight || "N/A" },
      {
        label: "Dimensions",
        value: apiProduct.dimensions
          ? `${apiProduct.dimensions.length || "N/A"} x ${apiProduct.dimensions.width || "N/A"} x ${apiProduct.dimensions.height || "N/A"}`
          : "N/A",
      },
    ],
    included: [
      "Product as described",
      "Manufacturer warranty",
      "Quality guarantee",
    ],
    shipping:
      "Free shipping on orders over $100. Standard shipping 3-5 business days.",
    returnPolicy: "30-day return policy. Items must be in original condition.",
  };
};

// Helper function to generate WooCommerce URLs
const generateWooCommerceUrl = (
  action: "cart" | "checkout",
  productData: any,
  quantity: number,
  selectedColor: string,
  selectedSize: string,
) => {
  // Use the WooCommerce add-to-cart endpoint
  const baseUrl = "https://keylargoscubadiving.com/cart/";

  const url = new URL(baseUrl);

  // Add basic product data
  url.searchParams.set("add-to-cart", productData.id.toString());
  url.searchParams.set("quantity", quantity.toString());

  // Add product variations based on WooCommerce attribute naming conventions
  if (selectedColor) {
    // Try different possible attribute names for color
    const colorValue = selectedColor.toLowerCase().replace(/\s+/g, "-");
    url.searchParams.set("attribute_pa_color", colorValue);
    url.searchParams.set("attribute_color", colorValue);
    url.searchParams.set("attribute_pa_colour", colorValue); // Alternative spelling
  }

  if (selectedSize) {
    // Try different possible attribute names for size
    const sizeValue = selectedSize.toLowerCase();
    url.searchParams.set("attribute_pa_size", sizeValue);
    url.searchParams.set("attribute_size", sizeValue);
  }

  // For checkout, redirect to checkout after adding to cart
  if (action === "checkout") {
    url.searchParams.set("checkout", "true");
  }

  return url.toString();
};

// Method to add product to WooCommerce cart using direct URL approach
const addToWooCommerceCart = async (
  productData: any,
  quantity: number,
  selectedColor: string,
  selectedSize: string,
) => {
  try {
    // Create a hidden form and submit it to add to cart
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://keylargoscubadiving.com/cart/";
    form.target = "_blank";
    form.style.display = "none";

    // Add product ID
    const productIdInput = document.createElement("input");
    productIdInput.type = "hidden";
    productIdInput.name = "add-to-cart";
    productIdInput.value = productData.id.toString();
    form.appendChild(productIdInput);

    // Add quantity
    const quantityInput = document.createElement("input");
    quantityInput.type = "hidden";
    quantityInput.name = "quantity";
    quantityInput.value = quantity.toString();
    form.appendChild(quantityInput);

    // Add color variation if selected
    if (selectedColor) {
      const colorInput = document.createElement("input");
      colorInput.type = "hidden";
      colorInput.name = "attribute_pa_color";
      colorInput.value = selectedColor.toLowerCase().replace(/\s+/g, "-");
      form.appendChild(colorInput);
    }

    // Add size variation if selected
    if (selectedSize) {
      const sizeInput = document.createElement("input");
      sizeInput.type = "hidden";
      sizeInput.name = "attribute_pa_size";
      sizeInput.value = selectedSize.toLowerCase();
      form.appendChild(sizeInput);
    }

    // Submit the form
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

// Alternative method using direct URL redirection
const redirectToWooCommerce = (
  action: "cart" | "checkout",
  productData: any,
  quantity: number,
  selectedColor: string,
  selectedSize: string,
) => {
  // Build the URL with all parameters
  let url = `https://keylargoscubadiving.com/cart/?add-to-cart=${productData.id}&quantity=${quantity}`;

  // Add variations
  if (selectedColor) {
    const colorValue = selectedColor.toLowerCase().replace(/\s+/g, "-");
    url += `&attribute_pa_color=${encodeURIComponent(colorValue)}`;
  }

  if (selectedSize) {
    const sizeValue = selectedSize.toLowerCase();
    url += `&attribute_pa_size=${encodeURIComponent(sizeValue)}`;
  }

  // For checkout, add checkout parameter
  if (action === "checkout") {
    url += `&checkout=true`;
  }

  // Open in same window for checkout, new tab for cart
  if (action === "checkout") {
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
};

export default function ProductTemplate1a({
  productData,
}: {
  productData?: any;
}) {
  // Use dynamic data if available, otherwise use static data
  const templateData = productData
    ? convertApiProductToTemplate(productData)
    : {
        id: 1,
        name: "ScubaPro Hydros Pro BCD",
        price: "$899.00",
        originalPrice: "$999.00",
        description:
          "The ScubaPro Hydros Pro BCD represents the pinnacle of buoyancy control device technology, combining innovative design with uncompromising performance.",
        images: ["/placeholder.svg"],
        category: "BCDs",
        brand: "ScubaPro",
        colors: ["Black/Blue", "Black", "Blue"],
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        stockQuantity: 5,
        rating: 4.8,
        reviewCount: 127,
        sku: "HYDROS-PRO-001",
        weight: "2.5 lbs",
        dimensions: { length: "18", width: "12", height: "8" },
        features: [
          "Revolutionary weight-free design",
          "Ultra-lightweight construction",
          "Integrated weight system",
          "Comfortable fit for all body types",
        ],
        specifications: [
          { label: "Brand", value: "ScubaPro" },
          { label: "Model", value: "Hydros Pro" },
          { label: "Type", value: "Back Inflation BCD" },
          { label: "Weight", value: "2.5 lbs" },
          { label: "Dimensions", value: "18 x 12 x 8 inches" },
        ],
        included: [
          "Hydros Pro BCD",
          "Integrated weight pockets",
          "ScubaPro warranty card",
          "User manual",
        ],
        shipping:
          "Free shipping on orders over $100. Standard shipping 3-5 business days.",
        returnPolicy:
          "30-day return policy. Items must be in original condition.",
      };

  const [selectedColor, setSelectedColor] = useState(templateData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(templateData.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

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

  const currentImages = templateData.images;
  const selectedSizeData = templateData.sizes.find((s) => s === selectedSize);
  const selectedColorData = templateData.colors.find(
    (c) => c === selectedColor,
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
              {templateData.name}
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
                src={currentImages[selectedImage] || currentImages[0]}
                alt={`${templateData.name} in ${selectedColor}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Discount Badge */}
              {templateData.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white font-semibold px-3 py-1 shadow-md">
                  SALE
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
                href={`/brand/${templateData.brand.toLowerCase()}`}
                className="inline-block"
              >
                <p className="text-blue-700 font-semibold mb-3 hover:underline">
                  {templateData.brand}
                </p>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {templateData.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {renderStars(templateData.rating)}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {templateData.rating}
                </span>
                <Link
                  href="#reviews"
                  className="text-blue-700 hover:text-blue-800 hover:underline font-medium"
                >
                  {templateData.reviewCount} ratings
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
                  {templateData.price}
                </span>
                {templateData.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    List: {templateData.originalPrice}
                  </span>
                )}
              </div>

              {/* Savings */}
              {templateData.originalPrice && (
                <div className="flex items-center gap-2">
                  <p className="text-red-700 font-semibold">
                    Save {templateData.originalPrice}
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
                {templateData.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedImage(0);
                    }}
                    className={`group relative px-4 py-2 rounded-lg border-2 transition-all shadow-sm hover:shadow-md ${
                      selectedColor === color
                        ? "border-orange-500 ring-2 ring-orange-200 bg-orange-50"
                        : "border-gray-300 hover:border-gray-400 bg-white"
                    } cursor-pointer`}
                  >
                    <span className="text-sm font-medium">{color}</span>
                    {selectedColor === color && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
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
                {templateData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 border rounded-lg text-center transition-all font-medium ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-lg">{size}</div>
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
                  {templateData.inStock
                    ? `In Stock (${templateData.stockQuantity} available)`
                    : "Out of Stock"}
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
                {templateData.features.slice(0, 5).map((feature, index) => (
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

              {/* Cart Message */}
              {cartMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-700 text-sm font-medium">
                    {cartMessage}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsAddingToCart(true);
                    setCartMessage("Adding to cart...");

                    // Use direct URL redirection method
                    redirectToWooCommerce(
                      "cart",
                      templateData,
                      quantity,
                      selectedColor,
                      selectedSize,
                    );

                    // Reset state after a short delay (since it opens in new tab)
                    setTimeout(() => {
                      setIsAddingToCart(false);
                      setCartMessage(null);
                    }, 1500);
                  }}
                  disabled={isAddingToCart || !templateData.inStock}
                  className="w-full bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold text-base py-3 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>

                <Button
                  onClick={() => {
                    setIsAddingToCart(true);
                    setCartMessage(
                      "Adding to cart and redirecting to checkout...",
                    );

                    // Use direct URL redirection method for checkout
                    redirectToWooCommerce(
                      "checkout",
                      templateData,
                      quantity,
                      selectedColor,
                      selectedSize,
                    );

                    // No need to reset state since page will redirect
                  }}
                  disabled={isAddingToCart || !templateData.inStock}
                  className="w-full bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base py-3 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? "Processing..." : "Buy Now"}
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
                      {templateData.description ? (
                        <div className="mb-4 text-gray-700">
                          {templateData.description
                            .split("\n")
                            .map((paragraph, index) => (
                              <p key={index} className="mb-4">
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      ) : (
                        <p className="mb-4 text-gray-700">
                          {templateData.name} represents the pinnacle of
                          {templateData.category.toLowerCase()} technology,
                          designed for serious divers who demand the highest
                          performance and reliability. This professional-grade
                          equipment delivers exceptional performance in all
                          diving conditions.
                        </p>
                      )}

                      <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">
                        Complete Features:
                      </h4>
                      <ul className="list-disc pl-6 space-y-1">
                        {templateData.features.map((feature, index) => (
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
                      {templateData.specifications.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex justify-between border-b border-gray-200 pb-2"
                        >
                          <span className="font-medium text-gray-900">
                            {spec.label}:
                          </span>
                          <span className="text-gray-700">{spec.value}</span>
                        </div>
                      ))}
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
                      Reviews ({templateData.reviewCount})
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
                              {templateData.rating}
                            </span>
                            <div>
                              <div className="flex items-center mb-1">
                                {renderStars(templateData.rating)}
                              </div>
                              <p className="text-gray-600">
                                {templateData.reviewCount} total reviews
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
                        {templateData.reviewCount > 0 ? (
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900">
                                    Customer Review
                                  </span>
                                  {renderStars(templateData.rating)}
                                </div>
                                <p className="text-sm text-gray-600">
                                  Based on {templateData.reviewCount} reviews
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">
                              This {templateData.name} has received excellent
                              feedback from our customers with an average rating
                              of {templateData.rating} stars.
                              {templateData.reviewCount > 10
                                ? ` With over ${templateData.reviewCount} reviews, this product is highly recommended by the diving community.`
                                : ""}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Verified Purchase</span>
                              <span>•</span>
                              <span>
                                Helpful (
                                {Math.floor(templateData.reviewCount * 0.7)})
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                            <p className="text-gray-600 mb-2">No reviews yet</p>
                            <p className="text-sm text-gray-500">
                              Be the first to review this product!
                            </p>
                          </div>
                        )}
                        {reviews.slice(0, 1).map((review) => (
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
                          Q: What's included with this {templateData.name}?
                        </h5>
                        <p className="text-gray-700 mb-2 text-sm">
                          A: This {templateData.name} comes with{" "}
                          {templateData.included.join(", ").toLowerCase()}. All
                          items are carefully packaged and include manufacturer
                          warranty.
                        </p>
                        <p className="text-xs text-gray-500">
                          Answered by {templateData.brand} Expert • 3 days ago
                        </p>
                      </div>

                      <div className="border-b border-gray-200 pb-4">
                        <h5 className="font-medium mb-2 text-gray-900">
                          Q: Is this {templateData.category.toLowerCase()}{" "}
                          suitable for my diving level?
                        </h5>
                        <p className="text-gray-700 mb-2 text-sm">
                          A: The {templateData.name} is designed for divers of
                          all levels. It features professional-grade
                          construction and is suitable for both recreational and
                          technical diving applications.
                        </p>
                        <p className="text-xs text-gray-500">
                          Answered by {templateData.brand} Expert • 1 week ago
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
