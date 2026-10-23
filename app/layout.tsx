import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { company } from '@/data/products'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  // Required for Next.js to resolve relative social-image URLs to absolute ones.
  // Without it the generated og:image / twitter:image resolve against
  // http://localhost:3000 and every share card breaks in production.
  // Added as a documented deviation from WEB_RELEASE_MODEL v1.2 (metadata only,
  // no claim or content change).
  metadataBase: new URL('https://eveverified.com'),
  title: 'EVE Verified | Evidence Verification Engine',
  description: 'Deterministic evidence verification for governance, vendor review and regulated workflows. EVE returns NO_ANSWER when approved evidence is missing.',
  keywords: ['evidence verification', 'deterministic', 'EVE', 'governance', 'TPRM', 'vendor review', 'compliance', 'GDPR', 'NIS2', 'EU AI Act'],
  authors: [{ name: 'Organiq Sweden AB' }],
  creator: 'Organiq Sweden AB',
  publisher: 'Organiq Sweden AB',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eveverified.com',
    siteName: 'EVE Verified',
    title: 'EVE Verified | Evidence Verification Engine',
    description: 'Deterministic evidence verification for governance, vendor review and regulated workflows. EVE returns NO_ANSWER when approved evidence is missing.',
    // og:image comes from app/opengraph-image.tsx. The former '/og-image.png'
    // entry pointed at a file that does not exist in /public (404).
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EVE Verified | Evidence Verification Engine',
    description: 'Deterministic evidence verification for governance, vendor review and regulated workflows. EVE returns NO_ANSWER when approved evidence is missing.',
    // twitter:image comes from app/twitter-image.tsx.
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  // No 'manifest' entry: '/manifest.json' was referenced but never shipped (404).
}

// Organization + WebSite structured data (schema.org JSON-LD).
// Only facts already published in the site footer (data/products.ts → company)
// are used. No product, certification or capability claim belongs here.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://eveverified.com/#organization',
      name: company.name,
      url: 'https://eveverified.com',
      email: company.email,
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'Swedish organisation number',
        value: company.orgNr,
      },
      sameAs: [company.github],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://eveverified.com/#website',
      name: 'EVE Verified',
      url: 'https://eveverified.com',
      publisher: { '@id': 'https://eveverified.com/#organization' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-ent-bg text-ent-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  )
}
