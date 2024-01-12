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
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/pirsch-extended.js",
        destination: "https://api.pirsch.io/pirsch-extended.js",
      },
    ];
  },
};

module.exports = nextConfig;
