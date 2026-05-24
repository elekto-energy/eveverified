/**
 * Trinity Client — Verified Index API
 * 
 * ARCH: ARCH_VERIFIED_INDEX_v1.md (LOCKED 2026-02-05)
 * 
 * This client connects Ask-EVE to the Trinity verified index.
 * Ask-EVE NEVER reads corpus directly — only through Trinity.
 * 
 * Principle:
 *   ❌ Ask-EVE → corpus
 *   ✅ Ask-EVE → Trinity → verified_index → corpus
 */

const TRINITY_API = process.env.NEXT_PUBLIC_TRINITY_API || 'http://127.0.0.1:8000'

// ═══════════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════════

export interface LawApproval {
  project_id: string
  approved_at: string
  approved_by: string
  vault_seal: string | null
}

export interface Activation {
  project_id: string
  purpose: string
  activated_at: string
  vault_seal: string | null
}

export interface VerifiedEntry {
  ref: string
  namespace: string
  source_hash: string | null
  content_path: string | null
  law_approval: LawApproval
  activations: Activation[]
  status: 'ACTIVE' | 'PENDING' | 'REVOKED'
}

export interface IndexResponse {
  scope: string
  count: number
  entries: VerifiedEntry[]
  derived_at: string
  note: string
}

export interface IndexStatusResponse {
  status: string
  version: string
  scopes: string[]
  stats: {
    scopes: string[]
    counts: Record<string, number>
    total_refs: number
    built_at: string
  }
  note: string
}

export interface WitnessSource {
  namespace: string
  project_id: string
  ref: string
  title: string
  text: string
  eve_decision_id: string | null
  context_hash: string
  source_url: string | null
  relevance: number
}

export interface WitnessResponse {
  status: 'VERIFIED' | 'NO_ANSWER' | 'ERROR'
  answer_type: string
  witness_id: string
  question: string
  language: string
  answer: string | null
  sources: WitnessSource[]
  verification: {
    witness_id: string
    mode: string
    trinity: string
    timestamp: string
    governance: string
    policy: string
    l2_parse: { provider: string; offline: boolean }
    l2_render: { provider: string; offline: boolean }
    note?: string
  }
  disclaimer: string
  no_answer_reason: string | null
  suggestion: string | null
  success: boolean
  source_count: number
}

// ═══════════════════════════════════════════════════════════════════════════════
// API Client
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get verified index status and available scopes
 */
export async function getIndexStatus(): Promise<IndexStatusResponse> {
  const res = await fetch(`${TRINITY_API}/api/v1/trinity/index`)
  if (!res.ok) throw new Error(`Trinity API error: ${res.status}`)
  return res.json()
}

/**
 * Get verified index for a specific scope
 * 
 * Scopes:
 *   - legal.healthcare: PSL, HSL, Läkemedelslagen
 *   - legal.osl: Offentlighets- och sekretesslagen
 *   - medical: FDA FAERS
 *   - journalism: OSL + förarbeten
 */
export async function getVerifiedIndex(scope: string): Promise<IndexResponse> {
  const res = await fetch(`${TRINITY_API}/api/v1/trinity/index/${scope}`)
  if (!res.ok) throw new Error(`Trinity API error: ${res.status}`)
  return res.json()
}

/**
 * Query the Witness API
 * 
 * Ask-EVE uses this for search queries.
 * Returns verified sources with full provenance.
 */
export async function queryWitness(question: string): Promise<WitnessResponse> {
  const res = await fetch(`${TRINITY_API}/api/v1/witness/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  })
  if (!res.ok) throw new Error(`Witness API error: ${res.status}`)
  return res.json()
}

/**
 * Search within a specific scope
 * 
 * This combines:
 * 1. Get verified index for scope
 * 2. Filter by query terms
 * 3. Return matching entries with provenance
 */
export async function searchScope(
  scope: string, 
  query: string
): Promise<{ 
  matches: VerifiedEntry[]
  scope: string
  total: number
  query: string 
}> {
  // Get all verified entries for scope
  const index = await getVerifiedIndex(scope)
  
  // Simple client-side filtering (server-side search coming in v2)
  const queryLower = query.toLowerCase()
  const matches = index.entries.filter(entry => {
    // Match against ref
    if (entry.ref.toLowerCase().includes(queryLower)) return true
    // Match against content_path (contains chapter/section info)
    if (entry.content_path?.toLowerCase().includes(queryLower)) return true
    return false
  })
  
  return {
    matches,
    scope,
    total: index.count,
    query
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Scope Mappings (for UI)
// ═══════════════════════════════════════════════════════════════════════════════

export const SCOPE_CONFIG = {
  'legal.healthcare': {
    name: 'Healthcare Law',
    nameSwedish: 'Vårdlagstiftning',
    icon: '🏥',
    color: '#00ff88',
    laws: [
      { name: 'Patientsäkerhetslagen (PSL)', sfs: '2010:659' },
      { name: 'Hälso- och sjukvårdslagen (HSL)', sfs: '2017:30' },
      { name: 'Läkemedelslagen', sfs: '2015:315' },
    ]
  },
  'legal.osl': {
    name: 'Public Access & Secrecy',
    nameSwedish: 'Offentlighet & Sekretess',
    icon: '📰',
    color: '#ff6b00',
    laws: [
      { name: 'Offentlighets- och sekretesslagen (OSL)', sfs: '2009:400' },
    ]
  },
  'medical': {
    name: 'Medical Evidence',
    nameSwedish: 'Medicinsk Evidens',
    icon: '💊',
    color: '#00d4ff',
    laws: [
      { name: 'FDA FAERS', sfs: null },
    ]
  },
  'journalism': {
    name: 'Journalism',
    nameSwedish: 'Journalistik',
    icon: '📝',
    color: '#a855f7',
    laws: [
      { name: 'OSL (offentlighetsprincipen)', sfs: '2009:400' },
    ]
  }
} as const

export type ScopeName = keyof typeof SCOPE_CONFIG
