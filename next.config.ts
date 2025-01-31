import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "height.dollarbits.ca",
      },
    ],
  },
};

export default nextConfig;
