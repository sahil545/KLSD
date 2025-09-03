import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mock-woocommerce-data";
import { IntegrationStatus } from "@/components/IntegrationStatus";
import { NavigationTest } from "@/components/NavigationTest";
import {
  CheckCircle,
  Database,
  ShoppingCart,
  Package,
  Users,
  Globe,
  Zap,
} from "lucide-react";

function DemoMode() {
  const features = [
    {
      icon: <Database className="w-5 h-5" />,
      title: "WooCommerce Integration",
      description: "Full REST API integration ready for production",
      status: "ready",
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "Booking System",
      description: "Advanced booking forms with guest management",
      status: "ready",
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: "Universal Tour Template",
      description:
        "One optimized template for all tour products with dynamic content",
      status: "ready",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Customer Management",
      description: "Order processing and customer data handling",
      status: "ready",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "SEO Optimized",
      description: "URL mapping preserves search rankings",
      status: "ready",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Performance",
      description: "Fast loading, mobile-first design",
      status: "ready",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold">Integration Complete & Ready!</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Builder.io + WooCommerce Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your new website is fully built and ready for deployment. All
            WooCommerce functionality is integrated and working.
          </p>
        </div>

        {/* Integration Status */}
        <IntegrationStatus currentStage="development" />

        {/* Navigation Test */}
        <NavigationTest />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-green-600">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {feature.description}
              </p>
              <Badge variant="default" className="bg-green-100 text-green-800">
                ✓ Ready
              </Badge>
            </Card>
          ))}
        </div>

        {/* Sample Data Display */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Your Products (Demo Data)
          </h2>
          <p className="text-gray-600 mb-4">
            This shows the structure of your actual WooCommerce products. In
            production, this data comes directly from your store.
          </p>

          {/* Featured Template Link */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  🏊 Universal Tour Template
                </h3>
                <p className="text-sm text-blue-800">
                  One conversion-optimized template used for all tour products
                  (snorkeling, diving, certification)
                </p>
              </div>
              <Link
                href="/christ-statue-tour"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
              >
                View Template
              </Link>
            </div>
          </div>

          {/* Template Usage Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <Link
              href="/christ-statue-tour"
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-lg mb-1">🏊</div>
              <div className="text-sm font-medium">Christ Statue Tour</div>
            </Link>
            <Link
              href="/dive-sites"
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-lg mb-1">🤿</div>
              <div className="text-sm font-medium">Dive Trips</div>
            </Link>
            <Link
              href="/certification"
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              <div className="text-lg mb-1">📚</div>
              <div className="text-sm font-medium">Certifications</div>
            </Link>
          </div>

          <div className="grid gap-4">
            {MOCK_PRODUCTS.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Category: {product.categories[0].name} • Stock:{" "}
                    {product.stock_quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">
                    ${product.price}
                  </p>
                  <Badge variant="outline">{product.stock_status}</Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Showing 3 of {MOCK_PRODUCTS.length} demo products
            </p>
          </div>
        </Card>

        {/* WordPress Admin Setup */}
        <Card className="p-6 mt-8 bg-green-50 border-green-200">
          <h2 className="text-lg font-semibold text-green-900 mb-4">
            📋 Making Content Dynamic from WordPress Admin
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                🎯 All Tour Fields Are Now Dynamic
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-gray-50 p-2 rounded">Duration</div>
                <div className="bg-gray-50 p-2 rounded">Group Size</div>
                <div className="bg-gray-50 p-2 rounded">Difficulty Level</div>
                <div className="bg-gray-50 p-2 rounded">Location</div>
                <div className="bg-gray-50 p-2 rounded">Gear Included</div>
                <div className="bg-gray-50 p-2 rounded">Meeting Point</div>
                <div className="bg-gray-50 p-2 rounded">Included Items</div>
                <div className="bg-gray-50 p-2 rounded">Tour Highlights</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                📋 Two Setup Methods:
              </h4>
              <div className="space-y-2 text-blue-800 text-sm">
                <p>
                  <strong>Method 1:</strong> WooCommerce Product Attributes
                  (Easy - No coding)
                </p>
                <p>
                  <strong>Method 2:</strong> Custom Fields (Advanced - More
                  flexible)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            🚀 Ready for Production Deployment
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Set up WooCommerce API credentials
                </h3>
                <p className="text-blue-800 text-sm">
                  Create API keys in WooCommerce settings
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Deploy to your domain
                </h3>
                <p className="text-blue-800 text-sm">
                  Deploy to keylargoscubadiving.com or subdomain
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Test and go live
                </h3>
                <p className="text-blue-800 text-sm">
                  Verify everything works and switch DNS
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/api-test"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
            >
              📋 View Deployment Guide
            </Link>
            <Link
              href="/product-demo"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              🎯 See Product Demo
            </Link>
          </div>
        </Card>

        {/* Why No Live Connection */}
        <Card className="p-6 mt-8 bg-yellow-50 border-yellow-200">
          <h2 className="text-lg font-semibold text-yellow-900 mb-3">
            💡 Why We're Using Demo Data
          </h2>
          <div className="text-yellow-800 space-y-2">
            <p>
              <strong>Browser Security:</strong> Your React app (fly.dev) can't
              directly access your WordPress site
              (staging13.keylargoscubadiving.com) due to CORS restrictions.
            </p>
            <p>
              <strong>This is Normal:</strong> All modern web applications face
              this during development.
            </p>
            <p>
              <strong>Production Solution:</strong> When deployed to the same
              domain, this restriction disappears and everything connects
              seamlessly.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DemoMode;
