'use client'

// ═══════════════════════════════════════════════════════════════════════════
// VERIFIED DEMONSTRATIONS — homepage section
//
// Sits between Products (capabilities) and StartingPoint. Capabilities and
// demonstrations are different kinds of statement and must not be readable as
// one continuous list of product cards.
//
// Governed by app/stories/WEB_RELEASE_MODEL.md v1.2
//
// VISUAL LANGUAGE — grc.eveverified.com/chain/pre-action, the house benchmark
// for an evidence surface: light body #f7f8fa, white cards with #e5e7eb
// borders and 10px radius, uppercase mono section labels in #9ca3af, navy
// #0f172a for headings and statement blocks, semantic accents per kind.
// This section is the entry point to the story page and must belong to the
// same idiom as the page it opens.
//
// Distinguished from Products, which is also light, by:
//   a navy statement band above the cards, a left accent rule per card, and
//   the kind label — never by using a different palette family.
//
// THE THREE RULES THIS COMPONENT EXISTS TO OBEY
//   1. Layer 1 dominates. The card is understood without reading layer 2.
//   2. kindLabel is ALWAYS visible — never behind a hover, never abbreviated.
//   3. evidenceNote is visible WITHOUT a click. No demonstration may look more
//      "live" than it is.
//
// This component holds NO state, so rules 2 and 3 are satisfied by the absence
// of any mechanism that could hide either element.
//
// FORBIDDEN HERE: digests, manifests, record ids, EXACT_MATCH, QUALIFIED,
// schema versions. This section leads to the proof; it does not try to be it.
// ═══════════════════════════════════════════════════════════════════════════

import { motion } from 'framer-motion'
import { demonstrations, type Demonstration } from '@/data/demonstrations'

/**
 * Literal class strings, never composed. A name built as `text-${kind}` is
 * invisible to Tailwind's scanner, gets purged from the production build, and
 * the accent disappears silently in production while working in dev.
 */
const ACCENT: Record<
  Demonstration['kind'],
  { rule: string; badge: string; dot: string; link: string }
> = {
  PRODUCTION_PROVIDER_BACKED: {
    rule: 'border-l-green-700',
    badge: 'border-green-200 bg-green-50 text-green-700',
    dot: 'bg-green-700',
    link: 'text-green-700',
  },
  PRODUCTION_GOVERNED_ACTION: {
    rule: 'border-l-blue-700',
    badge: 'border-blue-200 bg-blue-50 text-blue-700',
    dot: 'bg-blue-700',
    link: 'text-blue-700',
  },
  SCENARIO_LIVE_VERIFIED: {
    rule: 'border-l-indigo-700',
    badge: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    dot: 'bg-indigo-700',
    link: 'text-indigo-700',
  },
}

function DemonstrationCard({ item, index }: { item: Demonstration; index: number }) {
  const accent = ACCENT[item.kind]
  const featured = item.featured === true

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`flex flex-col rounded-[10px] border border-[#e5e7eb] border-l-[3px] bg-white ${accent.rule} ${
        featured ? 'p-6 shadow-[0_4px_16px_rgba(15,23,42,.07)]' : 'p-5'
      }`}
    >
      {/* RULE 2 — kind label, always visible, never abbreviated */}
      <div>
        <span
          className={`inline-block rounded-[5px] border px-2 py-0.5 font-mono text-[.58rem] font-bold uppercase tracking-[.05em] ${accent.badge}`}
        >
          {item.kindLabel}
        </span>
      </div>

      <h3
        className={`mt-3 font-bold leading-[1.3] tracking-[-.015em] text-[#0f172a] ${
          featured ? 'text-[1.3rem] md:text-[1.5rem]' : 'text-[1.05rem] leading-[1.35]'
        }`}
      >
        {item.headline}
      </h3>

      {/* RULE 1 — layer 1 dominates. Understood without reading further. */}
      <div className={`mt-4 gap-1.5 ${featured ? 'flex flex-col sm:flex-row sm:gap-6' : 'flex flex-col'}`}>
        {item.layer1.map((line) => (
          <div key={line} className="flex items-baseline gap-2.5">
            <span className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
            <span
              className={`font-semibold text-[#111827] ${
                featured ? 'text-[.95rem]' : 'text-[.88rem]'
              }`}
            >
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* Layer 2 — supporting, quieter, never required to grasp layer 1 */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.layer2.map((chip) => (
          <span
            key={chip}
            className="rounded-[6px] border border-[#e5e7eb] bg-[#f7f8fa] px-2 py-0.5 text-[.68rem] text-gray-600"
          >
            {chip}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[.82rem] leading-[1.55] text-gray-600">{item.summary}</p>

      <a
        href={item.href}
        className={`mt-5 inline-flex items-center gap-1.5 text-[.82rem] font-bold underline-offset-2 transition-opacity hover:underline ${accent.link}`}
      >
        {item.linkLabel}
        <span aria-hidden="true">→</span>
      </a>

      {/* RULE 3 — evidence status, visible without a click */}
      <p className="mt-4 border-t border-[#e5e7eb] pt-3 text-[.7rem] leading-[1.5] text-gray-400">
        {item.evidenceNote}
      </p>
    </motion.article>
  )
}

export default function VerifiedDemonstrations() {
  return (
    <section id="demonstrations" className="bg-[#f7f8fa] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[980px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* The navy statement band — the benchmark's `.proves` idiom.
              It does two jobs: it separates this section from the light
              Products section that follows (two adjacent #f7f8fa bands read as
              one long block of six cards), and it echoes the same navy band
              used on the story page this section opens. */}
          <div className="rounded-[10px] bg-[#0f172a] px-5 py-5 text-center text-white">
            <div className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#60a5fa]">
              Verified demonstrations
            </div>
            <h2 className="mt-2 text-[1.25rem] font-bold tracking-[-.01em] md:text-[1.5rem]">
              What EVE actually did, and what was recorded.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[.8rem] leading-[1.5] text-white/60">
              These are demonstrations of what EVE actually did — with the
              evidence status stated for each one.
            </p>
          </div>
        </motion.div>

        <div className="mt-5 flex flex-col gap-4">
          {demonstrations
            .filter((d) => d.featured)
            .map((item, i) => (
              <DemonstrationCard key={item.id} item={item} index={i} />
            ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {demonstrations
            .filter((d) => !d.featured)
            .map((item, i) => (
              <DemonstrationCard key={item.id} item={item} index={i + 1} />
            ))}
        </div>
      </div>
    </section>
  )
}
