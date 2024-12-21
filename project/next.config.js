/** @type {import('next').NextConfig} */
const nextConfig = {

  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  trailingSlash: true,
  // Remove generateStaticParams requirement for static export
  experimental: {
    missingSuspenseWithCSRError: false
  }
};

module.exports = nextConfig;
