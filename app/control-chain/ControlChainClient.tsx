'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// ── Types ───────────────────────────────────────────────────────────────────

type StepStatus = 'ok' | 'warning' | 'fail'

interface ChainStep {
  step: string
  status: StepStatus
  detail: string
}

interface CaseResult {
  case_id: string
  label: string
  node: string
  attestation: string
  token: string
  snapshot_ttl: string
  human_authority: string
  governance_signal: string
  secondary_signal: string | null
  execution: string
  record: string
  verify_status: string
  chain: ChainStep[]
  boundary_note: string
  is_demo: boolean
  detector_version: string
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function statusColor(s: string) {
  if (s === 'ALLOWED' || s === 'VALID' || s === 'CONFIRMED' || s === 'NO_GAP') return '#00ff88'
  if (s === 'HELD' || s === 'EXPIRED' || s === 'UNCONFIRMED') return '#f59e0b'
  if (s === 'INVALID' || s === 'REVOKED') return '#ef4444'
  return '#9ca3af'
}

function stepIcon(s: StepStatus) {
  if (s === 'ok') return '✓'
  if (s === 'warning') return '⚠'
  return '✗'
}

function stepColor(s: StepStatus) {
  if (s === 'ok') return '#00ff88'
  if (s === 'warning') return '#f59e0b'
  return '#ef4444'
}

// ── Architecture layers ──────────────────────────────────────────────────────

const LAYERS = [
  { name: 'EVE Verified',          color: '#00ff88', desc: 'Verifies the decision chain: evidence, authority, accountability, approval scope and proof.' },
  { name: 'EVE Signals',           color: '#a855f7', desc: 'Surfaces authority/accountability/approval-scope gaps before execution continues.' },
  { name: 'EVE Control Room',      color: '#00d4ff', desc: 'Records human authority and decision. EVE surfaces; humans decide.' },
  { name: 'Critical execution layer', color: '#ff6b00', desc: 'Attested control of critical execution, based on the ELEKTO-X lineage.' },
  { name: 'EVE Bridge / Verify',   color: '#60a5fa', desc: 'Seals the resulting record and makes it cryptographically verifiable.' },
]

// ── Main component ───────────────────────────────────────────────────────────

export default function ControlChainClient() {
  const [selectedCase, setSelectedCase] = useState<'A' | 'B' | null>(null)
  const [result, setResult] = useState<CaseResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRaw, setShowRaw] = useState(false)

