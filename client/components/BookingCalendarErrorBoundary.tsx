"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class BookingCalendarErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('BookingCalendar Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-20">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-6 h-6" />
                  Booking Calendar Error
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Something went wrong while loading the booking calendar. This could be due to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Network connectivity issues</li>
                  <li>Server temporarily unavailable</li>
                  <li>Invalid booking data</li>
                  <li>Browser compatibility issues</li>
                </ul>
                
                {this.state.error && (
                  <details className="bg-gray-50 p-3 rounded text-sm">
                    <summary className="cursor-pointer font-medium">Technical Details</summary>
                    <pre className="mt-2 text-xs overflow-auto">
                      {this.state.error.message}
                      {'\n'}
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reload Page
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => this.setState({ hasError: false })}
                  >
                    Try Again
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                  >
                    Go to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
