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
          Live · Evidence Verification for AI &amp; Automated Systems
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

      {/* Sub — LOCKED POSITIONING. The mechanism, not only the principle.
          The four roles are kept distinct and must not be merged:
            EVE                   verifies the evidence
            Human-defined policy  determines what happens next
            Customer workflow     enforces the outcome
            EVE                   does not execute the action
          "EVE proves the chain. The organisation acts on it." is retained as
          the principle/signature line on secondary surfaces (footer), not as
          the main thesis. */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 mt-7 max-w-xl text-center text-lg leading-relaxed text-ent-dim"
      >
        <span className="font-semibold text-ent-text">EVE verifies evidence</span> against
        requirements fixed beforehand.{' '}
        <span className="font-semibold text-ent-text">Human-defined policy</span> determines
        what happens next.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="relative z-10 mt-4 max-w-xl text-center text-base leading-relaxed text-ent-dim"
      >
        If required evidence cannot be verified, EVE refuses instead of guessing.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="relative z-10 mt-3 text-center text-sm text-ent-muted"
      >
        The customer workflow enforces the outcome. EVE does not execute the action.
      </motion.p>

      {/* CTAs — two complementary entry points, not two of the same kind.
          PRIMARY   the governed-action proof: what EVE actually did, end to end,
                    with a real provider read, a real side effect, and
                    post-action verification.
          SECONDARY the provider-backed evidence story.

          2026-08-24: the primary slot previously pointed at the synthetic
          pre-action sandbox. That put the weakest demonstration behind the
          first thing a visitor clicks. The sandbox explains a mechanism; the
          governed-action page shows the model working. It remains reachable
          from the navigation and from the governed-action page itself. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="https://grc.eveverified.com/chain/governed-action"
          className="group inline-flex items-center gap-2 rounded-lg bg-ent-verified px-7 py-3.5 text-sm font-bold text-[#04140d] transition-colors hover:bg-[#0ea371]"
        >
          See the governed-action proof
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </a>
        <a
          href="/stories/provider-backed"
          className="group inline-flex items-center gap-2 rounded-lg border border-ent-border bg-ent-card px-6 py-3 text-sm font-semibold text-ent-text transition-colors hover:border-ent-border-hi hover:bg-ent-card-hi"
        >
          See the Azure-backed proof
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </motion.div>

      {/* Caption for the two paths. Layer 1 only: no digests, no manifests,
          no EXACT_MATCH / QUALIFIED, no internal record vocabulary. */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 mt-5 max-w-xl text-center text-sm leading-relaxed text-ent-dim"
      >
        <span className="font-semibold text-ent-text">A real action, blocked and then allowed</span>{' '}
        by verified evidence — or a{' '}
        <span className="font-semibold text-ent-text">recorded Azure DevOps production verification</span>
        {' '}— one sealed expectation, two fail-closed states, one authenticated read.
      </motion.p>

      {/* Flow illustration — the chain, the hero's quiet centrepiece.
          LOCKED: it now names the determination and the policy step, so the
          illustration tells the same four-role story as the copy above. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs text-ent-dim"
      >
        <span className="rounded-md border border-ent-border bg-ent-card px-3 py-1.5">System wants to act</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-accent/30 bg-ent-accent/10 px-3 py-1.5 font-semibold text-ent-accent-hi">EVE verifies the evidence</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-border bg-ent-card px-3 py-1.5">Verified determination</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-border bg-ent-card px-3 py-1.5">Human-defined policy</span>
        <span className="text-ent-border-hi">→</span>
        <span className="rounded-md border border-ent-verified/30 bg-ent-verified/10 px-3 py-1.5 font-semibold text-ent-verified">Customer workflow acts</span>
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
