'use client'

// EVE Control Chain — AGV proof timeline (v3)
// Renders the REAL backend chain. Two scenarios, each backed by a real sealed Bridge record:
//   Scenario A (ALLOWED): EVE-CTRL-AGV-00004660  — safe reroute, action_applied: true
//   Scenario B (DENIED):  EVE-CTRL-AGV-00004658  — unsafe continue, action_applied: false
//
// The event TYPES below are the stable Scenario A/B definitions (same every run — they are the
// scenario). The verdict, action_applied, mission state, record IDs, hashes and the VALID badge
// are fetched LIVE at mount from the verify endpoint for each scenario's Bridge record.
// If a fetch fails or valid!=true, the verdict/record/verify rows show "verifying…" /
// "could not verify" — never a hardcoded VALID. No per-event hashes are fabricated.
import { useEffect, useRef, useState, useCallback } from 'react'

const CHAIN_URL = '/control-chain/agv'
const STEP_MS = 1500

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'
const GREY = '#9ca3af'

type Phase = 'green' | 'amber' | 'red'
type Row = { k: string; v: string; c?: string }

interface VerifyData {
  valid: boolean
  eve_id: string
  seal: string
  chain_seal: string
  data: {
    record_id: string
    execution_verdict: string
    verdict_basis: string[]
    action_applied: boolean
    mission_mode: string
    robot_motion: string
    seal_hash: string
  }
}
type VerifyState =
  | { status: 'loading' }
  | { status: 'ok'; d: VerifyData }
  | { status: 'error'; reason: string }

function short(h: string) { return h && h.length > 16 ? `${h.slice(0, 8)}…${h.slice(-8)}` : h }
function verdictColor(v: string) {
  if (v === 'ALLOWED' || v === 'VALID') return GREEN
  if (v === 'HELD') return AMBER
  if (v === 'DENIED') return RED
  return GREY
}

// ── Scenario step = one frame in the real chain ──────────────────────────────
// `event` is the real event type recorded to the backend chain (stable per scenario).
// Visual state (phase/human/motion/x) is how we render that frame.
interface Frame {
  label: string
  event: string | null      // real event type, or null for evaluation/verify frames
  eventNote?: string
  phase: Phase
  human: boolean
  motion: boolean
  x: number
  // which live field(s) to show on this frame, if any (filled from verify at render)
  liveKind?: 'verdict' | 'mission' | 'seal' | 'verify' | 'basis'
}

interface Scenario {
  id: 'A' | 'B'
  name: string
  eveId: string
  outcome: 'ALLOWED' | 'DENIED'
  frames: Frame[]
}

const VERIFY_API = (id: string) => `https://api.eveverified.com/eve/verify/${id}`
const VERIFY_URL = (id: string) => `https://verify.eveverified.com/?id=${id}`

// Scenario B — unsafe continue → DENIED (EVE-CTRL-AGV-00004658)
const SCENARIO_B: Scenario = {
  id: 'B',
  name: 'Unsafe continue',
  eveId: 'EVE-CTRL-AGV-00004658',
  outcome: 'DENIED',
  frames: [
    { label: 'Mission started — EVE opens a session.', event: 'mission_start', phase: 'green', human: false, motion: false, x: 0 },
    { label: 'Route assigned — motion begins at full speed.', event: 'route_assigned', phase: 'green', human: false, motion: true, x: 60 },
    { label: 'Human worker detected at 2.4 m.', event: 'human_detected', eventNote: '→ HUMAN_PROXIMITY_DETECTED', phase: 'green', human: true, motion: true, x: 130 },
    { label: 'Operator requests: continue at full speed.', event: 'unsafe_action_requested', eventNote: 'intent recorded FIRST', phase: 'amber', human: true, motion: true, x: 130 },
    { label: 'EVE evaluates the governed rule.', event: null, eventNote: 'evaluation · no event hash', phase: 'amber', human: true, motion: true, x: 130, liveKind: 'basis' },
    { label: 'Unsafe continuation denied.', event: 'unsafe_action_denied', phase: 'red', human: true, motion: false, x: 130, liveKind: 'verdict' },
    { label: 'Mission held — robot stopped.', event: null, eventNote: 'state recorded with the denial', phase: 'red', human: true, motion: false, x: 130, liveKind: 'mission' },
    { label: 'The full run is sealed into one record.', event: 'seal', phase: 'red', human: true, motion: false, x: 130, liveKind: 'seal' },
    { label: 'Anyone can re-check the seal. No login.', event: null, eventNote: 'independent integrity check', phase: 'red', human: true, motion: false, x: 130, liveKind: 'verify' },
  ],
}

