// BACKUP: 2026-01-19 ELEKTO PAGE
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import MarinaViz from '@/components/MarinaViz'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ELEKTO | Energy Tokenization for Microgrids',
  description: 'Tokenized energy sharing without selling. PoO/PoC verification, escrow-locked delivery, deterministic settlement. Patent pending.',
}

export default function ElektoPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs text-eve-orange tracking-[0.3em] uppercase">
            Cyber-Physical Layer
          </span>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] mt-4">
            <span className="text-eve-orange">ELEKTO</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Energy sharing without selling. Tokenized kWh with cryptographic proof-of-origin 
            and escrow-locked delivery. Patent pending.
          </p>
        </div>

        {/* Marina Visualization */}
        <MarinaViz />
        
        <p className="text-center text-gray-600 text-xs mt-4">
          Interactive marina microgrid demo • Click elements to explore
        </p>
      </section>

      {/* ... rest of original file ... */}
      <Footer />
    </main>
  )
}
