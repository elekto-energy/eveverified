// ═══════════════════════════════════════════════════════════════════════════
// VERIFIABLE AUTONOMY — positioning, domains, evidence boundary, design distinctions
//
// Governed by app/stories/WEB_RELEASE_MODEL.md §O (v1.11, owner direction 2026-11-10).
// Copy source: owner direction 2026-11-10 ("CLAUDE CODE – Uppdatera EVEVerified.com och
// Organiq.se") and EVE MASTER ROADMAP "ONE EVE SYSTEM FOR VERIFIABLE AUTONOMY AND
// COMPLIANCE" (2026-11-10). Every status line below is checked in §O2.
//
// The three domains are ONE verification architecture with different domain integrations,
// not three verification engines. Each card carries its own status so that a stronger
// domain never lends its strength to a weaker one.
//
// The six distinctions are design-review questions. They are stated without attribution
// on purpose: no external person is presented as certifying or endorsing EVE.
// ═══════════════════════════════════════════════════════════════════════════

const domains = [
  {
    kicker: '01',
    title: 'AI Agents & Autonomous Workflows',
    body: 'Governed delegation, bounded mandates, agent handoffs, review and correction loops, and traceable delivery evidence.',
    status: 'Demonstrated in bounded agent runs · producer-tested, not independently verified',
  },
  {
    kicker: '02',
    title: 'Maritime & Autonomous Operations',
    body: 'Mission evidence, recorded observations, time and position provenance, offline operation, coverage gaps, and post-mission verification.',
    status: 'Demonstrated with synthetic maritime data only · no real sensor integration',
  },
  {
    kicker: '03',
    title: 'Governance, Risk & Compliance',
    body: 'Evidence-linked controls, accountable approvals, policy scope, third-party risk and auditable gaps for governance processes.',
    status: 'Technical rule and control basis · rules not formally approved',
  },
]

const distinctions = [
  { a: 'A signal', b: 'is not automatically an incident.' },
  { a: 'Verified evidence', b: 'is not automatically compliance.' },
  { a: 'Technical transport', b: 'is not authorisation.' },
  { a: 'A mandate for one action', b: 'is not responsibility for the whole outcome.' },
  { a: 'Local cryptographic integrity', b: 'is not external historical anchoring.' },
  { a: 'Producer review', b: 'is not independent verification.' },
]

export default function Autonomy() {
  return (
    <section id="verifiable-autonomy" className="bg-ent-bg border-t border-ent-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* Why */}
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">Verifiable autonomy</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-ent-text">
            Autonomy needs evidence. Not just intelligence.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ent-dim">
            Autonomous systems can act, collaborate and adapt. But when something consequential
            happens, organisations need more than a system&apos;s account of its own behaviour.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ent-dim">
            EVE is designed to preserve verifiable evidence of what was authorised, what was observed,
            what was reviewed, and what remains uncertain.{' '}
            <span className="font-semibold text-ent-text">
              EVE verifies the evidence chain. The organisation retains responsibility for decisions and enforcement.
            </span>
          </p>
        </div>

        {/* Domains */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {domains.map((d) => (
            <div key={d.title} className="flex flex-col rounded-xl border border-ent-border bg-ent-card p-7">
              <span className="font-mono text-xs text-ent-muted">{d.kicker}</span>
              <h3 className="mt-3 text-lg font-semibold text-ent-text">{d.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ent-dim">{d.body}</p>
              <p className="mt-5 border-t border-ent-border pt-4 text-[12px] leading-relaxed text-ent-warn">{d.status}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-ent-muted">
          One verification architecture with different domain integrations — not three separate verification engines.
        </p>

        {/* Evidence, not certification */}
        <div className="mt-16 grid gap-8 rounded-xl border border-ent-border bg-ent-panel p-8 md:grid-cols-[1fr_1.4fr] md:p-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">Evidence, not certification</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-ent-text">What &ldquo;Compliance by Design&rdquo; means here</h3>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-ent-dim">
            <p>
              <span className="font-semibold text-ent-text">Compliance by Design describes our engineering approach.</span>{' '}
              EVE is designed to make evidence traceable, control results explicit, and human accountability auditable.
            </p>
            <p>
              It does not certify compliance, establish the truth of sensor observations, or replace an
              organisation&apos;s legal and operational decisions. EVE is not certified against ISO 42001,
              and makes no claim of DORA compliance or of independent verification.
            </p>
          </div>
        </div>

        {/* Design distinctions */}
        <div className="mt-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">Design distinctions</span>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.01em] text-ent-text">
            Six distinctions we design and review against
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ent-dim">
            They decide what a verification result may say — and what it must leave to the organisation.
          </p>
          <ol className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {distinctions.map((x, i) => (
              <li key={x.a} className="rounded-lg border border-ent-border bg-ent-card px-5 py-4 text-sm leading-relaxed">
                <span className="mr-2 font-mono text-xs text-ent-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-semibold text-ent-text">{x.a}</span>{' '}
                <span className="text-ent-dim">{x.b}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-ent-muted">
            And one more for review itself: a reviewer saying ACCEPT is not proof that the review checks were performed.
          </p>
        </div>
      </div>
    </section>
  )
}
