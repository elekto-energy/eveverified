import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal, WordReveal } from '../../services/ServicesMotion'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.10 section N.
// Every statement about EVE's capabilities and their status is mapped to registered
// Atlas records in section N2. Sentences marked [L2] are reused verbatim from
// /insights/agentic-ai-verifiable-boundaries (checked in v1.8 section L2).
// The former version of this page is in git history (commit 18c165d).

const URL = 'https://eveverified.com/about/what-is-eve'
const TITLE = 'What is EVE?'
const DESC =
  'EVE is a verification layer kept separate from the AI agents whose work it checks. It verifies handoffs and records against what was recorded and authorised, and reports what is not established. Authorised people decide.'

export const metadata: Metadata = {
  title: `${TITLE} | EVE Verified`,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: URL,
    siteName: 'EVE Verified',
    title: `${TITLE} | EVE Verified`,
    description: DESC,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EVE Verified' }],
  },
  twitter: { card: 'summary_large_image', title: `${TITLE} | EVE Verified`, description: DESC, images: ['/og-image.png'] },
}

const serif = 'font-[family-name:var(--ev-font-serif)]'
const mono = 'font-[family-name:var(--ev-font-mono)]'
const label = `${mono} text-[11px] font-medium uppercase tracking-[0.16em]`
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ev-accent)]'
const wide = 'mx-auto w-full max-w-5xl px-5 sm:px-8'
const col = 'mx-auto w-full max-w-[44rem] px-5 sm:px-8'
const p = 'mt-5 text-[18px] leading-[1.75]'
const h2 = `${serif} text-[30px] font-semibold leading-tight tracking-[-0.01em] md:text-[38px]`
const link = `underline decoration-[var(--ev-accent)] decoration-2 underline-offset-4 ${focus}`

const roles = [
  {
    n: '01',
    name: 'AI agents',
    text: 'Perform work: analyse, draft, change software, review each other’s output.',
  },
  {
    n: '02',
    name: 'EVE',
    text: 'Verifies, separately from the agents: whether a handoff matches its recorded identity and scope, and whether the resulting record checks out. It refuses what it cannot verify.',
  },
  {
    n: '03',
    name: 'The execution environment',
    text: 'Starts and stops agents and enforces permissions, budgets and time limits. EVE does not execute or stop actions.',
  },
  {
    n: '04',
    name: 'Authorised people',
    text: 'Sign the mandate before work starts and make the consequential decision. EVE reports what the evidence supports.',
  },
]

const complement = [
  {
    topic: 'What it produces',
    agent: 'An output, and its own account of how it got there.',
    eve: 'A check of that account against the recorded handoffs and their evidence.',
  },
  {
    topic: 'When agents agree',
    agent: 'Agreement can reflect shared assumptions or correlated errors.',
    eve: 'Treats agreement as an observation. Verification requires evidence and explicit checks.',
  },
  {
    topic: 'When evidence is missing',
    agent: 'May still produce a confident result.',
    eve: 'Reports what is not established instead of filling the gap.',
  },
  {
    topic: 'Decisions',
    agent: 'Acts within the task it was given.',
    eve: 'Admits or refuses what it was asked to verify, such as a handoff package. The business decision is made by an authorised person.',
  },
]

const phases = [
  {
    name: 'Before',
    q: 'Was the proposed action supported by the required evidence and authorised under the applicable mandate?',
    state: 'Demonstrated for agent handoffs in bounded runs: the identity and scope of each handoff package. Budget and time limits were enforced by the agent platform.',
  },
  {
    name: 'During',
    q: 'Do observations made during execution remain consistent with the governing contract?',
    state: 'Defined and tested (DURING v1). Not yet used in agent runs.',
  },
  {
    name: 'After',
    q: 'What evidence exists of the actual outcome, and can the resulting record and handoff be verified?',
    state: 'Demonstrated in bounded runs: sealed records checked by a separate chain verifier.',
  },
]

// Status tiers. Each entry is mapped to registered Atlas records in section N2.
const status = [
  {
    tier: 'Demonstrated',
    note: 'In bounded runs, tested by the team that built them. Not independently verified and not in production use.',
    items: [
      // [L2] C1
      'Handoffs between OpenClaw- and Hermes-based agents in owner-approved, budget- and time-bounded development and review runs. EVE’s verified-handoff check ran inside the execution chain: before each receiving agent was started, it checked the handoff package against its recorded identity and scope and admitted it only once.',
      // [L2] C2
      'Owner-signed work periods, recorded reviewer decisions and handoffs linked to their evidence, with outcomes marked CHAIN_VERIFIED by our chain verifier — meaning the recorded chain is complete and consistent within that verifier’s defined checks, not that the delivered code is correct.',
    ],
  },
  {
    tier: 'Tested, not yet in use',
    note: 'Covered by its own test suite. Not used in agent runs.',
    items: [
      // [L2] C7
      'DURING v1 defines contracts for conditions that must keep holding while an action runs, records observations pulled from declared sources, assesses whether each condition still holds, and links directives, acknowledgements and outcomes. It does not execute, stop or terminate agent actions; enforcement remains with the execution environment.',
    ],
  },
  {
    tier: 'Not yet established',
    note: 'Open items. Not claimed until they are demonstrated.',
    items: [
      // N2: DURING AVAILABLE_NOT_USED, not deployed
      'Use of DURING inside agent runs.',
      // N2: independent / external verification NOT_ESTABLISHED
      'Verification of the agent runs by an independent third party.',
      // N2: no production, hold active
      'Production use of these agent workflows.',
    ],
  },
]

