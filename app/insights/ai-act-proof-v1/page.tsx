import { Metadata } from 'next'
import ArticleClient from './ArticleClient'

const URL = 'https://eveverified.com/insights/ai-act-proof-v1'
const TITLE = 'From AI Act Documents to Verifiable Proof'
const DESC =
  'A working implementation of verifiable AI Act-grade documentation and deterministic evidence resolution using EVE Bridge, public verification, and NO_ANSWER when evidence is missing.'
const OG_DESC =
  'EVE-AIACT-PROOF-V1 and GRC Witness show how governance documents, approvals and evidence gaps can become public, verifiable artifacts.'
const OG_IMAGE = 'https://eveverified.com/og/ai-act-proof-v1.png'
const PUBLISHED = '2026-05-24'

export const metadata: Metadata = {
  title: `${TITLE} | EVE Verified`,
  description: DESC,
  keywords: [
    'EU AI Act',
    'AI governance',
    'verifiable AI',
    'deterministic evidence resolution',
    'cryptographic seal',
    'EVE Bridge',
    'AI Act Article 9',
    'witness mode AI',
    'NO_ANSWER',
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
    description: OG_DESC,
    publishedTime: `${PUBLISHED}T00:00:00Z`,
    modifiedTime: `${PUBLISHED}T00:00:00Z`,
    authors: ['Joakim Eklund'],
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'EVE Verified — From AI Act Documents to Verifiable Proof',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: OG_DESC,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  } as any,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: TITLE,
  description: DESC,
  image: OG_IMAGE,
  url: URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
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
    logo: {
      '@type': 'ImageObject',
      url: 'https://eveverified.com/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': URL,
  },
  about: [
    { '@type': 'Thing', name: 'EU AI Act' },
    { '@type': 'Thing', name: 'AI governance' },
    { '@type': 'Thing', name: 'Cryptographic verification' },
    { '@type': 'Thing', name: 'Deterministic evidence resolution' },
  ],
  keywords:
    'EU AI Act, AI governance, verifiable AI, deterministic evidence resolution, cryptographic seal, EVE Bridge, AI Act Article 9, witness mode AI, NO_ANSWER',
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
