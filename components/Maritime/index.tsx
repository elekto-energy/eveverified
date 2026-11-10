// ═══════════════════════════════════════════════════════════════════════════
// FOR TEAMS BUILDING AUTONOMOUS MARITIME SYSTEMS
//
// Governed by app/stories/WEB_RELEASE_MODEL.md §O (v1.11). Each row's status comes from the
// internal capability classes (A demonstrated with synthetic data, B tested locally, C exists
// for another domain, D developable), as recorded in §O2. No external organisation is named.
// ═══════════════════════════════════════════════════════════════════════════

const rows = [
  {
    what: 'Timestamped, georeferenced mission records — sealed, with the source and clock behind each observation',
    status: 'Demonstrated · synthetic data',
  },
  {
    what: 'Post-mission report that states, per condition, what the records support, partly support, contradict or did not evaluate',
    status: 'Demonstrated · synthetic data',
  },
  {
    what: 'Link outages and resynchronisation recorded as gaps — "we found nothing" never becomes "it did not happen"',
    status: 'Tested locally',
  },
  {
    what: 'An exported package that a third party can re-verify without access to EVE',
    status: 'Implemented · producer-reproduced; no external re-verification yet',
  },
  {
    what: 'Records of autonomous decisions and operator actions, where the platform exposes them',
    status: 'Exists for software actions · not yet applied to vehicle autonomy',
  },
  {
    what: 'One evidence contract across platforms — not tied to a vehicle maker or sensor vendor',
    status: 'By design',
  },
]

const notEve = [
  'navigation or collision avoidance',
  'sensor fusion',
  'threat, vessel or object detection',
  'attribution of an observed activity',
  'alarms, kill switch or vessel control',
]

export default function Maritime() {
  return (
    <section id="maritime" className="bg-ent-bg border-b border-ent-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">
            For teams building autonomous maritime systems
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ent-text">
            An evidence layer for autonomous missions
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ent-dim">
            Autonomous vessels and their operators increasingly have to document what a mission did —
            in a form that someone else can assess afterwards. EVE is designed as a vendor-independent
            evidence layer that sits beside the vehicle&apos;s own autonomy, sensors and control.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-ent-border">
          {rows.map((r, i) => (
            <div
              key={r.what}
              className={`grid gap-2 bg-ent-card px-6 py-5 md:grid-cols-[1.7fr_1fr] md:gap-8 ${i ? 'border-t border-ent-border' : ''}`}
            >
              <p className="text-sm leading-relaxed text-ent-text">{r.what}</p>
              <p className="text-[13px] leading-relaxed text-ent-warn md:text-right">{r.status}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-xl border border-ent-border bg-ent-panel p-7 md:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 className="text-lg font-semibold text-ent-text">What EVE does not do</h3>
            <p className="mt-2 text-sm leading-relaxed text-ent-dim">
              Those belong to the vehicle and its operator. EVE never states that a time, a position or
              a detection was correct — it shows what was recorded and what a report rests on.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-ent-dim sm:grid-cols-2">
            {notEve.map((x) => (
              <li key={x} className="rounded-md border border-ent-border bg-ent-card px-4 py-2.5">{x}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/services#pilot-partnerships" className="inline-flex items-center gap-2 rounded-lg bg-ent-verified px-6 py-3 text-sm font-bold text-[#04140d] transition-colors hover:bg-[#0ea371]">
            Discuss an integration or technology partnership →
          </a>
          <a href="https://marine.eveverified.com" className="inline-flex items-center gap-2 rounded-lg border border-ent-border bg-ent-card px-5 py-3 text-sm font-semibold text-ent-text hover:border-ent-border-hi">
            See the synthetic demonstration →
          </a>
        </div>
      </div>
    </section>
  )
}
