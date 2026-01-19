import { Metadata } from 'next'
import EveVerifiedClient from './EveVerifiedClient'

export const metadata: Metadata = {
  title: 'EVE VERIFIED | Deterministic Verification',
  description: 'Publicly auditable proof. Verify that system outputs are real, traceable, and produced under deterministic control.',
}

export default function EveVerifiedPage() {
  return <EveVerifiedClient />
}