const notList = [
  'An AI agent or a general-purpose orchestration framework',
  'The decision-maker for consequential actions',
  'A certification of compliance or a legal opinion',
  'Proof that an AI-generated conclusion is true',
  'A replacement for human judgement',
  'A chatbot',
]

const practice = [
  { name: 'EVE Verified Lab', href: '/services', desc: 'Three case studies, with their limits stated.' },
  {
    name: 'Agentic AI needs verifiable boundaries',
    href: '/insights/agentic-ai-verifiable-boundaries',
    desc: 'What CETaS research on agent behaviour means for verification — and what we have and have not established.',
  },
  { name: 'Accountability story', href: '/stories/accountability', desc: 'One decision chain, step by step.' },
  { name: 'Provider-backed demonstration', href: '/stories/provider-backed', desc: 'A measured fail-closed outcome.' },
  { name: 'EVE Control Chain', href: '/control-chain/energy', desc: 'Evidence for critical control events.' },
  { name: 'AI Act proof', href: '/insights/ai-act-proof-v1', desc: 'From AI Act documents to a verifiable record.' },
  { name: 'Verify a record', href: 'https://verify.eveverified.com', desc: 'Check a sealed record by reference or hash.' },
]

// Preserved from the former /eve page ("Built on EVE"); descriptions reduced to
// what each site is. Status and scope are stated on each site.
const applications = [
  { name: 'ComplieDocs', href: 'https://compliedocs.com', desc: 'Compliance documentation' },
  { name: 'EVE Navigator', href: 'https://research.eveverified.com', desc: 'Biomedical research queries against PubMed-indexed studies' },
  { name: 'AI Act Evidence Demo', href: 'https://grc.eveverified.com', desc: 'Article 9 evidence coverage for GRC workflows (by invitation)' },
  { name: 'SeatNav', href: 'https://seatnav.com/world-cup-2026/market', desc: 'Ticket market intelligence' },
  { name: 'Merilista', href: 'https://merilista.com', desc: 'Real estate market intelligence' },
]

// Five cards: 3 + 2 on wide screens, 2 + 2 + 1 (full width) on medium screens.
function span5(i: number) {
  return `${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`
}

function Marker() {
  return <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-[var(--ev-accent)]" />
}

