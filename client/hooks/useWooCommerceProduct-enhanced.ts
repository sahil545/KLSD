import { usePathname } from "next/navigation";
import { wooCommerce } from "@/lib/woocommerce";
import type { WooCommerceProduct } from "@/lib/woocommerce";
import { useState, useEffect } from "react";

interface ProductAttribute {
  name: string;
  options: string[];
}

// Parsed tour data type
type TourData = {
  duration: string;
  groupSize: string;
  location: string;
  difficulty: string;
  gearIncluded: boolean;
  meetingPoint: string;
  cancellationPolicy: string;
  includedItems: string[];
  highlights: string[];
};

// Final product type with parsed tour data
interface WooCommerceProductData extends WooCommerceProduct {
  tourData: TourData;
}

// WordPress-provided tour data interface
interface WordPressTourData {
  isWooCommerceProduct: boolean;
  isTourProduct: boolean;
  productId: number;
  productData: {
    id: number;
    name: string;
    price: number;
    regularPrice: number;
    salePrice: number | null;
    description: string;
    shortDescription: string;
    stockQuantity: number;
    inStock: boolean;
    onSale: boolean;
    featured: boolean;
    categories: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
    permalink: string;
    images: {
      main: string;
      gallery: string[];
    };
    attributes: Record<string, string[]>;
    tourData: TourData;
    meta: TourData; // Backward compatibility
  };
  woocommerce: {
    addToCartUrl: string;
    cartNonce: string;
    currencySymbol: string;
    taxRate: number;
  };
  siteData: {
    siteUrl: string;
    themePath: string;
    phone: string;
    businessName: string;
  };
}

// Extend window interface for WordPress data
declare global {
  interface Window {
    klsdTourData?: WordPressTourData;
    klsdProductData?: any;
  }
}

// Helper function to get attribute value
const getAttributeValue = (
  attributes: ProductAttribute[],
  name: string,
): string => {
  const attr = attributes.find((a) =>
    a.name.toLowerCase().includes(name.toLowerCase()),
  );
  return attr?.options[0] || "";
};

// Helper function to get meta value
const getMetaValue = (meta_data: any[], key: string): any => {
  const meta = meta_data.find((m) => m.key === key);
  return meta?.value || "";
};

// Convert WordPress product data to our format
const convertWordPressData = (wpData: WordPressTourData): WooCommerceProductData => {
  const productData = wpData.productData;
  
  return {
    id: productData.id,
    name: productData.name,
    price: productData.price.toString(),
    regular_price: productData.regularPrice.toString(),
    sale_price: productData.salePrice?.toString() || "",
    description: productData.description,
    short_description: productData.shortDescription,
    stock_quantity: productData.stockQuantity,
    stock_status: productData.inStock ? "instock" : "outofstock",
    manage_stock: true,
    in_stock: productData.inStock,
    permalink: productData.permalink,
    categories: productData.categories,
    images: [
      {
        src: productData.images.main,
        alt: productData.name
      },
      ...productData.images.gallery.map(src => ({
        src,
        alt: productData.name
      }))
    ],
    attributes: [],
    meta_data: [],
    tourData: productData.tourData
  };
};

// Parse WooCommerce product data into tour-specific format
const parseTourData = (product: WooCommerceProduct): TourData => {
  const attributes = product.attributes || [];
  const meta_data = product.meta_data || [];

  return {
    duration:
      getAttributeValue(attributes, "duration") ||
      getMetaValue(meta_data, "_tour_duration") ||
      "4 Hours",
    groupSize:
      getAttributeValue(attributes, "group-size") ||
      getMetaValue(meta_data, "_group_size") ||
      "25 Max",
    location:
      getAttributeValue(attributes, "location") ||
      getMetaValue(meta_data, "_tour_location") ||
      "Key Largo",
    difficulty:
      getAttributeValue(attributes, "difficulty") ||
      getMetaValue(meta_data, "_difficulty_level") ||
      "All Levels",
    gearIncluded:
      getMetaValue(meta_data, "_gear_included") === "yes" ||
      getAttributeValue(attributes, "gear").includes("included"),
    meetingPoint:
      getMetaValue(meta_data, "_meeting_point") ||
      "Key Largo Scuba Diving Center",
    cancellationPolicy:
      getMetaValue(meta_data, "_cancellation_policy") ||
      "Free cancellation up to 24 hours before tour",
    includedItems:
      JSON.parse(getMetaValue(meta_data, "_included_items") || "[]").length > 0
        ? JSON.parse(getMetaValue(meta_data, "_included_items") || "[]")
        : [
            "Professional guide and safety briefing",
            "Transportation to/from dive sites",
            "Light refreshments and water",
          ],
    highlights:
      JSON.parse(getMetaValue(meta_data, "_tour_highlights") || "[]").length > 0
        ? JSON.parse(getMetaValue(meta_data, "_tour_highlights") || "[]")
        : [
            "Professional certified guides",
            "Small group experience",
            "All necessary equipment provided",
          ],
  };
};

