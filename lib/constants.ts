// ═══════════════════════════════════════════════════════════════════════════
// MATHEMATICAL CONSTANTS & UTILITIES
// Euler's number (e) used for visual design and spacing calculations
// ═══════════════════════════════════════════════════════════════════════════

// Euler's number - the base of natural logarithms
export const E = 2.718281828459045

// First 100 digits of e (after decimal point)
export const E_DIGITS = '7182818284590452353602874713527950288419716939937510582097494459230781640628620899862803482534211706'

// Golden ratio (φ) - for proportional design
export const PHI = 1.618033988749895

// π for circular calculations
export const PI = 3.141592653589793

/**
 * Generate spacing based on Euler's number
 * @param multiplier - The multiplier for e
 * @returns Spacing value in rem
 */
export const eSpace = (multiplier: number): string => {
  return `${(E * multiplier).toFixed(2)}rem`
}

/**
 * Get a specific digit from e
 * @param index - The index of the digit
 * @returns The digit at that position
 */
export const getEDigit = (index: number): number => {
  return parseInt(E_DIGITS[index % E_DIGITS.length])
}

/**
 * Generate particle positions based on e digits
 * @param count - Number of particles
 * @param baseRadius - Base radius for particle placement
 * @returns Array of particle configurations
 */
export const generateEParticles = (count: number, baseRadius: number = 60) => {
  return E_DIGITS.slice(0, count).split('').map((digit, i) => {
    const d = parseInt(digit)
    const angle = (i / count) * Math.PI * 2
    const radius = baseRadius + d * 12
    return {
      id: i,
      digit: d,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: 2 + d * 0.4,
      opacity: 0.3 + d * 0.06,
      delay: i * 0.02
    }
  })
}

// Navigation items
export const navItems = [
  { name: 'EVE', href: '/eve' },
  { 
    name: 'ASK', 
    href: '/ask',
    children: [
      { name: 'Research', href: 'https://research.eveverified.com' },
      { name: 'Healthcare Law', href: '/ask/legal/healthcare' },
      { name: 'Public Access', href: '/ask/legal/journalism' },
    ]
  },
  { name: 'ELEKTO', href: '/elekto' },
  { name: 'AGV Demo', href: '/control-chain/agv' },
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'Insights', href: '/insights' },
  { name: 'GRC', href: 'https://grc.eveverified.com' },
  { name: 'ComplieDocs', href: 'https://compliedocs.com' },
  { 
    name: 'About', 
    href: '/about',
    children: [
      { name: 'What is EVE?', href: '/about/what-is-eve' },
      { name: 'Determinism', href: '/about/determinism' },
      { name: 'EVE Control Room', href: '/about/eve-control-room' },
      { name: 'ELEKTO-X / X-Vault', href: '/elekto-x' },
      { name: 'Control Chain', href: '/control-chain' },
      { name: 'Company', href: '/about/company' },
      { name: 'Origin', href: '/origin' },
      { name: 'Pilot Program', href: '/pilot' },
    ]
  },
]

// Color palette
export const colors = {
  green: '#00ff88',
  greenDim: 'rgba(0, 255, 136, 0.25)',
  cyan: '#00d4ff',
  orange: '#ff6b00',
  purple: '#a855f7',
  dark: '#0a0a0a',
  darker: '#050505',
} as const
