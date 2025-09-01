import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.NODE_ENV === 'production' ? 'https://livewsnklsdlaucnh.netlify.app' : 'http://localhost:3000');

    // Test the WooCommerce bookings API endpoint
    const testUrl = `${baseUrl}/api/wc-bookings?action=get_availability&product_id=34592`;
    
    console.log('Testing WooCommerce bookings API at:', testUrl);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      api_test: {
        status: response.ok ? 'SUCCESS' : 'FAILED',
        status_code: response.status,
        url_tested: testUrl,
        response_data: data,
      },
      message: response.ok ? 'WooCommerce Bookings API is working!' : 'API test failed',
    });

  } catch (error) {
    console.error('API test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'API test failed with exception',
    }, { status: 500 });
  }
}
