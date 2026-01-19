import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'OrganiQ Sweden AB | Deterministic Systems',
  description: 'Building deterministic systems for verification, compliance, and cyber-physical infrastructure.',
}

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-wide text-white/90 mb-4">
          OrganiQ Sweden AB
        </h1>
        <p className="text-gray-400 text-lg">
          Building deterministic systems for verification, compliance, and cyber-physical infrastructure.
        </p>
      </section>

      {/* Introduction */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            OrganiQ Sweden AB develops deterministic system architectures for domains where 
            correctness, traceability, and accountability are mandatory — not optional.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Our work spans regulated AI, compliance documentation, and cyber-physical energy systems. 
            Across all domains, we apply the same principle: <span className="text-white">systems must never guess</span>.
          </p>
          <div className="text-gray-600 text-xs">
            <p>Organization number: 559505-3579</p>
            <p>Registered office: Stockholm, Sweden</p>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-8 text-white/90">
            What We Build
          </h2>
          
          {/* EVE Platform */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-eve-green text-2xl" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>e</span>
              <div>
                <h3 className="text-white font-medium">EVE Platform</h3>
                <p className="text-gray-600 text-xs">Evidence & Verification Engine</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              EVE is the core platform developed by OrganiQ. It is a witness-constrained, 
              deterministic architecture where every output is traceable, reproducible, and verifiable.
            </p>
            <p className="text-gray-500 text-sm mb-2">EVE provides:</p>
            <ul className="space-y-1 mb-4">
              {[
                'Deterministic execution paths',
                'Human-controlled approval via Control Room',
                'Cryptographic evidence and auditability',
                'A foundation for EVE VERIFIED',
              ].map((item, i) => (
                <li key={i} className="text-gray-400 text-sm pl-4 border-l border-eve-green/30">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-xs">Status: Patent pending</p>
          </div>

          {/* ELEKTO */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-eve-orange text-2xl">⚡</span>
              <div>
                <h3 className="text-white font-medium">ELEKTO</h3>
                <p className="text-gray-600 text-xs">Cyber-Physical Energy Sharing</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              ELEKTO enables local energy sharing without energy sales. It combines physical 
              infrastructure with deterministic verification and escrow-based delivery.
            </p>
            <p className="text-gray-500 text-sm mb-2">Key characteristics:</p>
            <ul className="space-y-1 mb-4">
              {[
                'Tokenized kWh as non-financial access units',
                'Offline-first local decision units',
                'Cryptographically verified production and consumption',
                'Designed for marinas, camping sites, and housing cooperatives',
              ].map((item, i) => (
                <li key={i} className="text-gray-400 text-sm pl-4 border-l border-eve-orange/30">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-xs">Status: Patent pending (27 claims)</p>
          </div>

          {/* CableDNA */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-eve-purple text-2xl">◈</span>
              <div>
                <h3 className="text-white font-medium">CableDNA</h3>
                <p className="text-gray-600 text-xs">Physical Infrastructure Identity</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              CableDNA is a technology for uniquely identifying electrical cables and 
              infrastructure components throughout their lifecycle.
            </p>
            <p className="text-gray-500 text-sm mb-2">The system enables:</p>
            <ul className="space-y-1 mb-4">
              {[
                'Physical identity through measurable signatures',
                'Tamper detection',
                'Lifecycle traceability',
                'Zero-trust hardware identification',
              ].map((item, i) => (
                <li key={i} className="text-gray-400 text-sm pl-4 border-l border-eve-purple/30">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-xs">Status: Coming soon</p>
          </div>

          {/* ComplieDocs */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-eve-cyan text-2xl">§</span>
              <div>
                <h3 className="text-white font-medium">ComplieDocs</h3>
                <p className="text-gray-600 text-xs">Compliance Evidence Documentation</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              ComplieDocs is a compliance evidence documentation system built on EVE. It produces policies, 
              procedures, and registers through deterministic generation — eliminating hallucination risk.
            </p>
            <p className="text-gray-500 text-sm mb-2">Supported frameworks include:</p>
            <ul className="space-y-1 mb-4">
              {['GDPR', 'NIS2', 'EU AI Act', 'DORA'].map((item, i) => (
                <li key={i} className="text-gray-400 text-sm pl-4 border-l border-eve-cyan/30">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm mb-2">
              All outputs are traceable and eligible for verification.
            </p>
            <div className="text-gray-600 text-xs">
              <p>Website: <a href="https://compliedocs.com" className="text-eve-cyan hover:underline">compliedocs.com</a></p>
              <p>Status: Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Products Relate */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            How Our Products Relate
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            All OrganiQ products are built on top of EVE.
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'EVE provides determinism, verification, and evidence',
              'Products implement domain-specific functionality',
              'EVE VERIFIED exposes proof to external parties',
            ].map((item, i) => (
              <li key={i} className="text-gray-400 text-sm pl-4 border-l border-white/10">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-eve-green text-sm">
            No product bypasses the EVE core.
          </p>
        </div>
      </section>

      {/* Our Position */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Our Position
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            OrganiQ does not build autonomous AI. We build controlled systems for environments 
            where responsibility cannot be delegated to probability.
          </p>
          <p className="text-gray-500 text-sm mb-2">Our systems are designed for:</p>
          <ul className="space-y-1">
            {[
              'regulators',
              'auditors',
              'infrastructure operators',
              'organizations with real accountability requirements',
            ].map((item, i) => (
              <li key={i} className="text-gray-400 text-sm pl-4 border-l border-white/10">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Contact
          </h2>
          <p className="text-gray-400 text-sm">
            <a href="mailto:info@organiq.se" className="text-eve-green hover:underline">
              info@organiq.se
            </a>
          </p>
        </div>
      </section>

      {/* Legal Note */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Legal Note
          </h2>
          <p className="text-gray-500 text-sm">
            OrganiQ systems provide deterministic execution and cryptographic verification. 
            They do not provide legal advice, financial services, or autonomous decision-making.
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-2">
            OrganiQ Sweden AB · org.nr 559505-3579 · Stockholm, Sweden
          </p>
          <p className="text-gray-600 text-xs">
            Deterministic systems that never guess — only know.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
