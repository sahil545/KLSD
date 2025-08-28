import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../../client/lib/woocommerce";
import { TourData } from "../../../snorkeling-tours-template/data";

export const dynamic = "force-dynamic";

// Convert WooCommerce product to TourData format
function convertWooCommerceToTourData(wooProduct: any): TourData {
  const metaData = wooProduct.meta_data || [];
  
  // Get duration from meta data or booking settings
  const durationMeta = metaData.find((meta: any) => 
    meta.key === '_klsd_test_duration' || 
    meta.key === '_wc_booking_duration' ||
    meta.key === '_booking_duration'
  );
  const duration = durationMeta ? `${durationMeta.value} Hours` : '4 Hours';
  
  // Get capacity
  const capacityMeta = metaData.find((meta: any) => 
    meta.key === '_wc_booking_max_persons_group' ||
    meta.key === '_booking_capacity'
  );
  const capacity = capacityMeta ? `${capacityMeta.value} Max` : '25 Max';
  
  // Get price
  const price = parseFloat(wooProduct.regular_price || wooProduct.price || '70');
  
  // Get product images
  const heroImage = wooProduct.images?.[0]?.src || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop";
  const galleryImages = wooProduct.images?.map((img: any) => img.src) || [heroImage];

  return {
    name: wooProduct.name || "Live WooCommerce Product",
    description: wooProduct.short_description || wooProduct.description || "Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park",
    images: {
      hero: heroImage,
      gallery: galleryImages
    },
    categories: wooProduct.categories?.map((cat: any) => cat.name) || ["Tours"],
    details: {
      duration: duration,
      groupSize: capacity,
      location: "Key Largo",
      gearIncluded: true,
      rating: 4.9,
      reviewCount: 487
    },
    highlights: [
      "Famous 9-foot bronze Christ statue in crystal-clear water",
      "All snorkeling equipment included", 
      "PADI certified guides",
      "Small group experience"
    ],
    pricing: { 
      basePrice: price, 
      taxRate: 0.07, 
      currency: "USD" 
    },
    experience: {
      title: "What Makes This Experience Special",
      description: wooProduct.short_description || "Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park",
      features: [
        { icon: "Fish", title: "Iconic Underwater Statue", description: "Visit the famous 9-foot bronze Christ of the Abyss statue, standing majestically in 25 feet of crystal-clear water as a beacon of peace and wonder." },
        { icon: "Waves", title: "Pristine Marine Sanctuary", description: "Snorkel through vibrant coral gardens teeming with tropical fish in America's first underwater park, protected since 1963." },
        { icon: "Shield", title: "Expert Guidance", description: "Our PADI certified dive masters provide comprehensive safety briefings and marine life education throughout your journey." }
      ]
    },
    included: {
      title: "What's Included",
      items: ["Professional snorkeling equipment", "PADI certified dive guide", "John Pennekamp park entrance", "Marine life identification guide", "Safety equipment & briefing", "Free parking"],
      award: "Florida Keys Excellence Award Winner"
    },
    journey: {
      title: `Your ${duration} Journey`,
      description: "From arrival to unforgettable memories",
      steps: [
        { step: 1, title: "Welcome & Preparation", description: "Meet our team at John Pennekamp State Park for equipment fitting and comprehensive safety briefing.", time: "8:00 AM - 30 minutes", color: "blue" as const },
        { step: 2, title: "Scenic Boat Journey", description: "Cruise through crystal-clear waters to the statue location while learning about the area's history.", time: "8:30 AM - 30 minutes", color: "teal" as const },
        { step: 3, title: "Underwater Adventure", description: "Snorkel around the iconic Christ statue and explore the vibrant coral reef ecosystem.", time: "9:00 AM - 2.5 hours", color: "orange" as const },
        { step: 4, title: "Return & Reflection", description: "Relax on the return journey while sharing your experience and planning future adventures.", time: "11:30 AM - 30 minutes", color: "green" as const }
      ]
    },
    marineLife: {
      title: "Discover Incredible Marine Life",
      description: "John Pennekamp Coral Reef State Park hosts over 65 species of tropical fish and 40 species of coral in this protected underwater sanctuary.",
      categories: [
        { title: "Tropical Fish Paradise", description: "Swim alongside vibrant parrotfish, graceful angelfish, curious sergeant majors, and over 60 other colorful species that call these reefs home.", color: "blue" as const, features: ["Queen Angelfish", "Stoplight Parrotfish", "Yellowtail Snapper"] },
        { title: "Living Coral Gardens", description: "Explore thriving coral formations including massive brain corals, delicate sea fans, and the iconic elkhorn coral structures.", color: "teal" as const, features: ["Brain Coral Colonies", "Sea Fan Gardens", "Staghorn Formations"] },
        { title: "Underwater Photography", description: "Capture stunning images of the Christ statue surrounded by marine life with crystal-clear 60-80 foot visibility perfect for photography.", color: "orange" as const, features: ["Professional Photo Tips", "Camera Rental Available", "Perfect Lighting Conditions"] }
      ]
    },
    trustIndicators: {
      title: "Why Key Largo Scuba Diving",
      subtitle: "The Florida Keys' most trusted diving experience",
      stats: [
        { value: "25+", label: "Years Experience" },
        { value: "50,000+", label: "Happy Guests" },
        { value: "4.9/5", label: "Average Rating" },
        { value: "100%", label: "Safety Record" }
      ]
    },
    finalCTA: {
      title: "Ready for Your Underwater Adventure?",
      description: "Book your Christ of the Abyss experience today and create memories that will last a lifetime.",
      phone: "(305) 391-4040",
      benefits: ["Instant confirmation", "Free cancellation", "Best price guarantee"]
    }
  };
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    console.log(`Fetching live product data for ID: ${id}`);

    // Try direct WooCommerce API call for live data
    const wooResponse = await fetch(`https://keylargoscubadiving.com/wp-json/wc/v3/products/${id}`, {
      headers: {
        'Authorization': `Basic ${btoa('ck_d0e9e6f20a1ecc40f797058c27e46aee21bf10b9:cs_3d3aa1c520bd3687d83ae3932b70683a7126af28')}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (wooResponse.ok) {
      const wooProduct = await wooResponse.json();
      console.log(`��� Live WooCommerce data fetched: ${wooProduct.name}`);
      
      // Check if product is in Testing Category or has specific ID
      const categories = wooProduct.categories || [];
      const isTestingCategory = categories.some((cat: any) => 
        cat.name === 'Testing Category' || cat.slug === 'testing-category'
      ) || id === '34592'; // Always allow our test product
      
      // Convert to tour data format
      const tourData = convertWooCommerceToTourData(wooProduct);
      
      return NextResponse.json({
        success: true,
        source: 'live_woocommerce',
        product: {
          tourData,
          isTestingCategory,
          name: wooProduct.name,
          price: wooProduct.price,
          stock: wooProduct.stock_quantity
        }
      });
    }

    console.log('Direct WooCommerce API failed, trying legacy method...');

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
    const durationMeta = metaData.find((meta: any) => meta.key === '_klsd_test_duration');
    const duration = durationMeta ? durationMeta.value : 'XX NO'; // Fallback when no plugin data

    // Check if product is in Testing Category
    const categories = response.categories || [];
    const isTestingCategory = categories.some((cat: any) => 
      cat.name === 'Testing Category' || cat.slug === 'testing-category'
    );

    // Format data for snorkeling tour template
    const templateData = {
      // Basic product info
      id: response.id,
      name: response.name,
      description: response.description,
      short_description: response.short_description,
      price: response.price,
      regular_price: response.regular_price,
      categories: categories,
      
      // Transform to template format
      tourData: {
        name: response.name,
        description: response.short_description || response.description,
        images: {
          hero: response.images?.[0]?.src || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
          gallery: response.images?.map((img: any) => img.src) || []
        },
        categories: categories.map((cat: any) => cat.name),
        details: {
          duration: duration === 'XX NO' ? duration : `${duration} Hours`,
          groupSize: "25 Max",
          location: "Key Largo", 
          gearIncluded: true,
          rating: 4.9,
          reviewCount: 487
        },
        pricing: {
          basePrice: parseFloat(response.price || '70'),
          taxRate: 0.07,
          currency: "USD"
        },
        // ... other template fields would be filled with defaults or extracted from meta
      }
    };

    return NextResponse.json({
      success: true,
      source: 'legacy_api',
      product: {
        ...templateData,
        isTestingCategory
      }
    });

  } catch (error) {
    console.error('Product Data API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isCorsError = errorMessage.includes('CORS Error') || errorMessage.includes('Failed to fetch');
    const isTimeoutError = errorMessage.includes('API_TIMEOUT');

    let message = "Failed to fetch product data";
    if (isCorsError) {
      message = "CORS blocked during development - this will work when deployed";
    } else if (isTimeoutError) {
      message = `Using fallback mock data for product ${id} due to: ${errorMessage}`;
      console.log(message);
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
      isCorsError,
      isTimeoutError,
      message,
      source: 'error_fallback'
    }, { status: 200 }); // Return 200 to prevent body stream issues
  }
}
