// ═══════════════════════════════════════════════════════════════════════════
// MARINE DEMONSTRATION BAR — first screen of the home page
//
// Governed by app/stories/WEB_RELEASE_MODEL.md §P (v1.12). Points to the public
// demonstration "Marine – Autonomous Operations" (name: owner decision
// 2026-11-12) on marine.eveverified.com, live since the production switch of
// 2026-11-12. Sits above the hero; the hero itself is not changed.
// Synthetic marking is part of the bar, never behind a click.
// ═══════════════════════════════════════════════════════════════════════════

const DEMO_URL = 'https://marine.eveverified.com/'

export default function MarineDemoBar() {
  return (
    <div className="bg-ent-bg pt-[68px]">
      <div className="border-b border-ent-border bg-ent-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3.5 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="text-sm leading-relaxed text-ent-dim">
            <span className="mr-2 inline-block rounded border border-ent-border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ent-warn">
              New · synthetic data
            </span>
            <span className="font-semibold text-ent-text">Marine – Autonomous Operations.</span>{' '}
            Replay autonomous missions on a chart and follow each recorded value back to its evidence.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={DEMO_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-ent-verified px-4 py-2 text-sm font-bold text-[#04140d] transition-colors hover:bg-[#0ea371]"
            >
              Open the demonstration <span aria-hidden="true">→</span>
            </a>
            <a href="#maritime" className="text-sm font-semibold text-ent-accent-hi hover:text-ent-text">
              What it shows
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
