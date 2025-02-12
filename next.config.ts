import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.dummyjson.com'], // ✅ Add the allowed external domain here
  },
};

export default nextConfig;