// Scenario A — safe reroute → ALLOWED (EVE-CTRL-AGV-00004660)
const SCENARIO_A: Scenario = {
  id: 'A',
  name: 'Safe reroute',
  eveId: 'EVE-CTRL-AGV-00004660',
  outcome: 'ALLOWED',
  frames: [
    { label: 'Mission started — EVE opens a session.', event: 'mission_start', phase: 'green', human: false, motion: false, x: 0 },
    { label: 'Route assigned — motion begins at full speed.', event: 'route_assigned', phase: 'green', human: false, motion: true, x: 50 },
    { label: 'Human worker detected at 2.4 m.', event: 'human_detected', eventNote: '→ HUMAN_PROXIMITY_DETECTED', phase: 'green', human: true, motion: true, x: 110 },
    { label: 'Speed reduced for human proximity.', event: 'speed_reduced', phase: 'amber', human: true, motion: true, x: 120 },
    { label: 'Obstacle detected in current path.', event: 'obstacle_detected', phase: 'amber', human: true, motion: false, x: 130 },
    { label: 'Reroute requested — mission held for authority check.', event: 'reroute_requested', phase: 'amber', human: true, motion: false, x: 130 },
    { label: 'Authority confirmed.', event: 'authority_checked', phase: 'amber', human: true, motion: false, x: 130 },
    { label: 'Safe reroute approved by EVE.', event: 'safe_reroute_approved', phase: 'green', human: true, motion: true, x: 150 },
    { label: 'Mission complete — all steps verified.', event: 'mission_complete', phase: 'green', human: false, motion: false, x: 190, liveKind: 'verdict' },
    { label: 'The full run is sealed into one record.', event: 'seal', phase: 'green', human: false, motion: false, x: 190, liveKind: 'seal' },
    { label: 'Anyone can re-check the seal. No login.', event: null, eventNote: 'independent integrity check', phase: 'green', human: false, motion: false, x: 190, liveKind: 'verify' },
  ],
}

const SCENARIOS: Record<'A' | 'B', Scenario> = { A: SCENARIO_A, B: SCENARIO_B }

function phaseColor(p: Phase) { return p === 'green' ? GREEN : p === 'amber' ? AMBER : RED }

