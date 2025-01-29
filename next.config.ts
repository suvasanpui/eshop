import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"cdn.dummyjson.com",
      },
      {
        protocol:"https",
        hostname:"avatars.githubusercontent.com",
      },
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
      },
      {
        protocol:"https",
        hostname:"i.ibb.co.com",
      },
    ],
  }
};

export default nextConfig;
