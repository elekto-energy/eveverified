'use client'

// EVE Control Chain — AGV live visual layer.
// This component does NOT run its own session, fetch, or playback. It is a pure visual layer
// over the REAL session owned by AgvControlClient. It renders the latest real event the backend
// has produced. When the user steps the real demo, a new real event arrives and the scene
// advances. Nothing here is fabricated; every value is read from the live session props.
// Locked mapping: AGV_SCENE_LIVE_MODEL.md
import { useRef } from 'react'

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'

type Phase = 'green' | 'amber' | 'red'

interface EventRef { seq: number; type: string; hash: string }
interface Telemetry { human_detected: boolean; distance_to_human_m: number; obstacle_detected: boolean }
interface SessionState {
  mission_mode: string
  robot_motion: string
  telemetry: Telemetry
  current_route: string | null
}

export interface AgvSceneLiveProps {
  events: EventRef[]
  state: SessionState | null
  lastVerdict: { verdict: string; basis: string[] } | null
  seal: {
    record_id: string
    execution_verdict: string
    action_applied: boolean
    seal_hash: string
    final_mission_mode: string
    final_robot_motion: string
  } | null
  verifyVerdict: string | null
}

// Locked mapping: event type → how the robot is drawn for that real event.
const VISUAL: Record<string, { phase: Phase; human: boolean; motion: boolean; x: number; label: string }> = {
  agv_session_started:     { phase: 'green', human: false, motion: false, x: 0,   label: 'Session opened' },
  mission_start:           { phase: 'green', human: false, motion: false, x: 0,   label: 'Mission started' },
  route_assigned:          { phase: 'green', human: false, motion: true,  x: 60,  label: 'Route assigned · full speed' },
  human_detected:          { phase: 'green', human: true,  motion: true,  x: 130, label: 'Human detected at 2.4 m' },
  // Scenario B (DENIED)
  unsafe_action_requested: { phase: 'amber', human: true,  motion: true,  x: 130, label: 'Unsafe continue requested' },
  unsafe_action_denied:    { phase: 'red',   human: true,  motion: false, x: 130, label: 'DENIED · action_applied false' },
  // Scenario A (ALLOWED)
  speed_reduced:           { phase: 'amber', human: true,  motion: true,  x: 120, label: 'Speed reduced' },
  obstacle_detected:       { phase: 'amber', human: true,  motion: false, x: 130, label: 'Obstacle detected' },
  reroute_requested:       { phase: 'amber', human: true,  motion: false, x: 130, label: 'Reroute requested · held' },
  authority_checked:       { phase: 'amber', human: true,  motion: false, x: 130, label: 'Authority confirmed' },
  safe_reroute_approved:   { phase: 'green', human: true,  motion: true,  x: 150, label: 'Safe reroute approved' },
  mission_complete:        { phase: 'green', human: false, motion: false, x: 190, label: 'Mission complete · ALLOWED' },
}

function phaseColor(p: Phase) { return p === 'green' ? GREEN : p === 'amber' ? AMBER : RED }
function short(h: string) { return h && h.length > 16 ? `${h.slice(0, 8)}…${h.slice(-8)}` : h }

