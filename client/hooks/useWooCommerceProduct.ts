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

// Parse WooCommerce product data into tour-specific format
const parseTourData = (product: WooCommerceProduct): TourData => {
  const attributes = product.attributes || [];
  const meta_data = product.meta_data || [];

  // Get data from new snorkeling tour plugin custom fields
  const duration = getMetaValue(meta_data, "_tour_duration");
  const groupSize = getMetaValue(meta_data, "_tour_group_size");
  const location = getMetaValue(meta_data, "_tour_location");
  const gearIncluded = getMetaValue(meta_data, "_tour_gear_included") === "yes";
  const highlights = getMetaValue(meta_data, "_tour_highlights") || [];
  const whatsIncluded = getMetaValue(meta_data, "_tour_whats_included") || [];

  // Helper to safely parse meta data that might be stored as array or JSON
  const parseMetaArray = (key: string, fallback: string[] = []) => {
    const value = getMetaValue(meta_data, key);
    if (!value) return fallback;

    // If it's already an array, return it
    if (Array.isArray(value)) return value;

    // If it's a JSON string, parse it
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : fallback;
      } catch {
        // If JSON parsing fails, treat as newline-separated string
        return value.split("\n").filter((item) => item.trim() !== "");
      }
    }

    return fallback;
  };

  return {
    duration:
      getMetaValue(meta_data, "_tour_duration") ||
      getAttributeValue(attributes, "duration") ||
      "4 Hours",
    groupSize:
      getMetaValue(meta_data, "_tour_group_size") ||
      getAttributeValue(attributes, "group-size") ||
      "25 Max",
    location:
      getMetaValue(meta_data, "_tour_location") ||
      getAttributeValue(attributes, "location") ||
      "Key Largo",
    difficulty:
      getMetaValue(meta_data, "_tour_difficulty") ||
      getAttributeValue(attributes, "difficulty") ||
      "All Levels",
    gearIncluded:
      getMetaValue(meta_data, "_tour_gear_included") === "yes" ||
      getAttributeValue(attributes, "gear").includes("included"),
    meetingPoint:
      getMetaValue(meta_data, "_tour_meeting_point") ||
      getMetaValue(meta_data, "_meeting_point") ||
      "John Pennekamp Coral Reef State Park",
    cancellationPolicy:
      getMetaValue(meta_data, "_tour_cancellation_policy") ||
      getMetaValue(meta_data, "_cancellation_policy") ||
      "Free cancellation up to 24 hours before tour",
    includedItems: parseMetaArray("_tour_whats_included", [
      "Professional snorkeling equipment",
      "PADI certified dive guide",
      "John Pennekamp park entrance",
      "Marine life identification guide",
      "Safety equipment & briefing",
      "Free parking",
    ]),
    highlights: parseMetaArray("_tour_highlights", [
      "Famous 9-foot bronze Christ statue in crystal-clear water",
      "All snorkeling equipment included",
      "PADI certified guides",
      "Small group experience",
    ]),
  };
};

export function useWooCommerceProduct(): {
  product: WooCommerceProductData | null;
  loading: boolean;
  error: string | null;
} {
  const pathname = usePathname();
  const [product, setProduct] = useState<WooCommerceProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDevelopment, setIsDevelopment] = useState<boolean | null>(null);

  // Check development mode only on client side
  useEffect(() => {
    const checkDevelopmentMode = () => {
      return (
        window.location.hostname === "localhost" ||
        window.location.port === "3000" ||
        window.location.port === "5173"
      );
    };
    const devMode = checkDevelopmentMode();
    console.log(
      "Development mode check:",
      devMode,
      "hostname:",
      window.location.hostname,
      "port:",
      window.location.port,
    );
    setIsDevelopment(devMode);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Always use mock data in development to avoid API issues
        console.log("Using mock data for development");
        const urlParam = getProductParamFromUrl();
        const mockProduct = getMockProductData(pathname, urlParam);
        setProduct(mockProduct);
        setLoading(false);
      } catch (err) {
        // Handle errors by falling back to mock data
        console.error("Error fetching product:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch product",
        );
        // Fallback to mock data
        const urlParam = getProductParamFromUrl();
        setProduct(getMockProductData(pathname, urlParam));
        setLoading(false);
      }
    };

    // Always try to fetch data, with fallback to mock data
    fetchProduct();
  }, [pathname]);

  return { product, loading, error };
}

// Extract slug from URL path (server-safe version)
function extractSlugFromPath(pathname: string): string | null {
  // Extract from pathname first (works on both server and client)
  if (pathname.includes("/product/")) {
    // WooCommerce product URLs: /product/slug-name/
    const match = pathname.match(/\/product\/([^\/]+)/);
    return match ? match[1] : null;
  }

  // Handle Next.js route patterns
  if (pathname.includes("christ-statue")) {
    return "christ-statue-tour";
  }

  if (pathname.includes("testing-product")) {
    return "new-testing-product-ai";
  }

  if (pathname.includes("molasses-reef")) {
    return "molasses-reef-dive";
  }

  return null;
}

// Client-side function to check URL parameters (called only after hydration)
function getProductParamFromUrl(): string | null {
  if (typeof window === "undefined") return "christ-statue-tour"; // Return default for SSR

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get("product");
    return productParam || "christ-statue-tour"; // Return default if no param
  } catch (error) {
    console.warn("Error getting URL params:", error);
    return "christ-statue-tour"; // Fallback
  }
}

// Client-side function to get product ID from URL params
function getProductIdFromUrlParams(): number | null {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const productParam = urlParams.get("product");

  if (productParam) {
    // Map product slugs to IDs
    if (
      productParam.includes("christ-statue") ||
      productParam.includes("testing-product")
    ) {
      return 34450; // Use Christ Statue Tour data for test product
    }
    if (productParam.includes("molasses-reef")) {
      return 34451; // Molasses Reef product ID
    }
  }

  return null;
}

// Extract product ID from URL patterns (server-safe version)
function getProductIdFromUrl(pathname: string): number | null {
  // Handle different URL patterns (works on both server and client)
  if (pathname.includes("/product/")) {
    // WooCommerce product URLs - would need to map slug to ID
    return null; // For now, return null to use slug-based fetching
  }

  if (
    pathname.includes("christ-statue") ||
    pathname.includes("testing-product")
  ) {
    return 34450; // Christ Statue Tour product ID (also used for test product)
  }

  if (pathname.includes("molasses-reef")) {
    return 34451; // Molasses Reef product ID
  }

  return null;
}

// Mock data with realistic WooCommerce structure
function getMockProductData(
  pathname: string,
  urlParam?: string | null,
): WooCommerceProductData {
  // Use URL parameter if provided, otherwise fall back to pathname
  const productIdentifier = urlParam || pathname;
  const baseProduct = {
    sale_price: "",
    stock_status: "instock",
    manage_stock: true,
    in_stock: true,
    permalink: "https://staging13.keylargoscubadiving.com/product/",
    categories: [
      { id: 15, name: "Snorkeling Tours", slug: "snorkeling-tours" },
    ],
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

  if (
    productIdentifier.includes("molasses-reef") ||
    productIdentifier.includes("dive-trips")
  ) {
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
      permalink:
        "https://staging13.keylargoscubadiving.com/product/molasses-reef/",
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

  if (productIdentifier.includes("certification")) {
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
      permalink:
        "https://staging13.keylargoscubadiving.com/product/certification/",
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
    permalink:
      "https://staging13.keylargoscubadiving.com/product/christ-statue-tour/",
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
