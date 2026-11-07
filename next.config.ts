import type { NextConfig } from "next";

// NEXT_PUBLIC_ values are inlined into the client bundle at build time, so a
// missing one can't be fixed at runtime: the app would ship and then fail on
// every page load. Fail the build instead, with a message that says where to
// set it.
if (!process.env.NEXT_PUBLIC_PRODUCTS_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_PRODUCTS_API_URL is not set. Locally, copy .env.example to " +
      ".env. On Vercel, add it under Project Settings → Environment " +
      "Variables, then redeploy.",
  );
}

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
