import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const hostname = apiBaseUrl ? new URL(apiBaseUrl).hostname : "";

const nextConfig: NextConfig = {
  images: {
    domains: [hostname],
  },
};

export default nextConfig;


