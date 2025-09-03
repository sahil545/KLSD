"use client";

import { useEffect, useState } from "react";

export default function NetworkErrorHandler() {
  const [isOnline, setIsOnline] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setRetryCount(0);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Monitor network status
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Enhanced error handling for Next.js specific issues
    const handleFetchError = async (event: any) => {
      const target = event.target;
      const source = target?.src || target?.href || "";

      // Handle Next.js specific fetch failures
      if (
        source.includes("_next/") ||
        source.includes("webpack") ||
        source.includes("hot-update")
      ) {
        console.debug(
          "Next.js asset fetch failed, attempting recovery:",
          source,
        );

        // Attempt to reload the page after a delay if multiple failures occur
        setRetryCount((prev) => {
          const newCount = prev + 1;
          // Disabled auto-reload to avoid jitter during development
          // if (newCount >= 5) {
          //   console.log("Multiple Next.js fetch failures detected, reloading page...");
          //   setTimeout(() => { window.location.reload(); }, 2000);
          // }
          return newCount;
        });
      }
    };

    // Listen for resource load errors
    window.addEventListener("error", handleFetchError, true);

    // Handle service worker registration errors gracefully
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          registrations.forEach((registration) => {
            registration.addEventListener("error", (error) => {
              console.debug("Service worker error (handled):", error);
            });
          });
        })
        .catch((error) => {
          console.debug("Service worker check failed (handled):", error);
        });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("error", handleFetchError, true);
    };
  }, []);

  // Reset retry count when coming back online
  useEffect(() => {
    if (isOnline && retryCount > 0) {
      setRetryCount(0);
    }
  }, [isOnline, retryCount]);

  // Don't render anything in production or when everything is working
  if (
    process.env.NODE_ENV !== "development" ||
    (isOnline && retryCount === 0)
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOnline && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Connection lost</span>
          </div>
        </div>
      )}

      {retryCount > 2 && isOnline && (
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <span className="text-sm font-medium">
              Development server issues detected ({retryCount} errors)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
