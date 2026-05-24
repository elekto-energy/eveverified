'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ClickableRefs } from '@/components/ClickableRefs'

// ═══════════════════════════════════════════════════════════════════════════════
// TWO-STAGE ASK — Journalism / Public Access (OSL)
// ARCH: ARCH_TWO_STAGE_ASK_v1.md (LOCKED 2026-02-05)
// ═══════════════════════════════════════════════════════════════════════════════

const TRINITY_API = process.env.NEXT_PUBLIC_TRINITY_API ?? 'http://127.0.0.1:8000'
const SCOPE_KEY = 'legal.osl'

const SCOPE = {
  name: 'Offentlighetsprincipen',
  icon: '📰',
  color: '#ff6b00',
  laws: [
    { id: 'sfs:2009:400', name: 'Offentlighets- och sekretesslagen (OSL)' },
  ]
}

// Types
interface InstantResponse {
  status: 'VERIFIED' | 'SCOPE_VERIFIED' | 'ABSENT' | 'INVALID_SCOPE' | 'ERROR'
  query: string
  search_term?: string
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
  }
  verified_scope?: {
    total_entries: number
    source: string
    trust_tier: string
    description: string
  }
  match_count?: number
  all_matches?: Array<{
    ref: string
    eve_id: string
    source: string
  }>
  scope_meta?: {
    description: string
    source: string
    trust_tier: string
  }
  scope_coverage?: {
    total_entries: number
    description: string
    source: string
  }
  note?: string
  error?: string
}

interface WitnessResponse {
  status: 'VERIFIED' | 'INSUFFICIENT_DATA' | 'BLOCKED' | 'ERROR'
  question: string
  scope: string
  answer?: string
  sources?: Array<{
    ref: string
    eve_id: string
    title: string
    content: string
    source_name: string
    content_hash: string
    vault_proof: string
  }>
  refs_used?: string[]
  synthesis_time_ms?: number
  blocked_reason?: string
  scope_info?: {
    description: string
    source: string
    trust_tier: string
  }
}

