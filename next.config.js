/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  
  // Image optimization
  images: {
    ...(process.env.NODE_ENV === 'production' ? {
      domains: ["images.pexels.com"],
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    } : {
      unoptimized: true
    }),
    minimumCacheTTL: 60,
  },
  
  // Turbopack configuration
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    turbo: {
      rules: {
        // Add any custom Turbopack rules here
      }
    },
    // Enable incremental compilation for faster rebuilds
    incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };

    // Optimize moment.js locales
    config.plugins.push(
      new (require('webpack').DefinePlugin)({
        'process.env.NEXT_RUNTIME': JSON.stringify('nodejs'),
      })
    );

    // Optimize dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Bundle analyzer (only in development)
    if (process.env.ANALYZE) {
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      });
      return withBundleAnalyzer(config);
    }

    return config;
  },
  
  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
    optimizeCss: true,
    scrollRestoration: true,
    outputFileTracingRoot: __dirname,
  },
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  
  // Watch options moved to next.config.js root level
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

// Bundle analyzer configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);