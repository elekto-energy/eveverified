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
      // WEB_RELEASE_MODEL.md v1.10 section N. Older explanation pages are
      // consolidated into /about/what-is-eve; the route files are kept as
      // development history. Server-side, so status and Location are sent
      // without JavaScript.
      { source: '/eve', destination: '/about/what-is-eve', statusCode: 301 },
      { source: '/about/determinism', destination: '/about/what-is-eve#principles', statusCode: 301 },
      { source: '/philosophy', destination: '/#philosophy', statusCode: 301 },
      // These two previously used redirect() inside a prerendered page, which
      // answered 307 without a Location header (section M5).
      { source: '/about', destination: '/about/what-is-eve', statusCode: 301 },
      // /stories is an index that currently opens the first story; the target
      // can change, so the redirect is temporary.
      { source: '/stories', destination: '/stories/accountability', statusCode: 307 },
    ]
  },
}

module.exports = nextConfig
