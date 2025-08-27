"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Eye,
  Search,
  // Filter,
  FileText,
  ShoppingCart,
  Globe,
  Calendar,
  User,
  Tag,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  type: "page" | "post" | "product";
  status: string;
  date: string;
  author?: string;
  categories: Array<{ id: number; name: string; slug: string; count?: number }>;
  permalink: string;
  price?: string;
  featured_media?: string;
  migration_enabled?: boolean;
}

interface CategoryFilter {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
}

export default function ContentManager() {
  // Start with empty state to avoid hydration issues
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<CategoryFilter[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);
  // Filters
  const [contentType, setContentType] = useState<string>("products");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Load content based on type - using real WooCommerce data from sync endpoint
  const loadContent = async (
    pageOrEvent?: number | React.MouseEvent<HTMLButtonElement>,
    append: boolean = false,
    attempt: number = 1,
  ) => {
    if (typeof pageOrEvent !== "number") {
      // It was a click event → default to page 1
      pageOrEvent = 1;
    }
    const page = pageOrEvent;

    if (!append) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let data = [];

      // Only handle products now
      if (contentType === "products") {
        // Try sync endpoint first, fallback to regular products if it fails
        console.log(`Loading WooCommerce products... (attempt ${attempt})`);

        try {
          // Try the sync endpoint first for real WooCommerce data (no timeout - let it complete)
          console.log("🔄 Attempting to sync with WooCommerce...");

          const response = await fetch("/api/products/sync", {
            headers: {
              "Cache-Control": "no-cache",
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(
              `Sync HTTP ${response.status}: ${response.statusText}`,
            );
          }

          const result = await response.json();

          if (result.success) {
            data = result.data.real_products;
            const isTimeout = result.timeoutOccurred || result.isDemoData;
            setIsDemoData(isTimeout); // Mark as demo if timeout occurred

            // Data loaded successfully with timeout awareness

            setHasMore(false);
          } else {
            throw new Error(result.message || "Sync failed");
          }
        } catch (syncError) {
          console.warn(
            "Sync endpoint failed, trying fallback:",
            syncError.message,
          );

          try {
            // Fallback to regular products endpoint
            const fallbackResponse = await fetch("/api/products?limit=50", {
              headers: {
                "Cache-Control": "no-cache",
                Accept: "application/json",
              },
            });

            if (!fallbackResponse.ok) {
              throw new Error(
                `Fallback HTTP ${fallbackResponse.status}: ${fallbackResponse.statusText}`,
              );
            }

            const fallbackResult = await fallbackResponse.json();

            if (fallbackResult.success) {
              data = fallbackResult.products;
              const isDemo = fallbackResult.isDemoData || false;
              setIsDemoData(isDemo);
              setHasMore(!isDemo && data.length === 50);
            } else {
              throw new Error(fallbackResult.message || "Fallback API failed");
            }
          } catch (fallbackError) {
            console.warn(
              "All API endpoints failed, using offline demo data:",
              fallbackError.message,
            );

            // Final fallback: Use demo data when all APIs fail
            data = [
              {
                id: 1234,
                name: "Key Largo Christ Statue Snorkeling Tour",
                slug: "key-largo-christ-statue-snorkeling-tour",
                status: "publish",
                type: "simple",
                price: "99.00",
                permalink:
                  "https://keylargoscubadiving.com/product/key-largo-christ-statue-snorkeling-tour/",
                categories: [
                  {
                    id: 123,
                    name: "Snorkeling Tours",
                    slug: "snorkeling-tours",
                  },
                  { id: 456, name: "Tours & Trips", slug: "tours-trips" },
                ],
                images: [
                  {
                    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
                  },
                ],
                date_created: new Date().toISOString(),
              },
              {
                id: 5678,
                name: "Reef Snorkeling Adventure",
                slug: "reef-snorkeling-adventure",
                status: "publish",
                type: "simple",
                price: "75.00",
                permalink:
                  "https://keylargoscubadiving.com/product/reef-snorkeling-adventure/",
                categories: [
                  {
                    id: 123,
                    name: "Snorkeling Tours",
                    slug: "snorkeling-tours",
                  },
                  { id: 789, name: "Reef Tours", slug: "reef-tours" },
                ],
                images: [
                  {
                    src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7",
                  },
                ],
                date_created: new Date().toISOString(),
              },
              {
                id: 9999,
                name: "PADI Scuba Gear Rental",
                slug: "padi-scuba-gear-rental",
                status: "publish",
                type: "simple",
                price: "45.00",
                permalink:
                  "https://keylargoscubadiving.com/product/padi-scuba-gear-rental/",
                categories: [
                  { id: 333, name: "Scuba Gear", slug: "scuba-gear" },
                  { id: 444, name: "Equipment", slug: "equipment" },
                ],
                images: [
                  {
                    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
                  },
                ],
                date_created: new Date().toISOString(),
              },
            ];

            setIsDemoData(true);
            setHasMore(false);
          }
        }
      }

      // Transform REAL WooCommerce data to consistent format
      const transformedItems: ContentItem[] = data.map((item: any) => ({
        id: item.id,
        title: item.name || "Untitled",
        type: "product" as const,
        status: item.status || "publish",
        date:
          item.date_created ||
          item.date_created_gmt ||
          item.date_modified ||
          new Date().toISOString(),
        author: "Admin",
        categories: Array.isArray(item.categories) ? item.categories : [],
        permalink: item.permalink || "#",
        price: item.price || item.regular_price || undefined,
        featured_media: item.images?.[0]?.src || undefined,
        migration_enabled:
          item.meta_data?.find(
            (meta: any) => meta.key === "_nextjs_migration_enabled",
          )?.value === "yes",
      }));

      // Append to existing items or replace them
      if (append) {
        setContentItems((prev) => [...prev, ...transformedItems]);
      } else {
        setContentItems(transformedItems);
      }

      setCurrentPage(page);
    } catch (error) {
      console.error(`Failed to load content (attempt ${attempt}):`, error);

      let errorMessage = "Failed to load content";

      if (
        error.message?.includes("permissions") ||
        error.message?.includes("401")
      ) {
        errorMessage =
          "WooCommerce API permissions error - using demo data instead";
        console.log("🔄 Switching to demo mode due to API permissions");
      } else if (
        error.message?.includes("Failed to fetch") ||
        error.message?.includes("NetworkError")
      ) {
        const isDev = process.env.NODE_ENV === "development";
        if (isDev) {
          errorMessage =
            "Development server connection issue. This often resolves automatically.";
        } else {
          errorMessage =
            "Network connection error. Please check your internet connection.";
        }
      } else if (error.message?.includes("HTTP")) {
        errorMessage = `Server error: ${error.message}`;
      } else {
        errorMessage = `Load error: ${error.message}`;
      }

      // No retries for API permission errors - just use demo data immediately
      if (
        error.message?.includes("permissions") ||
        error.message?.includes("401")
      ) {
        // Don't retry for permission errors, just fail fast and use demo data
      } else {
        // Simple retry logic for network failures only
        const shouldRetry =
          attempt < 2 && // Reduced to 2 attempts
          (error.message?.includes("Failed to fetch") ||
            error.message?.includes("NetworkError"));

        if (shouldRetry) {
          const retryDelay = 3000; // Fixed 3-second delay
          setTimeout(() => {
            loadContent(page, append, attempt + 1);
          }, retryDelay);
          return; // Don't set loading to false yet, retry is happening
        }
      }

      // For permission errors, don't show as error since we have demo data
      if (
        error.message?.includes("permissions") ||
        error.message?.includes("401")
      ) {
        // Don't clear content items, the demo data should be loaded already
      } else {
        console.error("All retry attempts failed:", errorMessage);
        if (!append) setContentItems([]);
      }
    } finally {
      if (!append) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  // Load categories from the same sync data to ensure consistency
  const loadCategories = async () => {
    try {
      if (contentType === "products") {
        // Use the same sync endpoint to get categories that match the products

        try {
          const response = await fetch("/api/products/sync", {
            headers: {
              "Cache-Control": "no-cache",
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(
              `Sync HTTP ${response.status}: ${response.statusText}`,
            );
          }

          const result = await response.json();

          if (result.success) {
            const categoriesData = result.data.real_categories;
            setCategories(categoriesData);
          } else {
            throw new Error(result.message || "Sync failed for categories");
          }
        } catch (syncError) {
          console.warn(
            "Categories sync failed, using demo categories:",
            syncError.message,
          );

          // Demo categories that match our demo products
          const demoCategories = [
            {
              id: 123,
              name: "Snorkeling Tours",
              slug: "snorkeling-tours",
              count: 2,
              parent: 0,
            },
            {
              id: 456,
              name: "Tours & Trips",
              slug: "tours-trips",
              count: 2,
              parent: 0,
            },
            {
              id: 789,
              name: "Reef Tours",
              slug: "reef-tours",
              count: 1,
              parent: 0,
            },
            {
              id: 333,
              name: "Scuba Gear",
              slug: "scuba-gear",
              count: 1,
              parent: 0,
            },
            {
              id: 444,
              name: "Equipment",
              slug: "equipment",
              count: 1,
              parent: 0,
            },
          ];

          setCategories(demoCategories);
        }
      }
    } catch (error) {
      console.warn("Categories loading failed (non-critical):", error);
      setCategories([]);
    }
  };

  // Toggle migration status for an item
  const toggleMigration = async (itemId: number, currentStatus: boolean) => {
    try {
      // For now, just update local state (we'd need a PUT API route for actual updates)
      // TODO: Create /api/products/[id] PUT route for actual updates

      // Update local state immediately for better UX
      setContentItems((items) =>
        items.map((item) =>
          item.id === itemId
            ? { ...item, migration_enabled: !currentStatus }
            : item,
        ),
      );

      console.log(
        `Migration ${currentStatus ? "disabled" : "enabled"} for product ${itemId} (local state only)`,
      );
    } catch (error) {
      console.error("Failed to toggle migration:", error);
    }
  };

  // Filter content items using real WooCommerce category data
  const filteredItems = contentItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesCategory = false;
    if (selectedCategory === "all") {
      matchesCategory = true;
    } else if (selectedCategory === "tours") {
      // Match anything with "tour" or "trip" in the category name
      matchesCategory = item.categories.some((cat) => {
        const name = cat.name.toLowerCase();
        return (
          name.includes("tour") ||
          name.includes("trip") ||
          name.includes("snorkel") ||
          name.includes("diving")
        );
      });
    } else if (selectedCategory === "gear") {
      // Match anything with "gear", "scuba" or equipment-related terms
      matchesCategory = item.categories.some((cat) => {
        const name = cat.name.toLowerCase();
        return (
          name.includes("gear") ||
          name.includes("scuba") ||
          name.includes("equipment") ||
          name.includes("mask") ||
          name.includes("fin") ||
          name.includes("wetsuit") ||
          name.includes("regulator") ||
          name.includes("computer") ||
          name.includes("bcd") ||
          name.includes("rash") ||
          name.includes("guard")
        );
      });
    } else {
      // Match specific category slug OR name (more flexible matching)
      matchesCategory = item.categories.some(
        (cat) =>
          cat.slug === selectedCategory ||
          cat.name.toLowerCase() === selectedCategory.toLowerCase() ||
          cat.slug === selectedCategory.replace(/-/g, "-"), // Handle slug variations
      );
    }

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    // Debug logging removed to prevent hydration issues

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Load more content
  const loadMore = async () => {
    if (!loadingMore && hasMore) {
      await loadContent(currentPage + 1, true);
    }
  };

  // Effect hooks - Load test data and real data on client-side only
  useEffect(() => {
    // Set static test data with fixed dates (no hydration issues)
    const testData: ContentItem[] = [
      {
        id: 1001,
        title: "Test Snorkeling Tour",
        type: "product" as const,
        status: "publish",
        date: "2025-01-01T10:00:00.000Z", // Static date to avoid hydration issues
        author: "Admin",
        categories: [
          { id: 123, name: "Snorkeling Tours", slug: "snorkeling-tours" },
        ],
        permalink: "#",
        price: "99.00",
      },
      {
        id: 1002,
        title: "Test Scuba Gear",
        type: "product" as const,
        status: "publish",
        date: "2025-01-01T11:00:00.000Z", // Static date to avoid hydration issues
        author: "Admin",
        categories: [{ id: 456, name: "Scuba Gear", slug: "scuba-gear" }],
        permalink: "#",
        price: "75.00",
      },
      {
        id: 1003,
        title: "Test Diving Course",
        type: "product" as const,
        status: "publish",
        date: "2025-01-01T12:00:00.000Z", // Static date to avoid hydration issues
        author: "Admin",
        categories: [
          { id: 789, name: "Diving Courses", slug: "diving-courses" },
        ],
        permalink: "#",
        price: "299.00",
      },
    ];

    const testCategories: CategoryFilter[] = [
      {
        id: 123,
        name: "Snorkeling Tours",
        slug: "snorkeling-tours",
        count: 1,
        parent: 0,
      },
      { id: 456, name: "Scuba Gear", slug: "scuba-gear", count: 1, parent: 0 },
      {
        id: 789,
        name: "Diving Courses",
        slug: "diving-courses",
        count: 1,
        parent: 0,
      },
    ];

    // Set test data immediately (client-side only)
    setContentItems(testData);
    setCategories(testCategories);

    // Also try to load real data in background
    setCurrentPage(1);
    setHasMore(true);
    loadContent(1, false);
    loadCategories();
  }, []);

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "publish":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "private":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "product":
        return <ShoppingCart className="w-4 h-4" />;
      case "post":
        return <FileText className="w-4 h-4" />;
      case "page":
        return <Globe className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Product Manager
              </h1>
              <p className="text-gray-600">
                Manage your WooCommerce products with category-specific editing
                tools
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {isDemoData ? (
                <Badge className="bg-blue-100 text-blue-800">
                  🔄 Demo Mode - API Setup Needed
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-800">
                  ✅ Real WooCommerce Data
                </Badge>
              )}
              <Button variant="outline" asChild>
                <Link href="/product-sync">🔄 Product Sync Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {/* Top Row - Content Type, Search, Status */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Content Type Label */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                <ShoppingCart className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Products
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="publish">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bottom Row - Category Filters Full Width */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Categories
            </label>
            <div className="flex flex-wrap items-center gap-1">
              {/* All Products */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  selectedCategory === "all"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                All ({contentItems.length})
              </button>

              {categories.length > 0 && (
                <>
                  {/* Simplified category grouping */}
                  {(() => {
                    // Group categories by type
                    const tourCategories = categories.filter((cat) => {
                      const name = cat.name.toLowerCase();
                      return name.includes("tour") || name.includes("trip");
                    });

                    const gearCategories = categories.filter((cat) => {
                      const name = cat.name.toLowerCase();
                      return (
                        name.includes("gear") ||
                        name.includes("scuba") ||
                        name.includes("mask") ||
                        name.includes("fin") ||
                        name.includes("wetsuit") ||
                        name.includes("regulator") ||
                        name.includes("computer") ||
                        name.includes("bcd")
                      );
                    });

                    const otherCategories = categories.filter((cat) => {
                      const name = cat.name.toLowerCase();
                      return (
                        !name.includes("tour") &&
                        !name.includes("trip") &&
                        !name.includes("gear") &&
                        !name.includes("scuba") &&
                        !name.includes("mask") &&
                        !name.includes("fin") &&
                        !name.includes("wetsuit") &&
                        !name.includes("regulator") &&
                        !name.includes("computer") &&
                        !name.includes("bcd")
                      );
                    });

                    const tourCount = tourCategories.reduce(
                      (sum, cat) => sum + (cat.count || 0),
                      0,
                    );
                    const gearCount = gearCategories.reduce(
                      (sum, cat) => sum + (cat.count || 0),
                      0,
                    );

                    return (
                      <>
                        {/* Tours & Trips Group */}
                        {tourCategories.length > 0 && (
                          <>
                            <span className="text-gray-300 mx-1">|</span>
                            {/* <button
                              onClick={() => setSelectedCategory("tours")}
                              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                                selectedCategory === "tours"
                                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              Tours & Trips ({tourCount})
                            </button> */}

                            {tourCategories.map((category, index) => (
                              <button
                                key={`tour-${category.slug}-${index}`}
                                onClick={() =>
                                  setSelectedCategory(category.slug)
                                }
                                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                                  selectedCategory === category.slug
                                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                {category.name} ({category.count || 0})
                              </button>
                            ))}
                          </>
                        )}

                        {/* Scuba Gear Group */}
                        {gearCategories.length > 0 && (
                          <>
                            <span className="text-gray-300 mx-1">|</span>
                            <button
                              onClick={() => setSelectedCategory("gear")}
                              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                                selectedCategory === "gear"
                                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              Scuba Gear ({gearCount})
                            </button>

                            {gearCategories.map((category, index) => (
                              <button
                                key={`gear-${category.slug}-${index}`}
                                onClick={() =>
                                  setSelectedCategory(category.slug)
                                }
                                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                                  selectedCategory === category.slug
                                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                {category.name} ({category.count || 0})
                              </button>
                            ))}
                          </>
                        )}

                        {/* Other Categories */}
                        {otherCategories.length > 0 && (
                          <>
                            <span className="text-gray-300 mx-1">|</span>
                            {otherCategories.map((category, index) => (
                              <button
                                key={`other-${category.slug}-${index}`}
                                onClick={() =>
                                  setSelectedCategory(category.slug)
                                }
                                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                                  selectedCategory === category.slug
                                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                {category.name} ({category.count || 0})
                              </button>
                            ))}
                          </>
                        )}
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Products ({filteredItems.length})
              </h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    console.log("🔴 Manual refresh clicked");
                    loadContent(1, false);
                    loadCategories();
                  }}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Manual Load
                </Button>
                <Button
                  onClick={loadContent}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
              <p className="text-gray-600 mt-2">
                Loading WooCommerce {contentType}...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                🔄 Connecting to your store...
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Demo data will be used if API is not accessible
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <ShoppingCart className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {contentType === "products"
                  ? `No ${contentType} found`
                  : `${(contentType ?? "")
                      .charAt(0)
                      .toUpperCase()}${(contentType ?? "").slice(1)} Coming Soon`}
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your filters to see more results."
                  : isDemoData
                    ? "Demo products are loaded. Connect WooCommerce API to see your real products."
                    : "No products available. Create some in WooCommerce first."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex-shrink-0">
                          {getContentTypeIcon(item.type)}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        {item.price && (
                          <Badge variant="outline">${item.price}</Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        {item.author && (
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{item.author}</span>
                          </div>
                        )}
                        {item.categories.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Tag className="w-4 h-4" />
                            <span>
                              {item.categories
                                .map((cat) => cat.name)
                                .join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Migration Toggle */}
                      {item.type === "product" && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {item.migration_enabled ? "Next.js" : "WordPress"}
                          </span>
                          <button
                            onClick={() =>
                              toggleMigration(
                                item.id,
                                item.migration_enabled || false,
                              )
                            }
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {item.migration_enabled ? (
                              <ToggleRight className="w-6 h-6 text-green-500" />
                            ) : (
                              <ToggleLeft className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={item.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Live
                          </a>
                        </Button>
                        <Button size="sm" asChild>
                          <Link
                            href={`/content-manager/edit/${item.type}/${item.id}`}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit with Form
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && filteredItems.length > 0 && hasMore && (
            <div className="p-6 border-t">
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  variant="outline"
                  className="w-full"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading more products...
                    </>
                  ) : (
                    "Load More Products"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
