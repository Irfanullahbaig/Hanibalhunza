import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Retired routes from the previous site, kept for SEO and old links
      { source: "/categories", destination: "/shop", permanent: true },
      { source: "/our-honey", destination: "/shop", permanent: true },
    ];
  },
};

export default nextConfig;
