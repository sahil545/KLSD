import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    
    // WordPress template override debugging endpoint
    if (action === 'test-template') {
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>WordPress Template Override Test</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
                .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .info { background: #e2e3e5; border: 1px solid #d3d6db; color: #383d41; padding: 15px; border-radius: 8px; margin: 10px 0; }
                .code { background: #f8f9fa; border: 1px solid #dee2e6; padding: 10px; border-radius: 4px; font-family: monospace; margin: 10px 0; }
            </style>
        </head>
        <body>
            <h1>🎉 WordPress Template Override Working!</h1>
            
            <div class="success">
                <h2>✅ Template Override Success</h2>
                <p>This page is being served by the Next.js application, which means the WordPress template override is functioning correctly!</p>
            </div>
            
            <div class="info">
                <h3>Request Details</h3>
                <div class="code">
                    <strong>URL:</strong> ${request.nextUrl.href}<br>
                    <strong>Timestamp:</strong> ${new Date().toISOString()}<br>
                    <strong>User Agent:</strong> ${request.headers.get('user-agent') || 'N/A'}<br>
                    <strong>Referer:</strong> ${request.headers.get('referer') || 'N/A'}
                </div>
            </div>
            
            <div class="info">
                <h3>Next Steps</h3>
                <ol>
                    <li>✅ WordPress can reach Next.js (you're seeing this page)</li>
                    <li>✅ Template override system is working</li>
                    <li>🔄 Now apply this to your actual product templates</li>
                </ol>
            </div>
            
            <div class="info">
                <h3>WordPress Integration</h3>
                <p>To use this in WordPress, your plugin should:</p>
                <div class="code">
                    1. Detect product page conditions<br>
                    2. Check if Next.js override is enabled<br>
                    3. Fetch content from this Next.js app<br>
                    4. Replace the WordPress template with fetched content
                </div>
            </div>
        </body>
        </html>
        `;
        
        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache'
            }
        });
    }
    
    // Default API response
    return NextResponse.json({
        status: 'success',
        message: 'WordPress Debug API',
        endpoints: {
            'test-template': '/api/wp-debug?action=test-template',
        },
        timestamp: new Date().toISOString()
    });
}
