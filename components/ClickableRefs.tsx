'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Source {
  ref: string
  eve_id?: string
  title?: string
  content?: string
  source_name?: string
}

interface ClickableRefsProps {
  text: string
  sources: Source[]
}

/**
 * Renders text with clickable reference numbers [1], [2], etc.
 * When clicked, shows a popup with the source content.
 */
export function ClickableRefs({ text, sources }: ClickableRefsProps) {
  const [activeRef, setActiveRef] = useState<number | null>(null)
  
  // Parse text and find [1], [2], etc.
  const parts = text.split(/(\[\d+\])/g)
  
  return (
    <div className="relative">
      <div className="text-gray-300 leading-relaxed">
        {parts.map((part, i) => {
          const match = part.match(/\[(\d+)\]/)
          if (match) {
            const refNum = parseInt(match[1])
            const source = sources[refNum - 1] // [1] = sources[0]
            
            return (
              <span key={i} className="relative inline">
                <button
                  onClick={() => setActiveRef(activeRef === refNum ? null : refNum)}
                  className="inline-flex items-center justify-center w-5 h-5 mx-0.5 
                           text-xs font-medium rounded bg-eve-green/20 text-eve-green 
                           border border-eve-green/30 hover:bg-eve-green/30 
                           transition-colors cursor-pointer"
                  title={source?.title || `Källa ${refNum}`}
                >
                  {refNum}
                </button>
                
                {/* Popup for this reference */}
                <AnimatePresence>
                  {activeRef === refNum && source && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 top-full mt-2 z-50 w-96 max-w-[90vw]"
                    >
                      <div className="rounded-lg bg-black/95 border border-eve-green/30 shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 bg-eve-green/10 border-b border-eve-green/20 
                                      flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {source.title || `Källa ${refNum}`}
                            </div>
                            <div className="text-xs text-eve-green font-mono mt-0.5">
                              {source.ref}
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveRef(null)}
                            className="text-gray-400 hover:text-white"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {/* Content - full verified text */}
                        <div className="px-4 py-3 max-h-72 overflow-y-auto">
                          <div className="text-sm text-gray-300 leading-relaxed">
                            {source.content || 'Ingen förhandsgranskning tillgänglig.'}
                          </div>
                        </div>
                        
                        {/* Footer - Trinity provenance */}
                        <div className="px-4 py-3 bg-black/50 border-t border-white/5 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-eve-green">🔒</span>
                            <span className="text-xs text-gray-400">Verifierad av Trinity</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {source.eve_id && (
                              <div>
                                <span className="text-gray-500">EVE-ID:</span>
                                <span className="text-eve-green font-mono ml-1">{source.eve_id}</span>
                              </div>
                            )}
                            {source.source_name && (
                              <div>
                                <span className="text-gray-500">Källa:</span>
                                <span className="text-white ml-1">{source.source_name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </div>
      
      {/* Backdrop to close popup when clicking outside */}
      {activeRef !== null && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveRef(null)}
        />
      )}
    </div>
  )
}

/**
 * Simple inline reference badge (non-interactive, for display only)
 */
export function RefBadge({ num }: { num: number }) {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 mx-0.5 
                   text-[10px] font-medium rounded bg-eve-green/20 text-eve-green">
      {num}
    </span>
  )
}
