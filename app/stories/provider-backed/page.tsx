import type { Metadata } from 'next'
import ProviderBackedStory from './ProviderBackedStory'

// Mirrors app/stories/accountability/page.tsx exactly in shape: a metadata
// export and a single component mount. No new page idiom is introduced.
//
// Metadata copy follows the 10-second rule as strictly as the page does. A
// search result and a shared link are the first viewport for a large share of
// visitors, so no digest, manifest, record id, schema version or internal
// vocabulary appears here either.
//
// Governed by app/stories/WEB_RELEASE_MODEL.md v1.2
//   752ba0a51191e7640dec0fa7ba1629af50b4f44f5ada877bfd8a27a3110df2ba

export const metadata: Metadata = {
  title: 'The expectation was sealed before the outcome existed. — EVE Verified',
  description:
    'EVE recorded what it would require while the work was still open, refused twice ' +
    'when a required source and then a required credential were unavailable, and ' +
    'verified only once both were released and the outcome existed. One sealed ' +
    'expectation, unchanged throughout. A recorded production verification, published ' +
    'as cryptographic commitments.',
  alternates: {
    canonical: 'https://eveverified.com/stories/provider-backed',
  },
  openGraph: {
    type: 'article',
    url: 'https://eveverified.com/stories/provider-backed',
    title: 'See EVE refuse twice — then verify once',
    description:
      'One sealed expectation. Two fail-closed states. One authenticated ' +
      'provider-backed verification.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'See EVE refuse twice — then verify once',
    description:
      'One sealed expectation. Two fail-closed states. One authenticated ' +
      'provider-backed verification.',
  },
}

export default function ProviderBackedPage() {
  return <ProviderBackedStory />
}
