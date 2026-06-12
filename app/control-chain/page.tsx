import { Metadata } from 'next'
import ControlChainClient from './ControlChainClient'

export const metadata: Metadata = {
  title: 'EVE Control Chain | From signal to authority, from execution to proof.',
  description:
    'EVE Control Chain shows the full governed execution pattern: a critical action is requested, EVE Signals evaluates governance gaps, a named human owner confirms authority, the critical execution layer allows or holds execution, and the resulting record is sealed for later verification. A related but distinct track from EVE Verified governance signals.',
}

export default function Page() {
  return <ControlChainClient />
}
