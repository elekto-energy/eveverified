import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Determinism | The Mathematical Foundation',
  description: 'e has infinite decimals but remains exactly defined. The philosophy behind EVE: infinite expansion meets absolute precision.',
}

export default function DeterminismPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <div 
          className="text-8xl md:text-9xl text-eve-green mb-8"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          e
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extralight tracking-wide text-white/90 mb-4">
          Infinite decimals. Exactly defined.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          Euler's number (e = 2.71828...) has infinite non-repeating decimals, 
          yet it is precisely defined. This is the philosophical foundation of EVE: 
          systems that can expand infinitely while remaining mathematically exact.
        </p>
      </section>

      {/* The Principle */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            The Principle
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-eve-green text-2xl mb-4">∞</div>
              <h3 className="text-white font-medium mb-2">Infinite Expansion</h3>
              <p className="text-gray-500 text-sm">
                Like e's infinite decimals, EVE systems can expand without limit. 
                New agents, new knowledge, new capabilities — growth is unbounded.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-eve-green text-2xl mb-4">=</div>
              <h3 className="text-white font-medium mb-2">Absolute Precision</h3>
              <p className="text-gray-500 text-sm">
                Yet like e itself, every output is exactly defined. 
                Same input → same output. No ambiguity. No approximation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            Why This Matters for AI
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-2">The Problem with Probability</h3>
              <p className="text-gray-500 text-sm">
                Conventional AI operates on probability. Ask the same question twice, 
                get different answers. This is acceptable for creative tasks, 
                dangerous for compliance, governance, and critical decisions.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-2">The Deterministic Alternative</h3>
              <p className="text-gray-500 text-sm">
                EVE constrains AI to deterministic paths. When precision matters, 
                outputs are generated from templates, verified against rules, 
                and cryptographically sealed. The AI observes — it does not decide.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-2">The Best of Both</h3>
              <p className="text-gray-500 text-sm">
                Creative interpretation when appropriate. Deterministic execution when required. 
                Human decision always. This is the Trinity architecture: 
                LLM interprets → EVE verifies → Factory executes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tenets */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            Core Tenets
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                symbol: '◉',
                title: 'Witness, Never Decide',
                desc: 'AI observes and reports. Humans decide and approve.'
              },
              {
                symbol: '⚛',
                title: 'Deterministic Core',
                desc: 'Same input produces same output. Always.'
              },
              {
                symbol: '⛓',
                title: 'Cryptographic Truth',
                desc: 'Every claim is backed by verifiable evidence.'
              },
              {
                symbol: '∞',
                title: 'Infinite Expansion, Precise Definition',
                desc: 'Systems grow without losing mathematical exactness.'
              },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-start gap-3">
                  <span className="text-eve-green/60 text-xl">{item.symbol}</span>
                  <div>
                    <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifest Quote */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-extralight text-white/80 italic">
            "e has infinite decimals but remains exactly defined. 
            So too must our systems: infinite in capability, precise in execution."
          </blockquote>
          <p className="mt-6 text-gray-600 text-sm">— The EVE Manifesto</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
