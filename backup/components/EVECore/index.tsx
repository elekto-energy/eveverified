'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AgentNode from '@/components/AgentNode'
import { agentData, eveStats } from '@/data/agents'

export default function EVECore() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const core = agentData.core
  const tier1Agents = core.children.map(id => agentData[id])

  return (
    <section id="eve" className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="text-xs text-eve-green tracking-[0.3em] uppercase">
          Intelligence Layer
        </span>
        <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.15em] md:tracking-[0.2em] mt-3">
          EVE CORE
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm md:text-base">
          Evidence & Verification Engine — A deterministic AI architecture where 
          every agent is traceable and verifiable.
        </p>
      </motion.div>

      {/* Agent Tree */}
      <div 
        className={`
          flex flex-col items-center py-8 
          transition-all duration-700 
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Core Node */}
        <AgentNode 
          agent={core} 
          size="lg"
          onHover={setHoveredNode}
          isHovered={hoveredNode === core.id}
        />

        {/* Connection line to tier 1 */}
        <div className="w-px h-10 bg-gradient-to-b from-eve-green/50 to-transparent mt-2" />

        {/* Tier 1 Nodes */}
        <div className="flex gap-6 md:gap-10 mt-2 relative">
          {/* SVG Connection lines */}
          <svg 
            className="absolute -top-10 left-0 w-full h-10 overflow-visible pointer-events-none"
            preserveAspectRatio="none"
          >
            {tier1Agents.map((_, i) => {
              const positions = [-96, 0, 96] // Adjusted for 3 items
              const x = positions[i] || 0
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="0"
                  x2={`calc(50% + ${x}px)`}
                  y2="40"
                  stroke="#00ff88"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="animate-flow-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              )
            })}
          </svg>

          {tier1Agents.map(agent => (
            <div key={agent.id} className="flex flex-col items-center">
              <AgentNode
                agent={agent}
                size="md"
                onHover={setHoveredNode}
                isHovered={hoveredNode === agent.id}
              />

              {/* Tier 2 children */}
              {agent.children.length > 0 && (
                <>
                  <div 
                    className="w-px h-8 bg-gradient-to-b from-current to-transparent mt-2"
                    style={{ color: `${agent.color}50` }}
                  />
                  
                  <div className="flex gap-3 md:gap-4 mt-2 relative">
                    {/* SVG lines to tier 2 */}
                    <svg 
                      className="absolute -top-8 left-0 w-full h-8 overflow-visible pointer-events-none"
                    >
                      {agent.children.map((_, i) => {
                        const totalW = (agent.children.length - 1) * 48
                        const x = i * 48 - totalW / 2
                        return (
                          <line
                            key={i}
                            x1="50%"
                            y1="0"
                            x2={`calc(50% + ${x}px)`}
                            y2="32"
                            stroke={agent.color}
                            strokeWidth="1"
                            strokeOpacity="0.25"
                          />
                        )
                      })}
                    </svg>

                    {agent.children.map(childId => {
                      const child = agentData[childId]
                      if (!child) return null
                      return (
                        <AgentNode
                          key={child.id}
                          agent={child}
                          size="sm"
                          onHover={setHoveredNode}
                          isHovered={hoveredNode === child.id}
                        />
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center"
      >
        {[
          { value: eveStats.agents, label: 'AGENTS' },
          { value: eveStats.engines, label: 'ENGINES' },
          { value: eveStats.knowledgeChunks, label: 'KB CHUNKS' },
          { value: eveStats.expansion, label: 'EXPANSION' }
        ].map((stat, i) => (
          <div 
            key={i} 
            className="p-5 md:p-6 bg-white/[0.02] rounded-lg border border-white/5 
                       hover:border-eve-green/20 transition-colors duration-300"
          >
            <div className="text-2xl md:text-3xl font-extralight text-eve-green">
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
