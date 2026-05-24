import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Philosophy from '@/components/Philosophy'

export const metadata: Metadata = {
  title: 'Philosophy | EVE Determinism',
  description: 'The philosophy behind EVE: stable inference rules, conclusions derived from approved premises, sealed outputs.',
}

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      <div className="pt-20">
        <Philosophy />
      </div>

      <Footer />
    </main>
  )
}
