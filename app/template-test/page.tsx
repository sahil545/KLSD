export default async function TemplateTestPage() {
  try {
    // Test the API endpoint
    const response = await fetch('http://localhost:3000/api/product-data/999', {
      cache: 'no-store'
    });
    
    const data = await response.json();
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Template Test Results</h1>
          
          {/* API Response Test */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">API Response Test</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Status:</span> {data.success ? '✅ Success' : '❌ Failed'}
              </div>
              <div>
                <span className="font-medium">Duration:</span> 
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                  {data.product?.tourData?.details?.duration || 'Not found'}
                </span>
              </div>
              <div>
                <span className="font-medium">Testing Category:</span> {data.product?.isTestingCategory ? '✅ Yes' : '❌ No'}
              </div>
              <div>
                <span className="font-medium">Duration Source:</span> {data.product?.durationSource || 'Unknown'}
              </div>
            </div>
          </div>
          
          {/* Integration Test Links */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Integration Tests</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Template with Dynamic Data (Product ID 999):</h3>
                <a 
                  href="/snorkeling-tours-template?product_id=999" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  target="_blank"
                >
                  Test Template → Should show "XX NO" duration
                </a>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Template with Different Product ID:</h3>
                <a 
                  href="/snorkeling-tours-template?product_id=123" 
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  target="_blank"
                >
                  Test Non-Testing Category → Should show error message
                </a>
              </div>
            </div>
          </div>
          
          {/* Raw Data Display */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Raw API Response</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
    
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-red-600 mb-8">Template Test Failed</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        </div>
      </div>
    );
  }
}
