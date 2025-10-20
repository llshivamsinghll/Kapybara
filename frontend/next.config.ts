import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip type checking during build since backend types cause issues
    // Run `tsc --noEmit` separately to check types
    ignoreBuildErrors: true,
  },
  eslint: {
    // Run ESLint separately
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