export function useWooCommerceProduct(): {
  product: WooCommerceProductData | null;
  loading: boolean;
  error: string | null;
  isWordPressMode: boolean;
} {
  const pathname = usePathname();
  const [product, setProduct] = useState<WooCommerceProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWordPressMode, setIsWordPressMode] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if we're running in WordPress context (data provided by PHP)
        if (typeof window !== "undefined" && window.klsdTourData) {
          console.log("WordPress mode: Using provided tour data");
          setIsWordPressMode(true);
          const convertedProduct = convertWordPressData(window.klsdTourData);
          setProduct(convertedProduct);
          setLoading(false);
          return;
        }

        // Check for alternative WordPress data format
        if (typeof window !== "undefined" && window.klsdProductData) {
          console.log("WordPress mode: Using provided product data");
          setIsWordPressMode(true);
          const productData = window.klsdProductData;
          const formattedProduct: WooCommerceProductData = {
            ...productData,
            tourData: productData.tourData || parseTourData(productData),
          };
          setProduct(formattedProduct);
          setLoading(false);
          return;
        }

        // Extract product ID or slug from URL for API calls
        const productId = getProductIdFromUrl(pathname);

        // Check if we're in development mode (different domain from WordPress)
        const isDevelopment =
          typeof window !== "undefined" &&
          (window.location.hostname.includes("fly.dev") ||
            window.location.hostname === "localhost" ||
            window.location.hostname.includes("vercel.app") ||
            window.location.hostname.includes("netlify.app"));

        if (!productId || isDevelopment) {
          // Use mock data during development to avoid CORS issues
          console.log("Development mode: Using mock data");
          setIsWordPressMode(false);
          setProduct(getMockProductData(pathname));
          setLoading(false);
          return;
        }

        // In production, fetch from WooCommerce API
        console.log("Production mode: Fetching from WooCommerce API");
        setIsWordPressMode(false);
        const rawProduct = await wooCommerce.getProduct(productId);

        const formattedProduct: WooCommerceProductData = {
          ...rawProduct,
          tourData: parseTourData(rawProduct),
        };

        setProduct(formattedProduct);
      } catch (err) {
        // Check if this is an expected CORS error during development
        if (err instanceof Error && err.message.includes("CORS Error")) {
          console.log("CORS error detected, falling back to mock data");
          setError(null);
          setProduct(getMockProductData(pathname));
        } else {
          console.error("Error fetching product:", err);
          setError(
            err instanceof Error ? err.message : "Failed to fetch product",
          );
          // Fallback to mock data
          setProduct(getMockProductData(pathname));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [pathname]);

  return { product, loading, error, isWordPressMode };
}

// Extract product ID from URL patterns
function getProductIdFromUrl(pathname: string): number | null {
  // Handle different URL patterns
  if (pathname.includes("/product/")) {
    // WooCommerce product URLs - would need to map slug to ID
    return null; // For now, return null to use mock data
  }

  if (pathname.includes("christ-statue")) {
    return 34450; // Christ Statue Tour product ID
  }

  if (pathname.includes("molasses-reef")) {
    return 34451; // Molasses Reef product ID
  }

  return null;
}

