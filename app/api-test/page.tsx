"use client";

import React, { useState } from "react";
import { Navigation } from "../../client/components/Navigation";
import { Footer } from "../../client/components/Footer";
import { Button } from "../../client/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../client/components/ui/card";

export default function ApiTest() {
  const [pingResponse, setPingResponse] = useState<string>("");
  const [demoResponse, setDemoResponse] = useState<string>("");
  const [ordersResponse, setOrdersResponse] = useState<string>("");
  const [bookingsResponse, setBookingsResponse] = useState<string>("");
  const [productsResponse, setProductsResponse] = useState<string>("");
  const [connectionResponse, setConnectionResponse] = useState<string>("");
  const [wordpressResponse, setWordpressResponse] = useState<string>("");
  const [authDebugResponse, setAuthDebugResponse] = useState<string>("");
  const [comparisonResponse, setComparisonResponse] = useState<string>("");
  const [simpleTestResponse, setSimpleTestResponse] = useState<string>("");
  const [debugResponse, setDebugResponse] = useState<string>("");
  const [authMethodsResponse, setAuthMethodsResponse] = useState<string>("");
  const [mediaTestResponse, setMediaTestResponse] = useState<string>("");
  const [loading, setLoading] = useState<{
    ping: boolean;
    demo: boolean;
    orders: boolean;
    bookings: boolean;
    products: boolean;
    connection: boolean;
    wordpress: boolean;
    authDebug: boolean;
    comparison: boolean;
    simpleTest: boolean;
    debug: boolean;
    authMethods: boolean;
    mediaTest: boolean;
  }>({
    ping: false,
    demo: false,
    orders: false,
    bookings: false,
    products: false,
    connection: false,
    wordpress: false,
    authDebug: false,
    comparison: false,
    simpleTest: false,
    debug: false,
    authMethods: false,
    mediaTest: false,
  });

  const testPingApi = async () => {
    setLoading((prev) => ({ ...prev, ping: true }));
    try {
      const response = await fetch("/api/ping");
      const data = await response.json();
      setPingResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setPingResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, ping: false }));
    }
  };

  const testDemoApi = async () => {
    setLoading((prev) => ({ ...prev, demo: true }));
    try {
      const response = await fetch("/api/demo");
      const data = await response.json();
      setDemoResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setDemoResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, demo: false }));
    }
  };

  const testOrdersApi = async () => {
    setLoading((prev) => ({ ...prev, orders: true }));
    try {
      const response = await fetch("/api/orders?limit=5");
      const data = await response.json();
      setOrdersResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setOrdersResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }));
    }
  };

  const testBookingsApi = async () => {
    setLoading((prev) => ({ ...prev, bookings: true }));
    try {
      const response = await fetch("/api/bookings?limit=5");
      const data = await response.json();
      setBookingsResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setBookingsResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, bookings: false }));
    }
  };

  const testProductsApi = async () => {
    setLoading((prev) => ({ ...prev, products: true }));
    try {
      const response = await fetch("/api/products?limit=3");
      const data = await response.json();
      setProductsResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setProductsResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  const testConnectionApi = async () => {
    setLoading((prev) => ({ ...prev, connection: true }));
    try {
      const response = await fetch("/api/woocommerce-test");
      const data = await response.json();
      setConnectionResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setConnectionResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, connection: false }));
    }
  };

  const testWordpressApi = async () => {
    setLoading((prev) => ({ ...prev, wordpress: true }));
    try {
      const response = await fetch("/api/wordpress-test");
      const data = await response.json();
      setWordpressResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setWordpressResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, wordpress: false }));
    }
  };

  const testAuthDebugApi = async () => {
    setLoading((prev) => ({ ...prev, authDebug: true }));
    try {
      const response = await fetch("/api/auth-debug");
      const data = await response.json();
      setAuthDebugResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setAuthDebugResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, authDebug: false }));
    }
  };

  const testComparisonApi = async () => {
    setLoading((prev) => ({ ...prev, comparison: true }));
    try {
      const response = await fetch("/api/api-comparison");
      const data = await response.json();
      setComparisonResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setComparisonResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, comparison: false }));
    }
  };

  const testSimpleApi = async () => {
    setLoading((prev) => ({ ...prev, simpleTest: true }));
    try {
      const response = await fetch("/api/minimal-test");
      const data = await response.json();
      setSimpleTestResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setSimpleTestResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, simpleTest: false }));
    }
  };

  const testDebugApi = async () => {
    setLoading((prev) => ({ ...prev, debug: true }));
    try {
      const response = await fetch("/api/debug-request");
      const data = await response.json();
      setDebugResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setDebugResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, debug: false }));
    }
  };

  const testAuthMethodsApi = async () => {
    setLoading((prev) => ({ ...prev, authMethods: true }));
    try {
      const response = await fetch("/api/auth-methods-test");
      const data = await response.json();
      setAuthMethodsResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setAuthMethodsResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, authMethods: false }));
    }
  };

  const testMediaApi = async () => {
    setLoading((prev) => ({ ...prev, mediaTest: true }));
    try {
      const response = await fetch("/api/wp-media-test");
      const data = await response.json();
      setMediaTestResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setMediaTestResponse(`Error: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, mediaTest: false }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">
              API Test Page
            </h1>

            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>🔧 Minimal WC Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testSimpleApi}
                    disabled={loading.simpleTest}
                    className="w-full"
                  >
                    {loading.simpleTest
                      ? "Testing..."
                      : "Minimal WooCommerce Test"}
                  </Button>
                  {simpleTestResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{simpleTestResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ping API Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testPingApi}
                    disabled={loading.ping}
                    className="w-full"
                  >
                    {loading.ping ? "Testing..." : "Test Ping API"}
                  </Button>
                  {pingResponse && (
                    <div className="bg-gray-100 p-4 rounded-md">
                      <pre className="text-sm">{pingResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demo API Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testDemoApi}
                    disabled={loading.demo}
                    className="w-full"
                  >
                    {loading.demo ? "Testing..." : "Test Demo API"}
                  </Button>
                  {demoResponse && (
                    <div className="bg-gray-100 p-4 rounded-md">
                      <pre className="text-sm">{demoResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>WooCommerce Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testOrdersApi}
                    disabled={loading.orders}
                    className="w-full"
                  >
                    {loading.orders ? "Loading..." : "Get Last 5 Orders"}
                  </Button>
                  {ordersResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{ordersResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🎯 Tour Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testBookingsApi}
                    disabled={loading.bookings}
                    className="w-full"
                  >
                    {loading.bookings ? "Loading..." : "Get Last 5 Bookings"}
                  </Button>
                  {bookingsResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{bookingsResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>WooCommerce Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testProductsApi}
                    disabled={loading.products}
                    className="w-full"
                  >
                    {loading.products ? "Loading..." : "Get 3 Products"}
                  </Button>
                  {productsResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{productsResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connection Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testConnectionApi}
                    disabled={loading.connection}
                    className="w-full"
                  >
                    {loading.connection ? "Testing..." : "Test WC Connection"}
                  </Button>
                  {connectionResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{connectionResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>WordPress API</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testWordpressApi}
                    disabled={loading.wordpress}
                    className="w-full"
                  >
                    {loading.wordpress ? "Testing..." : "Test WP API"}
                  </Button>
                  {wordpressResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{wordpressResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🔍 Authentication Debug</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testAuthDebugApi}
                    disabled={loading.authDebug}
                    className="w-full"
                  >
                    {loading.authDebug ? "Debugging..." : "Debug Auth Issues"}
                  </Button>
                  {authDebugResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{authDebugResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>⚖️ API Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testComparisonApi}
                    disabled={loading.comparison}
                    className="w-full"
                  >
                    {loading.comparison ? "Comparing..." : "Compare APIs"}
                  </Button>
                  {comparisonResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{comparisonResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🐛 Debug Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testDebugApi}
                    disabled={loading.debug}
                    className="w-full"
                  >
                    {loading.debug ? "Debugging..." : "Debug What's Being Sent"}
                  </Button>
                  {debugResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{debugResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🔀 Test Auth Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testAuthMethodsApi}
                    disabled={loading.authMethods}
                    className="w-full"
                  >
                    {loading.authMethods
                      ? "Testing..."
                      : "Try All Auth Methods"}
                  </Button>
                  {authMethodsResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{authMethodsResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>🖼️ WordPress Media & Images Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={testMediaApi}
                    disabled={loading.mediaTest}
                    className="w-full"
                  >
                    {loading.mediaTest
                      ? "Testing..."
                      : "Test WordPress Images API"}
                  </Button>
                  {mediaTestResponse && (
                    <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
                      <pre className="text-sm">{mediaTestResponse}</pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
