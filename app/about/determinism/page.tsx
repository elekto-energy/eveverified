import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Determinism | The Formal Systems Foundation',
  description: 'Like a formal logic system: stable inference rules, conclusions derived from approved premises. The philosophy behind EVE: stable core, expanding knowledge.',
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
          Fixed rules. Derived conclusions.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          Like a formal logic system, EVE operates on stable inference rules that derive 
          verified outputs from approved premises. The core is stable. Knowledge expands as new premises are approved.
          This is Verified Intelligence.
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
              <h3 className="text-white font-medium mb-2">Expanding Knowledge</h3>
              <p className="text-gray-500 text-sm">
                EVE can expand to new knowledge domains as approved premises are added. 
                Each new corpus follows the same primitive. New premises, new conclusions.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-eve-green text-2xl mb-4">=</div>
              <h3 className="text-white font-medium mb-2">Stable Core</h3>
              <p className="text-gray-500 text-sm">
                The inference rules are stable. Human-approved knowledge becomes verified premises.
                AI outputs are derived conclusions. Same input → same output.
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
              <h3 className="text-white font-medium mb-2">The Formal Systems Alternative</h3>
              <p className="text-gray-500 text-sm">
                EVE operates like a formal logic system. Fixed inference rules. Verified premises.
                Derived conclusions. When precision matters, outputs are generated from 
                approved knowledge, verified against rules, and cryptographically sealed.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-2">The Best of Both</h3>
              <p className="text-gray-500 text-sm">
                Creative interpretation when appropriate. Deterministic execution when required. 
                Human decision required. This is the EVE orchestration pattern: 
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
                desc: 'Same input produces same output.'
              },
              {
                symbol: '⛓',
                title: 'Cryptographic Truth',
                desc: 'Every sealed claim links to verifiable evidence.'
              },
              {
                symbol: '∞',
                title: 'Formal Expansion',
                desc: 'Fixed rules derive new conclusions as premises are approved. The core is stable.'
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
            "Like a formal system: the inference rules are fixed, 
            and conclusions are derived from approved premises. 
            Our core is stable — our knowledge expands as new premises pass approval."
          </blockquote>
          <p className="mt-6 text-gray-600 text-sm">— The EVE Manifesto</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
