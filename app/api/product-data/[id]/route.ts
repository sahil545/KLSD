import { NextRequest, NextResponse } from "next/server";
import { wooCommerce } from "../../../../client/lib/woocommerce";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    // Add timeout protection to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API_TIMEOUT")), 5000); // 5 second timeout
    });

    // Fetch product data from WooCommerce
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
      sale_price: response.sale_price,
      slug: response.slug,
      permalink: response.permalink,
      
      // Images
      images: response.images || [],
      
      // Categories
      categories: categories,
      isTestingCategory: isTestingCategory,
      
      // Template-specific data
      tourData: {
        details: {
          duration: duration, // From KLSD Duration Test plugin
          groupSize: "25 Max", // Default for now
          location: "Key Largo", // Default for now
          gearIncluded: true, // Default for now
          rating: 4.9, // Default for now
          reviewCount: 487, // Default for now
        },
        highlights: [
          "Famous 9-foot bronze Christ statue in crystal-clear water",
          "All snorkeling equipment included",
          "PADI certified guides",
          "Small group experience"
        ],
        whatsIncluded: [
          "Professional snorkeling equipment",
          "PADI certified dive guide", 
          "John Pennekamp park entrance",
          "Marine life identification guide",
          "Safety equipment & briefing",
          "Free parking"
        ],
        journey: {
          title: `Your ${duration} Journey`,
          sections: [
            {
              time: "0:00",
              title: "Check-in & Gear Fitting",
              description: "Meet your PADI certified guide and get fitted with professional snorkeling equipment."
            },
            {
              time: "0:30", 
              title: "Boat Departure",
              description: "Board our comfortable vessel and cruise to the Christ of the Abyss site."
            },
            {
              time: "1:00",
              title: "Underwater Exploration", 
              description: "Snorkel around the famous bronze statue and explore the vibrant coral reef."
            },
            {
              time: "3:30",
              title: "Return Journey",
              description: "Relax on the boat ride back while sharing stories of your underwater adventure."
            }
          ]
        }
      },

      // Meta fields for debugging
      meta_data: metaData,
      durationSource: durationMeta ? 'plugin' : 'default'
    };

    return NextResponse.json({
      success: true,
      product: templateData,
      message: `Product data retrieved successfully (duration: ${duration})`,
    });

  } catch (error) {
    console.error("Product Data API error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Fallback for development/testing
    const shouldUseMockData =
      errorMessage.includes("API_TIMEOUT") ||
      errorMessage.includes("Failed to fetch") ||
      errorMessage.includes("404") ||
      errorMessage.includes("Invalid ID");

    if (shouldUseMockData) {
      console.log(`Using fallback mock data for product ${id} due to: ${errorMessage}`);

      // Mock data for testing when WordPress/WooCommerce is unavailable
      const mockTemplateData = {
        id: parseInt(id) || 999,
        name: "Test Snorkeling Tour",
        description: "A test snorkeling tour for template development.",
        short_description: "Test tour with dynamic duration from KLSD plugin.",
        price: "75.00",
        sale_price: "",
        slug: "test-snorkeling-tour",
        permalink: `https://keylargoscubadiving.com/product/test-tour`,
        
        images: [{
          src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
          alt: "Christ of the Abyss statue underwater"
        }],
        
        categories: [
          { id: 99999, name: "Testing Category", slug: "testing-category" }
        ],
        isTestingCategory: true,
        
        tourData: {
          details: {
            duration: "99 hours", // Default from KLSD Duration Test plugin
            groupSize: "25 Max",
            location: "Key Largo", 
            gearIncluded: true,
            rating: 4.9,
            reviewCount: 487,
          },
          highlights: [
            "Famous 9-foot bronze Christ statue in crystal-clear water",
            "All snorkeling equipment included", 
            "PADI certified guides",
            "Small group experience"
          ],
          whatsIncluded: [
            "Professional snorkeling equipment",
            "PADI certified dive guide",
            "John Pennekamp park entrance", 
            "Marine life identification guide",
            "Safety equipment & briefing",
            "Free parking"
          ],
          journey: {
            title: "Your 99 hours Journey",
            sections: [
              {
                time: "0:00",
                title: "Check-in & Gear Fitting",
                description: "Meet your PADI certified guide and get fitted with professional snorkeling equipment."
              },
              {
                time: "0:30",
                title: "Boat Departure", 
                description: "Board our comfortable vessel and cruise to the Christ of the Abyss site."
              },
              {
                time: "1:00",
                title: "Underwater Exploration",
                description: "Snorkel around the famous bronze statue and explore the vibrant coral reef."
              },
              {
                time: "3:30", 
                title: "Return Journey",
                description: "Relax on the boat ride back while sharing stories of your underwater adventure."
              }
            ]
          }
        },

        meta_data: [
          { key: "_klsd_test_duration", value: "99 hours" }
        ],
        durationSource: 'mock_plugin'
      };

      return NextResponse.json({
        success: true,
        product: mockTemplateData,
        message: `Product data retrieved successfully (mock data - duration: 99 hours)`,
        isDemoData: true,
      });
    }

    // Return error for other cases
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: "Failed to fetch product data for template",
      },
      { status: 200 },
    );
  }
}
