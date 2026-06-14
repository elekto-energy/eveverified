'use client'

// Accountability scroll-story — the cinematic main story.
// "The approval still existed. The accountability chain did not."
//
// Form: full-bleed dark scroll narrative with a WebGL particle backdrop that fragments at the
// gap and re-coheres at the proof. Ten scenes. Scenes 1–6 are the SCENARIO premise (the mess);
// scenes 7–10 are anchored to REAL fields in the sealed record EVE-ISO42001-00004652, fetched
// LIVE. On fetch failure the live scenes show "verifying…" / "could not verify" — never a
// hardcoded VALID. No fabricated hashes.
// PRINCIPLE (locked): WebGL explains the story; it never invents the proof.
// Model: app/stories/ACCOUNTABILITY_STORY_MODEL.md
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// WebGL canvas cannot SSR — load client-only.
const AccountabilityCanvas = dynamic(() => import('./AccountabilityCanvas'), { ssr: false })

const EVE_ID = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`

const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'
const GREY = '#9ca3af'

interface VerifyData {
  valid: boolean
  eve_id: string
  seal: string
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

// Reveal-on-scroll wrapper
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setShown(true) }),
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-1000 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  )
}

// A full-height scene
function Scene({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`min-h-screen flex flex-col items-center justify-center px-6 ${className}`}>
      <div className="max-w-2xl w-full">{children}</div>
    </section>
  )
}

const FIVE_SYSTEMS = ['Jira', 'Teams', 'Email', 'Vendor portal', 'SharePoint']

const BASIS_GLOSS: Record<string, string> = {
  approval_scope_mismatch: 'the approval no longer covers the system that is running',
  authority_invalid_after_changes: 'the facts it rested on were replaced',
  declared_authority_unconfirmed: 'the authority it was granted under is unconfirmed',
  accountable_owner_unconfirmed: 'no named owner currently stands behind it',
  last_human_review_stale: 'the last human review is stale',
}
const BASIS_ORDER = [
  'approval_scope_mismatch',
  'authority_invalid_after_changes',
  'declared_authority_unconfirmed',
  'accountable_owner_unconfirmed',
  'last_human_review_stale',
]

export default function AccountabilityScrollStory() {
  const progressRef = useRef(0)
  const [verify, setVerify] = useState<VerifyState>({ status: 'loading' })

  // Track scroll progress 0..1 and feed the WebGL canvas (no re-render — ref only).
  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  // Live verify fetch
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

  const data = verify.status === 'ok' ? verify.d.payload.data : null
  const has = (s: string) => Boolean(data?.trigger_basis.includes(s))

  return (
    <div className="relative bg-black text-white">
      {/* WebGL backdrop — fixed, behind everything */}
      <AccountabilityCanvas progressRef={progressRef} />

      {/* dark vignette over the canvas for text legibility */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Scenes — above the canvas */}
      <div className="relative z-10">

        {/* SCENE 0 — title */}
        <Scene>
          <Reveal className="text-center">
            <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-purple-400 mb-6">The main story</div>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wide leading-tight">
              The approval still existed.<br />
              <span className="text-gray-500">The accountability chain did not.</span>
            </h1>
            <div className="text-gray-600 text-[11px] mt-12 font-mono animate-pulse">scroll ↓</div>
          </Reveal>
        </Scene>

        {/* SCENE 1 — approved */}
        <Scene>
          <Reveal className="text-center">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600 mb-6">A decision was made</div>
            <div className="inline-block px-10 py-6 rounded-2xl border" style={{ borderColor: `${GREEN}40`, background: `${GREEN}0a` }}>
              <div className="text-4xl md:text-5xl font-mono font-light" style={{ color: GREEN }}>APPROVED</div>
            </div>
            <p className="text-gray-400 text-base mt-8 max-w-lg mx-auto leading-relaxed">
              A risk decision was signed off for production. A vendor cleared, a model approved, an
              access exception granted. A named owner reviewed it. It is on record.
            </p>
          </Reveal>
        </Scene>

        {/* SCENE 2 — facts change */}
        <Scene>
          <Reveal className="text-center">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600 mb-6">Then time passes</div>
            <h2 className="text-2xl md:text-3xl font-light mb-8">The system moved on.</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Vendor added', 'Scope expanded', 'Model retrained', 'New risk data'].map((c) => (
                <span key={c} className="text-sm font-mono px-4 py-2 rounded-lg border" style={{ borderColor: `${AMBER}30`, background: `${AMBER}0a`, color: AMBER }}>{c}</span>
              ))}
            </div>
            <p className="text-gray-400 text-base mt-8 max-w-lg mx-auto leading-relaxed">
              None of it was seen by the original approval.
            </p>
          </Reveal>
        </Scene>

        {/* SCENE 3 — approval still green, but stale */}
        <Scene>
          <Reveal className="text-center">
            <div className="inline-block px-10 py-6 rounded-2xl border relative" style={{ borderColor: `${GREEN}25`, background: `${GREEN}06` }}>
              <div className="text-4xl md:text-5xl font-mono font-light" style={{ color: `${GREEN}99` }}>APPROVED</div>
              <div className="absolute -top-3 -right-3 text-[10px] font-mono px-2 py-1 rounded" style={{ background: AMBER, color: '#000' }}>stale</div>
            </div>
            <p className="text-gray-400 text-base mt-8 max-w-lg mx-auto leading-relaxed">
              The approval is still on file. Still green. But it now rests on facts that no longer exist.
            </p>
          </Reveal>
        </Scene>

        {/* SCENE 4 — the auditor */}
        <Scene>
          <Reveal className="text-center">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600 mb-6">Six weeks later</div>
            <blockquote className="text-2xl md:text-4xl font-light leading-snug">
              “Does the approval<br />still apply?”
            </blockquote>
            <p className="text-gray-500 text-sm mt-8">— the auditor</p>
          </Reveal>
        </Scene>

        {/* SCENE 5 — five systems, scattered */}
        <Scene>
          <Reveal className="text-center">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600 mb-8">The answer is spread across</div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {FIVE_SYSTEMS.map((s, i) => (
                <span key={s} className="text-sm font-mono px-4 py-2 rounded-lg border" style={{ borderColor: '#ffffff15', background: '#ffffff05', color: GREY, transform: `translateY(${(i % 2 === 0 ? -1 : 1) * (i * 3)}px)` }}>{s}</span>
              ))}
            </div>
            <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
              Each holds a piece of the truth. None holds the chain. No one system can answer the
              auditor's question.
            </p>
          </Reveal>
        </Scene>

        {/* SCENE 6 — UNKNOWN */}
        <Scene>
          <Reveal className="text-center">
            <div className="text-6xl md:text-8xl font-mono font-light mb-8" style={{ color: AMBER }}>UNKNOWN</div>
            <p className="text-gray-300 text-lg max-w-lg mx-auto leading-relaxed">
              The honest answer is not “no”. It is <span style={{ color: AMBER }}>UNKNOWN</span> — not because
              the data is gone, but because the <span className="text-white">accountability chain is broken</span>.
            </p>
          </Reveal>
        </Scene>

        {/* SCENE 7 — THE GAP (LIVE) */}
        <Scene>
          <Reveal className="text-center w-full">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase mb-6" style={{ color: RED }}>EVE names it · live record</div>
            {verify.status === 'loading' && <div className="text-gray-500 font-mono italic">verifying against {EVE_ID}…</div>}
            {verify.status === 'error' && <div className="text-gray-500 font-mono">could not verify — {verify.reason}</div>}
            {data && (
              <>
                <div className="text-3xl md:text-5xl font-mono font-light mb-10 break-words" style={{ color: RED }}>{data.result}</div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-gray-600">trigger basis — live from</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ color: GREEN, background: '#00ff8814' }}>{EVE_ID}</span>
                </div>
                <div className="space-y-3 text-left max-w-xl mx-auto">
                  {BASIS_ORDER.map((b) => (
                    <div key={b} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3" style={{ opacity: has(b) ? 1 : 0.3 }}>
                      <span className="font-mono text-sm shrink-0" style={{ color: has(b) ? RED : GREY, minWidth: 230 }}>{b}</span>
                      <span className="text-gray-500 text-sm">{BASIS_GLOSS[b]}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Reveal>
        </Scene>

        {/* SCENE 8 — EVE does not decide (LIVE) */}
        <Scene>
          <Reveal className="w-full">
            <div className="text-center mb-10">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600 mb-4">What EVE does — and does not do</div>
              <h2 className="text-3xl md:text-4xl font-light">EVE does not decide.</h2>
              <p className="text-gray-400 text-base mt-5 max-w-lg mx-auto leading-relaxed">
                Not compliant. Not non-compliant. Not incident. Not material. It surfaces the gap and
                requires a <span className="text-white">named human</span> to confirm before the chain proceeds.
              </p>
            </div>
            {data ? (
              <div className="max-w-xl mx-auto">
                <div className="text-[10px] font-mono tracking-[0.12em] uppercase text-gray-600 mb-4 text-center">Required human confirmation</div>
                <div className="space-y-3 mb-8">
                  {data.required_human_confirmation.map((q, i) => (
                    <div key={i} className="flex items-start gap-3 text-base text-gray-300">
                      <span className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-mono mt-0.5" style={{ borderColor: `${AMBER}40`, color: AMBER }}>{i + 1}</span>
                      {q}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="text-[11px] font-mono px-3 py-1.5 rounded border" style={{ borderColor: `${GREEN}30`, color: GREEN, background: `${GREEN}0a` }}>materiality_assessed_by_eve: {String(data.materiality_assessed_by_eve)}</span>
                  <span className="text-[11px] font-mono px-3 py-1.5 rounded border" style={{ borderColor: `${GREEN}30`, color: GREEN, background: `${GREEN}0a` }}>is_compliance_score: {String(data.is_compliance_score)}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed italic border-l-2 pl-4 max-w-lg mx-auto" style={{ borderColor: '#ffffff15' }}>{data.boundary_note}</p>
              </div>
            ) : verify.status === 'loading' ? (
              <div className="text-center text-gray-500 font-mono italic">verifying…</div>
            ) : (
              <div className="text-center text-gray-500 font-mono">could not verify the record</div>
            )}
          </Reveal>
        </Scene>

        {/* SCENE 9 — the proof (LIVE) */}
        <Scene>
          <Reveal className="text-center w-full">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase mb-6" style={{ color: GREEN }}>The proof</div>
            <h2 className="text-3xl md:text-4xl font-light mb-8">Sealed. Anyone can re-check it.</h2>
            <div className="max-w-md mx-auto rounded-2xl border p-6" style={{ borderColor: `${GREEN}25`, background: `${GREEN}08` }}>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="text-left">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Sealed record</div>
                  <div className="text-white font-mono text-sm">{EVE_ID}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Verify</div>
                  {verify.status === 'ok' ? (
                    <div className="font-mono text-2xl" style={{ color: verify.d.valid ? GREEN : RED }}>{verify.d.valid ? 'VALID' : 'INVALID'}</div>
                  ) : verify.status === 'loading' ? (
                    <div className="font-mono text-sm text-gray-500 italic">verifying…</div>
                  ) : (
                    <div className="font-mono text-sm text-gray-500">could not verify</div>
                  )}
                </div>
              </div>
              <a href={VERIFY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border transition-colors"
                style={{ color: GREEN, borderColor: `${GREEN}40`, background: `${GREEN}0a` }}>
                Verify record →
              </a>
            </div>
            <p className="text-gray-600 text-xs mt-8 max-w-md mx-auto leading-relaxed">
              EVE surfaces the signal. A named human owner decides. The seal proves the record is
              unchanged since sealing — a cryptographic integrity check, not third-party attestation.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a href="/stories" className="text-sm px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-gray-300 hover:bg-white/10 transition-colors">
                See the same pattern in three domains →
              </a>
            </div>
          </Reveal>
        </Scene>

      </div>
    </div>
  )
}
