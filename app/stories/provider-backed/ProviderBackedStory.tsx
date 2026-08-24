'use client'

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER-BACKED STORY — clickable three-state explorer
//
// Governed by app/stories/PROVIDER_BACKED_STORY_MODEL.md v1.2
//   c293fb6fac0f483b0a37659111a074c45ef8196c5de08034a70380eb3a36ff5b
//
// VISUAL LANGUAGE — taken from grc.eveverified.com/chain/pre-action, which is
// the house benchmark for an evidence surface:
//   light body (#f7f8fa) · navy hero and code blocks (#0f172a) · white cards
//   with #e5e7eb borders and 10px radius · uppercase mono section labels ·
//   semantic state colours (green allow / orange hold / indigo process /
//   red block) · and a DEDICATED cyan treatment for boundary statements.
// Every value below is the Tailwind equivalent of a benchmark token, not an
// approximation: gray-900 #111827, gray-600 #4b5563, gray-400 #9ca3af,
// green-700 #15803d, orange-700 #c2410c, indigo-700 #4338ca,
// cyan-50/200/800 #ecfeff/#a5f3fc/#155e75.
//
// WHAT IS BORROWED FROM THE BENCHMARK, AND WHAT IS NOT
//   Borrowed:  immediacy, interaction, clear status, technical depth on demand.
//   NOT borrowed: its claim model. That page runs live calls against a locked
//   SYNTHETIC chain. This page presents a RECORDED production run. The two
//   must never be readable as the same kind of thing.
//
// THE AFFORDANCE RULE — the reason the controls are a stepper, not buttons
//   The benchmark has controls labelled "Run pre-action" and "Run fail-closed"
//   which actually execute. If this page used the same affordance, a visitor
//   would reasonably believe clicking performs a verification. It does not:
//   selecting a state moves through a history that already happened.
//   So: numbered step controls with aria-current, never a button that reads as
//   an action verb, and a standing cyan notice saying what the clicks do.
//
// THE THREE COMPREHENSION RULES
//   RULE 1  first viewport is layer 1 only — no digests, no EXACT_MATCH,
//           no QUALIFIED, no VALID, no internal vocabulary
//   RULE 2  layer 1 hero -> layer 2 states -> layer 3 refusal text and the
//           recorded result -> layer 4 the commitments panel
//   RULE 3  SealedExpectationPanel renders ONCE, outside the state switch, and
//           takes no props. It cannot change when the state changes.
//
// No useEffect. No fetch. No timers. Nothing here verifies anything at read time.
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EvidenceCommitmentsPanel from './EvidenceCommitmentsPanel'

type StateId = 1 | 2 | 3

const STEPS: { id: StateId; label: string; kicker: string }[] = [
  { id: 1, label: 'Sealed', kicker: 'Before the outcome existed' },
  { id: 2, label: 'Refused twice', kicker: 'Something required was missing' },
  { id: 3, label: 'Verified', kicker: 'Everything was available' },
]

// ── RULE 3 — rendered once, no props, cannot vary with the state ──────────
function SealedExpectationPanel() {
  return (
    <aside className="rounded-[10px] border border-[#e5e7eb] bg-white p-5 lg:sticky lg:top-24">
      <div className="text-[.62rem] font-bold uppercase tracking-[.1em] text-gray-400">
        Sealed expectation
      </div>
      <div className="mt-1 text-xl font-bold tracking-[-.01em] text-[#0f172a]">
        unchanged
      </div>

      <div className="my-4 h-px bg-[#e5e7eb]" />

      <p className="text-[.78rem] leading-[1.55] text-gray-600">
        EVE recorded what it would require, and sealed it, while the work was
        still open.
      </p>
      <p className="mt-3 text-[.78rem] leading-[1.55] text-gray-600">
        The same sealed expectation produced all three outcomes below. It was
        never edited, reissued or adjusted to fit what happened.
      </p>

      <p className="mt-4 border-t border-[#e5e7eb] pt-3 text-[.7rem] leading-[1.5] text-gray-400">
        Sealed 24 August 2026, 09:24 UTC
      </p>
    </aside>
  )
}

