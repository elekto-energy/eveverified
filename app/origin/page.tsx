'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const timeline = [
  {
    year: '2025',
    name: 'ELEKTO',
    tagline: 'Verifiable local energy sharing',
    description: null,
    items: [
      'Signed meter data with Proof-of-Origin and Proof-of-Consumption',
      'Tokenized kWh units and escrow settlement',
      'Controlled participant networks',
      'Local reserve operation during outages',
    ],
    dot: 'bg-eve-green',
    text: 'text-eve-green',
    border: 'border-eve-green/20',
  },
  {
    year: 'September 2025',
    name: 'ELEKTO-X',
    tagline: 'Attested infrastructure control',
    description: null,
    items: [
      'Attested nodes with TPM/HSM-based verification',
      'Signed snapshots and monotonic counters',
      'WORM logs and multi-attestation',
      'Token-gated access across energy, communication and transport resources',
    ],
    dot: 'bg-eve-cyan',
    text: 'text-eve-cyan',
    border: 'border-eve-cyan/20',
  },
  {
    year: 'January 2026',
    name: 'ComplieDocs',
    tagline: 'First sealed compliance records',
    description: 'Before EVE Verified became a dedicated governance signal layer, the verification model was already operating inside ComplieDocs. Structured compliance documents were produced with human approval controls, sealed templates, verification files and EVEV identifiers — using a dual-proof model: X-Vault for integrity and EVE VERIFIED ID for decision proof. Domains covered included AI Act, GDPR, NIS2, DORA, CRA and SOC 2.',
    items: [
      'Human approval required for every document — no bulk approve',
      'X-Vault integrity proof (SHA-256 + timestamp) per sealed artifact',
      'EVE VERIFIED ID (EVEV-COMP-*) as decision and accountability record',
      'Independent offline and online verification for every sealed document',
    ],
    dot: 'bg-purple-400',
    text: 'text-purple-400',
    border: 'border-purple-400/20',
  },
  {
    year: 'January 2026',
    name: 'EVE Patent Filing',
    tagline: 'Witness-limited AI and cryptographic verification',
    description: null,
    items: [
      'Witness-limited AI with deterministic knowledge cores',
      'Explicit human authorization for AI outputs',
      'Signed state proofs and offline verification',
      'Marked generation modes for traceable AI decisions',
    ],
    dot: 'bg-eve-orange',
    text: 'text-eve-orange',
    border: 'border-eve-orange/20',
  },
  {
    year: '2026',
    name: 'EVE Verified',
    tagline: 'Governance signal verification layer',
    description: null,
    items: [
      'Authority boundary, approval chain, overlapping controls',
      'Accumulated risk and collective outcome signals',
      'Sealed and publicly verifiable decision records',
      'Live across TPRM, DORA, AI Act and CMMC',
    ],
    dot: 'bg-eve-green',
    text: 'text-eve-green',
    border: 'border-eve-green/20',
  },
]

const steps = [
  'Declared rule',
  'Observed activity',
  'Deterministic signal',
  'Declared authority',
  'Sealed proof',
  'Verification',
]

const earlyRecords = [
  { id: 'PRV SE 2530545-9',          label: 'ELEKTO-X patent filing',              date: 'August 2025'  },
  { id: 'EVE-PAT-2026-001',           label: 'EVE witness-mode AI patent',          date: 'January 2026' },
  { id: 'EVEV-COMP-20260122-000417',  label: 'ComplieDocs — sealed artifact',       date: 'January 2026' },
  { id: 'EVE-TPRM-00004202',          label: 'EVE Bridge — authority boundary proof', date: '2026'       },
  { id: 'EVE-CMMC-00004297',          label: 'EVE Bridge — CMMC authority signal',  date: '2026'         },
]

export default function OriginPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.25em] text-eve-green/60 uppercase mb-4 font-mono">
            Origin of EVE Verified
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight">
            From verifiable energy sharing<br />
            to governance signal verification.
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            EVE Verified did not begin as a document checker or AI compliance tool.
            It grew out of a technical path focused on one recurring problem: how to
            prove, after the fact, what happened, under which rules, with which
            authority, and with what evidence.
          </p>
        </motion.div>

        {/* Core pattern */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20 border border-white/5 rounded-lg p-6 bg-white/[0.02]"
        >
          <p className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-5 font-mono">
            The core pattern — consistent across every stage
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
            {steps.map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="text-sm text-white/80 font-mono">{step}</span>
                {i < steps.length - 1 && (
                  <span className="text-eve-green/30 text-sm">→</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />

          <div className="flex flex-col gap-16">
            {timeline.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="relative pl-8"
              >
                <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${item.dot} ring-4 ring-eve-dark`} />

                <p className={`text-xs font-mono tracking-widest uppercase mb-1 ${item.text} opacity-60`}>
                  {item.year}
                </p>
                <h2 className="text-2xl font-light text-white mb-1">{item.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{item.tagline}</p>

                {item.description && (
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-2xl">
                    {item.description}
                  </p>
                )}

                <div className={`border ${item.border} rounded-lg p-5 bg-white/[0.015]`}>
                  <ul className="flex flex-col gap-2.5">
                    {item.items.map((point) => (
                      <li key={point} className="text-sm text-gray-400 flex gap-3">
                        <span className={`${item.text} opacity-40 mt-0.5 shrink-0`}>—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected evidence */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 border border-white/5 rounded-lg p-6 bg-white/[0.015]"
        >
          <p className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-5 font-mono">
            Selected evidence records
          </p>
          <div className="flex flex-col gap-3">
            {earlyRecords.map((rec) => (
              <div key={rec.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-mono text-xs text-eve-green/60 shrink-0">{rec.id}</span>
                <span className="text-sm text-gray-400">{rec.label}</span>
                <span className="text-xs text-gray-600 sm:ml-auto font-mono shrink-0">{rec.date}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-5 leading-relaxed">
            The origin timeline is supported by patent filings, dated PRV receipts, sealed ComplieDocs
            artifacts, EVEV identifiers and public EVE Bridge verification records. Public proofs are
            independently verifiable at{' '}
            <a
              href="https://verify.eveverified.com"
              className="text-eve-green/50 hover:text-eve-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              verify.eveverified.com
            </a>.
          </p>
        </motion.div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 pt-12 border-t border-white/5"
        >
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-2">
            EVE Verified is not a document checker and not an AI firewall.
          </p>
          <p className="text-white text-base leading-relaxed max-w-2xl mb-8">
            It is a governance signal verification layer — built on a chain that runs from
            verifiable energy sharing through attested infrastructure, sealed compliance records
            and witness-limited AI, to independently verifiable governance decisions.
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href="https://grc.eveverified.com/signals"
              className="text-sm text-eve-green hover:text-white transition-colors font-mono tracking-wide"
            >
              View the signal layer →
            </a>
            <a
              href="/philosophy"
              className="text-sm text-gray-500 hover:text-white transition-colors font-mono tracking-wide"
            >
              Read the philosophy →
            </a>
          </div>
        </motion.div>

      </div>

      <Footer />
    </main>
  )
}
