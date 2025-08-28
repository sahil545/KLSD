// Quick test script for the product data API
// Usage: node test-product-api.js

const testProductData = {
  id: 123,
  name: "Test Product",
  meta_data: [
    { key: "_klsd_test_duration", value: "99 hours" },
    { key: "other_meta", value: "some value" }
  ],
  categories: [
    { name: "Testing Category", slug: "testing-category" }
  ]
};

// Simulate the API logic
const metaData = testProductData.meta_data || [];
const durationMeta = metaData.find(meta => meta.key === '_klsd_test_duration');
const duration = durationMeta ? durationMeta.value : '99 hours';

const categories = testProductData.categories || [];
const isTestingCategory = categories.some(cat => 
  cat.name === 'Testing Category' || cat.slug === 'testing-category'
);

console.log('✅ API Logic Test Results:');
console.log(`Duration found: ${duration}`);
console.log(`Is Testing Category: ${isTestingCategory}`);
console.log(`Duration source: ${durationMeta ? 'plugin' : 'default'}`);

// Expected API response structure
const expectedResponse = {
  success: true,
  product: {
    id: testProductData.id,
    name: testProductData.name,
    isTestingCategory: isTestingCategory,
    tourData: {
      details: {
        duration: duration,
        groupSize: "25 Max",
        location: "Key Largo",
        gearIncluded: true,
        rating: 4.9,
        reviewCount: 487,
      }
    },
    durationSource: durationMeta ? 'plugin' : 'default'
  }
};

console.log('\n✅ Expected API Response Structure:');
console.log(JSON.stringify(expectedResponse, null, 2));
