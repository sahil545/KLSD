// Unified data structure for snorkeling tours template
// This centralizes all tour information to ensure consistent loading

export interface TourData {
  // Basic tour information
  name: string;
  description: string;
  images: {
    hero: string;
    gallery: string[];
  };
  categories: string[];
  
  // Tour specifics
  details: {
    duration: string;
    groupSize: string;
    location: string;
    gearIncluded: boolean;
    rating: number;
    reviewCount: number;
  };
  
  // Highlights and features
  highlights: string[];
  
  // Pricing
  pricing: {
    basePrice: number;
    taxRate: number;
    currency: string;
  };
  
  // Experience sections
  experience: {
    title: string;
    description: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  
  // What's included
  included: {
    title: string;
    items: string[];
    award?: string;
  };
  
  // Journey timeline
  journey: {
    title: string;
    description: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
      time: string;
      color: 'blue' | 'teal' | 'orange' | 'green';
    }>;
  };
  
  // Marine life section
  marineLife: {
    title: string;
    description: string;
    categories: Array<{
      title: string;
      description: string;
      color: 'blue' | 'teal' | 'orange';
      features: string[];
    }>;
  };
  
  // Trust indicators
  trustIndicators: {
    title: string;
    subtitle: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  
  // Final CTA
  finalCTA: {
    title: string;
    description: string;
    phone: string;
    benefits: string[];
  };
}

// Static tour data - consistent loading pattern
export const tourData: TourData = {
  name: "Christ of the Abyss Snorkeling Tour",
  description: "Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park",
  images: {
    hero: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200"
    ]
  },
  categories: ["Tours"],
  
  details: {
    duration: "4 Hours",
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
  
  pricing: {
    basePrice: 70,
    taxRate: 0.07,
    currency: "USD"
  },
  
  experience: {
    title: "What Makes This Experience Special",
    description: "Discover the world-famous Christ of the Abyss statue in the pristine waters of John Pennekamp Coral Reef State Park",
    features: [
      {
        icon: "Fish",
        title: "Iconic Underwater Statue",
        description: "Visit the famous 9-foot bronze Christ of the Abyss statue, standing majestically in 25 feet of crystal-clear water as a beacon of peace and wonder."
      },
      {
        icon: "Waves",
        title: "Pristine Marine Sanctuary",
        description: "Snorkel through vibrant coral gardens teeming with tropical fish in America's first underwater park, protected since 1963."
      },
      {
        icon: "Shield",
        title: "Expert Guidance",
        description: "Our PADI certified dive masters provide comprehensive safety briefings and marine life education throughout your journey."
      }
    ]
  },
  
  included: {
    title: "What's Included",
    items: [
      "Professional snorkeling equipment",
      "PADI certified dive guide",
      "John Pennekamp park entrance",
      "Marine life identification guide",
      "Safety equipment & briefing",
      "Free parking"
    ],
    award: "Florida Keys Excellence Award Winner"
  },
  
  journey: {
    title: "Your 4-Hour Journey",
    description: "From arrival to unforgettable memories",
    steps: [
      {
        step: 1,
        title: "Welcome & Preparation",
        description: "Meet our team at John Pennekamp State Park for equipment fitting and comprehensive safety briefing.",
        time: "8:00 AM - 30 minutes",
        color: "blue"
      },
      {
        step: 2,
        title: "Scenic Boat Journey",
        description: "Cruise through crystal-clear waters to the statue location while learning about the area's history.",
        time: "8:30 AM - 30 minutes",
        color: "teal"
      },
      {
        step: 3,
        title: "Underwater Adventure",
        description: "Snorkel around the iconic Christ statue and explore the vibrant coral reef ecosystem.",
        time: "9:00 AM - 2.5 hours",
        color: "orange"
      },
      {
        step: 4,
        title: "Return & Reflection",
        description: "Relax on the return journey while sharing your experience and planning future adventures.",
        time: "11:30 AM - 30 minutes",
        color: "green"
      }
    ]
  },
  
  marineLife: {
    title: "Discover Incredible Marine Life",
    description: "John Pennekamp Coral Reef State Park hosts over 65 species of tropical fish and 40 species of coral in this protected underwater sanctuary.",
    categories: [
      {
        title: "Tropical Fish Paradise",
        description: "Swim alongside vibrant parrotfish, graceful angelfish, curious sergeant majors, and over 60 other colorful species that call these reefs home.",
        color: "blue",
        features: ["Queen Angelfish", "Stoplight Parrotfish", "Yellowtail Snapper"]
      },
      {
        title: "Living Coral Gardens",
        description: "Explore thriving coral formations including massive brain corals, delicate sea fans, and the iconic elkhorn coral structures.",
        color: "teal",
        features: ["Brain Coral Colonies", "Sea Fan Gardens", "Staghorn Formations"]
      },
      {
        title: "Underwater Photography",
        description: "Capture stunning images of the Christ statue surrounded by marine life with crystal-clear 60-80 foot visibility perfect for photography.",
        color: "orange",
        features: ["Professional Photo Tips", "Camera Rental Available", "Perfect Lighting Conditions"]
      }
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
