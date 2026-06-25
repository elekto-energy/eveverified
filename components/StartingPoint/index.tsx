'use client'

import { motion } from 'framer-motion'

const audiences = [
  {
    kicker: 'For developers',
    title: 'Build AI agents',
    desc: 'Add one verification call before your agent acts. EVE returns a verified chain outcome and a customer-policy outcome; your workflow decides and enforces.',
    points: ['REST API', 'Live demo', 'curl example', 'Fail-closed by design'],
    cta: 'Try Pre-Action API',
    href: 'https://grc.eveverified.com/chain/pre-action',
  },
  {
    kicker: 'For enterprise',
    title: 'Govern critical workflows',
    desc: 'Verify evidence chains, approvals and authority before critical decisions. EVE surfaces what the chain supports across the systems you already run.',
    points: ['DORA', 'ISO 42001', 'TPRM', 'AI governance'],
    cta: 'Explore Governance',
    href: 'https://grc.eveverified.com/chain',
  },
]

export default function StartingPoint() {
  return (
    <section id="starting-point" className="bg-ent-panel border-y border-ent-border">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">Built for two audiences</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ent-text">
            Choose your starting point
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={a.kicker}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col rounded-xl border border-ent-border bg-ent-card p-7"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ent-muted mb-2">{a.kicker}</div>
              <h3 className="text-xl font-semibold text-ent-text">{a.title}</h3>
              <p className="text-sm text-ent-dim leading-relaxed mt-3">{a.desc}</p>

              <div className="flex flex-wrap gap-1.5 mt-5">
                {a.points.map(p => (
                  <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-ent-bg border border-ent-border text-ent-dim">
                    {p}
                  </span>
                ))}
              </div>

              <a
                href={a.href}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-ent-verified px-5 py-3 text-sm font-bold text-[#04140d] transition-colors hover:bg-[#0ea371]"
              >
                {a.cta} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
