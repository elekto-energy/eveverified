'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AgvScene from './AgvScene'

// ── Track boundary copy (locked — mirrors AGV/energy page constants) ──────────
const TRACK_NOTE =
  'EVE Verified / Governance Signals provides evidence trails for governed human decisions. ' +
  'EVE Control Chain is a separate experimental track for automated deterministic verdict ' +
  'records in cyber-physical workflows.'

const CONTROL_CHAIN_DISCLAIMER =
  'Not a functional safety system. Demos do not provide safety assurance. ' +
  'No certified safety controller, PLC, robot, grid system or infrastructure is operated. ' +
  'EVE produces deterministic verdict records — it does not actuate anything.'

// ── Shared type ───────────────────────────────────────────────────────────────
interface Story {
  track: string
  trackNote: string
  trackColor: string
  headline: string
  tags: string[]
  sections: { q: string; a: string }[]
  liveDemoUrl: string | null
  liveDemoLabel: string | null
  verifyLabel: string
  verifyUrl: string | null
  verifyPlaceholder: string | null
  verifyExplain: string | null
  boundaryNote: string
}

// ── Story data ────────────────────────────────────────────────────────────────
const GOVERNANCE_STORY: Story = {
  track: 'Governance',
  trackNote: 'Human decision trail',
  trackColor: '#a855f7',
  headline: 'The approval still exists — but no one knows if it still applies.',
  tags: ['AI governance', 'ISO 42001', 'Accountability continuity'],
  sections: [
    {
      q: 'What went wrong?',
      a: 'A fraud-scoring model was approved for production after a documented bias review. Eight months later the model was retrained on a new data vendor and its decision threshold was lowered to cut false negatives — a change pushed by an engineer who has since left. The original approval is still on file. But the data it rested on, the risk profile it cleared, and the threshold it was granted for no longer match the model now running. When a regulator asks “who approved the model that is live today, and on what evidence,” nobody can answer: the approving manager moved teams, the bias review points at a dataset that was replaced, and the approval record links to a model version that is no longer deployed.',
    },
    {
      q: 'What did EVE observe?',
      a: 'A prior approval whose linked evidence, accountable owner, and declared authority no longer match the current state — an approval that is present but whose material connection to present facts cannot be confirmed.',
    },
    {
      q: 'What verdict / signal did EVE produce?',
      a: 'EVE surfaced the signals ACCOUNTABILITY_CONTINUITY_GAP and APPROVAL_SCOPE_MISMATCH. EVE does not approve, reject, classify, or decide — it surfaces the gap. A named human owner must re-confirm (or revoke) before the prior approval is treated as current.',
    },
    {
      q: 'What was sealed?',
      a: "A tamper-evident record of the prior approval, the detected gap and its signals, and the human owner's re-confirmation decision — hash-chained so the full decision trail can be reconstructed after the fact.",
    },
  ],
  verifyLabel: 'Verify record',
  liveDemoUrl: 'https://grc.eveverified.com/iso42001/accountability-checkpoint',
  liveDemoLabel: 'See it run live',
  verifyUrl: 'https://verify.eveverified.com/?id=EVE-ISO42001-00004652',
  verifyPlaceholder: null,
  verifyExplain:
    'Clicking Verify recomputes the hash chain over the sealed record. A VALID result proves the sealed detector output was not changed after sealing — the gap EVE surfaced, and the human re-confirmation, are exactly as recorded.',
  boundaryNote:
    'EVE surfaces the signal. A named human owner decides. Human approval is necessary, but not always sufficient.',
}