// ── Layer 3 — the refusals, each its own disclosure ───────────────────────
function RefusalDisclosure({
  id,
  label,
  quote,
  recordedIn,
  open,
  onToggle,
}: {
  id: string
  label: string
  quote: string
  recordedIn: string
  open: boolean
  onToggle: () => void
}) {
  const panelId = `${id}-panel`
  return (
    <div className="rounded-[9px] border border-[#e5e7eb] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-[#f7f8fa]"
      >
        <span className="text-[.8rem] font-semibold text-[#111827]">{label}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="rounded-[5px] border border-orange-200 bg-orange-50 px-2 py-0.5 text-[.58rem] font-bold uppercase tracking-[.05em] text-orange-700">
            Refused
          </span>
          <span
            aria-hidden="true"
            className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            ▾
          </span>
        </span>
      </button>

      {open && (
        <div id={panelId} className="border-t border-[#e5e7eb] px-4 py-4">
          <div className="text-[.56rem] font-bold uppercase tracking-[.06em] text-gray-400">
            System-generated refusal
          </div>
          <blockquote className="mt-2 rounded-[8px] bg-[#0f172a] px-4 py-3 font-mono text-[.72rem] leading-[1.55] text-[#e2e8f0]">
            {quote}
          </blockquote>
          <div className="mt-2 text-[.7rem] text-gray-400">{recordedIn}</div>
        </div>
      )}
    </div>
  )
}

function ResultRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#e5e7eb] py-2 text-[.76rem] last:border-b-0">
      <span className="text-gray-400">{k}</span>
      <span className="text-right font-bold text-green-700">{v}</span>
    </div>
  )
}

