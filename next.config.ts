import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // We have manually converted icons to React components in /icons/index.tsx
  // to avoid compatibility issues between Turbopack and SVG loaders.
  turbopack: {},
};

export default nextConfig;
