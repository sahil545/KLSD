import { wooCommerce } from '../../../client/lib/woocommerce';
import ProductTemplate from '../../../client/components/ProductTemplate';
import { notFound } from 'next/navigation';

// 🔄 ISR: Revalidate every 30 minutes
export const revalidate = 1800;

// 📦 Pre-generate top 50 most popular products
export async function generateStaticParams() {
  try {
    // Get most popular products (by sales, views, etc.)
    const topProducts = await wooCommerce.makeRequest('/products?per_page=50&orderby=popularity');
    
    return topProducts.map((product: any) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.warn('Failed to generate static params:', error);
    return []; // Fallback to dynamic for all products
  }
}

// 🎯 This page handles ALL products:
// - Top 50: Pre-rendered (ISR)
// - Others: Dynamic SSR on first visit, then cached
export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  try {
    // 🔥 Server-side data fetch (SSR/ISR)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${params.id}`,
      { 
        cache: 'no-store', // Always fetch fresh for dynamic products
        next: { revalidate: 1800 } // 30 min cache for ISR products
      }
    );

    if (!response.ok) {
      notFound();
    }

    const { product } = await response.json();

    // Generate metadata for SEO
    const metadata = {
      title: `${product.name} | Key Largo Scuba Diving`,
      description: product.short_description || product.description?.substring(0, 160),
      openGraph: {
        title: product.name,
        description: product.short_description,
        images: product.images?.map((img: any) => img.src) || [],
      },
    };

    return (
      <>
        {/* SEO metadata injected server-side */}
        <ProductTemplate 
          product={product}
          isSSR={true}
          lastUpdated={new Date().toISOString()}
        />
      </>
    );

  } catch (error) {
    console.error('Product page error:', error);
    notFound();
  }
}

// 🔍 SEO metadata generation (server-side)
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${params.id}`,
      { next: { revalidate: 3600 } } // Cache metadata for 1 hour
    );

    if (!response.ok) {
      return {
        title: 'Product Not Found | Key Largo Scuba Diving',
      };
    }

    const { product } = await response.json();

    return {
      title: `${product.name} | Key Largo Scuba Diving`,
      description: product.short_description || product.description?.substring(0, 160),
      keywords: [
        product.name,
        'scuba diving',
        'Key Largo',
        'diving equipment',
        ...product.categories?.map((cat: any) => cat.name) || []
      ].join(', '),
      openGraph: {
        title: product.name,
        description: product.short_description,
        images: product.images?.map((img: any) => ({
          url: img.src,
          alt: img.alt || product.name,
        })) || [],
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.short_description,
        images: product.images?.[0]?.src ? [product.images[0].src] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product | Key Largo Scuba Diving',
    };
  }
}
