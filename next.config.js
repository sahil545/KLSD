/** @type {import('next').NextConfig} */
const nextConfig = {
  // Essential settings for Netlify deployment
  trailingSlash: true,
  
  // Allow cross-origin requests in development
  allowedDevOrigins: ['dc167d03e0d948deb7929a3120e07975-2ecb0f6537f44a3b8351b24af.fly.dev'],
  
  // Image optimization settings
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
};

module.exports = nextConfig;
