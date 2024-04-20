/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "satecma.bg",
        pathname: "/wp-content/**",
      },
    ],
  },
};

module.exports = nextConfig;
