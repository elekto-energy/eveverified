import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'EVE Verified | Evidence & Verification Engine',
  description: 'Deterministic AI platform where systems never guess — only know. Witness-mode AI, cryptographic verification, and infinite precision.',
  keywords: ['AI', 'verification', 'deterministic', 'EVE', 'witness mode', 'compliance', 'GDPR', 'NIS2', 'EU AI Act'],
  authors: [{ name: 'Organiq Sweden AB' }],
  creator: 'Organiq Sweden AB',
  publisher: 'Organiq Sweden AB',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eveverified.com',
    siteName: 'EVE Verified',
    title: 'EVE Verified | Evidence & Verification Engine',
    description: 'Deterministic AI platform where systems never guess — only know.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EVE Verified - Deterministic AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EVE Verified | Evidence & Verification Engine',
    description: 'Deterministic AI platform where systems never guess — only know.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-eve-dark text-white antialiased">
        {children}
      </body>
    </html>
  )
}
