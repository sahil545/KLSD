import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('product');
    const template = searchParams.get('template');
    const ssr = searchParams.get('ssr');
    const wordpress = searchParams.get('wordpress');
    
    // Test endpoint to verify WordPress can reach Next.js
    const testData = {
        status: 'success',
        message: 'Next.js frontend is accessible',
        receivedParams: {
            productId,
            template,
            ssr,
            wordpress
        },
        timestamp: new Date().toISOString(),
        environment: {
            nodeEnv: process.env.NODE_ENV,
            url: request.nextUrl.href
        }
    };
    
    // For WordPress template override testing
    if (wordpress === '1' && ssr === '1') {
        // Return minimal HTML for template testing
        const html = `
        <div style="background: #e7f3ff; border: 2px solid #72aee6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h2 style="color: #1e40af; margin: 0 0 10px 0;">🎉 Next.js Template Override Working!</h2>
            <p style="margin: 0 0 10px 0;"><strong>Product ID:</strong> ${productId || 'Not provided'}</p>
            <p style="margin: 0 0 10px 0;"><strong>Template:</strong> ${template || 'Not provided'}</p>
            <p style="margin: 0;"><strong>Status:</strong> Template override is functioning correctly</p>
        </div>
        `;
        
        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache'
            }
        });
    }
    
    // Return JSON for regular API calls
    return NextResponse.json(testData);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        return NextResponse.json({
            status: 'success',
            message: 'POST endpoint working',
            receivedData: body,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'Failed to parse JSON body',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 400 });
    }
}
