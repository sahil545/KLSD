import SnorkelingToursTemplate from "./SnorkelingToursTemplate";
import { TourData } from "./data";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function fetchProductData(productId: string): Promise<{ tourData: TourData | null; isTestingCategory: boolean; productName?: string }> {
  try {
    // Fetch from our product data API with timeout for fast SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://livewsnklsdlaucnh.netlify.app' : 'http://localhost:3000');

    // Create abort controller for fast timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second max for SSR

    const response = await fetch(`${baseUrl}/api/product-data/${productId}`, {
      cache: 'no-store', // Ensure fresh data for SSR
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Failed to fetch product data:', response.status);
      return { tourData: null, isTestingCategory: false };
    }

    const data = await response.json();

    if (!data.success) {
      console.error('API returned error:', data.error);
      return { tourData: null, isTestingCategory: false };
    }

    // Check if product is in Testing Category
    const isTestingCategory = data.product.isTestingCategory || false;

    // Return both tour data and category status
    return {
      tourData: data.product.tourData,
      isTestingCategory,
      productName: data.product.name
    };

  } catch (error) {
    // Handle timeout and network errors gracefully
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log('SSR fetch timeout - using fallback data for fast loading');
      } else {
        console.error('Error fetching product data:', error.message);
      }
    }
    // Return fallback that allows testing with mock data
    return {
      tourData: null,
      isTestingCategory: true, // Allow testing even if API fails
      productName: 'Test Product (API Unavailable)'
    };
  }
}

// Fast fallback data with XX NO duration for when API is unavailable
const createFallbackTourData = (productId: string): TourData => ({
  name: "Christ of the Abyss Snorkeling Tour (Demo)",
  description: "Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park",
  images: {
    hero: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    gallery: ["https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200"]
  },
  categories: ["Tours"],
  details: {
    duration: "XX NO", // Fallback duration as requested
    groupSize: "25 Max",
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
  pricing: { basePrice: 70, taxRate: 0.07, currency: "USD" },
  experience: {
    title: "What Makes This Experience Special",
    description: "Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park",
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
    title: "Your XX NO Journey",
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
});

export default async function SnorkelingToursTemplatePage({ searchParams }: PageProps) {
  // Get product ID from search params (e.g., ?product_id=123)
  const productId = searchParams.product_id as string || searchParams.id as string || '999'; // Default for testing

  // Fetch dynamic product data
  const { tourData, isTestingCategory, productName } = await fetchProductData(productId);

  // If product is not in Testing Category and not test/demo mode, show a message
  const isTestMode = productId === '999' || productName?.includes('API Unavailable');
  if (!isTestingCategory && !isTestMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Not Available</h1>
          <p className="text-gray-600 mb-4">
            The product "{productName || 'Unknown Product'}" is not assigned to the "Testing Category" and cannot use this template.
          </p>
          <p className="text-sm text-gray-500">
            Product ID: {productId}
          </p>
        </div>
      </div>
    );
  }

  // Pass dynamic data to template, or use fast fallback with XX NO duration
  const finalTourData = tourData || createFallbackTourData(productId);
  return <SnorkelingToursTemplate data={finalTourData} />;
}
