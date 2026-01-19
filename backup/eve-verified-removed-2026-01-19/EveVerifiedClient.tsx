'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

// Euler's number for timing
const E = 2.71828182845904

// Pulsating Ecosystem Visualization
function EcosystemViz() {
  const products = [
    { name: 'ComplieDocs', x: 120 },
    { name: 'ELEKTO', x: 270 },
    { name: 'ELEKTO-X', x: 420 },
    { name: 'CableDNA', x: 570 },
  ]

  return (
    <div className="flex justify-center py-8">
      <svg width="700" height="380" viewBox="0 0 700 380" className="overflow-visible max-w-full">
        {/* EVE Core - Top with pulsing rings */}
        <g>
          {/* Pulsing rings */}
          <motion.circle
            cx="350" cy="70" r="50"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            initial={{ r: 50, opacity: 0.5 }}
            animate={{ r: 90, opacity: 0 }}
            transition={{ duration: E, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="350" cy="70" r="50"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            initial={{ r: 50, opacity: 0.3 }}
            animate={{ r: 110, opacity: 0 }}
            transition={{ duration: E * 1.2, repeat: Infinity, ease: "easeOut", delay: E / 3 }}
          />
          <motion.circle
            cx="350" cy="70" r="50"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            initial={{ r: 50, opacity: 0.2 }}
            animate={{ r: 130, opacity: 0 }}
            transition={{ duration: E * 1.5, repeat: Infinity, ease: "easeOut", delay: E / 2 }}
          />
          
          {/* Main circle */}
          <circle
            cx="350" cy="70" r="50"
            fill="rgba(0,255,136,0.1)"
            stroke="#00ff88"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.4))' }}
          />
          
          {/* e symbol */}
          <motion.text
            x="350" y="62"
            textAnchor="middle"
            fill="#00ff88"
            fontSize="36"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: E, repeat: Infinity, ease: "easeInOut" }}
          >
            e
          </motion.text>
          <text x="350" y="85" textAnchor="middle" fill="#00ff88" fontSize="11" fontWeight="500">
            EVE Core
          </text>
          <text x="350" y="100" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
            produces verified outputs
          </text>
        </g>

        {/* Vertical line from EVE Core to products */}
        <line x1="350" y1="120" x2="350" y2="160" stroke="#00ff88" strokeWidth="1" strokeOpacity="0.4" />

        {/* Horizontal connector line */}
        <line x1="120" y1="180" x2="570" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Product nodes */}
        {products.map((product, i) => (
          <g key={product.name}>
            {/* Vertical line to horizontal */}
            <line x1={product.x} y1="160" x2={product.x} y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            
            {/* Small pulse on each product */}
            <motion.circle
              cx={product.x} cy="210" r="8"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              animate={{ r: [8, 25], opacity: [0.3, 0] }}
              transition={{ duration: E * 1.5, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
            />
            
            {/* Product box */}
            <rect
              x={product.x - 55} y="190"
              width="110" height="45"
              rx="6"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <text x={product.x} y="210" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">
              {product.name}
            </text>
            <text x={product.x} y="225" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
              consumes EVE Core
            </text>
          </g>
        ))}

        {/* Vertical line from products to EVE VERIFIED */}
        <line x1="350" y1="235" x2="350" y2="270" stroke="#00ff88" strokeWidth="1" strokeOpacity="0.4" />

        {/* EVE VERIFIED - Bottom with pulsing rings */}
        <g>
          {/* Pulsing rings */}
          <motion.circle
            cx="350" cy="320" r="45"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            initial={{ r: 45, opacity: 0.4 }}
            animate={{ r: 80, opacity: 0 }}
            transition={{ duration: E * 1.3, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="350" cy="320" r="45"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            initial={{ r: 45, opacity: 0.2 }}
            animate={{ r: 100, opacity: 0 }}
            transition={{ duration: E * 1.5, repeat: Infinity, ease: "easeOut", delay: E / 4 }}
          />
          
          {/* Main rounded rect */}
          <rect
            x="260" y="285"
            width="180" height="70"
            rx="12"
            fill="rgba(0,255,136,0.05)"
            stroke="#00ff88"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            style={{ filter: 'drop-shadow(0 0 15px rgba(0,255,136,0.2))' }}
          />
          
          {/* Verified badge inside */}
          <motion.text
            x="350" y="320"
            textAnchor="middle"
            fill="#00ff88"
            fontSize="14"
            fontWeight="600"
            letterSpacing="0.1em"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: E, repeat: Infinity, ease: "easeInOut" }}
          >
            EVE VERIFIED
          </motion.text>
          <text x="350" y="340" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">
            exposes proof of correctness
          </text>
        </g>
      </svg>
    </div>
  )
}

export default function EveVerifiedClient() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 mb-8">
          <span className="text-eve-green text-2xl">◉</span>
          <span className="text-eve-green text-lg tracking-wide font-medium">EVE VERIFIED</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extralight tracking-wide text-white/90 mb-4">
          Deterministic verification. Publicly auditable proof.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          EVE VERIFIED is the public verification layer of the EVE ecosystem. 
          It exists for one purpose: to let anyone independently verify that a system output 
          is real, traceable, and produced under deterministic control.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm mt-4">
          If something is marked EVE VERIFIED, it was not guessed, generated probabilistically, 
          or created in isolation. It was produced under EVE Core, witnessed, logged, and 
          cryptographically verifiable.
        </p>
      </section>

      {/* ... rest of component ... */}

      <Footer />
    </main>
  )
}
