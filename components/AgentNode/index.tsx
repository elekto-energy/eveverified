'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Agent } from '@/data/agents'

interface AgentNodeProps {
  agent: Agent
  size?: 'lg' | 'md' | 'sm'
  onHover?: (id: string | null) => void
  isHovered?: boolean
}

const sizeClasses = {
  lg: 'w-20 h-20 text-2xl',
  md: 'w-14 h-14 text-lg',
  sm: 'w-10 h-10 text-sm'
}

export default function AgentNode({ 
  agent, 
  size = 'md', 
  onHover,
  isHovered = false 
}: AgentNodeProps) {
  const [localHovered, setLocalHovered] = useState(false)
  const showTooltip = isHovered || localHovered
  const isEve = agent.symbol === 'e'

  const handleMouseEnter = () => {
    setLocalHovered(true)
    onHover?.(agent.id)
  }

  const handleMouseLeave = () => {
    setLocalHovered(false)
    onHover?.(null)
  }

  return (
    <div className="relative group">
      {/* Node */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          ${sizeClasses[size]} 
          rounded-full flex flex-col items-center justify-center 
          cursor-pointer transition-all duration-300 border-2
        `}
        style={{
          backgroundColor: showTooltip ? `${agent.color}22` : 'rgba(0,0,0,0.6)',
          borderColor: agent.color,
          boxShadow: showTooltip 
            ? `0 0 25px ${agent.color}50` 
            : `0 0 10px ${agent.color}20`
        }}
      >
        <span 
          style={{ 
            color: agent.color,
            fontFamily: isEve ? 'Georgia, serif' : 'inherit',
            fontStyle: isEve ? 'italic' : 'normal'
          }}
        >
          {agent.symbol}
        </span>

        {/* Ripple effect */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: agent.color }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 
                       bg-black/95 border rounded-lg p-3 
                       min-w-48 max-w-64 z-50"
            style={{ borderColor: `${agent.color}40` }}
          >
            <div 
              className="font-semibold text-sm"
              style={{ color: agent.color }}
            >
              {agent.name}
            </div>
            <div className="text-gray-400 text-xs mt-1 leading-relaxed">
              {agent.description}
            </div>
            
            {/* Children indicator */}
            {agent.children.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <span className="text-xs text-gray-600">
                  {agent.children.length} connected {agent.children.length === 1 ? 'node' : 'nodes'}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
