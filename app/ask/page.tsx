'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

type DomainStatus = 'live' | 'coming'

const domains: Array<{
  id: string
  name: string
  icon: string
  color: string
  description: string
  example: string
  href: string
  status: DomainStatus
  corpus: string
}> = [
  {
    id: 'legal-healthcare',
    name: 'Healthcare Law',
    icon: '🏥',
    color: '#00ff88',
    description: 'Patient safety, healthcare governance, pharmaceutical law. Juridiskt + kliniskt sammanhang.',
    example: '"Vilket ansvar har vårdgivaren enligt lag?"',
    href: '/ask/legal/healthcare',
    status: 'live',
    corpus: 'PSL (2010:659) + HSL (2017:30) + Läkemedelslagen (2015:315)',
  },
  {
    id: 'legal-journalism',
    name: 'Public Access',
    icon: '📰',
    color: '#ff6b00',
    description: 'Offentlighetsprincipen & sekretess. För journalister och myndighetsgranskning.',
    example: '"Är detta en offentlig handling?"',
    href: '/ask/legal/journalism',
    status: 'live',
    corpus: 'OSL (2009:400) — 620+ sections',
  },
]

function DomainCard({ domain, index }: { domain: (typeof domains)[number]; index: number }) {
  const isAvailable = domain.status !== 'coming'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link 
        href={isAvailable ? domain.href : '#'}
        className={`block group ${!isAvailable ? 'cursor-not-allowed' : ''}`}
      >
        <div
          className="relative rounded-xl p-8 transition-all duration-300 border h-full"
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
          onMouseEnter={(e) => {
            if (isAvailable) {
              e.currentTarget.style.borderColor = domain.color
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = `0 15px 30px ${domain.color}25`
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Icon */}
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-6 
                       transition-transform duration-300 group-hover:scale-110"
            style={{ 
              backgroundColor: `${domain.color}15`, 
              border: `1px solid ${domain.color}40`,
            }}
          >
            {domain.icon}
          </div>

          {/* Content */}
          <h3 className="text-white text-2xl font-semibold mb-2">{domain.name}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            {domain.description}
          </p>

          {/* Corpus badge */}
          <div className="text-xs text-gray-600 mb-4 font-mono">
            📦 {domain.corpus}
          </div>

          {/* Example query */}
          <div 
            className="p-3 rounded-lg text-sm font-mono"
            style={{ 
              backgroundColor: `${domain.color}10`,
              border: `1px solid ${domain.color}20`,
              color: domain.color
            }}
          >
            {domain.example}
          </div>

          {/* Arrow */}
          {isAvailable && (
            <div className="mt-6 flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors">
              <span className="text-sm">Enter scope</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function AskPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs text-gray-500 tracking-[0.3em]">QUERY INTERFACE</span>
            
            <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] mt-4">
              ASK
            </h1>
            
            <p className="text-gray-500 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
              Ask verified knowledge.<br />
              <span className="text-white">Every answer can be explained.</span>
            </p>
          </motion.div>

          {/* Not RAG badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <div className="inline-flex flex-col items-center gap-1 px-6 py-3 rounded-xl 
                           bg-eve-green/5 border border-eve-green/20">
              <span className="text-sm text-white font-medium tracking-wide">
                This is not RAG.
              </span>
              <span className="text-sm text-eve-green font-medium tracking-wide">
                This is verified knowledge.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domain cards */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {domains.map((domain, i) => (
              <DomainCard key={domain.id} domain={domain} index={i} />
            ))}
          </div>
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-20 text-center"
        >
          <h2 className="text-sm text-gray-500 tracking-[0.2em] mb-8">HOW IT WORKS</h2>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-eve-green">FETCH</span>
            </div>
            <span className="text-gray-600">→</span>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-eve-cyan">LEARN</span>
            </div>
            <span className="text-gray-600">→</span>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-eve-orange">APPROVE</span>
            </div>
            <span className="text-gray-600">→</span>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-eve-purple">ACTIVATE</span>
            </div>
          </div>

          <p className="text-gray-600 mt-6 text-sm">
            ASK only reads <span className="text-white">activated knowledge</span>.<br />
            Every answer links to its source chain.
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
