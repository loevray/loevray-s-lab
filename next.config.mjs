/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com", //youtube thumbnail
        port: "",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co", //image placeholder
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com", //youtube comment profile image
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
