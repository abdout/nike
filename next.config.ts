import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable experimental features for better performance
  experimental: {
    // Enable Partial Prerendering (PPR) when stable
    // ppr: true,

    // Optimize package imports
    optimizePackageImports: [
      "lucide-react",
      "drizzle-orm",
      "@radix-ui/react-slot",
    ],
  },

  // Headers are configured in vercel.json for production
  // This is for local development
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  // Suppress hydration warnings for i18n attributes
  // Already using suppressHydrationWarning in layout
};

// Wrap with Sentry if DSN is configured
let exportedConfig = nextConfig;

// Conditionally wrap with Sentry (only if @sentry/nextjs is installed)
if (process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN) {
  try {
    // Dynamic import to avoid build errors if Sentry is not installed
    const { withSentryConfig } = require("@sentry/nextjs");
    exportedConfig = withSentryConfig(nextConfig, {
      // Sentry webpack plugin options
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    });
  } catch {
    // Sentry not installed, use config without it
    console.log("Sentry not installed, skipping Sentry integration");
  }
}

export default exportedConfig;
