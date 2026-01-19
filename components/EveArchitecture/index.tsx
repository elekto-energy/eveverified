'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Euler's number for timing
const E = 2.71828182845904

// Pure SVG Architecture - everything in one coordinate system
export function ArchitectureViz() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [keepOpen, setKeepOpen] = useState<string | null>(null)

  const layers = {
    knowledge: {
      symbol: '◇',
      name: 'Knowledge Core',
      subtitle: '(10)',
      color: '#00d4ff',
      desc: 'Immutable, version-locked knowledge objects with SHA-256 verification. The single source of truth.',
      children: [
        { id: 'objects', name: 'Knowledge Objects', desc: 'Version-locked data with cryptographic hashes' },
        { id: 'index', name: 'Semantic Index', desc: 'Fast retrieval with full traceability' }
      ]
    },
    witness: {
      symbol: '◉',
      name: 'Witness Mode',
      subtitle: '(20)',
      color: '#ff6b00',
      desc: 'AI operates in read-only mode. Can observe, cite, and verify — but never decide or recommend.',
      children: [
        { id: 'logs', name: 'Evidence Logs', desc: 'Immutable record of all AI observations and citations' },
        { id: 'audit', name: 'Audit Chain', desc: 'Cryptographic chain linking every action to its source' }
      ]
    },
    authorization: {
      symbol: '👤',
      name: 'Authorization',
      subtitle: '(30)',
      color: '#f59e0b',
      desc: 'Human approval required for all changes. AI cannot delegate or bypass authorization.',
      children: [
        { id: 'approvals', name: 'Approval Queue', desc: 'Pending changes awaiting human review' },
        { id: 'policies', name: 'Policy Rules', desc: 'Constraints that cannot be modified by AI' }
      ]
    },
    xvault: {
      symbol: '🔐',
      name: 'X-Vault',
      subtitle: '(40)',
      color: '#a855f7',
      desc: 'Cryptographic verification layer with Merkle proofs. Enables offline verification of any claim.',
      children: [
        { id: 'proofs', name: 'Merkle Proofs', desc: 'Cryptographic proof of data integrity' },
        { id: 'snapshots', name: 'State Snapshots', desc: 'Signed, timestamped system states' }
      ]
    },
    trinity: {
      symbol: '△',
      name: 'Trinity Pipeline',
      subtitle: '(50)',
      color: '#00ff88',
      desc: 'Three-level processing: Deterministic Factory → Local LLM → External LLM. Escalates only when needed.',
      children: [
        { id: 'L1', name: 'L1 Factory', desc: 'Deterministic templates, ~0.1ms, VERIFIED' },
        { id: 'L2', name: 'L2 Local', desc: 'Qwen 7B-32B, ~100ms, offline capable' },
        { id: 'L3', name: 'L3 External', desc: 'Claude API, ~1000ms, highest capability' }
      ]
    }
  }

  // All measurements in SVG units
  const width = 700
  const centerX = width / 2

  // Core e
  const coreY = 50
  const coreR = 40

  // Layer nodes - 5 components
  const layerY = 200
  const layerR = 26
  const layerSpacing = 120
  const layerKeys = ['knowledge', 'witness', 'authorization', 'xvault', 'trinity']
  const layerPositions = [
    centerX - layerSpacing * 2,
    centerX - layerSpacing,
    centerX,
    centerX + layerSpacing,
    centerX + layerSpacing * 2
  ]

  // Child nodes - circular arrangement
  const childOrbitRadius = 55  // distance from parent center
  const childR = 14

  // Gap before circles
  const gap = 8

  // Calculate line that stops before target circle
  const line = (x1: number, y1: number, x2: number, y2: number, r1: number, r2: number) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    const startRatio = (r1 + gap) / dist
    const endRatio = (dist - r2 - gap) / dist
    
    return {
      x1: x1 + dx * startRatio,
      y1: y1 + dy * startRatio,
      x2: x1 + dx * endRatio,
      y2: y1 + dy * endRatio
    }
  }

  // Calculate child position on arc (bottom half of circle)
  const getChildPosition = (parentX: number, parentY: number, childIndex: number, totalChildren: number) => {
    // Spread children across bottom arc (from ~135° to ~45° in standard coords)
    // That's from ~225° to ~315° if we count from right going clockwise
    const startAngle = Math.PI * 0.65  // start angle (bottom-left)
    const endAngle = Math.PI * 0.35    // end angle (bottom-right) - note: going through bottom
    const arcSpan = Math.PI * 0.7      // total arc span
    
    let angle: number
    if (totalChildren === 1) {
      angle = Math.PI / 2  // straight down
    } else {
      // Distribute evenly across the arc
      const step = arcSpan / (totalChildren - 1)
      angle = startAngle + step * childIndex
    }
    
    return {
      x: parentX + Math.cos(angle) * childOrbitRadius,
      y: parentY + Math.sin(angle) * childOrbitRadius
    }
  }

  // Handle layer hover with delay for children
  const handleLayerEnter = (key: string) => {
    setHoveredLayer(key)
    setKeepOpen(key)
  }

  const handleLayerLeave = () => {
    setTimeout(() => {
      setHoveredLayer(prev => {
        if (prev === keepOpen) return null
        return prev
      })
    }, 300)
  }

  const isLayerActive = (key: string) => hoveredLayer === key || keepOpen === key

  return (
    <div className="py-8 md:py-12 flex flex-col items-center relative">
      <svg 
        width={width} 
        height="380" 
        viewBox={`0 0 ${width} 380`}
        className="overflow-visible"
        onMouseLeave={() => {
          setKeepOpen(null)
          setHoveredLayer(null)
          setHoveredNode(null)
        }}
      >
        {/* Lines from e to layers */}
        {layerPositions.map((lx, i) => {
          const layer = layers[layerKeys[i] as keyof typeof layers]
          const l = line(centerX, coreY, lx, layerY, coreR, layerR)
          return (
            <line
              key={`line-${i}`}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={layer.color}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          )
        })}

        {/* Core e - pulsing circles - more spacing */}
        <motion.circle
          cx={centerX} cy={coreY} r={coreR}
          fill="none"
          stroke="#00ff88"
          strokeWidth="1"
          strokeOpacity="0.3"
          animate={{ r: [coreR, coreR * 2.0], opacity: [0.5, 0] }}
          transition={{ duration: E, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx={centerX} cy={coreY} r={coreR}
          fill="none"
          stroke="#00ff88"
          strokeWidth="1"
          animate={{ r: [coreR, coreR * 3.0], opacity: [0.3, 0] }}
          transition={{ duration: E * 1.3, repeat: Infinity, ease: "easeOut", delay: E / 2 }}
        />
        <motion.circle
          cx={centerX} cy={coreY} r={coreR}
          fill="none"
          stroke="#00ff88"
          strokeWidth="1"
          animate={{ r: [coreR, coreR * 4.0], opacity: [0.2, 0] }}
          transition={{ duration: E * 1.6, repeat: Infinity, ease: "easeOut", delay: E }}
        />
        
        {/* Core e - main circle */}
        <circle
          cx={centerX} cy={coreY} r={coreR}
          fill="rgba(10,10,10,0.9)"
          stroke="#00ff88"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.3))' }}
        />
        <motion.text
          x={centerX} y={coreY + 8}
          textAnchor="middle"
          fill="#00ff88"
          fontSize="32"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: E, repeat: Infinity, ease: "easeInOut" }}
        >
          e
        </motion.text>

        {/* Label under e */}
        <text
          x={centerX} y={coreY + coreR + 30}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="13"
        >
          Evidence & Verification Engine
        </text>

        {/* Layer nodes */}
        {layerKeys.map((key, i) => {
          const layer = layers[key as keyof typeof layers]
          const lx = layerPositions[i]
          const isActive = isLayerActive(key)
          const children = layer.children
          const childCount = children.length

          return (
            <g key={key}>
              {/* Orbit ring - shows on hover */}
              <AnimatePresence>
                {isActive && (
                  <motion.circle
                    cx={lx} cy={layerY} r={childOrbitRadius}
                    fill="none"
                    stroke={layer.color}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3, delay: 0.2 } }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Lines to children - only when active */}
              <AnimatePresence>
                {isActive && children.map((child, ci) => {
                  const childPos = getChildPosition(lx, layerY, ci, childCount)
                  const l = line(lx, layerY, childPos.x, childPos.y, layerR, childR)
                  return (
                    <motion.line
                      key={child.id}
                      x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                      stroke={layer.color}
                      strokeWidth="1"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 0.4, pathLength: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.2 } }}
                      transition={{ duration: 0.25, delay: ci * 0.05 }}
                    />
                  )
                })}
              </AnimatePresence>

              {/* Layer circle */}
              <circle
                cx={lx} cy={layerY} r={layerR}
                fill={isActive ? `${layer.color}15` : "rgba(10,10,10,0.9)"}
                stroke={layer.color}
                strokeWidth="2"
                style={{ 
                  cursor: 'pointer',
                  filter: isActive ? `drop-shadow(0 0 15px ${layer.color}50)` : `drop-shadow(0 0 8px ${layer.color}20)`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={() => {
                  handleLayerEnter(key)
                  setHoveredNode(key)
                }}
                onMouseLeave={() => {
                  handleLayerLeave()
                  setHoveredNode(null)
                }}
              />
              <text
                x={lx} y={layerY + 5}
                textAnchor="middle"
                fill={layer.color}
                fontSize="14"
                style={{ pointerEvents: 'none' }}
              >
                {layer.symbol}
              </text>

              {/* Layer label - positioned below orbit area */}
              <text
                x={lx} y={layerY + childOrbitRadius + childR + 20}
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="10"
                fontWeight="500"
              >
                {layer.name}
              </text>
              <text
                x={lx} y={layerY + childOrbitRadius + childR + 32}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="9"
              >
                {layer.subtitle}
              </text>

              {/* Child nodes - circular arrangement */}
              <AnimatePresence>
                {isActive && children.map((child, ci) => {
                  const childPos = getChildPosition(lx, layerY, ci, childCount)
                  const isChildHovered = hoveredNode === child.id
                  
                  return (
                    <motion.g
                      key={child.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3, delay: 0.15 } }}
                      transition={{ duration: 0.25, delay: ci * 0.08 }}
                    >
                      <circle
                        cx={childPos.x} cy={childPos.y} r={childR}
                        fill={isChildHovered ? `${layer.color}25` : "rgba(10,10,10,0.9)"}
                        stroke={isChildHovered ? layer.color : `${layer.color}60`}
                        strokeWidth={isChildHovered ? "2" : "1"}
                        style={{ 
                          cursor: 'pointer',
                          filter: isChildHovered ? `drop-shadow(0 0 10px ${layer.color}50)` : 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={() => {
                          setHoveredNode(child.id)
                          setKeepOpen(key)
                        }}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      <circle
                        cx={childPos.x} cy={childPos.y} r={3}
                        fill={layer.color}
                        style={{ pointerEvents: 'none' }}
                      />
                    </motion.g>
                  )
                })}
              </AnimatePresence>
            </g>
          )
        })}
      </svg>

      {/* Info tooltip - appears when hovering any node */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-md"
          >
            <div 
              className="px-5 py-4 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(10,10,10,0.95)',
                borderColor: (() => {
                  for (const [key, layer] of Object.entries(layers)) {
                    if (key === hoveredNode) return `${layer.color}40`
                    for (const child of layer.children) {
                      if (child.id === hoveredNode) return `${layer.color}40`
                    }
                  }
                  return 'rgba(255,255,255,0.1)'
                })()
              }}
            >
              {(() => {
                for (const [key, layer] of Object.entries(layers)) {
                  if (key === hoveredNode) {
                    return (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ color: layer.color }}>{layer.symbol}</span>
                          <span className="text-white font-medium text-sm">{layer.name}</span>
                          <span className="text-gray-500 text-xs">{layer.subtitle}</span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">{layer.desc}</p>
                      </>
                    )
                  }
                  for (const child of layer.children) {
                    if (child.id === hoveredNode) {
                      return (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                            <span className="text-white font-medium text-sm">{child.name}</span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed">{child.desc}</p>
                        </>
                      )
                    }
                  }
                }
                return null
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 pt-8 border-t border-white/5 w-full max-w-2xl">
        {layerKeys.map((key) => {
          const layer = layers[key as keyof typeof layers]
          return (
            <div key={key} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
              <span className="text-gray-500">{layer.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Trinity Pipeline Visualization
export function TrinityViz() {
  const [activeLevel, setActiveLevel] = useState(1)

  const levels = [
    { level: 1, name: 'DETERMINISTIC FACTORY', latency: '~0.1ms', color: '#00ff88', verified: true, desc: 'Template matching' },
    { level: 2, name: 'LOCAL LLM', latency: '~100ms', color: '#ff6b00', verified: false, desc: 'Qwen 7B → 32B' },
    { level: 3, name: 'EXTERNAL LLM', latency: '~1000ms', color: '#00d4ff', verified: false, desc: 'Claude API' },
  ]

  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 md:p-8">
      <h3 className="text-lg font-medium text-white mb-6">Trinity Pipeline</h3>

      <div className="space-y-3">
        {levels.map((l) => (
          <div 
            key={l.level}
            onClick={() => setActiveLevel(l.level)}
            className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
              activeLevel === l.level 
                ? 'border-white/20 bg-white/[0.03]' 
                : 'border-white/5 opacity-50 hover:opacity-70'
            }`}
          >
            {activeLevel === l.level && (
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: l.color }} />
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                  style={{ backgroundColor: `${l.color}15`, color: l.color, border: `1px solid ${l.color}30` }}
                >
                  L{l.level}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{l.name}</div>
                  <div className="text-gray-600 text-xs">{l.desc}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white text-sm font-mono">{l.latency}</div>
                <div className={`text-xs ${l.verified ? 'text-eve-green' : 'text-gray-500'}`}>
                  {l.verified ? '✓ VERIFIED' : '○ UNVERIFIED'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Witness Mode Explainer
export function WitnessModeViz() {
  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 md:p-8">
      <h3 className="text-lg font-medium text-white mb-6">Witness Mode</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-eve-green/5 border border-eve-green/20">
          <div className="text-eve-green text-xs font-medium mb-3">✓ ALLOWED</div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>→ Search knowledge core</li>
            <li>→ Quote passages</li>
            <li>→ Summarize content</li>
            <li>→ Explain & contextualize</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
          <div className="text-red-400 text-xs font-medium mb-3">✕ BLOCKED</div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✕ Generate recommendations</li>
            <li>✕ Make decisions</li>
            <li>✕ Create outside KB</li>
            <li>✕ Modify knowledge</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// X-Vault Connection
export function XVaultViz() {
  return (
    <div className="bg-white/[0.02] rounded-2xl border border-eve-purple/20 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-eve-purple/10 border border-eve-purple/30 flex items-center justify-center text-eve-purple">
          🔐
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">X-Vault</h3>
          <p className="text-eve-purple text-xs">Powered by ELEKTO-X</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-gray-500 mb-3">Features</div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><span className="text-eve-purple">◆</span> Merkle tree structure</li>
            <li><span className="text-eve-purple">◆</span> Offline verification</li>
            <li><span className="text-eve-purple">◆</span> Signed state proofs</li>
            <li><span className="text-eve-purple">◆</span> Audit chain</li>
          </ul>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-3">ELEKTO-X Foundation</div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><span className="text-eve-orange">◆</span> TPM/HSM attestation</li>
            <li><span className="text-eve-orange">◆</span> Signed snapshots</li>
            <li><span className="text-eve-orange">◆</span> WORM logging</li>
            <li><span className="text-eve-orange">◆</span> t-of-n signing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Dual LLM Visualization
export function DualLLMViz() {
  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/5 p-6 md:p-8">
      <h3 className="text-lg font-medium text-white mb-2">Dual-LLM Separation</h3>
      <p className="text-gray-500 text-sm mb-6">
        LLM #2 never sees the original question
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="p-3 rounded-lg border border-eve-green/30 bg-eve-green/5">
          <div className="text-gray-500 text-xs">User</div>
          <div className="text-white">Question</div>
        </div>
        <span className="text-gray-600">→</span>
        <div className="p-3 rounded-lg border border-eve-cyan/30 bg-eve-cyan/5">
          <div className="text-gray-500 text-xs">LLM #1</div>
          <div className="text-eve-cyan text-xs">Extract terms</div>
        </div>
        <span className="text-gray-600">→</span>
        <div className="p-3 rounded-lg border border-eve-green/30 bg-eve-green/5">
          <div className="text-gray-500 text-xs">KB</div>
          <div className="text-eve-green text-xs">Fragments</div>
        </div>
        <span className="text-gray-600">→</span>
        <div className="p-3 rounded-lg border border-eve-orange/30 bg-eve-orange/5">
          <div className="text-gray-500 text-xs">LLM #2</div>
          <div className="text-eve-orange text-xs">⚠ No question</div>
        </div>
      </div>
    </div>
  )
}
