import type { MetadataRoute } from 'next';

/**
 * Sitemap for eveverified.com
 * Auto-served at /sitemap.xml by Next.js
 *
 * Excluded routes:
 *   /medical — login gate to medical.eveverified.com (no public content)
 *   /pilot   — pilot program landing (intentionally unlisted)
 *
 * Update lastModified when content changes substantially.
 */

const BASE_URL = 'https://eveverified.com';
const NOW = new Date('2026-05-24');

type Route = {
  path: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

const ROUTES: Route[] = [
  // Top-level
  { path: '/',                          priority: 1.0, changeFrequency: 'monthly' },
  { path: '/eve',                       priority: 0.9, changeFrequency: 'monthly' },
  { path: '/solutions/tprm',            priority: 0.9, changeFrequency: 'monthly', lastModified: new Date('2026-06-12') },
  { path: '/eve-verified',              priority: 0.8, changeFrequency: 'monthly' },
  { path: '/elekto',                    priority: 0.8, changeFrequency: 'monthly' },
  { path: '/philosophy',                priority: 0.7, changeFrequency: 'monthly' },

  // Insights
  { path: '/insights',                  priority: 0.8, changeFrequency: 'weekly' },
  { path: '/insights/ai-act-proof-v1',  priority: 0.9, changeFrequency: 'monthly' },

  // ASK
  { path: '/ask',                       priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ask/legal',                 priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ask/legal/healthcare',      priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ask/legal/journalism',      priority: 0.6, changeFrequency: 'monthly' },

  // About
  { path: '/about',                     priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/what-is-eve',         priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/determinism',         priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/eve-control-room',    priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about/company',             priority: 0.5, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: r.lastModified ?? NOW,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
