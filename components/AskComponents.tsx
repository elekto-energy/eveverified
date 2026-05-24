'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// STATUS BADGES — Consistent across all Ask pages
// ═══════════════════════════════════════════════════════════════════════════════

export type TruthStatus = 
  | 'VERIFIED' 
  | 'SCOPE_VERIFIED' 
  | 'ABSENT' 
  | 'SOURCE_TYPE_MISMATCH' 
  | 'BLOCKED'
  | 'ERROR'
  | 'LOADING'

interface StatusBadgeProps {
  status: TruthStatus
  showTooltip?: boolean
}

const STATUS_CONFIG: Record<TruthStatus, {
  icon: string
  label: string
  color: string
  bgColor: string
  borderColor: string
  tooltip: string
}> = {
  VERIFIED: {
    icon: '🟢',
    label: 'VERIFIED',
    color: 'text-eve-green',
    bgColor: 'bg-eve-green/10',
    borderColor: 'border-eve-green/30',
    tooltip: 'This data exists in Trinity\'s verified index. It has been imported, hashed, and sealed.',
  },
  SCOPE_VERIFIED: {
    icon: '🟡',
    label: 'SCOPE VERIFIED',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30',
    tooltip: 'The scope is valid and contains verified data, but no exact match was found for this query.',
  },
  SOURCE_TYPE_MISMATCH: {
    icon: '🟠',
    label: 'SOURCE TYPE MISMATCH',
    color: 'text-eve-orange',
    bgColor: 'bg-eve-orange/10',
    borderColor: 'border-eve-orange/30',
    tooltip: 'This question requires a different type of source than what is currently verified.',
  },
  ABSENT: {
    icon: '🔴',
    label: 'PROOF OF ABSENCE',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/30',
    tooltip: 'No verified source exists for this query in the searched scope. This is a cryptographic proof.',
  },
  BLOCKED: {
    icon: '🔒',
    label: 'BLOCKED',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/30',
    tooltip: 'This query was blocked by policy or validation rules.',
  },
  ERROR: {
    icon: '❌',
    label: 'ERROR',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    tooltip: 'An error occurred while processing this request.',
  },
  LOADING: {
    icon: '⏳',
    label: 'VERIFYING',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/30',
    tooltip: 'Checking Trinity verified index...',
  },
}

