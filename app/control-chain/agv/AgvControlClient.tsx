'use client'

// EVE Verified Control Chain — AGV Domain (ADR-002)
// Visual robot model, REAL verification chain.
// Verdicts: ALLOWED / HELD / DENIED / UNKNOWN only.
// Default scenario: B (DENIED — unsafe intent recorded, action blocked).
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AgvSceneLive from './AgvSceneLive'

// ── Backend status ────────────────────────────────────────────────────────────
type BackendStatus = 'checking' | 'online' | 'offline'
interface HealthData {
  live: boolean
  upstream?: {
    status: string
    mode: string
    chain_valid: boolean
    bridge_mode: string
    chain_length: number
  }
}

// ── Domain types ──────────────────────────────────────────────────────────────
interface AgvTelemetry {
  human_detected: boolean
  distance_to_human_m: number
  obstacle_detected: boolean
}
interface AgvState {
  mission_mode: string
  robot_motion: string
  telemetry: AgvTelemetry
  current_route: string | null
  domain_signals: string[]
  denied_action_attempted: boolean
}
interface AgvEventRef {
  seq: number
  type: string
  hash: string
  prev_hash: string
  timestamp: string
}
interface AgvSession {
  session_id: string
  state: AgvState
  steps_executed: string[]
  events: AgvEventRef[]
  last_verdict: { verdict: string; basis: string[] } | null
  sealed_record_id: string | null
}
interface DeniedResponse {
  ok: false
  action_applied: false
  requested_action: string
  execution_verdict: 'DENIED'
  verdict_basis: string[]
  state: { mission_mode: string; robot_motion: string; human_detected: boolean }
  event_recorded: boolean
  boundary_note: string
}
interface SealResponse {
  session_id: string
  record: Record<string, unknown> & {
    record_id: string
    execution_verdict: string
    action_applied: boolean
    seal_hash: string
    final_mission_mode: string
    final_robot_motion: string
  }
  verify: Record<string, unknown> & { verdict: string }
}

// ── Guided scenarios ──────────────────────────────────────────────────────────
// Scenario B (default): unsafe continue attempt → DENIED
const SCENARIO_B_STEPS = [
  { stepId: 'mission_start',           label: 'Mission start',         narrative: 'A new mission is initiated. EVE opens a session and begins recording the control-intent chain.' },
  { stepId: 'route_assigned',          label: 'Route assigned',        narrative: 'The robot is assigned Route A through Aisle 3. Motion begins at full speed.' },
  { stepId: 'human_detected',          label: 'Human detected',        narrative: 'Telemetry reports a human worker at 2.4 m. EVE records the proximity event to the chain.' },
  { stepId: 'continue_at_full_speed',  label: 'Attempt full speed',    narrative: 'The operator requests full-speed continuation despite human proximity. EVE records the unsafe intent first, then evaluates.' },
]

