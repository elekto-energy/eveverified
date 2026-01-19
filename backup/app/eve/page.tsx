import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Eve3D from '@/components/Eve3D'
import Footer from '@/components/Footer'
import { eveStats } from '@/data/agents'

export const metadata: Metadata = {
  title: 'EVE | Evidence & Verification Engine',
  description: 'The deterministic AI core. 25 agents, 47 engines, 325000 knowledge chunks. AI that never guesses — only knows.',
}

export default function EvePage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* 3D Hero */}
      <section className="relative">
        <Eve3D />
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-extralight tracking-wide mb-6 text-white/90">
              The Core Principle
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              EVE is built on a simple but powerful idea: AI should never guess. 
              Every output must be traceable, every decision verifiable, every claim backed by evidence.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Like Euler's number <span className="text-eve-green italic" style={{ fontFamily: 'Georgia, serif' }}>e</span>, 
              EVE represents infinite capability with absolute precision. The system can expand indefinitely 
              while its core remains exactly defined.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extralight tracking-wide mb-6 text-white/90">
              Witness Mode
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Patent-pending architecture where AI cannot make autonomous decisions. 
              It can only observe, verify, and witness truth.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Every output is cryptographically sealed with X-Vault, creating an immutable 
              audit trail. No hallucinations. No fabrications. Only verified facts.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: eveStats.agents, label: 'AGENTS', desc: 'Trinity, Witness, Factory & more' },
            { value: eveStats.engines, label: 'ENGINES', desc: 'Deterministic output generation' },
            { value: eveStats.knowledgeChunks, label: 'KB CHUNKS', desc: 'UI patterns, code, documentation' },
            { value: eveStats.expansion, label: 'EXPANSION', desc: 'Infinite scalability' }
          ].map((stat, i) => (
            <div key={i} className="p-6">
              <div className="text-3xl md:text-4xl font-extralight text-eve-green mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-600">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 md:py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-12 text-center text-white/90">
          Trinity Architecture
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Claude */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-eve-cyan/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-eve-cyan/10 border border-eve-cyan/30 flex items-center justify-center text-eve-cyan text-xl mb-4">
              C
            </div>
            <h3 className="text-white font-medium mb-2">Claude API</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Anthropic Claude for creative reasoning, complex analysis, and nuanced understanding. 
              Used when tasks require deep thinking.
            </p>
          </div>

          {/* Qwen */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-eve-cyan/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-eve-cyan/10 border border-eve-cyan/30 flex items-center justify-center text-eve-cyan text-xl mb-4">
              Q
            </div>
            <h3 className="text-white font-medium mb-2">Qwen Local</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Offline-capable local model for privacy-critical operations. 
              No data leaves your infrastructure. Fast, private, secure.
            </p>
          </div>

          {/* Deterministic */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-eve-cyan/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-eve-cyan/10 border border-eve-cyan/30 flex items-center justify-center text-eve-cyan text-xl mb-4">
              D
            </div>
            <h3 className="text-white font-medium mb-2">Deterministic Router</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Intelligent routing based on task requirements. 
              Selects optimal model for each query. Predictable, fast, verifiable.
            </p>
          </div>
        </div>
      </section>

      {/* Factory Engines */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-eve-green/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
            Factory Engines
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            47 specialized engines for deterministic output. Same input always produces same output.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Compliance', icon: '§', desc: 'GDPR, NIS2, AI Act' },
              { name: 'Document', icon: '◧', desc: 'PDF, DOCX, MD' },
              { name: 'Video', icon: '▶', desc: 'Script to render' },
              { name: 'Analysis', icon: '◫', desc: 'Data processing' },
              { name: 'Translation', icon: '⟷', desc: 'SV, DE, FR' },
              { name: 'Code Factory', icon: '{ }', desc: 'UI generation' },
              { name: 'X-Vault', icon: '🔐', desc: 'Crypto sealing' },
              { name: 'AutoLearn', icon: '∞', desc: 'Knowledge indexing' },
            ].map((engine, i) => (
              <div 
                key={i}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5 
                           hover:border-eve-purple/30 transition-colors group"
              >
                <div className="text-eve-purple/60 group-hover:text-eve-purple transition-colors mb-2">
                  {engine.icon}
                </div>
                <div className="text-white/80 text-sm">{engine.name}</div>
                <div className="text-gray-600 text-xs">{engine.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-white/90">
          Ready to experience deterministic AI?
        </h2>
        <p className="text-gray-500 mb-8">
          Start with ComplieDocs — EVE-powered compliance documentation.
        </p>
        <a 
          href="https://compliedocs.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
                     bg-eve-green/10 border border-eve-green/30 text-eve-green
                     hover:bg-eve-green/20 transition-all"
        >
          Try ComplieDocs
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      <Footer />
    </main>
  )
}
