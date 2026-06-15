'use client'

// EVE Governance Chain Scanner — ISO 42001 demo
// Deterministic. Synthetic fixture data only (1,000 decision chains).
// Same input -> same output every run. No backend, no live data.
//
// This is NOT an ISO 42001 compliance assessment and NOT a compliance score.
// It demonstrates one thing: EVE can scan many governance decision chains and
// deterministically surface accountability-continuity gaps.
import { useMemo, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'
const GREY = '#9ca3af'

const N_CHAINS = 1000
const SEED = 0x42001 // fixed seed -> deterministic fixture every run

// ── Types ─────────────────────────────────────────────────────────────────────
interface Chain {
  chain_id: string
  system_name: string
  domain: string
  prior_approval_exists: boolean
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
  is_compliance_score: false
  materiality_assessed_by_eve: false
}

// ── Deterministic PRNG (mulberry32) ────────────────────────────────────────────
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

// ── Synthetic fixture data ──────────────────────────────────────────────────────
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

function buildFixtures(): Chain[] {
  const rnd = mulberry32(SEED)
  const chains: Chain[] = []
  for (let i = 0; i < N_CHAINS; i++) {
    const domain = DOMAINS[Math.floor(rnd() * DOMAINS.length)]!
    const system = SYSTEMS[Math.floor(rnd() * SYSTEMS.length)]!
    chains.push({
      chain_id: `CHAIN-${String(i + 1).padStart(5, '0')}`,
      system_name: system,
      domain,
      prior_approval_exists: rnd() > 0.04, // a few never had an approval at all
      owner_confirmed: rnd() > 0.22,
      authority_confirmed: rnd() > 0.18,
      facts_changed_after_approval: rnd() > 0.7,
      last_human_review_days: Math.floor(rnd() * 540), // 0..540 days
      approval_scope_matches_current_system: rnd() > 0.25,
    })
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

  return {
    chain,
    triggers,
    result,
    human_confirmation_required: triggers.length > 0,
    is_compliance_score: false,
    materiality_assessed_by_eve: false,
  }
}

const TRIGGER_LABELS: Record<string, string> = {
  accountable_owner_unconfirmed: 'no named owner currently stands behind the decision',
  declared_authority_unconfirmed: 'the authority it was granted under is unconfirmed',
  authority_invalid_after_changes: 'the facts the approval rested on were replaced',
  last_human_review_stale: 'the last human review is too old to rely on',
  approval_scope_mismatch: 'the approval no longer covers the running system',
}
const TRIGGER_ORDER = [
  'accountable_owner_unconfirmed',
  'declared_authority_unconfirmed',
  'authority_invalid_after_changes',
  'last_human_review_stale',
  'approval_scope_mismatch',
]

export default function ChainScannerClient() {
  const [selected, setSelected] = useState<Resolved | null>(null)
  const [domainFilter, setDomainFilter] = useState<string>('ALL')

  // Build + resolve once (deterministic). Measure elapsed time for display.
  const { resolved, scanMs, summary, dist } = useMemo(() => {
    const t0 =
      typeof performance !== 'undefined' ? performance.now() : Date.now()
    const chains = buildFixtures()
    const resolvedAll = chains.map(resolve)
    const t1 =
      typeof performance !== 'undefined' ? performance.now() : Date.now()

    const gaps = resolvedAll.filter(r => r.result === 'ACCOUNTABILITY_CONTINUITY_GAP')
    const clear = resolvedAll.filter(r => r.result === 'NO_CHECKPOINT_REQUIRED')

    const distribution: Record<string, number> = {}
    for (const t of TRIGGER_ORDER) distribution[t] = 0
    for (const r of resolvedAll) for (const t of r.triggers) distribution[t]++

    return {
      resolved: resolvedAll,
      scanMs: Math.max(1, Math.round((t1 - t0) * 100) / 100),
      summary: {
        total: resolvedAll.length,
        gap: gaps.length,
        clear: clear.length,
        humanConfirm: gaps.length,
      },
      dist: distribution,
    }
  }, [])

  const domains = useMemo(() => ['ALL', ...DOMAINS], [])
  const rows = useMemo(
    () =>
      domainFilter === 'ALL'
        ? resolved
        : resolved.filter(r => r.chain.domain === domainFilter),
    [resolved, domainFilter],
  )

  const maxDist = Math.max(1, ...Object.values(dist))

  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-6 px-6 max-w-5xl mx-auto text-center">
        <span className="text-xs text-purple-400 tracking-[0.3em] uppercase font-mono">
          EVE Governance Chain Scanner · ISO 42001
        </span>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white/90 mt-3 mb-3">
          Scan many decision chains.<br />
          <span className="text-white/50">Surface the accountability gaps.</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
          A deterministic scan of {N_CHAINS.toLocaleString()} synthetic AI governance decision chains.
          Each chain is evaluated against five accountability-continuity signals. Same input, same
          output, every run.
        </p>
        <p className="text-[11px] text-gray-600 font-mono mt-3">
          Synthetic fixture data — not a real organisation. Not an ISO 42001 compliance assessment.
        </p>
      </section>

      {/* Summary cards */}
      <section className="px-6 max-w-5xl mx-auto mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <SummaryCard label="Decision chains scanned" value={summary.total.toLocaleString()} color="#e5e7eb" />
          <SummaryCard label="Scanned in" value={`${scanMs} ms`} color={GREY} />
          <SummaryCard label="NO_CHECKPOINT_REQUIRED" value={summary.clear.toLocaleString()} color={GREEN} mono />
          <SummaryCard label="ACCOUNTABILITY_CONTINUITY_GAP" value={summary.gap.toLocaleString()} color={RED} mono />
          <SummaryCard label="Human confirmation required" value={summary.humanConfirm.toLocaleString()} color={AMBER} />
        </div>
        <p className="text-[11px] text-gray-600 font-mono mt-3">
          is_compliance_score: false · materiality_assessed_by_eve: false
        </p>
      </section>

      {/* Trigger distribution */}
      <section className="px-6 max-w-5xl mx-auto mb-8">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-4">
          Trigger distribution — across {N_CHAINS.toLocaleString()} chains
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
          {TRIGGER_ORDER.map(t => {
            const count = dist[t] ?? 0
            const pct = Math.round((count / maxDist) * 100)
            return (
              <div key={t}>
                <div className="flex items-baseline justify-between text-[12px] font-mono mb-1">
                  <span style={{ color: RED }}>{t}</span>
                  <span className="text-gray-500">{count.toLocaleString()} chains</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `${RED}88` }} />
                </div>
                <div className="text-[11px] text-gray-600 mt-1">{TRIGGER_LABELS[t]}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Table */}
      <section className="px-6 max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono">
            Decision chains ({rows.length.toLocaleString()})
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setDomainFilter(d)}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full border transition-colors"
                style={{
                  color: domainFilter === d ? '#e5e7eb' : GREY,
                  borderColor: domainFilter === d ? '#ffffff30' : '#ffffff12',
                  background: domainFilter === d ? '#ffffff10' : 'transparent',
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-wide text-gray-600 border-b border-white/5">
            <div className="col-span-3">chain_id</div>
            <div className="col-span-4">system_name</div>
            <div className="col-span-2">domain</div>
            <div className="col-span-3 text-right">result</div>
          </div>
          <div className="max-h-[480px] overflow-y-auto">
            {rows.slice(0, 200).map(r => {
              const gap = r.result === 'ACCOUNTABILITY_CONTINUITY_GAP'
              return (
                <button
                  key={r.chain.chain_id}
                  onClick={() => setSelected(r)}
                  className="w-full grid grid-cols-12 gap-2 px-4 py-2 text-[12px] font-mono text-left border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors"
                >
                  <div className="col-span-3 text-gray-400">{r.chain.chain_id}</div>
                  <div className="col-span-4 text-gray-300 truncate">{r.chain.system_name}</div>
                  <div className="col-span-2 text-gray-500">{r.chain.domain}</div>
                  <div className="col-span-3 text-right" style={{ color: gap ? RED : GREEN }}>
                    {gap ? 'GAP' : 'CLEAR'}
                  </div>
                </button>
              )
            })}
          </div>
          {rows.length > 200 && (
            <div className="px-4 py-2 text-[11px] font-mono text-gray-600 border-t border-white/5">
              Showing first 200 of {rows.length.toLocaleString()} — filter by domain to narrow.
            </div>
          )}
        </div>
      </section>

      {/* Footer note */}
      <section className="px-6 max-w-5xl mx-auto mb-16">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-gray-500 text-xs leading-relaxed">
            EVE surfaces the signal. A named human owner decides. The scan is deterministic — the
            same fixtures resolve to the same result every run. EVE does not say compliant,
            non-compliant, incident or material, and this is not a compliance score.
          </p>
        </div>
      </section>

      {/* Detail drawer */}
      {selected && (
        <ChainDetail resolved={selected} onClose={() => setSelected(null)} />
      )}

      <Footer />
    </main>
  )
}

// ── Summary card ────────────────────────────────────────────────────────────────
function SummaryCard({
  label,
  value,
  color,
  mono,
}: {
  label: string
  value: string
  color: string
  mono?: boolean
}) {
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
      <div className="text-[9px] text-gray-500 uppercase tracking-wide font-mono mb-2 leading-tight">
        {label}
      </div>
      <div
        className={mono ? 'font-mono text-lg' : 'text-2xl font-light'}
        style={{ color }}
      >
        {value}
      </div>
    </div>
  )
}

// ── Chain detail ────────────────────────────────────────────────────────────────
function ChainDetail({ resolved, onClose }: { resolved: Resolved; onClose: () => void }) {
  const { chain, triggers, result, human_confirmation_required } = resolved
  const gap = result === 'ACCOUNTABILITY_CONTINUITY_GAP'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0e14] p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-1">
              {chain.domain} · {chain.chain_id}
            </div>
            <div className="text-white font-mono">{chain.system_name}</div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 text-xl leading-none px-2"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Chain facts */}
        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">
          Chain facts
        </div>
        <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4 mb-5 space-y-1.5 font-mono text-[12px]">
          <Fact k="prior_approval_exists" v={chain.prior_approval_exists} />
          <Fact k="owner_confirmed" v={chain.owner_confirmed} />
          <Fact k="authority_confirmed" v={chain.authority_confirmed} />
          <Fact k="facts_changed_after_approval" v={chain.facts_changed_after_approval} invert />
          <div className="flex justify-between">
            <span className="text-gray-500">last_human_review_days</span>
            <span style={{ color: chain.last_human_review_days > 180 ? RED : GREEN }}>
              {chain.last_human_review_days}
            </span>
          </div>
          <Fact k="approval_scope_matches_current_system" v={chain.approval_scope_matches_current_system} />
        </div>

        {/* Triggers */}
        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">
          Triggers {triggers.length > 0 ? `(${triggers.length})` : ''}
        </div>
        {triggers.length === 0 ? (
          <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4 mb-5 text-[12px] font-mono" style={{ color: GREEN }}>
            none — no accountability-continuity signal fired
          </div>
        ) : (
          <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4 mb-5 space-y-2">
            {triggers.map(t => (
              <div key={t}>
                <div className="text-[12px] font-mono" style={{ color: RED }}>{t}</div>
                <div className="text-[11px] text-gray-500">{TRIGGER_LABELS[t]}</div>
              </div>
            ))}
          </div>
        )}

        {/* Human question */}
        {gap && (
          <div className="rounded-lg border p-4 mb-5" style={{ borderColor: `${AMBER}25`, background: `${AMBER}06` }}>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">
              The question a human actually needs answered
            </div>
            <p className="text-white font-light leading-relaxed">
              Can you prove the approval that covered this system still applies to what the
              system is doing now?
            </p>
          </div>
        )}

        {/* EVE result */}
        <div className="rounded-lg border p-4" style={{ borderColor: gap ? `${RED}25` : `${GREEN}20`, background: gap ? `${RED}06` : `${GREEN}06` }}>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-2">
            EVE result
          </div>
          <div className="font-mono text-sm mb-2" style={{ color: gap ? RED : GREEN }}>
            {result}
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded border" style={{ color: AMBER, borderColor: `${AMBER}25`, background: `${AMBER}08` }}>
              human_confirmation_required: {String(human_confirmation_required)}
            </span>
            <span className="px-2 py-0.5 rounded border" style={{ color: GREEN, borderColor: `${GREEN}25`, background: `${GREEN}08` }}>
              is_compliance_score: false
            </span>
            <span className="px-2 py-0.5 rounded border" style={{ color: GREEN, borderColor: `${GREEN}25`, background: `${GREEN}08` }}>
              materiality_assessed_by_eve: false
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Fact({ k, v, invert }: { k: string; v: boolean; invert?: boolean }) {
  // invert: true value is the "bad" one (e.g. facts_changed_after_approval)
  const good = invert ? !v : v
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{k}</span>
      <span style={{ color: good ? GREEN : RED }}>{String(v)}</span>
    </div>
  )
}
