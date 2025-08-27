/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix cross-origin HMR issues
  allowedDevOrigins: ['dc167d03e0d948deb7929a3120e07975-2ecb0f6537f44a3b8351b24af.fly.dev'],

  // For Netlify deployment - use server-side rendering
  output: 'standalone',

  // Optimize for production deployment
  productionBrowserSourceMaps: false,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Development optimizations
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Optimize HMR performance
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**']
      };
      
      // Reduce bundle size for faster HMR
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    
    return config;
  },

  // Reduce memory usage and improve stability
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Development server optimizations
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      // Keep pages in memory for 60 seconds instead of default 5 minutes
      maxInactiveAge: 60 * 1000,
      // Reduce concurrent page builds
      pagesBufferLength: 2,
    },
  }),
};

module.exports = nextConfig;
