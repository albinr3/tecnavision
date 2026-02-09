import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    const longCacheHeader = {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    };

    return [
      {
        source: "/uploads/:path*",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.png",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.jpg",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.jpeg",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.webp",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.avif",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.gif",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.svg",
        headers: [longCacheHeader],
      },
      {
        source: "/:path*.ico",
        headers: [longCacheHeader],
      },
    ];
  },
};

export default nextConfig;
