'use client'

import { motion } from 'framer-motion'

const chain = [
  { n: '01', label: 'Identity',  desc: 'Who or what is requesting the action.' },
  { n: '02', label: 'Authority', desc: 'Whether it is authorised to act here.' },
  { n: '03', label: 'Approval',  desc: 'Whether the required approval was given.' },
  { n: '04', label: 'Policy',    desc: 'What the customer-defined rules say.' },
  { n: '05', label: 'Evidence',  desc: 'Whether the chain is supported, partial or missing.' },
  { n: '06', label: 'Decision',  desc: 'A verified chain outcome is returned.' },
]

const properties = [
  { title: 'Witness Mode',          desc: 'EVE observes and verifies. It does not act on the system\u2019s behalf. Every verdict is a record, not an instruction.' },
  { title: 'Deterministic Core',    desc: 'Given the same inputs, approved premises and rule versions, the engine produces the same result \u2014 every time.' },
  { title: 'Evidence Chain',        desc: 'Each action is modelled as a chain of evidence: identity, authority, approval, scope and monitoring.' },
  { title: 'Cryptographic Sealing', desc: 'Outcomes are hash-sealed and reproducible. Any change to the underlying evidence produces a different hash.' },
]

const stats = [
  { value: 'Witness',       label: 'Mode' },
  { value: 'SHA-256',       label: 'Sealing' },
  { value: 'Deterministic', label: 'Core' },
  { value: 'Append-only',   label: 'Ledger' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ent-panel border-y border-ent-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">How EVE works</span>
          <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.02em] text-ent-text leading-[1.1]">
            One verification chain. Every critical action.
          </h2>
          <p className="mt-4 text-sm md:text-base text-ent-dim leading-relaxed">
            EVE verifies each link in the chain behind an action and returns what the evidence
            supports. The system decides what happens next \u2014 EVE does not execute.
          </p>
        </motion.div>

        {/* Two columns: chain | architecture */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">

          {/* The chain */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-ent-muted mb-5">The chain</div>
            <div className="relative">
              {/* spine */}
              <div className="absolute left-[15px] top-2 bottom-8 w-px bg-ent-border" />
              <div className="space-y-1">
                {chain.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="relative flex items-start gap-4 py-2.5"
                  >
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ent-border bg-ent-card font-mono text-[11px] text-ent-dim">
                      {step.n}
                    </span>
                    <div className="pt-0.5">
                      <div className="text-sm font-semibold text-ent-text">{step.label}</div>
                      <div className="text-[13px] text-ent-dim">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
                {/* Execute — distinct, customer-owned */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: chain.length * 0.06 }}
                  className="relative flex items-start gap-4 py-2.5"
                >
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ent-verified/40 bg-ent-verified/10 font-mono text-[11px] text-ent-verified">
                    ▶
                  </span>
                  <div className="pt-0.5">
                    <div className="text-sm font-semibold text-ent-verified">Execute</div>
                    <div className="text-[13px] text-ent-dim">The customer workflow acts on the result. EVE does not execute.</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Architecture properties */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-ent-muted mb-5">The engine</div>
            <div className="space-y-3">
              {properties.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="rounded-lg border border-ent-border bg-ent-card px-4 py-3.5"
                >
                  <div className="text-sm font-semibold text-ent-text">{p.title}</div>
                  <div className="text-[13px] text-ent-dim leading-relaxed mt-0.5">{p.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ent-border rounded-xl border border-ent-border bg-ent-card overflow-hidden"
        >
          {stats.map(stat => (
            <div key={stat.label} className="px-5 py-6 text-center">
              <div className="text-lg font-semibold text-ent-text">{stat.value}</div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-ent-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
