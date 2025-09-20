import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint checks during Vercel build
  },
  // Add other config options here if needed
};

export default nextConfig;
