import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ELEKTO · Verified Energy Sharing',
  description:
    'ELEKTO is a verified local energy-sharing concept for closed networks. Internal kWh accounting, cryptographic proof, and EVE Control Chain integration.',
}

export default function ElektoPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-gray-500 tracking-[0.3em] uppercase font-mono">
          Verified Energy Sharing
        </span>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-wide mt-4 text-white/90">
          ELEKTO
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          ELEKTO started as a verified local energy-sharing concept for closed networks —
          housing communities, marinas, and controlled infrastructure.
        </p>
        <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
          Every kilowatt-hour is measured at source, cryptographically verified, delivered
          under controlled rules, and settled after use. The verification layer is EVE.
        </p>
        <div className="flex justify-center gap-2 mt-8 text-sm">
          {['Measure', 'Verify', 'Deliver', 'Settle'].map((s, i, a) => (
            <span key={s} className="flex items-center gap-2">
              <span className="text-eve-green">{s}</span>
              {i < a.length - 1 && <span className="text-gray-700">·</span>}
            </span>
          ))}
        </div>
      </section>

      {/* Live demo — high up */}
      <section className="py-10 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl border border-eve-green/20 bg-eve-green/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-eve-green animate-pulse" />
              <span className="text-eve-green text-sm font-mono">Live verification chain connected</span>
            </div>
            <p className="text-gray-400 text-sm mb-5">
              The ELEKTO energy model runs against a real EVE verification chain. Every step
              produces hashed events, a deterministic verdict, and a sealed record with
              cryptographic proof — verifiable independently.
            </p>
            <div className="space-y-2 mb-5">
              {[
                { label: 'Normal recovery',       verdict: 'ALLOWED', extra: 'verify: VALID' },
                { label: 'Stale resync',          verdict: 'HELD',    extra: 'snapshot_ttl_expired · verify: VALID' },
                { label: 'Battery reserve breach',verdict: 'HELD',    extra: 'settlement_eligible: false · verify: VALID' },
              ].map((row) => (
                <div key={row.label}
                  className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono">
                  <span className="text-gray-400">{row.label}</span>
                  <span className="flex items-center gap-3">
                    <span style={{ color: row.verdict === 'ALLOWED' ? '#00ff88' : '#f59e0b' }}>{row.verdict}</span>
                    <span className="text-gray-600">{row.extra}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-gray-600 text-xs font-mono">Visual model · real verification chain · pending M3 hardware attestation</span>
              <a href="/control-chain/energy"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all text-sm">
                Open live energy demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What ELEKTO does */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extralight tracking-wide text-white/90 text-center mb-3">
            Verified internal kWh accounting
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10 text-sm">
            ELEKTO enables local energy sharing where production, consumption, and settlement
            are all verifiable — without exposing the community to public electricity markets.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Measured',  desc: 'Production verified by certified meters with digital signatures at source.',  color: '#00ff88' },
              { step: '2', title: 'Verified',  desc: 'Origin and consumption proven cryptographically before any internal transfer.', color: '#00ff88' },
              { step: '3', title: 'Delivered', desc: 'Energy flows only between authorized parties within the closed network.',        color: '#00d4ff' },
              { step: '4', title: 'Settled',   desc: 'Automatic reconciliation after verified consumption, period by period.',        color: '#00d4ff' },
            ].map((item) => (
              <div key={item.step} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                  style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}40` }}>
                  {item.step}
                </div>
                <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where it fits */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide text-white/90 text-center mb-8">
            Where ELEKTO fits
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Housing communities',
                desc: 'Verified local energy accounting for shared solar production across apartments, buildings or housing associations. Every kWh can be traced from production to consumption, with signed records for internal allocation, reporting and annual reconciliation.',
              },
              {
                title: 'Marinas and port infrastructure',
                desc: 'Verified shore-power accounting per berth, vessel or tenant. Consumption is metered, signed and linked to a verifiable record between the marina operator and the participating users.',
              },
              {
                title: 'Industrial and campus microgrids',
                desc: 'Multi-tenant energy environments where operators need auditable allocation of production, consumption and reserve logic. ELEKTO can support verifiable internal kWh accounting for energy communities, campus infrastructure and ISO 50001-style reporting workflows.',
              },
            ].map((item) => (
              <div key={item.title}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-eve-green/20 transition-colors">
                <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical foundation */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide text-white/90 text-center mb-2">
            Technical foundation
          </h2>
          <p className="text-gray-600 text-sm text-center mb-8">For the technically curious</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Verification',  value: 'Cryptographic', desc: 'PoO/PoC signatures' },
              { label: 'Settlement',    value: 'Automatic',     desc: 'Usage-based' },
              { label: 'Connectivity',  value: 'Offline-First', desc: 'Local decisions' },
              { label: 'Protocols',     value: 'Open Standards',desc: 'Modbus, MQTT' },
              { label: 'EV Charging',   value: 'OCPP 1.6J',     desc: 'ISO 15118 ready' },
              { label: 'Local Control', value: 'Deterministic', desc: 'Real-time capable' },
              { label: 'Latency',       value: '<50ms',         desc: 'Local activation' },
              { label: 'Integration',   value: 'Home Assistant',desc: 'Automation ready' },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                <div className="text-eve-green text-sm font-medium">{item.value}</div>
                <div className="text-white/80 text-[10px] mt-1">{item.label}</div>
                <div className="text-gray-600 text-[10px]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVE Control Chain */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <h2 className="text-xl font-medium text-white mb-1">EVE Control Chain</h2>
            <p className="text-eve-green text-sm mb-4">Related but distinct verification track</p>
            <p className="text-gray-400 leading-relaxed mb-4">
              ELEKTO began as a verified local energy-sharing concept. EVE Control Chain is a
              related but distinct verification track for control-chain evidence in critical
              control events: observed state, requested
              action, deterministic verdict, hash-chained events, sealed record, and later verification.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              The same chain that seals an ELEKTO energy settlement can seal an AGV robot denial,
              a grid island-mode sequence, or a CMMC compliance signal. Domain-independent. Same
              WORM chain. Same verify adapter.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/control-chain/energy"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all text-sm">
                Energy Control Chain demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href="/control-chain/agv"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:border-eve-green/30 hover:text-eve-green transition-all text-sm">
                AGV Control Chain demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <p className="text-gray-600 text-xs mt-6">
              The attested-control lineage originates in earlier critical-infrastructure patent work.
            </p>
          </div>
        </div>
      </section>

      {/* Pilot CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-3 text-white/90">
            Interested in a pilot?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We are looking for housing communities, marinas, and infrastructure operators
            interested in verified internal energy accounting.
          </p>
          <a href="/pilot?category=energy_infrastructure"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 text-eve-green hover:bg-eve-green/20 transition-all text-sm">
            Apply for Pilot Program
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <p className="text-gray-700 text-xs mt-6">
            ELEKTO is not presented as a public electricity marketplace, financial instrument or utility billing system. It is a verified internal kWh accounting and control-chain evidence layer for controlled communities and infrastructure environments.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
