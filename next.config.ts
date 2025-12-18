import type { NextConfig } from "next";

import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-13-127-186-128.ap-south-1.compute.amazonaws.com:8030/:path*",
      },
    ];
  },
  /* config options here */
  turbopack: {},
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,

  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};
//@ts-ignore
export default withPWA(nextConfig);
