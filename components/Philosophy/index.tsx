'use client'

import { motion } from 'framer-motion'
import { principles } from '@/data/products'

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 md:py-32 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs text-gray-500 tracking-[0.3em]">WHY DETERMINISM</span>
        <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.15em] md:tracking-[0.2em] mt-3">
          PHILOSOPHY
        </h2>
      </motion.div>

      {/* Principles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {principles.map((principle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-5 md:p-6 bg-white/[0.02] rounded-lg border border-white/5
                       hover:border-eve-green/20 transition-all duration-300 group"
          >
            <div className="text-3xl md:text-4xl mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
              {principle.symbol}
            </div>
            <div className="text-white text-sm font-medium">
              {principle.title}
            </div>
            <div className="text-gray-600 text-xs mt-2 leading-relaxed">
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
        className="mt-16 p-8 md:p-12 bg-black/40 rounded-2xl border border-white/5 text-center"
      >
        <div 
          className="text-4xl md:text-5xl text-eve-green/30 italic"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          "
        </div>
        <blockquote className="text-xl md:text-2xl font-extralight leading-relaxed mt-2">
          Like a formal system: the inference rules are fixed, and conclusions are derived from approved premises.
          <br />
          <span className="text-eve-green">Our core is stable — our knowledge expands as new premises pass approval.</span>
        </blockquote>
        <div className="mt-6 text-sm text-gray-600">
          — The Determinism Manifesto
        </div>
      </motion.div>

      {/* Additional context */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 grid md:grid-cols-2 gap-8 text-sm text-gray-500"
      >
        <div>
          <h4 className="text-white font-medium mb-3">The Symbol</h4>
          <p className="leading-relaxed">
            The <span className="text-eve-green italic" style={{ fontFamily: 'Georgia, serif' }}>e</span> in EVE stands for Evidence & Verification Engine. 
            We use Euler's number as our visual symbol — a nod to mathematical precision. 
            EVE's architecture is built on formal systems: fixed rules, verified premises, derived conclusions.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">The Engineering</h4>
          <p className="leading-relaxed">
            Every critical component in EVE is deterministic. 
            Given the same inputs and approved premises, the system produces the same conclusions. 
            No randomness in critical paths — outputs are evidence-bound, traceable, and reproducible.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
