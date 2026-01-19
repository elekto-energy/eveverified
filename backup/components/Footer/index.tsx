'use client'

import { motion } from 'framer-motion'
import { products, company } from '@/data/products'
import { E_DIGITS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5 mt-12">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="text-3xl text-eve-green italic"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                e
              </span>
              <span className="tracking-[0.2em] font-light text-lg">
                EVE VERIFIED
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Deterministic AI platform where systems never guess — only know. 
              Evidence & Verification Engine for the future of trusted AI.
            </p>
            <div className="mt-4 text-gray-700 text-xs">
              {company.name} · org.nr {company.orgNr}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="text-gray-500 text-xs tracking-[0.2em] mb-4">PRODUCTS</div>
            <ul className="space-y-2">
              {products.map(product => (
                <li key={product.id}>
                  <a
                    href={product.href || `#${product.id}`}
                    className="text-gray-600 hover:text-white transition-colors text-sm"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-gray-500 text-xs tracking-[0.2em] mb-4">CONNECT</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/elekto-energy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-white transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="text-gray-600 hover:text-white transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@eveverified.com"
                  className="text-gray-600 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Domains */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-wrap gap-4 text-xs text-gray-700">
            {company.domains.map(domain => (
              <span key={domain} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-eve-green/50" />
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-gray-700 text-xs">
            © {new Date().getFullYear()} {company.name}. Built by Joakim Eklund.
          </span>
          <span 
            className="font-mono text-xs text-gray-800"
            title="Euler's number (e)"
          >
            2.{E_DIGITS.slice(0, 20)}...
          </span>
        </div>
      </div>
    </footer>
  )
}
