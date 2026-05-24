'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AskJournalismPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
              <a href="/ask" className="hover:text-white transition-colors">ASK</a>
              <span>/</span>
              <span className="text-eve-orange">Journalism</span>
            </div>

            {/* Icon */}
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl mx-auto mb-6"
              style={{ 
                backgroundColor: '#ff6b0015', 
                border: '1px solid #ff6b0040',
              }}
            >
              📰
            </div>

            {/* Title */}
            <h1 className="text-4xl font-light tracking-wide mb-4">
              Journalism Tools
            </h1>
            <p className="text-gray-500 text-lg">
              Source verification and publication rights
            </p>

            {/* Coming soon badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-eve-orange/10 border border-eve-orange/30 mt-8">
              <span className="text-xs text-eve-orange tracking-wider uppercase">
                Coming Soon
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preview */}
      <section className="pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl p-8 bg-black/40 border border-white/10"
          >
            <h2 className="text-xl font-medium mb-6 text-white">What you'll be able to do:</h2>
            
            <div className="space-y-4">
              {[
                {
                  icon: '🔍',
                  title: 'FOI Verification',
                  desc: 'Check if a document can be requested under Offentlighetsprincipen.'
                },
                {
                  icon: '📄',
                  title: 'Publication Rights',
                  desc: 'Verify what can be published and what requires redaction.'
                },
                {
                  icon: '⚖️',
                  title: 'OSL Analysis',
                  desc: 'Understand which secrecy provisions apply to your material.'
                },
                {
                  icon: '🔗',
                  title: 'Source Chain',
                  desc: 'Trace information back to its authoritative source.'
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Example queries */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-3">EXAMPLE QUERIES</p>
              <div className="space-y-2">
                {[
                  '"Can this document be published?"',
                  '"What must be redacted before release?"',
                  '"Is this source classified under OSL 18:1?"',
                ].map((q, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 rounded-lg bg-eve-orange/10 border border-eve-orange/20
                              text-eve-orange text-sm font-mono"
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* Notify */}
            <div className="mt-8">
              <p className="text-gray-500 text-sm mb-3">Get notified when it launches:</p>
              <a 
                href="mailto:info@eveverified.com?subject=Notify me about ASK Journalism"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                          bg-eve-orange/20 border border-eve-orange/40 text-eve-orange text-sm
                          hover:bg-eve-orange/30 transition-colors"
              >
                Request Early Access
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
