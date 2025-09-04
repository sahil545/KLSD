import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../../client/lib/woocommerce";
import { TourData } from "../../../snorkeling-tours-template/data";

export const dynamic = "force-dynamic";

// Convert WooCommerce product to TourData format
function convertWooCommerceToTourData(wooProduct: any): TourData {
  const meta = wooProduct.meta_data || [];
  const get = (k: string) => meta.find((m: any) => m.key === k)?.value;

  // Details
  const durationRaw =
    get("_wcf_duration") ??
    get("_klsd_test_duration") ??
    get("_wc_booking_duration") ??
    get("_booking_duration");
  const duration = durationRaw ? `${durationRaw} Hours` : "4 Hours";

  const groupRaw =
    get("_wcf_group_size") ??
    get("_wc_booking_max_persons_group") ??
    get("_booking_capacity");
  const groupSize = groupRaw ? `${groupRaw} Max` : "25 Max";

  const location = (get("_wcf_location") as string) || "Key Largo";
  const gearIncluded = (get("_wcf_gear_included") as string) === "1" || true;
  const rating =
    parseFloat(get("_wcf_rating") ?? `${wooProduct.average_rating || 4.9}`) ||
    4.9;
  const reviewCount =
    parseInt(
      get("_wcf_review_count") ?? `${wooProduct.rating_count || 487}`,
      10,
    ) || 487;

  // Pricing
  const basePrice = parseFloat(
    get("_wcf_pricing_base") ??
      wooProduct.regular_price ??
      wooProduct.price ??
      "70",
  );
  const taxRate = parseFloat(get("_wcf_pricing_tax") ?? "0.07");
  const currency = (get("_wcf_pricing_currency") as string) || "USD";

  // Images
  const heroImage =
    (get("_wcf_hero_bg_image") as string) ||
    wooProduct.images?.[0]?.src ||
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop";
  const galleryImages = wooProduct.images?.map((img: any) => img.src) || [
    heroImage,
  ];

  // Experience / Included
  const expTitle =
    (get("_wcf_exp_title") as string) || "What Makes This Experience Special";
  const expDesc =
    (get("_wcf_exp_desc") as string) || wooProduct.short_description || "";
  const expFeatures = get("_wcf_exp_features") || [
    {
      icon: "Fish",
      title: "Iconic Underwater Statue",
      description:
        "Visit the famous 9-foot bronze Christ of the Abyss statue, standing majestically in 25 feet of crystal-clear water as a beacon of peace and wonder.",
    },
    {
      icon: "Waves",
      title: "Pristine Marine Sanctuary",
      description:
        "Snorkel through vibrant coral gardens teeming with tropical fish in America's first underwater park, protected since 1963.",
    },
    {
      icon: "Shield",
      title: "Expert Guidance",
      description:
        "Our PADI certified dive masters provide comprehensive safety briefings and marine life education throughout your journey.",
    },
  ];

  const incTitle = (get("_wcf_inc_title") as string) || "What's Included";
  const incItems = get("_wcf_inc_items") || [
    "Professional snorkeling equipment",
    "PADI certified dive guide",
    "John Pennekamp park entrance",
    "Marine life identification guide",
    "Safety equipment & briefing",
    "Free parking",
  ];
  const incAward =
    (get("_wcf_inc_award") as string) || "Florida Keys Excellence Award Winner";

  // Journey
  const jTitle =
    (get("_wcf_journey_title") as string) || `Your ${duration} Journey`;
  const jDesc =
    (get("_wcf_journey_desc") as string) ||
    "From arrival to unforgettable memories";
  const jSteps = get("_wcf_journey_steps") || [
    {
      title: "Welcome & Preparation",
      description:
        "Meet our team at John Pennekamp State Park for equipment fitting and comprehensive safety briefing.",
      time: "8:00 AM - 30 minutes",
      color: "blue",
    },
    {
      title: "Scenic Boat Journey",
      description:
        "Cruise through crystal-clear waters to the statue location while learning about the area's history.",
      time: "8:30 AM - 30 minutes",
      color: "teal",
    },
    {
      title: "Underwater Adventure",
      description:
        "Snorkel around the iconic Christ statue and explore the vibrant coral reef ecosystem.",
      time: "9:00 AM - 2.5 hours",
      color: "orange",
    },
    {
      title: "Return & Reflection",
      description:
        "Relax on the return journey while sharing your experience and planning future adventures.",
      time: "11:30 AM - 30 minutes",
      color: "green",
    },
  ];

  // Marine
  const mTitle =
    (get("_wcf_marine_title") as string) || "Discover Incredible Marine Life";
  const mDesc =
    (get("_wcf_marine_desc") as string) ||
    "John Pennekamp Coral Reef State Park hosts over 65 species of tropical fish and 40 species of coral in this protected underwater sanctuary.";
  const mCats = get("_wcf_marine_categories") || [
    {
      title: "Tropical Fish Paradise",
      description:
        "Swim alongside vibrant parrotfish, graceful angelfish, curious sergeant majors, and over 60 other colorful species that call these reefs home.",
      color: "blue",
      features: [
        "Queen Angelfish",
        "Stoplight Parrotfish",
        "Yellowtail Snapper",
      ],
    },
    {
      title: "Living Coral Gardens",
      description:
        "Explore thriving coral formations including massive brain corals, delicate sea fans, and the iconic elkhorn coral structures.",
      color: "teal",
      features: [
        "Brain Coral Colonies",
        "Sea Fan Gardens",
        "Staghorn Formations",
      ],
    },
    {
      title: "Underwater Photography",
      description:
        "Capture stunning images of the Christ statue surrounded by marine life with crystal-clear 60-80 foot visibility perfect for photography.",
      color: "orange",
      features: [
        "Professional Photo Tips",
        "Camera Rental Available",
        "Perfect Lighting Conditions",
      ],
    },
  ];

  // Trust
  const tTitle =
    (get("_wcf_trust_title") as string) || "Why Key Largo Scuba Diving";
  const tSub =
    (get("_wcf_trust_subtitle") as string) ||
    "The Florida Keys' most trusted diving experience";
  const tStats = get("_wcf_trust_stats") || [
    { value: "25+", label: "Years Experience" },
    { value: "50,000+", label: "Happy Guests" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "100%", label: "Safety Record" },
  ];

  // Final CTA
  const fTitle =
    (get("_wcf_final_title") as string) ||
    "Ready for Your Underwater Adventure?";
  const fDesc =
    (get("_wcf_final_desc") as string) ||
    "Book your Christ of the Abyss experience today and create memories that will last a lifetime.";
  const fPhone = (get("_wcf_final_phone") as string) || "(305) 391-4040";
  const fBenefits = get("_wcf_final_benefits") || [
    "Instant confirmation",
    "Free cancellation",
    "Best price guarantee",
  ];

  return {
    name: wooProduct.name || "Live WooCommerce Product",
    description: wooProduct.short_description || wooProduct.description || "",
    images: { hero: heroImage, gallery: galleryImages },
    categories: wooProduct.categories?.map((c: any) => c.name) || ["Tours"],
    details: {
      duration,
      groupSize,
      location,
      gearIncluded,
      rating,
      reviewCount,
    },
    highlights: get("_wcf_highlights") || [
      "Famous 9-foot bronze Christ statue in crystal-clear water",
      "All snorkeling equipment included",
      "PADI certified guides",
      "Small group experience",
    ],
    pricing: { basePrice, taxRate, currency },
    experience: {
      title: expTitle,
      description: expDesc,
      features: expFeatures,
    },
    included: { title: incTitle, items: incItems, award: incAward },
    journey: {
      title: jTitle,
      description: jDesc,
      steps: (jSteps as any[]).map((s, i) => ({
        step: i + 1,
        title: s.title || "",
        description: s.description || "",
        time: s.time || "",
        color: (s.color as any) || "blue",
      })),
    },
    marineLife: { title: mTitle, description: mDesc, categories: mCats },
    trustIndicators: { title: tTitle, subtitle: tSub, stats: tStats },
    finalCTA: {
      title: fTitle,
      description: fDesc,
      phone: fPhone,
      benefits: fBenefits,
    },
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    console.log(`Fetching live product data for ID: ${id}`);

    // Try direct WooCommerce API call for live data
    const wooResponse = await fetch(
      `https://keylargoscubadiving.com/wp-json/wc/v3/products/${id}?_fields=id,name,categories,price,stock_quantity,stock_status,images,meta_data,wcf_tour_data`,
      {
        headers: {
          Authorization: `Basic ${btoa("ck_d0e9e6f20a1ecc40f797058c27e46aee21bf10b9:cs_3d3aa1c520bd3687d83ae3932b70683a7126af28")}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (wooResponse.ok) {
      const wooProduct = await wooResponse.json();
      console.log(`✅ Live WooCommerce data fetched: ${wooProduct.name}`);

      // Prefer server-provided tour data from plugin if available
      const wcfTour: any | null = (wooProduct as any).wcf_tour_data ?? null;

      const categories = wooProduct.categories || [];
      const isTestingCategory =
        categories.some(
          (cat: any) =>
            cat.name === "Testing Category" || cat.slug === "testing-category",
        ) || id === "34592";

      const tourData =
        (wcfTour as any) || convertWooCommerceToTourData(wooProduct);

      return NextResponse.json({
        success: true,
        source: wcfTour ? "live_woocommerce_wcf" : "live_woocommerce_converted",
        product: {
          tourData,
          isTestingCategory,
          name: wooProduct.name,
          price: wooProduct.price,
          stock: wooProduct.stock_quantity,
        },
      });
    }

    console.log("Direct WooCommerce API failed, trying legacy method...");

    // Fallback to legacy WooCommerce client with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API_TIMEOUT")), 5000);
    });

    const response = await Promise.race([
      wooCommerce.makeRequest(`/products/${id}`),
      timeoutPromise,
    ]);

    // Extract duration from KLSD Duration Test plugin meta data
    const metaData = response.meta_data || [];
    const durationMeta = metaData.find(
      (meta: any) => meta.key === "_klsd_test_duration",
    );
    const duration = durationMeta ? durationMeta.value : "XX NO"; // Fallback when no plugin data

    // Check if product is in Testing Category
    const categories = response.categories || [];
    const isTestingCategory = categories.some(
      (cat: any) =>
        cat.name === "Testing Category" || cat.slug === "testing-category",
    );

    // If plugin provided tour data, use it directly
    const legacyWcf: any | null = (response as any).wcf_tour_data ?? null;
    if (legacyWcf) {
      return NextResponse.json({
        success: true,
        source: "legacy_api_wcf",
        product: {
          tourData: legacyWcf,
          isTestingCategory,
          name: response.name,
          price: response.price,
          stock: response.stock_quantity,
        },
      });
    }

    // Format data for snorkeling tour template (fallback conversion)
    const templateData = {
      id: response.id,
      name: response.name,
      description: response.description,
      short_description: response.short_description,
      price: response.price,
      regular_price: response.regular_price,
      categories: categories,
      tourData: {
        name: response.name,
        description: response.short_description || response.description,
        images: {
          hero:
            response.images?.[0]?.src ||
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
          gallery: response.images?.map((img: any) => img.src) || [],
        },
        categories: categories.map((cat: any) => cat.name),
        details: {
          duration: duration === "XX NO" ? duration : `${duration} Hours`,
          groupSize: "25 Max",
          location: "Key Largo",
          gearIncluded: true,
          rating: 4.9,
          reviewCount: 487,
        },
        pricing: {
          basePrice: parseFloat(response.price || "70"),
          taxRate: 0.07,
          currency: "USD",
        },
      },
    };

    return NextResponse.json({
      success: true,
      source: "legacy_api_converted",
      product: {
        ...templateData,
        isTestingCategory,
      },
    });
  } catch (error) {
    console.error("Product Data API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const isCorsError =
      errorMessage.includes("CORS Error") ||
      errorMessage.includes("Failed to fetch");
    const isTimeoutError = errorMessage.includes("API_TIMEOUT");

    let message = "Failed to fetch product data";
    if (isCorsError) {
      message =
        "CORS blocked during development - this will work when deployed";
    } else if (isTimeoutError) {
      message = `Using fallback mock data for product ${id} due to: ${errorMessage}`;
      console.log(message);
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        isCorsError,
        isTimeoutError,
        message,
        source: "error_fallback",
      },
      { status: 200 },
    ); // Return 200 to prevent body stream issues
  }
}
