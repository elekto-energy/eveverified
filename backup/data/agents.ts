// ═══════════════════════════════════════════════════════════════════════════
// EVE AGENT DATA
// Add new agents here → tree grows automatically
// ═══════════════════════════════════════════════════════════════════════════

export interface Agent {
  id: string
  name: string
  symbol: string
  description: string
  color: string
  tier: number
  children: string[]
}

export const agentData: Record<string, Agent> = {
  // ═══ TIER 0: CORE ═══
  core: {
    id: 'eve-core',
    name: 'EVE CORE',
    symbol: 'e',
    description: 'Evidence & Verification Engine — The deterministic heart that never guesses, only knows.',
    color: '#00ff88',
    tier: 0,
    children: ['trinity', 'witness', 'factory']
  },

  // ═══ TIER 1: PRIMARY SYSTEMS ═══
  trinity: {
    id: 'trinity',
    name: 'TRINITY',
    symbol: '△',
    description: 'Three-model consensus: Claude API + Qwen Local + Deterministic Factories. Optimal routing for every task.',
    color: '#00d4ff',
    tier: 1,
    children: ['claude', 'qwen', 'deterministic']
  },
  witness: {
    id: 'witness',
    name: 'WITNESS MODE',
    symbol: '◉',
    description: 'AI that cannot decide — only cite, verify, and witness truth. Patent pending architecture.',
    color: '#ff6b00',
    tier: 1,
    children: ['xvault', 'audit']
  },
  factory: {
    id: 'factory',
    name: 'FACTORY ENGINES',
    symbol: '⚙',
    description: '47 specialized engines for deterministic output generation. Same input = same output, always.',
    color: '#a855f7',
    tier: 1,
    children: ['compliance', 'video', 'document', 'analysis']
  },

  // ═══ TIER 2: TRINITY CHILDREN ═══
  claude: {
    id: 'claude',
    name: 'Claude API',
    symbol: 'C',
    description: 'Anthropic Claude for creative reasoning, complex analysis, and nuanced understanding.',
    color: '#00d4ff',
    tier: 2,
    children: []
  },
  qwen: {
    id: 'qwen',
    name: 'Qwen Local',
    symbol: 'Q',
    description: 'Offline-capable local model for privacy-critical operations. No data leaves your infrastructure.',
    color: '#00d4ff',
    tier: 2,
    children: []
  },
  deterministic: {
    id: 'deterministic',
    name: 'Det. Router',
    symbol: 'D',
    description: 'Intelligent routing based on determinism requirements. Fast, predictable, verifiable.',
    color: '#00d4ff',
    tier: 2,
    children: []
  },

  // ═══ TIER 2: WITNESS CHILDREN ═══
  xvault: {
    id: 'xvault',
    name: 'X-Vault',
    symbol: '🔐',
    description: 'Cryptographic sealing for document integrity. SHA-256 hashing with timestamp proof.',
    color: '#ff6b00',
    tier: 2,
    children: []
  },
  audit: {
    id: 'audit',
    name: 'Audit Trail',
    symbol: '📋',
    description: 'Complete audit trail for every operation. Full reproducibility guaranteed.',
    color: '#ff6b00',
    tier: 2,
    children: []
  },

  // ═══ TIER 2: FACTORY CHILDREN ═══
  compliance: {
    id: 'compliance',
    name: 'Compliance',
    symbol: '§',
    description: 'GDPR, NIS2, EU AI Act — 53 templates with zero hallucination. Legal-grade output.',
    color: '#a855f7',
    tier: 2,
    children: []
  },
  video: {
    id: 'video',
    name: 'Video Pipeline',
    symbol: '▶',
    description: 'Complete video production from script to render. Blender integration, TTS, lip-sync.',
    color: '#a855f7',
    tier: 2,
    children: []
  },
  document: {
    id: 'document',
    name: 'Document Gen',
    symbol: '◧',
    description: 'Deterministic document generation. PDF, DOCX, Markdown with cryptographic verification.',
    color: '#a855f7',
    tier: 2,
    children: []
  },
  analysis: {
    id: 'analysis',
    name: 'Analysis',
    symbol: '◫',
    description: 'Data analysis with full audit trail. Reproducible results, every time.',
    color: '#a855f7',
    tier: 2,
    children: []
  },
}

// Helper function to get all agents at a specific tier
export const getAgentsByTier = (tier: number): Agent[] => {
  return Object.values(agentData).filter(agent => agent.tier === tier)
}

// Helper function to get children of an agent
export const getAgentChildren = (agentId: string): Agent[] => {
  const agent = agentData[agentId]
  if (!agent) return []
  return agent.children.map(childId => agentData[childId]).filter(Boolean)
}

// Stats for display - exact deterministic values
export const eveStats = {
  agents: '25',
  engines: '47',
  knowledgeChunks: '325000',
  expansion: '_'
}
