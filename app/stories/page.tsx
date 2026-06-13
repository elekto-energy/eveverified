import { Metadata } from 'next'
import StoriesClient from './StoriesClient'

export const metadata: Metadata = {
  title: 'Verification Stories | EVE Verified',
  description:
    'When the record matters after the decision. Three concrete failure scenarios — governance, energy, AGV — each shown through what went wrong, what EVE observed, and what was sealed.',
  openGraph: {
    title: 'Verification Stories | EVE Verified',
    description:
      "When the record matters after the decision. Three concrete failure scenarios shown through EVE's deterministic verdict and tamper-evident sealed record.",
    url: 'https://eveverified.com/stories',
    siteName: 'EVE Verified',
    type: 'website',
  },
}

export default function StoriesPage() {
  return <StoriesClient />
}