export default function AgvScene() {
  const [scenarioId, setScenarioId] = useState<'A' | 'B'>('B')
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [started, setStarted] = useState(false)
  const [verifyB, setVerifyB] = useState<VerifyState>({ status: 'loading' })
  const [verifyA, setVerifyA] = useState<VerifyState>({ status: 'loading' })
  const reduceRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const scenario = SCENARIOS[scenarioId]
  const verify = scenarioId === 'B' ? verifyB : verifyA
  const TOTAL = scenario.frames.length

  // Live verify fetch for both records at mount
  useEffect(() => {
    let alive = true
    const load = (id: string, set: (s: VerifyState) => void) => {
      fetch(VERIFY_API(id), { cache: 'no-store' })
        .then((r) => r.json())
        .then((j: VerifyData) => { if (alive) set(j?.valid === true && j?.data ? { status: 'ok', d: j } : { status: 'error', reason: 'record did not verify' }) })
        .catch(() => { if (alive) set({ status: 'error', reason: 'verify backend unreachable' }) })
    }
    load(SCENARIO_B.eveId, setVerifyB)
    load(SCENARIO_A.eveId, setVerifyA)
    return () => { alive = false }
  }, [])

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceRef.current) { setPlaying(false); setStarted(true) }
  }, [])

  useEffect(() => {
    if (!playing) return
    if (i >= TOTAL - 1) { setPlaying(false); return }
    timerRef.current = window.setTimeout(() => { setStarted(true); setI((n) => Math.min(n + 1, TOTAL - 1)) }, started ? STEP_MS : STEP_MS * 0.5)
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
  }, [playing, i, started, TOTAL])

  const goto = useCallback((n: number) => { setPlaying(false); setStarted(true); setI(Math.max(0, Math.min(n, TOTAL - 1))) }, [TOTAL])
  const togglePlay = useCallback(() => {
    setStarted(true)
    if (i >= TOTAL - 1) { setI(0); setPlaying(true); return }
    setPlaying((p) => !p)
  }, [i, TOTAL])
  const switchScenario = useCallback((id: 'A' | 'B') => { setScenarioId(id); setI(0); setPlaying(true); setStarted(false) }, [])

  const f = scenario.frames[Math.min(i, TOTAL - 1)]!
  const isLast = i === TOTAL - 1
  const robotColor = phaseColor(f.phase)
  const linkVisible = i >= TOTAL - 2 // last two frames

  // Build live rows for the current frame from the scenario's verify record
  function liveRows(): { rows: Row[]; pending: boolean; isLive: boolean } {
    if (!f.liveKind) return { rows: [], pending: false, isLive: false }
    if (verify.status === 'loading') return { rows: [], pending: true, isLive: true }
    if (verify.status === 'error') return { rows: [{ k: 'verify', v: `could not verify — ${verify.reason}`, c: GREY }], pending: false, isLive: true }
    const d = verify.d
    switch (f.liveKind) {
      case 'basis':
        return { rows: [{ k: 'rule basis', v: d.data.verdict_basis[0] ?? '—', c: AMBER }], pending: false, isLive: true }
      case 'verdict':
        return {
          rows: [
            { k: 'execution_verdict', v: d.data.execution_verdict, c: verdictColor(d.data.execution_verdict) },
            { k: 'action_applied', v: String(d.data.action_applied), c: d.data.action_applied ? GREEN : RED },
          ], pending: false, isLive: true,
        }
      case 'mission':
        return { rows: [{ k: 'mission_mode', v: d.data.mission_mode, c: verdictColor(scenario.outcome) }, { k: 'robot_motion', v: d.data.robot_motion, c: GREY }], pending: false, isLive: true }
      case 'seal':
        return {
          rows: [
            { k: 'adapter record', v: d.data.record_id },
            { k: 'bridge record', v: d.eve_id, c: '#e5e7eb' },
            { k: 'adapter seal_hash', v: short(d.data.seal_hash) },
            { k: 'bridge seal', v: short(d.seal) },
            { k: 'chain seal', v: short(d.chain_seal) },
          ], pending: false, isLive: true,
        }
      case 'verify':
        return { rows: [{ k: 'verify', v: d.valid ? 'VALID' : 'INVALID', c: d.valid ? GREEN : RED }], pending: false, isLive: true }
    }
  }
  const { rows, pending, isLive } = liveRows()

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>
      {/* Scenario switch */}
      <div className="flex items-center gap-2 px-4 pt-3">
        {(['B', 'A'] as const).map((id) => {
          const sc = SCENARIOS[id]
          const active = scenarioId === id
          const col = sc.outcome === 'ALLOWED' ? GREEN : RED
          return (
            <button key={id} onClick={() => switchScenario(id)}
              className="text-[11px] font-mono px-3 py-1.5 rounded-full border transition-colors"
              style={{ color: active ? col : GREY, borderColor: active ? `${col}55` : '#ffffff14', background: active ? `${col}12` : '#ffffff05' }}>
              {sc.name} → {sc.outcome}
            </button>
          )
        })}
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-[10px] font-mono tracking-[0.16em] text-gray-500">STEP {i + 1} OF {TOTAL}</span>
        <span className="text-[10px] font-mono tracking-[0.12em]" style={{ color: robotColor }}>
          {f.phase === 'green' ? 'SAFE' : f.phase === 'amber' ? 'CAUTION' : 'DENIED'}
        </span>
      </div>

      {/* SVG scene */}
      <svg viewBox="0 0 680 240" role="img" className="block w-full" aria-label={`Scenario ${scenarioId}, step ${i + 1} of ${TOTAL}: ${f.label}`}>
        <title>AGV proof timeline — scenario {scenarioId}, step {i + 1} of {TOTAL}</title>
        <line x1="40" y1="180" x2="640" y2="180" stroke="#1f2630" strokeWidth="1" />
        <line x1="40" y1="132" x2="640" y2="132" stroke="#1f2630" strokeWidth="0.5" strokeDasharray="4 6" />

        {f.human && (
          <g>
            <line x1="250" y1="154" x2="430" y2="154" stroke={RED} strokeWidth="0.5" strokeDasharray="3 3" />
            <text x="340" y="146" textAnchor="middle" fill={RED} fontFamily="monospace" fontSize="11">2.4 m</text>
            <circle cx="445" cy="140" r="9" fill="none" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="149" x2="445" y2="172" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="156" x2="436" y2="166" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="156" x2="454" y2="166" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="172" x2="437" y2="182" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="172" x2="453" y2="182" stroke={RED} strokeWidth="1.5" />
          </g>
        )}

        <g style={{ transform: `translateX(${f.x}px)`, transition: reduceRef.current ? 'none' : 'transform .9s ease-out' }}>
          <rect x="190" y="142" width="44" height="30" rx="4" fill="#0f1620" stroke={robotColor} strokeWidth="1.4" style={{ transition: 'stroke .4s' }} />
          <rect x="198" y="149" width="12" height="8" rx="2" fill={robotColor} opacity="0.85" style={{ transition: 'fill .4s' }} />
          <circle cx="200" cy="176" r="4.5" fill="none" stroke={robotColor} strokeWidth="1.2" style={{ transition: 'stroke .4s' }} />
          <circle cx="224" cy="176" r="4.5" fill="none" stroke={robotColor} strokeWidth="1.2" style={{ transition: 'stroke .4s' }} />
          {f.motion && (
            <g>
              <line x1="176" y1="150" x2="186" y2="150" stroke={robotColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="172" y1="157" x2="184" y2="157" stroke={robotColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="176" y1="164" x2="186" y2="164" stroke={robotColor} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}
        </g>

        <text x="40" y="40" fill="#e5e7eb" fontFamily="sans-serif" fontSize="15">{f.label}</text>
      </svg>

      {/* Detail rows */}
      <div className="px-4 pb-2">
        <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-1">EVENT</div>
        {f.event ? (
          <div className="text-[12px] font-mono mb-3">
            <span style={{ color: f.phase === 'red' ? '#fca5a5' : '#e5e7eb' }}>{f.event}</span>
            <span className="text-gray-600"> recorded to control chain</span>
            {f.eventNote && <span className="text-gray-600"> · {f.eventNote}</span>}
          </div>
        ) : (
          <div className="text-[12px] font-mono mb-3 text-gray-500 italic">{f.eventNote ?? 'no event recorded'}</div>
        )}

        {f.liveKind && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-[0.12em] text-gray-600">LIVE FROM VERIFY</span>
              {isLive && !pending && verify.status === 'ok' && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ color: GREEN, background: '#00ff8814' }}>
                  fetched · {scenario.eveId}
                </span>
              )}
            </div>
            {pending ? (
              <div className="text-[12px] font-mono mb-2 text-gray-500 italic">verifying…</div>
            ) : (
              <div className="space-y-0.5 mb-2">
                {rows.map((d) => (
                  <div key={d.k} className="flex items-baseline gap-2 text-[12px] font-mono">
                    <span className="text-gray-500">{d.k}:</span>
                    <span style={{ color: d.c ?? '#d1d5db' }}>{d.v}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="border-t border-white/10 px-4 py-3 space-y-3">
        <div className="flex items-center justify-center gap-1.5">
          {scenario.frames.map((_, n) => (
            <button key={n} onClick={() => goto(n)} aria-label={`Go to step ${n + 1}`}
              className="h-2 rounded-full transition-all"
              style={{ width: n === i ? 18 : 8, background: n === i ? phaseColor(f.phase) : n < i ? '#4b5563' : '#252c38' }} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button onClick={() => goto(i - 1)} disabled={i === 0} aria-label="Previous step"
              className="px-3 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/[0.03] text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-colors">◀</button>
            <button onClick={togglePlay}
              className="px-4 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/[0.03] text-gray-300 hover:bg-white/10 transition-colors">
              {isLast && !playing ? '↻ Replay' : playing ? '❚❚ Pause' : '▶ Play'}
            </button>
            <button onClick={() => goto(i + 1)} disabled={isLast} aria-label="Next step"
              className="px-3 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/[0.03] text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-colors">▶</button>
          </div>

          <div className="flex items-center gap-2 transition-opacity duration-500" style={{ opacity: linkVisible ? 1 : 0, pointerEvents: linkVisible ? 'auto' : 'none' }}>
            <a href={CHAIN_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{ color: GREY, borderColor: '#ffffff20', background: '#ffffff08' }}>See full chain →</a>
            <a href={VERIFY_URL(scenario.eveId)} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{ color: scenario.outcome === 'ALLOWED' ? '#86efac' : '#fca5a5', borderColor: scenario.outcome === 'ALLOWED' ? '#00ff8855' : '#ef444466', background: scenario.outcome === 'ALLOWED' ? '#00ff8814' : '#ef44441a' }}>
              Verify record →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
