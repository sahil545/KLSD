// Script to convert WooCommerce products to static pages
const fs = require('fs').promises;
const path = require('path');
const { wooCommerce } = require('../client/lib/woocommerce');

async function convertProductsToStatic() {
  console.log('🚀 Starting product conversion...');
  
  try {
    // Fetch all products from WooCommerce
    let allProducts = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const products = await wooCommerce.makeRequest(`/products?per_page=100&page=${page}`);
      allProducts = [...allProducts, ...products];
      hasMore = products.length === 100;
      page++;
      console.log(`📦 Fetched ${allProducts.length} products...`);
    }
    
    console.log(`✅ Found ${allProducts.length} total products`);
    
    // Create static pages for each product
    for (const product of allProducts) {
      await createStaticProductPage(product);
    }
    
    console.log(`🎉 Successfully converted ${allProducts.length} products to static pages!`);
    
  } catch (error) {
    console.error('❌ Error converting products:', error);
  }
}

async function createStaticProductPage(product) {
  const slug = product.slug;
  const productDir = path.join(__dirname, '../app/products', slug);
  
  // Create directory if it doesn't exist
  await fs.mkdir(productDir, { recursive: true });
  
  // Generate page.tsx content
  const pageContent = `
import ProductTemplate from '../../components/ProductTemplate';

// Static product data generated at build time
const productData = ${JSON.stringify(product, null, 2)};

export default function ${toPascalCase(slug)}ProductPage() {
  return <ProductTemplate product={productData} />;
}

// For SEO
export const metadata = {
  title: '${product.name} | Key Largo Scuba Diving',
  description: '${product.short_description || product.description?.substring(0, 150)}',
};
`;

  // Write the page file
  await fs.writeFile(
    path.join(productDir, 'page.tsx'),
    pageContent
  );
  
  console.log(`✅ Created: /products/${slug}/page.tsx`);
}

function toPascalCase(str) {
  return str.replace(/-/g, ' ')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .replace(/\s/g, '');
}

// Run the conversion
convertProductsToStatic();
