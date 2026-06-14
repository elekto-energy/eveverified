// /stories/accountability — the cinematic main story.
// "The approval still existed. The accountability chain did not."
// Server component: sets metadata, renders the client-only WebGL scroll narrative.
import type { Metadata } from 'next'
import AccountabilityScrollStory from './AccountabilityScrollStory'

export const metadata: Metadata = {
  title: 'The approval still existed. The accountability chain did not. — EVE Verified',
  description:
    'An incident already happened. Six weeks later the auditor asks: does the approval still apply? '
    + 'A scroll narrative of accountability-continuity failure — and the tamper-evident record EVE sealed. '
    + 'Based on EVE-ISO42001-00004652.',
}

export default function AccountabilityPage() {
  return <AccountabilityScrollStory />
}
