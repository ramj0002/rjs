/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: works on Vercel and anywhere else that serves static files.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
