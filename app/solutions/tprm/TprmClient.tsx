'use client'

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// /solutions/tprm â€” EVE Verified Vendor Evidence Assessment (buyer page)
//
// Built ON the offer (OFFER_VENDOR_EVIDENCE_ASSESSMENT v1.1):
// verdict language is the page language; architecture only under How it works.
// The demo section replays the SEALED production runs of the synthetic vendors
// (EVE-TPRM-00004556 / 00004561) â€” real data in data/syntheticAssessments.ts.
// No prices on this page (locked until 3 paid deliveries calibrate them).
// No public upload in v1 â€” that belongs in the pilot flow.
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EvidenceSealField from '@/components/EvidenceSealField'
import SyntheticAssessmentDemo from '@/components/SyntheticAssessmentDemo'

const VERDICTS = [
  {
    name: 'SUPPORTED',
    label: 'Evidence found',
    color: '#00ff88',
    desc: 'The submitted evidence supports the claim within the stated scope. It does not mean the vendor is certified, approved or compliant.',
  },
  {
    name: 'PARTIAL',
    label: 'Gaps found',
    color: '#f59e0b',
    desc: 'Some evidence exists, but material gaps remain. Each gap is listed with the exact open question to send back to the vendor.',
  },
  {
    name: 'NO_ANSWER',
    label: 'No accepted evidence',
    color: '#9ca3af',
    desc: 'No accepted evidence supports the claim. EVE never guesses â€” silence and future plans do not count as evidence.',
  },
]

const ARTEFACTS = [
  {
    title: 'Excel workpaper',
    desc: 'One row per rule: verdict, coverage, evidence excerpts with document references, missing evidence, review flags and finding seal IDs. Seven sheets, from executive summary to methodology.',
  },
  {
    title: 'Sealed record',
    desc: 'The assessment manifest â€” documents, rules, findings, timestamp â€” is cryptographically sealed. Three levels: document SHA-256, finding seal, assessment manifest seal.',
  },
  {
    title: 'Verification link',
    desc: 'Anyone can verify the sealed record independently. No login. No trust in us required.',
  },
  {
    title: 'Gap summary',
    desc: 'What is supported, what is partial, what is missing â€” with the rule\u2019s own questions as ready-to-send evidence requests.',
  },
  {
    title: 'Human review log',
    desc: 'Every verdict that needs human judgement is flagged and routed to your named reviewer. EVE surfaces; humans decide.',
  },
]

const FLOW = [
  { step: 'Intake', desc: 'You send the vendor\u2019s evidence package â€” policies, reports, questionnaire answers. Up to 25 documents.' },
  { step: 'Scope confirmation', desc: 'Assessment scope is confirmed and the rule set is locked. Material arriving after rule lock is a supplement or a new run.' },
  { step: 'Deterministic review', desc: 'Every document is evaluated against every rule by the deterministic resolver. No AI in the matching path. Same input, same output â€” every time.' },
  { step: 'Human review round', desc: 'Verdicts flagged for human judgement go to your named reviewer. Decisions are recorded.' },
  { step: 'Seal', desc: 'The final workpaper is sealed. A verification record is created in the public chain.' },
  { step: 'Delivery', desc: 'Workpaper, sealed record, verification instruction and gap summary â€” plus a 60-minute walkthrough. Five business days from complete intake.' },
]

