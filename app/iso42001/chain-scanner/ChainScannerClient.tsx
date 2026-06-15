'use client'

// EVE Governance Chain Scanner — ISO 42001 scale proof (narrow demo)
// Deterministic. Synthetic fixture data only (1,000 decision chains).
// Same input -> same output every run. No backend, no live data, no filters.
//
// This is a SCALE PROOF, not a dashboard and not a compliance judgement.
// One chain shows the problem. 1,000 chains show the operational scale.
//
// Sealed-record honesty: we do NOT fabricate sealed records for 1,000 chains.
// EVE-ISO42001-00004652 is used only as the one representative sealed example,
// linked via the accountability story.
import { useEffect, useMemo, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'
const GREY = '#9ca3af'

const N_CHAINS = 1000
const SEED = 0x42001

// Deterministic primary-trigger distribution for the 127 flagged chains.
// Each gap chain gets EXACTLY ONE primary trigger, so the cards sum cleanly to 127.
// We set the underlying FIELDS only — the resolver still derives the result from fields.
const GAP_PLAN: { key: string; count: number }[] = [
  { key: 'approval_scope_mismatch', count: 41 },
  { key: 'last_human_review_stale', count: 38 },
  { key: 'accountable_owner_unconfirmed', count: 26 },
  { key: 'declared_authority_unconfirmed', count: 14 },
  { key: 'authority_invalid_after_changes', count: 8 },
]
const N_GAP = GAP_PLAN.reduce((s, g) => s + g.count, 0) // = 127

// ── Types ─────────────────────────────────────────────────────────────────────
interface Chain {
  chain_id: string
  system_name: string
  domain: string
  owner_confirmed: boolean
  authority_confirmed: boolean
  facts_changed_after_approval: boolean
  last_human_review_days: number
  approval_scope_matches_current_system: boolean
}
type Result = 'NO_CHECKPOINT_REQUIRED' | 'ACCOUNTABILITY_CONTINUITY_GAP'
interface Resolved {
  chain: Chain
  triggers: string[]
  result: Result
  human_confirmation_required: boolean
}

// ── Deterministic PRNG (mulberry32) ─────────────────────────────────────────────
function mulberry32(seed: number) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const DOMAINS = ['Lending', 'Insurance', 'Fraud', 'Onboarding', 'Trading', 'Claims', 'AML', 'Pricing']
const SYSTEMS = [
  'Credit Decision Model',
  'Risk Indicator Engine',
  'Customer Classification Model',
  'Portfolio Summariser',
  'Document Extraction Model',
  'Eligibility Scoring Engine',
  'Transaction Anomaly Model',
  'Underwriting Assistant',
]

// Build exactly N_CHAINS chains. 873 are clean (zero triggers); 127 are gap chains,
// each carrying EXACTLY ONE primary trigger per GAP_PLAN. Only FIELDS are set here —
// the deterministic resolver derives the result. The result label is never hard-coded.
function buildFixtures(): Chain[] {
  const rnd = mulberry32(SEED)

  // Assign a primary trigger key to 127 of the 1000 indices, deterministically.
  // Build the multiset of trigger keys, then place them at a shuffled set of indices.
  const gapKeys: string[] = []
  for (const g of GAP_PLAN) for (let k = 0; k < g.count; k++) gapKeys.push(g.key)

  const order = Array.from({ length: N_CHAINS }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[order[i], order[j]] = [order[j]!, order[i]!]
  }
  // primaryTrigger[index] = key, or undefined for clean chains
  const primaryTrigger: (string | undefined)[] = new Array(N_CHAINS).fill(undefined)
  for (let k = 0; k < gapKeys.length; k++) primaryTrigger[order[k]!] = gapKeys[k]

  const chains: Chain[] = []
  for (let i = 0; i < N_CHAINS; i++) {
    const domain = DOMAINS[Math.floor(rnd() * DOMAINS.length)]!
    const system = SYSTEMS[Math.floor(rnd() * SYSTEMS.length)]!
    const trig = primaryTrigger[i]

    // Default: all fields non-triggering (clean chain).
    const c: Chain = {
      chain_id: `CHAIN-${String(i + 1).padStart(5, '0')}`,
      system_name: system,
      domain,
      owner_confirmed: true,
      authority_confirmed: true,
      facts_changed_after_approval: false,
      last_human_review_days: Math.floor(rnd() * 180), // 0..179 -> not stale
      approval_scope_matches_current_system: true,
    }

    // Set exactly ONE field so the resolver fires exactly ONE trigger.
    switch (trig) {
      case 'approval_scope_mismatch':
        c.approval_scope_matches_current_system = false
        break
      case 'last_human_review_stale':
        c.last_human_review_days = 181 + Math.floor(rnd() * 359) // 181..539 -> stale
        break
      case 'accountable_owner_unconfirmed':
        c.owner_confirmed = false
        break
      case 'declared_authority_unconfirmed':
        c.authority_confirmed = false
        break
      case 'authority_invalid_after_changes':
        c.facts_changed_after_approval = true
        break
      default:
        break // clean chain
    }

    chains.push(c)
  }
  return chains
}

// ── Deterministic resolver ──────────────────────────────────────────────────────
function resolve(chain: Chain): Resolved {
  const triggers: string[] = []
  if (!chain.owner_confirmed) triggers.push('accountable_owner_unconfirmed')
  if (!chain.authority_confirmed) triggers.push('declared_authority_unconfirmed')
  if (chain.facts_changed_after_approval) triggers.push('authority_invalid_after_changes')
  if (chain.last_human_review_days > 180) triggers.push('last_human_review_stale')
  if (!chain.approval_scope_matches_current_system) triggers.push('approval_scope_mismatch')
  const result: Result =
    triggers.length === 0 ? 'NO_CHECKPOINT_REQUIRED' : 'ACCOUNTABILITY_CONTINUITY_GAP'
  return { chain, triggers, result, human_confirmation_required: triggers.length > 0 }
}

const TRIGGER_LABELS: Record<string, string> = {
  approval_scope_mismatch: 'the approval no longer covers the running system',
  last_human_review_stale: 'the last human review is too old to rely on',
  accountable_owner_unconfirmed: 'no named owner currently stands behind the decision',
  declared_authority_unconfirmed: 'the authority it was granted under is unconfirmed',
  authority_invalid_after_changes: 'the facts the approval rested on were replaced',
}
// Card display order (matches the brief)
const CARD_ORDER = [
  { key: 'approval_scope_mismatch', title: 'Approval scope mismatch' },
  { key: 'last_human_review_stale', title: 'Stale human review' },
  { key: 'accountable_owner_unconfirmed', title: 'Owner unconfirmed' },
  { key: 'declared_authority_unconfirmed', title: 'Authority unconfirmed' },
  { key: 'authority_invalid_after_changes', title: 'Facts changed after approval' },
]

const STORY_URL = '/stories/accountability'
const SEALED_EXAMPLE = 'EVE-ISO42001-00004652'
const VERIFY_URL = `https://verify.eveverified.com/?id=${SEALED_EXAMPLE}`
const RESOLVER_VERSION = 'accountability_continuity_v0.1'

// Short human label per trigger, for the table column (full id stays in the detail panel)
const TRIGGER_SHORT: Record<string, string> = {
  approval_scope_mismatch: 'Scope mismatch',
  last_human_review_stale: 'Stale review',
  accountable_owner_unconfirmed: 'Owner unconfirmed',
  declared_authority_unconfirmed: 'Authority unconfirmed',
  authority_invalid_after_changes: 'Facts changed',
}

// Human-readable reason per primary trigger (for the detail panel)
const TRIGGER_REASON: Record<string, string> = {
  approval_scope_mismatch:
    'The prior approval exists, but the approval scope no longer matches the current system.',
  last_human_review_stale:
    'The prior approval exists, but the last human review is too old to rely on.',
  accountable_owner_unconfirmed:
    'The prior approval exists, but no named owner currently stands behind the decision.',
  declared_authority_unconfirmed:
    'The prior approval exists, but the authority it was granted under is unconfirmed.',
  authority_invalid_after_changes:
    'The prior approval exists, but the facts it rested on have since been replaced.',
}

type ScanPhase = 'idle' | 'scanning' | 'done'

const SCAN_STEPS = [
  'Validating input fields…',
  'Running deterministic resolver…',
  'Evaluating accountability triggers…',
  'Creating human review queue…',
]

export default function ChainScannerClient() {
  const [selected, setSelected] = useState<Resolved | null>(null)
  const [phase, setPhase] = useState<ScanPhase>('idle')
  const [scanStep, setScanStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Mark hydrated so the Run scan button only becomes interactive once React
  // has taken over — prevents "dead" clicks before hydration completes.
  useEffect(() => { setMounted(true) }, [])

  const { gaps, scanMs, summary, dist } = useMemo(() => {
    const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now()
    const chains = buildFixtures()
    const resolvedAll = chains.map(resolve)
    const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now()

    const gapList = resolvedAll.filter(r => r.result === 'ACCOUNTABILITY_CONTINUITY_GAP')
    const clearList = resolvedAll.filter(r => r.result === 'NO_CHECKPOINT_REQUIRED')

    const distribution: Record<string, number> = {}
    for (const c of CARD_ORDER) distribution[c.key] = 0
    for (const r of resolvedAll) for (const t of r.triggers) distribution[t]++

    return {
      gaps: gapList,
      scanMs: Math.max(1, Math.round((t1 - t0) * 100) / 100),
      summary: { total: resolvedAll.length, gap: gapList.length, clear: clearList.length },
      dist: distribution,
    }
  }, [])

  // Top 10 chains requiring human review (deterministic order by chain_id)
  const top10 = useMemo(
    () =>
      [...gaps]
        .sort((a, b) => a.chain.chain_id.localeCompare(b.chain.chain_id))
        .slice(0, 10),
    [gaps],
  )

  // Run scan — short production-style status sequence (not an animation/gimmick).
  // The resolver itself already ran in the useMemo above; this sequence only
  // surfaces the work as discrete status lines. Resolver time stays honest.
  function runScan() {
    setSelected(null)
    setScanStep(0)
    setPhase('scanning')
  }

  // Reset back to the idle state (clears selection, returns to Run scan).
  function resetScan() {
    setSelected(null)
    setScanStep(0)
    setPhase('idle')
  }

  useEffect(() => {
    if (phase !== 'scanning') return
    if (scanStep >= SCAN_STEPS.length) {
      const t = window.setTimeout(() => setPhase('done'), 280)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setScanStep(s => s + 1), 380)
    return () => window.clearTimeout(t)
  }, [phase, scanStep])

  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-6 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white/90 mb-3">
          EVE Governance Chain Scanner
        </h1>
        <p className="text-gray-500 text-sm font-mono">
          Synthetic demo dataset with deterministic gap distribution · deterministic resolver · no compliance judgement
        </p>
        <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed mt-5">
          One chain shows the problem.{' '}
          <span className="text-white/80">1,000 chains show the operational scale.</span>
        </p>
      </section>

      {/* SCAN CONTROL — idle / scanning */}
      {phase !== 'done' && (
        <section className="px-6 max-w-4xl mx-auto mb-10">
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-[12px] font-mono">
              <div>
                <div className="text-gray-600 uppercase tracking-wide text-[10px] mb-1">Dataset</div>
                <div className="text-gray-300">{N_CHAINS.toLocaleString()} synthetic governance chains</div>
              </div>
              <div>
                <div className="text-gray-600 uppercase tracking-wide text-[10px] mb-1">Resolver</div>
                <div className="text-gray-300">{RESOLVER_VERSION}</div>
              </div>
              <div>
                <div className="text-gray-600 uppercase tracking-wide text-[10px] mb-1">Mode</div>
                <div className="text-gray-300">No LLM judgement · no compliance score · no materiality</div>
              </div>
            </div>

            {phase === 'idle' && (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                  This production-style demo scans {N_CHAINS.toLocaleString()} synthetic governance
                  chains using the same deterministic resolver. It does not use an LLM. It does not
                  score compliance. It creates a human review queue where continuity can no longer
                  be proven.
                </p>
                <button
                  onClick={runScan}
                  disabled={!mounted}
                  className="px-6 py-2.5 rounded-full text-sm font-mono border transition-colors disabled:opacity-40 disabled:cursor-wait"
                  style={{ color: GREEN, borderColor: `${GREEN}40`, background: `${GREEN}0a` }}
                >
                  {mounted ? 'Run scan →' : 'Loading…'}
                </button>
              </div>
            )}

            {phase === 'scanning' && (
              <div className="font-mono text-[12px] space-y-1.5">
                {SCAN_STEPS.map((step, n) => (
                  <div
                    key={step}
                    className="flex items-center gap-2"
                    style={{ opacity: n < scanStep ? 1 : n === scanStep ? 0.7 : 0.25, transition: 'opacity .2s' }}
                  >
                    <span style={{ color: n < scanStep ? GREEN : GREY }}>
                      {n < scanStep ? '✓' : '·'}
                    </span>
                    <span className={n < scanStep ? 'text-gray-300' : 'text-gray-500'}>{step}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1" style={{ opacity: scanStep >= SCAN_STEPS.length ? 1 : 0.25 }}>
                  <span style={{ color: GREEN }}>{scanStep >= SCAN_STEPS.length ? '✓' : '·'}</span>
                  <span className="text-gray-300">
                    {N_CHAINS.toLocaleString()} / {N_CHAINS.toLocaleString()} chains scanned
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* RESULTS — only after scan */}
      {phase === 'done' && (
        <>
      {/* Summary line */}
      <section className="px-6 max-w-4xl mx-auto mb-3">
        <div className="rounded-xl bg-white/[0.02] border border-white/10 divide-y divide-white/5">
          <SummaryRow label="Decision chains scanned" value={summary.total.toLocaleString()} color="#e5e7eb" />
          <SummaryRow label="No checkpoint required" value={summary.clear.toLocaleString()} color={GREEN} />
          <SummaryRow
            label="Flagged for human review before continuity can be proven"
            value={summary.gap.toLocaleString()}
            color={RED}
          />
          <SummaryRow label="Compliance decisions made by EVE" value="0" color={GREY} />
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2 mt-3">
          <p className="text-[11px] text-gray-600 font-mono">
            Deterministic resolver completed in {scanMs} ms. Status sequence shown for demo clarity.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={runScan}
              className="text-[11px] font-mono px-3 py-1 rounded-full border transition-colors"
              style={{ color: GREY, borderColor: '#ffffff18', background: 'transparent' }}
            >
              ↻ Replay scan
            </button>
            <button
              onClick={resetScan}
              className="text-[11px] font-mono px-3 py-1 rounded-full border transition-colors"
              style={{ color: GREY, borderColor: '#ffffff18', background: 'transparent' }}
            >
              Reset
            </button>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mt-4">
          EVE does not decide the outcome. It finds where the evidence chain no longer proves continuity.
        </p>
      </section>

      {/* Trigger cards */}
      <section className="px-6 max-w-4xl mx-auto mb-10">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-4">
          Why chains were flagged
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CARD_ORDER.map(c => (
            <div key={c.key} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
              <div className="font-mono text-2xl font-light mb-1" style={{ color: RED }}>
                {(dist[c.key] ?? 0).toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-400 leading-tight">{c.title}</div>
              <div className="text-[9px] text-gray-600 font-mono mt-1">{c.key}</div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-600 mt-3 leading-relaxed">
          Each flagged chain in this demo has one primary trigger, so trigger counts equal the
          number of chains flagged for review (they sum to {N_GAP}).
        </p>
      </section>

      {/* Top 10 requiring review */}
      <section className="px-6 max-w-4xl mx-auto mb-6">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-4">
          Top 10 chains flagged for human review
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-wide text-gray-600 border-b border-white/5">
            <div className="col-span-3">chain_id</div>
            <div className="col-span-5">system_name</div>
            <div className="col-span-2">domain</div>
            <div className="col-span-2 text-right">trigger</div>
          </div>
          {top10.map(r => (
            <button
              key={r.chain.chain_id}
              onClick={() => setSelected(r)}
              className="w-full grid grid-cols-12 gap-2 px-4 py-2.5 text-[12px] font-mono text-left border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors"
            >
              <div className="col-span-3 text-gray-400">{r.chain.chain_id}</div>
              <div className="col-span-4 text-gray-300 truncate">{r.chain.system_name}</div>
              <div className="col-span-2 text-gray-500">{r.chain.domain}</div>
              <div className="col-span-3 text-right truncate" style={{ color: RED }}>{TRIGGER_SHORT[r.triggers[0]!] ?? r.triggers[0]}</div>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-600 font-mono mt-3">
          Showing 10 of {summary.gap} flagged chains. Click a chain for detail.
        </p>

        {/* Inline selected-chain detail panel (below the table) */}
        {selected && <ChainDetail resolved={selected} onClose={() => setSelected(null)} />}
      </section>

      {/* Representative sealed example — the one real, verifiable record */}
      <section className="px-6 max-w-4xl mx-auto mb-6">
        <div className="rounded-xl border p-5" style={{ borderColor: '#a855f730', background: '#a855f708' }}>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">
            Representative sealed example
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-1">
            The synthetic chains above are a scale proof and are not individually sealed. A
            representative accountability-continuity record has been sealed and can be independently
            verified.
          </p>
          <div className="text-white font-mono text-sm mb-4">{SEALED_EXAMPLE}</div>
          <div className="flex flex-wrap gap-3">
            <a
              href={STORY_URL}
              className="px-5 py-2.5 rounded-full text-sm font-mono border transition-colors"
              style={{ color: '#c4b5fd', borderColor: '#a855f740', background: '#a855f712' }}
            >
              Open accountability story →
            </a>
            <a
              href={VERIFY_URL}
              target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-mono border transition-colors"
              style={{ color: GREEN, borderColor: `${GREEN}40`, background: `${GREEN}0a` }}
            >
              Verify sealed record →
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 max-w-4xl mx-auto mb-16">
        <p className="text-[11px] text-gray-600 font-mono">
          Synthetic fixture data — not a real organisation. Not an ISO 42001 compliance assessment.
          EVE does not produce a compliance score and does not assess materiality.
        </p>
      </section>
        </>
      )}

      <Footer />
    </main>
  )
}

// ── Summary row ─────────────────────────────────────────────────────────────────
function SummaryRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="font-mono text-lg shrink-0" style={{ color }}>{value}</span>
    </div>
  )
}

// ── Chain detail (inline panel below the table) ─────────────────────────────────
function ChainDetail({ resolved, onClose }: { resolved: Resolved; onClose: () => void }) {
  const { chain, triggers, result } = resolved
  const primary = triggers[0]!

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-1">
            Selected chain · {chain.domain}
          </div>
          <div className="text-white font-mono text-sm">{chain.chain_id}</div>
          <div className="text-gray-400 font-mono text-[12px] mt-0.5">{chain.system_name}</div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xl leading-none px-2" aria-label="Close detail">×</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Input fields */}
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">Input fields</div>
          <div className="rounded-lg bg-black/20 border border-white/5 p-3 space-y-1 font-mono text-[12px]">
            <Field k="prior_approval_exists" v="true" c={GREEN} />
            <Field k="owner_confirmed" v={String(chain.owner_confirmed)} c={chain.owner_confirmed ? GREEN : RED} />
            <Field k="authority_confirmed" v={String(chain.authority_confirmed)} c={chain.authority_confirmed ? GREEN : RED} />
            <Field k="facts_changed_after_approval" v={String(chain.facts_changed_after_approval)} c={chain.facts_changed_after_approval ? RED : GREEN} />
            <Field k="last_human_review_days" v={String(chain.last_human_review_days)} c={chain.last_human_review_days > 180 ? RED : GREEN} />
            <Field k="approval_scope_matches_current_system" v={String(chain.approval_scope_matches_current_system)} c={chain.approval_scope_matches_current_system ? GREEN : RED} />
          </div>
        </div>

        {/* Resolver output + reason */}
        <div className="space-y-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">Resolver output</div>
            <div className="rounded-lg border p-3" style={{ borderColor: `${RED}25`, background: `${RED}06` }}>
              <div className="font-mono text-sm" style={{ color: RED }}>{result}</div>
              <div className="text-[11px] text-gray-500 mt-2">
                technical basis: <span className="font-mono" style={{ color: GREY }}>{primary}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">Why</div>
            <p className="text-gray-300 text-sm leading-relaxed">{TRIGGER_REASON[primary]}</p>
          </div>
        </div>
      </div>

      {/* Human review question */}
      <div className="rounded-lg border p-4 mt-4" style={{ borderColor: `${AMBER}25`, background: `${AMBER}06` }}>
        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">
          Human review question
        </div>
        <p className="text-white font-light leading-relaxed">
          Can you prove the approval that covered this system still applies to what the system is doing now?
        </p>
      </div>

      {/* Next */}
      <div className="mt-4">
        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-1">Next</div>
        <p className="text-gray-300 text-sm leading-relaxed">
          A named human owner must review before continuity can be proven.
        </p>
      </div>

      {/* Synthetic-chain note (no per-chain verify link — see the representative example below) */}
      <p className="text-[11px] text-gray-500 leading-relaxed mt-5 pt-4 border-t border-white/5">
        This chain is part of the synthetic scale dataset and is not individually sealed.
      </p>
    </div>
  )
}

function Field({ k, v, c }: { k: string; v: string; c: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-gray-500">{k}</span>
      <span style={{ color: c }}>{v}</span>
    </div>
  )
}
