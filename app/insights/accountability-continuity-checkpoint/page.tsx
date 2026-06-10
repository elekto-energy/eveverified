import { Metadata } from 'next'
import ArticleClient from './ArticleClient'

const URL = 'https://eveverified.com/insights/accountability-continuity-checkpoint'
const TITLE = 'Accountability-Continuity Checkpoint for Chained AI Workflows'
const DESC =
  'A synthetic EVE Signals detector demo showing when a chained AI workflow can proceed — and when declared accountability, authority or approval scope can no longer be confirmed.'

export const metadata: Metadata = {
  title: `${TITLE} | EVE Verified`,
  description: DESC,
  keywords: [
    'AI governance',
    'EVE Signals',
    'accountability continuity',
    'approval scope mismatch',
    'chained AI workflows',
    'deterministic governance signals',
    'human in the loop',
    'TPRM',
    'DORA',
    'ISO 42001',
  ],
  authors: [{ name: 'Joakim Eklund' }],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: URL,
    siteName: 'EVE Verified',
    title: TITLE,
    description: DESC,
    publishedTime: '2026-06-10T00:00:00Z',
    modifiedTime: '2026-06-10T00:00:00Z',
    authors: ['Joakim Eklund'],
  },
  robots: {
    index: true,
    follow: true,
  } as any,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: TITLE,
  description: DESC,
  url: URL,
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  inLanguage: 'en',
  author: {
    '@type': 'Person',
    name: 'Joakim Eklund',
    url: 'https://organiq.se',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Organiq Sweden AB',
    url: 'https://organiq.se',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': URL,
  },
  about: [
    { '@type': 'Thing', name: 'AI governance' },
    { '@type': 'Thing', name: 'Accountability continuity' },
    { '@type': 'Thing', name: 'Governance signals' },
    { '@type': 'Thing', name: 'Chained AI workflows' },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient />
    </>
  )
}
