import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.NODE_ENV === 'production' ? 'https://livewsnklsdlaucnh.netlify.app' : 'http://localhost:3000');

    // Test availability endpoint
    const availabilityResponse = await fetch(`${baseUrl}/api/wc-bookings?action=get_availability&product_id=34592`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const availabilityData = await availabilityResponse.json();

    // Test product fetch from WooCommerce
    const productResponse = await fetch(`https://keylargoscubadiving.com/wp-json/wc/v3/products/34592`, {
      headers: {
        'Authorization': `Basic ${btoa('ck_d0e9e6f20a1ecc40f797058c27e46aee21bf10b9:cs_3d3aa1c520bd3687d83ae3932b70683a7126af28')}`,
        'Content-Type': 'application/json',
      },
    });

    let productData = null;
    let productError = null;

    if (productResponse.ok) {
      productData = await productResponse.json();
    } else {
      productError = `Product fetch failed: ${productResponse.status} ${productResponse.statusText}`;
    }

    return NextResponse.json({
      success: true,
      tests: {
        availability_api: {
          status: availabilityResponse.ok ? 'SUCCESS' : 'FAILED',
          data: availabilityData,
        },
        woocommerce_product: {
          status: productData ? 'SUCCESS' : 'FAILED',
          data: productData,
          error: productError,
        },
      },
      integration_status: {
        api_endpoints: availabilityResponse.ok ? 'WORKING' : 'FAILED',
        woocommerce_connection: productData ? 'WORKING' : 'FAILED',
        product_id: '34592',
        ready_for_booking: availabilityResponse.ok && productData ? 'YES' : 'NO',
      },
    });

  } catch (error) {
    console.error('WooCommerce integration test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'WooCommerce integration test failed',
    }, { status: 500 });
  }
}
