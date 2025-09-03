#!/usr/bin/env node

/**
 * Development Server Monitor
 * Helps detect and recover from common Next.js development issues
 */

const fs = require("fs");
const path = require("path");

// Monitor for common development issues
function monitorDevelopmentIssues() {
  console.log("🔍 Starting development server monitoring...");

  // Check for common problematic files/patterns
  const problematicPatterns = [
    ".next/cache",
    "node_modules/.cache",
    ".next/trace",
  ];

  // Clean up function
  function cleanup() {
    console.log("🧹 Cleaning up development artifacts...");

    problematicPatterns.forEach((pattern) => {
      const fullPath = path.join(process.cwd(), pattern);
      if (fs.existsSync(fullPath)) {
        try {
          if (fs.statSync(fullPath).isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
            console.log(`  ✅ Cleaned: ${pattern}`);
          }
        } catch (error) {
          console.log(`  ⚠️  Could not clean ${pattern}: ${error.message}`);
        }
      }
    });
  }

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n🛑 Monitoring stopped by user");
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    console.log("\n🛑 Monitoring terminated");
    process.exit(0);
  });

  // Perform cleanup on startup
  cleanup();

  console.log("✅ Development server monitoring active");
  console.log("💡 Tips for stable development:");
  console.log("   - Keep browser dev tools open to see errors");
  console.log("   - Disable ad blockers that might block analytics");
  console.log('   - Use "npm run dev" instead of other dev commands');
  console.log("   - Clear browser cache if you see stale content");

  // Monitor for file changes that might cause issues
  let lastCleanup = Date.now();
  setInterval(() => {
    const now = Date.now();
    // Clean up every 5 minutes
    if (now - lastCleanup > 5 * 60 * 1000) {
      cleanup();
      lastCleanup = now;
    }
  }, 60 * 1000); // Check every minute
}

// Export for use in package.json scripts
if (require.main === module) {
  monitorDevelopmentIssues();
}

module.exports = { monitorDevelopmentIssues };
