import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Philosophy from '@/components/Philosophy'

export const metadata: Metadata = {
  title: 'Philosophy | EVE Determinism',
  description: 'Where infinite expansion meets absolute precision. AI systems that never guess — only know.',
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