const ENERGY_STORY: Story = {
  track: 'EVE Control Chain — Energy',
  trackNote: 'Experimental track · Not a functional safety system',
  trackColor: '#f59e0b',
  headline: 'Reserve breach and stale resync — HELD.',
  tags: ['Control Chain', 'Energy', 'HELD verdict'],
  sections: [
    {
      q: 'What went wrong?',
      a: 'In the energy-community visual model, a critical reconnect / resync was requested while the operating reserve margin was breached — and on a snapshot whose TTL had expired (a stale resync). The technical path appeared valid, but the conditions for proceeding could not be confirmed.',
    },
    {
      q: 'What did EVE observe?',
      a: 'Reserve margin below threshold and an expired snapshot TTL (stale state), with accountable owner and declared authority unconfirmed.',
    },
    {
      q: 'What verdict / signal did EVE produce?',
      a: 'Control Chain verdict: HELD (fail-closed). Not ALLOWED, not DENIED — held because the governed state conditions could not be affirmatively confirmed. Verdict basis: reserve_breach, snapshot_ttl_expired. UNKNOWN never becomes ALLOWED.',
    },
    {
      q: 'What was sealed?',
      a: 'A tamper-evident control-chain record: observed state, requested action, deterministic HELD verdict, verdict basis, and action-applied status (false).',
    },
  ],
  verifyLabel: 'Verify record',
  liveDemoUrl: '/control-chain/energy',
  liveDemoLabel: 'See it run live',
  verifyUrl: null,
  verifyPlaceholder: 'Control-chain records are sealed in the local verify-adapter (BUILD_SPEC §10). Public Bridge seal lands at M9.',
  verifyExplain: null,
  boundaryNote: CONTROL_CHAIN_DISCLAIMER,
}

const AGV_STORY: Story = {
  track: 'EVE Control Chain — AGV',
  trackNote: 'Experimental track · Not a functional safety system',
  trackColor: '#ef4444',
  headline: 'Unsafe continue denied — action_applied: false.',
  tags: ['Control Chain', 'AGV', 'DENIED verdict'],
  sections: [
    {
      q: 'What went wrong?',
      a: 'In the warehouse-robot visual model, the AGV requested to continue at full speed with a human worker detected at 2.4 m. The unsafe intent was recorded to the chain first, then evaluated.',
    },
    {
      q: 'What did EVE observe?',
      a: 'Human proximity within the safety threshold combined with a full-speed continuation request. Technical trust failed to clear the governance conditions for ALLOWED.',
    },
    {
      q: 'What verdict / signal did EVE produce?',
      a: "Control Chain verdict: DENIED. action_applied: false. HTTP 409. EVE recorded the denial and the unsafe intent before returning the verdict. EVE did not stop, actuate, or control a physical robot — physical enforcement is the certified safety layer's responsibility.",
    },
    {
      q: 'What was sealed?',
      a: 'A tamper-evident record: observed state (human_detected: true, distance: 2.4 m), the requested "continue at full speed", the deterministic DENIED verdict, basis (human_proximity_unsafe), and action_applied: false.',
    },
  ],
  verifyLabel: 'Verify record',
  liveDemoUrl: '/control-chain/agv',
  liveDemoLabel: 'See it run live',
  verifyUrl: null,
  verifyPlaceholder: 'Control-chain records are sealed in the local verify-adapter (BUILD_SPEC §10). Public Bridge seal lands at M9.',
  verifyExplain: null,
  boundaryNote: CONTROL_CHAIN_DISCLAIMER,
}

const STORIES: Story[] = [GOVERNANCE_STORY, ENERGY_STORY, AGV_STORY]