// Scenario A: safe reroute → ALLOWED
const SCENARIO_A_STEPS = [
  { stepId: 'mission_start',           label: 'Mission start',         narrative: 'A new mission is initiated. EVE opens a session and begins recording.' },
  { stepId: 'route_assigned',          label: 'Route assigned',        narrative: 'The robot is assigned Route A. Motion begins at full speed.' },
  { stepId: 'human_detected',          label: 'Human detected',        narrative: 'Human worker detected at 2.4 m. Speed reduction required.' },
  { stepId: 'reduce_speed',            label: 'Reduce speed',          narrative: 'Speed reduced to REDUCED_SPEED. Human proximity is being observed.' },
  { stepId: 'obstacle_detected',       label: 'Obstacle detected',     narrative: 'Obstacle detected in current path. Reroute needed.' },
  { stepId: 'request_reroute',         label: 'Request reroute',       narrative: 'Reroute requested. Mission held while EVE checks authority.' },
  { stepId: 'authority_checked',       label: 'Authority checked',     narrative: 'Authority confirmed. Safe alternate route available.' },
  { stepId: 'continue_on_safe_route',  label: 'Continue safe route',   narrative: 'Reroute approved by EVE. Robot continues on Route B at reduced speed.' },
  { stepId: 'mission_complete',        label: 'Mission complete',      narrative: 'Mission completed successfully. All steps verified. Verdict: ALLOWED.' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function verdictColor(v: string) {
  if (v === 'ALLOWED' || v === 'VALID') return '#00ff88'
  if (v === 'HELD') return '#f59e0b'
  if (v === 'DENIED') return '#ef4444'
  return '#9ca3af'
}
function short(h: string) { return h.length > 16 ? `${h.slice(0, 8)}…${h.slice(-8)}` : h }
function modeColor(mode: string) {
  if (mode === 'MISSION_COMPLETE') return '#00ff88'
  if (mode === 'MISSION_HELD') return '#ef4444'
  if (mode === 'MISSION_ACTIVE') return '#00d4ff'
  return '#9ca3af'
}
function motionColor(motion: string) {
  if (motion === 'FULL_SPEED') return '#00ff88'
  if (motion === 'REDUCED_SPEED') return '#f59e0b'
  return '#ef4444' // STOPPED
}

const BOUNDARY = 'No real robot, AGV, PLC, safety controller or warehouse system is controlled by this public demo. The warehouse robot is visual, but the EVE control-chain record, event hashes, verdict and verify-adapter output are generated through the verification chain.'

const DISCLAIMER =
  'This is not a functional safety system. This demo does not provide safety assurance. ' +
  'No certified safety controller, PLC, robot, grid system or infrastructure is operated. ' +
  'The purpose is to test control-chain evidence records: observed state, requested action, ' +
  'deterministic verdict, action-applied status, sealed record and later verification.'

const AGV_SAFETY_BOUNDARY =
  'EVE does not replace certified safety controllers, PLCs, emergency-stop systems or robot ' +
  'control firmware. Physical enforcement remains the responsibility of the control adapter ' +
  'and certified safety layer.'

const TRACK_NOTE =
  'EVE Verified / Governance Signals provides evidence trails for governed human decisions. ' +
  'EVE Control Chain is a separate experimental track for automated deterministic verdict ' +
  'records in cyber-physical workflows.'

const MODE_BADGES = [
  'Visual robot model',
  'Real verification chain',
  'Hardware attestation: pending M3',
  'Real robot control: visual_only',
  'Bridge mode: not_direct_bridge',
  'Verification chain: active',
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function AgvControlClient() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking')
  const [lastHealth, setLastHealth] = useState<HealthData | null>(null)
  const [lastError, setLastError] = useState('')
  const [checkedAt, setCheckedAt] = useState('')
  const [session, setSession] = useState<AgvSession | null>(null)
  const [deniedResponse, setDeniedResponse] = useState<DeniedResponse | null>(null)
  const [seal, setSeal] = useState<SealResponse | null>(null)
  const [scenario, setScenario] = useState<'B' | 'A'>('B')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [showRaw, setShowRaw] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // ── Health check ──────────────────────────────────────────────────────────
  useEffect(() => {
    setBackendStatus('checking')
    fetch('/api/eve/control-chain/agv/health', { cache: 'no-store' })
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
    setBusy(true); setError(''); setSeal(null); setDeniedResponse(null); setShowRaw(false)
    try {
      const res = await fetch('/api/eve/control-chain/agv/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
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
      const res = await fetch(`/api/eve/control-chain/agv/session/${session.session_id}/step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step_id: stepId }),
      })
      const json = await res.json()
      if (res.status === 503) { setBackendStatus('offline'); throw new Error('Backend OFFLINE — fail closed') }
      if (res.status === 409) {
        // DENIED — unsafe intent recorded, action blocked.
        // State update: backend has already persisted the MISSION_HELD state.
        // Reflect it in local session from the 409 response body.
        const denied = json as DeniedResponse
        setDeniedResponse(denied)
        setSession((prev) => prev ? {
          ...prev,
          state: {
            ...prev.state,
            mission_mode: denied.state.mission_mode,
            robot_motion: denied.state.robot_motion,
            telemetry: { ...prev.state.telemetry, human_detected: denied.state.human_detected },
            denied_action_attempted: true,
          },
          last_verdict: { verdict: denied.execution_verdict, basis: denied.verdict_basis },
          steps_executed: [...prev.steps_executed, stepId],
        } : prev)
        return
      }
      if (!res.ok) throw new Error((json as { error?: string })?.error ?? `HTTP ${res.status}`)
      setSession(json as AgvSession)
    } catch (e) { setError(e instanceof Error ? e.message : 'Unknown error') }
    finally { setBusy(false) }
  }

  async function sealAndVerify() {
    if (!session) return
    setBusy(true); setError('')
    try {
      const res = await fetch(`/api/eve/control-chain/agv/session/${session.session_id}/seal`, { method: 'POST' })
      const json = await res.json()
      if (res.status === 503) { setBackendStatus('offline'); throw new Error('Backend OFFLINE — fail closed') }
      if (!res.ok) throw new Error((json as { error?: string })?.error ?? `HTTP ${res.status}`)
      setSeal(json as SealResponse)
      setSession((prev) => prev ? { ...prev, sealed_record_id: (json as SealResponse).record.record_id } : prev)
    } catch (e) { setError(e instanceof Error ? e.message : 'Unknown error') }
    finally { setBusy(false) }
  }

  function reset() {
    setSession(null); setSeal(null); setDeniedResponse(null); setError(''); setShowRaw(false)
    retry()
  }

  // ── Derived state ──────────────────────────────────────────────────────────
  const steps = session?.steps_executed ?? []
  const sealed = Boolean(session?.sealed_record_id) || Boolean(seal)
  const isOnline = backendStatus === 'online'
  const currentScenarioSteps = scenario === 'B' ? SCENARIO_B_STEPS : SCENARIO_A_STEPS
  const guidedIndex = steps.filter((st) => currentScenarioSteps.some((g) => g.stepId === st)).length
  const guidedComplete = guidedIndex >= currentScenarioSteps.length
  const nextStep = guidedComplete ? null : currentScenarioSteps[guidedIndex]!

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-10 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-eve-green tracking-[0.3em] uppercase font-mono">
          EVE Control Chain · AGV Domain
        </span>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white/90 mt-4 mb-2">
          Verified autonomous warehouse robot control-chain demo.
        </h1>
        <p className="text-gray-400 text-base mb-4">
          Visual robot model, real verification chain. Every critical control intent runs through
          the EVE Control Chain: event chain, deterministic verdict, sealed record and
          verify adapter.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {MODE_BADGES.map((b) => (
            <span key={b} className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">{b}</span>
          ))}
        </div>
      </section>

      {/* How to read this chain — collapsible reading guide */}
      <section className="px-6 max-w-3xl mx-auto mb-8">
        <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
          <button
            onClick={() => setShowGuide((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-white/[0.02] transition-colors"
            aria-expanded={showGuide}
          >
            <span className="text-sm text-white/80">How to read this chain</span>
            <span className="text-gray-500 text-xs font-mono">{showGuide ? '−' : '+'}</span>
          </button>
          {showGuide && (
            <div className="px-5 pb-5 pt-1 border-t border-white/5">
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                Every panel below is one link in a single proof chain. Read them top to bottom:
                each step is observed, recorded, evaluated, and sealed — so the whole decision can be
                re-checked later by anyone, with no login.
              </p>
              <ol className="space-y-2">
                {[
                  ['1', 'Observe state', 'Robot state + Telemetry — what the sensors report (human, distance, obstacle).'],
                  ['2', 'Record event', 'Event chain — each observation is hashed and appended, in order.'],
                  ['3', 'Evaluate rule', 'The deterministic rule fires: speed reduction is mandatory when a human is present.'],
                  ['4', 'Produce verdict', 'Execution verdict — ALLOWED / HELD / DENIED. Here: DENIED.'],
                  ['5', 'Apply adapter result', 'action_applied: false — EVE records and denies; it does not actuate the robot.'],
                  ['6', 'Seal record', 'Adapter-sealed record — the full run is hash-sealed into one record ID.'],
                  ['7', 'Verify record', 'Verify adapter: VALID — proof the sealed record is unchanged since it was sealed.'],
                ].map(([n, title, desc]) => (
                  <li key={n} className="flex gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green text-[10px] font-mono flex items-center justify-center mt-0.5">{n}</span>
                    <div>
                      <span className="text-white/80 text-xs font-mono">{title}</span>
                      <span className="text-gray-500 text-xs"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-gray-600 text-[11px] leading-relaxed mt-4 border-t border-white/5 pt-3">
                The same shape — observe → record → evaluate → verdict → seal → verify — is what every
                EVE track shares, whether the verdict is DENIED (AGV), HELD (Energy), or a governance GAP.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Visual proof layer — reflects the REAL live session, event by event */}
      <section className="px-6 max-w-3xl mx-auto mb-8">
        <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-mono mb-3">
          Watch the proof chain
        </div>
        <AgvSceneLive
          events={session?.events ?? []}
          state={session?.state ?? null}
          lastVerdict={session?.last_verdict ?? null}
          seal={seal ? {
            record_id: seal.record.record_id,
            execution_verdict: seal.record.execution_verdict,
            action_applied: seal.record.action_applied,
            seal_hash: seal.record.seal_hash,
            final_mission_mode: seal.record.final_mission_mode,
            final_robot_motion: seal.record.final_robot_motion,
          } : null}
          verifyVerdict={seal?.verify.verdict ?? null}
        />
      </section>

      {/* Boundary + safety disclaimer */}
      <section className="px-6 max-w-3xl mx-auto mb-8 space-y-3">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-eve-orange/25">
          <p className="text-eve-orange text-xs font-mono mb-2">Not a functional safety system</p>
          <p className="text-gray-400 text-xs leading-relaxed">{DISCLAIMER}</p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
          <p className="text-gray-500 text-xs leading-relaxed">{AGV_SAFETY_BOUNDARY}</p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
          <p className="text-gray-500 text-xs leading-relaxed">{BOUNDARY}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 text-center">
          <p className="text-gray-600 text-[11px] leading-relaxed">{TRACK_NOTE}</p>
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
              <span>Real robot control: <span className="text-white/70">visual_only</span></span>
              <span>Hardware attestation: <span className="text-white/70">pending M3</span></span>
              <span>Bridge mode: <span className="text-white/70">{lastHealth?.upstream?.bridge_mode}</span></span>
              <span>Verification chain: <span className="text-eve-green">active</span></span>
            </div>
          </div>
        )}
        {backendStatus === 'offline' && (
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: '#9ca3af40', background: '#9ca3af0d' }}>
            <div className="text-2xl font-mono mb-2" style={{ color: '#9ca3af' }}>UNKNOWN / OFFLINE</div>
            <p className="text-gray-500 text-sm mb-4">
              The verification backend is unreachable. This page fails closed — it never shows
              simulated results under a live label.
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

      {/* Scenario selector + Create session */}
      {isOnline && !session && (
        <section id="live-chain" className="px-6 max-w-3xl mx-auto mb-8 scroll-mt-24">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className="text-xs text-gray-400">Select scenario</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setScenario('B')}
                className={`p-3 rounded-lg border text-left transition-all ${scenario === 'B' ? 'border-eve-green/40 bg-eve-green/5' : 'border-white/10 bg-white/[0.02]'}`}
              >
                <div className="text-xs font-mono mb-1" style={{ color: scenario === 'B' ? '#00ff88' : '#9ca3af' }}>
                  Scenario B — default
                </div>
                <div className="text-[11px] text-gray-400">
                  Unsafe continue attempt
                </div>
                <div className="text-[11px] font-mono mt-1" style={{ color: '#ef4444' }}>→ DENIED</div>
              </button>
              <button
                onClick={() => setScenario('A')}
                className={`p-3 rounded-lg border text-left transition-all ${scenario === 'A' ? 'border-eve-green/40 bg-eve-green/5' : 'border-white/10 bg-white/[0.02]'}`}
              >
                <div className="text-xs font-mono mb-1" style={{ color: scenario === 'A' ? '#00ff88' : '#9ca3af' }}>
                  Scenario A
                </div>
                <div className="text-[11px] text-gray-400">
                  Safe reroute happy path
                </div>
                <div className="text-[11px] font-mono mt-1" style={{ color: '#00ff88' }}>→ ALLOWED</div>
              </button>
            </div>
            <div className="text-center pt-2">
              <button onClick={createSession} disabled={busy}
                className="px-8 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all text-sm disabled:opacity-40">
                {busy ? 'Creating…' : 'Create session'}
              </button>
              <p className="text-gray-600 text-xs mt-2 font-mono">
                Creates a real session on the verification chain — first event hashed immediately.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Main demo area */}
      {isOnline && session && (
        <section id="live-chain" className="px-6 max-w-6xl mx-auto mb-10 grid lg:grid-cols-[1fr_360px] gap-6 scroll-mt-24">

          {/* Left: robot state */}
          <div className="space-y-4">

            {/* Robot status panel */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-gray-400 mb-3">Robot state</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">Mission mode</div>
                  <div className="text-xs font-mono" style={{ color: modeColor(session.state.mission_mode) }}>
                    {session.state.mission_mode}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">Robot motion</div>
                  <div className="text-xs font-mono" style={{ color: motionColor(session.state.robot_motion) }}>
                    {session.state.robot_motion}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">Route</div>
                  <div className="text-xs font-mono text-white/60">
                    {session.state.current_route ?? '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-gray-400 mb-3">Telemetry (declared · pending M3)</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] text-gray-500 mb-1">Human detected</div>
                  <div className="text-sm font-mono" style={{ color: session.state.telemetry.human_detected ? '#ef4444' : '#00ff88' }}>
                    {String(session.state.telemetry.human_detected)}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] text-gray-500 mb-1">Distance (m)</div>
                  <div className="text-sm font-mono text-white/70">
                    {session.state.telemetry.distance_to_human_m}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] text-gray-500 mb-1">Obstacle</div>
                  <div className="text-sm font-mono" style={{ color: session.state.telemetry.obstacle_detected ? '#f59e0b' : '#00ff88' }}>
                    {String(session.state.telemetry.obstacle_detected)}
                  </div>
                </div>
              </div>
              {session.state.domain_signals.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {session.state.domain_signals.map((d, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded border border-eve-orange/30 text-eve-orange bg-eve-orange/5">{d}</span>
                  ))}
                </div>
              )}
            </div>

            {/* DENIED panel — ADR-002 Scenario B */}
            {deniedResponse && (
              <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5">
                <div className="text-xs text-gray-400 mb-2">Unsafe action recorded + denied</div>
                <div className="grid grid-cols-2 gap-3 text-[11px] font-mono mb-3">
                  <div>
                    <span className="text-gray-500">Execution verdict: </span>
                    <span style={{ color: verdictColor(deniedResponse.execution_verdict) }}>{deniedResponse.execution_verdict}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Action applied: </span>
                    <span className="text-red-400">false</span>
                  </div>
                  <div>
                    <span className="text-gray-500">HTTP result: </span>
                    <span className="text-red-400">409 Conflict</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Event recorded: </span>
                    <span className="text-eve-green">true</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-gray-500 mb-2">
                  basis: {deniedResponse.verdict_basis.join(' · ')}
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed border-t border-white/5 pt-2 mt-2">
                  {deniedResponse.boundary_note}
                </p>
              </div>
            )}

            {/* Event chain */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-gray-400 mb-3">Event chain (hashed, append-only)</div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {session.events.map((e) => (
                  <div key={e.seq} className="flex items-baseline gap-3 text-[11px] font-mono">
                    <span className="text-gray-600 w-8">#{e.seq}</span>
                    <span className={`flex-1 ${e.type === 'unsafe_action_requested' ? 'text-red-400' : e.type === 'unsafe_action_denied' ? 'text-red-300' : 'text-white/80'}`}>
                      {e.type}
                    </span>
                    <span className="text-gray-500">{short(e.hash)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: control panel */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="text-xs text-gray-400">
                Scenario {scenario} · session <span className="font-mono text-white/60">{session.session_id}</span>
              </div>

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
                  <button onClick={sealAndVerify} disabled={busy}
                    className="w-full px-4 py-2 rounded-lg text-sm border bg-eve-green/10 border-eve-green/30 text-eve-green hover:bg-eve-green/20 disabled:opacity-40">
                    {busy ? 'Sealing…' : 'Seal + verify'}
                  </button>
                </div>
              ) : nextStep ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="text-[11px] text-eve-green font-mono mb-1">
                      Step {guidedIndex + 1}/{currentScenarioSteps.length}: {nextStep.label}
                    </div>
                    <div className="text-[11px] text-gray-400 leading-relaxed">
                      {nextStep.narrative}
                    </div>
                    {nextStep.stepId === 'continue_at_full_speed' && (
                      <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20 text-[10px] text-red-300 font-mono">
                        EVE will record the unsafe intent FIRST, then return DENIED.
                        action_applied will be false. HTTP 409.
                      </div>
                    )}
                  </div>
                  <button onClick={() => runStep(nextStep.stepId)} disabled={busy}
                    className={`w-full px-4 py-2 rounded-lg text-sm border transition-all disabled:opacity-40 ${nextStep.stepId === 'continue_at_full_speed' ? 'bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20' : 'bg-white/[0.03] border-eve-green/30 text-eve-green hover:bg-eve-green/10'}`}>
                    {busy ? 'Running…' : `→ ${nextStep.label}`}
                  </button>
                </div>
              ) : null}

              <button onClick={reset} disabled={busy}
                className="w-full px-4 py-2 rounded-lg text-sm border bg-white/[0.02] border-white/10 text-gray-500 hover:bg-white/5 disabled:opacity-30">
                Reset
              </button>
            </div>

            {/* Verdict panel */}
            {session.last_verdict && (
              <div className="p-4 rounded-xl border"
                style={{ borderColor: `${verdictColor(session.last_verdict.verdict)}40`, background: `${verdictColor(session.last_verdict.verdict)}0d` }}>
                <div className="text-xs text-gray-400 mb-1">Execution verdict</div>
                <div className="text-xl font-mono" style={{ color: verdictColor(session.last_verdict.verdict) }}>
                  {session.last_verdict.verdict}
                </div>
                <div className="text-[11px] font-mono text-gray-500 mt-2">
                  {session.last_verdict.basis.join(' · ')}
                </div>
                {session.last_verdict.verdict === 'DENIED' && (
                  <p className="text-[11px] text-gray-400 mt-2">
                    EVE does not operate the robot. The control adapter must enforce the DENIED verdict.
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
                <div className="font-mono text-lg" style={{ color: verdictColor(seal.verify.verdict) }}>{seal.verify.verdict}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Record verdict</div>
                <div className="font-mono text-lg" style={{ color: verdictColor(seal.record.execution_verdict) }}>{seal.record.execution_verdict}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Action applied</div>
                <div className="font-mono text-lg" style={{ color: seal.record.action_applied ? '#00ff88' : '#ef4444' }}>
                  {String(seal.record.action_applied)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-500 mb-4">
              <div>final_mission_mode: <span className="text-white/60">{seal.record.final_mission_mode}</span></div>
              <div>final_robot_motion: <span className="text-white/60">{seal.record.final_robot_motion}</span></div>
            </div>
            <div className="text-[11px] font-mono text-gray-500 break-all mb-4">
              seal_hash: {seal.record.seal_hash}
            </div>
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

      {/* Boundary footer */}
      <section className="px-6 max-w-3xl mx-auto mb-16">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-gray-500 text-xs leading-relaxed">
            EVE Control Chain — AGV domain. The robot is visual; the evidence chain is real.
            Every control intent is recorded, evaluated by deterministic rules, and sealed with a
            cryptographic proof before the result is returned. The control adapter or certified safety
            layer must enforce the physical stop — EVE records and verifies, it does not actuate.
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
