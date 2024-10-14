/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'satecma.bg',
        pathname: '/wp-content/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        pathname: '/avatar/**'
      }
    ]
  }
};

module.exports = nextConfig;
