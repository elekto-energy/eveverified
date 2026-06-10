'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { E_DIGITS, generateEParticles } from '@/lib/constants'
import { eveStats } from '@/data/agents'

// e Particle Visualization Component
function EVisualization() {
  const [rotation, setRotation] = useState(0)
  const [particles] = useState(() => generateEParticles(40, 60))

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(r => r + 0.3)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
      {/* Rotating particle field */}
      <div 
        className="absolute inset-0"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
              backgroundColor: '#00ff88',
              opacity: p.opacity,
              transform: `translate(${p.x}px, ${p.y}px)`,
              boxShadow: '0 0 8px #00ff88'
            }}
          />
        ))}
      </div>

      {/* Central e symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-8xl md:text-9xl font-thin text-white italic text-glow-green"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        e
      </motion.div>

      {/* Orbital rings */}
      {[1, 2, 3].map(ring => (
        <div
          key={ring}
          className="absolute rounded-full border border-eve-green/10"
          style={{
            width: ring * 80 + 40,
            height: ring * 80 + 40,
            animation: `spin ${15 + ring * 8}s linear infinite ${ring % 2 === 0 ? 'reverse' : ''}`
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [eveVersion, setEveVersion] = useState('')
  // Without the trailing underscore - that will be the blinking cursor
  const fullVersion = `${eveStats.agents}.${eveStats.engines}.${eveStats.knowledgeChunks}`

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullVersion.length) {
        setEveVersion(fullVersion.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20 overflow-hidden">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#0a0a0a_70%)]" />

      {/* e Visualization */}
      <EVisualization />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-[0.3em] md:tracking-[0.4em] mt-8 relative text-center"
      >
        EVE VERIFIED
      </motion.h1>

      {/* Animated EVE version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="font-mono text-sm text-eve-green/60 mt-4 tracking-wider"
      >
        {eveVersion}
        <span className="animate-blink">_</span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-6 text-gray-500 text-center max-w-lg leading-relaxed relative px-4"
      >
        Fixed rules. Approved knowledge. Verifiable outputs.
        <br />
        Verifiable AI systems that do not guess when evidence is missing.
        <br />
        <span className="text-eve-green">When evidence is missing, EVE returns NO_ANSWER.</span>
        <br />
        When authority, accountability or approval scope cannot be confirmed, EVE surfaces the signal.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-10 flex gap-4"
      >
        <a
          href="/eve"
          className="px-6 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green 
                     hover:bg-eve-green/20 transition-all duration-300 text-sm tracking-wide"
        >
          Explore EVE
        </a>
        <a
          href="#products"
          className="px-6 py-3 rounded-full border border-white/10 text-gray-400
                     hover:border-white/20 hover:text-white transition-all duration-300 text-sm tracking-wide"
        >
          Products
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-[0.2em]">EXPLORE</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div>
    </section>
  )
}
