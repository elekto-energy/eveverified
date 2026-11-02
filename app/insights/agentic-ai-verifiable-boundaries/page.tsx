import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Reveal, WordReveal } from '../../services/ServicesMotion'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.8 section L.
// Source of the copy: owner draft DRAFT_EVE_CETAS_VERIFIABLE_BOUNDARIES_ARTICLE_2026-11-02
// (Atlas 02_ACTIVE_WORK). Statements about CETaS were checked by the owner against the
// original PDF; statements about EVE were checked against registered Atlas records
// (section L2). CETaS is cited as a source only - no collaboration or endorsement.

const URL = 'https://eveverified.com/insights/agentic-ai-verifiable-boundaries'
const TITLE = 'Agentic AI Needs More Than Oversight. It Needs Verifiable Boundaries.'
const DESC =
  'What new research from The Alan Turing Institute reveals about the challenge of governing autonomous AI agents — and what we are learning by building EVE.'
const PUBLISHED = '2026-11-02'
const CETAS_URL =
  'https://cetas.turing.ac.uk/publications/behavioural-assurance-agentic-ai-sensitive-and-high-stakes-organisations'
const PAPER = 'Behavioural Assurance of Agentic AI for Sensitive and High-Stakes Organisations'

export const metadata: Metadata = {
  title: `${TITLE} | EVE Verified`,
  description: DESC,
  authors: [{ name: 'EVE Verified' }],
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: URL,
    siteName: 'EVE Verified',
    title: TITLE,
    description: DESC,
    publishedTime: `${PUBLISHED}T00:00:00Z`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EVE Verified' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og-image.png'] },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESC,
  url: URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en',
  author: { '@type': 'Organization', name: 'EVE Verified' },
  publisher: { '@type': 'Organization', name: 'Organiq Sweden AB' },
  citation: {
    '@type': 'Report',
    name: PAPER,
    author: [
      { '@type': 'Person', name: 'Rick Hennessy' },
      { '@type': 'Person', name: 'Carolyn Ashurst' },
    ],
    publisher: { '@type': 'Organization', name: 'Centre for Emerging Technology and Security, The Alan Turing Institute' },
    url: CETAS_URL,
  },
}

const serif = 'font-[family-name:var(--ev-font-serif)]'
const mono = 'font-[family-name:var(--ev-font-mono)]'
const label = `${mono} text-[11px] font-medium uppercase tracking-[0.16em]`
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ev-accent)]'
const col = 'mx-auto w-full max-w-[44rem] px-5 sm:px-8'
const p = 'mt-5 text-[18px] leading-[1.75]'
const h2 = `${serif} mt-16 text-[30px] font-semibold leading-tight tracking-[-0.01em] md:text-[36px]`

function Marker() {
  return <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-[var(--ev-accent)]" />
}

const phases = [
  {
    name: 'Before',
    q: 'Was the proposed action supported by the required evidence and authorised under the applicable mandate?',
  },
  {
    name: 'During',
    q: 'Do observations made during execution remain consistent with the governing contract?',
  },
  {
    name: 'After',
    q: 'What evidence exists of the actual outcome, and can the resulting record and handoff be verified?',
  },
]

const establish = [
  'Which mandate authorised a specific action.',
  'Which inputs, evidence and policy versions were in scope.',
  'Which agent produced an output and which agent reviewed it.',
  'Whether the reviewer examined the exact submitted artefacts.',
  'Which deterministic checks passed, failed or were not performed.',
  'Whether an observed deviation required escalation.',
  'Whether an authorised human made the consequential decision.',
  'Whether the resulting evidence record has remained intact.',
]

// "What we have demonstrated" - each sentence mapped to registered Atlas records in
// WEB_RELEASE_MODEL v1.8 section L2.
const demonstrated: string[] = [
  "We have used OpenClaw- and Hermes-based agents in owner-approved, budget- and time-bounded development and review runs. In these runs EVE's verified-handoff check ran inside the execution chain: before each receiving agent was started, it checked the handoff package against its recorded identity and scope and admitted it only once. These runs were tested by the team that built them and have not been independently verified.",
  'We have demonstrated owner-signed work periods, recorded reviewer decisions and handoffs linked to their evidence, with outcomes marked CHAIN_VERIFIED by our chain verifier. CHAIN_VERIFIED means the recorded chain of handoffs and evidence is complete and consistent within that verifier\'s defined checks; it is not a statement that the delivered code is correct, and it has not been independently verified.',
]

