"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  FileText,
  ShoppingCart,
  Globe,
  Calendar,
  User,
  Tag,
  DollarSign,
} from "lucide-react";
import {
  getTemplateForProduct,
  isTourProduct,
  isScubaGearProduct,
  isCertificationProduct,
} from "@/lib/template-mapper";

interface ContentData {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  status: string;
  slug: string;
  author?: string;
  date: string;
  categories?: Array<{ id: number; name: string; slug: string }>;
  tags?: Array<{ id: number; name: string; slug: string }>;
  featured_media?: string;
  permalink?: string;

  // Product-specific fields
  price?: string;
  sale_price?: string;
  description?: string;
  short_description?: string;
  sku?: string;
  stock_quantity?: number;
  manage_stock?: boolean;

  // Custom meta fields
  meta_data?: Array<{ key: string; value: unknown }>;
}

export default function EditContent() {
  const params = useParams();

  const { type, id } = params;

  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isDemoData, setIsDemoData] = useState(false);

  // Get template assignment for product
  const getProductTemplate = (
    categories: Array<{ id: number; name: string; slug: string }>,
  ) => {
    return getTemplateForProduct(categories);
  };

  // Load content data
  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      let data;

      switch (type) {
        case "product":
          // Use internal API route (same pattern as content manager)
          console.log(`Loading product ${id}...`);
          const response = await fetch(`/api/products/${id}`, {
            headers: {
              "Cache-Control": "no-cache",
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const result = await response.json();

          if (result.success) {
            data = result.product;
            const isDemo = result.isDemoData || false;
            setIsDemoData(isDemo);
            console.log(
              `Loaded product successfully${isDemo ? " (demo data)" : ""}:`,
              data.name,
            );

            // Show user if we're using demo data
            if (isDemo) {
              console.log(
                "📝 Using demo data because this product ID doesn't exist in WooCommerce",
              );
            }
          } else {
            console.error("Failed to load product:", result.error);
            throw new Error(result.message || "Failed to load product");
          }
          break;
        case "post":
          // Posts would need a similar API route - for now show error
          throw new Error("Post editing not yet supported - API route needed");
        case "page":
          // Pages would need a similar API route - for now show error
          throw new Error("Page editing not yet supported - API route needed");
        default:
          throw new Error(`Unknown content type: ${type}`);
      }

      // Transform data to consistent format
      const transformedData: ContentData = {
        id: data.id,
        title: data.name || "",
        content: data.description || "",
        excerpt: data.short_description || "",
        status: data.status,
        slug: data.slug,
        author: "Admin",
        date: data.date_created,
        categories: data.categories || [],
        tags: data.tags || [],
        featured_media: data.images?.[0]?.src || "",
        permalink: data.permalink,

        // Product-specific
        price: data.price,
        sale_price: data.sale_price,
        description: data.description,
        short_description: data.short_description,
        sku: data.sku,
        stock_quantity: data.stock_quantity,
        manage_stock: data.manage_stock,

        meta_data: data.meta_data || [],
      };

      setContentData(transformedData);
    } catch (error) {
      console.error("Failed to load content:", error);
    } finally {
      setLoading(false);
    }
  }, [type, id]);

  // Save content
  const saveContent = async () => {
    if (!contentData) return;

    setSaving(true);
    try {
      // Prepare data based on content type
      let updateData: Record<string, unknown> = {};

      if (type === "product") {
        updateData = {
          name: contentData.title,
          description: contentData.content,
          short_description: contentData.excerpt,
          status: contentData.status,
          slug: contentData.slug,
          price: contentData.price,
          sale_price: contentData.sale_price,
          sku: contentData.sku,
          stock_quantity: contentData.stock_quantity,
          manage_stock: contentData.manage_stock,
        };
      } else {
        updateData = {
          title: contentData.title,
          content: contentData.content,
          excerpt: contentData.excerpt,
          status: contentData.status,
          slug: contentData.slug,
        };
      }

      // Update via API
      switch (type) {
        case "product":
          console.log("Saving product...", updateData);
          const response = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify(updateData),
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const result = await response.json();

          if (result.success) {
            console.log("Product saved successfully");
            alert("✅ Product saved successfully!");
          } else {
            throw new Error(result.message || "Failed to save product");
          }
          break;
        case "post":
          throw new Error("Post saving not yet supported - API route needed");
        case "page":
          throw new Error("Page saving not yet supported - API route needed");
      }
    } catch (error) {
      console.error("Failed to save content:", error);
      alert(`❌ Failed to save content: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Update field
  const updateField = (
    field: keyof ContentData,
    value: string | number | boolean,
  ) => {
    if (!contentData) return;
    setContentData({ ...contentData, [field]: value });
  };

  // Get content type info
  const getContentTypeInfo = () => {
    switch (type) {
      case "product":
        return { icon: ShoppingCart, label: "Product", color: "text-blue-600" };
      case "post":
        return { icon: FileText, label: "Post", color: "text-green-600" };
      case "page":
        return { icon: Globe, label: "Page", color: "text-purple-600" };
      default:
        return { icon: FileText, label: "Content", color: "text-gray-600" };
    }
  };

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
          <p className="text-gray-600 mt-2">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested product could not be loaded.
          </p>
          <Button asChild>
            <Link href="/content-manager">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Product Manager
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { icon: Icon, label, color } = getContentTypeInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/content-manager">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Product Manager
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <Icon className={`w-6 h-6 ${color}`} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Edit {label}: {contentData.title || "Untitled"}
                  </h1>
                  <p className="text-gray-600">ID: {contentData.id}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isDemoData && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  Demo Data
                </Badge>
              )}
              {contentData.permalink && (
                <Button variant="outline" asChild>
                  <a
                    href={contentData.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </a>
                </Button>
              )}
              <Button onClick={saveContent} disabled={saving}>
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {[
                    { id: "basic", name: "Basic Info" },
                    { id: "content", name: "Content" },
                    ...(type === "product"
                      ? [{ id: "product", name: "Product Details" }]
                      : []),
                    { id: "meta", name: "Custom Fields" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Basic Info Tab */}
                {activeTab === "basic" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <Input
                        value={contentData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="Enter title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug
                      </label>
                      <Input
                        value={contentData.slug}
                        onChange={(e) => updateField("slug", e.target.value)}
                        placeholder="url-slug"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt/Short Description
                      </label>
                      <Textarea
                        value={contentData.excerpt || ""}
                        onChange={(e) => updateField("excerpt", e.target.value)}
                        rows={4}
                        placeholder="Brief description..."
                      />
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === "content" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {type === "product" ? "Product Description" : "Content"}
                      </label>
                      <Textarea
                        value={contentData.content}
                        onChange={(e) => updateField("content", e.target.value)}
                        rows={20}
                        placeholder="Enter content..."
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        You can use HTML tags for formatting.
                      </p>
                    </div>
                  </div>
                )}

                {/* Product Details Tab */}
                {activeTab === "product" && type === "product" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Regular Price
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type="number"
                            step="0.01"
                            value={contentData.price || ""}
                            onChange={(e) =>
                              updateField("price", e.target.value)
                            }
                            className="pl-10"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sale Price
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type="number"
                            step="0.01"
                            value={contentData.sale_price || ""}
                            onChange={(e) =>
                              updateField("sale_price", e.target.value)
                            }
                            className="pl-10"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU
                      </label>
                      <Input
                        value={contentData.sku || ""}
                        onChange={(e) => updateField("sku", e.target.value)}
                        placeholder="Product SKU..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity
                      </label>
                      <Input
                        type="number"
                        value={contentData.stock_quantity || ""}
                        onChange={(e) =>
                          updateField(
                            "stock_quantity",
                            parseInt(e.target.value),
                          )
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Custom Fields Tab - Category-Aware Forms */}
                {activeTab === "meta" && (
                  <div className="space-y-8">
                    {/* Template Assignment Info */}
                    {contentData?.categories && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-medium text-blue-900 mb-2">
                          🎨 Template Assignment
                        </h3>
                        {(() => {
                          const template = getProductTemplate(
                            contentData.categories,
                          );
                          if (template) {
                            return (
                              <div className="space-y-2">
                                <p className="text-blue-800">
                                  <strong>Assigned Template:</strong>{" "}
                                  {template.templateName}
                                </p>
                                <p className="text-blue-700 text-sm">
                                  {template.description}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-blue-100 text-blue-800">
                                    {template.templatePath}
                                  </Badge>
                                  <Link
                                    href={template.templatePath}
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                  >
                                    Preview Template →
                                  </Link>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <p className="text-blue-800">
                                No template assigned. Add categories to assign a
                                template automatically.
                              </p>
                            );
                          }
                        })()}
                      </div>
                    )}

                    {contentData && isTourProduct(contentData.categories) ? (
                      // Tours & Trips Product Form (Enhanced for Christ Statue Tour Template)
                      <>
                        {/* Hero Section Fields */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🎯 Hero Section Content
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Subtitle/Tagline
                              </label>
                              <Input placeholder="e.g., Discover the World-Famous Christ of the Abyss" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Star Rating
                                </label>
                                <Input
                                  placeholder="e.g., 4.9"
                                  type="number"
                                  step="0.1"
                                  max="5"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Review Count
                                </label>
                                <Input placeholder="e.g., 487" type="number" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Review Text
                                </label>
                                <Input placeholder="e.g., reviews, verified bookings" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trust Badges (one per line)
                              </label>
                              <Textarea
                                rows={3}
                                placeholder="⭐ Best of Florida Keys&#10;🏆 #1 Rated Tour&#10;✓ No Booking Fees"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Quick Info Boxes */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            📊 Quick Info Display
                          </h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration
                              </label>
                              <Input placeholder="e.g., 4 Hours" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Group Size
                              </label>
                              <Input placeholder="e.g., 25 Max" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                              </label>
                              <Input placeholder="e.g., Key Largo" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gear Status
                              </label>
                              <Input placeholder="e.g., Included, Not Included" />
                            </div>
                          </div>
                        </div>

                        {/* Key Highlights/Selling Points */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            ✨ Key Highlights (Hero Section)
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Hero Highlights (one per line)
                            </label>
                            <Textarea
                              rows={5}
                              placeholder="Famous 9-foot bronze Christ statue in crystal-clear water&#10;All snorkeling equipment included&#10;PADI certified guides&#10;Small group experience"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              These appear as checkmarks in the hero section
                            </p>
                          </div>
                        </div>

                        {/* Journey Timeline */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🕐 4-Hour Journey Timeline
                          </h3>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 1: Title
                                </label>
                                <Input placeholder="e.g., Welcome & Preparation" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 1: Time
                                </label>
                                <Input placeholder="e.g., 8:00 AM - 30 minutes" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Step 1: Description
                              </label>
                              <Textarea
                                rows={2}
                                placeholder="Meet our team at John Pennekamp State Park for equipment fitting and comprehensive safety briefing."
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 2: Title
                                </label>
                                <Input placeholder="e.g., Scenic Boat Journey" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 2: Time
                                </label>
                                <Input placeholder="e.g., 8:30 AM - 30 minutes" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Step 2: Description
                              </label>
                              <Textarea
                                rows={2}
                                placeholder="Cruise through crystal-clear waters to the statue location while learning about the area's history."
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 3: Title
                                </label>
                                <Input placeholder="e.g., Underwater Adventure" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 3: Time
                                </label>
                                <Input placeholder="e.g., 9:00 AM - 2.5 hours" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Step 3: Description
                              </label>
                              <Textarea
                                rows={2}
                                placeholder="Snorkel around the iconic Christ statue and explore the vibrant coral reef ecosystem."
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 4: Title
                                </label>
                                <Input placeholder="e.g., Return & Reflection" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Step 4: Time
                                </label>
                                <Input placeholder="e.g., 11:30 AM - 30 minutes" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Step 4: Description
                              </label>
                              <Textarea
                                rows={2}
                                placeholder="Relax on the return journey while sharing your experience and planning future adventures."
                              />
                            </div>
                          </div>
                        </div>

                        {/* Experience Details */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🌊 Experience Details
                          </h3>
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Main Experience Description
                              </label>
                              <Textarea
                                rows={4}
                                placeholder="Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park"
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Feature 1: Title
                                </label>
                                <Input placeholder="e.g., Iconic Underwater Statue" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Feature 1: Description
                                </label>
                                <Textarea
                                  rows={3}
                                  placeholder="Visit the famous 9-foot bronze Christ of the Abyss statue, standing majestically in 25 feet of crystal-clear water..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Feature 2: Title
                                </label>
                                <Input placeholder="e.g., Pristine Marine Sanctuary" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Feature 2: Description
                                </label>
                                <Textarea
                                  rows={3}
                                  placeholder="Snorkel through vibrant coral gardens teeming with tropical fish in America's first underwater park..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Feature 3: Title
                                </label>
                                <Input placeholder="e.g., Expert Guidance" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Feature 3: Description
                                </label>
                                <Textarea
                                  rows={3}
                                  placeholder="Our PADI certified dive masters provide comprehensive safety briefings and marine life education..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* What&apos;s Included */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            ✅ What&apos;s Included
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Included Items (one per line)
                            </label>
                            <Textarea
                              rows={8}
                              placeholder="Professional snorkeling equipment&#10;PADI certified dive guide&#10;John Pennekamp park entrance&#10;Marine life identification guide&#10;Safety equipment & briefing&#10;Free parking"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Each line becomes a checkmark item
                            </p>
                          </div>
                        </div>

                        {/* Marine Life Section */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🐠 Marine Life Discovery
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Marine Life Overview
                              </label>
                              <Textarea
                                rows={3}
                                placeholder="John Pennekamp Coral Reef State Park hosts over 65 species of tropical fish and 40 species of coral in this protected underwater sanctuary."
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Fish Species (one per line)
                                </label>
                                <Textarea
                                  rows={4}
                                  placeholder="Queen Angelfish&#10;Stoplight Parrotfish&#10;Yellowtail Snapper"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Coral Types (one per line)
                                </label>
                                <Textarea
                                  rows={4}
                                  placeholder="Brain Coral Colonies&#10;Sea Fan Gardens&#10;Staghorn Formations"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Photography Features (one per line)
                                </label>
                                <Textarea
                                  rows={4}
                                  placeholder="Professional Photo Tips&#10;Camera Rental Available&#10;Perfect Lighting Conditions"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🏆 Trust Indicators
                          </h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Years Experience
                              </label>
                              <Input placeholder="e.g., 25+" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Happy Guests
                              </label>
                              <Input placeholder="e.g., 50,000+" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Average Rating
                              </label>
                              <Input placeholder="e.g., 4.9/5" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Safety Record
                              </label>
                              <Input placeholder="e.g., 100%" />
                            </div>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            💰 Booking & Pricing
                          </h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Starting Price
                              </label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                  type="number"
                                  step="0.01"
                                  className="pl-10"
                                  placeholder="70.00"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tax Rate (%)
                              </label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="7"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cancellation Policy
                              </label>
                              <Input placeholder="Free cancellation up to 24 hours" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Group Size
                              </label>
                              <Input type="number" placeholder="25" />
                            </div>
                          </div>
                        </div>

                        {/* Final CTA Section */}
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            📞 Final Call-to-Action
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CTA Headline
                              </label>
                              <Input placeholder="Ready for Your Underwater Adventure?" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CTA Description
                              </label>
                              <Textarea
                                rows={2}
                                placeholder="Book your Christ of the Abyss experience today and create memories that will last a lifetime."
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Primary Button Text
                                </label>
                                <Input placeholder="Book Your Tour Now" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Phone Number
                                </label>
                                <Input placeholder="(305) 391-4040" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trust Elements (one per line)
                              </label>
                              <Textarea
                                rows={3}
                                placeholder="Instant confirmation&#10;Free cancellation&#10;Best price guarantee"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Tag className="w-4 h-4 text-blue-600" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-blue-900 mb-1">
                                Christ Statue Tour Template Generator
                              </h4>
                              <p className="text-sm text-blue-800">
                                These fields will automatically populate your
                                tour template with all the content from the
                                Christ Statue tour page. Complete all sections
                                to create a comprehensive tour experience that
                                matches our best-performing template.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : contentData &&
                      isScubaGearProduct(contentData.categories) ? (
                      // Scuba Gear Product Form
                      <>
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🤿 Scuba Gear Product Details
                          </h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Brand
                                </label>
                                <Input placeholder="e.g., ScubaPro, Aqualung" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Model
                                </label>
                                <Input placeholder="e.g., MK25 EVO" />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Color Options
                                </label>
                                <Input placeholder="e.g., Black, Blue, Red" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Size Range
                                </label>
                                <Input placeholder="e.g., XS-XXL, 5-12" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Material
                                </label>
                                <Input placeholder="e.g., Neoprene, Titanium" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            📦 Product Features
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Key Features (one per line)
                              </label>
                              <Textarea
                                rows={4}
                                placeholder="Professional grade construction&#10;Environmentally sealed first stage&#10;Balanced second stage&#10;Cold water rated"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Skill Level
                                </label>
                                <Input placeholder="e.g., Beginner, Intermediate, Professional" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Warranty Period
                                </label>
                                <Input placeholder="e.g., 2 Years, Lifetime" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🚚 Shipping & Service
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shipping Info
                              </label>
                              <Input placeholder="e.g., Free shipping over $99" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Available
                              </label>
                              <Input placeholder="e.g., Factory Authorized Service" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-4 h-4 text-purple-600" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-purple-900 mb-1">
                                Scuba Gear Template (Product Template 1A)
                              </h4>
                              <p className="text-sm text-purple-800">
                                This product will use the professional scuba
                                gear template with product gallery, detailed
                                specifications, and e-commerce features.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : contentData &&
                      isCertificationProduct(contentData.categories) ? (
                      // Certification Course Form
                      <>
                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🎓 Certification Course Details
                          </h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Certification Agency
                                </label>
                                <Input placeholder="e.g., PADI, SSI, NAUI" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Course Level
                                </label>
                                <Input placeholder="e.g., Beginner, Advanced, Professional" />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Course Duration
                                </label>
                                <Input placeholder="e.g., 3 Days, 1 Week" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Number of Dives
                                </label>
                                <Input placeholder="e.g., 4 Dives" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Max Depth
                                </label>
                                <Input placeholder="e.g., 60 feet, 100 feet" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            📚 Course Content
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                What's Included (one per line)
                              </label>
                              <Textarea
                                rows={4}
                                placeholder="E-learning materials&#10;Pool training sessions&#10;Open water dives&#10;Digital certification card&#10;Equipment for training"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Prerequisites
                                </label>
                                <Input placeholder="e.g., Open Water Certified, None" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Age Minimum
                                </label>
                                <Input placeholder="e.g., 10 years, 15 years" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-b pb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            🎯 Course Benefits
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Skills You'll Learn (one per line)
                              </label>
                              <Textarea
                                rows={3}
                                placeholder="Underwater navigation&#10;Deep diving techniques&#10;Emergency procedures&#10;Equipment maintenance"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                After Certification
                              </label>
                              <Textarea
                                rows={2}
                                placeholder="Dive to 100 feet&#10;Plan your own dives&#10;Guide other divers"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Globe className="w-4 h-4 text-green-600" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-green-900 mb-1">
                                Certification Template
                              </h4>
                              <p className="text-sm text-green-800">
                                This course will use the dedicated certification
                                template with course details, instructor
                                information, and booking system.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Other Product Categories - Default form
                      <div className="text-center py-12 text-gray-500">
                        <div className="text-gray-400 mb-4">
                          <Tag className="w-12 h-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Custom Fields
                        </h3>
                        <p className="mb-2">
                          This product doesn't match any specific template
                          categories yet.
                        </p>
                        {contentData && (
                          <div className="text-sm text-gray-600 mt-4">
                            <p>
                              <strong>Product Categories:</strong>{" "}
                              {contentData.categories
                                .map((cat) => cat.name)
                                .join(", ")}
                            </p>
                            <p className="mt-1 text-blue-600">
                              Add this product to "All Tours & Trips", "Scuba
                              Gear", or "Certification Courses" categories to
                              enable template-specific forms.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Status
                </h3>
                <Badge
                  className={
                    contentData.status === "publish"
                      ? "bg-green-100 text-green-800"
                      : contentData.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }
                >
                  {contentData.status}
                </Badge>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(contentData.date).toLocaleDateString()}
                    </span>
                  </div>
                  {contentData.author && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>Author: {contentData.author}</span>
                    </div>
                  )}
                  {contentData.categories &&
                    contentData.categories.length > 0 && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Tag className="w-4 h-4" />
                        <span>
                          {contentData.categories
                            .map((cat) => cat.name)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                </div>
              </div>

              {/* Product-specific sidebar info */}
              {type === "product" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Product Info
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    {contentData.price && (
                      <div>Price: ${contentData.price}</div>
                    )}
                    {contentData.sku && <div>SKU: {contentData.sku}</div>}
                    {contentData.stock_quantity !== undefined && (
                      <div>Stock: {contentData.stock_quantity}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="border-t pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={saveContent}
                    disabled={saving}
                    className="w-full"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>

                  {contentData.permalink && (
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={contentData.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Live
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