  async function runCase(c: 'A' | 'B') {
    setSelectedCase(c)
    setLoading(true)
    setError('')
    setResult(null)
    setShowRaw(false)
    try {
      const res = await fetch(`/api/eve/control-chain?case=${c}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setResult(json.result)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-eve-green tracking-[0.3em] uppercase font-mono">
          EVE Control Chain · Experimental Track
        </span>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white/90 mt-4 mb-2">
          EVE Control Chain
        </h1>
        <p className="text-gray-400 text-base mb-6">
          From signal to authority, from execution to proof.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
          EVE Control Chain shows the full governed execution pattern: a critical action
          is requested, EVE Signals evaluates governance gaps, a named human owner confirms
          authority, the critical execution layer allows or holds execution, and the resulting
          record is sealed for later verification.
        </p>
        <p className="text-gray-600 text-xs leading-relaxed max-w-2xl mx-auto mt-4">
          EVE Verified / Governance Signals provides evidence trails for governed human
          decisions. EVE Control Chain is a separate experimental track for automated
          deterministic verdict records in cyber-physical workflows.
        </p>
        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <span className="text-xs text-gray-500 font-mono">Synthetic demo · No real hardware or SCADA</span>
        </div>
      </section>

      {/* Architecture layers */}
      <section className="py-10 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase font-mono mb-5">Platform layers</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {LAYERS.map((l) => (
              <div
                key={l.name}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5"
                style={{ borderLeftColor: l.color, borderLeftWidth: '2px' }}
              >
                <div className="text-sm font-medium mb-1" style={{ color: l.color }}>{l.name}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{l.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo runner */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase font-mono mb-6">Run synthetic case</p>

          <div className="flex gap-3 mb-8">
            {(['A', 'B'] as const).map((c) => (
              <button
                key={c}
                onClick={() => runCase(c)}
                disabled={loading}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  selectedCase === c
                    ? 'bg-white/10 border-white/30 text-white'
                    : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                } disabled:opacity-50`}
              >
                {c === 'A' ? 'Case A — Critical load reconnect' : 'Case B — SCADA link reconnect'}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center gap-3 text-gray-500 text-sm py-4">
              <div className="w-4 h-4 border border-gray-600 border-t-eve-green rounded-full animate-spin" />
              Running detector…
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {result && !loading && (
            <div className="space-y-5">

              {/* Verdict */}
              <div
                className="p-5 rounded-xl border"
                style={{
                  borderColor: result.execution === 'ALLOWED' ? '#00ff8840' : '#f59e0b40',
                  background: result.execution === 'ALLOWED' ? 'rgba(0,255,136,0.04)' : 'rgba(245,158,11,0.04)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-500 font-mono tracking-[0.12em] uppercase mb-1">{result.case_id}</div>
                    <div className="text-white font-medium">{result.label}</div>
                  </div>
                  <div
                    className="text-lg font-bold font-mono px-4 py-1.5 rounded-lg"
                    style={{
                      color: result.execution === 'ALLOWED' ? '#00ff88' : '#f59e0b',
                      background: result.execution === 'ALLOWED' ? 'rgba(0,255,136,0.08)' : 'rgba(245,158,11,0.08)',
                    }}
                  >
                    {result.execution}
                  </div>
                </div>

                {/* Node facts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {[
                    ['Node', result.node],
                    ['Attestation', result.attestation],
                    ['Token', result.token],
                    ['Snapshot TTL', result.snapshot_ttl],
                    ['Human authority', result.human_authority],
                    ['Governance signal', result.governance_signal],
                    ...(result.secondary_signal ? [['Secondary signal', result.secondary_signal]] : []),
                    ['Record', result.record],
                    ['Verify status', result.verify_status],
                  ].map(([k, v]) => (
                    <div key={k} className="p-2.5 rounded bg-white/[0.025] border border-white/5">
                      <div className="text-xs text-gray-600 mb-0.5">{k}</div>
                      <div className="text-xs font-mono font-medium" style={{ color: statusColor(v) }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision chain */}
              <div>
                <p className="text-xs text-gray-500 tracking-[0.15em] uppercase font-mono mb-4">Decision chain</p>
                <div className="space-y-2">
                  {result.chain.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                      <span
                        className="text-sm font-bold w-5 shrink-0 mt-0.5 text-center"
                        style={{ color: stepColor(step.status) }}
                      >
                        {stepIcon(step.status)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white/80 font-medium">{step.step}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{step.detail}</div>
                      </div>
                      <span className="text-xs text-gray-700 font-mono shrink-0 mt-0.5">{i + 1}/{result.chain.length}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boundary */}
              <div className="p-4 rounded-lg border border-white/10 bg-white/[0.015] text-center">
                <p className="text-gray-500 text-xs leading-relaxed">{result.boundary_note}</p>
              </div>

              {/* Raw JSON toggle */}
              <div>
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors font-mono"
                >
                  {showRaw ? '▲ hide raw JSON' : '▼ show raw JSON'}
                </button>
                {showRaw && (
                  <pre className="mt-3 p-4 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400 overflow-auto leading-relaxed">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Technical lineage */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">Technical lineage</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            The attested-control layer originates in the ELEKTO-X patent line: hardware-attested
            nodes, signed snapshots, token-gated access, multi-attestation, tamper detection,
            secure restart/resync and WORM-logged proof.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            ELEKTO-X remains the critical-resource control lineage, while EVE Control
            Chain is the packaged platform demo. See{' '}
            <a href="/elekto-x" className="text-eve-cyan/70 hover:text-eve-cyan transition-colors underline underline-offset-4 decoration-eve-cyan/20">
              ELEKTO-X / X-Vault
            </a>{' '}
            and{' '}
            <a href="/origin" className="text-eve-green/70 hover:text-eve-green transition-colors underline underline-offset-4 decoration-eve-green/20">
              Origin
            </a>
            {' '}for full provenance.
          </p>
        </div>
      </section>

      {/* API reference */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">API</h2>
          <div className="space-y-2">
            {[
              'GET /api/eve/control-chain?case=A',
              'GET /api/eve/control-chain?case=B',
              'GET /api/eve/control-chain',
            ].map((ep) => (
              <div key={ep} className="font-mono text-xs text-eve-green/70 px-4 py-3 rounded bg-black/30 border border-white/5">
                {ep}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4">
            Synthetic fixtures only. No real hardware, SCADA or grid control.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
