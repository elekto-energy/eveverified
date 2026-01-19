'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { eveStats } from '@/data/agents'

const E_DIGITS = '7182818284590452353602874713527950288419716939937510582097494459'

// EVE Agents and Engines - subtle orbiting text
const EVE_LABELS = [
  'TRINITY', 'WITNESS', 'FACTORY', 'Claude', 'Qwen', 'Router',
  'Compliance', 'Video', 'Document', 'Analysis', 'Translation', 'CodeFactory',
  'X-Vault', 'Audit', 'Seal', '325K', 'UIPatterns', 'CodeIndex',
  'ComplieDocs', 'ELEKTO', 'CableDNA', 'SelfCoder', 'AutoLearn', 'MCP',
  'Witness', 'Verify', 'Evidence', 'Determinism', 'Trinity', 'Factory',
  'Knowledge', 'Engine', 'Agent', 'System', 'Core', 'Index'
]

export default function Eve3D() {
  const [rotation, setRotation] = useState({ x: 15, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Particles based on e-digits
  const particles = useMemo(() => {
    return E_DIGITS.slice(0, 50).split('').map((digit, i) => {
      const d = parseInt(digit)
      const phi = Math.acos(-1 + (2 * i) / 50)
      const theta = Math.sqrt(50 * Math.PI) * phi
      const radius = 100 + d * 6
      return {
        id: i,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        size: 4 + d * 0.5,
        opacity: 0.5 + d * 0.05
      }
    })
  }, [])

  // Orbiting labels - spread across multiple orbit layers
  const orbitingLabels = useMemo(() => {
    return EVE_LABELS.map((text, i) => {
      const orbitIndex = i % 4
      const radius = 160 + orbitIndex * 25
      const speed = 0.08 + (i % 3) * 0.02
      const verticalOffset = Math.sin(i * 1.3) * 50
      const startAngle = (i / EVE_LABELS.length) * 360
      
      return {
        text,
        id: i,
        radius,
        speed,
        verticalOffset,
        startAngle
      }
    })
  }, [])

  const orbits = [
    { radius: 70, tilt: 75 },
    { radius: 100, tilt: 60 },
    { radius: 130, tilt: 45 },
  ]

  useEffect(() => {
    if (!autoRotate) return
    const interval = setInterval(() => {
      setRotation(r => ({ x: r.x, y: r.y + 0.08 }))
    }, 16)
    return () => clearInterval(interval)
  }, [autoRotate])

  const project = (x: number, y: number, z: number, rotX: number, rotY: number) => {
    const cosY = Math.cos(rotY * Math.PI / 180)
    const sinY = Math.sin(rotY * Math.PI / 180)
    const x1 = x * cosY - z * sinY
    const z1 = x * sinY + z * cosY
    const cosX = Math.cos(rotX * Math.PI / 180)
    const sinX = Math.sin(rotX * Math.PI / 180)
    const y1 = y * cosX - z1 * sinX
    const z2 = y * sinX + z1 * cosX
    const perspective = 500
    const scale = perspective / (perspective + z2)
    return { x: x1 * scale, y: y1 * scale, z: z2, scale }
  }

  return (
    <div className="w-full h-screen bg-[#050508] overflow-hidden relative flex items-center justify-center">
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: ((i % 3) + 1) * 0.5 + 0.5,
              height: ((i % 3) + 1) * 0.5 + 0.5,
              opacity: ((i % 5) + 1) * 0.06 + 0.05
            }}
          />
        ))}
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative cursor-pointer"
        style={{ width: 500, height: 500 }}
        onClick={() => setAutoRotate(!autoRotate)}
      >
        {/* Orbital rings */}
        {orbits.map((orbit, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border pointer-events-none"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              marginLeft: -orbit.radius,
              marginTop: -orbit.radius,
              borderColor: '#00ff8810',
              transform: `rotateX(${orbit.tilt}deg) rotateY(${rotation.y * 0.5}deg)`,
            }}
          />
        ))}

        {/* Particles */}
        {particles
          .map(p => ({ ...p, proj: project(p.x, p.y, p.z, rotation.x, rotation.y) }))
          .sort((a, b) => a.proj.z - b.proj.z)
          .map(p => (
            <div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                width: p.size * p.proj.scale,
                height: p.size * p.proj.scale,
                backgroundColor: '#00ff88',
                opacity: p.opacity * Math.max(0.2, (p.proj.z + 150) / 300) * p.proj.scale,
                transform: `translate(${p.proj.x - (p.size * p.proj.scale) / 2}px, ${p.proj.y - (p.size * p.proj.scale) / 2}px)`,
                boxShadow: `0 0 ${6 * p.proj.scale}px #00ff88`,
              }}
            />
          ))}

        {/* Central e with glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div 
            className="absolute -inset-16 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)'
            }}
          />
          <div 
            className="absolute -inset-8 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, #00ff88 0%, transparent 60%)'
            }}
          />
          <span
            className="relative text-7xl font-thin text-white select-none block"
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              textShadow: '0 0 30px rgba(0,255,136,0.8), 0 0 60px rgba(0,255,136,0.5), 0 0 100px rgba(0,255,136,0.3)'
            }}
          >
            e
          </span>
        </div>

        {/* Subtle orbiting labels */}
        {orbitingLabels.map(label => {
          const angle = ((rotation.y * label.speed + label.startAngle) * Math.PI) / 180
          const x = Math.sin(angle) * label.radius
          const z = Math.cos(angle) * label.radius
          const y = label.verticalOffset
          const proj = project(x, y, z, rotation.x, 0)
          
          const isVisible = proj.z > -80
          const depthOpacity = isVisible ? Math.max(0, (proj.z + 150) / 350) : 0
          const finalOpacity = depthOpacity * 0.25 * proj.scale
          
          return (
            <div
              key={label.id}
              className="absolute left-1/2 top-1/2 pointer-events-none whitespace-nowrap"
              style={{
                color: '#00ff88',
                opacity: finalOpacity,
                transform: `translate(${proj.x - 20}px, ${proj.y - 5}px)`,
                fontSize: '9px',
                fontFamily: 'SF Mono, Fira Code, monospace',
                letterSpacing: '0.5px',
                textShadow: '0 0 8px #00ff8840',
                zIndex: Math.round(proj.z + 200)
              }}
            >
              {label.text}
            </div>
          )
        })}
      </div>

      {/* Subtle controls */}
      <div className="absolute bottom-5 left-5 text-xs text-gray-700 font-mono">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${autoRotate ? 'bg-[#00ff88]/50' : 'bg-gray-700'}`} />
          {autoRotate ? 'rotating' : 'paused'}
        </div>
      </div>

      {/* EVE version */}
      <div className="absolute bottom-5 right-5 font-mono text-[9px] text-[#00ff88]/20">
        {eveStats.agents}.{eveStats.engines}.{eveStats.knowledgeChunks}{eveStats.expansion}
      </div>
    </div>
  )
}
