import type { Metadata } from 'next'
import ChainScannerClient from './ChainScannerClient'

export const metadata: Metadata = {
  title: 'EVE Governance Chain Scanner · ISO 42001',
  description:
    'Deterministic demo: scan many synthetic AI governance decision chains and surface accountability-continuity gaps. ' +
    'Synthetic fixture data only. Not an ISO 42001 compliance assessment.',
}

export default function ChainScannerPage() {
  return <ChainScannerClient />
}
