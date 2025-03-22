import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public"
});

export default withPWA(nextConfig);
