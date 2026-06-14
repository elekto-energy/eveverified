'use client'

// EVE Governance — proof timeline v6
// Story-first: human language first, EVE signal terms underneath.
// 10 steps. Steps 1–6 = SCENARIO PREMISE (illustrative, synthetic).
// Steps 7–10 = LIVE from EVE-ISO42001-00004652.
//
// Design principles (v6):
// - Steps 1–5: checkmarks in plain English. EVE signal shown as "Underlying signal:" beneath.
// - Step 6: THE FREEZE. Largest text, longest pause, nothing moves.
// - Steps 7–10: chain visually broken, EVE terms shown as the answer to step 6's question.
// - The broken link visual IS the story. Prior approval on left, current scope on right, gap between.
import { useEffect, useRef, useState, useCallback } from 'react'

const EVE_ID    = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`

const STEP_MS   = 1800
const FREEZE_MS = 4200   // step 6 — long pause, let it land

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED   = '#ef4444'
const GREY  = '#9ca3af'

type Phase    = 'green' | 'amber' | 'red'
type Row      = { k: string; v: string; c?: string }
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
  // Human-readable label shown in the event log (replaces raw event type)
  logLabel: string
  // EVE signal term shown as "Underlying signal:" beneath — only for steps 1–5
  signal?: string
  // Shown large in the SVG
  headline: string
  // Show the key EVE sentence on the GAP step
  gapSentence?: boolean
  // Sub-lines in the SVG
  detail: string[]
  // Internal event name (null = no hash)
  event: string | null
  eventNote?: string
  phase: Phase
  links: number
  broken: boolean
  human: boolean
  isPremise: boolean
  freeze?: boolean
  liveKind?: LiveKind
}

const FRAMES: Frame[] = [

  // ── SCENARIO PREMISE ──────────────────────────────────────────────────────

  {
    logLabel: '✓ Approval granted',
    signal: 'risk_assessment_approved',
    headline: 'Approval granted.',
    detail: [
      'AI Risk Assessment · Vendor Risk Assessment',
      'Owner: AI Governance Lead',
      'Approved: Jan 10 2025',
    ],
    event: 'risk_assessment_approved',
    eventNote: 'scenario premise',
    phase: 'green', links: 1, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '✓ New vendor integrated',
    signal: 'vendor_integration_recorded',
    headline: 'New vendor integrated.',
    detail: [
      'Vendor B onboarded into the assessed system.',
      'Original approval references Vendor A only.',
    ],
    event: 'vendor_integrated',
    eventNote: 'scenario premise',
    phase: 'green', links: 2, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '✓ Scope expanded',
    signal: 'approval_scope_mismatch',
    headline: 'Scope expanded.',
    detail: [
      'Three new business units added.',
      'Customer data scope materially changed.',
      'Approval not updated.',
    ],
    event: 'scope_expanded',
    eventNote: 'scenario premise',
    phase: 'amber', links: 3, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '✓ Owner moved teams',
    signal: 'accountable_owner_unconfirmed',
    headline: 'Owner moved teams.',
    detail: [
      'AI Governance Lead: new division.',
      'No successor named.',
      'Accountability unclear.',
    ],
    event: 'owner_changed_teams',
    eventNote: 'scenario premise',
    phase: 'amber', links: 4, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '✕ Approval no longer clearly applies',
    signal: 'last_human_review_stale',
    headline: 'Approval not re-reviewed.',
    detail: [
      '8 months since the last review.',
      'System has changed 4 times since approval.',
      'Approval still on file. Still marked: APPROVED.',
    ],
    event: 'review_overdue',
    eventNote: 'scenario premise',
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
  },

  {
    // THE FREEZE — no new node, no new event. The question.
    logLabel: '— Auditor asks',
    headline: 'Does the approval\nstill apply?',
    detail: [],
    event: null,
    eventNote: 'scenario premise — the question that cannot be answered',
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
    freeze: true,
  },

  // ── LIVE FROM RECORD ──────────────────────────────────────────────────────

  {
  logLabel: '✕ Nobody confirmed responsibility',
  headline: 'EVE names what broke.',
  // The key sentence — shown large in the SVG for this step
  gapSentence: true,
  detail: [],
  event: 'accountability_continuity_gap',
  eventNote: 'recorded to decision chain',
    phase: 'red', links: 5, broken: true, human: false, isPremise: false,
    liveKind: 'basis',
  },

  {
    logLabel: 'ACCOUNTABILITY_CONTINUITY_GAP',
    headline: 'ACCOUNTABILITY_\nCONTINUITY_GAP',
    detail: [],
    event: null,
    eventNote: 'EVE surfaces — it does not decide',
    phase: 'red', links: 5, broken: true, human: false, isPremise: false,
    liveKind: 'result',
  },

  {
    logLabel: 'Human confirmation required',
    headline: 'Human confirmation\nrequired.',
    detail: [],
    event: null,
    eventNote: 'EVE surfaces — it does not decide',
    phase: 'red', links: 5, broken: true, human: true, isPremise: false,
    liveKind: 'confirm',
  },

  {
    logLabel: 'Record sealed · VALID',
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
  const [i, setI]             = useState(0)
  const [playing, setPlaying] = useState(false)  // start paused; autoplay begins after mount
  const [started, setStarted] = useState(false)
  const [verify, setVerify]   = useState<VerifyState>({ status: 'loading' })
  const reduceRef = useRef(false)
  const timerRef  = useRef<number | null>(null)

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
    if (reduceRef.current) { setStarted(true); return }
    // Small delay so the first frame is visible before autoplay begins
    const t = window.setTimeout(() => setPlaying(true), 900)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (i >= TOTAL - 1) { setPlaying(false); return }
    const f  = FRAMES[i]!
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

  const f           = FRAMES[i]!
  const isLast      = i === TOTAL - 1
  const col         = phaseColor(f.phase)
  const linkVisible = i >= TOTAL - 2

  // ── Live rows ─────────────────────────────────────────────────────────────
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
            { k: 'trigger_basis', v: 'approval_scope_mismatch',        c: has('approval_scope_mismatch')        ? RED : GREY },
            { k: 'trigger_basis', v: 'authority_invalid_after_changes', c: has('authority_invalid_after_changes') ? RED : GREY },
            { k: 'trigger_basis', v: 'accountable_owner_unconfirmed',   c: has('accountable_owner_unconfirmed')   ? RED : GREY },
            { k: 'trigger_basis', v: 'declared_authority_unconfirmed',  c: has('declared_authority_unconfirmed')  ? RED : GREY },
            { k: 'trigger_basis', v: 'last_human_review_stale',         c: has('last_human_review_stale')         ? RED : GREY },
          ],
          pending: false, isLive: true,
        }
      case 'result':
        return {
          rows: [
            { k: 'result',                      v: d.result,                                 c: RED   },
            { k: 'is_compliance_score',         v: String(d.is_compliance_score),            c: GREEN },
            { k: 'materiality_assessed_by_eve', v: String(d.materiality_assessed_by_eve),    c: GREEN },
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
            { k: 'record',      v: verify.d.eve_id,                                           c: '#e5e7eb' },
            { k: 'bridge seal', v: short(verify.d.seal)                                                   },
            { k: 'chain seal',  v: short(verify.d.chain_seal)                                             },
            { k: 'verify',      v: verify.d.valid ? 'VALID' : 'INVALID', c: verify.d.valid ? GREEN : RED },
          ],
          pending: false, isLive: true,
        }
    }
  }
  const { rows, pending, isLive } = liveRows()

  // Event log — uses human logLabel, not raw event type
  const builtEvents = FRAMES.slice(0, i + 1)
    .map((fr, idx) => ({ fr, idx }))

  // ── Chain SVG ─────────────────────────────────────────────────────────────
  // Five nodes. Prior approval left, current scope right.
  // When broken: left side stays, right side has no connection. Gap is visible.
  const LINK_X: number[] = [64, 170, 276, 382, 488]
  const LINK_Y  = 162
  const isFrozen = f.freeze

  function renderChain() {
    const nodes: React.ReactNode[] = []

    for (let n = 0; n < 5; n++) {
      const active      = n < f.links
      const isBreakNode = f.broken && n === f.links - 1
      const nc = !active
        ? '#1a2030'
        : isBreakNode
          ? RED
          : f.phase === 'red'
            ? RED
            : f.phase === 'amber'
              ? AMBER
              : GREEN

      // Node ring — larger when frozen (step 6)
      const r = isFrozen ? 20 : 18
      nodes.push(
        <g key={`node-${n}`}>
          <circle cx={LINK_X[n]} cy={LINK_Y} r={r} fill="none"
            stroke={nc} strokeWidth={isFrozen ? 2.5 : 1.8}
            opacity={active ? 1 : 0.18}
            style={{ transition: 'stroke .5s, opacity .5s, r .3s' }} />
          <circle cx={LINK_X[n]} cy={LINK_Y} r="6" fill={nc}
            opacity={active ? 0.9 : 0.12}
            style={{ transition: 'fill .5s' }} />
        </g>
      )

      if (n < 4) {
        const nextActive = n + 1 < f.links
        const isBreak    = f.broken && n === f.links - 2

        if (isBreak) {
          // Broken connector — two stubs pointing away, gap in middle
          nodes.push(
            <g key={`conn-${n}`}>
              <line x1={LINK_X[n] + 20} y1={LINK_Y - 6} x2={LINK_X[n] + 46} y2={LINK_Y - 14}
                stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
              <line x1={LINK_X[n + 1] - 20} y1={LINK_Y + 6} x2={LINK_X[n + 1] - 46} y2={LINK_Y + 14}
                stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
              {/* Gap label */}
              <text
                x={(LINK_X[n] + LINK_X[n + 1]) / 2}
                y={LINK_Y - 18}
                textAnchor="middle"
                fill={RED}
                fontFamily="monospace"
                fontSize="9"
                opacity="0.8"
              >
                gap
              </text>
            </g>
          )
        } else {
          const cc = (active && nextActive)
            ? (f.phase === 'red' ? RED : f.phase === 'amber' ? AMBER : GREEN)
            : '#1a2030'
          nodes.push(
            <line key={`conn-${n}`}
              x1={LINK_X[n] + 20} y1={LINK_Y} x2={LINK_X[n + 1] - 20} y2={LINK_Y}
              stroke={isFrozen ? AMBER : cc} strokeWidth={isFrozen ? 2.5 : 2}
              opacity={active && nextActive ? 1 : 0.12}
              style={{ transition: 'stroke .5s, opacity .5s' }} />
          )
        }
      }
    }
    return nodes
  }

  // Multi-line headline (split on \n)
  const headlineLines = f.headline.split('\n')

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[10px] font-mono tracking-[0.16em] text-gray-500">
          STEP {i + 1} OF {TOTAL}
        </span>
        <div className="flex items-center gap-2">
          {f.isPremise && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded"
              style={{ color: GREY, background: '#ffffff07', border: '1px solid #ffffff0e' }}>
              Scenario premise — illustrative
            </span>
          )}
          <span className="text-[10px] font-mono tracking-[0.12em]" style={{ color: col }}>
            {f.phase === 'green' ? 'APPROVED'
              : f.freeze ? '—'
              : f.phase === 'amber' ? 'DRIFTING'
              : 'GAP'}
          </span>
        </div>
      </div>

      {/* SVG scene */}
      <svg viewBox="0 0 680 260" role="img" className="block w-full"
        aria-label={`Governance step ${i + 1} of ${TOTAL}: ${f.headline}`}>
        <title>Governance proof timeline — step {i + 1} of {TOTAL}</title>

        {/* Baseline */}
        <line x1="40" y1={LINK_Y} x2="640" y2={LINK_Y} stroke="#0d1118" strokeWidth="1" />

        {/* Prior approval label */}
        <text x="40" y={LINK_Y + 30} fill="#374151" fontFamily="monospace" fontSize="9">
          prior approval
        </text>

        {/* Current scope label — right side */}
        <text x="512" y={LINK_Y + 30} fill="#374151" fontFamily="monospace" fontSize="9"
          textAnchor="end">
          current scope
        </text>

        {renderChain()}

        {/* Named-human silhouette — steps 9–10 */}
        {f.human && (
          <g>
            <line x1="512" y1={LINK_Y} x2="558" y2={LINK_Y}
              stroke={RED} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="576" cy={LINK_Y - 16} r="10" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="576" y1={LINK_Y - 6}  x2="576" y2={LINK_Y + 18} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="576" y1={LINK_Y + 2}  x2="566" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="576" y1={LINK_Y + 2}  x2="586" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="576" y1={LINK_Y + 18} x2="568" y2={LINK_Y + 30} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="576" y1={LINK_Y + 18} x2="584" y2={LINK_Y + 30} stroke="#e5e7eb" strokeWidth="1.5" />
            <text x="576" y={LINK_Y + 46} textAnchor="middle"
              fill="#6b7280" fontFamily="monospace" fontSize="9">AI Governance Lead</text>
          </g>
        )}

        {/* GAP step key sentence */}
        {'gapSentence' in f && f.gapSentence && (
          <>
            <text x="40" y="48" fill="#9ca3af" fontFamily="sans-serif" fontSize="13" fontWeight="300">
              The approval still exists.
            </text>
            <text x="40" y="68" fill="#fca5a5" fontFamily="sans-serif" fontSize="13" fontWeight="300">
              EVE cannot confirm that it still applies.
            </text>
          </>
        )}

        {/* Headline — large on freeze, normal otherwise */}
        {headlineLines.map((line, li) => (
          <text key={li} x="40" y={('gapSentence' in f && f.gapSentence ? 96 : 28) + li * (isFrozen ? 32 : 22)}
            fill={f.phase === 'red' ? '#fca5a5' : isFrozen ? AMBER : '#e5e7eb'}
            fontFamily="sans-serif"
            fontSize={isFrozen ? 22 : f.phase === 'red' && i === 7 ? 14 : 16}
            fontWeight={isFrozen ? '300' : '300'}>
            {line}
          </text>
        ))}

        {/* Detail lines */}
        {!isFrozen && f.detail.map((line, di) => (
          <text key={di} x="40"
            y={(headlineLines.length * 22) + 36 + di * 17}
            fill="#5b6475" fontFamily="monospace" fontSize="11">{line}</text>
        ))}
      </svg>

      {/* Event row */}
      <div className="px-4 pb-2">

        {/* Signal (steps 1–5 only) */}
        {f.signal && f.isPremise && (
          <div className="mb-3">
            <span className="text-[10px] font-mono text-gray-600">Underlying signal: </span>
            <span className="text-[10px] font-mono" style={{ color: GREY }}>{f.signal}</span>
          </div>
        )}

        {/* Event note (for null-event frames) */}
        {!f.event && !f.liveKind && (
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
                  style={{ color: GREEN, background: '#00ff8812' }}>
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

      {/* Decision chain log — human labels, not raw event names */}
      <div className="px-4 pb-3">
        <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-2">
          DECISION CHAIN — what happened ({builtEvents.length})
        </div>
        <div className="rounded-lg bg-black/20 border border-white/5 p-3 space-y-1">
          {builtEvents.map(({ fr, idx }) => (
            <div key={idx} className="flex items-baseline gap-2 text-[11px] font-mono">
              <span className="text-gray-700 w-6">#{idx + 1}</span>
              <span style={{
                color: fr.phase === 'red' ? '#fca5a5'
                     : fr.phase === 'amber' ? AMBER
                     : GREEN,
                flex: 1,
              }}>
                {fr.logLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-white/10 px-4 py-3 space-y-3">
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
