import type { MetadataRoute } from 'next';

/**
 * Robots.txt for eveverified.com
 * Auto-served at /robots.txt by Next.js
 *
 * Disallow rules:
 *   /medical — login gate (no public content, do not index)
 *   /pilot   — pilot program landing (intentionally unlisted)
 *   /api/*   — API endpoints (no SEO value)
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/medical', '/pilot', '/api/'],
      },
    ],
    sitemap: 'https://eveverified.com/sitemap.xml',
    host: 'https://eveverified.com',
  };
}
