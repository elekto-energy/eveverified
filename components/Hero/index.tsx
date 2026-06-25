'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden bg-ent-panel">
      {/* Quiet structural grid — navy, no neon */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 75%)',
        }}
      />

      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-ent-border bg-ent-card/60 px-4 py-1.5 mb-8"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ent-verified shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ent-verified">
          Live · Pre-Action Verification Platform
        </span>
      </motion.div>

      {/* Hero thesis */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 text-center font-semibold tracking-[-0.03em] text-ent-text"
        style={{ fontSize: 'clamp(40px, 7vw, 76px)', lineHeight: 1.05 }}
      >
        Verify before
        <br />
        systems act.
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 mt-7 max-w-xl text-center text-lg leading-relaxed text-ent-dim"
      >
        Pre-action verification for AI agents, GRC chains and critical decisions.
        EVE verifies the chain behind an action and returns what the evidence supports.
      </motion.p>

      {/* Boundary line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mt-4 text-center text-sm text-ent-muted"
      >
        EVE proves the chain. The organisation acts on it.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="https://grc.eveverified.com/chain/pre-action"
          className="inline-flex items-center gap-2 rounded-lg bg-ent-verified px-6 py-3 text-sm font-bold text-[#04140d] transition-colors hover:bg-[#0ea371]"
        >
          ▶ Try Pre-Action API
        </a>
        <a
          href="https://grc.eveverified.com/chain"
          className="inline-flex items-center gap-2 rounded-lg border border-ent-border bg-ent-card px-6 py-3 text-sm font-semibold text-ent-text transition-colors hover:border-ent-border-hi hover:bg-ent-card-hi"
        >
          See Governance Demo →
        </a>
      </motion.div>

      {/* Flow illustration — the chain, the hero's quiet centrepiece */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs text-ent-dim"
      >
        <span className="rounded-md border border-ent-border bg-ent-card px-3 py-1.5">System wants to act</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-accent/30 bg-ent-accent/10 px-3 py-1.5 font-semibold text-ent-accent-hi">EVE verifies the chain</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-border bg-ent-card px-3 py-1.5">Verified outcome</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-border bg-ent-card px-3 py-1.5">Customer policy</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-verified/30 bg-ent-verified/10 px-3 py-1.5 font-semibold text-ent-verified">Execute</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-ent-muted">Explore</span>
        <div className="h-10 w-px bg-gradient-to-b from-ent-muted to-transparent" />
      </motion.div>
    </section>
  )
}
