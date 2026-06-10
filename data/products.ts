// ═══════════════════════════════════════════════════════════════════════════
// EVE PRODUCTS DATA
// Each product expands EVE's capabilities — one core, infinite products
// ═══════════════════════════════════════════════════════════════════════════

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  color: string
  icon: string
  features: string[]
  href?: string
  status: 'live' | 'beta' | 'coming'
}

export const products: Product[] = [
  {
    id: 'eve',
    name: 'EVE',
    tagline: 'Intelligence & Verification Layer',
    description: 'Evidence & Verification Engine with 25 agents and 47 factory engines. The core that powers everything.',
    color: '#00ff88',
    icon: 'e',
    features: ['Witness-Mode Architecture', 'Cryptographic Sealing', '325K Knowledge Chunks', 'Self-Coding Capability'],
    href: '/eve',
    status: 'live'
  },
  {
    id: 'signals',
    name: 'EVE Signals',
    tagline: 'Governance Signal Layer',
    description: 'Deterministic governance signals for agentic workflows. Surfaces authority, accountability, approval scope and decision-chain coherence before execution continues.',
    color: '#a855f7',
    icon: '§',
    features: ['Authority Boundary', 'Approval Chain', 'Accountability Continuity', 'Accumulation Risk'],
    href: 'https://grc.eveverified.com',
    status: 'live'
  },
  {
    id: 'compliedocs',
    name: 'ComplieDocs',
    tagline: 'Documentation Layer',
    description: 'Evidence-bound compliance documentation and regulated evidence workflows. 53 templates for GDPR, NIS2, EU AI Act.',
    color: '#00d4ff',
    icon: '§',
    features: ['53 Legal Templates', 'Evidence-Bound Outputs', 'Instant Generation', 'Multi-jurisdiction'],
    href: 'https://compliedocs.com',
    status: 'live'
  },
  {
    id: 'elekto',
    name: 'ELEKTO-X',
    tagline: 'Attested Control Layer · Critical-Resource Enforcement',
    description: 'Attested control of critical resources through hardware attestation, vault approval, token-gated access, multi-attestation, WORM logging and signed snapshots. The enforcement layer of the EVE platform.',
    color: '#ff6b00',
    icon: '⚡',
    features: ['Kassavalvslager (Vault)', 'TPM/HSM Attestation', 'WORM Logging', 'Token-Gated Access', 'Patent Pending'],
    href: '/elekto-x',
    status: 'beta'
  },
  {
    id: 'cabledna',
    name: 'CableDNA',
    tagline: 'Physical Identity Layer',
    description: 'Physical fingerprinting for cables and infrastructure. Unhackable identity through impedance signatures.',
    color: '#a855f7',
    icon: '⧬',
    features: ['Impedance Signatures', 'Temperature Mapping', 'Tamper Detection', 'Zero Trust Hardware'],
    href: '/cabledna',
    status: 'coming'
  }
]

// Philosophy principles - based on formal systems theory
export const principles = [
  {
    symbol: '∞',
    title: 'Formal Expansion',
    description: 'Fixed rules derive new conclusions as premises are approved. The core is stable. Knowledge expands only when new premises pass approval.'
  },
  {
    symbol: '◉',
    title: 'Witness, Never Decide',
    description: 'EVE observes, verifies and reports. It does not make autonomous decisions, classify incidents, assess materiality or determine compliance. Humans decide. EVE surfaces what the evidence, rules and signals support.'
  },
  {
    symbol: '⚛',
    title: 'Deterministic Core',
    description: 'Same input, same approved premises and same rules produce the same output. No randomness in critical paths. No hidden decision-making. No unsupported conclusions.'
  },
  {
    symbol: '⛓',
    title: 'Cryptographic Truth',
    description: 'Every sealed output is verifiable. Every approved claim links to its source. Every record can be checked without trusting the system that produced it.'
  },
  {
    symbol: '◇',
    title: 'Governance Signals',
    description: 'Human approval is necessary, but not always sufficient. EVE surfaces authority, accountability and approval-scope gaps as deterministic governance signals. EVE does not decide what the signal means. A named human owner decides.'
  },
]

// Company info
export const company = {
  name: 'Organiq Sweden AB',
  orgNr: '559505-3579',
  domains: ['eveverified.com', 'eveverified.se'],
  founded: 2024,
  founder: 'Joakim Eklund',
  github: 'https://github.com/elekto-energy'
}
