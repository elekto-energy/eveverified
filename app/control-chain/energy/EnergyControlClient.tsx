'use client'

// Verified Energy Community Control Demo — /control-chain/energy
// Visual model, REAL verification chain. Verdicts: ALLOWED / HELD / DENIED / UNKNOWN only.
// Guided demo mode by default; Advanced/raw toggle available.
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// ── Backend status ────────────────────────────────────────────────────────────
type BackendStatus = 'checking' | 'online' | 'offline'
interface HealthData {
  live: boolean
  upstream?: { status: string; mode: string; bind: string; chain_length: number; chain_valid: boolean; bridge_mode: string; is_demo: boolean }
}

// ── Domain types ──────────────────────────────────────────────────────────────
interface House { id: string; name: string; pv_kw: number; load_kw: number; sharing: boolean }
interface EnergyState {
  grid: string; mode: string; homes: House[]
  battery: { capacity_kwh: number; soc_kwh: number; critical_reserve_kwh: number; reserve_protected: boolean }
  guest_chargers: { id: string; status: string }[]
  critical_loads: string; non_critical_loads: string
  elekto_minted_today_kwh: number; domain_signals: string[]
}
interface EventRef { seq: number; type: string; hash: string; prev_hash: string; timestamp: string }
interface Verdict { verdict: 'ALLOWED' | 'HELD' | 'DENIED' | 'UNKNOWN'; basis: string[] }
interface Session {
  session_id: string; state: EnergyState; steps_executed: string[]
  events: EventRef[]; last_verdict: Verdict | null; sealed_record_id: string | null
}
interface SealResponse {
  session_id: string
  record: Record<string, unknown> & { record_id: string; execution_verdict: string; seal_hash: string }
  verify: Record<string, unknown> & { verdict: string }
}

// ── Guided scenario definition ────────────────────────────────────────────────
// The 8-step happy path. Each step has a human label, the backend step_id,
// and the narrative shown when it becomes active.
const GUIDED_STEPS: { label: string; stepId: string; narrative: string }[] = [
  { stepId: 'break_grid',            label: 'Grid outage',          narrative: 'Simulate a grid outage. EVE detects the event and holds execution until island mode is entered.' },
  { stepId: 'enter_island_mode',     label: 'Island mode',          narrative: 'Enter island mode. EVE checks technical trust: battery attestation, snapshot TTL, monotonic counter. Verdict: ALLOWED.' },
  { stepId: 'pause_guest_charging',  label: 'Pause charging',       narrative: 'Guest charging paused. Load shed to protect community battery reserve.' },
  { stepId: 'protect_critical_loads',label: 'Protect critical loads',narrative: 'Critical loads locked on. Reserve protected. Non-critical loads held.' },
  { stepId: 'mint_verified_surplus', label: 'Mint surplus',         narrative: 'Verified surplus kWh credited as ELEKTO within the closed-network accounting model.' },
  { stepId: 'restore_grid',          label: 'Grid restored',        narrative: 'Grid signal restored. Mode enters RESYNC_PENDING — resync requires verification before reconnecting.' },
  { stepId: 'request_resync',        label: 'Verified resync',      narrative: 'Resync requested. EVE re-checks snapshot and authority. Verdict: ALLOWED. Mode returns to GRID_CONNECTED.' },
]
const TOTAL_GUIDED = GUIDED_STEPS.length // 7 steps + 1 seal = 8 actions

// ── Helpers ───────────────────────────────────────────────────────────────────
function verdictColor(v: string) {
  if (v === 'ALLOWED' || v === 'VALID') return '#00ff88'
  if (v === 'HELD') return '#f59e0b'
  if (v === 'DENIED') return '#ef4444'
  return '#9ca3af'
}
function short(h: string) { return h.length > 16 ? `${h.slice(0, 8)}…${h.slice(-8)}` : h }

const BOUNDARY =
  'No real grid, charger, battery, SCADA system or infrastructure is controlled by this public demo. ' +
  'The microgrid is visual, but the EVE control-chain record, event hashes, verdict and verify-adapter ' +
  'output are generated through the verification chain.'

const MODE_BADGES = [
  'Visual model', 'Real verification chain', 'Hardware attestation: pending M3',
  'Grid control: visual only', 'Bridge mode: not_direct_bridge', 'Verification chain: active',
]

