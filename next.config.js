/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.dummyjson.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};

module.exports = nextConfig;
