'use client'

// EVE Governance — proof timeline v4
// 10 steps. Steps 1–6 = SCENARIO PREMISE (illustrative, synthetic entities, no real orgs/persons).
// Steps 7–10 = LIVE from sealed record EVE-ISO42001-00004652, fetched at mount.
// On fetch fail: "verifying…" / "could not verify" — never hardcoded VALID.
// Same engine as AgvScene.
import { useEffect, useRef, useState, useCallback } from 'react'

const EVE_ID = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`
const STEP_MS = 1800

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'
const GREY = '#9ca3af'

type Phase = 'green' | 'amber' | 'red'
type Row = { k: string; v: string; c?: string }
type LiveKind = 'scope_mismatch' | 'authority' | 'owner' | 'result' | 'confirm' | 'seal' | 'verify'

interface VerifyData {
  valid: boolean
  eve_id: string
  seal: string
  chain_seal: string
  payload: {
    data: {
      case_id: string
      result: string
      trigger_basis: string[]
      required_human_confirmation: string[]
      materiality_assessed_by_eve: boolean
      is_compliance_score: boolean
      boundary_note: string
    }
  }
}
type VerifyState =
  | { status: 'loading' }
  | { status: 'ok'; d: VerifyData }
  | { status: 'error'; reason: string }

function short(h: string) { return h && h.length > 16 ? `${h.slice(0, 8)}…${h.slice(-8)}` : h }
function phaseColor(p: Phase) { return p === 'green' ? GREEN : p === 'amber' ? AMBER : RED }

interface Frame {
  // What the user reads — concrete, human language
  headline: string
  // Sub-detail shown under headline in the scene
  detail: string[]
  // What event to record (or null for eval/verify)
  event: string | null
  eventNote?: string
  phase: Phase
  // How many chain-nodes are solid (1–5)
  links: number
  // Whether the chain is visually broken at this step
  broken: boolean
  // Whether the named-human figure appears (steps 9+)
  human: boolean
  // Premise badge shown for steps 1–6
  isPremise: boolean
  // Live field kind for steps 7–10
  liveKind?: LiveKind
}

const FRAMES: Frame[] = [
  // ── SCENARIO PREMISE (steps 1–6) ─────────────────────────────────────────
  {
    headline: 'AI Risk Assessment approved.',
    detail: ['Owner: AI Governance Lead', 'Date: 2025-01-10', 'Status: APPROVED'],
    event: 'risk_assessment_approved',
    eventNote: 'scenario premise — the prior approval on record',
    phase: 'green', links: 1, broken: false, human: false, isPremise: true,
  },
  {
    headline: 'Scope expanded.',
    detail: ['New business unit added', 'Three new data sources connected', 'Original approval not updated'],
    event: 'scope_expanded',
    eventNote: 'scenario premise — system composition changes',
    phase: 'green', links: 2, broken: false, human: false, isPremise: true,
  },
  {
    headline: 'Model retrained.',
    detail: ['Version: v1.0 → v2.3', 'Training data changed', 'Decision threshold lowered'],
    event: 'model_retrained',
    eventNote: 'scenario premise — model version changes',
    phase: 'amber', links: 3, broken: false, human: false, isPremise: true,
  },
  {
    headline: 'New data source connected.',
    detail: ['Customer behavioural data added', 'Risk profile materially changed', 'No re-assessment triggered'],
    event: 'data_source_added',
    eventNote: 'scenario premise — data scope changes',
    phase: 'amber', links: 4, broken: false, human: false, isPremise: true,
  },
  {
    headline: 'Owner changed teams.',
    detail: ['AI Governance Lead: moved to new division', 'No successor named', 'Accountability unclear'],
    event: 'owner_changed_teams',
    eventNote: 'scenario premise — accountability gap opens',
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
  },
  {
    headline: 'Auditor asks: does the approval still apply?',
    detail: ['Last review: 8 months ago', 'System has changed 4 times since', 'No one can answer clearly'],
    event: null,
    eventNote: 'scenario premise — the question that cannot be answered',
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
  },
  // ── LIVE FROM RECORD (steps 7–10) ────────────────────────────────────────
  {
    headline: 'EVE detects the broken chain.',
    detail: [],
    event: 'accountability_continuity_gap',
    phase: 'red', links: 5, broken: true, human: false, isPremise: false,
    liveKind: 'scope_mismatch',
  },
  {
    headline: 'ACCOUNTABILITY_CONTINUITY_GAP',
    detail: [],
    event: null,
    eventNote: 'EVE surfaces — it does not decide',
    phase: 'red', links: 5, broken: true, human: false, isPremise: false,
    liveKind: 'result',
  },
  {
    headline: 'Human confirmation required.',
    detail: [],
    event: null,
    eventNote: 'EVE surfaces — it does not decide',
    phase: 'red', links: 5, broken: true, human: true, isPremise: false,
    liveKind: 'confirm',
  },
  {
    headline: 'Cryptographic verification.',
    detail: [],
    event: null,
    eventNote: 'cryptographic integrity check',
    phase: 'red', links: 5, broken: true, human: true, isPremise: false,
    liveKind: 'verify',
  },
]
const TOTAL = FRAMES.length

export default function GovernanceScene({ hideFullChainLink = false }: { hideFullChainLink?: boolean }) {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [started, setStarted] = useState(false)
  const [verify, setVerify] = useState<VerifyState>({ status: 'loading' })
  const reduceRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    let alive = true
    fetch(VERIFY_API, { cache: 'no-store' })
      .then(r => r.json())
      .then((j: VerifyData) => {
        if (!alive) return
        if (j?.valid === true && j?.payload?.data) setVerify({ status: 'ok', d: j })
        else setVerify({ status: 'error', reason: 'record did not verify' })
      })
      .catch(() => { if (alive) setVerify({ status: 'error', reason: 'verify backend unreachable' }) })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceRef.current) { setPlaying(false); setStarted(true) }
  }, [])

  useEffect(() => {
    if (!playing) return
    if (i >= TOTAL - 1) { setPlaying(false); return }
    timerRef.current = window.setTimeout(
      () => { setStarted(true); setI(n => Math.min(n + 1, TOTAL - 1)) },
      started ? STEP_MS : STEP_MS * 0.5,
    )
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
  }, [playing, i, started])

  const goto = useCallback((n: number) => {
    setPlaying(false); setStarted(true); setI(Math.max(0, Math.min(n, TOTAL - 1)))
  }, [])
  const togglePlay = useCallback(() => {
    setStarted(true)
    if (i >= TOTAL - 1) { setI(0); setPlaying(true); return }
    setPlaying(p => !p)
  }, [i])

  const f = FRAMES[i]!
  const isLast = i === TOTAL - 1
  const col = phaseColor(f.phase)
  const linkVisible = i >= TOTAL - 2

  // Build live rows for steps 7–10
  function liveRows(): { rows: Row[]; pending: boolean; isLive: boolean } {
    if (!f.liveKind) return { rows: [], pending: false, isLive: false }
    if (verify.status === 'loading') return { rows: [], pending: true, isLive: true }
    if (verify.status === 'error') return {
      rows: [{ k: 'verify', v: `could not verify — ${verify.reason}`, c: GREY }],
      pending: false, isLive: true,
    }
    const d = verify.d.payload.data
    const has = (s: string) => d.trigger_basis.includes(s)
    switch (f.liveKind) {
      case 'scope_mismatch':
        return {
          rows: [
            { k: 'trigger_basis', v: 'approval_scope_mismatch', c: has('approval_scope_mismatch') ? RED : GREY },
            { k: 'trigger_basis', v: 'authority_invalid_after_changes', c: has('authority_invalid_after_changes') ? RED : GREY },
            { k: 'trigger_basis', v: 'accountable_owner_unconfirmed', c: has('accountable_owner_unconfirmed') ? RED : GREY },
            { k: 'trigger_basis', v: 'last_human_review_stale', c: has('last_human_review_stale') ? RED : GREY },
            { k: 'trigger_basis', v: 'declared_authority_unconfirmed', c: has('declared_authority_unconfirmed') ? RED : GREY },
          ],
          pending: false, isLive: true,
        }
      case 'result':
        return {
          rows: [
            { k: 'result', v: d.result, c: RED },
            { k: 'is_compliance_score', v: String(d.is_compliance_score), c: GREEN },
            { k: 'materiality_assessed_by_eve', v: String(d.materiality_assessed_by_eve), c: GREEN },
          ],
          pending: false, isLive: true,
        }
      case 'confirm':
        return {
          rows: [
            ...d.required_human_confirmation.map((q, n) => ({ k: `confirm ${n + 1}`, v: q })),
            { k: 'boundary_note', v: d.boundary_note.slice(0, 80) + '…', c: GREY },
          ],
          pending: false, isLive: true,
        }
      case 'verify':
        return {
          rows: [
            { k: 'record', v: verify.d.eve_id, c: '#e5e7eb' },
            { k: 'bridge seal', v: short(verify.d.seal) },
            { k: 'verify', v: verify.d.valid ? 'VALID' : 'INVALID', c: verify.d.valid ? GREEN : RED },
          ],
          pending: false, isLive: true,
        }
      default:
        return { rows: [], pending: false, isLive: false }
    }
  }
  const { rows, pending, isLive } = liveRows()

  // Chain visual — 5 nodes, connectors, break at step 7+
  const LINK_X = [60, 160, 260, 360, 460]
  const LINK_Y = 130
  function renderChain() {
    const nodes = []
    for (let n = 0; n < 5; n++) {
      const active = n < f.links
      const isBreakNode = f.broken && n === f.links - 1
      const nc = !active ? '#1f2937' : isBreakNode ? RED : f.phase === 'amber' ? AMBER : f.phase === 'red' ? RED : GREEN
      nodes.push(
        <g key={`node-${n}`}>
          <circle cx={LINK_X[n]} cy={LINK_Y} r="16" fill="none" stroke={nc} strokeWidth="1.8"
            opacity={active ? 1 : 0.25} style={{ transition: 'stroke .5s, opacity .5s' }} />
          <circle cx={LINK_X[n]} cy={LINK_Y} r="5" fill={nc} opacity={active ? 0.9 : 0.2}
            style={{ transition: 'fill .5s' }} />
        </g>
      )
      if (n < 4) {
        const bothActive = n + 1 < f.links
        const isBreak = f.broken && n === f.links - 2
        if (isBreak) {
          nodes.push(
            <g key={`conn-${n}`}>
              <line x1={LINK_X[n] + 18} y1={LINK_Y - 4} x2={LINK_X[n] + 38} y2={LINK_Y - 10}
                stroke={RED} strokeWidth="1.8" strokeLinecap="round" />
              <line x1={LINK_X[n + 1] - 18} y1={LINK_Y + 4} x2={LINK_X[n + 1] - 38} y2={LINK_Y + 10}
                stroke={RED} strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )
        } else {
          const cc = (active && bothActive)
            ? (f.phase === 'red' ? RED : f.phase === 'amber' ? AMBER : GREEN)
            : '#1f2937'
          nodes.push(
            <line key={`conn-${n}`} x1={LINK_X[n] + 18} y1={LINK_Y} x2={LINK_X[n + 1] - 18} y2={LINK_Y}
              stroke={cc} strokeWidth="1.8" opacity={active && bothActive ? 1 : 0.2}
              style={{ transition: 'stroke .5s' }} />
          )
        }
      }
    }
    return nodes
  }

  // Built-up event log
  const builtEvents = FRAMES.slice(0, i + 1)
    .map((fr, idx) => ({ fr, idx }))
    .filter(x => x.fr.event !== null)

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>

      {/* Step counter + phase badge */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[10px] font-mono tracking-[0.16em] text-gray-500">STEP {i + 1} OF {TOTAL}</span>
        <div className="flex items-center gap-2">
          {f.isPremise && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: GREY, background: '#ffffff08', border: '1px solid #ffffff10' }}>
              Scenario premise — illustrative
            </span>
          )}
          <span className="text-[10px] font-mono tracking-[0.12em]" style={{ color: col }}>
            {f.phase === 'green' ? 'APPROVED' : f.phase === 'amber' ? 'DRIFTING' : 'GAP'}
          </span>
        </div>
      </div>

      {/* SVG scene */}
      <svg viewBox="0 0 680 220" role="img" className="block w-full"
        aria-label={`Governance step ${i + 1} of ${TOTAL}: ${f.headline}`}>
        <title>Governance proof timeline — step {i + 1} of {TOTAL}</title>

        {/* Baseline guide */}
        <line x1="40" y1={LINK_Y} x2="640" y2={LINK_Y} stroke="#0f1218" strokeWidth="1" />

        {renderChain()}

        {/* Named-human silhouette */}
        {f.human && (
          <g style={{ transition: 'opacity .5s' }}>
            <line x1="478" y1={LINK_Y} x2="530" y2={LINK_Y} stroke={RED} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="548" cy={LINK_Y - 12} r="9" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="548" y1={LINK_Y - 3} x2="548" y2={LINK_Y + 18} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="548" y1={LINK_Y + 4} x2="540" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="548" y1={LINK_Y + 4} x2="556" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="548" y1={LINK_Y + 18} x2="541" y2={LINK_Y + 28} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="548" y1={LINK_Y + 18} x2="555" y2={LINK_Y + 28} stroke="#e5e7eb" strokeWidth="1.5" />
            <text x="548" y={LINK_Y + 44} textAnchor="middle" fill="#6b7280" fontFamily="monospace" fontSize="9">
              AI Governance Lead
            </text>
          </g>
        )}

        {/* Headline text */}
        <text x="40" y="44" fill={f.phase === 'red' ? '#fca5a5' : '#e5e7eb'}
          fontFamily="sans-serif" fontSize="16" fontWeight="300">{f.headline}</text>

        {/* Detail lines */}
        {f.detail.map((line, di) => (
          <text key={di} x="40" y={66 + di * 18} fill="#6b7280"
            fontFamily="monospace" fontSize="11">{line}</text>
        ))}

        {/* Chain labels */}
        <text x="40" y="200" fill="#374151" fontFamily="monospace" fontSize="9">prior approval</text>
        <text x="470" y="200" fill="#374151" fontFamily="monospace" fontSize="9" textAnchor="end">current scope</text>
      </svg>

      {/* Event + live rows */}
      <div className="px-4 pb-3">
        <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-1">EVENT</div>
        {f.event ? (
          <div className="text-[12px] font-mono mb-3">
            <span style={{ color: f.phase === 'red' ? '#fca5a5' : '#e5e7eb' }}>{f.event}</span>
            <span className="text-gray-600"> recorded to decision chain</span>
            {f.eventNote && <span className="text-gray-600"> · {f.eventNote}</span>}
          </div>
        ) : (
          <div className="text-[12px] font-mono mb-3 text-gray-500 italic">
            {f.eventNote ?? 'evaluation — no event hash'}
          </div>
        )}

        {f.liveKind && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-[0.12em] text-gray-600">LIVE FROM VERIFY</span>
              {isLive && !pending && verify.status === 'ok' && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ color: GREEN, background: '#00ff8814' }}>
                  fetched · {EVE_ID}
                </span>
              )}
            </div>
            {pending ? (
              <div className="text-[12px] font-mono mb-2 text-gray-500 italic">verifying…</div>
            ) : (
              <div className="space-y-0.5 mb-2">
                {rows.map((d, ri) => (
                  <div key={ri} className="flex items-baseline gap-2 text-[12px] font-mono">
                    <span className="text-gray-500 shrink-0">{d.k}:</span>
                    <span style={{ color: d.c ?? '#d1d5db' }}>{d.v}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Event log */}
      {builtEvents.length > 0 && (
        <div className="px-4 pb-3">
          <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-2">
            DECISION CHAIN — recorded events ({builtEvents.length})
          </div>
          <div className="rounded-lg bg-black/20 border border-white/5 p-3 space-y-1">
            {builtEvents.map(({ fr, idx }) => (
              <div key={idx} className="flex items-baseline gap-2 text-[11px] font-mono">
                <span className="text-gray-700 w-6">#{idx + 1}</span>
                <span style={{
                  color: fr.phase === 'red' ? '#fca5a5' : fr.phase === 'amber' ? AMBER : '#d1d5db',
                  flex: 1,
                }}>
                  {fr.event}
                </span>
                <span className="text-gray-700">recorded</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="border-t border-white/10 px-4 py-3 space-y-3">
        <div className="flex items-center justify-center gap-1.5">
          {FRAMES.map((_, n) => (
            <button key={n} onClick={() => goto(n)} aria-label={`Go to step ${n + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: n === i ? 18 : 8,
                background: n === i ? col : n < i ? '#374151' : '#1f2937',
              }} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button onClick={() => goto(i - 1)} disabled={i === 0}
              className="px-3 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/[0.03] text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-colors">
              ◀
            </button>
            <button onClick={togglePlay}
              className="px-4 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/[0.03] text-gray-300 hover:bg-white/10 transition-colors">
              {isLast && !playing ? '↻ Replay' : playing ? '❚❚ Pause' : '▶ Play'}
            </button>
            <button onClick={() => goto(i + 1)} disabled={isLast}
              className="px-3 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/[0.03] text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-colors">
              ▶
            </button>
          </div>

          <div className="flex items-center gap-2 transition-opacity duration-500"
            style={{ opacity: linkVisible ? 1 : 0, pointerEvents: linkVisible ? 'auto' : 'none' }}>
            {!hideFullChainLink && (
              <a href="/solutions/tprm" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors"
                style={{ color: GREY, borderColor: '#ffffff20', background: '#ffffff08' }}>
                Governance product →
              </a>
            )}
            <a href={VERIFY_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{ color: '#fca5a5', borderColor: '#ef444466', background: '#ef44441a' }}>
              Verify record →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
