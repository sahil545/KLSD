"use client";

import { useEffect } from "react";

export default function ClientErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections (like fetch errors)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;

      // Suppress FullStory and HMR related fetch errors
      if (
        error?.message?.includes("Failed to fetch") ||
        error?.stack?.includes("fullstory") ||
        error?.stack?.includes("hmr") ||
        error?.stack?.includes("webpack") ||
        error?.stack?.includes("_next") ||
        error?.stack?.includes("messageHandler")
      ) {
        event.preventDefault();
        console.debug(
          "Suppressed development fetch error:",
          error?.message || error,
        );
        return;
      }

      console.error("Unhandled promise rejection:", error);
    };

    // Handle global errors
    const handleGlobalError = (event: ErrorEvent) => {
      const error = event.error;

      // Suppress FullStory and HMR related errors
      if (
        error?.message?.includes("Failed to fetch") ||
        error?.stack?.includes("fullstory") ||
        error?.stack?.includes("hmr") ||
        error?.stack?.includes("webpack") ||
        event.filename?.includes("_next") ||
        event.filename?.includes("fs.js") ||
        error?.stack?.includes("messageHandler")
      ) {
        event.preventDefault();
        console.debug(
          "Suppressed development runtime error:",
          error?.message || event.message,
        );
        return;
      }

      console.error("Global error:", error || event.message);
    };

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleGlobalError);

    // Cleanup on unmount
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      window.removeEventListener("error", handleGlobalError);
    };
  }, []);

  return null; // This component doesn't render anything
}
