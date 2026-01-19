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
  const isEve = product.icon === 'e'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl p-6 transition-all duration-300 cursor-pointer border group"
      style={{
        backgroundColor: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.4)',
        borderColor: hovered ? product.color : 'rgba(255,255,255,0.1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 15px 30px ${product.color}25` : 'none'
      }}
    >
      {/* Status badge */}
      {product.status !== 'live' && (
        <div className="absolute top-4 right-4">
          <span 
            className="text-xs px-2 py-1 rounded-full uppercase tracking-wider"
            style={{
              backgroundColor: product.status === 'beta' ? '#ff6b0020' : '#ffffff10',
              color: product.status === 'beta' ? '#ff6b00' : '#666'
            }}
          >
            {product.status}
          </span>
        </div>
      )}

      {/* Icon */}
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 
                   transition-transform duration-300 group-hover:scale-110"
        style={{ 
          backgroundColor: `${product.color}15`, 
          border: `1px solid ${product.color}40`,
          fontFamily: isEve ? 'Georgia, serif' : 'inherit',
          fontStyle: isEve ? 'italic' : 'normal'
        }}
      >
        {product.icon}
      </div>

      {/* Content */}
      <h3 className="text-white text-xl font-semibold">{product.name}</h3>
      <div 
        className="text-xs uppercase tracking-widest mt-1 mb-3"
        style={{ color: product.color }}
      >
        {product.tagline}
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        {product.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2">
        {product.features.map((feature, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 rounded-full transition-colors duration-200"
            style={{
              backgroundColor: `${product.color}15`,
              border: `1px solid ${product.color}30`,
              color: product.color
            }}
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Learn more link */}
      {product.href && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <a
            href={product.href}
            className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-2"
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
      )}
    </motion.div>
  )
}

export default function Products() {
  return (
    <section 
      id="products" 
      className="py-20 md:py-32 px-6 bg-gradient-to-b from-transparent via-eve-green/[0.02] to-transparent"
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
          <span className="text-xs text-gray-500 tracking-[0.3em]">ECOSYSTEM</span>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.15em] md:tracking-[0.2em] mt-3">
            <span className="italic" style={{ fontFamily: 'Georgia, serif' }}>e</span>-EXPANSION
          </h2>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            Each product is a new decimal — infinite expansion, absolute precision.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
