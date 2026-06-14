'use client'

// EVE Governance — proof timeline (Accountability Continuity)
// Same engine as AgvScene. The story: "This approval existed. Nobody could prove it still applied."
// Steps 1–2 are the scenario premise (risk approved, vendor added) — like AGV's mission_start.
// Steps 3–9 are anchored to REAL fields in the sealed record EVE-ISO42001-00004652, fetched LIVE
// at mount. result, trigger_basis, required_human_confirmation, record id, seal, and VALID all
// come from the verify response. If the fetch fails or valid!=true, those rows show "verifying…" /
// "could not verify" — never a hardcoded VALID. No fabricated hashes.
// Model: app/stories/GOVERNANCE_SCENE_MODEL.md
import { useEffect, useRef, useState, useCallback } from 'react'

const EVE_ID = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`
const STEP_MS = 1500

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'
const GREY = '#9ca3af'

type Phase = 'green' | 'amber' | 'red'
type Row = { k: string; v: string; c?: string }

// Live verify payload — only the fields rendered (matches the iso42001 record schema).
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

// A frame = one link in the approval/decision chain.
// liveKind ties the frame to a real record field (steps 3–9). Steps 1–2 are scenario premise.
type LiveKind = 'scope_basis' | 'authority_basis' | 'stale_basis' | 'result' | 'confirm' | 'seal' | 'verify'
interface Frame {
  label: string
  event: string | null
  eventNote?: string
  phase: Phase
  // how many links of the approval chain are drawn solid (0..5); break = the link that snaps
  links: number
  broken: boolean
  human: boolean   // route to the named-human silhouette
  liveKind?: LiveKind
}

const FRAMES: Frame[] = [
  {
    label: 'A risk assessment was approved by a named owner.',
    event: 'risk_assessment_approved',
    eventNote: 'scenario premise — the prior approval on record',
    phase: 'green', links: 1, broken: false, human: false,
  },
  {
    label: 'A new vendor is added to the assessed system.',
    event: 'vendor_added',
    eventNote: 'scenario premise — system composition changes',
    phase: 'green', links: 2, broken: false, human: false,
  },
  {
    label: "The system's scope changed after approval.",
    event: 'scope_changed',
    phase: 'amber', links: 3, broken: false, human: false, liveKind: 'scope_basis',
  },
  {
    label: 'New risk data arrives that the approval never saw.',
    event: 'new_risk_data',
    phase: 'amber', links: 4, broken: false, human: false, liveKind: 'authority_basis',
  },
  {
    label: 'Someone tries to rely on the prior approval.',
    event: 'prior_approval_reused',
    phase: 'amber', links: 5, broken: false, human: false, liveKind: 'stale_basis',
  },
  {
    label: 'EVE surfaces an accountability continuity gap.',
    event: 'accountability_continuity_gap',
    phase: 'red', links: 5, broken: true, human: false, liveKind: 'result',
  },
  {
    label: 'A named human owner must confirm before the chain proceeds.',
    event: null,
    eventNote: 'EVE surfaces — it does not decide',
    phase: 'red', links: 5, broken: true, human: true, liveKind: 'confirm',
  },
  {
    label: 'The full decision trail is sealed, tamper-evident.',
    event: 'seal',
    phase: 'red', links: 5, broken: true, human: true, liveKind: 'seal',
  },
  {
    label: 'Anyone can re-check the cryptographic seal. No login.',
    event: null,
    eventNote: 'cryptographic integrity check',
    phase: 'red', links: 5, broken: true, human: true, liveKind: 'verify',
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

  // Live verify fetch at mount
  useEffect(() => {
    let alive = true
    fetch(VERIFY_API, { cache: 'no-store' })
      .then((r) => r.json())
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
    timerRef.current = window.setTimeout(() => { setStarted(true); setI((n) => Math.min(n + 1, TOTAL - 1)) }, started ? STEP_MS : STEP_MS * 0.5)
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
  }, [playing, i, started])

  const goto = useCallback((n: number) => { setPlaying(false); setStarted(true); setI(Math.max(0, Math.min(n, TOTAL - 1))) }, [])
  const togglePlay = useCallback(() => {
    setStarted(true)
    if (i >= TOTAL - 1) { setI(0); setPlaying(true); return }
    setPlaying((p) => !p)
  }, [i])

  const f = FRAMES[i]!
  const isLast = i === TOTAL - 1
  const col = phaseColor(f.phase)
  const linkVisible = i >= TOTAL - 2

  // Build live rows for the current frame from the record
  function liveRows(): { rows: Row[]; pending: boolean; isLive: boolean } {
    if (!f.liveKind) return { rows: [], pending: false, isLive: false }
    if (verify.status === 'loading') return { rows: [], pending: true, isLive: true }
    if (verify.status === 'error') return { rows: [{ k: 'verify', v: `could not verify — ${verify.reason}`, c: GREY }], pending: false, isLive: true }
    const d = verify.d.payload.data
    const has = (s: string) => d.trigger_basis.includes(s)
    switch (f.liveKind) {
      case 'scope_basis':
        return { rows: [{ k: 'trigger_basis', v: 'approval_scope_mismatch', c: has('approval_scope_mismatch') ? AMBER : GREY }], pending: false, isLive: true }
      case 'authority_basis':
        return { rows: [{ k: 'trigger_basis', v: 'authority_invalid_after_changes', c: has('authority_invalid_after_changes') ? AMBER : GREY }], pending: false, isLive: true }
      case 'stale_basis':
        return { rows: [{ k: 'trigger_basis', v: 'last_human_review_stale', c: has('last_human_review_stale') ? AMBER : GREY }], pending: false, isLive: true }
      case 'result':
        return {
          rows: [
            { k: 'result', v: d.result, c: RED },
            { k: 'basis', v: 'accountable_owner_unconfirmed · declared_authority_unconfirmed', c: GREY },
            { k: 'is_compliance_score', v: String(d.is_compliance_score), c: GREY },
          ], pending: false, isLive: true,
        }
      case 'confirm':
        return {
          rows: [
            ...d.required_human_confirmation.map((q, n) => ({ k: `confirm ${n + 1}`, v: q })),
            { k: 'materiality_assessed_by_eve', v: String(d.materiality_assessed_by_eve), c: GREEN },
          ], pending: false, isLive: true,
        }
      case 'seal':
        return {
          rows: [
            { k: 'record', v: verify.d.eve_id, c: '#e5e7eb' },
            { k: 'case_id', v: d.case_id },
            { k: 'bridge seal', v: short(verify.d.seal) },
            { k: 'chain seal', v: short(verify.d.chain_seal) },
          ], pending: false, isLive: true,
        }
      case 'verify':
        return { rows: [{ k: 'verify', v: verify.d.valid ? 'VALID' : 'INVALID', c: verify.d.valid ? GREEN : RED }], pending: false, isLive: true }
    }
  }
  const { rows, pending, isLive } = liveRows()

  // Built-up event chain (real event types only; steps 7 & 9 are evaluation/verify, no hash)
  const builtEvents = FRAMES.slice(0, i + 1).map((fr, idx) => ({ fr, idx })).filter((x) => x.fr.event !== null)

  // ── Approval-link chain visual ──────────────────────────────────────────────
  // Five links left→right. Solid up to f.links. If broken, the last drawn link snaps.
  const LINK_X = [70, 165, 260, 355, 450]
  const LINK_Y = 120
  function renderChain() {
    const nodes = []
    for (let n = 0; n < 5; n++) {
      const active = n < f.links
      const isBreakPoint = f.broken && n === f.links - 1
      const c = !active ? '#252c38' : isBreakPoint ? RED : f.phase === 'amber' ? AMBER : f.phase === 'red' ? RED : GREEN
      nodes.push(
        // link node (ring)
        <g key={`node-${n}`} style={{ transition: 'opacity .4s' }}>
          <circle cx={LINK_X[n]} cy={LINK_Y} r="16" fill="none" stroke={c} strokeWidth="2" opacity={active ? 1 : 0.35} />
          <circle cx={LINK_X[n]} cy={LINK_Y} r="5" fill={c} opacity={active ? 0.85 : 0.3} />
        </g>
      )
      // connector to next node
      if (n < 4) {
        const nextActive = n + 1 < f.links
        const connectorBroken = f.broken && n === f.links - 1 && nextActive === false
        const cc = (active && nextActive) ? (f.phase === 'red' ? RED : f.phase === 'amber' ? AMBER : GREEN) : '#252c38'
        if (connectorBroken) {
          // snapped connector — a visible gap with two stubs
          nodes.push(
            <g key={`conn-${n}`}>
              <line x1={LINK_X[n] + 16} y1={LINK_Y} x2={LINK_X[n] + 34} y2={LINK_Y - 6} stroke={RED} strokeWidth="2" strokeLinecap="round" />
              <line x1={LINK_X[n + 1] - 16} y1={LINK_Y} x2={LINK_X[n + 1] - 34} y2={LINK_Y + 6} stroke={RED} strokeWidth="2" strokeLinecap="round" />
            </g>
          )
        } else {
          nodes.push(
            <line key={`conn-${n}`} x1={LINK_X[n] + 16} y1={LINK_Y} x2={LINK_X[n + 1] - 16} y2={LINK_Y}
              stroke={cc} strokeWidth="2" opacity={(active && nextActive) ? 1 : 0.3} style={{ transition: 'stroke .4s' }} />
          )
        }
      }
    }
    return nodes
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>
      {/* Step counter */}
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-[10px] font-mono tracking-[0.16em] text-gray-500">STEP {i + 1} OF {TOTAL}</span>
        <span className="text-[10px] font-mono tracking-[0.12em]" style={{ color: col }}>
          {f.phase === 'green' ? 'APPROVED' : f.phase === 'amber' ? 'FACTS CHANGING' : 'GAP'}
        </span>
      </div>

      {/* SVG scene — approval link chain */}
      <svg viewBox="0 0 680 200" role="img" className="block w-full" aria-label={`Governance step ${i + 1} of ${TOTAL}: ${f.label}`}>
        <title>Governance proof timeline — step {i + 1} of {TOTAL}</title>

        {/* chain baseline guide */}
        <line x1="50" y1={LINK_Y} x2="470" y2={LINK_Y} stroke="#141a22" strokeWidth="1" />
        {renderChain()}

        {/* named-human silhouette (steps 7+) */}
        {f.human && (
          <g style={{ transition: 'opacity .4s' }}>
            <line x1="478" y1={LINK_Y} x2="540" y2={LINK_Y} stroke={RED} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="560" cy={LINK_Y - 10} r="9" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="560" y1={LINK_Y - 1} x2="560" y2={LINK_Y + 20} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="560" y1={LINK_Y + 5} x2="551" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <line x1="560" y1={LINK_Y + 5} x2="569" y2={LINK_Y + 14} stroke="#e5e7eb" strokeWidth="1.5" />
            <text x="560" y={LINK_Y + 40} textAnchor="middle" fill="#9ca3af" fontFamily="monospace" fontSize="9">named owner</text>
          </g>
        )}

        {/* approval label over the chain */}
        <text x="50" y="56" fill="#e5e7eb" fontFamily="sans-serif" fontSize="15">{f.label}</text>
        <text x="50" y="80" fill="#6b7280" fontFamily="monospace" fontSize="10">prior approval</text>
        <text x="470" y="80" fill="#6b7280" fontFamily="monospace" fontSize="10" textAnchor="end">current scope</text>
      </svg>

      {/* Detail rows */}
      <div className="px-4 pb-2">
        <div className="text-[10px] font-mono tracking-[0.12em] text-gray-600 mb-1">EVENT</div>
        {f.event ? (
          <div className="text-[12px] font-mono mb-3">
            <span style={{ color: f.phase === 'red' ? '#fca5a5' : '#e5e7eb' }}>{f.event}</span>
            <span className="text-gray-600"> recorded to decision chain</span>
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
                  fetched · {EVE_ID}
                </span>
              )}
            </div>
            {pending ? (
              <div className="text-[12px] font-mono mb-2 text-gray-500 italic">verifying…</div>
            ) : (
              <div className="space-y-0.5 mb-2">
                {rows.map((d) => (
                  <div key={d.k} className="flex items-baseline gap-2 text-[12px] font-mono">
                    <span className="text-gray-500 shrink-0">{d.k}:</span>
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
          {FRAMES.map((_, n) => (
            <button key={n} onClick={() => goto(n)} aria-label={`Go to step ${n + 1}`}
              className="h-2 rounded-full transition-all"
              style={{ width: n === i ? 18 : 8, background: n === i ? col : n < i ? '#4b5563' : '#252c38' }} />
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
            {!hideFullChainLink && (
              <a href="/solutions/tprm" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors"
                style={{ color: GREY, borderColor: '#ffffff20', background: '#ffffff08' }}>Governance product →</a>
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
