import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ELEKTO-X / X-Vault | Attested Control for Critical Resources',
  description: 'ELEKTO-X / X-Vault is the attested control layer for critical-resource execution. Node identity, state, policy and authority are verified before critical resources, links or commands are allowed to proceed.',
}

const mechanisms = [
  { symbol: '🏛', title: 'Vault approval layer',          desc: 'Control commands are only accepted from verified, attested sources via the vault approval gate.' },
  { symbol: '🔑', title: 'Hardware-attested nodes',        desc: 'Nodes prove identity and state via TPM/HSM-based hardware attestation before participation.' },
  { symbol: '🎟', title: 'Token-gated access',             desc: 'Critical functions require time-limited, policy-bound tokens before access is granted.' },
  { symbol: '✅', title: 'Multi-attestation',              desc: 'Critical commands require independent attestation from at least two authorized nodes.' },
  { symbol: '📸', title: 'Signed snapshots',               desc: 'State snapshots are signed, timestamped and externally anchored to prevent retrospective modification.' },
  { symbol: '⏱', title: 'Monotonic counter + TTL',         desc: 'Replay protection through monotonic counters and token expiry.' },
  { symbol: '📋', title: 'WORM logging',                   desc: 'All critical events are recorded in distributed, append-only WORM logs. Nothing is deleted.' },
  { symbol: '🔏', title: 'Proof-of-Origin',                desc: 'Component and command provenance is cryptographically established and logged.' },
  { symbol: '🚨', title: 'Tamper detection and revocation', desc: 'Physical and logical tampering is detected; compromised nodes are revoked and excluded.' },
  { symbol: '🔄', title: 'Secure restart / resync',         desc: 'Systems restart in a known-good attested state after fault, intrusion or power loss.' },
  { symbol: '⚡', title: 'Policy-driven fail-operational',   desc: 'Systems continue to operate within declared policy under degraded conditions without losing integrity.' },
]

const useCases = [
  'Microgrids and local energy networks',
  'Hospitals and medical infrastructure',
  'Data centers and server facilities',
  'Defense / field systems',
  'Transport infrastructure — bridges, tunnels, runways',
  'VPN / 5G / SCADA links',
  'IoT nodes and mobile devices',
  'EV charging / V2H / V2G infrastructure',
  'Navigation infrastructure',
  'Critical resource networks',
]

const steps = [
  'Declared rule',
  'Observed activity',
  'Deterministic signal',
  'Human authority',
  'Governed execution or sealed proof',
  'Independent verification',
]

