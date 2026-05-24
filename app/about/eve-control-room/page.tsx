import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LiveControlRoom from './LiveControlRoom'

export const metadata: Metadata = {
  title: 'EVE Control Room | Human Control Over Deterministic Systems',
  description: 'The governance interface where human responsibility is exercised. Boundaries are defined, approvals are granted, and accountability is established.',
}

export default function EveControlRoomPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-extralight tracking-wide text-white/90 mb-4">
          EVE Control Room
        </h1>
        <p className="text-gray-400 text-lg">
          Human control over deterministic systems.
        </p>
      </section>

      {/* Purpose */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Purpose
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            The EVE Control Room is where human responsibility is exercised.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            It is the interface where boundaries are defined, approvals are granted, 
            and accountability is established — before any output can become verified.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            The Control Room exists to ensure that deterministic systems remain under explicit human control.
          </p>
        </div>
      </section>

      {/* Why the Control Room Exists */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Why the Control Room Exists
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Deterministic execution alone is not sufficient.
          </p>
          
          <p className="text-gray-500 text-sm mb-3">Without human oversight:</p>
          <ul className="space-y-2 mb-6">
            {[
              'systems lack accountability',
              'verification loses meaning',
              'responsibility cannot be assigned',
            ].map((item, i) => (
              <li key={i} className="text-gray-500 text-sm pl-4 border-l border-white/10">
                {item}
              </li>
            ))}
          </ul>
          
          <p className="text-gray-500 text-sm mb-3">The Control Room ensures that:</p>
          <ul className="space-y-2">
            {[
              'humans remain decision-makers',
              'systems remain constrained',
              'verification remains legitimate',
            ].map((item, i) => (
              <li key={i} className="text-gray-400 text-sm pl-4 border-l border-eve-green/30">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What Happens in the Control Room */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            What Happens in the Control Room
          </h2>
          <p className="text-gray-500 text-sm mb-4">Within the EVE Control Room, humans:</p>
          
          <ul className="space-y-2 mb-6">
            {[
              'Define constraints and boundaries',
              'Approve or reject execution plans',
              'Assign responsibility and ownership',
              'Review evidence before verification',
              'Control what is eligible for EVE VERIFIED status',
            ].map((item, i) => (
              <li key={i} className="text-gray-400 text-sm pl-4 border-l border-eve-green/30">
                {item}
              </li>
            ))}
          </ul>
          
          <p className="text-eve-green text-sm">
            No verified output bypasses this layer.
          </p>
        </div>
      </section>

      {/* Live Control Room */}
      <LiveControlRoom />

      {/* What the Control Room Is Not */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            What the Control Room Is Not
          </h2>
          <p className="text-gray-500 text-sm mb-4">To avoid ambiguity, the Control Room is not:</p>
          
          <div className="space-y-2 mb-6">
            {[
              'An AI system',
              'An automation engine',
              'A decision-making authority',
              'A user-facing dashboard',
              'A productivity tool',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-500 text-sm">
                <span className="text-red-400">✕</span>
                {item}
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm">
            It is a <span className="text-white">governance interface</span>.
          </p>
        </div>
      </section>

      {/* Control, Not Convenience */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Control, Not Convenience
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            The Control Room is intentionally restrictive.
          </p>
          
          <ul className="space-y-2 mb-4">
            {[
              'Actions require explicit approval',
              'Boundaries are enforced, not suggested',
              'Convenience never overrides correctness',
            ].map((item, i) => (
              <li key={i} className="text-gray-400 text-sm pl-4 border-l border-white/10">
                {item}
              </li>
            ))}
          </ul>
          
          <p className="text-gray-500 text-sm italic">
            This is by design.
          </p>
        </div>
      </section>

      {/* Relationship to Determinism */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Relationship to Determinism
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Determinism ensures reproducibility. The Control Room ensures accountability.
          </p>
          <p className="text-gray-500 text-sm">
            One without the other is insufficient.
          </p>
        </div>
      </section>

      {/* Relationship to EVE VERIFIED */}
      <section className="py-12 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Relationship to EVE VERIFIED
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Only outputs that pass through the Control Room can become EVE VERIFIED.
          </p>
          <p className="text-gray-500 text-sm">
            Verification without human approval is not verification. It is automation.
          </p>
        </div>
      </section>

      {/* Human Accountability */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extralight tracking-wide mb-4 text-white/90">
            Human Accountability
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Every verified output is ultimately tied to a human decision.
          </p>
          <p className="text-gray-500 text-sm">
            The Control Room is where that decision is recorded.
          </p>
        </div>
      </section>

      {/* Closing Principle */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-extralight text-white/80">
            Systems may execute. Humans must decide.
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-xs">
            The EVE Control Room enforces human oversight. It does not automate decisions or remove responsibility.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
