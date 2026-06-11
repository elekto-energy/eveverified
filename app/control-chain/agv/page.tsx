import type { Metadata } from 'next'
import AgvControlClient from './AgvControlClient'

export const metadata: Metadata = {
  title: 'EVE Verified Control Chain · AGV Domain',
  description:
    'Verified autonomous warehouse robot control-chain demo. Visual robot model, real verification chain.',
}

export default function AgvControlChainPage() {
  return <AgvControlClient />
}
