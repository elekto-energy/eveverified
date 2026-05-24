/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Disabled for dynamic routes (Supabase auth)
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
