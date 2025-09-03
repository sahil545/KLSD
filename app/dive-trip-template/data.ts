// Dive trip data structure with gear rental options and multiple dive sites
// This centralizes all dive trip information including equipment rentals

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  pricing: "flat" | "tiered";
  flatPrice?: number;
  tieredPricing?: Array<{
    peopleCount: number;
    price: number;
  }>;
}

export interface GearRentalOption {
  id: string;
  name: string;
  description: string;
  price: number;
  required: boolean;
  category: "breathing" | "buoyancy" | "thermal" | "accessories";
  image: string;
}

export interface DiveSite {
  name: string;
  depth: string;
  duration: string;
  highlights: string[];
  marineLife: string[];
}

export interface DiveTripData {
  // Basic trip information
  name: string;
  description: string;
  images: {
    hero: string;
    gallery: string[];
  };
  categories: string[];

  // Trip specifics
  details: {
    duration: string;
    groupSize: string;
    location: string;
    maxDepth: string;
    experienceLevel: string;
    rating: number;
    reviewCount: number;
    diveSites: DiveSite[];
  };

  // Highlights and features
  highlights: string[];

  // Pricing
  pricing: {
    basePrice: number;
    basePriceIncludes: string[];
    taxRate: number;
    currency: string;
  };

  // Gear rental options
  gearRentals: {
    title: string;
    description: string;
    options: GearRentalOption[];
    packages: Array<{
      id: string;
      name: string;
      description: string;
      items: string[];
      originalPrice: number;
      discountedPrice: number;
      savings: number;
      popular?: boolean;
    }>;
  };

