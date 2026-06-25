'use client'

import { motion } from 'framer-motion'
import { principles } from '@/data/products'

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 md:py-28 px-6 bg-lite-bg border-t border-lite-border">
     <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lite-muted">Why determinism</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-lite-text">
          Principles
        </h2>
      </motion.div>

      {/* Principles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {principles.map((principle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-5 bg-lite-card rounded-lg border border-lite-border
                       hover:border-lite-border-hi transition-all duration-300 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div className="text-lite-text text-sm font-semibold mb-2">
              {principle.title}
            </div>
            <div className="text-lite-dim text-xs leading-relaxed">
              {principle.description}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 p-8 md:p-12 bg-lite-card rounded-2xl border border-lite-border text-center shadow-[0_1px_3px_rgba(15,23,42,0.05)]"
      >
        <div
          className="text-4xl md:text-5xl text-lite-accent/30 italic"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          "
        </div>
        <blockquote className="text-xl md:text-2xl font-light leading-relaxed mt-2 text-lite-text">
          Like a formal system: the inference rules are fixed, and conclusions are derived from approved premises.
          <br />
          <span className="text-lite-accent">The core is stable — knowledge expands as new premises pass approval.</span>
        </blockquote>
        <div className="mt-6 text-sm text-lite-muted">
          — The Determinism Manifesto
        </div>
      </motion.div>

      {/* Additional context */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 grid md:grid-cols-2 gap-8 text-sm text-lite-dim"
      >
        <div>
          <h4 className="text-lite-text font-semibold mb-3">The Symbol</h4>
          <p className="leading-relaxed">
            The <span className="text-lite-accent italic" style={{ fontFamily: 'Georgia, serif' }}>e</span> in EVE stands for Evidence & Verification Engine. It also references Euler’s number (e), reflecting the platform’s foundation in reproducible reasoning, formal systems and deterministic verification.
            The symbol represents a simple idea: critical decisions should be supported by verifiable evidence rather than assumptions.
          </p>
        </div>
        <div>
          <h4 className="text-lite-text font-semibold mb-3">The Engineering</h4>
          <p className="leading-relaxed">
            EVE is built around deterministic verification.
            Given the same inputs, approved evidence, policy and rule versions, EVE produces the same verification outcome.
            If required evidence is missing, EVE returns NO_ANSWER.
            If authority, accountability or approval scope cannot be verified, EVE surfaces the governance signal rather than guessing.
            EVE verifies the chain. Organisations decide how to act.
          </p>
        </div>
      </motion.div>
     </div>
    </section>
  )
}