// ── Story card ────────────────────────────────────────────────────────────────
function StoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
      {/* Card header */}
      <div className="px-8 pt-8 pb-6 border-b border-white/5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded"
              style={{
                color: story.trackColor,
                background: `${story.trackColor}12`,
                border: `1px solid ${story.trackColor}30`,
              }}
            >
              {story.track}
            </span>
            <span className="ml-2 text-[10px] text-gray-600">{story.trackNote}</span>
          </div>
          <span className="text-[10px] text-gray-600 font-mono">#{index + 1}</span>
        </div>

        <h2 className="text-xl md:text-2xl font-extralight tracking-wide text-white/90 mb-4">
          {story.headline}
        </h2>

        <div className="flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                color: story.trackColor,
                background: `${story.trackColor}10`,
                border: `1px solid ${story.trackColor}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Five-question body */}
      <div className="px-8 py-6 space-y-6">
        {/* AGV scene — proof-of-concept narrative, hook above the five questions */}
        {story.track === 'EVE Control Chain — AGV' && (
          <div className="mb-2">
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-3">
              Watch it run
            </div>
            <AgvScene />
          </div>
        )}

        {story.sections.map((s, i) => (
          <div key={i}>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-2">
              {s.q}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{s.a}</p>
          </div>
        ))}

        {/* Live demo */}
        {story.liveDemoUrl ? (
          <div className="pt-2">
            <a
              href={story.liveDemoUrl}
              target={story.liveDemoUrl.startsWith('http') ? '_blank' : undefined}
              rel={story.liveDemoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full transition-all hover:bg-white/10"
              style={{
                color: '#fff',
                background: `${story.trackColor}20`,
                border: `1px solid ${story.trackColor}50`,
              }}
            >
              {story.liveDemoLabel ?? 'See it run live'}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h14" />
              </svg>
            </a>
          </div>
        ) : null}

        {/* Verify */}
        <div className="pt-4 border-t border-white/5">
          <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-2">
            Verify the record
          </div>
          {story.verifyUrl ? (
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={story.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full border transition-all hover:bg-white/5"
                style={{
                  color: story.trackColor,
                  borderColor: `${story.trackColor}40`,
                }}
              >
                {story.verifyLabel}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <span className="text-[10px] text-gray-600 font-mono">
                Tamper-evident · publicly verifiable integrity check
              </span>
            </div>
          ) : (
            <p className="text-gray-600 text-xs italic">{story.verifyPlaceholder}</p>
          )}
          {story.verifyExplain ? (
            <p className="text-gray-500 text-[11px] leading-relaxed mt-3 max-w-xl">
              {story.verifyExplain}
            </p>
          ) : null}
        </div>

        {/* Boundary note */}
        <div className="pt-2">
          <p className="text-gray-600 text-[11px] leading-relaxed italic">{story.boundaryNote}</p>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StoriesClient() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-eve-green tracking-[0.3em] uppercase font-mono">
          Verification Stories
        </span>
        <h1 className="text-3xl md:text-5xl font-extralight tracking-wide text-white mt-4 mb-4">
          When the record matters after the decision.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          Most governance tooling proves a decision was made. The harder question comes later:{' '}
          <em>does that decision still hold, and can anyone prove what it rested on?</em>
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto text-xs leading-relaxed mt-3">
          Three concrete failure scenarios — same five questions each: what went wrong, what
          EVE observed, what verdict or signal EVE produced, what was sealed, and how to verify
          the record.
        </p>
      </section>

      {/* Track divider note */}
      <section className="px-6 max-w-4xl mx-auto mb-10">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <p className="text-gray-500 text-xs leading-relaxed">{TRACK_NOTE}</p>
          <p className="text-gray-600 text-[11px] mt-2">
            Different problems. Different risk profiles. Not conflated.
          </p>
        </div>
      </section>

      {/* Track 1 — Governance */}
      <section className="px-6 max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-purple-400">
            Track 1 — Governance
          </span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] text-gray-600">Human decision trail</span>
        </div>
        <StoryCard story={STORIES[0]} index={0} />
      </section>

      {/* Track 2 — Control Chain */}
      <section className="px-6 max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-400">
            Track 2 — EVE Control Chain · Experimental
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="space-y-6">
          <StoryCard story={STORIES[1]} index={1} />
          <StoryCard story={STORIES[2]} index={2} />
        </div>
      </section>

      {/* Footer note */}
      <section className="px-6 max-w-4xl mx-auto py-12 text-center">
        <p className="text-gray-600 text-xs leading-relaxed max-w-xl mx-auto">
          &ldquo;Verify&rdquo; means a{' '}
          <span className="text-gray-400">tamper-evident, publicly verifiable integrity check</span>
          {' '}— proof the sealed record is unchanged since it was sealed. It is not third-party
          attestation.
        </p>
        <p className="text-gray-700 text-[11px] mt-3">
          EVE surfaces the signal. A named human owner decides.
        </p>
      </section>

      <Footer />
    </main>
  )
}
