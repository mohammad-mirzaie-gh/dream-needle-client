import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // تمام هاست‌ها مجاز هستند
      },
      {
        protocol: "http",
        hostname: "**", // حتی HTTP هم مجاز است (برای توسعه)
      },
    ],  },
};

export default nextConfig;