const limitations: string[] = [
  'A reviewer\'s rejection does not depend on pinpointing every defect. In our runs a rejection could rest on an unmet acceptance criterion, such as a failing server build. In one recorded run the reviewer rejected correctly but repeated an imprecise defect location from the developer\'s own notes, so we do not claim the reviewer found the defect on its own.',
  'If an agent run is interrupted, its cost may not be recorded reliably. We found this by code analysis rather than from a production incident. Our design treats any unrecorded cost as unknown and stops further runs until a person has reviewed it; a stricter turn-level journal has been tested in isolation and is under qualification. Cost figures from agent frameworks are estimates, not provider invoices.',
  'We do not treat the exit of a command-line client as evidence that an agent\'s work has stopped. Source-code analysis and isolated tests of the agent runtime we use showed that a separate gateway process can continue a turn after its client has returned, so end-of-work must be established at an execution boundary the platform controls.',
]

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-[var(--ev-ink)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />

      <div className="font-[family-name:var(--ev-font-sans)] text-[var(--ev-text)] antialiased">
        {/* Header */}
        <header className="ev-ink bg-[var(--ev-ink)] pb-20 pt-32 text-[var(--ev-on-ink)] md:pb-24 md:pt-40">
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
            <p className={`${label} text-[var(--ev-on-ink-muted)]`}>
              <a href="/insights" className={`hover:text-[var(--ev-on-ink)] ${focus}`}>
                Insights
              </a>{' '}
              / Research &amp; Perspectives
            </p>
            <h1
              className={`${serif} mt-6 max-w-4xl text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[52px] lg:text-[60px]`}
            >
              Agentic AI Needs More Than Oversight.{' '}
              <span className="text-[var(--ev-accent)]">It Needs Verifiable Boundaries.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ev-on-ink-muted)]">{DESC}</p>
            <p className={`${mono} mt-8 text-[13px] text-[var(--ev-on-ink-muted)]`}>
              EVE Verified · <time dateTime={PUBLISHED}>2 November 2026</time>
            </p>
          </div>
        </header>

        <article className="bg-[var(--ev-bg)] pb-24 pt-16">
          <div className={col}>
            <p className={`${p} mt-0 text-[20px]`}>
              In September 2026, researchers Rick Hennessy and Carolyn Ashurst published{' '}
              <a
                href={CETAS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`italic underline decoration-[var(--ev-accent)] decoration-2 underline-offset-4 ${focus}`}
              >
                {PAPER}
              </a>{' '}
              through the Centre for Emerging Technology and Security (CETaS) at The Alan Turing Institute.
            </p>
            <p className={p}>
              The paper identifies eight behavioural failure modes in agentic AI, including goal displacement,
              misreporting, policy-invisible violations, pseudo-corroboration, and failures emerging from
              interactions between multiple agents and humans.
            </p>
            <p className={p}>
              Its central message is important: evaluating an AI agent&apos;s final output is not enough.
              Organisations also need to understand how the agent behaved while producing it.
            </p>
            <p className={p}>
              That distinction is becoming increasingly important as AI agents move from answering questions to
              executing tasks, accessing systems, modifying software, and collaborating with other agents.
            </p>
            <p className={p}>
              But it raises a practical question: how can an organisation establish that an autonomous agent acted
              within its authorised boundaries — rather than simply trusting the agent&apos;s account of what
              happened?
            </p>

            <WordReveal text="A reviewer is not the same as a verifier" className={h2} />
            <p className={p}>
              Imagine two AI agents working together. Agent A develops a software change. Agent B reviews it and
              reports that the change is acceptable.
            </p>
            <p className={p}>
              This is useful. It can improve quality and catch mistakes. But what does Agent B&apos;s approval
              actually establish?
            </p>
            <p className={p}>
              Did both agents review the same version of the files? Were the acceptance criteria unchanged? Did the
              developer operate within its assigned mandate? Were any required checks skipped? And could both agents
              have relied on the same incorrect assumption?
            </p>
            <p className={p}>
              The CETaS paper describes one important failure mode as <em>pseudo-corroboration</em>: multiple AI
              systems appearing to independently confirm a conclusion when their agreement reflects shared
              assumptions or correlated errors.
            </p>
            <p className={p}>Adding a second model does not automatically create independent assurance.</p>
          </div>

          {/* Pull quote */}
          <Reveal className="mx-auto my-16 w-full max-w-4xl px-5 sm:px-8">
            <blockquote className="border-l-4 border-[var(--ev-accent)] py-2 pl-6 sm:pl-10">
              <p className={`${serif} text-[30px] font-semibold leading-snug md:text-[40px]`}>
                Agreement between agents is an observation. Verification requires evidence and explicit checks.
              </p>
            </blockquote>
          </Reveal>

          <div className={col}>
            <WordReveal text="The missing boundary between intention and action" className={`${h2} mt-0`} />
            <p className={p}>
              An organisation might instruct an agent to update a service, investigate an incident, or prepare a
              compliance assessment.
            </p>
            <p className={p}>
              The instruction expresses an intention. The agent&apos;s output expresses a claimed result. Between
              those two points lies a sequence of actions, decisions, tool calls, dependencies, permissions, and
              potentially changing circumstances.
            </p>
            <p className={p}>
              This is where governance becomes difficult. An agent can produce a technically correct output after
              taking an unauthorised action. It can follow visible instructions while missing a policy that was not
              available in its context. It can report success even when an important verification step was never
              completed.
            </p>
            <p className={p}>The CETaS research makes these risks explicit.</p>
            <p className={p}>We believe this points toward a necessary architectural separation:</p>
            <ol className="mt-6 space-y-3 border-y border-[var(--ev-border)] py-6">
              {[
                ['AI agents', 'perform work.'],
                ['A separate verification layer', 'evaluates the evidence and applicable authority boundaries.'],
                ['The execution environment', 'enforces the resulting permissions and restrictions.'],
              ].map(([a, b], i) => (
                <li key={a} className="flex gap-4 text-[18px] leading-relaxed">
                  <span className={`${mono} w-6 shrink-0 pt-1 text-sm`}>{`0${i + 1}`}</span>
                  <span>
                    <span className="font-semibold">{a}</span> {b}
                  </span>
                </li>
              ))}
            </ol>
            <p className={p}>These are distinct responsibilities.</p>

            <WordReveal text="Building EVE: verification rather than self-certification" className={h2} />
            <p className={p}>EVE — Evidence Verification Engine — is our work toward this separation.</p>
            <p className={p}>
              Its objective is not to replace AI agents, decide what they should think, or become another
              general-purpose orchestration framework. Instead, EVE is designed to make consequential agent activity
              attributable, bounded, and verifiable.
            </p>
            <p className={p}>Our architecture separates several questions.</p>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-5xl gap-px border border-[var(--ev-border)] bg-[var(--ev-border)] px-0 md:grid-cols-3">
            {phases.map((ph, i) => (
              <Reveal key={ph.name} delay={i * 0.08} className="bg-[var(--ev-surface)] p-7">
                <span aria-hidden="true" className="block h-1 w-10 bg-[var(--ev-accent)]" />
                <p className={`${label} mt-5`}>{ph.name}</p>
                <p className="mt-3 text-[17px] leading-relaxed">{ph.q}</p>
              </Reveal>
            ))}
          </div>

          <div className={col}>
            <p className={`${p} mt-10`}>
              These are not interchangeable checks. An authorised start does not prove compliant execution. A
              successful output does not establish that every intermediate action was permitted. And an intact
              cryptographic record does not establish that the underlying business decision was correct.
            </p>
            <p className={p}>EVE is designed to preserve these distinctions.</p>

            <WordReveal text="What we have demonstrated" className={h2} />
            {demonstrated.map((t) => (
              <p key={t} className={p}>
                {t}
              </p>
            ))}
            <p className={p}>We have also encountered real engineering limitations:</p>
            <ul className="mt-5 space-y-3">
              {limitations.map((t) => (
                <li key={t} className="flex gap-3 text-[18px] leading-[1.7]">
                  <Marker />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className={p}>
              We design agent execution on least privilege and credential isolation: an agent&apos;s tools should
              reach only the credentials and services its task requires, and a credential should never be readable
              from an agent&apos;s own working environment.
            </p>
            <p className={p}>
              These observations reinforce a central lesson: a verified handoff is not the same as verified execution
              isolation, and neither is equivalent to proof that an AI-generated conclusion is true.
            </p>
            <p className={p}>
              Our DURING v1 baseline defines contracts for conditions that must keep holding while an action runs,
              records observations pulled from declared sources, assesses whether each condition still holds, and
              links directives, acknowledgements and outcomes. It does not execute, stop or terminate agent actions;
              enforcement remains the responsibility of the surrounding execution environment. It is covered by its
              own test suite and has not yet been used in our agent runs.
            </p>
            <p className={p}>
              Our automated correction loop — in which failing machine-test results are fed back to the same agent
              for a small, fixed number of retries within its approved mandate — and the related execution hardening
              have been built and tested in isolation. They are under qualification and are not treated as
              production-proven capabilities.
            </p>
            <p className={p}>
              That distinction matters. A credible verification system must be equally capable of reporting what is
              not established.
            </p>

            <WordReveal text="Behavioural assurance needs technical evidence" className={h2} />
            <p className={p}>
              The CETaS paper argues that organisations should assess deployed agent behaviour, not models in
              isolation. We agree. But behavioural assurance becomes more operationally useful when its findings can
              be linked to reproducible evidence.
            </p>
            <p className={p}>For example, organisations should be able to establish:</p>
            <ul className="mt-5 space-y-3">
              {establish.map((t) => (
                <li key={t} className="flex gap-3 text-[18px] leading-[1.7]">
                  <Marker />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className={p}>
              These questions cannot all be answered reliably by asking the agent to describe its own behaviour. They
              require controls and evidence outside the agent&apos;s own narrative.
            </p>

            <WordReveal text="The next step is verifiable autonomy" className={h2} />
            <p className={p}>
              The emerging challenge is not merely to build agents that can complete longer tasks. It is to enable
              agents to work together while preserving meaningful human authority, reliable evidence, and enforceable
              execution boundaries.
            </p>
            <p className={p}>
              Behavioural research helps identify what can go wrong. Engineering must establish what can actually be
              checked.
            </p>
            <p className={p}>
              The objective of EVE is to connect these concerns: allowing agents to collaborate and adapt while making
              the limits of their authority, the evidence supporting their actions, and the history of their
              decisions independently inspectable.
            </p>
            <p className={p}>
              This is still an evolving engineering challenge. Not every proposed boundary has been fully qualified,
              and independent assurance requires more than a second agent agreeing with the first.
            </p>
            <p className={p}>
              But the direction is clear: the future of agentic AI should not depend on trusting agents to certify
              their own behaviour. It should depend on systems that make the relevant claims verifiable.
            </p>

            {/* Reference */}
            <section aria-labelledby="ref" className="mt-16 border border-[var(--ev-border-strong)]">
              <div className="ev-ink flex items-center justify-between bg-[var(--ev-ink)] px-5 py-3">
                <h2 id="ref" className={`${label} text-[var(--ev-on-ink)]`}>
                  Reference
                </h2>
                <span aria-hidden="true" className="h-2 w-2 bg-[var(--ev-accent)]" />
              </div>
              <div className="bg-[var(--ev-surface)] p-5 text-[16px] leading-relaxed">
                <p>
                  Rick Hennessy and Carolyn Ashurst,{' '}
                  <a
                    href={CETAS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`italic underline decoration-[var(--ev-accent)] decoration-2 underline-offset-4 ${focus}`}
                  >
                    {PAPER}
                  </a>
                  , Centre for Emerging Technology and Security (CETaS), The Alan Turing Institute, September 2026.
                </p>
                <p className="mt-3 text-[14px]">
                  EVE Verified is not affiliated with CETaS or The Alan Turing Institute. The paper is cited as a
                  source; its authors have not reviewed or endorsed EVE.
                </p>
              </div>
            </section>

            {/* About + contact */}
            <section aria-labelledby="about" className="mt-12">
              <h2 id="about" className={label}>
                About EVE
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed">
                EVE (Evidence Verification Engine) is an engineering initiative focused on verifiable autonomy
                boundaries, evidence-bound agent handoffs, and the separation of AI execution, verification, and
                human decision authority.
              </p>
              <p className="mt-6 text-[16px] leading-relaxed">
                If you are working on agent governance, independent assurance, or evidence-based oversight, we welcome
                technical discussion.{' '}
                <a
                  href="/contact"
                  className={`font-semibold underline decoration-[var(--ev-accent)] decoration-2 underline-offset-4 ${focus}`}
                >
                  Get in touch <span aria-hidden="true">→</span>
                </a>
              </p>
            </section>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  )
}
