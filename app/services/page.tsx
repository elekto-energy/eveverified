import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { BranchesTrack, ClipReveal, CountUp, HeroChain, Reveal, ThemeSwitch, WordReveal } from './ServicesMotion'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.5 section I (supersedes the
// v1.4 section H layout of this page; H's verbatim copy is reused where listed).
//
// Visual identity "Evidence Systems" is scoped to this route. Colours are the
// owner palette only. Contrast rule (WCAG 2.1, measured): body text is always
// Graphite on Ivory/Sand or Ivory/Sand on Graphite. Signal Orange is used only
// for non-text marks and for text at 24px and larger. Olive Grey is used only
// for rules and borders.

// Colours: only var(--ev-*) tokens, defined per theme in app/services/theme.css
// (Evidence Systems, FlowWink Light, FlowWink Dark).

type NamedItem = { name: string; description: string }

type Branch = {
  id: string
  index: string
  name: string
  line: string
}

// Adding a service branch = adding one entry here and one section below.
const branches: Branch[] = [
  {
    id: 'agent-verification-review',
    index: '01',
    name: 'Agent Verification Review',
    line: 'A version-bound technical review of how your AI agent, integration or workflow actually behaves.',
  },
  {
    id: 'pilot-partnerships',
    index: '02',
    name: 'Pilot Partnerships',
    line: 'A scoped joint project with teams building AI agents, MCP integrations and automated workflows.',
  },
  {
    id: 'eva-business-workflows',
    index: '03',
    name: 'EVA Business Workflows',
    line: 'Agent-based workflows developed and qualified together with your team.',
  },
]

// Verbatim from WEB_RELEASE_MODEL v1.4 section H (Technical Review copy).
const reviewAreas: NamedItem[] = [
  {
    name: 'AI Agent Security',
    description:
      'agent permissions, tool access, delegation, and whether boundaries are enforced or only assumed.',
  },
  {
    name: 'MCP Integrations',
    description: 'MCP servers, which tools are exposed to which agents, and integration risks.',
  },
  {
    name: 'Evidence Integrity',
    description:
      'evidence chains, logs, hash values, and whether verification claims are supported by the evidence.',
  },
  {
    name: 'Multi-Agent Workflows',
    description: 'handoffs, reviewer independence, refusals and stop conditions.',
  },
  {
    name: 'AI-Generated Code',
    description:
      'incorrect assumptions, defects, test coverage, and claims of verified functionality.',
  },
]

const engagementContents: NamedItem[] = [
  {
    name: 'Investigation',
    description:
      'establish what the system does, as opposed to what it is documented or assumed to do.',
  },
  {
    name: 'Defect reproduction',
    description:
      'reported or suspected defects reproduced in a controlled, repeatable way, with recorded inputs, steps, outputs and checksums, so the result can be re-run and checked independently.',
  },
  {
    name: 'Documented review',
    description:
      'scope, method, findings, reproduction records and stated limitations. Anything not established is reported as not established.',
  },
]

// Field names of the written review (structure only - no values are shown).
const reportFields = [
  'Reviewed version',
  'Agreed scope',
  'Method',
  'Test cases and reproduction records',
  'Findings',
  'Not established',
  'Stated limitations',
]

// EVE model stages, from the public EVE README "Core model".
const chain = [
  'Source',
  'Evidence',
  'Claim',
  'Verification',
  'Policy / authority',
  'Action',
  'Recorded outcome',
]

const workflowExamples = ['Customer intake', 'Quote preparation', 'Research', 'Reporting']

// Verbatim from WEB_RELEASE_MODEL v1.4 section H4.
const publicWorkLinks: { label: string; href: string }[] = [
  {
    label: 'Public comment #77',
    href: 'https://github.com/LFDT-ProofOfControl/ov-poc-standard/issues/77',
  },
  {
    label: 'Public comment register',
    href: 'https://github.com/LFDT-ProofOfControl/ov-poc-standard/blob/master/docs/reviews/public-comment-register-2026-10.md',
  },
  {
    label: 'Reproducible technical analysis',
    href: 'https://github.com/LFDT-ProofOfControl/ov-poc-standard/issues/66#issuecomment-6056765203',
  },
]

// EVE Verified Lab case studies - WEB_RELEASE_MODEL v1.6 section J.
// Public wording only; every statement is mapped to a registered Atlas record
// in section J2. No internal ids, hosts, paths, hashes, costs or model ids.
type LabCase = {
  id: string
  kind: string
  title: string
  summary: string
  flow?: string[]
  flowNote?: string
  happened: string[]
  facts: { label: string; value: string }[]
  limits: string
  services: { name: string; id: string }[]
}

const labCases: LabCase[] = [
  {
    id: 'lab-agent-review',
    kind: 'Bounded demonstration · Oct 2026',
    title: "AI agents reviewing and improving each other's work",
    summary:
      'Two AI agents took part in an iterative development cycle: one wrote code, the other reviewed it and exposed defects, and the first corrected its work.',
    flow: ['Code', 'Review', 'Fix', 'Tests', 'Replay check'],
    flowNote:
      'The handoff check was a separate replay after the agents had finished, not a live stop between them.',
    happened: [
      'The task was a small, self-contained input validator written from scratch for the exercise — not a production code base.',
      'The reviewing agent identified defects and supplied a script that reproduces them: trailing line breaks, non-ASCII digits, a century-separator rule and a missing year-range check.',
      'The developing agent corrected the implementation based on that review.',
      'The recorded handoff was then evaluated in a deterministic replay, using EVE handoff verification together with package integrity checks. The unchanged package was accepted; a changed package, substituted code, a tampered verification record, a replayed record and reuse for the same action were rejected.',
    ],
    facts: [
      { label: 'Tests, original', value: '21 passed' },
      { label: 'Tests, corrected', value: '28 passed' },
      { label: 'Defect categories', value: '4 corrected' },
      { label: 'Replay scenarios', value: '1 accepted · 5 rejected' },
    ],
    limits:
      'One task, one run. Both agents used the same model, and reviewer independence was not established. EVE did not admit or stop the agents live.',
    services: [{ name: 'Agent Verification Review', id: 'agent-verification-review' }],
  },
  {
    id: 'lab-runner-review',
    kind: 'Review cycle · Oct 2026',
    title: 'AI reviewers finding real defects in an AI-built task runner',
    summary:
      'Two AI review agents examined a software package built by our developer agent. Their blocking findings were fixed and re-reviewed until the package was accepted.',
    happened: [
      'The package is a service on our agent server that takes owner-approved tasks one at a time, runs them through the existing verification chain and reports the results to the project board.',
      'In each review session one agent reviewed the package and a second agent checked that review. The owner signed each review period before it ran; the system verifies that signature before anything starts.',
      'The reviewers found real defects, for example: a result whose evidence did not match was still counted as reported; in a period with several tasks, only the first task was reported; one task’s report could mark another task’s card as done without its evidence.',
      'After each rejected round the developer agent fixed every blocking finding, rebuilt, re-tested and resubmitted with the earlier reviews and a resolution table. One table overstated what was included, and the reviewers caught it.',
      'The same day, after owner approval, the package was installed and switched on. The first unattended period ran three small tasks, each accepted by the reviewing agent, with no one stepping in.',
    ],
    facts: [
      { label: 'Review rounds', value: '5' },
      { label: 'Review sessions', value: '9' },
      { label: 'Rejected with blocking findings', value: '6 · all resolved' },
      { label: 'Accepted', value: 'Round 5' },
    ],
    limits:
      'The reviewers and the developer are AI models; the developer made the fixes, not the reviewers. Both reviewing agents ran the same model from the same provider, so this is not independent review.',
    services: [
      { name: 'Agent Verification Review', id: 'agent-verification-review' },
      { name: 'EVA Business Workflows', id: 'eva-business-workflows' },
    ],
  },
  {
    id: 'lab-performance',
    kind: 'Measured production run · Oct 2026',
    title: 'Evidence sync: about 16 minutes to under 5',
    summary:
      'Our evidence archive sync was slowing down as it grew. A bounded change, reviewed and tested before installation, cut a full run from about 16 minutes to 4 minutes 50 seconds.',
    happened: [
      'The sync publishes our evidence archive and checks every referenced file before it publishes the new index. Measured cause of the slowdown: more than 3,600 file checks ran one after another.',
      'The change runs up to four checks in parallel under the same verification rules; nothing is published if any check fails.',
      'A reviewer from a different AI provider read the change and raised seven points, chiefly a risk that parallel checks could refresh the shared login at the same time. The developer serialised that refresh, added tests, and the reviewer accepted. The reviewer inspected the code and test evidence but did not run the tests.',
      'Installation followed tests on the production machine, with the previous version kept for rollback. During testing an existing test was found faulty — it failed for the old and the new version alike; it was documented and a corrected copy was used.',
    ],
    facts: [
      { label: 'Before → after', value: '≈ 16 min → 4 min 50 s' },
      { label: 'Speed-up', value: '3.3×' },
      { label: 'File references checked', value: '3,678' },
      { label: 'Errors', value: '0' },
    ],
    limits:
      'One live run measured at the time of writing; four parallel checks approved, higher concurrency not yet approved. No authentication or rate-limit errors appeared in that run; behaviour under provider rate limits has not been measured.',
    services: [{ name: 'Agent Verification Review', id: 'agent-verification-review' }],
  },
]

const TITLE = 'Services | EVE Verified'
const DESCRIPTION =
  'Agent Verification Review, Pilot Partnerships and EVA Business Workflows. Bounded engagements with a fixed scope and a fixed deliverable.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    url: 'https://eveverified.com/services',
    siteName: 'EVE Verified',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EVE Verified' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
}

