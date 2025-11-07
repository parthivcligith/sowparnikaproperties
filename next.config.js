/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Increase build timeout if needed
  // experimental: {
  //   workerThreads: false,
  //   cpus: 1
  // },
  // Disable image optimization if causing issues
  images: {
    domains: ['placehold.co', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
      },
    ],
    unoptimized: false,
  },
}

module.exports = nextConfig
