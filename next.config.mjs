/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    loading: 'lazy',
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

export default nextConfig