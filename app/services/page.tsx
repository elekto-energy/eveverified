import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.5 section I (supersedes the
// v1.4 section H layout of this page; H's verbatim copy is reused where listed).
//
// Visual identity "Evidence Systems" is scoped to this route. Colours are the
// owner palette only. Contrast rule (WCAG 2.1, measured): body text is always
// Graphite on Ivory/Sand or Ivory/Sand on Graphite. Signal Orange is used only
// for non-text marks and for text at 24px and larger. Olive Grey is used only
// for rules and borders.

// Palette: Signal Orange #D95724, Warm Ivory #F3ECDD, Graphite #282A27,
// Olive Grey #777868, Sand #D3C6AD (used as Tailwind arbitrary values below).

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
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D95724]'
const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8'
const label = `${mono} text-[11px] font-medium uppercase tracking-[0.16em]`
const btnDark = `inline-flex items-center gap-2 rounded-sm bg-[#282A27] px-5 py-3 text-sm font-semibold text-[#F3ECDD] transition-colors hover:bg-black ${focus}`
const btnLight = `inline-flex items-center gap-2 rounded-sm bg-[#F3ECDD] px-5 py-3 text-sm font-semibold text-[#282A27] transition-colors hover:bg-white ${focus}`

function Marker() {
  return <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-[#D95724]" />
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
    <div className="mb-10 grid gap-4 border-t border-[#777868] pt-6 md:grid-cols-[120px_1fr]">
      <div className={`${mono} text-sm text-[#282A27]`}>{index}</div>
      <div>
        <p className={label}>{kicker}</p>
        <h2 className={`${serif} mt-3 text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-[42px]`}>
          {title}
        </h2>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#282A27]">
      <Navigation />

      <div className="font-[family-name:var(--ev-font-sans)] text-[#282A27] antialiased">
        {/* Hero */}
        <section className="bg-[#282A27] pb-20 pt-32 text-[#F3ECDD] md:pb-28 md:pt-40">
          <div className={`${wrap} grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:items-end`}>
            <div>
              <p className={`${label} text-[#D3C6AD]`}>EVE Verified / Services</p>
              <h1
                className={`${serif} mt-6 text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[56px] lg:text-[68px]`}
              >
                Can you prove your AI agent was{' '}
                <span className="text-[#D95724]">authorized to act?</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#D3C6AD]">
                Bounded engagements with a fixed scope and a fixed deliverable.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="/contact" className={btnLight}>
                  Discuss an engagement <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#services"
                  className={`text-sm font-semibold text-[#F3ECDD] underline decoration-[#D95724] decoration-2 underline-offset-[6px] hover:decoration-[#F3ECDD] ${focus}`}
                >
                  See the three services
                </a>
              </div>
            </div>

            {/* Verification chain inside a scope boundary */}
            <figure className="relative">
              <div className="rounded-sm border border-dashed border-[#777868] p-6 sm:p-8">
                <p className={`${label} absolute -top-2.5 left-5 bg-[#282A27] px-2 text-[#D3C6AD]`}>
                  Agreed scope
                </p>
                <ol className="relative space-y-3">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-[7px] top-3 w-px bg-[#777868]"
                  />
                  {chain.map((stage, i) => (
                    <li key={stage} className="relative flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className={`relative z-10 h-[15px] w-[15px] shrink-0 border-2 ${
                          i === chain.length - 1
                            ? 'border-[#D95724] bg-[#D95724]'
                            : 'border-[#D3C6AD] bg-[#282A27]'
                        }`}
                      />
                      <span className={`${mono} text-[13px] uppercase tracking-[0.12em] text-[#F3ECDD]`}>
                        {stage}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-[#D3C6AD]">
                Each transition is inspected on its own. Evidence does not establish a claim by
                itself, and authorization is not proof that the action occurred.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Branch overview */}
        <section id="services" className="scroll-mt-20 bg-[#F3ECDD] py-20 md:py-24">
          <div className={wrap}>
            <p className={label}>Three service branches</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {branches.map((b) => (
                <a
                  key={b.id}
                  href={`#${b.id}`}
                  className={`group flex flex-col border border-[#D3C6AD] bg-[#F3ECDD] p-6 transition-colors hover:border-[#282A27] ${focus}`}
                >
                  <span aria-hidden="true" className="mb-6 h-1 w-10 bg-[#D95724]" />
                  <span className={`${mono} text-sm`}>{b.index}</span>
                  <span className={`${serif} mt-2 text-2xl font-semibold leading-snug`}>{b.name}</span>
                  <span className="mt-3 flex-1 text-[15px] leading-relaxed">{b.line}</span>
                  <span className="mt-6 text-sm font-semibold underline decoration-[#D95724] decoration-2 underline-offset-[6px] group-hover:decoration-[#282A27]">
                    Details <span aria-hidden="true">↓</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 01 Agent Verification Review */}
        <section id="agent-verification-review" className="scroll-mt-20 bg-[#F3ECDD] pb-24">
          <div className={wrap}>
            <SectionHead
              index="01"
              kicker="Version-bound technical review"
              title="Agent Verification Review"
            />
            <div className="grid gap-12 md:grid-cols-[120px_1fr]">
              <div aria-hidden="true" className="hidden md:block" />
              <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="text-lg leading-relaxed">
                    We examine how a defined system, workflow or integration actually behaves, and
                    deliver documented, verifiable results. Our focus is AI agents, agent
                    integrations and the evidence behind verification claims.
                  </p>

                  <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-l-4 border-[#D95724] pl-5">
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
                  <div className="border border-[#282A27] bg-[#F3ECDD]">
                    <div className="flex items-center justify-between border-b border-[#282A27] bg-[#282A27] px-5 py-3">
                      <p id="report-structure" className={`${label} text-[#F3ECDD]`}>
                        Written review
                      </p>
                      <span aria-hidden="true" className="h-2 w-2 bg-[#D95724]" />
                    </div>
                    <dl className="divide-y divide-[#D3C6AD]">
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
        <section id="pilot-partnerships" className="scroll-mt-20 bg-[#D3C6AD] py-24">
          <div className={wrap}>
            <SectionHead index="02" kicker="Pilot partners wanted" title="Pilot Partnerships" />
            <div className="grid gap-12 md:grid-cols-[120px_1fr]">
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
                <div className="self-start border border-dashed border-[#282A27] p-6">
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
        <section id="eva-business-workflows" className="scroll-mt-20 bg-[#F3ECDD] py-24">
          <div className={wrap}>
            <SectionHead
              index="03"
              kicker="Custom development and qualification"
              title="EVA Business Workflows"
            />
            <div className="grid gap-12 md:grid-cols-[120px_1fr]">
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
                      className="flex min-h-[96px] flex-col justify-between border border-[#D3C6AD] p-5"
                    >
                      <span aria-hidden="true" className="h-1 w-6 bg-[#D95724]" />
                      <span className={`${serif} mt-4 text-xl font-semibold`}>{w}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 max-w-3xl border-l-4 border-[#282A27] bg-[#D3C6AD]/40 px-5 py-4 text-[15px] leading-relaxed">
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

        {/* Public technical work - verbatim from v1.4 section H */}
        <section className="bg-[#282A27] py-24 text-[#F3ECDD]">
          <div className={`${wrap} grid gap-10 md:grid-cols-[120px_1fr]`}>
            <p className={`${label} text-[#D3C6AD]`}>Public record</p>
            <div className="max-w-3xl">
              <h2 className={`${serif} text-3xl font-semibold leading-tight md:text-[42px]`}>
                Public technical work
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[#D3C6AD]">
                EVE Verified has submitted public technical comments on the Proof-of-Control working
                draft at Linux Foundation Decentralized Trust.
              </p>
              <p className="mt-6 text-[17px] leading-relaxed text-[#D3C6AD]">Our contributions include:</p>
              <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-[#D3C6AD]">
                <li className="flex gap-3">
                  <Marker />
                  <span>
                    <span className="font-semibold text-[#F3ECDD]">Verification scope</span>: a
                    proposal for machine-readable disclosure of what a verification result does and
                    does not assess, including NOT_ASSESSED for content outside the verified scope.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Marker />
                  <span>
                    <span className="font-semibold text-[#F3ECDD]">Evidence integrity</span>: a
                    reproducible analysis showing that a fail-closed refusal and an omitted record
                    produce identical results from the published verifier, at a pinned commit of the
                    reference implementation.
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-[17px] leading-relaxed text-[#D3C6AD]">
                {"Comment #77 is listed in the working group's public-comment register as an open item for the working group to take up. These contributions show our approach to evidence-based technical review."}
              </p>
              <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {publicWorkLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mono} text-sm text-[#F3ECDD] underline decoration-[#D95724] decoration-2 underline-offset-[6px] hover:decoration-[#F3ECDD] ${focus}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-[#D3C6AD]">
                These are public technical contributions, not certifications, endorsements,
                organizational membership claims or adopted standard requirements.
              </p>
            </div>
          </div>
        </section>

        {/* How an engagement works - verbatim from v1.4 section H */}
        <section className="bg-[#F3ECDD] py-24">
          <div className={wrap}>
            <SectionHead index="—" kicker="Process" title="How an engagement works" />
            <ol className="grid gap-px border border-[#D3C6AD] bg-[#D3C6AD] md:ml-[120px] md:grid-cols-3">
              {[
                ['Scope', 'we agree in writing on the system, the questions and the deliverable.'],
                ['Work', 'stays inside the agreed scope.'],
                ['Delivery', 'a documented result with reproducible evidence.'],
              ].map(([name, text], i) => (
                <li key={name} className="bg-[#F3ECDD] p-6">
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
        <section className="bg-[#F3ECDD] pb-24">
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
        <section className="border-t-4 border-[#D95724] bg-[#282A27] py-20 text-[#F3ECDD]">
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
