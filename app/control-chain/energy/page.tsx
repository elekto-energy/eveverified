import { Metadata } from 'next'
import EnergyControlClient from './EnergyControlClient'

export const metadata: Metadata = {
  title: 'Verified Energy Community Control Demo | EVE Verified Control Chain',
  description:
    'Ten homes, shared battery, verified energy sharing and island-mode control. Visual model, real verification chain: every step runs through the EVE Verified Control Chain — verdict engine, hashed event chain, sealed record and verify adapter. No real grid, charger, battery or SCADA is controlled.',
}

export default function Page() {
  return <EnergyControlClient />
}