export default function AskLegalJournalismPage() {
  const [query, setQuery] = useState('')
  
  // Stage 1: Instant (fast)
  const [isLoadingInstant, setIsLoadingInstant] = useState(false)
  const [instantResult, setInstantResult] = useState<InstantResponse | null>(null)
  
  // Stage 2: Witness (explanation)
  const [isLoadingWitness, setIsLoadingWitness] = useState(false)
  const [witnessResult, setWitnessResult] = useState<WitnessResponse | null>(null)
  const [witnessError, setWitnessError] = useState<string | null>(null)
  
  // UI state
  const [showProvenance, setShowProvenance] = useState(false)
  const [expandedSource, setExpandedSource] = useState<number | null>(null)
  const [indexStats, setIndexStats] = useState<{ count: number } | null>(null)

  // Load index stats on mount
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(`${TRINITY_API}/api/v1/trinity/index/${SCOPE_KEY}`)
        if (res.ok) {
          const data = await res.json()
          setIndexStats({ count: data.count })
        }
      } catch (e) {
        setIndexStats({ count: 620 }) // fallback
      }
    }
    loadStats()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Reset
    setInstantResult(null)
    setWitnessResult(null)
    setWitnessError(null)
    setShowProvenance(false)
    
    // Stage 1 first, Stage 2 after
    setIsLoadingInstant(true)

    // Stage 1: Instant Truth (deterministic, ~20ms)
    fetch(`${TRINITY_API}/api/v1/ask/${SCOPE_KEY}/fast?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then((data: InstantResponse) => {
        setInstantResult(data)
        setIsLoadingInstant(false)
        
        // Only start Witness if we have verified scope
        if (data.status === 'VERIFIED' || data.status === 'SCOPE_VERIFIED') {
          setIsLoadingWitness(true)
          
          // Stage 2: Intelligent Witness (AI synthesis, ~2-5s)
          fetch(`${TRINITY_API}/api/v1/ask/${SCOPE_KEY}/witness`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: query, max_sources: 5 })
          })
            .then(res => res.json())
            .then((data: WitnessResponse) => {
              setWitnessResult(data)
              setIsLoadingWitness(false)
            })
            .catch(err => {
              setWitnessError('Witness API offline')
              setIsLoadingWitness(false)
            })
        }
      })
      .catch(err => {
        console.error('Instant query failed:', err)
        setIsLoadingInstant(false)
      })
  }

  const exampleQueries = [
    'allmän handling',
    'sekretess sjukvård',
    'utlämnande',
    'diarieföring',
  ]

  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Scope banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-eve-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{SCOPE.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{SCOPE.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-eve-orange/10 text-eve-orange border border-eve-orange/30">
                    🔒 T3 VERIFIED
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  OSL (2009:400) • {indexStats?.count || '...'} sections
                </div>
              </div>
            </div>
            
            <div className="inline-flex flex-col items-start gap-0.5 px-4 py-2 rounded-lg 
                           bg-eve-orange/5 border border-eve-orange/20">
              <span className="text-xs text-white font-medium">För journalister</span>
              <span className="text-xs text-eve-orange">Offentlighetsprincipen verifierad.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Query input */}
      <section className="pt-40 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Fråga om offentlighet & sekretess — t.ex. allmän handling, sekretess sjukvård"
                className="w-full px-6 py-4 rounded-xl bg-black/40 border border-white/10 
                          text-white placeholder-gray-500 focus:outline-none focus:border-eve-orange/50
                          transition-colors"
              />
              <button
                type="submit"
                disabled={isLoadingInstant || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg
                          bg-eve-orange/20 border border-eve-orange/40 text-eve-orange text-sm
                          hover:bg-eve-orange/30 transition-colors disabled:opacity-50"
              >
                {isLoadingInstant ? 'Verifierar...' : 'Fråga EVE'}
              </button>
            </div>
          </motion.form>

          {/* Examples */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-gray-600">Prova:</span>
            {exampleQueries.map((eq, i) => (
              <button
                key={i}
                onClick={() => setQuery(eq)}
                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10
                          text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {eq}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stage 1: INSTANT TRUTH */}
      {(isLoadingInstant || instantResult) && (
        <section className="pb-4 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl p-6 border ${
                instantResult?.status === 'VERIFIED' 
                  ? 'bg-eve-orange/5 border-eve-orange/30' 
                  : instantResult?.status === 'ABSENT'
                  ? 'bg-red-500/5 border-red-500/30'
                  : 'bg-black/40 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs text-white font-medium tracking-wider">INSTANT TRUTH</span>
                  {instantResult?.instant_ms !== undefined && (
                    <span className="text-xs text-gray-500">{instantResult.instant_ms}ms</span>
                  )}
                </div>
              </div>

              {isLoadingInstant && !instantResult && (
                <div className="h-16 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-eve-orange/30 border-t-eve-orange rounded-full animate-spin" />
                </div>
              )}

              {/* SCOPE_VERIFIED - Legal scopes */}
              {instantResult?.status === 'SCOPE_VERIFIED' && instantResult.verified_scope && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-eve-orange" />
                    <span className="text-eve-orange font-medium">SCOPE VERIFIERAD</span>
                  </div>
                  
                  <p className="text-gray-300">
                    Sökning på <span className="text-white font-medium">"{instantResult.search_term}"</span> i verifierad lagtext.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Verifierade sektioner</div>
                      <div className="text-white text-lg font-medium">{instantResult.verified_scope.total_entries}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Källa</div>
                      <div className="text-white">{instantResult.verified_scope.source}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Trust Tier</div>
                      <div className="text-eve-orange font-medium">{instantResult.verified_scope.trust_tier}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Beskrivning</div>
                      <div className="text-white text-sm">{instantResult.verified_scope.description}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-eve-orange/5 border border-eve-orange/20">
                    <p className="text-xs text-eve-orange">
                      ✓ Verifierat scope — Witness AI söker i godkänd lagtext nedan.
                    </p>
                  </div>
                </div>
              )}

              {/* VERIFIED - Exact ref match */}
              {instantResult?.status === 'VERIFIED' && instantResult.verified && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-eve-orange" />
                    <span className="text-eve-orange font-medium">VERIFIERAD I SCOPE</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Referens</div>
                      <div className="text-white font-mono text-sm">{instantResult.verified.ref}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">EVE-ID</div>
                      <div className="text-eve-orange font-mono text-sm">{instantResult.verified.eve_id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Källa</div>
                      <div className="text-white">{instantResult.verified.source}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Träffar</div>
                      <div className="text-white">{instantResult.match_count} verifierade</div>
                    </div>
                  </div>

                  {instantResult.all_matches && instantResult.all_matches.length > 1 && (
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">Alla träffar</div>
                      <div className="space-y-1">
                        {instantResult.all_matches.slice(0, 5).map((m, i) => (
                          <div key={i} className="text-xs font-mono text-gray-400">
                            {m.eve_id} — {m.ref}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setShowProvenance(!showProvenance)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                              bg-black/30 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-eve-orange">🔒</span>
                      <span className="text-xs text-gray-400">Vault: {instantResult.verified.vault_proof?.slice(0, 12)}...</span>
                    </div>
                    <span className="text-xs text-gray-600">{showProvenance ? '▲' : '▼'}</span>
                  </button>

                  {showProvenance && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-lg bg-black/30 text-xs space-y-2"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div><span className="text-gray-500">Godkänd av:</span> <span className="text-white">{instantResult.verified.approved_by}</span></div>
                        <div><span className="text-gray-500">Datum:</span> <span className="text-white">{new Date(instantResult.verified.approved_at).toLocaleDateString('sv-SE')}</span></div>
                        <div><span className="text-gray-500">Content Hash:</span> <span className="text-white font-mono">{instantResult.verified.content_hash?.slice(0, 24)}...</span></div>
                        <div><span className="text-gray-500">Trust Tier:</span> <span className="text-white">{instantResult.scope_meta?.trust_tier}</span></div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {instantResult?.status === 'ABSENT' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-red-400 font-medium">PROOF OF ABSENCE</span>
                  </div>
                  
                  <p className="text-gray-300">
                    Ingen verifierad källa för <span className="text-white font-medium">"{instantResult.query}"</span>.
                  </p>

                  <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                    <div className="text-xs text-gray-500 mb-2">Scope som söktes</div>
                    <div className="text-sm text-white">{instantResult.scope_coverage?.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {instantResult.scope_coverage?.total_entries} verifierade sektioner
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Stage 2: WITNESS AI */}
      {(isLoadingWitness || witnessResult || witnessError) && (instantResult?.status === 'VERIFIED' || instantResult?.status === 'SCOPE_VERIFIED') && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-xl p-6 bg-black/40 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👁</span>
                  <span className="text-xs text-white font-medium tracking-wider">WITNESS AI</span>
                  <span className="text-xs text-eve-purple/80">(EU AI Act Compliant)</span>
                </div>
                {isLoadingWitness && (
                  <span className="text-xs text-gray-500 animate-pulse">Genererar förklaring...</span>
                )}
              </div>

              {isLoadingWitness && !witnessResult && (
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 bg-white/5 rounded animate-pulse w-4/5" />
                  <div className="h-4 bg-white/5 rounded animate-pulse w-3/5" />
                </div>
              )}

              {witnessError && (
                <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>👁</span>
                    <span className="text-sm">Witness AI ej tillgänglig</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Den verifierade sanningen ovan står för sig själv.
                  </p>
                </div>
              )}

              {witnessResult && witnessResult.status === 'VERIFIED' && (
                <div className="space-y-4">
                  {witnessResult.answer && witnessResult.sources && (
                    <ClickableRefs 
                      text={witnessResult.answer} 
                      sources={witnessResult.sources.map(s => ({
                        ref: s.ref,
                        eve_id: s.eve_id,
                        title: s.title,
                        content: s.content,
                        source_name: s.source_name
                      }))}
                    />
                  )}
                  
                  {witnessResult.answer && !witnessResult.sources?.length && (
                    <div className="text-gray-300 leading-relaxed">
                      {witnessResult.answer}
                    </div>
                  )}

                  {witnessResult.sources && witnessResult.sources.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-3">Källor ({witnessResult.sources.length}) — klicka för att expandera</div>
                      <div className="space-y-2">
                        {witnessResult.sources.map((s, i) => (
                          <div 
                            key={i} 
                            className={`p-3 rounded-lg bg-black/30 border transition-all cursor-pointer
                                      ${expandedSource === i ? 'border-eve-orange/50' : 'border-white/5 hover:border-eve-orange/30'}`}
                            onClick={() => setExpandedSource(expandedSource === i ? null : i)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center justify-center w-5 h-5 
                                                 text-xs font-medium rounded bg-eve-orange/20 text-eve-orange">
                                    {i + 1}
                                  </span>
                                  <span className="text-sm text-white font-medium">{s.title}</span>
                                </div>
                                <div className="text-xs text-eve-orange font-mono mt-1 ml-7">{s.ref}</div>
                              </div>
                              <span className="text-xs text-gray-500">
                                {expandedSource === i ? '▲' : '▼'}
                              </span>
                            </div>
                            
                            {/* Collapsed: preview */}
                            {expandedSource !== i && s.content && (
                              <div className="text-xs text-gray-400 mt-2 ml-7 line-clamp-2">
                                {s.content}
                              </div>
                            )}
                            
                            {/* Expanded: full verified content */}
                            {expandedSource === i && (
                              <div className="mt-3 ml-7 space-y-3">
                                <div className="p-3 rounded bg-black/40 border border-eve-orange/20">
                                  <div className="text-xs text-eve-orange mb-2 font-medium">📜 Verifierad lagtext</div>
                                  <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                                    {s.content}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="p-2 rounded bg-black/30">
                                    <span className="text-gray-500">EVE-ID:</span>
                                    <span className="text-eve-orange font-mono ml-1">{s.eve_id}</span>
                                  </div>
                                  <div className="p-2 rounded bg-black/30">
                                    <span className="text-gray-500">Källa:</span>
                                    <span className="text-white ml-1">{s.source_name}</span>
                                  </div>
                                  {s.content_hash && (
                                    <div className="p-2 rounded bg-black/30 col-span-2">
                                      <span className="text-gray-500">Hash:</span>
                                      <span className="text-gray-400 font-mono ml-1 text-[10px]">{s.content_hash}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-eve-orange text-xs">
                                  <span>🔒</span>
                                  <span>Trinity-verifierad</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="text-eve-purple">🔒</span>
                      <div>
                        <p className="text-xs text-eve-purple/80 font-medium">
                          Witness AI — Styrd av Trinity
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Denna förklaring tolkar verifierad data. AI får beskriva — aldrig besluta.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Use case examples for journalists */}
      <section className="pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-gray-500 mb-4">Användningsområden</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: 'Begäran om allmän handling', desc: 'Verifiera om en handling är offentlig' },
              { title: 'Sekretessprövning', desc: 'Kolla vilka sekretessgrunder som kan gälla' },
              { title: 'Diarieföring', desc: 'Regler för myndigheters dokumentation' },
              { title: 'Överklagan', desc: 'När kan man överklaga ett avslagsbeslut' },
            ].map((uc, i) => (
              <div key={i} className="p-4 rounded-lg bg-black/30 border border-white/5">
                <div className="text-sm text-white font-medium">{uc.title}</div>
                <div className="text-xs text-gray-500 mt-1">{uc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