// Mock data with realistic WooCommerce structure
function getMockProductData(pathname: string): WooCommerceProductData {
  const baseProduct = {
    sale_price: "",
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/",
    categories: [{ id: 15, name: "Snorkeling Tours", slug: "snorkeling-tours" }],
    images: [
      {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        alt: "Underwater tour experience",
      },
    ],
    stock_quantity: 25,
    attributes: [],
    meta_data: [],
  };

  if (pathname.includes("molasses-reef") || pathname.includes("dive-trips")) {
    return {
      id: 34451,
      name: "Molasses Reef Diving Adventure",
      price: "125.00",
      regular_price: "125.00",
      sale_price: "",
      description:
        "Explore the pristine coral formations of Molasses Reef, one of the most beautiful diving spots in the Florida Keys.",
      short_description:
        "Two-tank dive at beautiful Molasses Reef with certified dive master.",
      stock_quantity: 25,
      stock_status: "instock",
      manage_stock: true,
      in_stock: true,
      permalink: "https://staging13.keylargoscubadiving.com/product/molasses-reef/",
      categories: [{ id: 16, name: "Dive Trips", slug: "dive-trips" }],
      images: baseProduct.images,
      attributes: [],
      meta_data: [],
      tourData: {
        duration: "6 Hours",
        groupSize: "20 Max",
        location: "Key Largo",
        difficulty: "Certified Divers",
        gearIncluded: true,
        meetingPoint: "Key Largo Marina",
        cancellationPolicy: "Free cancellation up to 48 hours before dive",
        includedItems: [
          "Certified dive master guide",
          "Tank and weights included",
          "Two tank dive experience",
          "Transportation to dive sites",
          "Post-dive refreshments",
        ],
        highlights: [
          "Pristine coral formations",
          "Tropical fish encounters",
          "Professional dive master",
          "Two tank experience",
        ],
      },
    };
  }

  if (pathname.includes("certification")) {
    return {
      id: 34452,
      name: "PADI Open Water Certification",
      price: "499.00",
      regular_price: "499.00",
      sale_price: "",
      description:
        "Become a certified scuba diver with our comprehensive PADI Open Water course.",
      short_description:
        "Complete PADI Open Water certification course with experienced instructors.",
      stock_quantity: 25,
      stock_status: "instock",
      manage_stock: true,
      in_stock: true,
      permalink: "https://staging13.keylargoscubadiving.com/product/certification/",
      categories: [
        { id: 17, name: "Dive Certifications", slug: "dive-certifications" },
      ],
      images: baseProduct.images,
      attributes: [],
      meta_data: [],
      tourData: {
        duration: "3 Days",
        groupSize: "8 Max",
        location: "Key Largo",
        difficulty: "Beginner",
        gearIncluded: true,
        meetingPoint: "Key Largo Scuba Diving Center",
        cancellationPolicy: "Refundable up to 7 days before course start",
        includedItems: [
          "PADI certified instructor",
          "All learning materials included",
          "Equipment for training dives",
          "Certification card upon completion",
          "Digital logbook entry",
        ],
        highlights: [
          "PADI certified instruction",
          "Small class sizes",
          "Complete equipment provided",
          "Lifetime certification",
        ],
      },
    };
  }

  // Default: Christ Statue Tour
  return {
    id: 34450,
    name: "Christ of the Abyss Snorkeling Tour",
    price: "89.00",
    regular_price: "89.00",
    sale_price: "",
    description:
      "Visit the iconic underwater Christ of the Abyss statue, one of the most famous dive sites in the world.",
    short_description:
      "Snorkeling tour to the famous Christ of the Abyss statue in crystal clear waters.",
    stock_quantity: 25,
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/christ-statue-tour/",
    categories: baseProduct.categories,
    images: baseProduct.images,
    attributes: [],
    meta_data: [],
    tourData: {
      duration: "4 Hours",
      groupSize: "25 Max",
      location: "Key Largo",
      difficulty: "All Levels",
      gearIncluded: true,
      meetingPoint: "John Pennekamp Coral Reef State Park",
      cancellationPolicy: "Free cancellation up to 24 hours before tour",
      includedItems: [
        "Professional guide and safety briefing",
        "All snorkeling equipment provided",
        "Underwater photography spots",
        "Transportation to/from dive sites",
        "Light refreshments and water",
      ],
      highlights: [
        "Famous 9-foot bronze Christ statue",
        "Crystal-clear water visibility",
        "PADI certified guides",
        "Marine life education",
      ],
    },
  };
}

// Export both the enhanced hook and the original for backward compatibility
export { useWooCommerceProduct as useWooCommerceProductEnhanced };

// Helper function to get WordPress cart functions
export const useWordPressCartFunctions = () => {
  const addToCart = (productId: number, quantity: number = 1, guestData: any[] = []) => {
    if (typeof window !== "undefined" && window.klsdAddToCart) {
      return window.klsdAddToCart(productId, quantity, guestData);
    }
    
    // Fallback to form submission
    const formData = new FormData();
    formData.append("add-to-cart", productId.toString());
    formData.append("quantity", quantity.toString());
    
    if (window.klsdWooCommerce?.cartNonce) {
      formData.append("woocommerce-cart-nonce", window.klsdWooCommerce.cartNonce);
    }
    
    return fetch(window.location.href, {
      method: "POST",
      body: formData,
    }).then(() => {
      if (window.klsdWooCommerce?.addToCartUrl) {
        window.location.href = window.klsdWooCommerce.addToCartUrl;
      }
    });
  };

  return { addToCart };
};
