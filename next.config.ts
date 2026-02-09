import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/bapteme',
        destination: '/tarifs',
        permanent: true,
      },
      {
        source: '/bapteme/:path*',
        destination: '/tarifs/:path*',
        permanent: true,
      },
      {
        source: '/tarifs/ete',
        destination: '/tarifs',
        permanent: true,
      },
      {
        source: '/tarifs/hiver',
        destination: '/tarifs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

