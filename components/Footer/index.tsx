'use client'

import { products, company } from '@/data/products'

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-ent-border bg-ent-panel">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-md border border-ent-border bg-ent-card text-lg text-ent-accent-hi italic"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                e
              </span>
              <span className="font-semibold tracking-[0.06em] text-base text-ent-text">
                EVE Verified
              </span>
            </div>
            <p className="text-ent-dim text-sm leading-relaxed max-w-sm">
              A pre-action verification platform for AI agents, governance workflows
              and critical operational decisions. EVE proves the chain. The organisation acts on it.
            </p>
            <div className="mt-4 text-ent-muted text-xs">
              {company.name} · org.nr {company.orgNr}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="text-ent-muted text-xs font-semibold uppercase tracking-[0.12em] mb-4">Platform</div>
            <ul className="space-y-2">
              {products.map(product => (
                <li key={product.id}>
                  <a
                    href={product.href || `#${product.id}`}
                    className="text-ent-dim hover:text-ent-text transition-colors text-sm"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-ent-muted text-xs font-semibold uppercase tracking-[0.12em] mb-4">Connect</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://grc.eveverified.com/chain/pre-action"
                  className="text-ent-dim hover:text-ent-text transition-colors text-sm"
                >
                  Try live demo →
                </a>
              </li>
              <li>
                <a
                  href="https://verify.eveverified.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ent-dim hover:text-ent-text transition-colors text-sm"
                >
                  Verify a document
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-ent-dim hover:text-ent-text transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-ent-border flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-ent-muted text-xs">
            © {new Date().getFullYear()} {company.name}.
          </span>
          <span className="text-ent-muted text-xs">
            EVE proves the chain. The organisation acts on it.
          </span>
        </div>
      </div>
    </footer>
  )
}
