import type { NextConfig } from "next";

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
};

export default nextConfig;
