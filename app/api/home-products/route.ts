import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Get the base URL from environment or use a default
        const baseUrl = process.env.WORDPRESS_URL || 'https://keylargoscubadiving.com';

        // Call the WordPress custom REST API endpoint
        const response = await fetch(`${baseUrl}/wp-json/childtheme/v1/home-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`WordPress API responded with status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching home products:', error);

        // Return a fallback response if the API fails
        return NextResponse.json({
            per_page: 8,
            total: 0,
            total_pages: 0,
            products: [],
        }, { status: 500 });
    }
}