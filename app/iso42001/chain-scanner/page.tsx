import type { Metadata } from 'next'
import ChainScannerClient from './ChainScannerClient'

export const metadata: Metadata = {
  title: 'EVE Governance Chain Scanner · ISO 42001',
  description:
    'Scale proof: a deterministic scan of 1,000 synthetic AI governance decision chains, surfacing ' +
    'accountability-continuity gaps. Synthetic demo dataset, no compliance judgement.',
}

export default function ChainScannerPage() {
  return <ChainScannerClient />
}
