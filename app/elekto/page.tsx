import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ELEKTO Ecosystem | Verified Energy Sharing',
  description: 'Verified energy sharing for closed networks. Measure, verify, deliver, settle — without selling electricity. Patent protected technology.',
}

export default function ElektoPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero - Very Clean */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-gray-500 tracking-[0.3em] uppercase">
          Cyber-Physical Layer
        </span>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-wide mt-4 text-white/90">
          ELEKTO Ecosystem
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Verified energy sharing for closed networks
        </p>
        
        <div className="flex justify-center gap-2 mt-8 text-sm text-gray-500">
          <span className="text-eve-green">Measure</span>
          <span>·</span>
          <span className="text-eve-green">Verify</span>
          <span>·</span>
          <span className="text-eve-green">Deliver</span>
          <span>·</span>
          <span className="text-eve-green">Settle</span>
        </div>
        
        <p className="text-gray-600 mt-3 text-sm">
          Without selling electricity.
        </p>
      </section>

      {/* ELEKTO Section - Energy Focus */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extralight tracking-wide text-white/90">
              ELEKTO
            </h2>
            <p className="text-eve-green text-sm mt-1">
              Energy Sharing System
            </p>
          </div>
          
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
            ELEKTO enables local energy sharing where every kilowatt-hour is measured at source, 
            cryptographically verified, delivered under controlled rules, and automatically settled after use.
          </p>
          
          {/* Four Pillars */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { 
                step: '1', 
                title: 'Measured', 
                desc: 'Energy production verified by certified meters with digital signatures',
                color: '#00ff88'
              },
              { 
                step: '2', 
                title: 'Verified', 
                desc: 'Origin and consumption proven cryptographically before any transfer',
                color: '#00ff88'
              },
              { 
                step: '3', 
                title: 'Delivered', 
                desc: 'Energy flows only between authorized parties in closed networks',
                color: '#ff6b00'
              },
              { 
                step: '4', 
                title: 'Settled', 
                desc: 'Automatic reconciliation after verified consumption',
                color: '#ff6b00'
              },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                  style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}40` }}
                >
                  {item.step}
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Sharing ≠ Selling */}
          <div className="p-6 rounded-xl bg-eve-green/5 border border-eve-green/20 text-center">
            <div className="text-2xl text-eve-green mb-3">≠</div>
            <h3 className="text-white font-medium mb-2">Sharing ≠ Selling</h3>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Designed for housing communities, marinas, and closed infrastructures. 
              Energy circulates within trusted networks — not traded on open markets.
            </p>
          </div>
        </div>
      </section>

      {/* Live demo panel — replaces BRFViz */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl border border-eve-green/20 bg-eve-green/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-eve-green animate-pulse" />
              <span className="text-eve-green text-sm font-mono">Live backend demo available</span>
            </div>
            <p className="text-gray-400 text-sm mb-5">
              The ELEKTO energy model runs against a real verification chain. Every step produces
              hashed events, a deterministic verdict, and a sealed record with cryptographic proof.
            </p>
            <div className="space-y-2 mb-6">
              {[
                { label: 'Normal recovery', verdict: 'ALLOWED', extra: 'verify: VALID' },
                { label: 'Stale resync', verdict: 'HELD', extra: 'verify: VALID' },
                { label: 'Battery reserve breach', verdict: 'HELD', extra: 'settlement_eligible: false · verify: VALID' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono">
                  <span className="text-gray-400">{row.label}</span>
                  <span className="flex items-center gap-3">
                    <span style={{ color: row.verdict === 'ALLOWED' ? '#00ff88' : '#f59e0b' }}>{row.verdict}</span>
                    <span className="text-gray-600">{row.extra}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-xs font-mono">Visual model · real verification chain</span>
              <a
                href="/control-chain/energy"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all text-sm"
              >
                Open live demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            Applications
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { 
                icon: '🏘', 
                title: 'Housing Communities', 
                desc: 'Solar sharing between apartments with cryptographic proof and annual reconciliation.'
              },
              { 
                icon: '⚓', 
                title: 'Marinas', 
                desc: 'Shore power sharing with per-kWh verification and automatic settlement between berths.'
              },
              { 
                icon: '🏕', 
                title: 'Camping & RV Parks', 
                desc: 'Fair energy distribution with measured consumption and offline capability.'
              },
            ].map((useCase, i) => (
              <div 
                key={i}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-eve-green/30 transition-colors"
              >
                <div className="text-2xl mb-3">{useCase.icon}</div>
                <h3 className="text-white font-medium mb-2 text-sm">{useCase.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Foundation - For the technically curious */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-2 text-center text-white/90">
            Technical Foundation
          </h2>
          <p className="text-gray-600 text-sm text-center mb-8">
            For the technically curious
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Verification', value: 'Cryptographic', desc: 'PoO/PoC signatures' },
              { label: 'Settlement', value: 'Automatic', desc: 'Usage-based' },
              { label: 'Connectivity', value: 'Offline-First', desc: 'Local decisions' },
              { label: 'Protocols', value: 'Open Standards', desc: 'Modbus, MQTT' },
              { label: 'EV Charging', value: 'OCPP 1.6J', desc: 'ISO 15118 ready' },
              { label: 'Local Control', value: 'Deterministic', desc: 'Real-time capable' },
              { label: 'Latency', value: '<50ms', desc: 'Local activation' },
              { label: 'Integration', value: 'Home Assistant', desc: 'Automation ready' },
            ].map((item, i) => (
              <div 
                key={i}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center"
              >
                <div className="text-eve-orange text-sm font-medium">{item.value}</div>
                <div className="text-white text-[10px] mt-1">{item.label}</div>
                <div className="text-gray-600 text-[10px]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVE Control Chain */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="mb-4">
              <h2 className="text-xl font-medium text-white">EVE Control Chain</h2>
              <p className="text-eve-green text-sm mt-1">Verification and control-chain evidence layer</p>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              ELEKTO began as a verified local energy-sharing concept. The EVE Control Chain extends
              this into a general evidence layer for critical control events: observed state, requested
              action, deterministic verdict, hash-chained events, sealed record and later verification.
            </p>
            <p className="text-gray-600 text-xs">
              The attested-control lineage originates in earlier critical-infrastructure patent work.
            </p>
          </div>
        </div>
      </section>

      {/* EVE Connection */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-eve-green/5 border border-eve-green/20">
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl bg-eve-green/10 flex items-center justify-center text-eve-green text-xl flex-shrink-0"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                e
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Part of the EVE Ecosystem</h3>
                <p className="text-gray-400 text-sm mb-3">
                  ELEKTO uses EVE for verification, evidence generation, and audit trails. 
                  Every energy unit is EVE-verified — the system never guesses, only knows.
                </p>
                <a 
                  href="/eve"
                  className="inline-flex items-center gap-2 text-eve-green text-sm hover:underline"
                >
                  Learn about EVE
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From verified sharing to verified control — Control Chain CTA */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <h2 className="text-lg font-extralight tracking-wide text-white/90 mb-3">
              From verified sharing to verified control
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mb-5">
              ELEKTO shows verified energy sharing in normal operation. EVE Verified Control Chain
              shows what happens during a critical event: grid outage, island mode, critical-load
              protection, verified resync and sealed proof.
            </p>
            <a
              href="/control-chain/energy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white/80 hover:border-eve-green/40 hover:text-eve-green transition-all text-sm"
            >
              Open island-mode control demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA - Clean */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-500 text-sm mb-6">
            Patent protected technology
          </p>
          <h2 className="text-xl font-extralight tracking-wide mb-4 text-white/90">
            Interested in a pilot?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We're looking for housing communities, marinas, and infrastructure operators 
            interested in verified energy sharing.
          </p>
          <a 
            href="/pilot?category=energy_infrastructure"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all text-sm"
          >
            Apply for Pilot Program
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
