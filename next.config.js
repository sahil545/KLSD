/** @type {import('next').NextConfig} */
const nextConfig = {
  // Essential settings for Netlify deployment
  trailingSlash: true,

  // Allow cross-origin requests in development
  allowedDevOrigins: [
    "dc167d03e0d948deb7929a3120e07975-2ecb0f6537f44a3b8351b24af.fly.dev",
    "0c212fe047f442339de501ef967a8338-de2bfa82-931e-48d3-a4a2-5186b9.fly.dev",
    "lively-bran.biz",
    "weird-best-seller.net",
  ],

  // 🚀 Performance optimizations for dynamic pages
  experimental: {
    // Improved server components performance
    serverComponentsExternalPackages: ["@woocommerce/api"],
  },

  // Fix webpack module resolution issues
  webpack: (config, { dev, isServer, webpack }) => {
    // Improve module resolution
    config.resolve.symlinks = false;

    // Fix webpack runtime issues
    if (dev && !isServer) {
      config.optimization.moduleIds = "named";
      config.optimization.chunkIds = "named";

      // Better HMR configuration
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules", "**/.git"],
      };
    }

    // Handle external services gracefully
    if (!isServer) {
      // Add external dependencies properly for client-side
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push({
          fullstory: "FullStory",
        });
      }
    }

    return config;
  },

  // Development server configuration
  ...(process.env.NODE_ENV === "development" && {
    async rewrites() {
      return {
        fallback: [
          {
            source: "/:path*",
            destination: "/:path*",
          },
        ],
      };
    },
  }),

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "keylargoscubadiving.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "edge.fullstory.com",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:;",
  },

  // Better error handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
