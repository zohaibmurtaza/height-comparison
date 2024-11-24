import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "height.dollarbits.ca",
      },
    ],
  },
};

export default nextConfig;
