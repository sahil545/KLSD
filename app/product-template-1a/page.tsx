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
  CreditCard,
  Loader2,
} from "lucide-react";

// Function to convert API product data to template format
const convertApiProductToTemplate = (apiProduct: any) => {
  const productImages = apiProduct.images;
  const productCategories = apiProduct.categories;
  const productAttributes = apiProduct.attributes;

  // Extract brand from attributes
  const brandAttr = productAttributes.find(
    (attr: any) =>
      attr.name?.toLowerCase().includes("brand") ||
      attr.slug?.includes("brand"),
  );
  const brand = brandAttr?.options?.[0];

  // Extract colors from attributes - only include if available
  const colorAttr = productAttributes.find(
    (attr: any) =>
      attr.name?.toLowerCase().includes("color") ||
      attr.slug?.includes("color"),
  );
  const colors =
    colorAttr?.options && colorAttr.options.length > 0 ? colorAttr.options : [];

  // Extract sizes from attributes - only include if available
  const sizeAttr = productAttributes.find(
    (attr: any) =>
      attr.name?.toLowerCase().includes("size") || attr.slug?.includes("size"),
  );
  const sizes =
    sizeAttr?.options && sizeAttr.options.length > 0 ? sizeAttr.options : [];

  // Extract variations
  const variations = apiProduct.variations || [];

  const convertedProduct = {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price
      ? `$${parseFloat(apiProduct.price).toFixed(2)}`
      : null,
    originalPrice:
      apiProduct.regular_price &&
      apiProduct.sale_price &&
      apiProduct.regular_price !== apiProduct.sale_price
        ? `$${parseFloat(apiProduct.regular_price).toFixed(2)}`
        : null,
    description: stripHtmlTags(
      apiProduct.description || apiProduct.short_description || "",
    ),
    images: productImages ? productImages.map((img: any) => img.src) : [],
    category: productCategories?.[0]?.name,
    categoryId: productCategories?.[0]?.id,
    brand,
    colors,
    sizes,
    variations,
    relatedIds: apiProduct.related_ids || [],
    inStock: apiProduct.stock_status === "instock",
    stockQuantity: apiProduct.stock_quantity,
    rating: apiProduct.average_rating
      ? parseFloat(apiProduct.average_rating)
      : null,
    reviewCount: apiProduct.rating_count,
    sku: apiProduct.sku,
    weight: apiProduct.weight,
    dimensions: apiProduct.dimensions,
    features: [],
    specifications: [
      { label: "Brand", value: brand },
      { label: "SKU", value: apiProduct.sku },
      { label: "Weight", value: apiProduct.weight },
      {
        label: "Dimensions",
        value: apiProduct.dimensions
          ? `${apiProduct.dimensions.length} x ${apiProduct.dimensions.width} x ${apiProduct.dimensions.height}`
          : null,
      },
    ],
    included: [],
    shipping: null,
    returnPolicy: null,
  };

  return convertedProduct;
};

// Helper function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

