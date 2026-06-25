'use client'

import { motion } from 'framer-motion'

const layers = [
  {
    title: 'Witness Mode',
    desc: 'EVE observes and verifies. It does not act on the system\u2019s behalf. Every verdict is a record, not an instruction.',
  },
  {
    title: 'Deterministic Core',
    desc: 'Given the same inputs, approved premises and rule versions, the engine produces the same result \u2014 every time.',
  },
  {
    title: 'Evidence Chain',
    desc: 'Each action is modelled as a chain of evidence: identity, authority, approval, scope and monitoring. EVE verifies what the chain supports.',
  },
  {
    title: 'Cryptographic Sealing',
    desc: 'Outcomes are hash-sealed and reproducible. Any change to the underlying evidence produces a different hash.',
  },
]

export default function EVECore() {
  return (
    <section id="architecture" className="py-20 md:py-28 px-6 bg-lite-bg border-t border-lite-border">
     <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lite-muted">
          Architecture
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-lite-text">
          The verification engine
        </h2>
        <p className="text-lite-dim mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          A deterministic architecture where every verification step is traceable,
          evidence-bound and reproducible.
        </p>
      </motion.div>

      {/* Layer cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-xl border border-lite-border bg-lite-card p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <h3 className="text-lite-text text-base font-semibold mb-2">{layer.title}</h3>
            <p className="text-lite-dim text-sm leading-relaxed">{layer.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 text-center"
      >
        {[
          { value: 'Witness', label: 'MODE' },
          { value: 'SHA-256', label: 'SEALING' },
          { value: 'Deterministic', label: 'CORE' },
          { value: 'Append-only', label: 'LEDGER' }
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 md:p-6 bg-lite-card rounded-lg border border-lite-border
                       hover:border-lite-border-hi transition-colors duration-300"
          >
            <div className="text-lg md:text-xl font-semibold text-lite-text">
              {stat.value}
            </div>
            <div className="text-xs text-lite-muted mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
     </div>
    </section>
  )
}