export default function TprmClient() {
  return (
    <main className="min-h-screen bg-eve-dark text-white">
      <Navigation />

      {/* â”€â”€ Hero with EvidenceSealField â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative min-h-[92vh] flex items-center">
        <EvidenceSealField />
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.3em] text-gray-500 mb-6">
              EVE VERIFIED â€” VENDOR EVIDENCE ASSESSMENT
            </p>
            <h1
              className="text-5xl md:text-6xl font-light leading-tight mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Vendor evidence.{' '}
              <span className="text-eve-green">Verified.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              EVE Vendor Evidence Assessment verifies what a vendor&apos;s
              documentation actually supports â€” and returns NO_ANSWER when
              approved evidence is missing.
            </p>

            {/* Proof chip â€” a real sealed record, not a claim */}
            <a
              href="https://verify.eveverified.com/?id=EVE-TPRM-00004556"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/15 rounded-sm px-4 py-2.5 mb-10
                         font-mono text-xs text-gray-400 hover:border-white/40 hover:text-gray-200 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-eve-green" />
              <span>EVE-TPRM-00004556</span>
              <span className="text-gray-600">Â·</span>
              <span>sealed 2026-06-13</span>
              <span className="text-gray-600">Â·</span>
              <span className="text-eve-green">valid: true</span>
              <span className="text-gray-600 ml-1">verify â†’</span>
            </a>
            <div className="flex flex-wrap gap-4">
              <a
                href="/pilot"
                className="px-6 py-3 rounded-sm bg-slate-200 text-black text-sm font-medium hover:bg-white transition-colors"
              >
                Request an assessment
              </a>
              <a
                href="#demo"
                className="px-6 py-3 rounded-sm border border-slate-400/40 text-sm text-slate-300 hover:border-slate-300/70 hover:text-white transition-colors"
              >
                Try the verified demo
              </a>
            </div>
          </div>

          {/* Verdict status modules */}
          <div className="grid md:grid-cols-3 gap-px mt-20 border border-slate-500/30 rounded-sm overflow-hidden bg-slate-500/30">
            {VERDICTS.map((v) => (
              <div key={v.name} className="bg-[#0e1218] p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full self-center" style={{ background: v.color }} />
                  <span className="font-mono text-xs tracking-[0.15em] text-gray-300">
                    {v.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-wide text-gray-600">
                    â€” {v.label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ The problem, in the buyer's words â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-light mb-6">
            You already have the vendor&apos;s answers.{' '}
            <span className="text-gray-500">What you don&apos;t have is what they prove.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Questionnaires come back as claims. Reading every policy against every
            control takes days, two reviewers reach two different conclusions, and
            when an auditor or an incident asks{' '}
            <em className="text-gray-300">&quot;what did you actually verify?&quot;</em>{' '}
            the answer lives in someone&apos;s inbox.
          </p>
          <p className="text-gray-400 leading-relaxed">
            EVE replaces opinion with a reproducible evidence record: send the
            vendor&apos;s evidence package, get back a sealed workpaper where every
            verdict traces to an exact excerpt in an exact document â€” or to the
            documented absence of one.
          </p>
        </div>
      </section>

      {/* Try the verified synthetic assessment â€” real function, sealed data */}
      <SyntheticAssessmentDemo />

      {/* â”€â”€ What you receive â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="border-t border-slate-500/20 bg-[#0c0f15]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-light mb-12">What you receive</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTEFACTS.map((a) => (
              <div key={a.title} className="border border-slate-500/25 rounded-sm p-6 hover:border-slate-400/40 transition-colors">
                <h3 className="text-gray-200 font-mono text-sm tracking-wide mb-3">{a.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
            <div className="border border-slate-400/30 rounded-sm p-6">
              <h3 className="text-white font-mono text-sm tracking-wide mb-3">Fixed price. Fixed lead time.</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                One vendor assessment, base scope, delivered five business days
                from complete intake. Volume and quarterly reassessment programs
                available. <a href="/pilot" className="text-slate-200 underline decoration-slate-500 hover:text-white">Request a quote.</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ How it works (real sequence â†’ numbering carries information) â”€â”€ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-light mb-4">How it works</h2>
        <p className="text-gray-500 text-sm mb-12 max-w-2xl">
          Deterministic evidence review. No AI in the matching path. The same
          evidence package always produces the same workpaper â€” that is what
          makes it checkable.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {FLOW.map((f, i) => (
            <div key={f.step} className="relative pl-12">
              <span className="absolute left-0 top-0 font-mono text-gray-600 text-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-white mb-2">{f.step}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€ Scope & boundaries â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-light mb-6">Base scope</h2>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex gap-3"><span className="text-slate-500">â€”</span> TPRM evidence coverage</li>
              <li className="flex gap-3"><span className="text-slate-500">â€”</span> Access control evidence</li>
              <li className="flex gap-3"><span className="text-slate-500">â€”</span> Change management evidence</li>
              <li className="flex gap-3"><span className="text-slate-500">â€”</span> Vendor due diligence evidence</li>
              <li className="flex gap-3"><span className="text-slate-500">â€”</span> Incident response evidence coverage</li>
              <li className="flex gap-3"><span className="text-slate-500">â€”</span> Partial grading with evidence completeness score</li>
            </ul>
            <p className="text-xs text-gray-600 mt-6 leading-relaxed">
              DORA-, AI Act- and CMMC-oriented scope available as add-ons.
              EVE does not classify incidents, assess materiality or determine
              whether an incident response process is compliant â€” it shows
              whether the submitted vendor evidence supports the stated
              incident-response claim.
            </p>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-6">
            <h2 className="text-3xl font-light mb-6">What this is not</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              EVE does not certify compliance. EVE verifies evidence support and
              records what requires human review.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              This is not an audit, not legal advice, not a certification and
              not a compliance determination. Coverage is not compliance â€” every
              finding carries <span className="font-mono text-xs">is_compliance_score: false</span>.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              EVE never decides for you. Verdicts that require judgement are
              flagged HUMAN REVIEW REQUIRED and routed to a named person on your
              side. The workpaper records what the evidence shows â€” your team
              decides what to do about it.
            </p>
          </div>
        </div>
      </section>

      {/* Design partner offer â€” 3 slots */}
      <section className="border-t border-slate-500/20 bg-[#0c0f15]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">DESIGN PARTNER PROGRAM</p>
              <h2 className="text-3xl font-light mb-4">
                Three slots for TPRM practitioners
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pressure-test the workpaper format against real-world assessor
                expectations. You run one full assessment â€” on your own vendor
                package or our synthetic set â€” and tell us what an assessor
                actually needs in it.
              </p>
            </div>
            <div className="border border-slate-500/25 rounded-sm p-6 bg-[#0e1218]">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-6">
                  <span className="text-gray-400">Scope</span>
                  <span className="text-gray-200 text-right">1 full Vendor Evidence Assessment, base scope</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-400">Fee</span>
                  <span className="font-mono text-gray-200">5Â 000 SEK ex VAT</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-400">In return</span>
                  <span className="text-gray-200 text-right">Structured written feedback on the workpaper + one follow-up call</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-400">Slots</span>
                  <span className="font-mono text-gray-200">3 Â· then full price applies</span>
                </div>
              </div>
              <a
                href="/pilot"
                className="inline-block mt-6 px-6 py-3 rounded-sm bg-slate-200 text-black text-sm font-medium hover:bg-white transition-colors"
              >
                Claim a design partner slot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Final CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="border-t border-slate-500/20">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Send one vendor&apos;s evidence.{' '}
            <span className="text-gray-100">Get back proof.</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Fixed price, five business days from complete intake, sealed and
            independently verifiable.
          </p>
          <a
            href="/pilot"
            className="inline-block px-8 py-4 rounded-sm bg-slate-200 text-black text-sm font-medium hover:bg-white transition-colors"
          >
            Request an assessment
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

