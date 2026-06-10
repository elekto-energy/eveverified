'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

// ───────────────────────────────────────────────────────────────────────────
// Helpers (same pattern as ai-act-proof-v1)
// ───────────────────────────────────────────────────────────────────────────

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/[0.05] text-purple-400/90 text-[0.875em] font-mono whitespace-nowrap">
      {children}
    </code>
  )
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-white font-medium">{children}</strong>
}

function Em({ children }: { children: React.ReactNode }) {
  return <em className="text-white/90 not-italic font-medium">{children}</em>
}

function Section({
  num,
  title,
  shade = false,
  children,
}: {
  num: string
  title: string
  shade?: boolean
  children: React.ReactNode
}) {
  return (
    <section className={`py-12 md:py-20 px-6 ${shade ? 'bg-white/[0.012]' : ''}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-purple-400/40 text-xs font-mono tracking-[0.15em] shrink-0">
            §{num}
          </span>
          <h2 className="text-xl md:text-2xl font-extralight tracking-wide text-white/90">
            {title}
          </h2>
        </div>
        <div className="space-y-5 text-gray-300 text-base leading-[1.75]">
          {children}
        </div>
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Article
// ───────────────────────────────────────────────────────────────────────────

export default function ArticleClient() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 mb-10">
              <span className="text-purple-400 text-xs">◇</span>
              <span className="text-purple-400 text-[10px] tracking-[0.25em] font-medium">
                EVE SIGNALS · INSIGHTS
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide text-white/95 mb-6 leading-[1.15]">
              Accountability-Continuity Checkpoint for Chained AI Workflows
            </h1>

            {/* Lede */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed italic max-w-2xl">
              Human approval is necessary, but not always sufficient. A prior approval may no
              longer apply after the decision context changes. This is a reviewer-informed
              design validation of a deterministic checkpoint for when that happens.
            </p>

            {/* Byline */}
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-gray-600 tracking-wide">
              <span className="text-gray-500">Joakim Eklund</span>
              <span className="text-gray-700">·</span>
              <span>10 Jun 2026</span>
              <span className="text-gray-700">·</span>
              <span>Design validation</span>
              <span className="text-gray-700">·</span>
              <span>~10 min read</span>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['AI Governance', 'EVE Signals', 'Design validation'].map(tag => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* ─── §1 — The problem ─────────────────────────────────────────── */}
      <Section num="1" title="The problem">
        <p>
          Human-in-the-loop is widely treated as sufficient for AI governance. A human reviews,
          a human approves, the chain continues. That framing works when the decision context at
          the point of execution matches the context at the point of approval.
        </p>

        <p>
          In chained AI and enterprise workflows, it often does not. An agent recommendation
          passes through system enrichment, a human approval gate, and then several more
          automated steps. Along the way, scope expands, new risk data arrives, authority
          boundaries shift, or additional system actions change what the next decision actually
          covers.
        </p>

        <p>
          The prior approval still exists. It is on the record. But the thing it approved may
          no longer match what is being decided now.
        </p>

        <p>
          <B>The governance gap is not that humans did not approve.</B> The governance gap is
          that the approval record cannot be confirmed as still valid for the current decision
          context. These are different problems, and they require different detection logic.
        </p>
      </Section>

      {/* ─── §2 — The checkpoint ──────────────────────────────────────── */}
      <Section num="2" title="The checkpoint" shade>
        <p>
          The trigger for an accountability-continuity checkpoint is not automation level,
          elapsed time, or complexity. A fast, highly automated chain with a confirmed
          accountable owner and valid declared authority does not need a checkpoint. A slow
          chain with diffuse ownership does.
        </p>

        <p>
          <B>The trigger is whether declared accountability for the next decision can still be
          confirmed.</B> That means checking four things before the chain continues:
        </p>

        <ul className="space-y-3 pl-0 list-none">
          {[
            ['Accountable owner', 'Can the current accountable owner for the next decision still be confirmed?'],
            ['Declared authority', 'Is the declared authority under which that owner acts still confirmed?'],
            ['Authority validity', 'Is that authority still valid given changed facts since the last human review?'],
            ['Human review currency', 'Is the last confirmed human review still current — or has it been superseded by changes that require a fresh review?'],
          ].map(([term, desc]) => (
            <li key={term as string} className="flex gap-3">
              <span className="text-purple-400/60 shrink-0 mt-2">·</span>
              <span>
                <B>{term as string}.</B> {desc as string}
              </span>
            </li>
          ))}
        </ul>

        <p>
          If any of these cannot be confirmed, a checkpoint is required. Delay, automation
          level, and complexity are recorded as contributing indicators — but they are
          explicitly not trigger conditions. They appear in the runtime output under{' '}
          <Code>contributing_indicators_only</Code>, not in <Code>trigger_basis</Code>.
        </p>

        <p>
          This distinction matters for auditability. A system that fires on elapsed time alone
          will produce noise. A system that fires only on accountability gaps produces signal.
        </p>
      </Section>

      {/* ─── §3 — Two synthetic cases ─────────────────────────────────── */}
      <Section num="3" title="Two synthetic cases">
        <p>
          The detector demo runs against two synthetic fixtures. Both are public and verifiable
          at{' '}
          <a
            href="https://grc.eveverified.com/iso42001/accountability-checkpoint"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400/90 hover:text-purple-400 underline underline-offset-4 decoration-purple-400/20 hover:decoration-purple-400/60 transition-colors"
          >
            grc.eveverified.com/iso42001/accountability-checkpoint
          </a>
          .
        </p>

        {/* Case A */}
        <div className="not-prose p-5 rounded-xl bg-white/[0.02] border border-white/5 border-l-2 border-l-eve-green">
          <div className="text-xs text-gray-500 font-mono tracking-[0.12em] uppercase mb-2">
            Case A · FAST_AUTOMATED_CLEAR_OWNER
          </div>
          <div className="text-eve-green text-sm font-medium mb-3">NO_CHECKPOINT_REQUIRED</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            A highly automated chain that moves in two hours from initiation to next action.
            The accountable owner is confirmed. Declared authority is confirmed and still valid.
            The last human review is current. The approval record is connected to the current
            decision context. All four conditions check out.
          </p>
          <p className="text-gray-500 text-xs mt-3">
            <Code>trigger_basis: []</Code> — empty. Speed and automation alone do not trigger a
            checkpoint.
          </p>
        </div>

        {/* Case B */}
        <div className="not-prose p-5 rounded-xl bg-white/[0.02] border border-white/5 border-l-2 border-l-amber-500">
          <div className="text-xs text-gray-500 font-mono tracking-[0.12em] uppercase mb-2">
            Case B · SCOPE_CHANGE_OWNER_UNCONFIRMED
          </div>
          <div className="text-amber-400 text-sm font-medium mb-3">ACCOUNTABILITY_CONTINUITY_GAP</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            A mixed chain where a scope expansion and new risk data have arrived since the last
            human review. The current accountable owner cannot be confirmed. Declared authority
            is unconfirmed. The authority may no longer be valid after the scope change. The
            last human review is stale. And the prior approval no longer appears materially
            connected to the expanded decision scope.
          </p>
          <div className="mt-3 space-y-1">
            {[
              'accountable_owner_unconfirmed',
              'declared_authority_unconfirmed',
              'authority_invalid_after_changes',
              'last_human_review_stale',
              'approval_scope_mismatch',
            ].map(trigger => (
              <div key={trigger} className="font-mono text-xs text-amber-400/80">
                · {trigger}
              </div>
            ))}
          </div>
        </div>

        <p>
          Case A is as important as Case B. A detector that fires on every fast or automated
          chain is not useful. The value of the demo is that Case A returns no triggers — which
          proves the logic does not conflate automation with accountability failure.
        </p>
      </Section>

      {/* ─── §4 — Approval scope mismatch ────────────────────────────── */}
      <Section num="4" title="Approval scope mismatch" shade>
        <p>
          The fifth trigger item — <Code>approval_scope_mismatch</Code> — sits differently from
          the other four. The ownership and authority conditions ask whether the accountable
          owner and declared authority for the next decision can still be confirmed. They are
          about the people and the mandate.
        </p>

        <p>
          Approval scope mismatch asks a different question: <Em>a prior approval exists, but
          does it still cover what is now being decided?</Em>
        </p>

        <p>
          A prior approval may be fully on the record, with a confirmed owner and valid
          authority at the time it was issued — and still not apply to the current decision
          context after changed facts such as scope expansion, new risk data, or authority
          boundary changes.
        </p>

        <p>
          This is related to, but distinct from, ownership or authority confirmation failure.
          You can have a confirmed owner, a confirmed authority, and still have an approval
          whose scope no longer matches what is being decided. The three conditions are
          orthogonal.
        </p>

        <p>
          In the runtime output, this appears as <Code>approval_scope_mismatch</Code> in{' '}
          <Code>trigger_basis</Code> — a named, auditable signal. The detector does not assess
          whether the mismatch is material, does not classify it as an incident, and does not
          determine whether the prior approval should be accepted or rejected. It surfaces the
          condition. A named human owner decides what to do with it.
        </p>
      </Section>

      {/* ─── §5 — Runtime auditability ────────────────────────────────── */}
      <Section num="5" title="Runtime auditability">
        <p>
          One design choice worth making explicit: <Code>contributing_indicators_only</Code>{' '}
          appears in the runtime JSON output, not only in documentation.
        </p>

        <p>
          The field records delay, automation level, and complexity alongside the trigger basis
          — but under a key that makes their status unambiguous. They are indicators. They are
          transparent. They are not triggers.
        </p>

        <p>
          This matters when someone asks, after the fact, why the checkpoint fired — or why it
          did not. The output for Case A shows <Code>elapsed_hours: 2</Code> and{' '}
          <Code>automated_chain: true</Code> under <Code>contributing_indicators_only</Code>,
          alongside an empty <Code>trigger_basis</Code>. The record is complete. Anyone
          reviewing it can see that the chain was fast and automated, and that this did not
          trigger a checkpoint, because the accountability conditions were all met.
        </p>

        <p>
          For Case B, the output shows <Code>elapsed_hours: 72</Code> under{' '}
          <Code>contributing_indicators_only</Code> and five explicit triggers under{' '}
          <Code>trigger_basis</Code>. The 72 hours contributed context. It did not decide the
          outcome.
        </p>

        <p>
          The note in the field is verbatim in the runtime output:{' '}
          <Em>
            &ldquo;Delay, automation level and complexity are contributing indicators only,
            never sufficient trigger conditions on their own.&rdquo;
          </Em>{' '}
          That language lives in the evidence record, not just in the specification.
        </p>
      </Section>

      {/* ─── §6 — Boundary ────────────────────────────────────────────── */}
      <Section num="6" title="Boundary" shade>
        <p>
          EVE does not approve, reject, classify incidents, assess materiality or determine
          compliance.
        </p>

        <p>
          EVE surfaces the signal. A named human owner decides.
        </p>

        <p>
          The detector returns <Code>ACCOUNTABILITY_CONTINUITY_GAP</Code> or{' '}
          <Code>NO_CHECKPOINT_REQUIRED</Code> — and three explicit questions that a human owner
          must answer before the chain continues:
        </p>

        <ul className="space-y-2 pl-0 list-none">
          {[
            'Who currently owns the next decision?',
            'Under what declared authority?',
            'Whether that authority is still valid given changes since the last confirmed human review?',
          ].map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-purple-400/60 shrink-0 mt-2">·</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>

        <p>
          The detector does not answer these questions. It makes them impossible to skip.
        </p>

        <p>
          This is a synthetic detector demo on illustrative fixtures. It is not a conformity
          assessment, not an ISO 42001 compliance product, and not certification. No customer
          data is used. Nothing is sealed. The design is reviewer-informed — the framing was
          reshaped by external feedback from an experienced ISO 42001 and IT GRC practitioner,
          and the vocabulary was refined in response to that input.
        </p>
      </Section>

      {/* ─── §7 — Why this matters ────────────────────────────────────── */}
      <Section num="7" title="Why this matters">
        <p>
          The accountability-continuity pattern is not specific to one framework. The same
          structural gap appears across the governance contexts where EVE Signals is being
          developed:
        </p>

        <ul className="space-y-4 pl-0 list-none">
          {[
            [
              'Agentic AI workflows',
              'Multi-agent chains where a human approval in one step does not automatically transfer to subsequent agent actions in a changed context.',
            ],
            [
              'TPRM approval drift',
              'Third-party risk management workflows where an approved vendor relationship was established under one risk profile and then the profile changes.',
            ],
            [
              'DORA ICT third-party chains',
              'ICT service chains under DORA where subcontracting or scope changes may affect the original approval basis.',
            ],
            [
              'CMMC supplier chains',
              'Defence supply chain workflows where authority boundaries between primes and sub-contractors need to remain traceable through contract changes.',
            ],
            [
              'ISO 42001-informed governance',
              'AI management system frameworks where human oversight accountability needs to be confirmed as workflows and system scope evolve.',
            ],
            [
              'Cybersecurity and SOC workflows',
              'Incident response and change management chains where an escalation decision needs a confirmed owner before the next action is taken.',
            ],
          ].map(([area, desc]) => (
            <li key={area as string} className="flex gap-3">
              <span className="text-purple-400/60 shrink-0 mt-2">·</span>
              <span>
                <B>{area as string}.</B> {desc as string}
              </span>
            </li>
          ))}
        </ul>

        <p>
          The common thread: a governance decision made at one point in time, under one set of
          facts, may not cover a later decision made under different facts — even if the same
          approval record exists. Surfacing that gap deterministically, before execution
          continues, is the pattern this work is exploring.
        </p>

        <p>
          Whether this is a sixth primary signal, a derived condition, or an escalation pattern
          on top of existing signals is an open design question. The detector is a design
          validation, not a production feature.
        </p>
      </Section>

      {/* ─── §8 — Live demo ───────────────────────────────────────────── */}
      <Section num="8" title="Live demo" shade>
        <p>
          The detector demo is public and can be run directly. No login required.
        </p>

        <div className="not-prose space-y-4">
          <div className="p-5 rounded-lg bg-black/40 border border-white/10">
            <div className="text-xs tracking-[0.15em] text-gray-500 uppercase mb-2">
              Accountability-continuity checkpoint demo
            </div>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              Run Case A (no checkpoint required) and Case B (accountability-continuity gap).
              The raw JSON output includes <Code>trigger_basis</Code>,{' '}
              <Code>contributing_indicators_only</Code>, <Code>required_human_confirmation</Code>,
              and the boundary note.
            </p>
            <a
              href="https://grc.eveverified.com/iso42001/accountability-checkpoint"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-xs md:text-sm text-purple-400 hover:text-purple-300 underline underline-offset-4 decoration-purple-400/30 hover:decoration-purple-400/60 transition-colors break-all"
            >
              https://grc.eveverified.com/iso42001/accountability-checkpoint
            </a>
          </div>

          <div className="p-5 rounded-lg bg-black/40 border border-white/10">
            <div className="text-xs tracking-[0.15em] text-gray-500 uppercase mb-2">
              API endpoints
            </div>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              The detector API is public and returns raw JSON.
            </p>
            <div className="space-y-2">
              <div className="font-mono text-xs text-purple-400/70 break-all">
                GET /api/grc/iso42001/accountability-checkpoint?case=A
              </div>
              <div className="font-mono text-xs text-purple-400/70 break-all">
                GET /api/grc/iso42001/accountability-checkpoint?case=B
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 mt-12">
          <p className="text-gray-400 leading-relaxed">
            Questions about the design, the signal model, or the boundary language are welcome.
            Contact:{' '}
            <a
              href="mailto:joakim@organiq.se"
              className="text-purple-400/90 hover:text-purple-400 underline underline-offset-4 decoration-purple-400/30 hover:decoration-purple-400/60 transition-colors"
            >
              joakim@organiq.se
            </a>
            .
          </p>
        </div>

        {/* Related insight */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">Related</div>
          <a
            href="/insights/ai-act-proof-v1"
            className="block p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-2 mb-2">
                  {['EU AI Act', 'EVE Bridge', 'Sealed proof'].map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium bg-eve-green/10 text-eve-green border border-eve-green/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                  From AI Act Documents to Verifiable Proof
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  EVE-COMPLIEDOCS-00001125 · May 24, 2026
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors ml-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </Section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <Footer />
    </main>
  )
}
