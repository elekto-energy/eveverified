import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Eve3D from '@/components/Eve3D'
import Footer from '@/components/Footer'
import { TrinityViz, ArchitectureViz, WitnessModeViz, XVaultViz, DualLLMViz } from '@/components/EveArchitecture'
import { HumanInControl, CoreVsPlay, TrinityOrchestration, CreateUIPreview } from '@/components/EveArchitecture/Principles'
import AgentEcosystemViz from '@/components/EveArchitecture/AgentEcosystem'
import { eveStats } from '@/data/agents'

export const metadata: Metadata = {
  title: 'EVE | Evidence & Verification Engine',
  description: 'Witness-constrained AI architecture with hierarchical LLM escalation and cryptographic verification. Patent pending.',
}

export default function EvePage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* 3D Hero */}
      <section className="relative">
        <Eve3D />
      </section>

      {/* Patent Badge */}
      <section className="py-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green text-sm">
          Patent Pending
        </div>
      </section>

      {/* Human-in-Control - THE CORE PRINCIPLE */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <HumanInControl />
      </section>

      {/* Core Problem */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extralight tracking-wide mb-6 text-white/90">
          The Problem We Solve
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🎭', title: 'Hallucination', desc: 'AI generates false information' },
            { icon: '⚖️', title: 'Accountability', desc: 'Unclear who is responsible' },
            { icon: '🔍', title: 'Traceability', desc: 'Cannot verify sources' },
            { icon: '🎲', title: 'Non-determinism', desc: 'Different answers each time' },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="text-white text-sm font-medium">{p.title}</div>
              <div className="text-gray-600 text-xs">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EVE Core vs EVE Play */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Two Modes, Clear Boundaries
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          EVE Core is always the default. EVE Play requires explicit opt-in.
          Verified outputs only come from Core.
        </p>
        <CoreVsPlay />
      </section>

      {/* Five-Component Architecture */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Five-Component Architecture
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          A novel system where AI is architecturally constrained to witness mode, 
          combined with deterministic factories and cryptographic verification.
        </p>
        <ArchitectureViz />
      </section>

      {/* Trinity Orchestration - Clarified */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Trinity Orchestration
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          Three stages with clear boundaries. Each stage has explicit limitations.
          No stage can bypass another.
        </p>
        <TrinityOrchestration />
      </section>

      {/* Create UI Preview */}
      <section className="py-16 px-6 max-w-5xl mx-auto bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Simple Interface, Full Control
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          Describe what you want. Review the plan. Approve execution.
          Nothing happens without your explicit consent.
        </p>
        <CreateUIPreview />
      </section>

      {/* Trinity Pipeline (Technical Details) */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Trinity Pipeline
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          Hierarchical processing: deterministic factory first (~0.1ms), 
          escalate to LLM only when necessary. Every output is explicitly marked.
        </p>
        <TrinityViz />
      </section>

      {/* Witness Mode */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Witness Mode
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          AI that observes and reports — architecturally prevented from recommending or deciding.
        </p>
        <WitnessModeViz />
      </section>

      {/* Dual LLM Separation */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Dual-LLM Isolation
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          The synthesis LLM never sees your question — only retrieved knowledge fragments.
          Hallucination outside the knowledge core is architecturally impossible.
        </p>
        <DualLLMViz />
      </section>

      {/* X-Vault */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          X-Vault: Cryptographic Verification
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          Offline-verifiable proofs built on ELEKTO-X vault architecture.
        </p>
        <XVaultViz />
      </section>

      {/* EVE Verified - Verify an Artifact */}
      <section id="verify" className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 mb-8">
            <span className="text-eve-green text-xl">◉</span>
            <span className="text-eve-green text-lg tracking-wide font-medium">EVE VERIFIED</span>
          </div>
          
          <h2 className="text-2xl font-extralight tracking-wide mb-4 text-white/90">
            Verify an Artifact
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Enter a verification reference or hash. 
            The system returns verification status and associated evidence.
          </p>

          {/* Verification Input (placeholder) */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/10">
            <div className="flex gap-3">
              <input 
                type="text"
                placeholder="Enter verification hash or reference..."
                disabled
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm placeholder:text-gray-600"
              />
              <button 
                disabled
                className="px-6 py-3 rounded-lg bg-eve-green/20 border border-eve-green/30 text-eve-green text-sm font-medium opacity-50 cursor-not-allowed"
              >
                Verify
              </button>
            </div>
            <p className="text-gray-600 text-xs mt-4">
              Verification service coming soon.
            </p>
          </div>

          <p className="mt-8 text-eve-green text-sm">
            Trust is optional. Verification is not.
          </p>
        </div>
      </section>

      {/* Agent Ecosystem */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Agent Ecosystem
        </h2>
        <p className="text-gray-500 text-center mb-2 max-w-2xl mx-auto">
          Configured roles with defined constraints — not autonomous actors.
          You define, configure, and constrain. EVE verifies.
        </p>
        <AgentEcosystemViz />
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: eveStats.agents, label: 'AGENTS', desc: 'Configured roles' },
            { value: eveStats.engines, label: 'ENGINES', desc: 'Deterministic factories' },
            { value: eveStats.knowledgeChunks, label: 'KB CHUNKS', desc: 'Indexed knowledge' },
            { value: '20', label: 'CLAIMS', desc: 'Patent coverage' }
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

      {/* Technical Comparison */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-8 text-center text-white/90">
          Technical Advantages
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-500 font-normal">Property</th>
                <th className="text-center py-3 px-4 text-gray-500 font-normal">Conventional AI</th>
                <th className="text-center py-3 px-4 text-gray-500 font-normal">RAG Systems</th>
                <th className="text-center py-3 px-4 text-eve-green font-normal">EVE</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: 'Hallucination', conv: 'Possible', rag: 'Reduced', eve: 'Prevented' },
                { prop: 'Human Control', conv: 'Optional', rag: 'Partial', eve: 'Absolute' },
                { prop: 'Traceability', conv: 'Limited', rag: 'Partial', eve: 'Complete' },
                { prop: 'Reproducibility', conv: 'No', rag: 'No', eve: 'Yes' },
                { prop: 'Offline Verification', conv: 'N/A', rag: 'Limited', eve: 'Full' },
                { prop: 'Latency (deterministic)', conv: '100-3000ms', rag: '500-2000ms', eve: '0.1ms' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 px-4 text-white">{row.prop}</td>
                  <td className="py-3 px-4 text-center text-gray-500">{row.conv}</td>
                  <td className="py-3 px-4 text-center text-gray-500">{row.rag}</td>
                  <td className="py-3 px-4 text-center text-eve-green">{row.eve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Factories */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-eve-green/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
            Deterministic Factories
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            Template-based generation with guaranteed reproducibility. Same input → Same output.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Code Factory */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-eve-green/10 border border-eve-green/30 flex items-center justify-center text-eve-green">
                  ⚙
                </div>
                <div>
                  <div className="text-white font-medium">Code Factory</div>
                  <div className="text-gray-600 text-xs">UI components, API endpoints</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Predefined templates</li>
                <li>• Parameter substitution without LLM</li>
                <li>• Guaranteed syntactically correct</li>
                <li>• ~0.06ms generation time</li>
              </ul>
            </div>

            {/* Compliance Factory */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-eve-cyan/10 border border-eve-cyan/30 flex items-center justify-center text-eve-cyan">
                  §
                </div>
                <div>
                  <div className="text-white font-medium">Compliance Factory</div>
                  <div className="text-gray-600 text-xs">GDPR, NIS2, AI Act documents</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Legally reviewed templates</li>
                <li>• Version-locked content</li>
                <li>• Field validation against schema</li>
                <li>• Full audit trail</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Applicability */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-8 text-center text-white/90">
          Industrial Applications
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: '§', title: 'Compliance', desc: 'GDPR, NIS2, AI Act, SOC2' },
            { icon: '⚡', title: 'Energy', desc: 'Microgrid management' },
            { icon: '💻', title: 'Software', desc: 'UI/API generation' },
            { icon: '🏥', title: 'Medical', desc: 'Information systems' },
            { icon: '💰', title: 'Financial', desc: 'Audit & reporting' },
            { icon: '🔒', title: 'Security', desc: 'Critical infrastructure' },
          ].map((app, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <div className="text-2xl mb-2">{app.icon}</div>
              <div className="text-white text-sm font-medium">{app.title}</div>
              <div className="text-gray-600 text-xs">{app.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-white/90">
          Experience Deterministic AI
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          ComplieDocs is the first commercial product built on EVE architecture.
          Zero hallucination compliance documentation.
        </p>
        <div className="flex justify-center gap-4">
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
          <a 
            href="/elekto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
                       border border-white/10 text-gray-400
                       hover:border-white/20 hover:text-white transition-all"
          >
            See ELEKTO
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
