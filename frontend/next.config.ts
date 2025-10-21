import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore TypeScript errors related to backend imports during build
    // The types are only used for tRPC client generation
    ignoreBuildErrors: true,
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'providers', 'types'],
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
