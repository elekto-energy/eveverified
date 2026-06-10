import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Insights | EVE Verified',
  description: 'Sealed proof artifacts and engineering writeups from the EVE platform.',
  openGraph: {
    title: 'Insights | EVE Verified',
    description: 'Sealed proof artifacts and engineering writeups from the EVE platform.',
    url: 'https://eveverified.com/insights',
    siteName: 'EVE Verified',
    type: 'website',
  },
}

type Insight = {
  slug?: string
  href?: string
  title: string
  description: string
  subline?: string
  published: string
  tags: string[]
  seal?: string
  color: string
  external?: boolean
}

const insights: Insight[] = [
  {
    slug: 'ai-act-proof-v1',
    title: 'From AI Act Documents to Verifiable Proof',
    description:
      'A working implementation of verifiable AI Act-grade documentation and deterministic evidence resolution using EVE Bridge, public verification, and NO_ANSWER when evidence is missing.',
    published: '2026-05-24',
    tags: ['EU AI Act', 'EVE Bridge', 'Sealed proof'],
    seal: 'EVE-COMPLIEDOCS-00001125',
    color: '#00ff88',
  },
  {
    href: 'https://grc.eveverified.com/iso42001/accountability-checkpoint',
    external: true,
    title: 'Accountability-Continuity Checkpoint for Chained AI Workflows',
    description:
      'A synthetic detector demo showing when a chained AI workflow should continue without interruption — and when declared accountability, authority or approval scope can no longer be confirmed.',
    subline: 'Reviewer-informed design validation. EVE surfaces the signal; humans decide.',
    published: '2026-06-10',
    tags: ['AI Governance', 'EVE Signals', 'Design validation'],
    color: '#a855f7',
  },
]

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-eve-green tracking-[0.3em] uppercase">Editorial</span>
        <h1 className="text-3xl md:text-5xl font-extralight tracking-wide text-white mt-4 mb-4">
          Insights
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          Sealed proof artifacts and engineering writeups from the EVE platform.
        </p>
      </section>

      {/* Article list */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {insights.map(insight => {
            const linkHref = insight.external ? insight.href! : `/insights/${insight.slug}`
            const linkProps = insight.external
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {}
            return (
            <Link
              key={insight.slug || insight.href}
              href={linkHref}
              {...linkProps}
              className="block p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group"
            >
              {/* Tags + date */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {insight.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium"
                      style={{
                        backgroundColor: `${insight.color}10`,
                        color: insight.color,
                        border: `1px solid ${insight.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-gray-600 text-xs whitespace-nowrap">
                  {formatDate(insight.published)}
                </time>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-extralight tracking-wide text-white/90 group-hover:text-white transition-colors mb-3">
                {insight.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-2">
                {insight.description}
              </p>

              {/* Subline */}
              {insight.subline && (
                <p className="text-gray-600 text-xs leading-relaxed mb-4 italic">
                  {insight.subline}
                </p>
              )}

              {/* Footer: seal + read more */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                {insight.seal ? (
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: insight.color }}
                  >
                    {insight.seal}
                  </span>
                ) : (
                  <span />
                )}
                <span className="text-gray-500 text-xs group-hover:text-white transition-colors inline-flex items-center gap-1">
                  {insight.external ? 'Open demo' : 'Read'}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            )
          })}
        </div>
      </section>

      {/* Footer note */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-600 text-xs">
          Every sealed insight links to{' '}
          <a
            href="https://verify.eveverified.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-eve-green/70 hover:text-eve-green underline"
          >
            verify.eveverified.com
          </a>{' '}
          for independent verification.
        </p>
      </section>

      <Footer />
    </main>
  )
}
