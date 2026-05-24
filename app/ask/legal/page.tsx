'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const scopes = [
  {
    id: 'healthcare',
    name: 'Healthcare Law',
    icon: '🏥',
    color: '#00ff88',
    description: 'Patient safety, healthcare governance, pharmaceutical law. Juridiskt + kliniskt sammanhang.',
    corpus: [
      { name: 'Patientsäkerhetslagen (PSL)', sfs: '2010:659', sections: 151 },
      { name: 'Hälso- och sjukvårdslagen (HSL)', sfs: '2017:30', sections: 98 },
      { name: 'Läkemedelslagen', sfs: '2015:315', sections: 114 },
    ],
    totalSections: 363,
    href: '/ask/legal/healthcare',
    useCase: 'For healthcare professionals, compliance officers, and legal researchers.',
  },
  {
    id: 'journalism',
    name: 'Public Access & Secrecy',
    icon: '📰',
    color: '#ff6b00',
    description: 'Offentlighetsprincipen & sekretess. För journalister och myndighetsgranskning.',
    corpus: [
      { name: 'Offentlighets- och sekretesslagen (OSL)', sfs: '2009:400', sections: 620 },
    ],
    totalSections: 620,
    href: '/ask/legal/journalism',
    useCase: 'For journalists, researchers, and public interest advocates.',
  },
]

function ScopeCard({ scope, index }: { scope: typeof scopes[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link href={scope.href} className="block group">
        <div
          className="relative rounded-xl p-8 transition-all duration-300 border h-full"
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = scope.color
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'
            e.currentTarget.style.transform = 'translateY(-6px)'
            e.currentTarget.style.boxShadow = `0 15px 30px ${scope.color}25`
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
              backgroundColor: `${scope.color}15`, 
              border: `1px solid ${scope.color}40`,
            }}
          >
            {scope.icon}
          </div>

          {/* Title */}
          <h3 className="text-white text-2xl font-semibold mb-2">{scope.name}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            {scope.description}
          </p>

          {/* Corpus list */}
          <div className="space-y-2 mb-4">
            {scope.corpus.map((law, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-gray-400">{law.name}</span>
                <span style={{ color: scope.color }}>{law.sections} §</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ 
              backgroundColor: `${scope.color}15`,
              border: `1px solid ${scope.color}30`,
              color: scope.color
            }}
          >
            <span>📦</span>
            <span>{scope.totalSections} verified sections</span>
          </div>

          {/* Use case */}
          <p className="text-xs text-gray-600 mt-4">
            {scope.useCase}
          </p>

          {/* Arrow */}
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
        </div>
      </Link>
    </motion.div>
  )
}

export default function AskLegalPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
              <a href="/ask" className="hover:text-white transition-colors">ASK</a>
              <span>/</span>
              <span className="text-white">Legal</span>
            </div>

            <span className="text-xs text-gray-500 tracking-[0.3em]">SELECT VERIFIED SCOPE</span>
            
            <h1 className="text-5xl md:text-6xl font-extralight tracking-[0.15em] mt-4">
              <span className="text-eve-green">§</span> LEGAL
            </h1>
            
            <p className="text-gray-500 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
              Choose a specific legal scope.<br />
              <span className="text-white">Each scope is verified and bounded.</span>
            </p>

            {/* Not RAG badge */}
            <div className="mt-8 inline-flex flex-col items-center gap-1 px-6 py-3 rounded-xl 
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

      {/* Scope cards */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {scopes.map((scope, i) => (
              <ScopeCard key={scope.id} scope={scope} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Key principle */}
      <section className="pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="p-6 rounded-xl bg-black/30 border border-white/5">
              <p className="text-gray-400 leading-relaxed">
                <span className="text-white font-medium">"LAW is too big to be one thing."</span>
                <br /><br />
                EVE doesn't pretend to know all law. It knows <em>these specific sections</em>, 
                verifies them, and proves when something isn't covered.
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-eve-orange">
                  RAG answers questions. EVE answers accountability.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
