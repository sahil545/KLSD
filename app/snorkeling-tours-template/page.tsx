import SnorkelingToursTemplate from "./SnorkelingToursTemplate";
import { TourData } from "./data";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function fetchProductData(productId: string): Promise<TourData | null> {
  try {
    // Fetch from our product data API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/product-data/${productId}`, {
      cache: 'no-store' // Ensure fresh data for SSR
    });

    if (!response.ok) {
      console.error('Failed to fetch product data:', response.status);
      return null;
    }

    const data = await response.json();

    if (!data.success) {
      console.error('API returned error:', data.error);
      return null;
    }

    // Convert API response to TourData format
    return data.product.tourData;

  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
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
