'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// API endpoints
const TRINITY_API = process.env.NEXT_PUBLIC_TRINITY_API ?? 'http://127.0.0.1:8000'
const MEDICAL_API = process.env.NEXT_PUBLIC_MEDICAL_API ?? 'http://localhost:3050'

// Knowledge class definitions
const KNOWLEDGE_CLASSES = {
  adverse_events: {
    label: 'Adverse Events',
    sources: ['FDA FAERS'],
    available: true,
  },
  indications: {
    label: 'Indications / Usage',
    sources: ['FDA Drug Labels', 'FASS', 'EMA SPC'],
    available: false,  // Not yet verified
  },
  mechanism: {
    label: 'Mechanism of Action',
    sources: ['Pharmacology texts', 'FDA Labels'],
    available: false,
  },
  statistics: {
    label: 'Safety Statistics',
    sources: ['FDA FAERS aggregates'],
    available: true,
  },
}

// Intent patterns for classification
const INTENT_PATTERNS = {
  indications: [
    /vad används .* för/i,
    /what is .* used for/i,
    /indikation/i,
    /indication/i,
    /behandl/i,
    /treat/i,
    /usage/i,
    /användning/i,
  ],
  mechanism: [
    /hur fungerar/i,
    /how does .* work/i,
    /mechanism/i,
    /verkningsmekanism/i,
    /verkningssätt/i,
  ],
  adverse_events: [
    /biverkn/i,
    /side effect/i,
    /adverse/i,
    /reaction/i,
    /säkerhet/i,
    /safety/i,
  ],
  statistics: [
    /hur många/i,
    /how many/i,
    /statistik/i,
    /statistic/i,
    /dödsfall/i,
    /death/i,
    /antal/i,
    /count/i,
  ],
}

function classifyIntent(query: string): string {
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(query)) {
        return intent
      }
    }
  }
  // Default to adverse_events (what we have)
  return 'adverse_events'
}

// ═══════════════════════════════════════════════════════════════════════════════
// TWO-STAGE ASK — Instant Truth → Streaming Explanation
// ARCH: ARCH_TWO_STAGE_ASK_v1.md (LOCKED 2026-02-05)
// ═══════════════════════════════════════════════════════════════════════════════

// Stage 1: Instant Verified Response (from Trinity)
interface InstantResponse {
  status: 'VERIFIED' | 'SCOPE_VERIFIED' | 'ABSENT' | 'INVALID_SCOPE' | 'ERROR'
  query: string
  scope: string
  instant_ms: number
  verified?: {
    ref: string
    eve_id: string
    source: string
    approved_at: string
    approved_by: string
    content_hash: string
    vault_proof: string
    human_attestation: boolean
  }
  match_count?: number
  all_matches?: Array<{
    ref: string
    eve_id: string
    source: string
    approved_at: string
  }>
  scope_meta?: {
    description: string
    source: string
    trust_tier: string
  }
  // Proof of Absence fields
  scope_coverage?: {
    total_entries: number
    description: string
    source: string
  }
  note?: string
  error?: string
}

// Stage 2: Analysis Response (from Medical API / Claude)
interface AnalysisResponse {
  status: string
  answer: string | { text: string; language?: string; confidence?: number }
  evidence?: {
    total_matching: number
    top_reactions?: { reaction: string; count: number; percent: number }[]
    seriousness?: { serious: number; non_serious: number }
    outcomes?: Record<string, number>
  }
  verification?: {
    corpus_version?: string
    root_hash?: string
    governance?: string
  }
  corpus?: {
    version: string
    root_hash: string
  }
  processing_time_ms?: number
  disclaimer?: string
  eve_decision_id?: string
}

interface IndexResponse {
  scope: string
  count: number
  entries: Array<{
    ref: string
    eve_id: string
    source: string
  }>
}

