import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const hostname = apiBaseUrl ? new URL(apiBaseUrl).hostname : "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "abolfazl11111.runasp.net",
        port: "",
        pathname: "/**",
      },
    ],
    // domains: ["abolfazl11111.runasp.net"],
    unoptimized: true,
  },
  /* config options here */
    domains: [hostname],
  }


export default nextConfig;


