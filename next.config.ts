import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "https://d2wm6oeclkrant.cloudfront.net/",
      },
    ],
  },
};

export default nextConfig;