export default function AskMedicalPage() {
  const [query, setQuery] = useState('')
  
  // Stage 1: Instant (fast)
  const [isLoadingInstant, setIsLoadingInstant] = useState(false)
  const [instantResult, setInstantResult] = useState<InstantResponse | null>(null)
  
  // Stage 2: Analysis (slow)
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  
  // Scope info
  const [scopeInfo, setScopeInfo] = useState<IndexResponse | null>(null)
  const [scopeError, setScopeError] = useState<string | null>(null)
  
  // UI state
  const [showProvenance, setShowProvenance] = useState(false)
  const [scopeMismatch, setScopeMismatch] = useState<{
    detected: string
    required: string[]
    available: string[]
  } | null>(null)
  const [ayurvedaRedirect, setAyurvedaRedirect] = useState<string | null>(null)

  // Ayurvedic herbs/terms that should redirect to Ayurveda system
  const AYURVEDA_TERMS = [
    'ashwagandha', 'withania', 'tulsi', 'holy basil', 'turmeric', 'curcuma',
    'brahmi', 'bacopa', 'triphala', 'amla', 'amalaki', 'neem', 'guduchi',
    'shatavari', 'gotu kola', 'centella', 'arjuna', 'shilajit', 'guggul',
    'manjistha', 'licorice', 'yashtimadhu', 'haritaki', 'bibhitaki',
    'ayurveda', 'ayurvedic', 'dosha', 'vata', 'pitta', 'kapha', 'rasayana',
    'churna', 'kwath', 'bhasma', 'ghrita', 'taila', 'lepa',
  ]

  // Load scope info on mount
  useEffect(() => {
    async function loadScopeInfo() {
      try {
        const res = await fetch(`${TRINITY_API}/api/v1/trinity/index/medical`)
        if (res.ok) {
          const data = await res.json()
          setScopeInfo(data)
        } else {
          setScopeError('Could not connect to Trinity API')
        }
      } catch (e) {
        setScopeError('Trinity API offline')
      }
    }
    loadScopeInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Reset all state
    setInstantResult(null)
    setAnalysisResult(null)
    setAnalysisError(null)
    setScopeMismatch(null)
    setAyurvedaRedirect(null)
    setShowProvenance(false)
    
    // Check for Ayurvedic terms → redirect to Ayurveda system
    const queryLower = query.toLowerCase()
    const matchedAyurveda = AYURVEDA_TERMS.find(term => queryLower.includes(term))
    if (matchedAyurveda) {
      setAyurvedaRedirect(matchedAyurveda)
      return
    }
    
    // Step 1: Classify intent (for scope mismatch detection)
    const detectedIntent = classifyIntent(query)
    const knowledgeClass = KNOWLEDGE_CLASSES[detectedIntent as keyof typeof KNOWLEDGE_CLASSES]

    if (!knowledgeClass.available) {
      setScopeMismatch({
        detected: knowledgeClass.label,
        required: knowledgeClass.sources,
        available: ['FDA FAERS (adverse events only)'],
      })
      return
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TWO-STAGE ASK: Sequential (Stage 1 first, then Stage 2)
    // Stage 1: Instant Truth (Trinity) — shows immediately
    // Stage 2: Analysis (Claude) — starts after Stage 1 if VERIFIED
    // ═══════════════════════════════════════════════════════════════════════
    
    // Stage 1 first
    setIsLoadingInstant(true)

    // Stage 1: Instant (fast) — Trinity verified lookup
    fetch(`${TRINITY_API}/api/v1/ask/medical/fast?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then((data: InstantResponse) => {
        setInstantResult(data)
        setIsLoadingInstant(false)
        
        // Only start analysis if we have verified data
        if (data.status === 'VERIFIED' || data.status === 'SCOPE_VERIFIED') {
          setIsLoadingAnalysis(true)
          
          // Stage 2: Analysis (slow) — Medical API with Claude
          fetch(`${MEDICAL_API}/query/natural`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: query })
          })
            .then(res => {
              if (!res.ok) throw new Error(`Medical API error: ${res.status}`)
              return res.json()
            })
            .then((data: AnalysisResponse) => {
              setAnalysisResult(data)
              setIsLoadingAnalysis(false)
            })
            .catch(err => {
              console.error('Analysis failed:', err)
              setAnalysisError(err instanceof Error ? err.message : 'Analysis failed')
              setIsLoadingAnalysis(false)
            })
        }
      })
      .catch(err => {
        console.error('Instant query failed:', err)
        setIsLoadingInstant(false)
      })
  }

  // Streaming text state
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  // Stream text effect when analysis arrives
  useEffect(() => {
    if (analysisResult && !isStreaming) {
      const fullText = typeof analysisResult.answer === 'string' 
        ? analysisResult.answer 
        : (analysisResult.answer?.text || '')
      
      if (fullText && displayedText !== fullText) {
        setIsStreaming(true)
        let index = 0
        const interval = setInterval(() => {
          index += 3 // Characters per tick
          setDisplayedText(fullText.slice(0, index))
          if (index >= fullText.length) {
            clearInterval(interval)
            setIsStreaming(false)
          }
        }, 15) // ~60 chars/sec
        return () => clearInterval(interval)
      }
    }
  }, [analysisResult])

  // Reset displayed text on new query
  useEffect(() => {
    if (isLoadingAnalysis) {
      setDisplayedText('')
    }
  }, [isLoadingAnalysis])

  // Rich example queries with descriptions
  const exampleQueries = [
    { q: 'biverkningar av aspirin', label: 'Aspirin', desc: 'Vanliga biverkningar' },
    { q: 'warfarin safety', label: 'Warfarin', desc: 'Blodförtunnande' },
    { q: 'metformin reactions', label: 'Metformin', desc: 'Diabetesmedicin' },
    { q: 'sertraline side effects', label: 'Sertraline', desc: 'Antidepressivum' },
    { q: 'alvedon', label: 'Alvedon', desc: '→ paracetamol' },
    { q: 'ipren', label: 'Ipren', desc: '→ ibuprofen' },
  ]

  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <a href="/ask" className="hover:text-white transition-colors">ASK</a>
              <span>/</span>
              <span className="text-eve-cyan">Medical</span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl"
                style={{ 
                  backgroundColor: '#00d4ff15', 
                  border: '1px solid #00d4ff40',
                }}
              >
                ⚕
              </div>
              <div>
                <h1 className="text-3xl font-light tracking-wide">Medical Evidence</h1>
                <p className="text-gray-500 text-sm">FDA FAERS Adverse Event Data</p>
              </div>
            </div>

            {/* Verified scope badge */}
            <div className="inline-flex flex-col items-start gap-0.5 px-4 py-2 rounded-lg 
                           bg-eve-green/5 border border-eve-green/20 mt-4">
              <span className="text-xs text-white font-medium">Verified Scope: Adverse Events</span>
              <span className="text-xs text-eve-green">37 drugs from FDA FAERS. No indications or mechanism data.</span>
            </div>

            {/* Status indicators */}
            <div className="mt-4 flex items-center gap-4 text-xs">
              {scopeInfo && (
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-eve-green" />
                  <span>Trinity — {scopeInfo.count} verified</span>
                </div>
              )}
              {scopeError && (
                <div className="flex items-center gap-2 text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>{scopeError}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Query input */}
      <section className="pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about adverse events — What are side effects of aspirin?"
                className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 
                          text-white placeholder-gray-500 focus:outline-none focus:border-eve-cyan/50
                          transition-colors"
              />
              <button
                type="submit"
                disabled={isLoadingInstant || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg
                          bg-eve-cyan/20 border border-eve-cyan/40 text-eve-cyan text-sm
                          hover:bg-eve-cyan/30 transition-colors disabled:opacity-50"
              >
                {isLoadingInstant ? 'Verifying...' : 'Ask EVE'}
              </button>
            </div>
          </motion.form>

          {/* Example queries - rich format */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2"
          >
            {exampleQueries.map((eq, i) => (
              <button
                key={i}
                onClick={() => setQuery(eq.q)}
                className="text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10
                          hover:bg-white/10 hover:border-eve-cyan/30 transition-all group"
              >
                <div className="text-sm text-white group-hover:text-eve-cyan transition-colors">{eq.label}</div>
                <div className="text-xs text-gray-500">{eq.desc}</div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scope Mismatch (not Proof of Absence) */}
      {scopeMismatch && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 bg-black/40 border border-yellow-500/30"
            >
              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">⚠️</span>
                <span className="text-sm text-yellow-400 font-medium">Source Type Mismatch</span>
              </div>

              {/* Explanation */}
              <div className="space-y-4">
                <p className="text-gray-300">
                  This question asks about <span className="text-white font-medium">{scopeMismatch.detected}</span>.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                    <div className="text-xs text-gray-500 mb-2">Required sources</div>
                    <div className="space-y-1">
                      {scopeMismatch.required.map((s, i) => (
                        <div key={i} className="text-sm text-yellow-400">{s}</div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                    <div className="text-xs text-gray-500 mb-2">Currently verified</div>
                    <div className="space-y-1">
                      {scopeMismatch.available.map((s, i) => (
                        <div key={i} className="text-sm text-gray-400">{s}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-eve-orange font-medium">
                  EVE cannot answer this — by design.
                </p>
              </div>

              {/* No LLM fallback for scope mismatch */}
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-500">
                💡 To answer this question, EVE would need verified sources for {scopeMismatch.detected}.
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Ayurveda Redirect */}
      {ayurvedaRedirect && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 bg-amber-500/5 border border-amber-500/30"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🪷</span>
                <span className="text-amber-500 font-medium">Traditional Knowledge System</span>
              </div>

              {/* Explanation */}
              <div className="space-y-4">
                <p className="text-gray-300">
                  Your question mentions <span className="text-white font-medium">"{ayurvedaRedirect}"</span>, 
                  which belongs to <span className="text-amber-500 font-medium">Ayurveda</span> — 
                  a traditional medical system outside EVE's regulatory scope.
                </p>

                <div className="p-4 rounded-lg bg-black/30 border border-amber-500/20">
                  <div className="text-xs text-gray-500 mb-2">Why separate?</div>
                  <p className="text-sm text-gray-400">
                    EVE verifies <span className="text-white">regulatory and accountable</span> medical knowledge 
                    (FDA, EMA, Swedish law). Ayurveda has different epistemic foundations — textual tradition 
                    rather than clinical trials.
                  </p>
                </div>

                <p className="text-amber-500 text-sm">
                  ✓ Both are valid knowledge systems. They're just verified differently.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="http://localhost:3002/ask"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                            bg-amber-500/20 border border-amber-500/40 text-amber-500
                            hover:bg-amber-500/30 transition-colors"
                >
                  <span>Explore in Ayurveda system</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="text-xs text-gray-600 mt-3">
                  407 herb monographs from the Ayurvedic Pharmacopoeia of India (Government source)
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TWO-STAGE ASK RESULTS
          Stage 1: ⚡ Instant Verified Answer (from Trinity)
          Stage 2: 📝 Analysis (from Medical API / Claude)
          ═══════════════════════════════════════════════════════════════════════ */}

      {/* Stage 1: INSTANT VERIFIED ANSWER */}
      {(isLoadingInstant || instantResult) && (
        <section className="pb-4 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl p-6 border ${
                instantResult?.status === 'VERIFIED' 
                  ? 'bg-eve-green/5 border-eve-green/30' 
                  : instantResult?.status === 'ABSENT'
                  ? 'bg-red-500/5 border-red-500/30'
                  : 'bg-black/40 border-white/10'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs text-white font-medium tracking-wider">INSTANT TRUTH</span>
                  {instantResult?.instant_ms !== undefined && (
                    <span className="text-xs text-gray-500">{instantResult.instant_ms}ms</span>
                  )}
                </div>
                {isLoadingInstant && (
                  <span className="text-xs text-gray-500 animate-pulse">Verifying...</span>
                )}
              </div>

              {/* Loading state */}
              {isLoadingInstant && !instantResult && (
                <div className="h-16 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-eve-green/30 border-t-eve-green rounded-full animate-spin" />
                </div>
              )}

              {/* VERIFIED result */}
              {instantResult?.status === 'VERIFIED' && instantResult.verified && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-eve-green" />
                      <span className="text-eve-green font-medium">VERIFIED</span>
                    </div>
                    {/* Status badge with tooltip */}
                    <div className="relative group">
                      <div className="px-2 py-0.5 rounded text-xs bg-eve-green/10 text-eve-green border border-eve-green/30 cursor-help">
                        ✓ Source exists
                      </div>
                      <div className="absolute left-0 top-full mt-2 w-64 p-3 rounded-lg bg-black/95 border border-white/10 
                                    opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-xs">
                        <div className="text-white font-medium mb-1">Verified Source</div>
                        <div className="text-gray-400">
                          This data exists in Trinity's verified index. It has been imported, hashed, and sealed.
                          Interpretation may follow via Witness AI.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Reference</div>
                      <div className="text-white font-mono text-sm">{instantResult.verified.ref}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">EVE-ID</div>
                      <div className="text-eve-cyan font-mono text-sm">{instantResult.verified.eve_id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Source</div>
                      <div className="text-white">{instantResult.verified.source}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Matches</div>
                      <div className="text-white">{instantResult.match_count} verified entries</div>
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
                      <span className="text-xs text-gray-400">Vault: {instantResult.verified.vault_proof?.slice(0, 12)}...</span>
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
                        <div><span className="text-gray-500">Approved by:</span> <span className="text-white">{instantResult.verified.approved_by}</span></div>
                        <div><span className="text-gray-500">Approved:</span> <span className="text-white">{new Date(instantResult.verified.approved_at).toLocaleDateString()}</span></div>
                        <div><span className="text-gray-500">Content Hash:</span> <span className="text-white font-mono">{instantResult.verified.content_hash?.slice(0, 20)}...</span></div>
                        <div><span className="text-gray-500">Human Attested:</span> <span className="text-white">{instantResult.verified.human_attestation ? 'Yes' : 'No'}</span></div>
                      </div>
                      <div className="pt-2 border-t border-white/5 text-gray-500">
                        {instantResult.scope_meta?.description} • Trust Tier: {instantResult.scope_meta?.trust_tier}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* PROOF OF ABSENCE */}
              {instantResult?.status === 'ABSENT' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-red-400 font-medium">PROOF OF ABSENCE</span>
                  </div>
                  
                  <p className="text-gray-300">
                    No verified source for <span className="text-white font-medium">"{instantResult.query}"</span> in this scope.
                  </p>

                  <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                    <div className="text-xs text-gray-500 mb-2">Scope searched</div>
                    <div className="text-sm text-white">{instantResult.scope_coverage?.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {instantResult.scope_coverage?.total_entries} verified entries from {instantResult.scope_coverage?.source}
                    </div>
                  </div>

                  <p className="text-xs text-red-400">
                    {instantResult.note}
                  </p>
                </div>
              )}

              {/* ERROR */}
              {instantResult?.status === 'ERROR' && (
                <div className="text-red-400">
                  Error: {instantResult.error}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Stage 2: ANALYSIS (AI-assisted) */}
      {(isLoadingAnalysis || analysisResult || analysisError) && instantResult?.status === 'VERIFIED' && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-xl p-6 bg-black/40 border border-white/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👁</span>
                  <span className="text-xs text-white font-medium tracking-wider">WITNESS AI</span>
                  <span className="text-xs text-eve-purple/80">(EU AI Act Compliant)</span>
                </div>
                {isLoadingAnalysis && (
                  <span className="text-xs text-gray-500 animate-pulse">Generating explanation...</span>
                )}
                {analysisResult?.processing_time_ms && (
                  <span className="text-xs text-gray-500">{analysisResult.processing_time_ms}ms</span>
                )}
              </div>

              {/* Loading state */}
              {isLoadingAnalysis && !analysisResult && (
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 bg-white/5 rounded animate-pulse w-4/5" />
                  <div className="h-4 bg-white/5 rounded animate-pulse w-3/5" />
                </div>
              )}

              {/* Error */}
              {analysisError && (
                <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>👁</span>
                    <span className="text-sm">Witness AI unavailable</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    The verified truth above stands alone. AI explanation is optional.
                  </p>
                </div>
              )}

              {/* Analysis result */}
              {analysisResult && (
                <div className="space-y-4">
                  {/* Streaming answer text */}
                  <div className="text-gray-300 leading-relaxed">
                    {displayedText}
                    {isStreaming && <span className="inline-block w-2 h-4 bg-eve-cyan/50 animate-pulse ml-1" />}
                  </div>

                  {/* Reactions - show after streaming completes */}
                  {!isStreaming && analysisResult.evidence?.top_reactions && analysisResult.evidence.top_reactions.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4"
                    >
                      <div className="text-xs text-gray-500 mb-3">
                        Top reactions ({analysisResult.evidence.total_matching} reports)
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {analysisResult.evidence.top_reactions.slice(0, 6).map((r, i) => (
                          <div key={i} className="px-3 py-2 rounded bg-black/30 border border-white/5">
                            <div className="text-sm text-white">{r.reaction}</div>
                            <div className="text-xs text-eve-cyan">{r.percent}%</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Why this answer is allowed - Story View */}
                  {!isStreaming && instantResult?.verified && (
                    <motion.details
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 group"
                    >
                      <summary className="cursor-pointer text-xs text-eve-purple hover:text-eve-purple/80 transition-colors list-none flex items-center gap-2">
                        <span>📖</span>
                        <span>Why is this answer allowed?</span>
                        <span className="text-gray-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-3 p-4 rounded-lg bg-eve-purple/5 border border-eve-purple/20 text-xs space-y-3">
                        <div className="font-medium text-eve-purple">Provenance Chain</div>
                        <ol className="space-y-2 text-gray-400">
                          <li className="flex items-start gap-2">
                            <span className="text-eve-green">1.</span>
                            <span><strong className="text-white">Source Import:</strong> FDA FAERS adverse event data imported with cryptographic hash</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-eve-green">2.</span>
                            <span><strong className="text-white">Trinity Approval:</strong> {instantResult.verified.eve_id} approved by {instantResult.verified.approved_by}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-eve-green">3.</span>
                            <span><strong className="text-white">Vault Seal:</strong> Cryptographically sealed — {instantResult.verified.vault_proof}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-eve-cyan">4.</span>
                            <span><strong className="text-white">Witness AI:</strong> Explains verified data only — cannot add new facts</span>
                          </li>
                        </ol>
                        <div className="pt-2 border-t border-white/10 text-gray-500">
                          This answer exists because every step in the chain is verified. 
                          RAG systems cannot provide this guarantee.
                        </div>
                      </div>
                    </motion.details>
                  )}

                  {/* Disclaimer — Witness AI governance */}
                  {!isStreaming && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-start gap-2">
                        <span className="text-eve-purple">🔒</span>
                        <div>
                          <p className="text-xs text-eve-purple/80 font-medium">
                            Witness AI — Governed by Trinity
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            This explanation interprets verified data only. AI may describe — never decide.
                          </p>
                          {analysisResult.disclaimer && (
                            <p className="text-xs text-gray-500 mt-1">
                              {analysisResult.disclaimer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Corpus info */}
      <section className="pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Verified Drugs', value: scopeInfo?.count?.toString() || '—', color: '#00d4ff' },
              { label: 'Knowledge Class', value: 'Adverse Events', color: '#00ff88' },
              { label: 'Approval Type', value: 'INITIAL_IMPORT', color: '#ff6b00' },
              { label: 'Corpus', value: 'FDA FAERS', color: '#a855f7' },
            ].map((stat, i) => (
              <div 
                key={i}
                className="p-4 rounded-lg bg-black/30 border border-white/5 text-center"
              >
                <div className="text-xl font-light" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Key statement */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              "EVE knows what kind of answer this is. EVE knows which sources are required. 
              And EVE can prove when those sources don't exist."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
