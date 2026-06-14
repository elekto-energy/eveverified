'use client'

// Accountability scroll-story — redesign.
// NO WebGL/particles. Dark solid background. Text in 3D CSS perspective.
// Each act is a full-height scene with large type that flies in from below on scroll.
// Acts 1–3: scenario premise. Acts 4–6: LIVE from EVE-ISO42001-00004652.
// Honesty: never fabricated VALID, never hardcoded hashes.
import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/Navigation'

const EVE_ID = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`
const GREEN = '#00ff88'
const AMBER = '#f59e0b'
const RED = '#ef4444'

interface VerifyData {
  valid: boolean
  eve_id: string
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
type VS = { status: 'loading' } | { status: 'ok'; d: VerifyData } | { status: 'error'; reason: string }

const BASIS_GLOSS: Record<string, string> = {
  approval_scope_mismatch: 'The approval no longer covers the system running today.',
  authority_invalid_after_changes: 'The facts it rested on were replaced.',
  declared_authority_unconfirmed: 'The authority it was granted under is unconfirmed.',
  accountable_owner_unconfirmed: 'No named owner currently stands behind it.',
  last_human_review_stale: 'The last human review is stale.',
}
const BASIS_ORDER = [
  'approval_scope_mismatch',
  'authority_invalid_after_changes',
  'declared_authority_unconfirmed',
  'accountable_owner_unconfirmed',
  'last_human_review_stale',
]

// 3D scroll-reveal wrapper
function Rise({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return }
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setShown(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.8s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? 'perspective(1200px) translateY(0px) translateZ(0px)' : 'perspective(1200px) translateY(60px) translateZ(-80px)',
      }}
      className={className}
    >
      {children}
    </div>
  )
}

// Step indicator — always visible on left
const ACTS = [
  { n: '01', label: 'Approved' },
  { n: '02', label: 'Facts changed' },
  { n: '03', label: 'Auditor asks' },
  { n: '04', label: 'UNKNOWN' },
  { n: '05', label: 'GAP detected' },
  { n: '06', label: 'Human required' },
  { n: '07', label: 'Sealed proof' },
]

function ProgressBar({ active }: { active: number }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
      {ACTS.map((a, i) => (
        <div key={a.n} className="flex items-center gap-2">
          <div
            className="w-1.5 rounded-full transition-all duration-500"
            style={{
              height: i === active ? 28 : 10,
              background: i === active ? GREEN : i < active ? '#374151' : '#1f2937',
            }}
          />
          <span
            className="text-[10px] font-mono transition-all duration-300"
            style={{ color: i === active ? GREEN : '#374151', opacity: i === active ? 1 : 0.5 }}
          >
            {a.n} {i === active ? a.label : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function AccountabilityScrollStory() {
  const [verify, setVerify] = useState<VS>({ status: 'loading' })
  const [activeAct, setActiveAct] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let alive = true
    fetch(VERIFY_API, { cache: 'no-store' })
      .then(r => r.json())
      .then((j: VerifyData) => {
        if (!alive) return
        if (j?.valid === true && j?.payload?.data) setVerify({ status: 'ok', d: j })
        else setVerify({ status: 'error', reason: 'record did not verify' })
      })
      .catch(() => { if (alive) setVerify({ status: 'error', reason: 'backend unreachable' }) })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = sectionRefs.current.indexOf(e.target as HTMLElement)
            if (idx >= 0) setActiveAct(idx)
          }
        })
      },
      { threshold: 0.5 }
    )
    sectionRefs.current.forEach(el => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const data = verify.status === 'ok' ? verify.d.payload.data : null
  const has = (s: string) => Boolean(data?.trigger_basis.includes(s))

  const setRef = (i: number) => (el: HTMLElement | null) => { sectionRefs.current[i] = el }

  return (
    <div style={{ background: '#080a0e', color: '#fff', minHeight: '100vh' }}>
      <Navigation />
      <ProgressBar active={activeAct} />

      {/* ACT 0 — TITLE */}
      <section
        ref={setRef(0)}
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <Rise>
          <div style={{ color: '#4b5563', fontSize: 11, letterSpacing: '0.25em', fontFamily: 'monospace', marginBottom: 24, textTransform: 'uppercase' }}>
            EVE Verified · Governance Signal
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 200, lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: 800 }}>
            The approval still existed.
            <br />
            <span style={{ color: '#6b7280' }}>The accountability chain did not.</span>
          </h1>
          <p style={{ color: '#4b5563', fontSize: 14, marginTop: 32, maxWidth: 480, lineHeight: 1.7 }}>
            An incident has already happened. The audit comes six weeks later.
            This is the failure every governance and ISO 42001 professional recognises.
          </p>
          <div style={{ color: '#1f2937', fontSize: 11, fontFamily: 'monospace', marginTop: 48, letterSpacing: '0.1em' }}>
            SCROLL ↓
          </div>
        </Rise>
      </section>

      {/* ACT 1 — APPROVED */}
      <section
        ref={setRef(1)}
        className="min-h-screen flex flex-col items-center justify-center px-6"
      >
        <div className="max-w-2xl w-full">
          <Rise delay={0}>
            <div style={{ color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 16 }}>
              01 / THE SCENARIO
            </div>
          </Rise>
          <Rise delay={100}>
            <div style={{
              display: 'inline-block',
              padding: '12px 28px',
              borderRadius: 8,
              border: `1px solid ${GREEN}30`,
              background: `${GREEN}08`,
              fontFamily: 'monospace',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: GREEN,
              letterSpacing: '0.05em',
              marginBottom: 40,
            }}>
              APPROVED
            </div>
          </Rise>
          <Rise delay={200}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontWeight: 200, lineHeight: 1.3, marginBottom: 24 }}>
              A decision was made.<br />On record. Signed off.
            </h2>
          </Rise>
          <Rise delay={300}>
            <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.8, maxWidth: 520 }}>
              A vendor was cleared. A model approved for production. An access exception granted.
              A named owner reviewed it. The approval exists.
            </p>
          </Rise>
        </div>
      </section>

      {/* ACT 2 — FACTS CHANGED */}
      <section
        ref={setRef(2)}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ borderTop: '1px solid #0f1218' }}
      >
        <div className="max-w-2xl w-full">
          <Rise>
            <div style={{ color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 16 }}>
              02 / THE SCENARIO
            </div>
          </Rise>
          <Rise delay={100}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontWeight: 200, lineHeight: 1.3, marginBottom: 32 }}>
              Then the system moved on.
            </h2>
          </Rise>
          <Rise delay={200}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
              {['Vendor added', 'Model retrained', 'Scope expanded', 'New risk data', 'Owner changed teams'].map(c => (
                <span key={c} style={{
                  fontFamily: 'monospace', fontSize: 13,
                  padding: '8px 16px', borderRadius: 6,
                  border: `1px solid ${AMBER}25`, background: `${AMBER}08`, color: AMBER,
                }}>
                  {c}
                </span>
              ))}
            </div>
          </Rise>
          <Rise delay={300}>
            <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.8 }}>
              The approval never saw any of it. It is still on file. Still marked approved.
              But it now rests on facts that no longer exist.
            </p>
          </Rise>
        </div>
      </section>

      {/* ACT 3 — AUDITOR */}
      <section
        ref={setRef(3)}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ borderTop: '1px solid #0f1218' }}
      >
        <div className="max-w-2xl w-full">
          <Rise>
            <div style={{ color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 32 }}>
              03 / SIX WEEKS LATER
            </div>
          </Rise>
          <Rise delay={100}>
            <blockquote style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 200, lineHeight: 1.4,
              borderLeft: `3px solid ${AMBER}`, paddingLeft: 28, marginBottom: 40,
            }}>
              "Does the previous approval<br />still apply?"
            </blockquote>
          </Rise>
          <Rise delay={200}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {[
                'Who approved this?',
                'Based on what evidence?',
                'Was the approval still valid?',
                'Did the facts change?',
                'Who owns the next decision?',
                'Can you prove it was not altered?',
              ].map(q => (
                <div key={q} style={{ color: '#4b5563', fontSize: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#1f2937' }}>·</span> {q}
                </div>
              ))}
            </div>
          </Rise>
          <Rise delay={300}>
            <p style={{ color: '#374151', fontSize: 13, fontFamily: 'monospace', marginTop: 24 }}>
              Five systems. None can answer together.
            </p>
          </Rise>
        </div>
      </section>

      {/* ACT 4 — UNKNOWN */}
      <section
        ref={setRef(4)}
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ borderTop: '1px solid #0f1218' }}
      >
        <Rise>
          <div style={{ color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 40 }}>
            04 / THE HONEST ANSWER
          </div>
          <div style={{
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            fontWeight: 100,
            fontFamily: 'monospace',
            color: AMBER,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: 40,
          }}>
            UNKNOWN
          </div>
          <p style={{ color: '#6b7280', fontSize: 18, maxWidth: 560, lineHeight: 1.7 }}>
            Not "no". <span style={{ color: '#9ca3af' }}>Unknown.</span> Not because the data is gone —
            because the <strong style={{ color: '#fff', fontWeight: 400 }}>accountability chain is broken.</strong>
          </p>
        </Rise>
      </section>

      {/* ACT 5 — GAP (LIVE) */}
      <section
        ref={setRef(5)}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ borderTop: '1px solid #0f1218' }}
      >
        <div className="max-w-2xl w-full">
          <Rise>
            <div style={{ color: RED, fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 16 }}>
              05 / EVE NAMES IT · LIVE RECORD
            </div>
          </Rise>
          <Rise delay={100}>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: RED,
              marginBottom: 40,
              letterSpacing: '0.02em',
              lineHeight: 1.4,
            }}>
              {verify.status === 'loading' ? 'verifying…' :
               verify.status === 'error' ? 'could not verify' :
               data?.result}
            </div>
          </Rise>
          {data && (
            <Rise delay={200}>
              <div style={{ marginBottom: 8, color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                TRIGGER BASIS — fetched live from {EVE_ID}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {BASIS_ORDER.map((b, i) => (
                  <Rise key={b} delay={250 + i * 60}>
                    <div style={{ opacity: has(b) ? 1 : 0.25 }}>
                      <div style={{ fontFamily: 'monospace', fontSize: 13, color: has(b) ? RED : '#374151', marginBottom: 2 }}>
                        {b}
                      </div>
                      <div style={{ color: '#4b5563', fontSize: 14 }}>{BASIS_GLOSS[b]}</div>
                    </div>
                  </Rise>
                ))}
              </div>
            </Rise>
          )}
        </div>
      </section>

      {/* ACT 6 — EVE DOES NOT DECIDE (LIVE) */}
      <section
        ref={setRef(6)}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ borderTop: '1px solid #0f1218' }}
      >
        <div className="max-w-2xl w-full">
          <Rise>
            <div style={{ color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 24 }}>
              06 / WHAT EVE DOES — AND DOES NOT DO
            </div>
          </Rise>
          <Rise delay={100}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontWeight: 200, lineHeight: 1.3, marginBottom: 16 }}>
              EVE does not decide.
            </h2>
          </Rise>
          <Rise delay={200}>
            <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
              Not compliant. Not non-compliant. Not incident. Not material.
              EVE surfaces the gap and requires a{' '}
              <span style={{ color: '#fff' }}>named human</span> to confirm before the chain proceeds.
            </p>
          </Rise>
          {data && (
            <>
              <Rise delay={300}>
                <div style={{ color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', marginBottom: 16 }}>
                  REQUIRED HUMAN CONFIRMATION
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                  {data.required_human_confirmation.map((q, i) => (
                    <Rise key={i} delay={340 + i * 60}>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <span style={{
                          flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                          border: `1px solid ${AMBER}40`, color: AMBER,
                          fontSize: 11, fontFamily: 'monospace',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{i + 1}</span>
                        <span style={{ color: '#d1d5db', fontSize: 16, lineHeight: 1.6 }}>{q}</span>
                      </div>
                    </Rise>
                  ))}
                </div>
              </Rise>
              <Rise delay={500}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, padding: '6px 12px', borderRadius: 6, border: `1px solid ${GREEN}25`, color: GREEN, background: `${GREEN}08` }}>
                    materiality_assessed_by_eve: {String(data.materiality_assessed_by_eve)}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, padding: '6px 12px', borderRadius: 6, border: `1px solid ${GREEN}25`, color: GREEN, background: `${GREEN}08` }}>
                    is_compliance_score: {String(data.is_compliance_score)}
                  </span>
                </div>
                <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', borderLeft: '2px solid #1f2937', paddingLeft: 16 }}>
                  {data.boundary_note}
                </p>
              </Rise>
            </>
          )}
        </div>
      </section>

      {/* ACT 7 — THE PROOF (LIVE) */}
      <section
        ref={setRef(7) as unknown as React.RefCallback<HTMLElement>}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ borderTop: '1px solid #0f1218' }}
      >
        <div className="max-w-2xl w-full">
          <Rise>
            <div style={{ color: GREEN, fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 24 }}>
              07 / THE PROOF
            </div>
          </Rise>
          <Rise delay={100}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontWeight: 200, lineHeight: 1.3, marginBottom: 16 }}>
              Sealed. Anyone can re-check it.
            </h2>
          </Rise>
          <Rise delay={200}>
            <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
              The prior approval, the detected gap, its basis, and the required human confirmation —
              all sealed into one tamper-evident record. No login needed to verify.
            </p>
          </Rise>
          <Rise delay={300}>
            <div style={{
              padding: 28, borderRadius: 12,
              border: `1px solid ${GREEN}20`, background: `${GREEN}06`,
              marginBottom: 32,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ color: '#4b5563', fontSize: 11, fontFamily: 'monospace', marginBottom: 6 }}>SEALED RECORD</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 15, color: '#e5e7eb' }}>{EVE_ID}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#4b5563', fontSize: 11, fontFamily: 'monospace', marginBottom: 6 }}>VERIFY</div>
                  {verify.status === 'ok' ? (
                    <div style={{ fontFamily: 'monospace', fontSize: 28, color: verify.d.valid ? GREEN : RED }}>
                      {verify.d.valid ? 'VALID' : 'INVALID'}
                    </div>
                  ) : verify.status === 'loading' ? (
                    <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#4b5563', fontStyle: 'italic' }}>verifying…</div>
                  ) : (
                    <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#4b5563' }}>could not verify</div>
                  )}
                </div>
              </div>
              <a href={VERIFY_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 24,
                border: `1px solid ${GREEN}40`, background: `${GREEN}0a`,
                color: GREEN, fontSize: 14, fontFamily: 'monospace',
                textDecoration: 'none', transition: 'background 0.2s',
              }}>
                Verify record →
              </a>
            </div>
          </Rise>
          <Rise delay={400}>
            <p style={{ color: '#374151', fontSize: 13, lineHeight: 1.7 }}>
              EVE surfaces the signal. A named human owner decides.
              The seal proves the record is unchanged since sealing —
              a cryptographic integrity check, not third-party attestation.
            </p>
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #0f1218' }}>
              <div style={{ color: '#374151', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', marginBottom: 16 }}>
                SAME PATTERN — THREE DOMAINS
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'AGV — DENIED', href: '/control-chain/agv', color: RED },
                  { label: 'Energy — HELD', href: '/control-chain/energy', color: AMBER },
                  { label: 'GRC Platform', href: 'https://grc.eveverified.com', color: '#a855f7' },
                ].map(l => (
                  <a key={l.label} href={l.href} style={{
                    padding: '8px 18px', borderRadius: 24, fontSize: 13, fontFamily: 'monospace',
                    border: `1px solid ${l.color}30`, color: l.color, background: `${l.color}08`,
                    textDecoration: 'none',
                  }}>
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>
          </Rise>
        </div>
      </section>
    </div>
  )
}
