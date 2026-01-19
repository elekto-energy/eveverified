// ═══════════════════════════════════════════════════════════════════════════
// EVE PRODUCTS DATA
// Each product is a new "decimal" in the e-expansion
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
    tagline: 'Intelligence Layer',
    description: 'Evidence & Verification Engine with 25 agents and 47 factory engines. The core that powers everything.',
    color: '#00ff88',
    icon: 'e',
    features: ['Trinity Architecture', 'Witness Mode AI', '325K Knowledge Chunks', 'Self-Coding Capability'],
    href: '/eve',
    status: 'live'
  },
  {
    id: 'compliedocs',
    name: 'ComplieDocs',
    tagline: 'Governance Layer',
    description: 'Compliance documentation platform. 53 templates for GDPR, NIS2, EU AI Act. Zero hallucination guarantee.',
    color: '#00d4ff',
    icon: '§',
    features: ['53 Legal Templates', 'Zero Hallucination', 'Instant Generation', 'Multi-jurisdiction'],
    href: 'https://compliedocs.com',
    status: 'live'
  },
  {
    id: 'elekto',
    name: 'ELEKTO-X',
    tagline: 'Cyber-Physical Layer',
    description: 'Energy tokenization with device attestation. Patent pending technology for marinas and camping sites.',
    color: '#ff6b00',
    icon: '⚡',
    features: ['Device Attestation', 'Polygon Blockchain', 'Marina & Camping', 'No PIN/RFID'],
    href: '/elekto',
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

// Philosophy principles
export const principles = [
  {
    symbol: '∞',
    title: 'Infinite Precision',
    description: 'Like e, our systems have infinite depth but remain precisely defined.'
  },
  {
    symbol: '◉',
    title: 'Witness, Never Decide',
    description: 'AI that observes and verifies, but never makes autonomous decisions.'
  },
  {
    symbol: '⚛',
    title: 'Deterministic Core',
    description: 'Same input always produces same output. No randomness in critical paths.'
  },
  {
    symbol: '⛓',
    title: 'Cryptographic Truth',
    description: 'Every output is verifiable. Every claim is traceable to its source.'
  }
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
