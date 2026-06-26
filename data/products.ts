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
  status: 'live' | 'beta' | 'coming' | 'preview'
}

export const products: Product[] = [
  {
    id: 'pre-action',
    name: 'AI Agent Pre-Action',
    tagline: 'Pre-Action Verification API',
    description: 'Before an AI agent acts, verify the governance chain behind the action. One API call returns a verified chain outcome and a customer-policy outcome. Your workflow decides and enforces.',
    color: '#3b82f6',
    icon: '→',
    features: ['One API call', 'Verified chain outcome', 'Customer policy outcome', 'Fail-closed by design'],
    href: 'https://grc.eveverified.com/chain/pre-action',
    status: 'live'
  },
  {
    id: 'grc',
    name: 'EVE Verified GRC',
    tagline: 'Governance Chain Verification',
    description: 'Evidence-chain verification for governance workflows. Verify whether a chain was authorised, owned and monitored — for DORA, ISO 42001, TPRM and third-party risk. Surfaces gaps; humans decide.',
    color: '#10b981',
    icon: '⛓',
    features: ['EU AI Act', 'DORA / ICT third-party', 'ISO 42001', 'TPRM / vendor access'],
    href: 'https://grc.eveverified.com/chain',
    status: 'live'
  },
  {
    id: 'codegate',
    name: 'CodeGate',
    tagline: 'Code-Change Verification',
    description: 'Before AI-generated code reaches the codebase, verify it in a sandbox and apply only on explicit human approval. Proposals go to a lab; nothing touches production without confirmation.',
    color: '#a855f7',
    icon: '⚙',
    features: ['Sandbox validation', 'Human-approved apply', 'Atomic write', 'Fail-closed'],
    href: undefined,
    status: 'preview'
  },
  {
    id: 'document-verify',
    name: 'Document Verify',
    tagline: 'Cryptographic Seal Verification',
    description: 'Verify cryptographically sealed EVE documents. Confirm integrity and trace any document back to its original data source. Any modification produces a different hash.',
    color: '#00d4ff',
    icon: '§',
    features: ['SHA-256 seal', 'Source traceability', 'Tamper detection', 'Offline-verifiable'],
    href: 'https://verify.eveverified.com',
    status: 'live'
  },
]

// Secondary ecosystem entries (shown lower, under architecture / ecosystem)
export const ecosystemProducts: Product[] = [
  {
    id: 'eve',
    name: 'EVE Core',
    tagline: 'Intelligence & Verification Layer',
    description: 'The deterministic engine that powers every verification surface. Witness-mode architecture, cryptographic sealing, approved-knowledge core.',
    color: '#00ff88',
    icon: 'e',
    features: ['Witness-Mode Architecture', 'Cryptographic Sealing', 'Deterministic Core', 'Approved Knowledge'],
    href: '/eve',
    status: 'live'
  },
  {
    id: 'control-chain',
    name: 'EVE Control Chain',
    tagline: 'Control-Event Evidence Layer',
    description: 'Evidence layer for critical control events: observed state, requested action, deterministic verdict, hash-chained events, sealed record and later verification.',
    color: '#00ff88',
    icon: '⛓',
    features: ['Deterministic Verdict', 'Hash-Chained Events', 'Sealed Record', 'Verify Adapter'],
    href: '/control-chain/energy',
    status: 'live'
  },
  {
    id: 'compliedocs',
    name: 'ComplieDocs',
    tagline: 'Compliance Documentation Layer',
    description: 'Evidence-bound compliance documentation for GDPR, NIS2 and the EU AI Act. 53 templates with evidence-bound outputs.',
    color: '#00d4ff',
    icon: '§',
    features: ['53 Legal Templates', 'Evidence-Bound Outputs', 'Multi-jurisdiction'],
    href: 'https://compliedocs.com',
    status: 'live'
  },
  {
    id: 'cabledna',
    name: 'CableDNA',
    tagline: 'Physical Identity Layer',
    description: 'Physical fingerprinting for cables and infrastructure. Identity through impedance signatures.',
    color: '#a855f7',
    icon: '⧬',
    features: ['Impedance Signatures', 'Tamper Detection', 'Zero Trust Hardware'],
    href: '/cabledna',
    status: 'coming'
  },
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
