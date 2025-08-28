import SnorkelingToursTemplate from "./SnorkelingToursTemplate";
import { TourData } from "./data";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function fetchProductData(productId: string): Promise<{ tourData: TourData | null; isTestingCategory: boolean; productName?: string }> {
  try {
    // Fetch from our product data API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/product-data/${productId}`, {
      cache: 'no-store' // Ensure fresh data for SSR
    });

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
    console.error('Error fetching product data:', error);
    return { tourData: null, isTestingCategory: false };
  }
}

export default async function SnorkelingToursTemplatePage({ searchParams }: PageProps) {
  // Get product ID from search params (e.g., ?product_id=123)
  const productId = searchParams.product_id as string || searchParams.id as string || '999'; // Default for testing

  // Fetch dynamic product data
  const dynamicData = await fetchProductData(productId);

  // Pass dynamic data to template, or use default if fetch failed
  return <SnorkelingToursTemplate data={dynamicData || undefined} />;
}
