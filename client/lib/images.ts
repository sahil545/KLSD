// Centralized image configuration for Key Largo Scuba Diving
export const IMAGES = {
  // Logo and branding
  logo: "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F078ec59be1b24e338d5a681cb34aad66?format=webp&width=800",

  // Hero backgrounds
  hero: {
    diving:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    underwater:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    training:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    christStatue:
      "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=1200",
  },

  // Tour and activity images
  tours: {
    christOfTheAbyss:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coralGardens:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    wreckDiving:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    nightDiving:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    spearfishing:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lobstering:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    privateCharter:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },

  // Certification images
  certifications: {
    openWater:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    advanced:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    divemaster:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    private:
      "https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    night:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    photography:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },

  // Equipment/gear images
  gear: {
    regulator:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bcd: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    mask: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    fins: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    snorkel:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    wetsuit:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },

  // Blog post images
  blog: {
    default:
      "https://cdn.builder.io/api/v1/image/assets%2F2a778920e8d54a37b1576086f79dd676%2F04a13ecb14db49a29892aec49c9d3466?format=webp&width=600",
  },

  // Image slider for tours
  slider: [
    {
      url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
      alt: "Christ of the Abyss statue underwater - iconic bronze statue in crystal clear water",
    },
    {
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      alt: "Snorkelers exploring vibrant coral reef with tropical fish",
    },
    {
      url: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
      alt: "Professional snorkeling group with PADI certified guide",
    },
    {
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      alt: "Crystal clear waters of John Pennekamp Coral Reef State Park",
    },
  ],
};

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  baseUrl: string,
  width?: number,
  height?: number,
): string {
  if (baseUrl.includes("unsplash.com")) {
    const url = new URL(baseUrl);
    if (width) url.searchParams.set("w", width.toString());
    if (height) url.searchParams.set("h", height.toString());
    return url.toString();
  }
  return baseUrl;
}

// Helper function for responsive images
export function getResponsiveImageSrcSet(baseUrl: string): string {
  if (baseUrl.includes("unsplash.com")) {
    return `
      ${getOptimizedImageUrl(baseUrl, 400)} 400w,
      ${getOptimizedImageUrl(baseUrl, 800)} 800w,
      ${getOptimizedImageUrl(baseUrl, 1200)} 1200w,
      ${getOptimizedImageUrl(baseUrl, 1600)} 1600w
    `.trim();
  }
  return baseUrl;
}