export function StatusBadge({ status, showTooltip = true }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  
  return (
    <div className="relative group inline-flex">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
        <span>{config.icon}</span>
        <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
      </div>
      
      {showTooltip && (
        <div className="absolute left-0 top-full mt-2 w-64 p-3 rounded-lg bg-black/95 border border-white/10 
                      opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-xs">
          <div className={`font-medium mb-1 ${config.color}`}>{config.label}</div>
          <div className="text-gray-400">{config.tooltip}</div>
        </div>
      )}
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// INSTANT TRUTH CARD — Stage 1 of Two-Stage Ask
// ═══════════════════════════════════════════════════════════════════════════════

interface VerifiedData {
  ref: string
  eve_id: string
  source: string
  approved_at: string
  approved_by: string
  content_hash: string
  vault_proof: string
  human_attestation?: boolean
}

interface ScopeMeta {
  description: string
  source: string
  trust_tier: string
}

interface ScopeCoverage {
  total_entries: number
  description: string
  source: string
}

interface InstantTruthCardProps {
  isLoading: boolean
  status: TruthStatus | null
  query?: string
  instantMs?: number
  verified?: VerifiedData
  matchCount?: number
  scopeMeta?: ScopeMeta
  scopeCoverage?: ScopeCoverage
  note?: string
  error?: string
}

export function InstantTruthCard({
  isLoading,
  status,
  query,
  instantMs,
  verified,
  matchCount,
  scopeMeta,
  scopeCoverage,
  note,
  error,
}: InstantTruthCardProps) {
  const [showProvenance, setShowProvenance] = useState(false)
  
  // Determine border color based on status
  const getBorderClass = () => {
    if (!status || isLoading) return 'border-white/10'
    switch (status) {
      case 'VERIFIED': return 'border-eve-green/30 bg-eve-green/5'
      case 'SCOPE_VERIFIED': return 'border-yellow-400/30 bg-yellow-400/5'
      case 'ABSENT': return 'border-red-400/30 bg-red-400/5'
      case 'SOURCE_TYPE_MISMATCH': return 'border-eve-orange/30 bg-eve-orange/5'
      case 'BLOCKED': return 'border-gray-400/30 bg-gray-400/5'
      case 'ERROR': return 'border-red-500/30 bg-red-500/5'
      default: return 'border-white/10'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl p-6 border ${getBorderClass()}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-lg">⚡</span>
          <span className="text-xs text-white font-medium tracking-wider">INSTANT TRUTH</span>
          {instantMs !== undefined && (
            <span className="text-xs text-gray-500">{instantMs}ms</span>
          )}
        </div>
        {isLoading && (
          <span className="text-xs text-gray-500 animate-pulse">Verifying...</span>
        )}
        {status && !isLoading && (
          <StatusBadge status={status} />
        )}
      </div>

      {/* Loading state */}
      {isLoading && !status && (
        <div className="h-16 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-eve-green/30 border-t-eve-green rounded-full animate-spin" />
        </div>
      )}

      {/* VERIFIED result */}
      {status === 'VERIFIED' && verified && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Reference</div>
              <div className="text-white font-mono text-sm">{verified.ref}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">EVE-ID</div>
              <div className="text-eve-cyan font-mono text-sm">{verified.eve_id}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Source</div>
              <div className="text-white">{verified.source}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Matches</div>
              <div className="text-white">{matchCount} verified entries</div>
            </div>
          </div>

          {/* Provenance toggle */}
          <button
            onClick={() => setShowProvenance(!showProvenance)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                      bg-black/30 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-eve-green">🔒</span>
              <span className="text-xs text-gray-400">Vault: {verified.vault_proof?.slice(0, 12)}...</span>
            </div>
            <span className="text-xs text-gray-600">{showProvenance ? '▲' : '▼'}</span>
          </button>

          {showProvenance && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-lg bg-black/30 text-xs space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-gray-500">Approved by:</span> <span className="text-white">{verified.approved_by}</span></div>
                <div><span className="text-gray-500">Approved:</span> <span className="text-white">{new Date(verified.approved_at).toLocaleDateString()}</span></div>
                <div><span className="text-gray-500">Content Hash:</span> <span className="text-white font-mono">{verified.content_hash?.slice(0, 20)}...</span></div>
                <div><span className="text-gray-500">Human Attested:</span> <span className="text-white">{verified.human_attestation ? 'Yes' : 'No'}</span></div>
              </div>
              {scopeMeta && (
                <div className="pt-2 border-t border-white/5 text-gray-500">
                  {scopeMeta.description} • Trust Tier: {scopeMeta.trust_tier}
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* SCOPE_VERIFIED result */}
      {status === 'SCOPE_VERIFIED' && (
        <div className="space-y-4">
          <p className="text-gray-300">
            The scope <span className="text-white font-medium">{scopeMeta?.description}</span> is verified, 
            but no exact match found for your query.
          </p>
          {scopeCoverage && (
            <div className="p-3 rounded-lg bg-black/30 border border-white/5">
              <div className="text-xs text-gray-500 mb-2">Scope coverage</div>
              <div className="text-sm text-white">{scopeCoverage.total_entries} verified entries</div>
              <div className="text-xs text-gray-500 mt-1">from {scopeCoverage.source}</div>
            </div>
          )}
        </div>
      )}

      {/* PROOF OF ABSENCE */}
      {status === 'ABSENT' && (
        <div className="space-y-4">
          <p className="text-gray-300">
            No verified source for <span className="text-white font-medium">"{query}"</span> in this scope.
          </p>
          {scopeCoverage && (
            <div className="p-3 rounded-lg bg-black/30 border border-white/5">
              <div className="text-xs text-gray-500 mb-2">Scope searched</div>
              <div className="text-sm text-white">{scopeCoverage.description}</div>
              <div className="text-xs text-gray-500 mt-1">
                {scopeCoverage.total_entries} verified entries from {scopeCoverage.source}
              </div>
            </div>
          )}
          {note && (
            <p className="text-xs text-red-400">{note}</p>
          )}
        </div>
      )}

      {/* ERROR */}
      {status === 'ERROR' && (
        <div className="text-red-400">
          Error: {error}
        </div>
      )}
    </motion.div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// ANALYSIS CARD — Stage 2 of Two-Stage Ask (Intelligent Witness)
// ═══════════════════════════════════════════════════════════════════════════════

interface WitnessSource {
  ref: string
  eve_id: string
  title: string
  source_name: string
}

interface AnalysisCardProps {
  isLoading: boolean
  status: 'VERIFIED' | 'INSUFFICIENT_DATA' | 'BLOCKED' | 'ERROR' | null
  answer?: string
  sources?: WitnessSource[]
  refsUsed?: string[]
  synthesisTimeMs?: number
  blockedReason?: string
  error?: string
  collapsed?: boolean
  onToggle?: () => void
}

export function AnalysisCard({
  isLoading,
  status,
  answer,
  sources,
  refsUsed,
  synthesisTimeMs,
  blockedReason,
  error,
  collapsed = false,
  onToggle,
}: AnalysisCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-xl p-6 bg-black/40 border border-white/10"
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <span className="text-xs text-white font-medium tracking-wider">ANALYSIS</span>
          <span className="text-xs text-gray-500">(optional)</span>
        </div>
        <div className="flex items-center gap-3">
          {isLoading && (
            <span className="text-xs text-gray-500 animate-pulse">Synthesizing...</span>
          )}
          {synthesisTimeMs && (
            <span className="text-xs text-gray-500">{synthesisTimeMs}ms</span>
          )}
          {onToggle && (
            <span className="text-xs text-gray-600">{collapsed ? '▼' : '▲'}</span>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      {!collapsed && (
        <div className="text-xs text-gray-500 mb-4 pb-4 border-b border-white/5">
          Interpretation. Not sealed. Every statement references verified sources.
        </div>
      )}

      {/* Loading state */}
      {isLoading && !collapsed && (
        <div className="h-16 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-eve-purple/30 border-t-eve-purple rounded-full animate-spin" />
            <span className="text-sm text-gray-400">Generating explanation from verified sources...</span>
          </div>
        </div>
      )}

      {/* Content (when not collapsed) */}
      {!isLoading && !collapsed && (
        <div className="space-y-4">
          {/* VERIFIED answer */}
          {status === 'VERIFIED' && answer && (
            <>
              <div className="text-gray-200 leading-relaxed">{answer}</div>
              
              {/* Sources list */}
              {sources && sources.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <div className="text-xs text-gray-500 mb-2">Sources referenced</div>
                  <div className="space-y-2">
                    {sources.map((src, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-eve-cyan">[{i + 1}]</span>
                        <span className="text-white">{src.title}</span>
                        <span className="text-gray-500">({src.eve_id})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* INSUFFICIENT_DATA */}
          {status === 'INSUFFICIENT_DATA' && (
            <div className="text-gray-400">
              The verified sources do not contain sufficient information to answer this question.
              {blockedReason && <div className="mt-2 text-xs text-gray-500">{blockedReason}</div>}
            </div>
          )}

          {/* BLOCKED */}
          {status === 'BLOCKED' && (
            <div className="text-eve-orange">
              This answer was blocked: {blockedReason}
            </div>
          )}

          {/* ERROR */}
          {status === 'ERROR' && (
            <div className="text-red-400">
              Error: {error}
            </div>
          )}
        </div>
      )}

      {/* Collapsed state */}
      {collapsed && (
        <div className="text-xs text-gray-500">
          Click to expand analysis
        </div>
      )}
    </motion.div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// EMPTY STATE
// ═══════════════════════════════════════════════════════════════════════════════

interface EmptyStateProps {
  message?: string
  icon?: string
}

export function EmptyState({ message = "No verified entries yet", icon = "📭" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <span className="text-4xl mb-4">{icon}</span>
      <span className="text-sm">{message}</span>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// COPY FEEDBACK
// ═══════════════════════════════════════════════════════════════════════════════

interface CopyButtonProps {
  text: string
  label?: string
}

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10 
                hover:bg-white/10 transition-colors"
    >
      {copied ? '✓ Copied' : label}
    </button>
  )
}
