/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domain: ['wp.procohat.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.procohat.com",
        port: "",
        pathname: "/**",
      },
    ]
  }
};
export default nextConfig;
