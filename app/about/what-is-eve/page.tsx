import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'What is EVE? | Evidence & Verification Engine',
  description: 'EVE is a deterministic AI system bound to approved knowledge. Outputs are evidence-bound, sealed, and verifiable.',
}

export default function WhatIsEvePage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs text-eve-green tracking-[0.3em] uppercase">For First-Time Visitors</span>
          <h1 className="text-3xl md:text-5xl font-extralight tracking-wide text-white mt-4">
            What is EVE?
          </h1>
        </div>
        
        {/* One-liner */}
        <div className="bg-eve-green/5 border border-eve-green/20 rounded-2xl p-8 text-center">
          <p className="text-xl md:text-2xl font-light text-white">
            EVE returns <span className="text-eve-green">evidence-bound claims</span> — or NO_ANSWER when approved evidence is missing.
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            Evidence & Verification Engine — deterministic AI for truth-preserving systems.
          </p>
        </div>
      </section>

      {/* EVE vs Traditional AI */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            EVE vs Traditional AI
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional AI */}
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="text-red-400 text-sm font-medium mb-4 uppercase tracking-wider">
                ChatGPT, Claude, etc.
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <span className="text-white">When you ask a question:</span>
                    <p className="text-gray-500">"I think the answer is X"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <span className="text-white">When it's wrong:</span>
                    <p className="text-gray-500">Apologizes, guesses again</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <span className="text-white">Memory:</span>
                    <p className="text-gray-500">Forgets between sessions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <span className="text-white">Best for:</span>
                    <p className="text-gray-500">Creative writing, brainstorming</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* EVE */}
            <div className="p-6 rounded-xl bg-eve-green/5 border border-eve-green/20">
              <div className="text-eve-green text-sm font-medium mb-4 uppercase tracking-wider">
                EVE
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-eve-green mt-1">✓</span>
                  <div>
                    <span className="text-white">When you ask a question:</span>
                    <p className="text-gray-500">"The answer is X. Here's the proof."</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-eve-green mt-1">✓</span>
                  <div>
                    <span className="text-white">When it's wrong:</span>
                    <p className="text-gray-500">Returns NO_ANSWER when approved evidence is missing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-eve-green mt-1">✓</span>
                  <div>
                    <span className="text-white">Memory:</span>
                    <p className="text-gray-500">Permanent, cryptographic record</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-eve-green mt-1">✓</span>
                  <div>
                    <span className="text-white">Best for:</span>
                    <p className="text-gray-500">Compliance, evidence, audit trails</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simple summary */}
          <div className="mt-8 grid md:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
              <span className="text-red-400 text-2xl">🔴</span>
              <p className="text-sm text-gray-400 mt-2">Regular AI: Generates → Sometimes wrong → No proof</p>
            </div>
            <div className="p-4 rounded-lg bg-eve-green/5 border border-eve-green/10">
              <span className="text-eve-green text-2xl">🟢</span>
              <p className="text-sm text-gray-400 mt-2">EVE: Evidence-bound → Traceable → Cryptographic proof</p>
            </div>
          </div>
        </div>
      </section>

      {/* Concrete Example */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            Concrete Example: A Compliance Document
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Without EVE */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">
                Without EVE
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-mono">1.</span>
                  <p className="text-gray-400">AI generates a draft</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-mono">2.</span>
                  <p className="text-gray-400">Lawyer reviews it (maybe)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-mono">3.</span>
                  <p className="text-gray-400">Saved to Google Drive</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-mono">4.</span>
                  <p className="text-red-400/80">2 years later: "Is this the approved version? Who approved it? When?"</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-red-400 text-xs">❌ No proof. No audit trail.</span>
              </div>
            </div>
            
            {/* With EVE */}
            <div className="p-6 rounded-xl bg-eve-green/5 border border-eve-green/20">
              <div className="text-eve-green text-sm font-medium mb-4 uppercase tracking-wider">
                With EVE
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-eve-green font-mono">1.</span>
                  <p className="text-gray-400">AI generates a draft</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-eve-green font-mono">2.</span>
                  <p className="text-gray-400">Human approves → EVE records: <span className="text-eve-green">WHO, WHEN, WHAT</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-eve-green font-mono">3.</span>
                  <p className="text-gray-400">Cryptographic hash seals the document</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-eve-green font-mono">4.</span>
                  <p className="text-eve-green/80">2 years later: EVE proves exactly which version was approved, by whom, unchanged</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-eve-green/10">
                <span className="text-eve-green text-xs">✓ Complete proof. Full audit trail.</span>
              </div>
            </div>
          </div>

          {/* Link to verified implementation */}
          <div className="mt-10 text-center">
            <a 
              href="/insights/ai-act-proof-v1" 
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
            >
              See it in action: EVE-AIACT-PROOF-V1 — from AI Act documents to verifiable proof
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* What problem does EVE solve */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-4 text-center text-white/90">
            What Problem Does EVE Solve?
          </h2>
          <p className="text-center text-gray-500 mb-8">Modern systems fail quietly.</p>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { problem: 'AI models', failure: 'hallucinate' },
              { problem: 'Documents', failure: 'drift' },
              { problem: 'Configurations', failure: 'change' },
              { problem: 'Evidence', failure: 'disappears' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                <p className="text-white text-sm">{item.problem}</p>
                <p className="text-red-400/80 text-xs mt-1">{item.failure}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 rounded-xl bg-eve-green/5 border border-eve-green/20">
            <p className="text-center text-white">
              EVE acts as an <span className="text-eve-green">independent verification layer</span> that:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm text-center">
              <div className="text-gray-400">
                <span className="text-eve-green">Records</span> who, what, when, and what evidence
              </div>
              <div className="text-gray-400">
                <span className="text-eve-green">Verifies</span> what is allowed to change
              </div>
              <div className="text-gray-400">
                <span className="text-eve-green">Preserves</span> what is sealed against change
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How EVE works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            How EVE Works (Simply)
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
              <p className="text-blue-400 text-sm">AI may suggest</p>
            </div>
            <span className="text-gray-600">→</span>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
              <p className="text-purple-400 text-sm">Humans approve</p>
            </div>
            <span className="text-gray-600">→</span>
            <div className="p-4 rounded-lg bg-eve-green/10 border border-eve-green/20 text-center">
              <p className="text-eve-green text-sm">EVE verifies & records</p>
            </div>
          </div>
          
          <p className="text-center text-gray-500 text-sm mb-8">
            EVE operates as a <span className="text-white">witness</span>, not a decision-maker.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'Deterministic', desc: 'Same input = same output' },
              { label: 'Traceable', desc: 'Every action is logged' },
              { label: 'Reproducible', desc: 'Results can be recreated' },
              { label: 'Auditable', desc: 'Full history preserved' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                <p className="text-eve-green text-sm font-medium">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What EVE is NOT */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            What EVE is NOT
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              '❌ A chatbot',
              '❌ An autonomous AI agent',
              '❌ A black-box decision engine',
              '❌ A legal advisor',
              '❌ A generative content platform',
              '❌ A replacement for human judgment',
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <p className="text-gray-400 text-sm">{item}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-8">
            EVE does not claim authority. EVE preserves <span className="text-eve-green">verifiable evidence</span>.
          </p>
        </div>
      </section>

      {/* Who is EVE for */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-4 text-center text-white/90">
            Who is EVE For?
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Environments where failure, ambiguity, or hallucination is unacceptable:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '§', title: 'Compliance & Regulatory', desc: 'GDPR, NIS2, EU AI Act documentation' },
              { icon: '◉', title: 'AI Governance', desc: 'Oversight and audit of AI systems' },
              { icon: '⚛', title: 'Safety-Critical Software', desc: 'Systems where errors are unacceptable' },
              { icon: '⛓', title: 'Evidence-Driven Documentation', desc: 'Legal, medical, financial records' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                <span className="text-eve-green/60 text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-medium text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 rounded-xl bg-eve-green/5 border border-eve-green/20 text-center">
            <p className="text-white">
              If something must still be correct <span className="text-eve-green">years from now</span>, it belongs in EVE.
            </p>
          </div>
        </div>
      </section>

      {/* The Symbol */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-white/90">
            The Symbol
          </h2>
          
          <div 
            className="text-6xl md:text-7xl text-eve-green mb-6"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            e
          </div>
          
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            The <span className="text-eve-green italic" style={{ fontFamily: 'Georgia, serif' }}>e</span> in EVE stands for Evidence & Verification Engine. 
            We use Euler's number as our visual symbol — a nod to mathematical precision.
          </p>
          
          <div className="inline-block p-6 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-sm">
            <span className="text-eve-green">e</span> = 2.718281828459045...<br />
            <span className="text-gray-600">Mathematical precision, endless expression</span>
          </div>
          
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-8">
            EVE's architecture is built on formal systems: fixed inference rules, 
            verified premises, and <span className="text-eve-green">derived conclusions</span>.
          </p>
          
          <a 
            href="/about/determinism" 
            className="inline-flex items-center gap-2 mt-8 text-sm text-gray-500 hover:text-white transition-colors"
          >
            Read the full philosophy
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extralight text-white mb-4">
            Ready to explore?
          </h2>
          <p className="text-gray-500 mb-8">
            See how EVE powers real products today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/eve" 
              className="px-6 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all duration-300 text-sm"
            >
              Explore EVE Core
            </a>
            <a 
              href="https://compliedocs.com" 
              className="px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:border-white/20 hover:text-white transition-all duration-300 text-sm"
            >
              Try ComplieDocs
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
