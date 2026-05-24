'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const E = 2.71828182845904

export default function AIActCompliance() {
  const [isExpanded, setIsExpanded] = useState(false)

  const requirements = [
    {
      article: 'Article 14',
      title: 'Human Oversight',
      requirement: 'High-risk AI systems shall be designed to be effectively overseen by natural persons.',
      solutions: [
        'Human-in-control by architecture, not policy',
        'Explicit approval required for all outputs',
        'Control Room enforces accountability',
        'Nothing executes without human consent'
      ],
      icon: '👤'
    },
    {
      article: 'Article 13',
      title: 'Transparency',
      requirement: 'High-risk AI systems shall be designed to ensure their operation is sufficiently transparent.',
      solutions: [
        'Witness mode — AI observes, never decides',
        'Every output traceable to source knowledge',
        'No hidden reasoning or black-box outputs',
        'Full provenance chain visible'
      ],
      icon: '🔍'
    },
    {
      article: 'Article 12',
      title: 'Record-keeping',
      requirement: 'High-risk AI systems shall technically allow for automatic recording of events (logs).',
      solutions: [
        'X-Vault sealing — immutable audit trail',
        'Cryptographic proof of every decision',
        'Offline-verifiable evidence packs',
        'Complete replay capability'
      ],
      icon: '📋'
    },
    {
      article: 'Article 9',
      title: 'Risk Management',
      requirement: 'A risk management system shall be established, implemented, documented and maintained.',
      solutions: [
        'Core vs Play — explicit mode separation',
        'Verified outputs only from Core mode',
        'Risk classification before execution',
        'Deterministic = predictable = assessable'
      ],
      icon: '⚖️'
    },
    {
      article: 'Article 15',
      title: 'Accuracy & Robustness',
      requirement: 'High-risk AI systems shall be designed to achieve an appropriate level of accuracy.',
      solutions: [
        'Deterministic factories — same input, same output',
        '0.1ms reproducible generation',
        'NO_ANSWER when approved evidence is missing',
        'Template-based, legally reviewed content'
      ],
      icon: '🎯'
    },
    {
      article: 'Article 17',
      title: 'Quality Management',
      requirement: 'Providers shall put a quality management system in place.',
      solutions: [
        'Governed approval workflow',
        'Knowledge approval before citation',
        'Version-locked templates',
        'Sealed specifications (WORM)'
      ],
      icon: '✓'
    }
  ]

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Collapsed: Just the badge button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
              isExpanded 
                ? 'bg-eve-green/20 border-eve-green/50 text-eve-green' 
                : 'bg-eve-green/10 border-eve-green/30 text-eve-green hover:bg-eve-green/20 hover:border-eve-green/50'
            }`}
          >
            <span className="text-lg">§</span>
            <span className="font-medium">EU AI Act Ready</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm opacity-60"
            >
              ▼
            </motion.span>
          </button>
          
          {!isExpanded && (
            <p className="text-gray-500 text-sm mt-3 text-center">
              Click to see how EVE meets regulatory requirements
            </p>
          )}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                {/* Header text */}
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-extralight tracking-wide mb-4 text-white/90">
                    Built for the AI Act Era
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    EU AI Act demands human oversight, transparency, and accountability.
                    EVE delivers this <span className="text-white">architecturally</span> — not as an afterthought.
                  </p>
                </div>

                {/* Requirements Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {requirements.map((req, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-eve-green/30 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-xl">{req.icon}</span>
                        <div>
                          <p className="text-eve-green text-xs font-medium">{req.article}</p>
                          <h3 className="text-white font-medium">{req.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-500 text-xs mb-3 italic">
                        "{req.requirement.slice(0, 80)}..."
                      </p>
                      
                      <ul className="space-y-1.5">
                        {req.solutions.map((sol, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs">
                            <span className="text-eve-green mt-0.5">✓</span>
                            <span className="text-gray-400">{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Quote */}
                <div className="text-center mb-10">
                  <div className="inline-block p-6 rounded-xl bg-black/40 border border-white/10">
                    <p className="text-lg font-extralight text-white/80 mb-2">
                      "Compliance by design, not by policy."
                    </p>
                    <p className="text-gray-500 text-sm">
                      Traditional AI needs policies to constrain behavior. EVE is architecturally constrained.
                    </p>
                  </div>
                </div>

                {/* Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                    <h4 className="text-red-400 font-medium mb-3">❌ Traditional AI Compliance</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Add logging as an afterthought</li>
                      <li>• Write policies to constrain AI</li>
                      <li>• Hope humans review outputs</li>
                      <li>• Trust that guardrails work</li>
                      <li>• Audit manually when required</li>
                    </ul>
                  </div>
                  
                  <div className="p-5 rounded-xl bg-eve-green/5 border border-eve-green/20">
                    <h4 className="text-eve-green font-medium mb-3">✓ EVE Architecture</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Logging built into every operation</li>
                      <li>• AI architecturally cannot bypass control</li>
                      <li>• Nothing executes without approval</li>
                      <li>• Constraints are structural, not policy</li>
                      <li>• Cryptographic proof always available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