export default function ElektoXPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs text-eve-cyan tracking-[0.3em] uppercase font-mono">
          Attested Control Layer
        </span>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wide text-white/90 mt-4 mb-2">
          ELEKTO-X / X-Vault
        </h1>
        <p className="text-eve-cyan text-lg font-light mb-6">
          Attested control for critical resources
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
          ELEKTO-X / X-Vault is the attested control layer for critical-resource execution.
          It verifies node identity, state, policy and authority before critical resources,
          links or commands are allowed to proceed.
        </p>
        <div className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <span className="text-xs text-gray-500 font-mono">Patent pending · PRV SE 2530545-9</span>
        </div>
      </section>

      {/* Why it exists */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-6 text-white/90">
            Why it exists
          </h2>
          <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
            <p>
              Distributed energy, infrastructure, IoT, SCADA and AI-assisted workflows
              create new trust boundaries. Nodes join and leave. Links are established across
              domains. Commands are issued by systems, not only by people.
            </p>
            <p>
              Critical execution cannot rely only on ordinary API logs or user permissions.
              When a charging infrastructure, SCADA controller, navigation node or AI agent
              issues a command, the receiving system needs more than a username and timestamp.
            </p>
            <p>
              Systems need attested identity, state verification, policy-bound authorization
              and tamper-evident proof — so that any action can be verified after the fact,
              even if the issuing system is later compromised.
            </p>
          </div>
        </div>
      </section>

      {/* Core mechanisms */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-8 text-white/90">
            Core mechanisms
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {mechanisms.map((m) => (
              <div key={m.title} className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-xl shrink-0 mt-0.5">{m.symbol}</span>
                <div>
                  <div className="text-white text-sm font-medium mb-1">{m.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it connects to EVE Verified */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-6 text-white/90">
            How it connects to EVE Verified
          </h2>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {[
              { name: 'EVE Verified',      color: '#00ff88', desc: 'Verifies the decision chain: evidence, authority, accountability, approval scope and proof.' },
              { name: 'EVE Signals',       color: '#a855f7', desc: 'Surfaces governance gaps: authority boundaries, approval chains, accountability continuity, approval scope mismatch.' },
              { name: 'EVE Control Room',  color: '#00d4ff', desc: 'Records human authority and decision before the chain continues.' },
              { name: 'ELEKTO-X / X-Vault', color: '#ff6b00', desc: 'Controls critical execution: attested nodes, policy-bound authorization, WORM-logged proof.' },
            ].map((layer) => (
              <div
                key={layer.name}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5"
                style={{ borderLeftColor: layer.color, borderLeftWidth: '2px' }}
              >
                <div className="text-sm font-medium mb-1" style={{ color: layer.color }}>{layer.name}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{layer.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm italic leading-relaxed">
            EVE Verified verifies the decision chain. ELEKTO-X controls critical execution.
            EVE Signals connects them by surfacing authority, accountability and approval-scope
            gaps before trust is assumed.
          </p>
        </div>
      </section>

      {/* Shared control pattern */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-6 text-white/90">
            The shared control pattern
          </h2>
          <div className="p-5 rounded-lg bg-white/[0.02] border border-white/5">
            <p className="text-xs text-gray-500 font-mono tracking-[0.15em] uppercase mb-4">
              Consistent across every layer
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
              {steps.map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="text-sm text-white/70 font-mono">{step}</span>
                  {i < steps.length - 1 && (
                    <span className="text-eve-cyan/30 text-sm">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Not an AI firewall */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Not an AI firewall
          </h2>
          <div className="p-5 rounded-lg border border-white/10 bg-white/[0.015]">
            <p className="text-gray-400 text-sm leading-relaxed">
              ELEKTO-X / X-Vault may enforce critical-resource execution through attestation,
              policy-bound authorization and WORM-logged proof. But EVE Verified is not
              positioned as an AI firewall or sidecar veto product.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mt-3">
              The enforcement lineage belongs to ELEKTO-X / X-Vault as attested control
              of critical resources. EVE Verified remains the evidence and governance signal
              verification platform: showing what happened, which rule applied, who held
              authority, and whether the record can be verified later.
            </p>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-6 text-white/90">
            Use cases
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {useCases.map((uc) => (
              <div key={uc} className="flex items-center gap-3 text-sm text-gray-400 py-2 border-b border-white/[0.04]">
                <span className="text-eve-cyan/40 shrink-0">—</span>
                {uc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence / provenance */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-6 text-white/90">
            Patent provenance
          </h2>
          <div className="p-5 rounded-lg bg-white/[0.02] border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="font-mono text-xs text-eve-cyan/60 shrink-0">PRV SE 2530545-9</span>
              <span className="text-sm text-gray-400">ELEKTO-X critical-resource trust layer</span>
              <span className="text-xs text-gray-600 sm:ml-auto font-mono shrink-0">August 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="font-mono text-xs text-eve-cyan/60 shrink-0 mt-0.5">PRV complement</span>
              <span className="text-sm text-gray-400">Claims 21–29: critical resources, VPN/5G/SCADA, transport and navigation infrastructure, token-gated access, multi-attestation</span>
              <span className="text-xs text-gray-600 sm:ml-auto font-mono shrink-0 mt-0.5">18 Sep 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
              <span className="font-mono text-xs text-eve-cyan/60 shrink-0 mt-0.5">PRV complement</span>
              <span className="text-sm text-gray-400">Claims 30–41: Proof-of-Origin, multi-attestation, token-gated access, tamper detection, secure OTA, WORM logging</span>
              <span className="text-xs text-gray-600 sm:ml-auto font-mono shrink-0 mt-0.5">21 Sep 2025</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 leading-relaxed">
            ELEKTO-X / X-Vault is part of the EVE Verified platform. Patent pending.
            For technical or partnership enquiries:{' '}
            <a href="mailto:joakim@organiq.se" className="text-eve-cyan/50 hover:text-eve-cyan transition-colors">
              joakim@organiq.se
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
