"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductTemplate1a from "../../product-template-1a/page";
import { Loader2 } from "lucide-react";

const CATEGORY_API_BASE =
  "https://keylargoscubadiving.com/wp-json/childtheme/v1/products-by-category/";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const productId = searchParams.get("productId");

  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!categoryId || !productId) {
        setError("Missing category ID or product ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${CATEGORY_API_BASE}${categoryId}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();

        // Handle both direct array and object with products array
        const products = Array.isArray(data) ? data : data.products || [];

        // Find the specific product by ID
        const product = products.find(
          (p: any) => p.id.toString() === productId,
        );

        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        setProductData(product);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch product data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [categoryId, productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-ocean mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-ocean text-white px-4 py-2 rounded hover:bg-ocean/90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested product could not be found.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-ocean text-white px-4 py-2 rounded hover:bg-ocean/90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <ProductTemplate1a productData={productData} />;
}
