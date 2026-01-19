import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import MarinaViz from '@/components/MarinaViz'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ELEKTO | Energy Tokenization for Microgrids',
  description: 'Tokenized energy sharing without selling. PoO/PoC verification, escrow-locked delivery, deterministic settlement. Patent pending.',
}

export default function ElektoPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs text-eve-orange tracking-[0.3em] uppercase">
            Cyber-Physical Layer
          </span>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mt-4">
            <span className="text-eve-orange">ELEKTO</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
            Energy sharing without selling. Tokenized kWh with cryptographic proof-of-origin 
            and escrow-locked delivery.
          </p>
          
          {/* EVE VERIFIED Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eve-green/10 border border-eve-green/30">
            <span className="text-eve-green font-medium text-sm">◉</span>
            <span className="text-eve-green text-sm">EVE VERIFIED</span>
          </div>
        </div>

        {/* Marina Visualization - Compact */}
        <MarinaViz />
        
        <p className="text-center text-gray-600 text-xs mt-3">
          Interactive marina microgrid demo • Click elements to explore
        </p>
      </section>

      {/* Core Innovation */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            The Innovation
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-eve-orange text-xl mb-3">≠</div>
              <h3 className="text-white font-medium mb-2 text-sm">Sharing ≠ Selling</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Tokens are non-financial access units, not currency. They circulate only within 
                a controlled network of trusted contacts. No fiat exchange.
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-eve-green text-xl mb-3">⚡</div>
              <h3 className="text-white font-medium mb-2 text-sm">1 Token = 1 kWh (Verified)</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Every token is minted against cryptographically verified energy production. 
                ECDSA-256 signatures from whitelisted meters.
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-eve-cyan text-xl mb-3">🔒</div>
              <h3 className="text-white font-medium mb-2 text-sm">Escrow-Locked Delivery</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Tokens are locked during energy transfer. Released only upon verified 
                consumption (PoC). Automatic settlement.
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-eve-purple text-xl mb-3">⚙</div>
              <h3 className="text-white font-medium mb-2 text-sm">Offline-First Resilience</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Local decision unit with token-snapshot continues operation during outage. 
                Post-event reconciliation when connectivity returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
          Energy Token Lifecycle
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          {[
            { step: '1', label: 'PRODUCE', desc: 'kWh generated', color: '#00ff88' },
            { step: '2', label: 'VERIFY', desc: 'PoO signed', color: '#00ff88' },
            { step: '3', label: 'MINT', desc: '1 kWh → 1 Token', color: '#ff6b00' },
            { step: '4', label: 'ESCROW', desc: 'Token locked', color: '#ff6b00' },
            { step: '5', label: 'DELIVER', desc: 'Energy flows', color: '#00d4ff' },
            { step: '6', label: 'SETTLE', desc: 'PoC verified', color: '#00d4ff' },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2"
                  style={{ borderColor: item.color, color: item.color }}
                >
                  {item.step}
                </div>
                <div className="text-white text-xs mt-2 font-medium">{item.label}</div>
                <div className="text-gray-600 text-[10px] mt-0.5">{item.desc}</div>
              </div>
              {i < 5 && (
                <div className="hidden md:block w-6 h-px bg-gray-700 mx-1" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EVE Connection */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-eve-green/5 border border-eve-green/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-eve-green/10 flex items-center justify-center text-eve-green text-xl flex-shrink-0">
                e
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Powered by EVE</h3>
                <p className="text-gray-400 text-sm mb-3">
                  ELEKTO uses EVE for verification, proof generation, determinism, and auditability.
                  Every energy token is EVE-verified — the system never guesses, only knows.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Verification', 'Proof Generation', 'Determinism', 'Audit Trail'].map((item) => (
                    <span key={item} className="text-xs text-eve-green/80 px-2 py-1 rounded bg-eve-green/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-eve-orange/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-3 text-center text-white/90">
            Applications
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Anywhere energy is shared but not sold
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { 
                icon: '⚓', 
                title: 'Marinas', 
                desc: 'Shore power with per-kWh tokenized access.',
                features: ['Device gating', 'Guest access', 'Seasonal tokens']
              },
              { 
                icon: '🏕', 
                title: 'Camping Sites', 
                desc: 'RV hookups with fair sharing and solar contribution.',
                features: ['Multi-site microgrid', 'Peak shaving', 'Battery buffering']
              },
              { 
                icon: '🏘', 
                title: 'Housing Cooperatives', 
                desc: 'BRF solar sharing between apartments.',
                features: ['Trusted contacts', 'Auto settlement', 'Annual reconciliation']
              },
            ].map((useCase, i) => (
              <div 
                key={i}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-eve-orange/30 transition-colors"
              >
                <div className="text-2xl mb-3">{useCase.icon}</div>
                <h3 className="text-white font-medium mb-1 text-sm">{useCase.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{useCase.desc}</p>
                <ul className="space-y-1">
                  {useCase.features.map((f, j) => (
                    <li key={j} className="text-[10px] text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-eve-orange/50" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
          Technical Foundation
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Blockchain', value: 'Polygon', desc: 'L2 efficiency' },
            { label: 'Protocols', value: 'Modbus/MQTT', desc: 'Industry standard' },
            { label: 'Signatures', value: 'ECDSA-256', desc: 'Ed25519 supported' },
            { label: 'Local Unit', value: 'FPGA/RTOS', desc: 'Deterministic' },
            { label: 'EV Charging', value: 'OCPP 1.6J', desc: 'ISO 15118-20' },
            { label: 'Token', value: 'ERC-1155', desc: 'Multi-asset' },
            { label: 'Latency', value: '<50ms', desc: 'Local activation' },
            { label: 'Integration', value: 'Home Assistant', desc: 'Automation' },
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
      </section>

      {/* Patent Status */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eve-orange/10 border border-eve-orange/30 text-eve-orange text-xs mb-4">
            <span>⚖</span>
            Patent Pending
          </div>
          <h2 className="text-xl font-extralight tracking-wide mb-3 text-white/90">
            Protected Innovation
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Swedish patent application filed with PRV covering tokenized energy sharing 
            with PoO/PoC verification, escrow settlement, and offline-first local decision units. 
            27 claims protecting the complete system architecture.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a 
              href="/eve"
              className="px-5 py-2.5 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green
                         hover:bg-eve-green/20 transition-all text-sm"
            >
              EVE Architecture
            </a>
            <a 
              href="#contact"
              className="px-5 py-2.5 rounded-full border border-white/10 text-gray-400
                         hover:border-white/20 hover:text-white transition-all text-sm"
            >
              Contact for Pilot
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
