// ═══════════════════════════════════════════════════════════════════════════
// RECENT ENGINEERING MILESTONES — each with its evidence label
//
// Governed by app/stories/WEB_RELEASE_MODEL.md §O (v1.11). Sources and the exact status of
// every sentence are recorded in §O2. This list is deliberately separate from
// data/demonstrations.ts (hash-pinned, production demonstrations): these items are
// producer-tested or synthetic and must not borrow the force of those cards. Label colour:
// green only for a recorded REACHED decision; green elsewhere on this site means verified.
// ═══════════════════════════════════════════════════════════════════════════

const milestones = [
  {
    label: 'REACHED · 8 November 2026',
    tone: 'text-ent-verified',
    title: 'EVA Milestone A — accepted delivery after correction',
    body: 'Agent A built a component, agent B requested a correction, agent A corrected it, and agent B accepted. The handoff chain was verified by our own chain verifier.',
    limit: 'Producer-verified. Not independently (E-3) verified: both agents ran on the same provider in separate contexts.',
  },
  {
    label: 'DEMONSTRATED · synthetic data',
    tone: 'text-ent-accent-hi',
    title: 'Voyage Evidence — maritime evidence chain',
    body: 'A cryptographically verifiable evidence chain from recorded observations to a post-mission report. Synthetic source data processed through the real EVE Voyage Evidence pipeline.',
    limit: 'No real sensor integration has been demonstrated. EVE never states that a time, position or detection was correct.',
    href: 'https://marine.eveverified.com',
    linkText: 'Open the synthetic demonstration',
  },
  {
    label: 'IN DEVELOPMENT · rules pending',
    tone: 'text-ent-muted',
    title: 'DORA / GRC — evidence rules for ICT third-party risk',
    body: 'A technical rule and control basis exists: ten source-mapped draft evidence rules, and a demonstration module for sample assessments and workpaper exports.',
    limit: 'None of the ten rules is formally approved, and no subject-matter-expert validation has been performed. The demonstration module has not been re-run since June 2026. Evidence coverage only — not DORA compliance.',
  },
]

export default function Milestones() {
  return (
    <section id="milestones" className="bg-ent-panel border-y border-ent-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">Recent engineering milestones</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ent-text">
            What we have shown — and how far it goes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ent-dim">
            Every item carries its label. A credible verification system has to report what is not
            established as clearly as what is.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {milestones.map((m) => (
            <article key={m.title} className="flex flex-col rounded-xl border border-ent-border bg-ent-card p-7">
              <span className={`font-mono text-[11px] font-semibold tracking-[0.06em] ${m.tone}`}>{m.label}</span>
              <h3 className="mt-3 text-lg font-semibold text-ent-text">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ent-dim">{m.body}</p>
              <p className="mt-4 flex-1 text-[13px] leading-relaxed text-ent-warn">{m.limit}</p>
              {m.href && (
                <a href={m.href} className="mt-5 text-sm font-semibold text-ent-accent-hi hover:text-ent-text">
                  {m.linkText} →
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/services#lab" className="inline-flex items-center gap-2 rounded-lg border border-ent-border bg-ent-card px-5 py-3 text-sm font-semibold text-ent-text hover:border-ent-border-hi">
            Measured runs in EVE Verified Lab →
          </a>
          <a href="/insights/agentic-ai-verifiable-boundaries" className="inline-flex items-center gap-2 rounded-lg border border-ent-border bg-ent-card px-5 py-3 text-sm font-semibold text-ent-text hover:border-ent-border-hi">
            Read: Agentic AI needs verifiable boundaries →
          </a>
        </div>
      </div>
    </section>
  )
}