export default function WhatIsEvePage() {
  return (
    <main className="min-h-screen bg-[var(--ev-bg)]">
      <Navigation />

      <div className="font-[family-name:var(--ev-font-sans)] text-[var(--ev-text)] antialiased">
        {/* Header */}
        <header className="ev-ink bg-[var(--ev-ink)] pb-20 pt-32 text-[var(--ev-on-ink)] md:pb-24 md:pt-40">
          <div className={wide}>
            <p className={`${label} text-[var(--ev-on-ink-muted)]`}>About / What is EVE?</p>
            <h1
              className={`${serif} mt-6 max-w-4xl text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[52px] lg:text-[60px]`}
            >
              EVE verifies what AI agents do.{' '}
              <span className="text-[var(--ev-accent)]">People keep the authority to decide.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ev-on-ink-muted)]">
              EVE — Evidence Verification Engine — is a verification layer kept separate from the AI agents whose
              work it checks. It verifies work handed between agents against what was recorded and authorised, keeps
              the result as a record that can be checked later, and reports what is not established.
            </p>
          </div>
        </header>

        {/* Roles */}
        <section className="bg-[var(--ev-bg)] py-20 md:py-24">
          <div className={wide}>
            <WordReveal text="Four responsibilities, kept separate" className={h2} />
            <p className={`${p} max-w-2xl`}>
              Agents do the work. Verification is a separate layer with its own evidence. Enforcement belongs to the
              environment the agents run in, and the consequential decision belongs to an authorised person.
            </p>
          </div>
          <div className={`${wide} mt-10`}>
            <div className="grid gap-px border border-[var(--ev-border)] bg-[var(--ev-border)] sm:grid-cols-2 lg:grid-cols-4">
              {roles.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.06} className="bg-[var(--ev-surface)] p-7">
                  <p className={`${mono} text-sm text-[var(--ev-rule)]`}>{r.n}</p>
                  <p className="mt-4 text-[19px] font-semibold">{r.name}</p>
                  <p className="mt-3 text-[16px] leading-relaxed">{r.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Complement */}
        <section className="bg-[var(--ev-bg-alt)] py-20 md:py-24">
          <div className={wide}>
            <WordReveal text="How AI agents and EVE complement each other" className={h2} />
            <p className={`${p} max-w-2xl`}>
              EVE does not compete with the agent. An agent’s own account of its work — or a second agent’s
              approval of it — is useful, but it is not independent evidence. EVE is designed to make consequential
              agent activity attributable, bounded and verifiable.
            </p>
            <div className="mt-10 overflow-hidden border border-[var(--ev-border-strong)] bg-[var(--ev-surface)]">
              <div className={`hidden grid-cols-[1fr_1.3fr_1.3fr] border-b border-[var(--ev-border-strong)] md:grid ${label}`}>
                <span className="p-4" />
                <span className="border-l border-[var(--ev-border)] p-4">AI agent</span>
                <span className="border-l border-[var(--ev-border)] p-4">EVE</span>
              </div>
              {complement.map((row) => (
                <div
                  key={row.topic}
                  className="grid border-b border-[var(--ev-border)] last:border-b-0 md:grid-cols-[1fr_1.3fr_1.3fr]"
                >
                  <p className="p-4 font-semibold">{row.topic}</p>
                  <p className="border-[var(--ev-border)] px-4 pb-3 text-[16px] leading-relaxed md:border-l md:p-4">
                    <span className={`${label} mr-2 md:hidden`}>Agent</span>
                    {row.agent}
                  </p>
                  <p className="border-[var(--ev-border)] px-4 pb-4 text-[16px] leading-relaxed md:border-l md:p-4">
                    <span className={`${label} mr-2 md:hidden`}>EVE</span>
                    {row.eve}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before / During / After */}
        <section className="bg-[var(--ev-bg)] py-20 md:py-24">
          <div className={wide}>
            <WordReveal text="Before, during and after an action" className={h2} />
            <p className={`${p} max-w-2xl`}>
              EVE’s architecture separates three questions. They are not at the same stage: each is marked with
              what has been established so far.
            </p>
          </div>
          <div className={`${wide} mt-10`}>
            <div className="grid gap-px border border-[var(--ev-border)] bg-[var(--ev-border)] md:grid-cols-3">
              {phases.map((ph, i) => (
                <Reveal key={ph.name} delay={i * 0.08} className="bg-[var(--ev-surface)] p-7">
                  <span aria-hidden="true" className="block h-1 w-10 bg-[var(--ev-accent)]" />
                  <p className={`${label} mt-5`}>{ph.name}</p>
                  <p className="mt-3 text-[17px] leading-relaxed">{ph.q}</p>
                  <p className={`${mono} mt-5 border-t border-[var(--ev-border)] pt-4 text-[13px] leading-relaxed`}>
                    {ph.state}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className={col}>
            <p className={`${p} mt-10`}>
              These are not interchangeable checks. An authorised start does not prove compliant execution. A
              successful output does not establish that every intermediate action was permitted. And an intact
              cryptographic record does not establish that the underlying business decision was correct.
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="ev-ink bg-[var(--ev-ink)] py-20 text-[var(--ev-on-ink)] md:py-24">
          <div className={wide}>
            <WordReveal text="What is demonstrated, what is tested, what is not yet established" className={h2} />
            <p className="mt-5 max-w-2xl text-[18px] leading-[1.75] text-[var(--ev-on-ink-muted)]">
              A credible verification system must be equally capable of reporting what is not established. This is
              the current status of EVE’s agent work.
            </p>
            <div className="mt-10 grid gap-px border border-[var(--ev-rule)] bg-[var(--ev-rule)] lg:grid-cols-3">
              {status.map((s, i) => (
                <Reveal key={s.tier} delay={i * 0.08} className="bg-[var(--ev-ink)] p-7">
                  <p className={`${label} text-[var(--ev-accent)]`}>{s.tier}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--ev-on-ink-muted)]">{s.note}</p>
                  <ul className="mt-5 space-y-4">
                    {s.items.map((t) => (
                      <li key={t} className="flex gap-3 text-[16px] leading-relaxed">
                        <Marker />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-[var(--ev-on-ink-muted)]">
              A verified handoff is not the same as verified execution isolation, and neither is equivalent to proof
              that an AI-generated conclusion is true.{' '}
              <a href="/insights/agentic-ai-verifiable-boundaries" className={`text-[var(--ev-on-ink)] ${link}`}>
                Read the full account
              </a>
              .
            </p>
          </div>
        </section>

        {/* Principles */}
        <section id="principles" className="scroll-mt-24 bg-[var(--ev-bg)] py-20 md:py-24">
          <div className={wide}>
            <WordReveal text="Principles" className={h2} />
          </div>
          <div className={`${wide} mt-10`}>
            <div className="grid gap-px border border-[var(--ev-border)] bg-[var(--ev-border)] sm:grid-cols-2 lg:grid-cols-6">
              {PRINCIPLES.map((pr, i) => (
                <Reveal key={pr.title} delay={i * 0.05} className={`bg-[var(--ev-surface)] p-7 ${span5(i)}`}>
                  <p className="text-[18px] font-semibold">{pr.title}</p>
                  <p className="mt-3 text-[16px] leading-relaxed">{pr.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What EVE is not */}
        <section className="bg-[var(--ev-bg-alt)] py-20 md:py-24">
          <div className={wide}>
            <WordReveal text="What EVE is not" className={h2} />
            <ul className="mt-10 grid gap-px border border-[var(--ev-border)] bg-[var(--ev-border)] sm:grid-cols-2 lg:grid-cols-3">
              {notList.map((t) => (
                <li key={t} className="bg-[var(--ev-surface)] p-6 text-[16px] leading-relaxed">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* In practice */}
        <section className="bg-[var(--ev-bg)] py-20 md:py-24">
          <div className={wide}>
            <WordReveal text="See it in practice" className={h2} />
            <ul className="mt-10 border-t border-[var(--ev-border-strong)]">
              {practice.map((x) => (
                <li key={x.name} className="border-b border-[var(--ev-border)]">
                  <a
                    href={x.href}
                    className={`group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6 ${focus}`}
                  >
                    <span className="text-[18px] font-semibold group-hover:text-[var(--ev-accent)] sm:w-72 sm:shrink-0">
                      {x.name}
                    </span>
                    <span className="text-[16px] leading-relaxed">{x.desc}</span>
                  </a>
                </li>
              ))}
            </ul>

            <p className={`${label} mt-14`}>Applications that use EVE components</p>
            <ul className="mt-4 grid gap-px border border-[var(--ev-border)] bg-[var(--ev-border)] sm:grid-cols-2 lg:grid-cols-6">
              {applications.map((a, i) => (
                <li key={a.name} className={`bg-[var(--ev-surface)] ${span5(i)}`}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block h-full p-6 hover:text-[var(--ev-accent)] ${focus}`}
                  >
                    <span className="text-[17px] font-semibold">{a.name}</span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-[var(--ev-text)]">{a.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Close */}
        {/* Same wording and button style as the /services closing section. */}
        <section className="ev-ink border-t-4 border-[var(--ev-accent)] bg-[var(--ev-ink)] py-20 text-[var(--ev-on-ink)]">
          <div className={`${wide} flex flex-col items-start justify-between gap-8 md:flex-row md:items-center`}>
            <div className="max-w-2xl">
              <p className={`${serif} text-3xl font-semibold leading-tight md:text-[40px]`}>
                Start with a scoped conversation.
              </p>
              <p className="mt-4 text-[18px] leading-[1.75] text-[var(--ev-on-ink-muted)]">
                Bounded engagements with a fixed scope and a fixed deliverable.{' '}
                <a href="/services" className={`text-[var(--ev-on-ink)] ${link}`}>
                  See services
                </a>
                .
              </p>
            </div>
            <a
              href="/contact"
              className={`inline-flex items-center gap-2 rounded-sm bg-[var(--ev-on-ink)] px-5 py-3 text-sm font-semibold text-[var(--ev-ink)] transition-colors hover:opacity-90 ${focus}`}
            >
              Discuss an engagement <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}

// Principles - each mapped to registered Atlas records in section N2.
const PRINCIPLES = [
  {
    title: 'Verify, do not decide',
    text: 'EVE observes, verifies and reports. Enforcement belongs to the execution environment, and the consequential decision belongs to an authorised person.',
  },
  {
    title: 'Deterministic checks',
    text: 'Verification is done by deterministic checks with fixed rules, not by a model’s judgement.',
  },
  {
    title: 'Signed authority',
    text: 'Work periods are signed by the owner, and the signature is verified before anything starts. Steps that write, run or publish need explicit owner approval.',
  },
  {
    title: 'Fail-closed',
    text: 'What cannot be verified is refused, not passed with a warning. In our handoff tests the altered and mismatched packages were refused.',
  },
  {
    title: 'Sealed, checkable records',
    text: 'Outcomes are kept as sealed records that a separate verifier can check later. An intact record does not establish that the decision recorded in it was correct.',
  },
]
