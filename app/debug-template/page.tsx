'use client';

import { useState, useEffect } from 'react';

export default function DebugTemplatePage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runConnectivityTest = async () => {
    setLoading(true);
    try {
      // Test basic API connectivity
      const response = await fetch('/api/template-test?test=basic');
      const data = await response.json();
      
      // Test WordPress-style request
      const wpResponse = await fetch('/api/template-test?product=123&template=christ-statue-tour&ssr=1&wordpress=1');
      const wpHtml = await wpResponse.text();
      
      setTestResults({
        basicTest: data,
        wordpressTest: {
          status: wpResponse.status,
          html: wpHtml.substring(0, 500) + (wpHtml.length > 500 ? '...' : ''),
          fullLength: wpHtml.length
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setTestResults({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    runConnectivityTest();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🔍 Template Override Debug Tool
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                WordPress Template Override Checklist
              </h2>
              <ul className="space-y-2 text-blue-800">
                <li>✅ Plugin uploaded to WordPress</li>
                <li>✅ Product has correct category assigned</li>
                <li>✅ Next.js toggle enabled in product admin</li>
                <li>✅ Product saved after enabling toggle</li>
                <li>❓ WordPress can reach Next.js (testing below)</li>
                <li>❓ Template override filter is working</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Connectivity Test Results
                </h2>
                <button
                  onClick={runConnectivityTest}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Testing...' : 'Run Test Again'}
                </button>
              </div>
              
              {testResults ? (
                <div className="space-y-4">
                  {testResults.error ? (
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="text-red-800 font-semibold">Error:</p>
                      <pre className="text-red-700 text-sm mt-2">{testResults.error}</pre>
                    </div>
                  ) : (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded p-4">
                        <p className="text-green-800 font-semibold">✅ Basic API Test: Success</p>
                        <pre className="text-green-700 text-sm mt-2">
                          {JSON.stringify(testResults.basicTest, null, 2)}
                        </pre>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded p-4">
                        <p className="text-green-800 font-semibold">
                          ✅ WordPress Template Test: HTTP {testResults.wordpressTest.status}
                        </p>
                        <p className="text-green-700 text-sm mt-2">
                          Generated {testResults.wordpressTest.fullLength} characters of HTML
                        </p>
                        <div className="bg-white border rounded p-3 mt-3">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: testResults.wordpressTest.html 
                            }} 
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <p className="text-gray-600">Running tests...</p>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-900 mb-4">
                🔧 Manual Debug Steps
              </h2>
              <div className="space-y-3 text-yellow-800">
                <div>
                  <p className="font-semibold">1. Check WordPress Error Logs:</p>
                  <p className="text-sm">Look for log entries starting with "KLSD:" in your WordPress error logs</p>
                </div>
                <div>
                  <p className="font-semibold">2. Test Direct URL:</p>
                  <a 
                    href="/api/template-test?product=123&template=christ-statue-tour&ssr=1&wordpress=1"
                    target="_blank"
                    className="text-blue-600 underline text-sm"
                  >
                    /api/template-test?product=123&template=christ-statue-tour&ssr=1&wordpress=1
                  </a>
                </div>
                <div>
                  <p className="font-semibold">3. Check WordPress Plugin:</p>
                  <p className="text-sm">Verify the diagnostic metabox shows all conditions are met</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📋 Expected Behavior
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>WordPress detects it's a product page with Next.js enabled</li>
                <li>WordPress creates custom template file in /wp-content/plugins/klsd-tour-template-manager/templates/</li>
                <li>Custom template makes HTTP request to this Next.js app</li>
                <li>Next.js returns HTML content</li>
                <li>WordPress displays the returned HTML instead of default template</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
