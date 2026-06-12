import type { Metadata } from 'next'
import AgvControlClient from './AgvControlClient'

export const metadata: Metadata = {
  title: 'EVE Control Chain · AGV Domain',
  description:
    'Verified autonomous warehouse robot control-chain demo. Visual/synthetic robot model, real verification chain. Not a functional safety system.',
}

export default function AgvControlChainPage() {
  return <AgvControlClient />
}