const ALL_STEP_LABELS: Record<string, string> = {
  break_grid: 'Break grid',
  enter_island_mode: 'Enter island mode',
  pause_guest_charging: 'Pause guest charging',
  protect_critical_loads: 'Protect critical loads',
  mint_verified_surplus: 'Mint verified surplus',
  restore_grid: 'Restore grid',
  request_resync: 'Request verified resync',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function EnergyControlClient() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking')
  const [lastHealth, setLastHealth] = useState<HealthData | null>(null)
  const [lastError, setLastError] = useState('')
  const [checkedAt, setCheckedAt] = useState('')
  const [session, setSession] = useState<Session | null>(null)
  const [seal, setSeal] = useState<SealResponse | null>(null)
  const [staleToggle, setStaleToggle] = useState(false)
  const [breachToggle, setBreachToggle] = useState(false)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [showRaw, setShowRaw] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // ── Health check ──────────────────────────────────────────────────────────
  useEffect(() => {
    setBackendStatus('checking')
    fetch('/api/eve/control-chain/energy/health', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: HealthData) => {
        setLastHealth(data)
        setCheckedAt(new Date().toISOString())
        setBackendStatus(data?.live === true && data?.upstream?.status === 'ok' ? 'online' : 'offline')
      })
      .catch((err: unknown) => {
        setBackendStatus('offline')
        setLastError(String(err))
        setCheckedAt(new Date().toISOString())
      })
  }, [retryCount])

  function retry() { setRetryCount((n) => n + 1) }

  // ── Session actions ───────────────────────────────────────────────────────
  async function createSession() {
    setBusy(true); setError(''); setSeal(null); setShowRaw(false)
    try {
      const res = await fetch('/api/eve/control-chain/energy/session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}),
      })
      if (!res.ok) { if (res.status === 503) setBackendStatus('offline'); throw new Error(`HTTP ${res.status}`) }
      setSession(await res.json())
    } catch (e) { setError(e instanceof Error ? e.message : 'Unknown error') }
    finally { setBusy(false) }
  }

  async function runStep(stepId: string) {
    if (!session) return
    setBusy(true); setError('')
    try {
      const body: { step_id: string; options?: { stale_snapshot?: boolean; reserve_breach?: boolean } } = { step_id: stepId }
      if (stepId === 'request_resync') body.options = { stale_snapshot: staleToggle }
      if (stepId === 'mint_verified_surplus' && breachToggle) body.options = { reserve_breach: true }
      const res = await fetch(`/api/eve/control-chain/energy/session/${session.session_id}/step`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      const json = await res.json()
      if (res.status === 503) { setBackendStatus('offline'); throw new Error('Backend OFFLINE — fail closed') }
      if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`)
      setSession(json)
    } catch (e) { setError(e instanceof Error ? e.message : 'Unknown error') }
    finally { setBusy(false) }
  }

  async function sealAndVerify() {
    if (!session) return
    setBusy(true); setError('')
    try {
      const res = await fetch(`/api/eve/control-chain/energy/session/${session.session_id}/seal`, { method: 'POST' })
      const json = await res.json()
      if (res.status === 503) { setBackendStatus('offline'); throw new Error('Backend OFFLINE — fail closed') }
      if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`)
      setSeal(json)
      setSession((prev) => (prev ? { ...prev, sealed_record_id: json.record.record_id } : prev))
    } catch (e) { setError(e instanceof Error ? e.message : 'Unknown error') }
    finally { setBusy(false) }
  }

  function reset() {
    setSession(null); setSeal(null); setError(''); setStaleToggle(false); setBreachToggle(false); setShowRaw(false)
    retry()
  }

  // ── Derived state ──────────────────────────────────────────────────────────
  const s = session?.state
  const steps = session?.steps_executed ?? []
  const sealed = Boolean(session?.sealed_record_id) || Boolean(seal)
  const isOnline = backendStatus === 'online'

  // Guided mode: next step index = how many guided steps completed so far
  const guidedIndex = steps.filter((st) => GUIDED_STEPS.some((g) => g.stepId === st)).length
  const guidedComplete = guidedIndex >= GUIDED_STEPS.length
  const nextGuidedStep = guidedComplete ? null : GUIDED_STEPS[guidedIndex]!
  const canSealGuided = guidedComplete && !sealed

  // Progress bar items (1-indexed, +1 for seal)
  const progressItems = [
    ...GUIDED_STEPS.map((g, i) => ({ label: g.label, done: i < guidedIndex, active: i === guidedIndex && !sealed })),
    { label: 'Seal + verify', done: sealed, active: guidedComplete && !sealed },
  ]

  // Advanced mode button config (original backend-driven enablement)
  const advancedButtons: { id: string; label: string; enabled: boolean }[] = s && !sealed ? [
    { id: 'break_grid',            label: ALL_STEP_LABELS.break_grid!,            enabled: s.grid === 'ONLINE' },
    { id: 'enter_island_mode',     label: ALL_STEP_LABELS.enter_island_mode!,     enabled: s.mode === 'RESILIENCE_CHECK' },
    { id: 'pause_guest_charging',  label: ALL_STEP_LABELS.pause_guest_charging!,  enabled: !s.guest_chargers.every((c) => c.status === 'HELD') },
    { id: 'protect_critical_loads',label: ALL_STEP_LABELS.protect_critical_loads!,enabled: s.mode === 'ISLAND_MODE' },
    { id: 'mint_verified_surplus', label: ALL_STEP_LABELS.mint_verified_surplus!, enabled: s.mode === 'ISLAND_MODE' || s.mode === 'GRID_CONNECTED' },
    { id: 'restore_grid',          label: ALL_STEP_LABELS.restore_grid!,          enabled: s.grid === 'OFFLINE' },
    { id: 'request_resync',        label: ALL_STEP_LABELS.request_resync!,        enabled: s.mode === 'RESYNC_PENDING' || s.mode === 'ISLAND_MODE_HELD' },
  ] : []

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-10 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-eve-green tracking-[0.3em] uppercase font-mono">
          EVE Verified Control Chain · Energy Domain
        </span>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white/90 mt-4 mb-2">
          Verified Energy Community Control Demo
        </h1>
        <p className="text-gray-400 text-base mb-4">
          Ten homes, shared battery, verified energy sharing and island-mode control.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto mb-6">
          Visual model, real verification chain. Every step runs through the EVE Verified
          Control Chain: verdict engine, hashed event chain, sealed record and verify adapter.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {MODE_BADGES.map((b) => (
            <span key={b} className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">{b}</span>
          ))}
        </div>
      </section>

      {/* Boundary */}
      <section className="px-6 max-w-3xl mx-auto mb-8">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
          <p className="text-gray-500 text-xs leading-relaxed">{BOUNDARY}</p>
        </div>
      </section>

      {/* Backend status */}
      <section className="px-6 max-w-3xl mx-auto mb-8">
        {backendStatus === 'checking' && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <p className="text-gray-400 text-sm font-mono">Checking live verification backend…</p>
          </div>
        )}
        {backendStatus === 'online' && (
          <div className="p-4 rounded-xl border border-eve-green/20 bg-eve-green/5">
            <div className="text-eve-green text-sm font-mono mb-2">Live verification backend connected</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] font-mono text-gray-400">
              <span>Chain valid: <span className="text-eve-green">{String(lastHealth?.upstream?.chain_valid)}</span></span>
              <span>Runtime: <span className="text-white/70">{lastHealth?.upstream?.mode}</span></span>
              <span>Bridge mode: <span className="text-white/70">{lastHealth?.upstream?.bridge_mode}</span></span>
              <span>Chain length: <span className="text-white/70">{lastHealth?.upstream?.chain_length}</span></span>
            </div>
          </div>
        )}
        {backendStatus === 'offline' && (
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: '#9ca3af40', background: '#9ca3af0d' }}>
            <div className="text-2xl font-mono mb-2" style={{ color: '#9ca3af' }}>UNKNOWN / OFFLINE</div>
            <p className="text-gray-500 text-sm mb-4">
              The verification backend is unreachable. This page fails closed — it never shows simulated results under a live label.
            </p>
            {lastError && <p className="text-red-400 text-xs font-mono mb-3">{lastError}</p>}
            <button onClick={retry} className="px-4 py-2 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10">
              Retry connection
            </button>
          </div>
        )}
        {checkedAt && (
          <div className="mt-3 p-3 rounded-lg bg-black/20 border border-white/5 text-[10px] font-mono text-gray-600">
            <div className="text-gray-500 mb-1">Last health check</div>
            <div>status: <span className="text-white/60">{backendStatus}</span></div>
            <div>live: <span className="text-white/60">{String(lastHealth?.live)}</span></div>
            <div>upstream.status: <span className="text-white/60">{lastHealth?.upstream?.status ?? '—'}</span></div>
            <div>chain_valid: <span className="text-white/60">{String(lastHealth?.upstream?.chain_valid)}</span></div>
            <div>checked_at: <span className="text-white/60">{checkedAt}</span></div>
          </div>
        )}
      </section>

      {/* Create session */}
      {isOnline && !session && (
        <section className="px-6 max-w-5xl mx-auto mb-8 text-center">
          <button onClick={createSession} disabled={busy}
            className="px-8 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all text-sm disabled:opacity-40">
            {busy ? 'Creating…' : 'Create session'}
          </button>
          <p className="text-gray-600 text-xs mt-3 font-mono">
            Creates a real session on the verification chain — first event is hashed immediately.
          </p>
        </section>
      )}

      {/* ── Main demo area ── */}
      {isOnline && s && (
        <section className="px-6 max-w-6xl mx-auto mb-10 grid lg:grid-cols-[1fr_360px] gap-6">

          {/* Left: visual model */}
          <div className="space-y-4">

            {/* Scenario progress */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400">Scenario progress</span>
                <span className="text-[11px] font-mono text-gray-500">{Math.min(guidedIndex, TOTAL_GUIDED)}/{TOTAL_GUIDED} steps</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {progressItems.map((p, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className={[
                      'text-[10px] font-mono px-2 py-0.5 rounded',
                      p.done ? 'text-eve-green bg-eve-green/10' :
                      p.active ? 'text-white bg-white/10 border border-white/20' :
                      'text-gray-600 bg-white/[0.02]',
                    ].join(' ')}>
                      {i + 1}. {p.label}
                    </span>
                    {i < progressItems.length - 1 && (
                      <span className="text-gray-700 text-[10px]">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid / mode / signals */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-mono px-3 py-1 rounded-full border"
                style={{ color: s.grid === 'ONLINE' ? '#00ff88' : s.grid === 'OFFLINE' ? '#ef4444' : '#f59e0b', borderColor: '#ffffff1a', background: '#ffffff08' }}>
                Grid: {s.grid}
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full border"
                style={{ color: s.mode.includes('HELD') ? '#f59e0b' : '#00d4ff', borderColor: '#ffffff1a', background: '#ffffff08' }}>
                Mode: {s.mode}
              </span>
              {s.domain_signals.map((d, i) => (
                <span key={i} className="text-[11px] font-mono px-3 py-1 rounded-full border border-eve-orange/30 text-eve-orange bg-eve-orange/5">{d}</span>
              ))}
            </div>

            {/* Homes */}
            <div className="grid grid-cols-5 gap-2">
              {s.homes.map((h) => (
                <div key={h.id} className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] text-white/80">{h.name}</div>
                  <div className="text-[10px] text-eve-green font-mono">PV {h.pv_kw}kW</div>
                  <div className="text-[10px] text-gray-500 font-mono">Load {h.load_kw}kW</div>
                  <div className="text-[9px] mt-1 font-mono" style={{ color: h.sharing ? '#00ff88' : '#9ca3af' }}>
                    {h.sharing ? 'sharing' : 'isolated'}
                  </div>
                </div>
              ))}
            </div>

            {/* Battery + chargers + ELEKTO */}
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-gray-400 mb-2">Community battery (100 kWh)</div>
                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.battery.soc_kwh}%`, background: '#00ff88' }} />
                </div>
                <div className="text-[11px] font-mono text-gray-400 mt-2">
                  SoC {s.battery.soc_kwh} kWh · Reserve {s.battery.critical_reserve_kwh} kWh{' '}
                  <span style={{ color: s.battery.reserve_protected ? '#00ff88' : '#9ca3af' }}>
                    {s.battery.reserve_protected ? 'PROTECTED' : ''}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-gray-400 mb-2">Guest chargers</div>
                <div className="flex gap-2">
                  {s.guest_chargers.map((c) => (
                    <div key={c.id} className="flex-1 p-2 rounded-lg text-center text-[10px] font-mono border"
                      style={{ color: c.status === 'HELD' ? '#f59e0b' : '#00ff88', borderColor: '#ffffff14', background: '#ffffff05' }}>
                      {c.status}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-gray-500 mt-2">
                  Critical: {s.critical_loads} · Non-critical: {s.non_critical_loads}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-gray-400 mb-2">ELEKTO minted today</div>
                <div className="text-eve-green font-mono text-lg">{s.elekto_minted_today_kwh} kWh credits</div>
                <div className="text-[10px] text-gray-600 mt-1">1 ELEKTO = 1 verified kWh within the closed-network accounting model.</div>
              </div>
            </div>

            {/* Event chain */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-gray-400 mb-3">Event chain (hashed, append-only)</div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {session!.events.map((e) => (
                  <div key={e.seq} className="flex items-baseline gap-3 text-[11px] font-mono">
                    <span className="text-gray-600 w-8">#{e.seq}</span>
                    <span className="text-white/80 flex-1">{e.type}</span>
                    <span className="text-gray-500">{short(e.hash)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: control panel */}
          <div className="space-y-3">

            {/* Mode toggle */}
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-[11px] font-mono text-gray-500">
                {advancedMode ? 'Advanced / raw mode' : 'Guided demo mode'}
              </span>
              <button onClick={() => setAdvancedMode((v) => !v)}
                className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 text-gray-400 hover:border-white/20">
                {advancedMode ? 'Switch to guided' : 'Advanced mode'}
              </button>
            </div>

            {/* ── Guided mode ── */}
            {!advancedMode && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="text-xs text-gray-400">Session <span className="font-mono text-white/60">{session!.session_id}</span></div>

                {sealed ? (
                  <div className="p-3 rounded-lg bg-eve-green/5 border border-eve-green/20 text-center">
                    <div className="text-eve-green text-sm font-mono">Session sealed</div>
                    <div className="text-gray-500 text-xs mt-1">Reset to start a new run.</div>
                  </div>
                ) : guidedComplete ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-eve-green/20 text-center">
                      <div className="text-eve-green text-xs font-mono">All steps complete — ready to seal</div>
                    </div>
                    <label className="flex items-center gap-2 px-1 py-1 text-[11px] text-gray-500 font-mono">
                      <input type="checkbox" checked={staleToggle} onChange={(e) => setStaleToggle(e.target.checked)} />
                      Simulate stale snapshot (HELD path)
                    </label>
                    <button onClick={sealAndVerify} disabled={busy}
                      className="w-full px-4 py-2 rounded-lg text-sm border bg-eve-green/10 border-eve-green/30 text-eve-green hover:bg-eve-green/20 disabled:opacity-40">
                      {busy ? 'Sealing…' : 'Seal + verify'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Narrative for next step */}
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-[11px] text-eve-green font-mono mb-1">
                        Step {guidedIndex + 1}/{TOTAL_GUIDED}: {nextGuidedStep!.label}
                      </div>
                      <div className="text-[11px] text-gray-400 leading-relaxed">
                        {nextGuidedStep!.narrative}
                      </div>
                    </div>
                    {nextGuidedStep!.stepId === 'request_resync' && (
                      <label className="flex items-center gap-2 px-1 py-1 text-[11px] text-gray-500 font-mono">
                        <input type="checkbox" checked={staleToggle} onChange={(e) => setStaleToggle(e.target.checked)} />
                        Simulate stale snapshot (HELD path)
                      </label>
                    )}
                    {nextGuidedStep!.stepId === 'mint_verified_surplus' && (
                      <label className="flex items-center gap-2 px-1 py-1 text-[11px] text-gray-500 font-mono">
                        <input type="checkbox" checked={breachToggle} onChange={(e) => setBreachToggle(e.target.checked)} />
                        Simulate battery reserve breach (HELD path)
                      </label>
                    )}
                    <button onClick={() => runStep(nextGuidedStep!.stepId)} disabled={busy}
                      className="w-full px-4 py-2 rounded-lg text-sm border bg-white/[0.03] border-eve-green/30 text-eve-green hover:bg-eve-green/10 disabled:opacity-40">
                      {busy ? 'Running…' : `→ ${nextGuidedStep!.label}`}
                    </button>
                  </div>
                )}

                <button onClick={reset} disabled={busy}
                  className="w-full px-4 py-2 rounded-lg text-sm border bg-white/[0.02] border-white/10 text-gray-500 hover:bg-white/5 disabled:opacity-30">
                  Reset
                </button>
              </div>
            )}

            {/* ── Advanced mode ── */}
            {advancedMode && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs text-gray-500 mb-1">All steps — backend-driven enablement</div>
                {advancedButtons.map((b) => (
                  <button key={b.id} onClick={() => runStep(b.id)} disabled={busy || !b.enabled || sealed}
                    className="w-full px-4 py-2 rounded-lg text-sm text-left border transition-all disabled:opacity-30 bg-white/[0.03] border-white/10 text-white/80 hover:border-eve-green/40">
                    {b.label}
                  </button>
                ))}
                <label className="flex items-center gap-2 px-1 py-1 text-[11px] text-gray-500 font-mono">
                  <input type="checkbox" checked={staleToggle} onChange={(e) => setStaleToggle(e.target.checked)} />
                  Simulate stale snapshot (on resync)
                </label>
                {sealed ? (
                  <div className="p-3 rounded-lg bg-eve-green/5 border border-eve-green/20 text-center text-eve-green text-sm font-mono">
                    Session sealed — reset to start a new run.
                  </div>
                ) : (
                  <button onClick={sealAndVerify} disabled={busy || sealed || steps.length === 0}
                    className="w-full px-4 py-2 rounded-lg text-sm border bg-eve-green/10 border-eve-green/30 text-eve-green hover:bg-eve-green/20 disabled:opacity-30">
                    Seal + verify
                  </button>
                )}
                <button onClick={reset} disabled={busy}
                  className="w-full px-4 py-2 rounded-lg text-sm border bg-white/[0.02] border-white/10 text-gray-500 hover:bg-white/5 disabled:opacity-30">
                  Reset
                </button>
              </div>
            )}

            {/* Verdict */}
            {session!.last_verdict && (
              <div className="p-4 rounded-xl border"
                style={{ borderColor: `${verdictColor(session!.last_verdict.verdict)}40`, background: `${verdictColor(session!.last_verdict.verdict)}0d` }}>
                <div className="text-xs text-gray-400 mb-1">
                  {steps.includes('request_resync') ? 'Resync verdict' : 'Execution verdict'}
                </div>
                <div className="text-xl font-mono" style={{ color: verdictColor(session!.last_verdict.verdict) }}>
                  {session!.last_verdict.verdict}
                </div>
                <div className="text-[11px] font-mono text-gray-500 mt-2">
                  {session!.last_verdict.basis.join(' · ')}
                </div>
                {session!.last_verdict.verdict === 'HELD' && s.domain_signals.includes('BATTERY_RESERVE_BREACH') && (
                  <p className="text-[11px] text-gray-400 mt-2">
                    Minting is held: the battery reserve is below the declared critical threshold.
                    Settlement eligibility is false for this session.
                  </p>
                )}
                {session!.last_verdict.verdict === 'HELD' && s.domain_signals.includes('STATE_UNVERIFIABLE') && (
                  <p className="text-[11px] text-gray-400 mt-2">
                    The grid may be restored, but resync is held because island-mode state can no longer be verified.
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-mono">{error}</div>
            )}
          </div>
        </section>
      )}

      {/* Sealed record */}
      {seal && (
        <section className="px-6 max-w-4xl mx-auto mb-12">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-xs text-gray-500">Adapter-sealed record</div>
                <div className="text-white font-mono">{seal.record.record_id}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Verify adapter</div>
                <div className="font-mono text-lg" style={{ color: verdictColor(String(seal.verify.verdict)) }}>{String(seal.verify.verdict)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Record verdict</div>
                <div className="font-mono text-lg" style={{ color: verdictColor(String(seal.record.execution_verdict)) }}>{String(seal.record.execution_verdict)}</div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-gray-500 break-all mb-4">seal_hash: {String(seal.record.seal_hash)}</div>
            <button onClick={() => setShowRaw(!showRaw)} className="px-4 py-2 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10">
              {showRaw ? 'Hide raw JSON' : 'Show raw JSON'}
            </button>
            {showRaw && (
              <pre className="mt-4 p-4 rounded-lg bg-black/40 border border-white/5 text-[10px] text-gray-400 overflow-x-auto">
                {JSON.stringify(seal, null, 2)}
              </pre>
            )}
          </div>
        </section>
      )}

      {/* Settlement note */}
      <section className="px-6 max-w-3xl mx-auto mb-16">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-gray-500 text-xs leading-relaxed">
            Optional settlement layer: ELEKTO can represent verified internal kWh credits in a closed-network accounting model.
            ELEKTO credits, if enabled, represent verified internal kWh accounting and settlement signals for a controlled community model.
            They are not presented as a public electricity sale, financial instrument, investment product or public utility billing system.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            The attested-control lineage originates in earlier critical-infrastructure patent work.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
