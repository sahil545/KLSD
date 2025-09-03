/**
 * Error Recovery Utilities
 * Helps recover from common development and runtime issues
 */

export class ErrorRecovery {
  private static retryAttempts = new Map<string, number>();
  private static maxRetries = 3;

  /**
   * Retry a failed operation with exponential backoff
   */
  static async retryOperation<T>(
    operation: () => Promise<T>,
    key: string,
    maxRetries: number = this.maxRetries,
  ): Promise<T> {
    const attempts = this.retryAttempts.get(key) || 0;

    try {
      const result = await operation();
      // Reset retry count on success
      this.retryAttempts.delete(key);
      return result;
    } catch (error) {
      if (attempts >= maxRetries) {
        this.retryAttempts.delete(key);
        throw error;
      }

      // Increment retry count
      this.retryAttempts.set(key, attempts + 1);

      // Exponential backoff: 1s, 2s, 4s, etc.
      const delay = Math.pow(2, attempts) * 1000;

      console.debug(
        `Retrying operation "${key}" in ${delay}ms (attempt ${attempts + 1}/${maxRetries})`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return this.retryOperation(operation, key, maxRetries);
    }
  }

  /**
   * Enhanced fetch with automatic retry for network issues
   */
  static async safeFetch(
    url: string | URL | Request,
    init?: RequestInit,
    retries: number = 2,
  ): Promise<Response> {
    const key = `fetch:${url.toString()}`;

    return this.retryOperation(
      async () => {
        const response = await fetch(url, init);

        if (!response.ok && response.status >= 500) {
          throw new Error(`Server error: ${response.status}`);
        }

        return response;
      },
      key,
      retries,
    );
  }

  /**
   * Check if an error is recoverable
   */
  static isRecoverableError(error: any): boolean {
    const errorMessage = error?.message || error?.toString() || "";

    // Network errors are usually recoverable
    if (
      errorMessage.includes("Failed to fetch") ||
      errorMessage.includes("NetworkError") ||
      errorMessage.includes("ERR_NETWORK") ||
      errorMessage.includes("ERR_CONNECTION")
    ) {
      return true;
    }

    // Server errors (5xx) are usually recoverable
    if (error?.status >= 500 && error?.status < 600) {
      return true;
    }

    // Development-specific recoverable errors
    if (process.env.NODE_ENV === "development") {
      if (
        errorMessage.includes("webpack") ||
        errorMessage.includes("hot-update") ||
        errorMessage.includes("_next/static")
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Handle analytics/external service errors gracefully
   */
  static handleExternalServiceError(serviceName: string, error: any): void {
    console.debug(
      `External service "${serviceName}" error (non-critical):`,
      error?.message || error,
    );

    // Could send to error tracking service here
    // But don't throw or disrupt the user experience
  }

  /**
   * Clean up browser storage to recover from state issues
   */
  static cleanupBrowserState(): void {
    try {
      // Clear potentially corrupted cache data
      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            if (name.includes("next-data") || name.includes("webpack")) {
              caches.delete(name);
            }
          });
        });
      }

      // Clear specific localStorage items that might cause issues
      const keysToRemove = ["next-router-prefetch-cache", "next-data-cache"];

      keysToRemove.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          // Ignore storage errors
        }
      });
    } catch (error) {
      console.debug("Browser state cleanup failed:", error);
    }
  }

  /**
   * Force page reload as last resort recovery
   */
  static forceReload(delay: number = 1000): void {
    console.log("Forcing page reload for error recovery...");
    setTimeout(() => {
      window.location.reload();
    }, delay);
  }

  /**
   * Check if we're in a problematic state and attempt recovery
   */
  static performHealthCheck(): boolean {
    try {
      // Check if Next.js router is available
      if (typeof window !== "undefined" && !(window as any).__NEXT_ROUTER__) {
        console.warn("Next.js router not available, potential issue detected");
        return false;
      }

      // Check if we have excessive errors
      const errorCount = Array.from(this.retryAttempts.values()).reduce(
        (a, b) => a + b,
        0,
      );
      if (errorCount > 10) {
        console.warn("Excessive errors detected, cleanup recommended");
        this.cleanupBrowserState();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Health check failed:", error);
      return false;
    }
  }
}

export default ErrorRecovery;