// Helper function to find selected variation
const findSelectedVariation = (
  variations: any[],
  selectedColor: string,
  selectedSize: string,
  colors: string[],
  sizes: string[],
) => {
  if (!variations || variations.length === 0) return null;

  // If no variations are selected, return the first variation
  if (!selectedColor && !selectedSize) {
    return variations[0];
  }

  // Find variation that matches selected attributes
  return variations.find((variation) => {
    const attributes = variation.attributes || {};

    // Check color match
    const colorMatch =
      !selectedColor ||
      !colors.length ||
      attributes.pa_color === selectedColor.toLowerCase() ||
      attributes.color === selectedColor.toLowerCase();

    // Check size match
    const sizeMatch =
      !selectedSize ||
      !sizes.length ||
      attributes.pa_size === selectedSize.toLowerCase() ||
      attributes.size === selectedSize.toLowerCase();

    return colorMatch && sizeMatch;
  });
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
    if (selectedColor && selectedColor.trim() !== "") {
      const colorInput = document.createElement("input");
      colorInput.type = "hidden";
      colorInput.name = "attribute_pa_color";
      colorInput.value = selectedColor.toLowerCase().replace(/\s+/g, "-");
      form.appendChild(colorInput);
    }

    // Add size variation if selected
    if (selectedSize && selectedSize.trim() !== "") {
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
const redirectToWooCommerce = async (
  action: "cart" | "checkout",
  productData: any,
  quantity: number,
  selectedColor: string,
  selectedSize: string,
  selectedVariation?: any,
): Promise<boolean> => {
  // Build the URL with variation ID if available, otherwise use product ID
  let url;
  if (action === "checkout") {
    // For checkout, redirect to checkout page
    if (selectedVariation?.id) {
      url = `https://keylargoscubadiving.com/checkout/?add-to-cart=${productData.id}&variation_id=${selectedVariation.id}&quantity=${quantity}`;
    } else {
      url = `https://keylargoscubadiving.com/checkout/?add-to-cart=${productData.id}&quantity=${quantity}`;
    }
  } else {
    // For cart, use the add-to-cart URL that redirects to cart
    if (selectedVariation?.id) {
      url = `https://keylargoscubadiving.com/?add-to-cart=${productData.id}&variation_id=${selectedVariation.id}&quantity=${quantity}`;
    } else {
      url = `https://keylargoscubadiving.com/?add-to-cart=${productData.id}&quantity=${quantity}`;
    }
  }

  // Add variations only if no variation ID is available
  if (!selectedVariation?.id) {
    if (selectedColor && selectedColor.trim() !== "") {
      const colorValue = selectedColor.toLowerCase().replace(/\s+/g, "-");
      url += `&attribute_pa_color=${encodeURIComponent(colorValue)}`;
    }

    if (selectedSize && selectedSize.trim() !== "") {
      const sizeValue = selectedSize.toLowerCase();
      url += `&attribute_pa_size=${encodeURIComponent(sizeValue)}`;
    }
  }

  // For both cart and checkout, redirect to the URL
  // This avoids CORS issues and ensures the product is added to cart
  window.location.href = url;
  return true;
};

export default function ProductTemplate1a({
  productData,
}: {
  productData?: any;
}) {
  // Use dynamic data only - no fallbacks
  const templateData = productData
    ? convertApiProductToTemplate(productData)
    : null;

  // Return early if no product data
  if (!templateData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The requested product could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState(
    templateData.colors && templateData.colors.length > 0
      ? templateData.colors[0]
      : "",
  );
  const [selectedSize, setSelectedSize] = useState(
    templateData.sizes && templateData.sizes.length > 0
      ? templateData.sizes[0]
      : "",
  );

  // Find selected variation and calculate stock status
  const selectedVariation = findSelectedVariation(
    templateData.variations,
    selectedColor,
    selectedSize,
    templateData.colors,
    templateData.sizes,
  );

  // Calculate stock status based on selected variation or main product
  const hasVariations =
    templateData.variations && templateData.variations.length > 0;

  const stockQuantity = hasVariations
    ? (selectedVariation?.stock_quantity ?? 0)
    : (templateData.stockQuantity ?? 0);

  const stockStatus = hasVariations
    ? selectedVariation?.stock_status || "outofstock"
    : templateData.inStock
      ? "instock"
      : "outofstock";

  const isVariationInStock = stockStatus === "instock" && stockQuantity > 0;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
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

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!templateData?.relatedIds || templateData.relatedIds.length === 0) {
        setRelatedProducts([]);
        return;
      }

      if (!templateData?.categoryId) {
        setRelatedProducts([]);
        return;
      }

      setLoadingRelated(true);
      try {
        // Fetch all products from the same category
        const categoryApiUrl = `https://keylargoscubadiving.com/wp-json/childtheme/v1/products-by-category/${templateData.categoryId}`;

        const response = await fetch(categoryApiUrl);

        if (response.ok) {
          const data = await response.json();

          // Extract products from the response
          const allProducts = Array.isArray(data) ? data : data.products || [];

          const relatedProductsData = allProducts.filter((product: any) => {
            const isRelated = templateData.relatedIds.includes(product.id);
            if (isRelated) {
            }
            return isRelated;
          });

          // Convert to template format and limit to 4
          const convertedProducts = relatedProductsData
            .slice(0, 4)
            .map((product: any, index: number) => {
              const converted = convertApiProductToTemplate(product);
              return converted;
            })
            .filter((product: any) => {
              const isValid = product && product.id && product.name;
              if (!isValid) {
              }
              return isValid;
            });

          setRelatedProducts(convertedProducts);
        } else {
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [templateData?.relatedIds, templateData?.categoryId]);

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
              href={`/${templateData.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-orange-600 hover:underline"
            >
              {templateData.category}
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
                className="object-contain transition-transform duration-300 group-hover:scale-105"
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
                href={`/${templateData.brand?.toLowerCase().replace(/\s+/g, "-") || templateData.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-block"
              >
                <p className="text-blue-700 font-semibold mb-3 hover:underline">
                  {templateData.brand || templateData.category}
                </p>
              </Link>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {templateData.name}
              </h1>

              {/* Rating and Reviews */}
              {templateData.rating && templateData.reviewCount ? (
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
                </div>
              ) : null}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-600">
                  #1 Best Seller in{" "}
                  {templateData.brand || templateData.category}
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

            {/* Color Selection - Only show if colors are available */}
            {templateData.colors && templateData.colors.length > 0 && (
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
            )}

            {/* Size Selection - Only show if sizes are available */}
            {templateData.sizes && templateData.sizes.length > 0 && (
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
            )}

            {/* Availability and Shipping */}
            <div className="space-y-3 py-4 border-y border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`w-5 h-5 ${isVariationInStock ? "text-green-600" : "text-red-600"}`}
                />
                <span
                  className={`font-semibold ${isVariationInStock ? "text-green-700" : "text-red-700"}`}
                >
                  {isVariationInStock
                    ? `In Stock (${stockQuantity} available)`
                    : "Out of Stock"}
                </span>
              </div>

              <div className="flex justify-between">
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
                <div className="space-y-2">
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
              </div>
            </div>

            {/* Key Features */}
            {/* <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900">
                About this item
              </h3>
              {templateData.features && templateData.features.length > 0 ? (
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
              ) : null}

              <Link
                href="#description"
                className="inline-flex items-center text-blue-700 hover:text-blue-800 hover:underline font-medium text-sm"
              >
                See more product details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div> */}

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
                <div
                  className={`border rounded-lg p-3 mb-4 ${
                    cartMessage.includes("successfully")
                      ? "bg-green-50 border-green-200"
                      : cartMessage.includes("Failed")
                        ? "bg-red-50 border-red-200"
                        : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      cartMessage.includes("successfully")
                        ? "text-green-700"
                        : cartMessage.includes("Failed")
                          ? "text-red-700"
                          : "text-blue-700"
                    }`}
                  >
                    {cartMessage}
                  </p>
                  {cartMessage.includes("successfully") && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            "https://keylargoscubadiving.com/cart",
                            "_blank",
                          )
                        }
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        View Cart
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsAddingToCart(true);
                    setCartMessage("Adding to cart...");

                    // Show success message briefly before redirecting
                    setTimeout(() => {
                      setCartMessage("✅ Adding to cart...");

                      // Redirect after showing the message
                      setTimeout(() => {
                        redirectToWooCommerce(
                          "cart",
                          templateData,
                          quantity,
                          selectedColor,
                          selectedSize,
                          hasVariations ? selectedVariation : null,
                        );
                      }, 500);
                    }, 100);
                  }}
                  disabled={isAddingToCart || !isVariationInStock}
                  className="w-full bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold text-base py-3 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart
                    ? "Adding to Cart..."
                    : !isVariationInStock
                      ? "Out of Stock"
                      : "Add to Cart"}
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
                      hasVariations ? selectedVariation : null,
                    );

                    // No need to reset state since page will redirect
                  }}
                  disabled={isAddingToCart || !isVariationInStock}
                  className="w-full bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base py-3 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart
                    ? "Processing..."
                    : !isVariationInStock
                      ? "Out of Stock"
                      : "Buy Now"}
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
                          {stripHtmlTags(templateData.description)
                            .split("\n")
                            .filter((paragraph) => paragraph.trim() !== "")
                            .map((paragraph, index) => (
                              <p key={index} className="mb-4">
                                {paragraph.trim()}
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

                      {templateData.features &&
                      templateData.features.length > 0 ? (
                        <>
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
                        </>
                      ) : null}
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
                      {templateData.specifications
                        .filter(
                          (spec) =>
                            spec.value !== null && spec.value !== undefined,
                        )
                        .map((spec) => (
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
                      Reviews{" "}
                      {templateData.reviewCount
                        ? `(${templateData.reviewCount})`
                        : ""}
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
                          {templateData.rating && templateData.reviewCount ? (
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
                          ) : null}
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
                        {templateData.reviewCount &&
                        templateData.reviewCount > 0 &&
                        templateData.rating ? (
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
                        {/* Dynamic Review Content */}
                        {templateData.reviewCount &&
                        templateData.reviewCount > 0 &&
                        templateData.rating ? (
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900">
                                    Customer Review
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    Verified Purchase
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {renderStars(templateData.rating)}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    Based on {templateData.reviewCount} reviews
                                  </span>
                                </div>
                              </div>
                            </div>

                            <h5 className="font-medium mb-2 text-gray-900">
                              {templateData.rating >= 4.5
                                ? "Excellent product quality and performance"
                                : templateData.rating >= 4.0
                                  ? "Great product with good value"
                                  : templateData.rating >= 3.5
                                    ? "Good product with room for improvement"
                                    : "Product meets basic requirements"}
                            </h5>
                            <p className="text-gray-700 text-sm">
                              {templateData.rating >= 4.5
                                ? `This ${templateData.name} has received excellent feedback from our customers with an average rating of ${templateData.rating} stars. With ${templateData.reviewCount} reviews, this product is highly recommended by the diving community.`
                                : templateData.rating >= 4.0
                                  ? `This ${templateData.name} has received positive feedback from customers with an average rating of ${templateData.rating} stars. Based on ${templateData.reviewCount} reviews, this product offers good value and performance.`
                                  : templateData.rating >= 3.5
                                    ? `This ${templateData.name} has received mixed feedback from customers with an average rating of ${templateData.rating} stars. Based on ${templateData.reviewCount} reviews, this product meets expectations with some areas for improvement.`
                                    : `This ${templateData.name} has received feedback from customers with an average rating of ${templateData.rating} stars. Based on ${templateData.reviewCount} reviews, this product provides basic functionality.`}
                            </p>
                          </div>
                        ) : null}
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
                        {templateData.included &&
                        templateData.included.length > 0 ? (
                          <p className="text-gray-700 mb-2 text-sm">
                            A: This {templateData.name} comes with{" "}
                            {templateData.included.join(", ").toLowerCase()}.
                            All items are carefully packaged and include
                            manufacturer warranty.
                          </p>
                        ) : null}
                        <p className="text-xs text-gray-500">
                          Answered by{" "}
                          {templateData.brand || templateData.category} Expert •
                          3 days ago
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
                          Answered by{" "}
                          {templateData.brand || templateData.category} Expert •
                          1 week ago
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
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">
              Customers who bought this item also bought
            </h2>
            {loadingRelated ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-ocean" />
                <span className="ml-2 text-gray-600">
                  Loading related products...
                </span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => {
                  const productSlug = product.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");

                  return (
                    <Link
                      key={product.id}
                      href={`/product/${productSlug}?categoryId=${product.categoryId || 186}&productId=${product.id}`}
                    >
                      <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                            {/* {product.badges && product.badges.length > 0 && (
                              <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">
                                {product.badges[0]}
                              </Badge>
                            )} */}
                          </div>

                          <h3 className="font-medium text-sm mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          {/* {product.rating && product.reviewCount && (
                            <div className="flex items-center gap-1 mb-2">
                              {renderStars(product.rating)}
                              <span className="text-xs text-gray-500">
                                ({product.reviewCount})
                              </span>
                            </div>
                          )} */}

                          <div className="flex items-center gap-2">
                            <span className="font-bold">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>

                          <Button
                            size="sm"
                            className="w-full mt-3 bg-orange-500 hover:bg-orange-600"
                          >
                            View Product
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Recently Viewed */}
        <div className="mt-16 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recently Viewed</h3>
          {loadingRelated ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-ocean" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto">
              {relatedProducts.slice(0, 3).map((product) => {
                const productSlug = product.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");

                return (
                  <Link
                    key={product.id}
                    href={`/product/${productSlug}?categoryId=${product.categoryId || 186}&productId=${product.id}`}
                  >
                    <div className="flex-shrink-0 w-32 cursor-pointer">
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
                      <p className="text-sm font-bold">{product.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No recently viewed products available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