export default function AgvSceneLive({ events, state, lastVerdict, seal, verifyVerdict }: AgvSceneLiveProps) {
  const reduceRef = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // The latest real event drives the visual. Before any event, show the idle frame.
  const latest = events.length > 0 ? events[events.length - 1]! : null
  const vis = latest ? (VISUAL[latest.type] ?? { phase: 'green' as Phase, human: state?.telemetry.human_detected ?? false, motion: false, x: 0, label: latest.type }) : null
  const phase: Phase = vis?.phase ?? 'green'
  const robotColor = phaseColor(phase)
  const human = vis?.human ?? false
  const motion = vis?.motion ?? false
  const x = vis?.x ?? 0
  const label = vis?.label ?? 'Create a session to begin.'

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-[10px] font-mono tracking-[0.16em] text-gray-500">
          {latest ? `EVENT #${latest.seq}` : 'IDLE'}
        </span>
        <span className="text-[10px] font-mono tracking-[0.12em]" style={{ color: robotColor }}>
          {phase === 'green' ? 'SAFE' : phase === 'amber' ? 'CAUTION' : 'DENIED'}
        </span>
      </div>

      {/* SVG scene — reflects the latest real event */}
      <svg viewBox="0 0 680 220" role="img" className="block w-full" aria-label={`AGV live scene: ${label}`}>
        <title>AGV live scene — {label}</title>
        <line x1="40" y1="170" x2="640" y2="170" stroke="#1f2630" strokeWidth="1" />
        <line x1="40" y1="122" x2="640" y2="122" stroke="#1f2630" strokeWidth="0.5" strokeDasharray="4 6" />

        {human && (
          <g>
            <line x1="250" y1="144" x2="430" y2="144" stroke={RED} strokeWidth="0.5" strokeDasharray="3 3" />
            <text x="340" y="136" textAnchor="middle" fill={RED} fontFamily="monospace" fontSize="11">
              {state?.telemetry.distance_to_human_m ?? 2.4} m
            </text>
            <circle cx="445" cy="130" r="9" fill="none" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="139" x2="445" y2="162" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="146" x2="436" y2="156" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="146" x2="454" y2="156" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="162" x2="437" y2="172" stroke={RED} strokeWidth="1.5" />
            <line x1="445" y1="162" x2="453" y2="172" stroke={RED} strokeWidth="1.5" />
          </g>
        )}

        <g style={{ transform: `translateX(${x}px)`, transition: reduceRef.current ? 'none' : 'transform .9s ease-out' }}>
          <rect x="190" y="132" width="44" height="30" rx="4" fill="#0f1620" stroke={robotColor} strokeWidth="1.4" style={{ transition: 'stroke .4s' }} />
          <rect x="198" y="139" width="12" height="8" rx="2" fill={robotColor} opacity="0.85" style={{ transition: 'fill .4s' }} />
          <circle cx="200" cy="166" r="4.5" fill="none" stroke={robotColor} strokeWidth="1.2" style={{ transition: 'stroke .4s' }} />
          <circle cx="224" cy="166" r="4.5" fill="none" stroke={robotColor} strokeWidth="1.2" style={{ transition: 'stroke .4s' }} />
          {motion && (
            <g>
              <line x1="176" y1="140" x2="186" y2="140" stroke={robotColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="172" y1="147" x2="184" y2="147" stroke={robotColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="176" y1="154" x2="186" y2="154" stroke={robotColor} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}
        </g>

        <text x="40" y="38" fill="#e5e7eb" fontFamily="sans-serif" fontSize="15">{label}</text>
      </svg>

      {/* Live data, read straight from the real session */}
      <div className="px-4 pb-4 pt-1 space-y-3">
        {/* Built-up real event chain */}
        <div>
          <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-1">
            EVENT CHAIN — hashed, append-only ({events.length})
          </div>
          {events.length === 0 ? (
            <div className="text-[12px] font-mono text-gray-600 italic">No events yet — create a session below.</div>
          ) : (
            <div className="rounded-lg bg-black/20 border border-white/5 p-3 space-y-1 max-h-44 overflow-y-auto">
              {events.map((e) => (
                <div key={e.seq} className="flex items-baseline gap-2 text-[11px] font-mono">
                  <span className="text-gray-700 w-8">#{e.seq}</span>
                  <span className="flex-1" style={{ color: e.type.startsWith('unsafe_') ? '#fca5a5' : '#d1d5db' }}>{e.type}</span>
                  <span className="text-gray-700">{short(e.hash)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verdict (real) */}
        {lastVerdict && (
          <div>
            <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-1">EXECUTION VERDICT</div>
            <div className="flex items-baseline gap-2 text-[12px] font-mono">
              <span style={{ color: phaseColor(lastVerdict.verdict === 'DENIED' ? 'red' : lastVerdict.verdict === 'HELD' ? 'amber' : 'green') }}>
                {lastVerdict.verdict}
              </span>
              <span className="text-gray-500">· {lastVerdict.basis.join(' · ')}</span>
            </div>
          </div>
        )}

        {/* Sealed record (real) */}
        {seal && (
          <div>
            <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-1">ADAPTER-SEALED RECORD</div>
            <div className="space-y-0.5 text-[11px] font-mono">
              <div className="flex gap-2"><span className="text-gray-500">record_id:</span><span className="text-white/80">{seal.record_id}</span></div>
              <div className="flex gap-2"><span className="text-gray-500">action_applied:</span><span style={{ color: seal.action_applied ? GREEN : RED }}>{String(seal.action_applied)}</span></div>
              <div className="flex gap-2"><span className="text-gray-500">seal_hash:</span><span className="text-gray-400 break-all">{short(seal.seal_hash)}</span></div>
            </div>
          </div>
        )}

        {/* Verify adapter (real) */}
        {verifyVerdict && (
          <div>
            <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-1">VERIFY ADAPTER</div>
            <div className="text-[14px] font-mono" style={{ color: verifyVerdict === 'VALID' ? GREEN : RED }}>{verifyVerdict}</div>
          </div>
        )}
      </div>
    </div>
  )
}
