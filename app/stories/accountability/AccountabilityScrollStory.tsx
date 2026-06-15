'use client'

// /stories/accountability — same pattern as /control-chain/agv.
// "What happened" = GovernanceScene (stepped timeline, replay, live from record)
// "Prove it"      = GovernanceRecordPanel (live fields from EVE-ISO42001-00004652)
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import GovernanceScene from '@/app/stories/GovernanceScene'
import GovernanceRecordPanel from './GovernanceRecordPanel'

export default function AccountabilityScrollStory() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-8 px-6 max-w-3xl mx-auto text-center">
        <span className="text-xs text-purple-400 tracking-[0.3em] uppercase font-mono">
          EVE Governance Signal · ISO 42001
        </span>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white/90 mt-3 mb-3">
          The approval still existed.<br />
          <span className="text-white/50">The accountability chain did not.</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
          A risk decision had been approved. The system changed. Nobody could prove that the
          prior approval still applied to what the system was now doing. EVE detected the
          accountability-continuity gap and sealed a tamper-evident record.
        </p>
      </section>

      {/* WHAT HAPPENED */}
      <section className="px-6 max-w-3xl mx-auto mb-4">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-3">
          What happened
        </div>
        <GovernanceScene hideFullChainLink />
        <div className="flex gap-3 mt-5 justify-center">
          <button
            onClick={() => document.getElementById('prove-it')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-full text-sm font-mono border border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all">
            See the sealed record ↓
          </button>
        </div>
      </section>

      {/* THE FAILURE STORY — prose, before any technical detail */}
      <section className="px-6 max-w-2xl mx-auto mb-10 mt-6">
        <div className="space-y-5 text-gray-300 leading-relaxed">
          <p className="text-lg font-light text-white">A credit decision was issued.</p>
          <p>But the decision did not begin in the credit committee.</p>
          <p>
            It began several AI transformations earlier: a customer interaction was captured,
            a CRM AI classified it, an AI summary was generated, a portfolio risk indicator was
            updated, and the lending decision was made using that changed context.
          </p>
          <div className="py-2 space-y-1">
            <p className="text-white">The approval still existed.</p>
            <p className="text-white">But the system had changed.</p>
            <p className="text-gray-300">
              Nobody could prove that the approval which covered the original risk decision
              still applied to what the system was now doing.
            </p>
          </div>
          <p className="text-white">That is the accountability-continuity gap.</p>
          <div className="py-2 border-t border-white/5 pt-5">
            <p>EVE does not decide whether the loan decision was right or wrong.</p>
            <p className="text-gray-400">
              EVE records the moment where the chain of ownership, authority and evidence
              can no longer be proven.
            </p>
          </div>
        </div>
      </section>

      {/* PROVE IT */}
      <section id="prove-it" className="px-6 max-w-3xl mx-auto mb-10 scroll-mt-24">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-6">
          Prove the chain — sealed record
        </div>
        <GovernanceRecordPanel />
      </section>

      {/* Footer */}
      <section className="px-6 max-w-3xl mx-auto mb-16">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-gray-500 text-xs leading-relaxed">
            EVE surfaces the signal. A named human owner decides. The seal proves the record
            is unchanged since sealing — a cryptographic integrity check, not third-party
            attestation. EVE does not say compliant, non-compliant, incident or material.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Same pattern:{' '}
            <a href="/control-chain/agv" className="underline hover:text-gray-400">AGV — DENIED</a>
            {' · '}
            <a href="/control-chain/energy" className="underline hover:text-gray-400">Energy — HELD</a>
            {' · '}
            <a href="https://grc.eveverified.com" className="underline hover:text-gray-400">GRC platform</a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
