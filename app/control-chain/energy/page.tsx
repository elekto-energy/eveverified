import { Metadata } from 'next'
import EnergyControlClient from './EnergyControlClient'

export const metadata: Metadata = {
  title: 'Verified Energy Community Control Demo | EVE Control Chain',
  description:
    'Ten homes, shared battery, verified energy sharing and island-mode scenario. Visual/synthetic model, real verification chain: every step runs through the EVE Control Chain — verdict engine, hashed event chain, sealed record and verify adapter. No real grid, charger, battery or SCADA is operated. Not a functional safety system.',
}

export default function Page() {
  return <EnergyControlClient />
}
