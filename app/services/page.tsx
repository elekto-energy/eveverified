import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.4 section H.
// Adding a service = adding one entry to `services`. No placeholder entries.

type NamedItem = { name: string; description: string }

type Service = {
  name: string
  summary: string
  reviewAreas: NamedItem[]
  engagementContents: NamedItem[]
  cta: { label: string; href: string }
}

const services: Service[] = [
  {
    name: 'Technical Review',
    summary:
      'We examine how a defined system, workflow or integration actually behaves, and deliver documented, verifiable results. Our focus is AI agents, agent integrations and the evidence behind verification claims.',
    reviewAreas: [
      {
        name: 'AI Agent Security',
        description:
          'agent permissions, tool access, delegation, and whether boundaries are enforced or only assumed.',
      },
      {
        name: 'MCP Integrations',
        description:
          'MCP servers, which tools are exposed to which agents, and integration risks.',
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
    ],
    engagementContents: [
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
    ],
    cta: { label: 'Discuss an engagement', href: '/contact' },
  },
]

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

export const metadata: Metadata = {
  title: 'Services | EVE Verified',
  description: 'Bounded engagements with a fixed scope and a fixed deliverable.',
}

const h2 = 'text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ent-text'
const body = 'text-sm text-ent-dim leading-relaxed'
const card = 'rounded-xl border border-ent-border bg-ent-card p-7'

function NamedList({ items }: { items: NamedItem[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item.name} className={body}>
          <span className="font-semibold text-ent-text">{item.name}</span>: {item.description}
        </li>
      ))}
    </ul>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-ent-bg">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-ent-text">Services</h1>
          <p className={`mt-3 ${body}`}>
            Bounded engagements with a fixed scope and a fixed deliverable.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {services.map((service) => (
            <div key={service.name} className={card}>
              <h2 className="text-xl font-semibold text-ent-text">{service.name}</h2>
              <p className={`mt-3 ${body}`}>{service.summary}</p>

              <p className={`mt-6 ${body}`}>Review areas include:</p>
              <NamedList items={service.reviewAreas} />

              <p className={`mt-6 ${body}`}>Every engagement includes:</p>
              <NamedList items={service.engagementContents} />

              <a
                href={service.cta.href}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-ent-verified px-5 py-3 text-sm font-bold text-[#04140d] transition-colors hover:bg-[#0ea371]"
              >
                {service.cta.label} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Public technical work */}
      <section className="bg-ent-panel border-y border-ent-border">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className={h2}>Public technical work</h2>
          <p className={`mt-4 ${body}`}>
            EVE Verified has submitted public technical comments on the Proof-of-Control working
            draft at Linux Foundation Decentralized Trust.
          </p>

          <p className={`mt-6 ${body}`}>Our contributions include:</p>
          <NamedList
            items={[
              {
                name: 'Verification scope',
                description:
                  'a proposal for machine-readable disclosure of what a verification result does and does not assess, including NOT_ASSESSED for content outside the verified scope.',
              },
              {
                name: 'Evidence integrity',
                description:
                  'a reproducible analysis showing that a fail-closed refusal and an omitted record produce identical results from the published verifier, at a pinned commit of the reference implementation.',
              },
            ]}
          />

          <p className={`mt-6 ${body}`}>
            {"Comment #77 is listed in the working group's public-comment register as an open item for the working group to take up. These contributions show our approach to evidence-based technical review."}
          </p>

          <ul className="mt-6 space-y-2">
            {publicWorkLinks.map((link) => (
              <li key={link.href} className="text-sm">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ent-accent-hi hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className={`mt-6 ${body}`}>
            These are public technical contributions, not certifications, endorsements,
            organizational membership claims or adopted standard requirements.
          </p>
        </div>
      </section>

      {/* How an engagement works */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className={h2}>How an engagement works</h2>
          <ol className="mt-6 list-decimal pl-5 space-y-2">
            <li className={body}>
              Scope: we agree in writing on the system, the questions and the deliverable.
            </li>
            <li className={body}>Work: stays inside the agreed scope.</li>
            <li className={body}>Delivery: a documented result with reproducible evidence.</li>
          </ol>
        </div>
      </section>

      {/* What this is not */}
      <section className="bg-ent-panel border-y border-ent-border">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className={h2}>What this is not</h2>
          <ul className="mt-6 list-disc pl-5 space-y-2">
            <li className={body}>Not a certification, audit opinion or compliance attestation.</li>
            <li className={body}>Not a guarantee that a system is free of defects.</li>
            <li className={body}>Each engagement covers the agreed scope only.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
