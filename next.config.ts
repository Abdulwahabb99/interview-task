import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Product photos from the dummyjson API.
    remotePatterns: [new URL("https://cdn.dummyjson.com/**")],
  },
  async redirects() {
    // Locale lives in the URL; the bare root goes to the default (English).
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