  // Additional services (guides, instructors)
  services: {
    title: string;
    description: string;
    options: ServiceOption[];
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
      location?: string;
      color: "blue" | "teal" | "orange" | "green";
    }>;
  };

  // Marine life section
  marineLife: {
    title: string;
    description: string;
    categories: Array<{
      title: string;
      description: string;
      color: "blue" | "teal" | "orange";
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

// Static dive trip data - Molasses Reef example
export const diveTripData: DiveTripData = {
  name: "Molasses Reef Dive Trip",
  description:
    "Explore Florida's most famous coral reef with two spectacular dive sites in crystal-clear waters",
  images: {
    hero: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
    ],
  },
  categories: ["Dive Trips"],

  details: {
    duration: "4 Hours",
    groupSize: "20 Max",
    location: "Key Largo",
    maxDepth: "25 feet",
    experienceLevel: "Open Water+",
    rating: 4.8,
    reviewCount: 342,
    diveSites: [
      {
        name: "Molasses Reef - North",
        depth: "15-25 feet",
        duration: "1 hour",
        highlights: [
          "Massive brain corals",
          "Tropical fish abundance",
          "Clear visibility",
        ],
        marineLife: ["Queen Angelfish", "Parrotfish", "Grouper", "Sea Turtles"],
      },
      {
        name: "Molasses Reef - South",
        depth: "20-25 feet",
        duration: "1 hour",
        highlights: ["Coral formations", "Swim-throughs", "Photography spots"],
        marineLife: [
          "Barracuda",
          "Yellowtail Snapper",
          "Sergeant Major",
          "Butterfly Fish",
        ],
      },
    ],
  },

  highlights: [
    "Two spectacular dive sites at Molasses Reef",
    "Tanks & weights included in base price",
    "PADI certified dive masters",
    "Perfect for underwater photography",
  ],

  pricing: {
    basePrice: 100,
    basePriceIncludes: [
      "Tanks",
      "Weights",
      "Boat transportation",
      "Professional guide",
    ],
    taxRate: 0.07,
    currency: "USD",
  },

  gearRentals: {
    title: "Gear Rental Options",
    description:
      "Complete your dive setup with our professional-grade equipment",
    options: [
      {
        id: "bcd",
        name: "BCD (Buoyancy Control Device)",
        description: "Professional-grade BCD with integrated weight system",
        price: 25,
        required: true,
        category: "buoyancy",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      },
      {
        id: "regulator",
        name: "Regulator Set",
        description: "Primary regulator with octopus and pressure gauge",
        price: 25,
        required: true,
        category: "breathing",
        image:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
      },
      {
        id: "wetsuit",
        name: "3mm Wetsuit",
        description: "Full-body wetsuit for thermal protection",
        price: 15,
        required: false,
        category: "thermal",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      },
      {
        id: "mask-fins-snorkel",
        name: "Mask, Fins & Snorkel",
        description: "Complete mask, fins, and snorkel set",
        price: 15,
        required: true,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1566024287286-457247b70310?w=400&h=300&fit=crop",
      },
      {
        id: "dive-computer",
        name: "Dive Computer",
        description: "Advanced dive computer with safety features",
        price: 20,
        required: false,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      },
      {
        id: "underwater-camera",
        name: "Underwater Camera",
        description: "GoPro with underwater housing for photos/videos",
        price: 30,
        required: false,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
      },
    ],
    packages: [
      {
        id: "complete-diver",
        name: "Complete Diver Package",
        description: "Everything you need for a perfect dive",
        items: ["BCD", "Regulator Set", "Wetsuit", "Mask, Fins & Snorkel"],
        originalPrice: 80,
        discountedPrice: 65,
        savings: 15,
        popular: true,
      },
      {
        id: "basic-rental",
        name: "Essential Gear",
        description: "Required equipment only",
        items: ["BCD", "Regulator Set", "Mask, Fins & Snorkel"],
        originalPrice: 65,
        discountedPrice: 55,
        savings: 10,
      },
      {
        id: "photography-package",
        name: "Photography Explorer",
        description: "Complete gear plus camera equipment",
        items: [
          "BCD",
          "Regulator Set",
          "Wetsuit",
          "Mask, Fins & Snorkel",
          "Underwater Camera",
        ],
        originalPrice: 110,
        discountedPrice: 90,
        savings: 20,
      },
    ],
  },

  // Additional services (guides, instructors)
  services: {
    title: "Additional Services",
    description: "Enhance your dive experience with professional guidance",
    options: [
      {
        id: "dive-guide",
        name: "Personal Dive Guide",
        description: "Dedicated guide for your group with local knowledge",
        pricing: "tiered",
        tieredPricing: [
          { peopleCount: 1, price: 65 },
          { peopleCount: 2, price: 77 },
          { peopleCount: 3, price: 89 },
          { peopleCount: 4, price: 102 },
          { peopleCount: 5, price: 115 },
          { peopleCount: 6, price: 130 },
        ],
      },
      {
        id: "dive-instructor",
        name: "Dive Instructor",
        description:
          "Professional instructor for refresher training or skills practice",
        pricing: "flat",
        flatPrice: 150,
      },
    ],
  },

  experience: {
    title: "Why Choose Molasses Reef",
    description:
      "Experience Florida's most celebrated diving destination with pristine coral formations and abundant marine life",
    features: [
      {
        icon: "Fish",
        title: "Marine Life Paradise",
        description:
          "Encounter tropical fish, sea turtles, and colorful coral formations in one of Florida's most biodiverse reefs.",
      },
      {
        icon: "Waves",
        title: "Perfect Diving Conditions",
        description:
          "Shallow depths (15-25 feet) and excellent visibility make this ideal for all skill levels from Open Water and up.",
      },
      {
        icon: "Camera",
        title: "Underwater Photography",
        description:
          "Capture stunning photos with our crystal-clear visibility and vibrant marine life in perfect lighting conditions.",
      },
    ],
  },

  included: {
    title: "What's Included",
    items: [
      "Round-trip boat transportation",
      "PADI certified dive guide",
      "Tanks and weights",
      "Safety equipment & briefing",
      "Marine life identification guide",
      "Free parking",
    ],
    award: "Best Dive Site in Florida Keys",
  },

  journey: {
    title: "Your 4-Hour Dive Adventure",
    description: "Two amazing dive sites at Molasses Reef",
    steps: [
      {
        step: 1,
        title: "Check-in & Gear Setup",
        description:
          "Meet the crew, complete paperwork, and set up your diving equipment with our dive masters.",
        time: "8:00 AM - 30 minutes",
        location: "Key Largo Marina",
        color: "blue",
      },
      {
        step: 2,
        title: "Boat Journey to Molasses Reef",
        description:
          "Scenic 30-minute boat ride to the reef with safety briefing and dive site overview.",
        time: "8:30 AM - 30 minutes",
        color: "teal",
      },
      {
        step: 3,
        title: "First Dive - North Site",
        description:
          "Explore massive brain corals and swim with tropical fish in crystal-clear waters.",
        time: "9:00 AM - 1 hour",
        location: "Molasses Reef North",
        color: "orange",
      },
      {
        step: 4,
        title: "Second Dive - South Site",
        description:
          "Discover coral swim-throughs and encounter different marine species at the southern section.",
        time: "10:30 AM - 1 hour",
        location: "Molasses Reef South",
        color: "green",
      },
    ],
  },

  marineLife: {
    title: "Discover Incredible Marine Life",
    description:
      "Molasses Reef hosts over 80 species of tropical fish and some of the largest coral formations in the Florida Keys.",
    categories: [
      {
        title: "Tropical Fish Spectacle",
        description:
          "Swim alongside schools of yellowtail snapper, curious parrotfish, and graceful angelfish in their natural habitat.",
        color: "blue",
        features: [
          "Queen & Gray Angelfish",
          "Stoplight Parrotfish",
          "Yellowtail Snapper",
          "Sergeant Major Damselfish",
        ],
      },
      {
        title: "Coral Formations",
        description:
          "Explore massive brain corals, delicate sea fans, and vibrant sponge gardens that have been growing for centuries.",
        color: "teal",
        features: [
          "Brain Coral Heads",
          "Sea Fan Gardens",
          "Tube Sponges",
          "Soft Coral Colonies",
        ],
      },
      {
        title: "Large Marine Life",
        description:
          "Encounter sea turtles, southern stingrays, and schools of barracuda in this protected marine sanctuary.",
        color: "orange",
        features: [
          "Green Sea Turtles",
          "Southern Stingrays",
          "Caribbean Reef Sharks",
          "Goliath Grouper",
        ],
      },
    ],
  },

  trustIndicators: {
    title: "Why Key Largo Scuba Diving",
    subtitle: "The Florida Keys' most trusted diving experience",
    stats: [
      { value: "25+", label: "Years Experience" },
      { value: "50,000+", label: "Safe Dives" },
      { value: "4.8/5", label: "Average Rating" },
      { value: "100%", label: "Safety Record" },
    ],
  },

  finalCTA: {
    title: "Ready to Explore Molasses Reef?",
    description:
      "Book your dive trip today and experience Florida's most famous reef system.",
    phone: "(305) 391-4040",
    benefits: [
      "Instant confirmation",
      "Free cancellation",
      "Best price guarantee",
    ],
  },
};
