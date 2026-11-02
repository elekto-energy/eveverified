/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // WEB_RELEASE_MODEL.md v1.9 section M. The /eve-verified page posts to a
  // local-only verification endpoint and cannot complete for any visitor; the
  // public verification service is verify.eveverified.com. The route files are
  // kept in app/eve-verified as development history.
  async redirects() {
    return [
      {
        source: '/eve-verified',
        destination: 'https://verify.eveverified.com',
        statusCode: 301,
      },
    ]
  },
}

module.exports = nextConfig
