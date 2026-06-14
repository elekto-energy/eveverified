'use client'

// EVE Governance — proof timeline v9
// 12 steps. Steps 1–9 = SCENARIO PREMISE (illustrative, synthetic).
// Steps 10–12 = LIVE from EVE-ISO42001-00004652.
//
// Dramaturgy:
//   1–5:  The chain builds. Everything looks fine.
//   6:    THE FREEZE. Auditor asks. Nobody knows.
//   7–9:  Three unanswered questions. Each one lands alone. UNKNOWN / NO.
//   10:   ACCOUNTABILITY_CONTINUITY_GAP — the conclusion, not the opening.
//   11:   Human confirmation required (live).
//   12:   Cryptographic verification (live).
import { useEffect, useRef, useState, useCallback } from 'react'

const EVE_ID     = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`

const STEP_MS   = 1800
const FREEZE_MS = 4500
const UNKNOWN_MS = 2800  // pause on each UNKNOWN question

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED   = '#ef4444'
const GREY  = '#9ca3af'

type Phase    = 'green' | 'amber' | 'red'
type Row      = { k: string; v: string; c?: string }
type LiveKind = 'gap' | 'confirm' | 'verify'

interface VerifyData {
  valid: boolean
  eve_id: string
  seal: string
  chain_seal: string
  payload: {
    data: {
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

function short(h: string) { return h && h.length > 16 ? `${h.slice(0, 8)}...${h.slice(-8)}` : h }
function phaseColor(p: Phase) { return p === 'green' ? GREEN : p === 'amber' ? AMBER : RED }

interface Frame {
  logLabel: string
  signal?: string           // shown as "Underlying signal:" on steps 1-5
  headline: string          // shown in SVG, split on \n
  subtext?: string          // large answer text (UNKNOWN / NO) shown below headline
  subtextColor?: string
  detail: string[]
  event: string | null
  phase: Phase
  links: number
  broken: boolean
  human: boolean
  isPremise: boolean
  isConsequence?: boolean   // steps 7-9: scenario consequence, not live data
  hideFromLog?: boolean     // step 6: not numbered in the log
  freeze?: boolean          // step 6: FREEZE_MS
  unknown?: boolean         // steps 7-9: UNKNOWN_MS
  liveKind?: LiveKind
}

const FRAMES: Frame[] = [

  // ── SCENARIO PREMISE ──────────────────────────────────────────────────────

  {
    logLabel: '✓ AI Risk Assessment approved',
    signal: 'risk_assessment_approved',
    headline: 'AI Risk Assessment approved.',
    detail: ['Owner: AI Governance Lead', 'Approved: Jan 10 2025', 'Scope: Vendor A · one business unit'],
    event: 'risk_assessment_approved',
    phase: 'green', links: 1, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '✓ Vendor received production access',
    signal: 'vendor_integration_recorded',
    headline: 'Vendor received production access.',
    detail: ['Vendor B granted access to production environment.', 'Original approval references Vendor A only.'],
    event: 'vendor_integrated',
    phase: 'green', links: 2, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '✓ Model retrained',
    signal: 'approval_scope_mismatch',
    headline: 'Model retrained.',
    detail: ['Version: v1.0 -> v2.3', 'Training data and decision threshold changed.', 'No re-assessment triggered.'],
    event: 'model_retrained',
    phase: 'amber', links: 3, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '✓ New data source connected',
    signal: 'accountable_owner_unconfirmed',
    headline: 'New data source connected.',
    detail: ['Customer behavioural data added.', 'Risk profile materially changed.', 'AI Governance Lead: moved to new division.'],
    event: 'data_source_added',
    phase: 'amber', links: 4, broken: false, human: false, isPremise: true,
  },

  {
    logLabel: '⚠ No review performed',
    signal: 'last_human_review_stale',
    headline: 'No review performed.',
    detail: ['8 months since the original approval.', 'System has changed 4 times since.', 'Approval still on file. Still marked: APPROVED.'],
    event: 'review_overdue',
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
  },

  {
    // THE FREEZE — auditor's question + "Nobody knows."
    logLabel: '',
    headline: 'Does the approval\nstill apply?',
    subtext: 'Nobody knows.',
    subtextColor: AMBER,
    detail: [],
    event: null,
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
    freeze: true, hideFromLog: true,
  },

  {
    // Q1 — alone, large, no chain movement
    logLabel: '— Who owns the next decision?',
    headline: 'Who owns the\nnext decision?',
    subtext: 'UNKNOWN',
    subtextColor: RED,
    detail: [],
    event: null,
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
    unknown: true, isConsequence: true,
  },

  {
    // Q2
    logLabel: '— Does the approval still cover what is running?',
    headline: 'Does the approval still\ncover what is running?',
    subtext: 'UNKNOWN',
    subtextColor: RED,
    detail: [],
    event: null,
    phase: 'amber', links: 5, broken: false, human: false, isPremise: true,
    unknown: true, isConsequence: true,
  },

  {
    // Q3
    logLabel: '— Can anyone demonstrate the chain is intact?',
    headline: 'Can anyone demonstrate\nthe chain is intact?',
    subtext: 'NO',
    subtextColor: RED,
    detail: [],
    event: null,
    phase: 'red', links: 5, broken: true, human: false, isPremise: true,
    unknown: true, isConsequence: true,
  },

  // ── LIVE FROM RECORD ──────────────────────────────────────────────────────

  {
    logLabel: 'ACCOUNTABILITY_CONTINUITY_GAP',
    headline: 'ACCOUNTABILITY_\nCONTINUITY_GAP',
    detail: [],
    event: 'accountability_continuity_gap',
    phase: 'red', links: 5, broken: true, human: false, isPremise: false,
    liveKind: 'gap',
  },

  {
    logLabel: 'Human confirmation required',
    headline: 'Human confirmation\nrequired.',
    detail: [],
    event: null,
    phase: 'red', links: 5, broken: true, human: true, isPremise: false,
    liveKind: 'confirm',
  },

  {
    logLabel: 'Record sealed · VALID',
    headline: 'Cryptographic verification.',
    detail: [],
    event: null,
    phase: 'red', links: 5, broken: true, human: true, isPremise: false,
    liveKind: 'verify',
  },
]

const TOTAL = FRAMES.length

export default function GovernanceScene({ hideFullChainLink = false }: { hideFullChainLink?: boolean }) {
  const [i, setI]             = useState(0)
  const [playing, setPlaying] = useState(false)
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
    const t = window.setTimeout(() => setPlaying(true), 900)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (i >= TOTAL - 1) { setPlaying(false); return }
    const f  = FRAMES[i]!
    const ms = started
      ? f.freeze ? FREEZE_MS : f.unknown ? UNKNOWN_MS : STEP_MS
      : STEP_MS * 0.5
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
  const isFrozen    = Boolean(f.freeze)
  const isUnknown   = Boolean(f.unknown)
  const isBig       = isFrozen || isUnknown  // big text treatment

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
      case 'gap':
        return {
          rows: [
            { k: 'result', v: d.result, c: RED },
            { k: 'trigger_basis', v: 'approval_scope_mismatch',        c: has('approval_scope_mismatch')        ? RED : GREY },
            { k: 'trigger_basis', v: 'authority_invalid_after_changes', c: has('authority_invalid_after_changes') ? RED : GREY },
            { k: 'trigger_basis', v: 'accountable_owner_unconfirmed',   c: has('accountable_owner_unconfirmed')   ? RED : GREY },
            { k: 'trigger_basis', v: 'declared_authority_unconfirmed',  c: has('declared_authority_unconfirmed')  ? RED : GREY },
            { k: 'trigger_basis', v: 'last_human_review_stale',         c: has('last_human_review_stale')         ? RED : GREY },
            { k: 'is_compliance_score',         v: String(d.is_compliance_score),         c: GREEN },
            { k: 'materiality_assessed_by_eve', v: String(d.materiality_assessed_by_eve), c: GREEN },
          ],
          pending: false, isLive: true,
        }
      case 'confirm':
        return {
          rows: [
            ...d.required_human_confirmation.map((q, n) => ({ k: `confirm ${n + 1}`, v: q })),
            { k: 'boundary_note', v: d.boundary_note.slice(0, 90) + '...', c: GREY },
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

  const builtEvents = FRAMES.slice(0, i + 1)
    .map((fr, idx) => ({ fr, idx }))
    .filter(x => !x.fr.hideFromLog && x.fr.logLabel)

  // Chain SVG
  const LINK_X: number[] = [64, 170, 276, 382, 488]
  const LINK_Y = 170

  function renderChain() {
    const nodes: React.ReactNode[] = []
    for (let n = 0; n < 5; n++) {
      const active      = n < f.links
      const isBreakNode = f.broken && n === f.links - 1
      const nc = !active ? '#1a2030'
        : isBreakNode ? RED
        : f.phase === 'red' ? RED
        : f.phase === 'amber' ? AMBER
        : GREEN
      const r = isBig ? 20 : 18
      nodes.push(
        <g key={`node-${n}`}>
          <circle cx={LINK_X[n]} cy={LINK_Y} r={r} fill="none"
            stroke={nc} strokeWidth={isBig ? 2.5 : 1.8}
            opacity={active ? 1 : 0.18}
            style={{ transition: 'stroke .5s, opacity .5s' }} />
          <circle cx={LINK_X[n]} cy={LINK_Y} r="6" fill={nc}
            opacity={active ? 0.9 : 0.12}
            style={{ transition: 'fill .5s' }} />
        </g>
      )
      if (n < 4) {
        const nextActive = n + 1 < f.links
        const isBreak    = f.broken && n === f.links - 2
        if (isBreak) {
          nodes.push(
            <g key={`conn-${n}`}>
              <line x1={LINK_X[n] + 20} y1={LINK_Y - 6}  x2={LINK_X[n] + 46}      y2={LINK_Y - 14}
                stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
              <line x1={LINK_X[n+1] - 20} y1={LINK_Y + 6} x2={LINK_X[n+1] - 46}   y2={LINK_Y + 14}
                stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
              <text x={(LINK_X[n] + LINK_X[n+1]) / 2} y={LINK_Y - 20}
                textAnchor="middle" fill={RED} fontFamily="monospace" fontSize="9" opacity="0.9">gap</text>
            </g>
          )
        } else {
          const cc = (active && nextActive)
            ? (f.phase === 'red' ? RED : f.phase === 'amber' ? AMBER : GREEN)
            : '#1a2030'
          nodes.push(
            <line key={`conn-${n}`}
              x1={LINK_X[n] + 20} y1={LINK_Y} x2={LINK_X[n+1] - 20} y2={LINK_Y}
              stroke={isBig ? AMBER : cc} strokeWidth={isBig ? 2.5 : 2}
              opacity={active && nextActive ? 1 : 0.12}
              style={{ transition: 'stroke .5s, opacity .5s' }} />
          )
        }
      }
    }
    return nodes
  }

  const headlineLines = f.headline.split('\n')

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[10px] font-mono tracking-[0.16em] text-gray-500">
          STEP {i + 1} OF {TOTAL}
        </span>
        <div className="flex items-center gap-2">
          {f.isPremise && !f.isConsequence && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded"
              style={{ color: GREY, background: '#ffffff07', border: '1px solid #ffffff0e' }}>
              Scenario premise — illustrative
            </span>
          )}
          {f.isConsequence && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded"
              style={{ color: AMBER, background: '#f59e0b08', border: '1px solid #f59e0b20' }}>
              Scenario consequence — illustrative
            </span>
          )}
          <span className="text-[10px] font-mono tracking-[0.12em]" style={{ color: col }}>
            {isFrozen ? '?' : isUnknown ? 'UNKNOWN' : f.phase === 'green' ? 'APPROVED' : f.phase === 'amber' ? 'DRIFTING' : 'GAP'}
          </span>
        </div>
      </div>

      {/* SVG */}
      <svg viewBox="0 0 680 280" role="img" className="block w-full"
        aria-label={`Governance step ${i + 1} of ${TOTAL}: ${f.headline}`}>
        <title>Governance — step {i + 1} of {TOTAL}</title>

        <line x1="40" y1={LINK_Y} x2="640" y2={LINK_Y} stroke="#0d1118" strokeWidth="1" />
        <text x="40"  y={LINK_Y + 32} fill="#374151" fontFamily="monospace" fontSize="9">prior approval</text>
        <text x="512" y={LINK_Y + 32} fill="#374151" fontFamily="monospace" fontSize="9" textAnchor="end">current scope</text>

        {renderChain()}

        {/* Human silhouette — steps 11-12 */}
        {f.human && (
          <g>
            <line x1="512" y1={LINK_Y} x2="556" y2={LINK_Y} stroke={RED} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="574" cy={LINK_Y - 16} r="10" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="574" y1={LINK_Y - 6}  x2="574" y2={LINK_Y + 18} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="574" y1={LINK_Y + 2}  x2="564" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="574" y1={LINK_Y + 2}  x2="584" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="574" y1={LINK_Y + 18} x2="566" y2={LINK_Y + 30} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="574" y1={LINK_Y + 18} x2="582" y2={LINK_Y + 30} stroke="#e5e7eb" strokeWidth="1.5" />
            <text x="574" y={LINK_Y + 48} textAnchor="middle" fill="#6b7280" fontFamily="monospace" fontSize="9">
              AI Governance Lead
            </text>
          </g>
        )}

        {/* Headline */}
        {headlineLines.map((line, li) => (
          <text key={li} x="40" y={28 + li * (isBig ? 28 : 22)}
            fill={f.phase === 'red' && !isUnknown ? '#fca5a5' : isFrozen ? AMBER : isUnknown ? '#e5e7eb' : '#e5e7eb'}
            fontFamily="sans-serif"
            fontSize={isBig ? 20 : 16}
            fontWeight="300">
            {line}
          </text>
        ))}

        {/* Subtext in SVG only for freeze step ("Nobody knows.") */}
        {f.subtext && !isUnknown && (
          <text x="40" y={(headlineLines.length * (isBig ? 28 : 22)) + 52}
            fill={f.subtextColor ?? GREY}
            fontFamily="sans-serif"
            fontSize="16"
            fontWeight="300">
            {f.subtext}
          </text>
        )}

        {/* Detail lines (steps 1-5 only) */}
        {!isBig && f.detail.map((line, di) => (
          <text key={di} x="40"
            y={(headlineLines.length * 22) + 36 + di * 17}
            fill="#5b6475" fontFamily="monospace" fontSize="11">{line}</text>
        ))}
      </svg>

      {/* UNKNOWN / NO — rendered as HTML for full visual impact */}
      {isUnknown && f.subtext && (
        <div className="px-4 pb-1">
          <div
            className="font-mono font-extralight tracking-tight"
            style={{
              fontSize: 'clamp(5rem, 14vw, 8rem)',
              lineHeight: 1,
              color: f.subtextColor ?? RED,
              letterSpacing: '-0.03em',
            }}
          >
            {f.subtext}
          </div>
        </div>
      )}

      {/* Below SVG: signal, event note, live rows */}
      <div className="px-4 pb-2 space-y-2">

        {/* Underlying signal (steps 1-5) */}
        {f.signal && f.isPremise && !isBig && (
          <div>
            <span className="text-[10px] font-mono text-gray-600">Underlying signal: </span>
            <span className="text-[10px] font-mono" style={{ color: GREY }}>{f.signal}</span>
          </div>
        )}

        {/* Live rows (steps 10-12) */}
        {f.liveKind && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-[0.12em] text-gray-600">LIVE FROM VERIFY</span>
              {isLive && !pending && verify.status === 'ok' && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ color: GREEN, background: '#00ff8812' }}>
                  fetched · {EVE_ID}
                </span>
              )}
            </div>
            {pending ? (
              <div className="text-[12px] font-mono text-gray-500 italic">verifying...</div>
            ) : (
              <div className="space-y-0.5">
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

      {/* Decision chain log */}
      <div className="px-4 pb-3" style={{ opacity: isUnknown ? 0.3 : 1, transition: 'opacity .4s' }}>
        <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-2">
          DECISION CHAIN — what happened ({builtEvents.length})
        </div>
        <div className="rounded-lg bg-black/20 border border-white/5 p-3 space-y-1">
          {builtEvents.map(({ fr, idx }) => (
            <div key={idx} className="flex items-baseline gap-2 text-[11px] font-mono">
              <span className="text-gray-700 w-6">#{idx + 1}</span>
              <span style={{
                color: fr.phase === 'red' ? '#fca5a5' : fr.phase === 'amber' ? AMBER : GREEN,
                flex: 1,
              }}>
                {fr.logLabel}
              </span>
            </div>
          ))}
          {/* Freeze separator — shown after step 5 is past */}
          {i >= 5 && (
            <div className="border-t border-white/5 pt-1 mt-1">
              <div className="text-[10px] font-mono text-gray-700 italic pl-1">
                Auditor: "Does the approval still apply?"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-white/10 px-4 py-3 space-y-3">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {FRAMES.map((_, n) => (
            <button key={n} onClick={() => goto(n)} aria-label={`Go to step ${n + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: n === i ? 18 : 6,
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
