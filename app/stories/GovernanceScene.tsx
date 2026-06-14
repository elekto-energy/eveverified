'use client'

// EVE Governance — proof timeline v5
// 10 steps. Steps 1–6 = SCENARIO PREMISE (illustrative, synthetic, no real orgs/persons).
// Steps 7–10 = LIVE from EVE-ISO42001-00004652, fetched at mount.
//
// Story arc:
//   1-5: Everything looked fine (green → amber as facts drift)
//   6:   The question that cannot be answered (freeze — double pause)
//   7:   EVE names what broke (live trigger_basis)
//   8:   ACCOUNTABILITY_CONTINUITY_GAP (live result)
//   9:   Human confirmation required (live confirmations)
//  10:   Cryptographic verification (live VALID)
//
// Honesty: steps 1–6 labelled "Scenario premise — illustrative".
//          Steps 7–10: only real fields from the record. Never hardcoded VALID.
import { useEffect, useRef, useState, useCallback } from 'react'

const EVE_ID = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`

const STEP_MS = 1800        // default ms per step
const FREEZE_MS = 3600      // step 6 "does it still apply?" — double pause

const GREEN  = '#00ff88'
const AMBER  = '#f59e0b'
const RED    = '#ef4444'
const GREY   = '#9ca3af'

type Phase = 'green' | 'amber' | 'red'
type Row    = { k: string; v: string; c?: string }
type LiveKind = 'basis' | 'result' | 'confirm' | 'verify'

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
  headline: string           // large human-readable step title
  detail: string[]           // sub-lines shown in the scene
  event: string | null       // event type logged to the chain (null = eval/verify/freeze)
  eventNote?: string
  phase: Phase
  links: number              // how many chain nodes are lit (1–5)
  broken: boolean            // whether the chain shows a visual break
  human: boolean             // whether the named-human silhouette appears
  isPremise: boolean         // badge: "Scenario premise — illustrative"
  freeze?: boolean           // if true, use FREEZE_MS instead of STEP_MS
  liveKind?: LiveKind
}

// ── FRAMES ────────────────────────────────────────────────────────────────────
const FRAMES: Frame[] = [

  // ── SCENARIO PREMISE ──────────────────────────────────────────────────────

  {
    headline: 'Approved.',
    detail: [
      'AI Risk Assessment · Vendor Risk Assessment',
      'Owner: AI Governance Lead',
      'Approved: Jan 10 2025',
      'STATUS: APPROVED',
    ],
    event: 'risk_assessment_approved',
    eventNote: 'scenario premise — prior approval on record',
    phase: 'green', links: 1, broken: false, human: false, isPremise: true,
  },

  {
    headline: 'New vendor integrated.',
    detail: [
      'Vendor B onboarded into the assessed system.',
      'Original approval references Vendor A only.',
    ],
    event: 'vendor_integrated',
    eventNote: 'scenario premise — system composition changes',
    phase: 'green', links: 2, broken: false, human: false, isPremise: true,
  },

  {
    headline: 'Scope expanded.',
    detail: [
      'Three new business units added.',
      'Customer data scope materially changed.',
      'Approval not updated.',
    ],
    event: 'scope_expanded',
    eventNote: 'scenario premise — scope changes',
    phase: 'amber', links: 3, broken: false, human: false, isPremise: true,
  },

  {
    headline: 'Owner changed teams.',
    detail: [
      'AI Governance Lead moved to a new division.',
      'No successor named.',
      'Accountability unclear.',
    ],
    event: 'owner_changed_teams',
    eventNote: 'scenario premise — accountability gap opens',
    phase: 'amber', links: 4, broken: false, human: false, isPremise: true,
  },

  {
    headline: 'Last review: 8 months ago.',
    detail: [
      'The system has changed 4 times since approval.',
      'No re-assessment has been triggered.',
      'The approval is still on file. Still marked: APPROVED.',
    ],
    event: 'review_overdue',
    eventNote: 'scenario premise — stale review',
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
  },

  {
    // THE FREEZE — no new node, no new event. The auditor's question.
    headline: 'Does the approval still apply?',
    detail: [
      '— the auditor, 6 weeks after the incident',
    ],
    event: null,
    eventNote: 'scenario premise — the question that cannot be answered',
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
    freeze: true,
  },

  // ── LIVE FROM RECORD ──────────────────────────────────────────────────────

  {
    headline: 'EVE names what broke.',
    detail: [],
    event: 'accountability_continuity_gap',
    eventNote: 'recorded to decision chain',
    phase: 'red', links: 5, broken: true, human: false, isPremise: false,
    liveKind: 'basis',
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

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function GovernanceScene({ hideFullChainLink = false }: { hideFullChainLink?: boolean }) {
  const [i, setI]           = useState(0)
  const [playing, setPlaying] = useState(true)
  const [started, setStarted] = useState(false)
  const [verify, setVerify]   = useState<VerifyState>({ status: 'loading' })
  const reduceRef = useRef(false)
  const timerRef  = useRef<number | null>(null)

  // Fetch live record once at mount
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

  // Autoplay — respects per-frame freeze duration
  useEffect(() => {
    if (!playing) return
    if (i >= TOTAL - 1) { setPlaying(false); return }
    const f = FRAMES[i]!
    const ms = started ? (f.freeze ? FREEZE_MS : STEP_MS) : STEP_MS * 0.5
    timerRef.current = window.setTimeout(
      () => { setStarted(true); setI(n => Math.min(n + 1, TOTAL - 1)) },
      ms,
    )
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
  }, [playing, i, started])

  const goto = useCallback((n: number) => {
    setPlaying(false); setStarted(true)
    setI(Math.max(0, Math.min(n, TOTAL - 1)))
  }, [])

  const togglePlay = useCallback(() => {
    setStarted(true)
    if (i >= TOTAL - 1) { setI(0); setPlaying(true); return }
    setPlaying(p => !p)
  }, [i])

  const f         = FRAMES[i]!
  const isLast    = i === TOTAL - 1
  const col       = phaseColor(f.phase)
  const linkVisible = i >= TOTAL - 2

  // ── Live rows for steps 7–10 ───────────────────────────────────────────────
  function liveRows(): { rows: Row[]; pending: boolean; isLive: boolean } {
    if (!f.liveKind) return { rows: [], pending: false, isLive: false }
    if (verify.status === 'loading') return { rows: [], pending: true, isLive: true }
    if (verify.status === 'error')   return {
      rows: [{ k: 'verify', v: `could not verify — ${verify.reason}`, c: GREY }],
      pending: false, isLive: true,
    }
    const d   = verify.d.payload.data
    const has = (s: string) => d.trigger_basis.includes(s)

    switch (f.liveKind) {
      case 'basis':
        return {
          rows: [
            { k: 'trigger_basis', v: 'approval_scope_mismatch',         c: has('approval_scope_mismatch')         ? RED : GREY },
            { k: 'trigger_basis', v: 'authority_invalid_after_changes',  c: has('authority_invalid_after_changes')  ? RED : GREY },
            { k: 'trigger_basis', v: 'accountable_owner_unconfirmed',    c: has('accountable_owner_unconfirmed')    ? RED : GREY },
            { k: 'trigger_basis', v: 'declared_authority_unconfirmed',   c: has('declared_authority_unconfirmed')   ? RED : GREY },
            { k: 'trigger_basis', v: 'last_human_review_stale',          c: has('last_human_review_stale')          ? RED : GREY },
          ],
          pending: false, isLive: true,
        }
      case 'result':
        return {
          rows: [
            { k: 'result',                    v: d.result,                                c: RED   },
            { k: 'is_compliance_score',       v: String(d.is_compliance_score),           c: GREEN },
            { k: 'materiality_assessed_by_eve', v: String(d.materiality_assessed_by_eve), c: GREEN },
          ],
          pending: false, isLive: true,
        }
      case 'confirm':
        return {
          rows: [
            ...d.required_human_confirmation.map((q, n) => ({ k: `confirm ${n + 1}`, v: q })),
            { k: 'boundary_note', v: d.boundary_note.slice(0, 90) + '…', c: GREY },
          ],
          pending: false, isLive: true,
        }
      case 'verify':
        return {
          rows: [
            { k: 'record',      v: verify.d.eve_id,                                        c: '#e5e7eb' },
            { k: 'bridge seal', v: short(verify.d.seal)                                              },
            { k: 'chain seal',  v: short(verify.d.chain_seal)                                        },
            { k: 'verify',      v: verify.d.valid ? 'VALID' : 'INVALID', c: verify.d.valid ? GREEN : RED },
          ],
          pending: false, isLive: true,
        }
    }
  }
  const { rows, pending, isLive } = liveRows()

  // Accumulated event log — only frames with a real event type
  const builtEvents = FRAMES.slice(0, i + 1)
    .map((fr, idx) => ({ fr, idx }))
    .filter(x => x.fr.event !== null)

  // ── Chain SVG ─────────────────────────────────────────────────────────────
  const LINK_X = [64, 170, 276, 382, 488]
  const LINK_Y = 148

  function renderChain() {
    const nodes: React.ReactNode[] = []
    for (let n = 0; n < 5; n++) {
      const active      = n < f.links
      const isBreakNode = f.broken && n === f.links - 1
      const nc = !active
        ? '#1a2030'
        : isBreakNode
          ? RED
          : f.phase === 'amber'
            ? AMBER
            : f.phase === 'red'
              ? RED
              : GREEN

      nodes.push(
        <g key={`node-${n}`} style={{ transition: 'opacity .6s' }}>
          <circle cx={LINK_X[n]} cy={LINK_Y} r="18" fill="none"
            stroke={nc} strokeWidth="1.8" opacity={active ? 1 : 0.2}
            style={{ transition: 'stroke .5s, opacity .5s' }} />
          <circle cx={LINK_X[n]} cy={LINK_Y} r="6" fill={nc}
            opacity={active ? 0.9 : 0.15} style={{ transition: 'fill .5s' }} />
        </g>
      )

      if (n < 4) {
        const nextActive = n + 1 < f.links
        const isBreak    = f.broken && n === f.links - 2

        if (isBreak) {
          // Snapped connector — two stubs with a visible gap
          nodes.push(
            <g key={`conn-${n}`}>
              <line x1={LINK_X[n] + 20} y1={LINK_Y - 5} x2={LINK_X[n] + 44} y2={LINK_Y - 12}
                stroke={RED} strokeWidth="2" strokeLinecap="round" />
              <line x1={LINK_X[n + 1] - 20} y1={LINK_Y + 5} x2={LINK_X[n + 1] - 44} y2={LINK_Y + 12}
                stroke={RED} strokeWidth="2" strokeLinecap="round" />
            </g>
          )
        } else {
          const cc = (active && nextActive)
            ? (f.phase === 'red' ? RED : f.phase === 'amber' ? AMBER : GREEN)
            : '#1a2030'
          nodes.push(
            <line key={`conn-${n}`}
              x1={LINK_X[n] + 20} y1={LINK_Y} x2={LINK_X[n + 1] - 20} y2={LINK_Y}
              stroke={cc} strokeWidth="2"
              opacity={active && nextActive ? 1 : 0.15}
              style={{ transition: 'stroke .5s, opacity .5s' }} />
          )
        }
      }
    }
    return nodes
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>

      {/* Step counter + badges */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[10px] font-mono tracking-[0.16em] text-gray-500">
          STEP {i + 1} OF {TOTAL}
        </span>
        <div className="flex items-center gap-2">
          {f.isPremise && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded"
              style={{ color: GREY, background: '#ffffff08', border: '1px solid #ffffff10' }}>
              Scenario premise — illustrative
            </span>
          )}
          <span className="text-[10px] font-mono tracking-[0.12em]" style={{ color: col }}>
            {f.phase === 'green' ? 'APPROVED' : f.phase === 'amber' ? f.freeze ? '— ?' : 'DRIFTING' : 'GAP'}
          </span>
        </div>
      </div>

      {/* SVG scene */}
      <svg viewBox="0 0 680 240" role="img" className="block w-full"
        aria-label={`Governance step ${i + 1} of ${TOTAL}: ${f.headline}`}>
        <title>Governance proof timeline — step {i + 1} of {TOTAL}</title>

        {/* baseline */}
        <line x1="40" y1={LINK_Y} x2="640" y2={LINK_Y} stroke="#0f1218" strokeWidth="1" />

        {renderChain()}

        {/* Named-human silhouette — steps 9–10 */}
        {f.human && (
          <g style={{ transition: 'opacity .6s' }}>
            <line x1="510" y1={LINK_Y} x2="560" y2={LINK_Y}
              stroke={RED} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="578" cy={LINK_Y - 14} r="10" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="578" y1={LINK_Y - 4}  x2="578" y2={LINK_Y + 20} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="578" y1={LINK_Y + 4}  x2="568" y2={LINK_Y + 16} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="578" y1={LINK_Y + 4}  x2="588" y2={LINK_Y + 16} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="578" y1={LINK_Y + 20} x2="570" y2={LINK_Y + 32} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="578" y1={LINK_Y + 20} x2="586" y2={LINK_Y + 32} stroke="#e5e7eb" strokeWidth="1.5" />
            <text x="578" y={LINK_Y + 48} textAnchor="middle"
              fill="#6b7280" fontFamily="monospace" fontSize="9">AI Governance Lead</text>
          </g>
        )}

        {/* Headline */}
        <text x="40" y="40"
          fill={f.phase === 'red' ? '#fca5a5' : f.freeze ? AMBER : '#e5e7eb'}
          fontFamily="sans-serif" fontSize={f.freeze ? 20 : 16} fontWeight="300">
          {f.headline}
        </text>

        {/* Detail lines */}
        {f.detail.map((line, di) => (
          <text key={di} x="40" y={64 + di * 18}
            fill={f.freeze && di === 0 ? '#6b7280' : '#6b7280'}
            fontFamily="monospace" fontSize="11">{line}</text>
        ))}

        {/* Chain labels */}
        <text x="40"  y="230" fill="#374151" fontFamily="monospace" fontSize="9">prior approval</text>
        <text x="510" y="230" fill="#374151" fontFamily="monospace" fontSize="9" textAnchor="end">current scope</text>
      </svg>

      {/* Event section */}
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
            {f.eventNote ?? 'no event recorded'}
          </div>
        )}

        {/* Live rows for steps 7–10 */}
        {f.liveKind && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-[0.12em] text-gray-600">
                LIVE FROM VERIFY
              </span>
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
                  <div key={ri} className="flex items-baseline gap-2 text-[12px] font-mono flex-wrap">
                    <span className="text-gray-500 shrink-0">{d.k}:</span>
                    <span style={{ color: d.c ?? '#d1d5db' }}>{d.v}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Event log — builds up as the scene plays */}
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
                  color: fr.phase === 'red' ? '#fca5a5'
                       : fr.phase === 'amber' ? AMBER
                       : '#d1d5db',
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
        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {FRAMES.map((_, n) => (
            <button key={n} onClick={() => goto(n)} aria-label={`Go to step ${n + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: n === i ? 18 : 8,
                background: n === i ? col : n < i ? '#374151' : '#1f2937',
              }} />
          ))}
        </div>

        {/* Playback + links */}
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
