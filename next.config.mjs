/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
};
("https://i.ytimg.com/vi/ZHaOU6E4pWU/sddefault.jpg");
export default nextConfig;
