import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Eve3D from '@/components/Eve3D'
import Footer from '@/components/Footer'
import { ResolutionViz, ArchitectureViz, WitnessModeViz, XVaultViz, DualLLMViz } from '@/components/EveArchitecture'
import { HumanInControl, CoreVsPlay, OrchestrationViz, CreateUIPreview } from '@/components/EveArchitecture/Principles'
import AgentEcosystemViz from '@/components/EveArchitecture/AgentEcosystem'
import AIActCompliance from '@/components/EveArchitecture/AIActCompliance'
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

      {/* Governance Signal Layer */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-2 text-center text-white/90">
          Governance Signal Layer
        </h2>
        <p className="text-gray-500 text-center mb-2 max-w-2xl mx-auto">
          Human approval is necessary, but not always sufficient.
        </p>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto text-sm">
          In chained AI and enterprise workflows, a prior approval may no longer match the current
          decision context after scope expansion, new risk data, authority changes or additional
          system actions. EVE surfaces these conditions as deterministic governance signals before
          execution continues.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { name: 'Authority Boundary',       color: '#a855f7', desc: 'Checks whether an action remains within declared authority.' },
            { name: 'Approval Chain',            color: '#a855f7', desc: 'Checks whether required approvals are present and valid.' },
            { name: 'Approval Scope Mismatch',   color: '#a855f7', desc: 'Surfaces when a prior approval exists, but its scope may no longer match the current decision context.' },
            { name: 'Accountability Continuity', color: '#a855f7', desc: 'Checks whether the accountable owner for the next decision can still be confirmed.' },
            { name: 'Overlapping Boundary',      color: '#a855f7', desc: 'Surfaces when multiple weak signals combine into a stronger governance concern.' },
            { name: 'Collective Outcome',        color: '#a855f7', desc: 'Surfaces when different simultaneous conditions create an unauthorized state.' },
            { name: 'Accumulation Risk',         color: '#a855f7', desc: 'Surfaces when repeated events exceed a declared threshold over time.' },
          ].map((signal) => (
            <div
              key={signal.name}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
              style={{ borderLeftColor: signal.color, borderLeftWidth: '2px' }}
            >
              <div className="text-white text-sm font-medium mb-1">{signal.name}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{signal.desc}</div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
          <p className="text-gray-500 text-xs leading-relaxed">
            EVE does not approve, reject, classify incidents, assess materiality or determine
            compliance. EVE surfaces the signal. A named human owner decides.
          </p>
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

      {/* Orchestration */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Orchestration
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          Three stages with clear boundaries. Each stage has explicit limitations.
          No stage can bypass another.
        </p>
        <OrchestrationViz />
      </section>

      {/* Create UI Preview */}
      <section className="py-16 px-6 max-w-5xl mx-auto bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Simple Interface, Governed Execution
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          Describe the task. Review the plan. Approve execution.
          Nothing is generated, changed, or run without explicit approval.
        </p>
        <CreateUIPreview />
      </section>

      {/* Resolution Flow (Technical Details) */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Resolution Flow
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          Deterministic factory first. Escalation only when the task cannot be resolved deterministically.
          Every output is explicitly marked.
        </p>
        <ResolutionViz />
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
          The synthesis LLM is constrained to retrieved fragments and cannot write to approved records.
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

          {/* Verification form — submits to verify.eveverified.com */}
          <form 
            action="https://verify.eveverified.com/" 
            method="GET" 
            target="_blank"
            className="p-6 rounded-xl bg-black/40 border border-white/10"
          >
            <div className="flex gap-3">
              <input 
                type="text"
                name="id"
                placeholder="Enter verification hash or reference..."
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors"
              />
              <button 
                type="submit"
                className="px-6 py-3 rounded-lg bg-eve-green/20 border border-eve-green/30 text-eve-green text-sm font-medium hover:bg-eve-green/30 transition-colors"
              >
                Verify
              </button>
            </div>
            <p className="text-gray-600 text-xs mt-4">
              Verification opens at{' '}
              <a 
                href="https://verify.eveverified.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-eve-green/70 hover:text-eve-green underline"
              >
                verify.eveverified.com
              </a>.
            </p>
          </form>

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
                { prop: 'Hallucination', conv: 'Possible', rag: 'Reduced', eve: 'Constrained' },
                { prop: 'Human Control', conv: 'Optional', rag: 'Partial', eve: 'Governed approval' },
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

      {/* AI Act Compliance */}
      <AIActCompliance />

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

      {/* Built on EVE */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Built on EVE
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto text-sm">
          The same architecture applied to six domains. All live today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'ComplieDocs',
              color: '#00d4ff',
              desc: 'Voluntary compliance documentation. Three states: VERIFIED, SCOPE_LIMITATION, PROOF_OF_ABSENCE.',
              status: 'LIVE',
              href: 'https://compliedocs.com',
              external: true,
              displayUrl: 'compliedocs.com',
            },
            {
              name: 'EVE Navigator',
              color: '#a855f7',
              desc: 'Biomedical research queries against PubMed-indexed studies. Every claim anchored to source.',
              status: 'LIVE',
              href: 'https://research.eveverified.com',
              external: true,
              displayUrl: 'research.eveverified.com',
            },
            {
              name: 'AI Act Evidence Demo',
              color: '#ff6b00',
              desc: 'Article 9 evidence coverage for GRC workflows. Deterministic matching with Supported / Partial / NO_ANSWER, and a sealed public demo result.',
              status: 'LIVE · BY INVITATION',
              href: 'https://grc.eveverified.com',
              external: true,
              displayUrl: 'grc.eveverified.com',
            },
            {
              name: 'EVE-AIACT-PROOF-V1',
              color: '#00ff88',
              desc: 'Six AI Act articles sealed with EVE Bridge. Master seal EVE-COMPLIEDOCS-00001125.',
              status: 'LIVE',
              href: '/insights/ai-act-proof-v1',
              external: false,
              displayUrl: '/insights/ai-act-proof-v1',
            },
            {
              name: 'SeatNav',
              color: '#3b82f6',
              desc: 'Real-time ticket market intelligence. Hourly snapshots and deterministic signals — not predictions.',
              status: 'LIVE',
              href: 'https://seatnav.com/world-cup-2026/market',
              external: true,
              displayUrl: 'seatnav.com',
            },
            {
              name: 'Merilista',
              color: '#ec4899',
              desc: 'Verified real estate intelligence across Spain, UAE, Turkey and Cyprus. Deterministic MERI scoring from public market sources, with EVE Bridge-sealed market snapshots.',
              status: 'LIVE',
              href: 'https://merilista.com',
              external: true,
              displayUrl: 'merilista.com',
            },
          ].map((app, i) => (
            <a
              key={i}
              href={app.href}
              target={app.external ? '_blank' : undefined}
              rel={app.external ? 'noopener noreferrer' : undefined}
              className="group block p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              {/* Status + arrow */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium"
                  style={{
                    backgroundColor: `${app.color}15`,
                    color: app.color,
                    border: `1px solid ${app.color}30`
                  }}
                >
                  {app.status}
                </span>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-white font-medium text-base mb-2">
                {app.name}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                {app.desc}
              </p>

              {/* URL footer */}
              <div className="pt-3 border-t border-white/5">
                <span className="text-[11px] font-mono break-all" style={{ color: app.color }}>
                  {app.displayUrl}
                </span>
              </div>
            </a>
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
          Evidence-bound compliance documentation.
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
