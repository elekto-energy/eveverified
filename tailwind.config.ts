import type { Config } from 'tailwindcss'

// Euler's number for deterministic spacing
const E = 2.718281828459045

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // EVE Brand Colors
        eve: {
          green: '#00ff88',
          'green-dim': '#00ff8840',
          cyan: '#00d4ff',
          orange: '#ff6b00',
          purple: '#a855f7',
          dark: '#0a0a0a',
          darker: '#050505',
        },
        // Enterprise palette (clean navy — no neon). Used by the marketing surface.
        ent: {
          bg: '#0b1120',        // deep navy page background
          panel: '#0f172a',     // hero / panel
          card: '#111c30',      // card surface
          'card-hi': '#16243d', // hover
          border: '#1e2d45',
          'border-hi': '#2c3f5e',
          text: '#e8eef6',
          dim: '#9fb0c8',
          muted: '#64748b',
          accent: '#3b82f6',    // calm enterprise blue
          'accent-hi': '#60a5fa',
          verified: '#10b981',  // green = verified (meaningful, not decorative)
          warn: '#f59e0b',      // amber = escalate/review
        },
        // Light surface (enterprise SaaS body sections)
        lite: {
          bg: '#f7f8fa',        // light page section
          card: '#ffffff',      // white card
          'card-hi': '#f1f5f9', // hover
          border: '#e5e7eb',
          'border-hi': '#cbd5e1',
          text: '#0f172a',      // near-navy text on light
          dim: '#475569',
          muted: '#94a3b8',
          accent: '#2563eb',
          verified: '#059669',
        },
      },
      spacing: {
        // e-based spacing system
        'e-1': `${E * 0.25}rem`,   // ~0.68rem
        'e-2': `${E * 0.5}rem`,    // ~1.36rem
        'e-3': `${E * 1}rem`,      // ~2.72rem
        'e-4': `${E * 1.5}rem`,    // ~4.08rem
        'e-5': `${E * 2}rem`,      // ~5.44rem
        'e-6': `${E * 3}rem`,      // ~8.15rem
        'e-7': `${E * 4}rem`,      // ~10.87rem
        'e-8': `${E * 5}rem`,      // ~13.59rem
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        'spin-reverse': 'spin 25s linear infinite reverse',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-slide-up': 'fadeSlideUp 0.6s ease forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.2)' },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'fadeIn': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fadeSlideUp': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
        `,
        'radial-fade': 'radial-gradient(circle at 50% 50%, transparent 0%, #0a0a0a 70%)',
      },
    },
  },
  plugins: [],
}

export default config
