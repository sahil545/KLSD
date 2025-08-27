"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Don't show error boundary for HMR/FullStory fetch errors
    if (
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("fetch") ||
      error.stack?.includes("fullstory") ||
      error.stack?.includes("hmr") ||
      error.stack?.includes("webpack")
    ) {
      return { hasError: false };
    }

    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Suppress FullStory and HMR related errors
    if (
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("fetch") ||
      error.stack?.includes("fullstory") ||
      error.stack?.includes("hmr") ||
      error.stack?.includes("webpack")
    ) {
      console.debug("Suppressed development error:", error.message);
      return;
    }

    // Log other errors normally
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We&apos;re sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Client-side error handler for unhandled errors
export function initializeErrorHandling() {
  if (typeof window !== "undefined") {
    // Handle unhandled promise rejections (like fetch errors)
    window.addEventListener("unhandledrejection", (event) => {
      const error = event.reason;

      // Suppress FullStory and HMR related fetch errors
      if (
        error?.message?.includes("Failed to fetch") ||
        error?.stack?.includes("fullstory") ||
        error?.stack?.includes("hmr") ||
        error?.stack?.includes("webpack") ||
        error?.stack?.includes("_next")
      ) {
        event.preventDefault();
        console.debug("Suppressed fetch error:", error?.message || error);
        return;
      }

      console.error("Unhandled promise rejection:", error);
    });

    // Handle global errors
    window.addEventListener("error", (event) => {
      const error = event.error;

      // Suppress FullStory and HMR related errors
      if (
        error?.message?.includes("Failed to fetch") ||
        error?.stack?.includes("fullstory") ||
        error?.stack?.includes("hmr") ||
        error?.stack?.includes("webpack") ||
        event.filename?.includes("_next")
      ) {
        event.preventDefault();
        console.debug(
          "Suppressed runtime error:",
          error?.message || event.message,
        );
        return;
      }

      console.error("Global error:", error || event.message);
    });
  }
}
