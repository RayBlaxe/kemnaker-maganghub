/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maganghub.kemnaker.go.id',
      },
      {
        protocol: 'https',
        hostname: 'wlkp-assets.kemnaker.go.id',
      },
    ],
  },
};

export default nextConfig;
