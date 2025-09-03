// Next.js component consuming WooCommerce API
import { useEffect, useState } from 'react';

interface TourData {
  duration: string;
  group_size: string;
  location: string;
  highlights: string[];
  // ... other fields
}

interface Product {
  id: number;
  name: string;
  price: string;
  tour_data: TourData;
}

export default function ProductDisplay({ productId }: { productId: number }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Direct API call to your WordPress site
        const response = await fetch(
          `https://yoursite.com/wp-json/wc/v3/products/${productId}?consumer_key=YOUR_KEY&consumer_secret=YOUR_SECRET`
        );
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-display">
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      
      {product.tour_data && (
        <div className="tour-info">
          <h3>Tour Details</h3>
          {product.tour_data.duration && (
            <p><strong>Duration:</strong> {product.tour_data.duration}</p>
          )}
          {product.tour_data.group_size && (
            <p><strong>Group Size:</strong> {product.tour_data.group_size}</p>
          )}
          {product.tour_data.highlights && (
            <div>
              <strong>Highlights:</strong>
              <ul>
                {product.tour_data.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