export default function ProviderBackedStory() {
  const [active, setActive] = useState<StateId>(1)
  const [surfaceOpen, setSurfaceOpen] = useState(false)
  const [credentialOpen, setCredentialOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Navigation />

      {/* ── LAYER 1 — first viewport. No technical vocabulary at all. ───── */}
      <header className="bg-[#0f172a] px-6 pb-10 pt-32 text-center text-white md:pt-36">
        <div className="text-[.7rem] font-bold uppercase tracking-[.2em] text-[#60a5fa]">
          EVE Verified · Production · Azure DevOps
        </div>
        <h1 className="mx-auto mt-3 max-w-3xl text-[1.9rem] font-bold leading-[1.15] tracking-[-.02em] md:text-[2.6rem]">
          A real Azure DevOps verification — before and after the outcome.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] font-semibold leading-[1.5] text-[#93c5fd]">
          EVE sealed what it required first. It refused twice when required
          evidence access was missing. Once the work was completed, EVE
          authenticated to Azure DevOps and verified the result against the
          unchanged expectation.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-[.9rem] leading-[1.6] text-white/[.62]">
          A work item was created and left open. EVE recorded its requirement
          while the outcome did not yet exist. The work was later completed, and
          EVE read Azure DevOps through an authenticated production connection.
        </p>
        <a
          href="#explore"
          className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-[.9rem] font-bold text-[#0f172a] transition-colors hover:bg-[#e0e7ff]"
        >
          Explore the three states
        </a>
      </header>

      <div className="mx-auto max-w-[980px] px-6 py-8">
        {/* The central line, in the benchmark's navy statement block */}
        <div className="rounded-[10px] bg-[#0f172a] px-5 py-4 text-center text-white">
          <div className="text-[1.05rem] font-bold tracking-[-.01em]">
            The expectation was sealed before the outcome existed.
          </div>
          <div className="mt-1.5 text-[.76rem] leading-[1.5] text-white/60">
            It did not change between the refusals and the verification.
          </div>
        </div>

        {/* WHY THIS MATTERS — the product explanation, not the proof structure.
            Three blocks with three different statuses, deliberately separated:
              1. what this run demonstrated
              2. what it produced
              3. what happens next — owned by the customer, NOT demonstrated here
            The consequence/execution layer (Q6) is deliberately NOT mentioned:
            it exists in the governance layer but its route is not deployed, and
            mixing an unreleased capability into a page whose whole value is
            "here is exactly what we ran" would weaken the proof, not extend it. */}
        <div className="mt-5 rounded-[10px] border border-[#e5e7eb] bg-white p-5">
          <div className="text-[.62rem] font-bold uppercase tracking-[.1em] text-gray-400">
            Why this matters
          </div>
          <p className="mt-2 text-[.95rem] font-bold leading-[1.45] text-[#0f172a]">
            Before an AI agent acts, EVE can verify that the evidence and
            approvals the organisation requires actually exist.
          </p>
          <p className="mt-3 text-[.82rem] leading-[1.55] text-gray-600">
            EVE does not ask a model whether an action looks safe. It verifies an
            evidence chain against requirements fixed before the outcome. If a
            required source or credential is missing, EVE refuses rather than
            proceeding on a weaker basis.
          </p>
          <p className="mt-3 text-[.82rem] leading-[1.55] text-gray-600">
            For an autonomous system, that is the difference between{' '}
            <em className="not-italic font-semibold text-[#111827]">the model decided</em>{' '}
            and{' '}
            <em className="not-italic font-semibold text-[#111827]">
              the required evidence was verified before the system was allowed to
              rely on it
            </em>
            .
          </p>

          <div className="mt-5 border-t border-[#e5e7eb] pt-4">
            <div className="text-[.62rem] font-bold uppercase tracking-[.1em] text-gray-400">
              What this run produced
            </div>
            <p className="mt-2 text-[.82rem] leading-[1.55] text-gray-600">
              A sealed determination about a real external system — evidence a
              workflow can act on, rather than an opinion that an action looks
              safe. That is the part this page demonstrates and can show you.
            </p>
          </div>

          <div className="mt-4 border-t border-[#e5e7eb] pt-4">
            <div className="text-[.62rem] font-bold uppercase tracking-[.1em] text-gray-400">
              What happens next — and who owns it
            </div>
            <p className="mt-2 text-[.82rem] leading-[1.55] text-gray-600">
              The organisation defines the rules. Customer policy interprets the
              determination and decides whether an action is allowed, needs review
              or is blocked. The organisation&rsquo;s workflow enforces that
              decision. <strong className="font-semibold text-[#111827]">EVE does not execute.</strong>
            </p>
            <p className="mt-3 text-[.74rem] leading-[1.5] text-gray-600">
              That policy behaviour is not part of this run and is not evidenced
              here.{' '}
              <a
                href="https://grc.eveverified.com/chain/pre-action"
                className="font-semibold text-blue-700 underline-offset-2 hover:underline"
              >
                See the separate synthetic pre-action demonstration →
              </a>
            </p>
          </div>

          <p className="mt-4 rounded-[6px] bg-[#f7f8fa] px-3 py-2.5 text-[.74rem] leading-[1.5] text-gray-600">
            <strong className="font-semibold text-[#111827]">Design intent, not a demonstrated claim:</strong>{' '}
            this run used Azure DevOps as the system of record. The same
            verification pattern is intended for agent actions, code changes and
            approvals. Only the Azure DevOps case below was actually run and
            recorded.
          </p>
        </div>

        {/* THE AFFORDANCE NOTICE — cyan, the benchmark's boundary treatment */}
        <div className="mt-5 rounded-[10px] border border-cyan-200 bg-cyan-50 px-4 py-3 text-[.78rem] leading-[1.5] text-cyan-800">
          <strong className="text-cyan-700">You are stepping through a recorded run.</strong>{' '}
          Selecting a state moves through a verification that already happened on
          24 August 2026. Nothing on this page contacts a provider or runs a check.
        </div>

        {/* ── LAYER 2 + 3 — the explorer ───────────────────────────────── */}
        <div id="explore" className="mt-8 grid gap-6 lg:grid-cols-[290px_1fr]">
          <SealedExpectationPanel />

          <div>
            {/* Step controls — a stepper, never an action verb */}
            <div className="text-[.62rem] font-bold uppercase tracking-[.1em] text-gray-400">
              The three states
            </div>
            <p className="mt-1 text-[.95rem] font-bold text-[#0f172a]">
              One expectation. Two refusals. One verified outcome.
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="tablist" aria-label="The three states">
              {STEPS.map((s) => {
                const on = s.id === active
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`state-${s.id}`}
                    onClick={() => setActive(s.id)}
                    className={`inline-flex items-center gap-2 rounded-[9px] border px-3.5 py-2 text-[.8rem] font-bold transition-colors ${
                      on
                        ? 'border-[#0f172a] bg-[#0f172a] text-white'
                        : 'border-[#e5e7eb] bg-white text-gray-600 hover:bg-[#f7f8fa]'
                    }`}
                  >
                    <span
                      className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded-full text-[.62rem] font-bold ${
                        on ? 'bg-white text-[#0f172a]' : 'bg-[#0f172a] text-white'
                      }`}
                    >
                      {s.id}
                    </span>
                    {s.label}
                  </button>
                )
              })}
            </div>

            {/* STATE 1 */}
            {active === 1 && (
              <section
                id="state-1"
                role="tabpanel"
                className="mt-4 rounded-[10px] border border-[#e5e7eb] border-l-[3px] border-l-indigo-700 bg-white p-5"
              >
                <div className="text-[.62rem] font-bold uppercase tracking-[.08em] text-gray-400">
                  State 1 · Sealed
                </div>
                <h2 className="mt-1 text-[1.05rem] font-bold text-[#0f172a]">
                  EVE wrote down what it would require.
                </h2>
                <p className="mt-3 text-[.82rem] leading-[1.55] text-gray-600">
                  The work was still open. There was no result yet to agree or
                  disagree with — so the requirement could not have been adjusted
                  to fit this outcome.
                </p>
                <div className="mt-4 rounded-[6px] bg-[#f7f8fa] px-3 py-2.5 text-[.72rem] leading-[1.5] text-gray-600">
                  Outcome did not exist yet.
                </div>
              </section>
            )}

            {/* STATE 2 */}
            {active === 2 && (
              <section
                id="state-2"
                role="tabpanel"
                className="mt-4 rounded-[10px] border border-[#e5e7eb] border-l-[3px] border-l-orange-700 bg-white p-5"
              >
                <div className="text-[.62rem] font-bold uppercase tracking-[.08em] text-gray-400">
                  State 2 · Refused twice
                </div>
                <h2 className="mt-1 text-[1.05rem] font-bold text-[#0f172a]">
                  Twice, something required was not available.
                </h2>
                <p className="mt-3 text-[.82rem] leading-[1.55] text-gray-600">
                  Both times EVE stopped instead of proceeding on a weaker basis,
                  and recorded nothing at all — no partial result, no provisional
                  finding.
                </p>

                <div className="mt-4 flex flex-col gap-2.5">
                  <RefusalDisclosure
                    id="refusal-surface"
                    label="The source was unavailable"
                    quote="The sealed declaration selects a surface; only the operator registry says how to read it."
                    recordedIn="Recorded during P3 · 2026-08-24"
                    open={surfaceOpen}
                    onToggle={() => setSurfaceOpen((v) => !v)}
                  />
                  <RefusalDisclosure
                    id="refusal-credential"
                    label="The credential was unavailable"
                    quote="EVE fails closed: an unresolvable credential never downgrades to an unauthenticated read."
                    recordedIn="Recorded during P5 · 2026-08-24"
                    open={credentialOpen}
                    onToggle={() => setCredentialOpen((v) => !v)}
                  />
                </div>

                <div className="mt-4 rounded-[6px] bg-[#f7f8fa] px-3 py-2.5 text-[.72rem] leading-[1.5] text-gray-600">
                  Two different boundaries, refused for two different reasons.
                  Open either to read what EVE actually said.
                </div>
              </section>
            )}

            {/* STATE 3 */}
            {active === 3 && (
              <section
                id="state-3"
                role="tabpanel"
                className="mt-4 rounded-[10px] border border-[#e5e7eb] border-l-[3px] border-l-green-700 bg-white p-5"
              >
                <div className="text-[.62rem] font-bold uppercase tracking-[.08em] text-gray-400">
                  State 3 · Verified
                </div>
                <h2 className="mt-1 text-[1.05rem] font-bold text-[#0f172a]">
                  EVE read the provider itself, and checked what came back.
                </h2>
                <p className="mt-3 text-[.82rem] leading-[1.55] text-gray-600">
                  Once the source and the credential had been made available, and
                  once the work had actually concluded, EVE performed an
                  authenticated Azure DevOps read and compared the result against
                  the requirement it had sealed hours earlier.
                </p>

                <div className="mt-4">
                  <div className="text-[.56rem] font-bold uppercase tracking-[.06em] text-gray-400">
                    Recorded result
                  </div>
                  <div className="mt-1">
                    <ResultRow k="binding" v="EXACT_MATCH" />
                    <ResultRow k="qualification" v="QUALIFIED" />
                    <ResultRow k="verification" v="VALID" />
                  </div>
                </div>

                <div className="mt-4 rounded-[10px] border border-cyan-200 bg-cyan-50 px-4 py-3 text-[.74rem] leading-[1.5] text-cyan-800">
                  <strong className="text-cyan-700">Verified on 2026-08-24.</strong>{' '}
                  Published commitment — not a live check. VALID means this record
                  of the evaluation is internally consistent and unaltered, not
                  that the provider&rsquo;s claims are true.
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* ── LAYER 4 ─────────────────────────────────────────────────────── */}
      <EvidenceCommitmentsPanel />

      {/* ── Boundary notes — cyan, the benchmark's treatment for limits ─── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-[980px]">
          <div className="text-[.62rem] font-bold uppercase tracking-[.1em] text-gray-400">
            What this does and does not establish
          </div>

          <div className="mt-3 grid gap-2.5">
            {[
              [
                'VALID is an integrity statement, not a truth statement.',
                'It means EVE’s record of the evaluation is internally consistent and unaltered. It does not mean EVE has independently established that the provider’s claims are true.',
              ],
              [
                'This is not independent third-party verification.',
                'The identity that produced the outcome and the identity EVE used to read it are different accounts, but they belong to the same organisation and the same operator. That is identity separation, nothing more.',
              ],
              [
                'A publication date is not a cryptographic timestamp.',
                'Hash identity proves integrity and reproducibility. It does not prove when something existed.',
              ],
              [
                'One case, not a general claim.',
                'One item of work, one registered source, one version of the reading rules. Nothing here qualifies the provider in general.',
              ],
              [
                'Separate from the synthetic demonstration.',
                'EVE also publishes a separate synthetic pre-action demonstration with its own data and its own identifiers. It is not this run, and it is not evidence for it. This one ran in production using an authenticated Azure DevOps read.',
              ],
            ].map(([h, b]) => (
              <div
                key={h}
                className="rounded-[9px] border border-cyan-200 bg-cyan-50 px-4 py-3"
              >
                <div className="text-[.76rem] font-bold text-cyan-700">{h}</div>
                <div className="mt-1 text-[.74rem] leading-[1.5] text-cyan-800">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
