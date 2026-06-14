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
          A risk decision was approved. The system changed. Nobody could prove the approval
          still applied. EVE detected the gap and sealed a tamper-evident record.
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
          <a
            href="https://verify.eveverified.com/?id=EVE-ISO42001-00004652"
            target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-mono border border-white/15 bg-white/[0.03] text-gray-300 hover:bg-white/10 transition-all">
            Verify record →
          </a>
        </div>
      </section>

      {/* PROVE IT */}
      <section id="prove-it" className="px-6 max-w-3xl mx-auto mb-10 scroll-mt-24">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-6">
          Prove it — sealed record
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
