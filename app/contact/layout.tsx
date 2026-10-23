import type { Metadata } from 'next'

// page.tsx is a client component and cannot export metadata, so /contact
// previously inherited the generic site title and had no canonical URL.
export const metadata: Metadata = {
  title: 'Contact | EVE Verified',
  description: 'Contact the EVE Verified team about Pre-Action verification, a pilot, or governance use cases.',
  alternates: {
    canonical: 'https://eveverified.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