// Shared class fragments (palette only).
const serif = 'font-[family-name:var(--ev-font-serif)]'
const mono = 'font-[family-name:var(--ev-font-mono)]'
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ev-accent)]'
const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8'
const label = `${mono} text-[11px] font-medium uppercase tracking-[0.16em]`
const btnDark = `inline-flex items-center gap-2 rounded-sm border border-[var(--ev-border-strong)] bg-[var(--ev-ink)] px-5 py-3 text-sm font-semibold text-[var(--ev-on-ink)] transition-colors hover:opacity-90 ${focus}`
const btnLight = `inline-flex items-center gap-2 rounded-sm bg-[var(--ev-on-ink)] px-5 py-3 text-sm font-semibold text-[var(--ev-ink)] transition-colors hover:opacity-90 ${focus}`

function Marker() {
  return <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-[var(--ev-accent)]" />
}

function NamedList({ items }: { items: NamedItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.name} className="flex gap-3 text-[15px] leading-relaxed">
          <Marker />
          <span>
            <span className="font-semibold">{item.name}</span>: {item.description}
          </span>
        </li>
      ))}
    </ul>
  )
}

function SectionHead({ index, kicker, title }: { index: string; kicker: string; title: string }) {
  return (
    <Reveal className="mb-10 grid gap-4 border-t border-[var(--ev-rule)] pt-6 md:grid-cols-[120px_1fr]">
      <div className={`${mono} text-sm text-[var(--ev-text)]`}>{index}</div>
      <div>
        <p className={label}>{kicker}</p>
        <WordReveal text={title} className={`${serif} mt-3 text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-[42px]`} />
      </div>
    </Reveal>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--ev-ink)]">
      <Navigation />

      <div className="font-[family-name:var(--ev-font-sans)] text-[var(--ev-text)] antialiased">
        {/* Hero - pinned verification chain (v1.7 section K) */}
        <HeroChain
          chain={chain}
          caption="Each transition is inspected on its own. Evidence does not establish a claim by itself, and authorization is not proof that the action occurred."
          intro={
            <div>
              <p className={`${label} text-[var(--ev-on-ink-muted)]`}>EVE Verified / Services</p>
              <h1
                className={`${serif} mt-6 text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[56px] lg:text-[68px]`}
              >
                Can you prove your AI agent was{' '}
                <span className="text-[var(--ev-accent)]">authorized to act?</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ev-on-ink-muted)]">
                Bounded engagements with a fixed scope and a fixed deliverable.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="/contact" className={btnLight}>
                  Discuss an engagement <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#services"
                  className={`text-sm font-semibold text-[var(--ev-on-ink)] underline decoration-[var(--ev-accent)] decoration-2 underline-offset-[6px] hover:decoration-[var(--ev-on-ink)] ${focus}`}
                >
                  See the three services
                </a>
              </div>
              <div className="mt-8">
                <ThemeSwitch />
              </div>
            </div>
          }
        />

        {/* Branch overview - horizontal track on desktop (v1.7 section K) */}
        <BranchesTrack branches={branches} />

        {/* 01 Agent Verification Review */}
        <section id="agent-verification-review" className="scroll-mt-20 bg-[var(--ev-bg)] pb-24">
          <div className={wrap}>
            <SectionHead
              index="01"
              kicker="Version-bound technical review"
              title="Agent Verification Review"
            />
            <div className="grid gap-x-4 gap-y-12 md:grid-cols-[120px_1fr]">
              <div aria-hidden="true" className="hidden md:block" />
              <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="text-lg leading-relaxed">
                    We examine how a defined system, workflow or integration actually behaves, and
                    deliver documented, verifiable results. Our focus is AI agents, agent
                    integrations and the evidence behind verification claims.
                  </p>

                  <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-l-4 border-[var(--ev-accent)] pl-5">
                    <span className={`${serif} text-[32px] font-semibold leading-none`}>From €4,500</span>
                    <span className="text-[15px]">depending on scope</span>
                  </div>

                  <h3 className={`${label} mt-12`}>Review areas include:</h3>
                  <div className="mt-5">
                    <NamedList items={reviewAreas} />
                  </div>

                  <h3 className={`${label} mt-12`}>Every engagement includes:</h3>
                  <div className="mt-5">
                    <NamedList items={engagementContents} />
                  </div>

                  <a href="/contact" className={`${btnDark} mt-10`}>
                    Discuss an engagement <span aria-hidden="true">→</span>
                  </a>
                </div>

                {/* Evidence card: structure of the written review, no values */}
                <aside aria-labelledby="report-structure" className="self-start">
                  <div className="border border-[var(--ev-border-strong)] bg-[var(--ev-surface)]">
                    <div className="ev-ink flex items-center justify-between border-b border-[var(--ev-border-strong)] bg-[var(--ev-ink)] px-5 py-3">
                      <p id="report-structure" className={`${label} text-[var(--ev-on-ink)]`}>
                        Written review
                      </p>
                      <span aria-hidden="true" className="h-2 w-2 bg-[var(--ev-accent)]" />
                    </div>
                    <dl className="divide-y divide-[var(--ev-border)]">
                      {reportFields.map((f, i) => (
                        <div key={f} className="flex items-baseline gap-4 px-5 py-3">
                          <dt className={`${mono} w-6 shrink-0 text-xs`}>{String(i + 1).padStart(2, '0')}</dt>
                          <dd className="text-[15px]">{f}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">
                    The structure every report follows. Findings are separated from
                    interpretation.
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Pilot Partnerships */}
        <section id="pilot-partnerships" className="scroll-mt-20 bg-[var(--ev-bg-alt)] py-24">
          <div className={wrap}>
            <SectionHead index="02" kicker="Pilot partners wanted" title="Pilot Partnerships" />
            <div className="grid gap-x-4 gap-y-12 md:grid-cols-[120px_1fr]">
              <div aria-hidden="true" className="hidden md:block" />
              <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className={`${serif} text-[28px] font-semibold leading-snug`}>
                    Building AI agents? Let&apos;s verify their boundaries.
                  </p>
                  <p className="mt-6 text-lg leading-relaxed">
                    EVE Verified is seeking a limited number of pilot partners developing AI agents,
                    MCP integrations and automated workflows.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed">
                    Together, we&apos;ll examine agent authority, evidence integrity and verifiable
                    handoffs — with clearly defined scope, documented findings and explicit
                    limitations.
                  </p>
                  <a href="/contact" className={`${btnDark} mt-10`}>
                    Apply for a pilot <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="self-start border border-dashed border-[var(--ev-border-strong)] p-6">
                  <ul className="space-y-3 text-[15px]">
                    {[
                      'Scoped technical engagements',
                      'Remote collaboration',
                      'International partners',
                      'Scope and pricing agreed per partnership',
                    ].map((t) => (
                      <li key={t} className="flex gap-3">
                        <Marker />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 EVA Business Workflows */}
        <section id="eva-business-workflows" className="scroll-mt-20 bg-[var(--ev-bg)] py-24">
          <div className={wrap}>
            <SectionHead
              index="03"
              kicker="Custom development and qualification"
              title="EVA Business Workflows"
            />
            <div className="grid gap-x-4 gap-y-12 md:grid-cols-[120px_1fr]">
              <div aria-hidden="true" className="hidden md:block" />
              <div>
                <p className="max-w-3xl text-lg leading-relaxed">
                  We develop and qualify agent-based workflows together with your team, with human
                  approval where it is needed. Typical starting points:
                </p>
                <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {workflowExamples.map((w) => (
                    <li
                      key={w}
                      className="flex min-h-[96px] flex-col justify-between border border-[var(--ev-border)] p-5"
                    >
                      <span aria-hidden="true" className="h-1 w-6 bg-[var(--ev-accent)]" />
                      <span className={`${serif} mt-4 text-xl font-semibold`}>{w}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 max-w-3xl border-l-4 border-[var(--ev-border-strong)] bg-[var(--ev-callout)] px-5 py-4 text-[15px] leading-relaxed">
                  <span className="font-semibold">Scope boundary:</span> this is custom development
                  and qualification, not a ready-made automation platform. A workflow is relied on
                  only after it has been qualified against the agreed scope.
                </div>
                <a href="/contact" className={`${btnDark} mt-10`}>
                  Discuss a workflow <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EVE Verified Lab - v1.6 section J. Every statement maps to a registered
            Atlas record (section J2). No internal ids, paths, hosts, hashes,
            costs or model ids are published. */}
        <section id="lab" className="scroll-mt-20 border-t border-[var(--ev-border)] bg-[var(--ev-bg)] py-24">
          <div className={wrap}>
            <SectionHead index="Lab" kicker="EVE Verified Lab" title="Engineering intelligence. Verified results." />
            <div className="grid gap-x-4 gap-y-12 md:grid-cols-[120px_1fr]">
              <div aria-hidden="true" className="hidden md:block" />
              <div>
                <p className="max-w-3xl text-lg leading-relaxed">
                  Work we run on our own systems, documented the same way we document client reviews:
                  every figure below comes from a recorded run.
                </p>

                <div className="mt-12 space-y-10">
                  {labCases.map((c) => (
                    <ClipReveal key={c.id}>
                    <article
                      id={c.id}
                      aria-labelledby={`${c.id}-title`}
                      className="scroll-mt-24 border border-[var(--ev-border-strong)] bg-[var(--ev-surface)]"
                    >
                      <div className="ev-ink flex items-center justify-between gap-4 border-b border-[var(--ev-border-strong)] bg-[var(--ev-ink)] px-6 py-3">
                        <p className={`${label} text-[var(--ev-on-ink)]`}>{c.kind}</p>
                        <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-[var(--ev-accent)]" />
                      </div>
                      <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.45fr_1fr]">
                        <div>
                          <h3
                            id={`${c.id}-title`}
                            className={`${serif} text-[26px] font-semibold leading-snug md:text-[30px]`}
                          >
                            {c.title}
                          </h3>
                          <p className="mt-4 text-[17px] leading-relaxed">{c.summary}</p>

                          {c.flow && (
                            <figure className="mt-6">
                              <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                                {c.flow.map((step, i) => (
                                  <li key={step} className="flex items-center gap-2">
                                    <span
                                      className={`${mono} border px-2.5 py-1 text-[12px] uppercase tracking-[0.1em] ${
                                        i === c.flow!.length - 1
                                          ? 'border-[var(--ev-border-strong)] bg-[var(--ev-ink)] text-[var(--ev-on-ink)]'
                                          : 'border-[var(--ev-border-strong)]'
                                      }`}
                                    >
                                      {step}
                                    </span>
                                    {i < c.flow!.length - 1 && (
                                      <span aria-hidden="true" className="text-[var(--ev-accent)]">
                                        →
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ol>
                              {c.flowNote && (
                                <figcaption className="mt-3 text-sm leading-relaxed">{c.flowNote}</figcaption>
                              )}
                            </figure>
                          )}

                          <h4 className={`${label} mt-8`}>What happened</h4>
                          <ul className="mt-4 space-y-3">
                            {c.happened.map((p) => (
                              <li key={p} className="flex gap-3 text-[15px] leading-relaxed">
                                <Marker />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col">
                          <h4 className={label}>Measured result</h4>
                          <dl className="mt-4 grid grid-cols-2 gap-px border border-[var(--ev-border)] bg-[var(--ev-border)]">
                            {c.facts.map((f) => (
                              <div key={f.label} className="bg-[var(--ev-surface)] p-4">
                                <dt className="text-[13px] leading-snug">{f.label}</dt>
                                <dd className={`${serif} mt-2 text-xl font-semibold leading-snug`}>
                                  <CountUp value={f.value} />
                                </dd>
                              </div>
                            ))}
                          </dl>

                          <div className="mt-6 border-l-4 border-[var(--ev-border-strong)] bg-[var(--ev-callout)] px-5 py-4 text-[15px] leading-relaxed">
                            <span className="font-semibold">Limits:</span> {c.limits}
                          </div>

                          <div className="mt-6">
                            <p className={label}>Related service</p>
                            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                              {c.services.map((s) => (
                                <li key={s.id}>
                                  <a
                                    href={`#${s.id}`}
                                    className={`text-[15px] font-semibold underline decoration-[var(--ev-accent)] decoration-2 underline-offset-[6px] hover:decoration-[var(--ev-text)] ${focus}`}
                                  >
                                    {s.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </article>
                    </ClipReveal>
                  ))}
                </div>

                <p className="mt-12 max-w-3xl text-lg leading-relaxed">
                  Want the same method applied to your agents, integrations or workflows?
                </p>
                <a href="/contact" className={`${btnDark} mt-6`}>
                  Discuss an engagement <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Public technical work - verbatim from v1.4 section H */}
        <section className="ev-ink bg-[var(--ev-ink)] py-24 text-[var(--ev-on-ink)]">
          <div className={`${wrap} grid gap-10 md:grid-cols-[120px_1fr]`}>
            <p className={`${label} text-[var(--ev-on-ink-muted)]`}>Public record</p>
            <div className="max-w-3xl">
              <h2 className={`${serif} text-3xl font-semibold leading-tight md:text-[42px]`}>
                Public technical work
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[var(--ev-on-ink-muted)]">
                EVE Verified has submitted public technical comments on the Proof-of-Control working
                draft at Linux Foundation Decentralized Trust.
              </p>
              <p className="mt-6 text-[17px] leading-relaxed text-[var(--ev-on-ink-muted)]">Our contributions include:</p>
              <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-[var(--ev-on-ink-muted)]">
                <li className="flex gap-3">
                  <Marker />
                  <span>
                    <span className="font-semibold text-[var(--ev-on-ink)]">Verification scope</span>: a
                    proposal for machine-readable disclosure of what a verification result does and
                    does not assess, including NOT_ASSESSED for content outside the verified scope.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Marker />
                  <span>
                    <span className="font-semibold text-[var(--ev-on-ink)]">Evidence integrity</span>: a
                    reproducible analysis showing that a fail-closed refusal and an omitted record
                    produce identical results from the published verifier, at a pinned commit of the
                    reference implementation.
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-[17px] leading-relaxed text-[var(--ev-on-ink-muted)]">
                {"Comment #77 is listed in the working group's public-comment register as an open item for the working group to take up. These contributions show our approach to evidence-based technical review."}
              </p>
              <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {publicWorkLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mono} text-sm text-[var(--ev-on-ink)] underline decoration-[var(--ev-accent)] decoration-2 underline-offset-[6px] hover:decoration-[var(--ev-on-ink)] ${focus}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-[var(--ev-on-ink-muted)]">
                These are public technical contributions, not certifications, endorsements,
                organizational membership claims or adopted standard requirements.
              </p>
            </div>
          </div>
        </section>

        {/* How an engagement works - verbatim from v1.4 section H */}
        <section className="bg-[var(--ev-bg)] py-24">
          <div className={wrap}>
            <SectionHead index="—" kicker="Process" title="How an engagement works" />
            <ol className="grid gap-px border border-[var(--ev-border)] bg-[var(--ev-border)] md:ml-[120px] md:grid-cols-3">
              {[
                ['Scope', 'we agree in writing on the system, the questions and the deliverable.'],
                ['Work', 'stays inside the agreed scope.'],
                ['Delivery', 'a documented result with reproducible evidence.'],
              ].map(([name, text], i) => (
                <li key={name} className="bg-[var(--ev-surface)] p-6">
                  <span className={`${mono} text-sm`}>{`0${i + 1}`}</span>
                  <p className="mt-3 text-[15px] leading-relaxed">
                    <span className={`${serif} text-xl font-semibold`}>{name}:</span> {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What this is not - verbatim from v1.4 section H */}
        <section className="bg-[var(--ev-bg)] pb-24">
          <div className={wrap}>
            <SectionHead index="—" kicker="Limitations" title="What this is not" />
            <ul className="space-y-3 md:ml-[120px]">
              {[
                'Not a certification, audit opinion or compliance attestation.',
                'Not a guarantee that a system is free of defects.',
                'Each engagement covers the agreed scope only.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[17px] leading-relaxed">
                  <Marker />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="ev-ink border-t-4 border-[var(--ev-accent)] bg-[var(--ev-ink)] py-20 text-[var(--ev-on-ink)]">
          <div className={`${wrap} flex flex-col items-start justify-between gap-8 md:flex-row md:items-center`}>
            <p className={`${serif} max-w-2xl text-3xl font-semibold leading-tight md:text-[40px]`}>
              Start with a scoped conversation.
            </p>
            <a href="/contact" className={btnLight}>
              Discuss an engagement <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
