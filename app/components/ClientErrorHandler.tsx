"use client";

import { useEffect } from "react";

export default function ClientErrorHandler() {
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      // Filter out known external service errors that are non-critical
      const errorMessage = error.error?.message || error.message || "";
      const errorSource = error.filename || "";

      // Ignore FullStory and other analytics errors
      if (
        errorSource.includes("fullstory.com") ||
        errorSource.includes("edge.fullstory.com") ||
        errorMessage.includes("FullStory") ||
        errorMessage.includes("fs.js")
      ) {
        console.debug("External analytics error (ignored):", errorMessage);
        return;
      }

      // Ignore Next.js HMR errors in development
      if (
        process.env.NODE_ENV === "development" &&
        errorMessage.includes("Failed to fetch") &&
        (errorMessage.includes("webpack") || errorMessage.includes("_next"))
      ) {
        console.debug("Development HMR error (ignored):", errorMessage);
        return;
      }

      // Ignore transient network errors broadly in dev (HMR, navigation, analytics)
      if (errorMessage.includes("Failed to fetch")) {
        console.debug("Network fetch error (ignored):", errorMessage);
        return;
      }

      // Only log significant errors
      console.error("Client error:", error.error || error.message);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const reasonString = reason?.toString() || "";

      // Filter out known non-critical rejections
      const isDevHmrFetch =
        process.env.NODE_ENV === "development" &&
        reasonString.includes("Failed to fetch") &&
        (reasonString.includes("webpack") || reasonString.includes("_next"));
      const isAnalytics =
        reasonString.includes("FullStory") ||
        reasonString.includes("fullstory.com") ||
        reasonString.includes("edge.fullstory.com");
      const isTransientNetwork =
        reasonString.includes("Failed to fetch") ||
        reasonString.includes("NetworkError") ||
        reasonString.includes("signal timed out") ||
        reasonString.includes("signal is aborted");

      if (isDevHmrFetch || isAnalytics || isTransientNetwork) {
        console.debug("Non-critical rejection (ignored):", reasonString);
        event.preventDefault();
        return;
      }

      console.error("Unhandled promise rejection:", reason);
    };

    // Narrow fetch override: only intercept analytics requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const first = args[0] as any;
      const url = typeof first === 'string' ? first : (first && typeof first.url === 'string' ? first.url : '');

      const isAnalytics =
        url.includes("fullstory.com") ||
        url.includes("edge.fullstory.com") ||
        url.includes("fs.js") ||
        url.includes("analytics") ||
        url.includes("tracking");

      const isTransient = (err: any) => {
        const msg = String(err?.message || err || "");
        const name = String((err && err.name) || "");
        return (
          name === "AbortError" ||
          msg.includes("Failed to fetch") ||
          msg.includes("NetworkError") ||
          msg.includes("Load failed") ||
          msg.includes("signal timed out") ||
          msg.includes("signal is aborted")
        );
      };

      try {
        if (isAnalytics) {
          // Avoid network call entirely for analytics; no-op success
          return new Response(null, { status: 204 });
        }
        return await originalFetch(...args);
      } catch (err) {
        // Swallow analytics failures completely
        if (isAnalytics) {
          console.debug("Analytics fetch failed (non-critical):", url);
          return new Response(null, { status: 204 });
        }

        // Treat common dev/HMR/transient errors as non-fatal in development
        const dev = process.env.NODE_ENV === "development";
        const transient = isTransient(err) || (err instanceof TypeError);
        try {
          const parsed = new URL(url, location.href);
          const sameOrigin = parsed.origin === location.origin;
          if (sameOrigin && transient) {
            console.debug("Transient same-origin fetch error (handled):", url);
            return new Response(null, { status: 503, statusText: "Service Unavailable" });
          }
        } catch {}

        if (dev && transient) {
          // In dev, surface external transient errors so app logic can treat as CORS and enter demo mode
          console.debug("External transient fetch error (dev, surfaced):", url);
          throw err as any;
        }

        // Otherwise, rethrow to preserve semantics
        throw err;
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      // Restore original fetch
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
