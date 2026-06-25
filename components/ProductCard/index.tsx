'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Product, products } from '@/data/products'

interface ProductCardProps {
  product: Product
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-[10px] p-6 transition-all duration-300 border group bg-white"
      style={{
        borderColor: hovered ? '#cbd5e1' : '#e5e7eb',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 10px 24px rgba(15,23,42,0.10)' : '0 1px 2px rgba(15,23,42,0.04)'
      }}
    >
      {/* Status badge — only for non-live */}
      {product.status !== 'live' && (
        <div className="absolute top-5 right-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] rounded px-2 py-0.5 bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe]">
            {product.status === 'preview' ? 'Developer Preview' : product.status === 'coming' ? 'Coming soon' : product.status}
          </span>
        </div>
      )}

      {/* Kicker label */}
      <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9ca3af] mb-2">
        {product.tagline}
      </div>

      {/* Title */}
      <h3 className="text-[#111827] text-lg font-bold tracking-[-0.01em]">{product.name}</h3>

      {/* Description */}
      <p className="text-[#4b5563] text-sm leading-relaxed mt-2 mb-4">
        {product.description}
      </p>

      {/* Features — neutral chips, single style (no rainbow) */}
      <div className="flex flex-wrap gap-1.5">
        {product.features.map((feature, i) => (
          <span
            key={i}
            className="text-[11px] px-2 py-0.5 rounded-md bg-[#f7f8fa] border border-[#e5e7eb] text-[#4b5563]"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Learn more link */}
      {product.href ? (
        <div className="mt-5 pt-4 border-t border-[#e5e7eb]">
          <a
            href={product.href}
            className="text-sm font-semibold text-[#1d4ed8] hover:text-[#1e3a8a] transition-colors inline-flex items-center gap-1.5"
          >
            Learn more
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      ) : (
        <div className="mt-5 pt-4 border-t border-[#e5e7eb]">
          <span className="text-sm text-[#9ca3af]">Developer preview · internal</span>
        </div>
      )}
    </motion.div>
  )
}

export default function Products() {
  return (
    <section
      id="products"
      className="py-20 md:py-28 px-6 bg-lite-bg"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lite-muted">Powered by the same verification engine</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-lite-text">
            Verify before any system acts
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-lite-dim leading-relaxed">
            The same verification engine across AI agents, governance workflows,
            software delivery and cryptographically verifiable evidence.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
