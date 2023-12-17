/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.dicebear.com",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
};

module.exports = nextConfig;
