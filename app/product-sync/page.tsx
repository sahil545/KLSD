"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, ExternalLink, Edit } from "lucide-react";

interface RealProduct {
  id: number;
  name: string;
  slug: string;
  status: string;
  type: string;
  price: string;
  permalink: string;
  categories: Array<{ id: number; name: string; slug: string }>;
}

interface RealCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
}

interface SyncData {
  real_products: RealProduct[];
  real_categories: RealCategory[];
  sync_info: {
    total_products: number;
    total_categories: number;
    message: string;
  };
}

export default function ProductSync() {
  const [syncData, setSyncData] = useState<SyncData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSyncData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔄 Syncing with WooCommerce...");

      const response = await fetch("/api/products/sync", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      const result = await response.json();

      if (result.success) {
        setSyncData(result.data);
        console.log("✅ Sync successful:", result.message);
      } else {
        setError(result.message || "Failed to sync");
        console.error("❌ Sync failed:", result.error);
      }
    } catch (err) {
      setError("Failed to connect to sync API");
      console.error("❌ Sync error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyncData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "publish":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "private":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isSnorkelingTour = (product: RealProduct) => {
    return product.categories.some(
      (cat) =>
        cat.name.toLowerCase().includes("snorkel") ||
        cat.name.toLowerCase().includes("tour") ||
        cat.name.toLowerCase().includes("diving"),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                WooCommerce Product Sync
              </h1>
              <p className="text-gray-600">
                View your actual WooCommerce products and their real IDs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/content-manager">← Back to Product Manager</Link>
              </Button>
              <Button onClick={fetchSyncData} disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh Sync
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">
                Syncing with your WooCommerce store...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a moment to fetch all products
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Sync Failed
            </h2>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="text-sm text-red-600 bg-red-100 rounded p-4 mb-4">
              <p className="font-semibold mb-2">Troubleshooting:</p>
              <ul className="text-left space-y-1">
                <li>• Check WooCommerce API keys in .env.local</li>
                <li>• Verify API keys have read permissions</li>
                <li>• Ensure WordPress URL is correct</li>
                <li>• Check if WooCommerce is installed and active</li>
              </ul>
            </div>
            <Button onClick={fetchSyncData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : syncData ? (
          <div className="space-y-8">
            {/* Sync Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">📊 Sync Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {syncData.sync_info.total_products}
                  </div>
                  <div className="text-blue-800">Real Products Found</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {syncData.sync_info.total_categories}
                  </div>
                  <div className="text-green-800">Categories Found</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {syncData.real_products.filter(isSnorkelingTour).length}
                  </div>
                  <div className="text-purple-800">Tour/Diving Products</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  {syncData.sync_info.message}
                </p>
              </div>
            </div>

            {/* Real Products */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  🛍️ Your Actual WooCommerce Products
                </h2>
                <p className="text-gray-600">
                  These are the real product IDs you should use in the content
                  manager
                </p>
              </div>

              {syncData.real_products.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-600">
                    No products found in your WooCommerce store.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Create some products in WooCommerce first.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {syncData.real_products.map((product) => (
                    <div key={product.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="text-lg font-medium text-gray-900">
                              {product.name || "Untitled Product"}
                            </div>
                            <Badge className={getStatusColor(product.status)}>
                              {product.status}
                            </Badge>
                            {product.price && (
                              <Badge variant="outline">${product.price}</Badge>
                            )}
                            {isSnorkelingTour(product) && (
                              <Badge className="bg-blue-100 text-blue-800">
                                🤿 Tour Product
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div>
                              <strong>Real ID:</strong> {product.id}
                            </div>
                            <div>
                              <strong>Slug:</strong> {product.slug}
                            </div>
                            <div>
                              <strong>Type:</strong> {product.type}
                            </div>
                            {product.categories.length > 0 && (
                              <div>
                                <strong>Categories:</strong>{" "}
                                {product.categories
                                  .map((cat) => cat.name)
                                  .join(", ")}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Edit in Content Manager */}
                          <Button size="sm" asChild>
                            <Link
                              href={`/content-manager/edit/product/${product.id}`}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit with Form
                            </Link>
                          </Button>

                          {/* View Live Product */}
                          {product.permalink && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={product.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                View Live
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                  📂 Your Actual WooCommerce Categories
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {syncData.real_categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="font-medium text-gray-900">
                        {category.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        ID: {category.id} • Slug: {category.slug}
                      </div>
                      <div className="text-sm text-gray-500">
                        {category.count} products
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                🚀 Next Steps
              </h3>
              <div className="space-y-2 text-blue-800">
                <p>
                  1. <strong>Use real product IDs:</strong> Click &quot;Edit
                  with Form&quot; above to edit actual products
                </p>
                <p>
                  2. <strong>Create tour products:</strong> If you don&apos;t
                  have tour products, create them in WooCommerce first
                </p>
                <p>
                  3. <strong>Apply template:</strong> Add the WordPress
                  integration code to apply your custom template
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
