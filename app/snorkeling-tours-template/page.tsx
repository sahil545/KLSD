import SnorkelingToursTemplate from "./SnorkelingToursTemplate";
import { TourData } from "./data";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function fetchProductData(productId: string): Promise<{ tourData: TourData | null; isTestingCategory: boolean; productName?: string }> {
  try {
    // Fetch from our product data API with timeout for fast SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000');

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

export default async function SnorkelingToursTemplatePage({ searchParams }: PageProps) {
  // Get product ID from search params (e.g., ?product_id=123)
  const productId = searchParams.product_id as string || searchParams.id as string || '999'; // Default for testing

  // Fetch dynamic product data
  const { tourData, isTestingCategory, productName } = await fetchProductData(productId);

  // If product is not in Testing Category, show a message
  if (!isTestingCategory && productId !== '999') {
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

  // Pass dynamic data to template, or use default if fetch failed
  return <SnorkelingToursTemplate data={tourData || undefined} />;
}
