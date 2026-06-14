'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

// Euler's number for timing
const E = 2.71828182845904

// Verification states
type VerifyState = 'idle' | 'loading' | 'verified' | 'not_found' | 'error'

// Clean hierarchical ecosystem visualization
function EcosystemViz() {
  const products = [
    { name: 'ComplieDocs', x: 110 },
    { name: 'ELEKTO', x: 270 },
    { name: 'ELEKTO-X', x: 430 },
    { name: 'CableDNA', x: 590 },
  ]

  return (
    <div className="flex justify-center py-8 overflow-x-auto">
      <svg width="700" height="460" viewBox="0 0 700 460" className="overflow-visible">
        
        {/* === EVE CORE (TOP) === */}
        <g>
          {/* Static concentric rings */}
          <circle cx="350" cy="80" r="90" fill="none" stroke="#00ff88" strokeWidth="1" strokeOpacity="0.08" />
          <circle cx="350" cy="80" r="115" fill="none" stroke="#00ff88" strokeWidth="1" strokeOpacity="0.05" />
          <circle cx="350" cy="80" r="140" fill="none" stroke="#00ff88" strokeWidth="1" strokeOpacity="0.03" />
          
          {/* Pulsing rings */}
          <motion.circle
            cx="350" cy="80" r="55"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            animate={{ r: [55, 90], opacity: [0.35, 0] }}
            transition={{ duration: E * 1.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="350" cy="80" r="55"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            animate={{ r: [55, 115], opacity: [0.25, 0] }}
            transition={{ duration: E * 1.4, repeat: Infinity, ease: "easeOut", delay: E * 0.4 }}
          />
          
          {/* Main circle */}
          <circle
            cx="350" cy="80" r="55"
            fill="rgba(10,10,10,0.95)"
            stroke="#00ff88"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.3))' }}
          />
          
          {/* e symbol */}
          <motion.text
            x="350" y="95"
            textAnchor="middle"
            fill="#00ff88"
            fontSize="48"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: E, repeat: Infinity, ease: "easeInOut" }}
          >
            e
          </motion.text>
        </g>
        
        {/* EVE Core label */}
        <text x="350" y="160" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="13" fontWeight="500">
          EVE Core
        </text>
        <text x="350" y="176" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
          produces verified outputs
        </text>

        {/* === CONNECTING LINES (TOP) === */}
        {/* Vertical from EVE Core */}
        <line x1="350" y1="188" x2="350" y2="210" stroke="#00ff88" strokeWidth="1" strokeOpacity="0.5" />
        
        {/* Horizontal distribution line */}
        <line x1="110" y1="210" x2="590" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        
        {/* Vertical lines to products */}
        {products.map((p) => (
          <line key={`top-${p.name}`} x1={p.x} y1="210" x2={p.x} y2="230" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        ))}

        {/* === PRODUCT BOXES === */}
        {products.map((product) => (
          <g key={product.name}>
            <rect
              x={product.x - 55} y="230"
              width="110" height="48"
              rx="8"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <text x={product.x} y="252" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">
              {product.name}
            </text>
            <text x={product.x} y="268" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
              consumes EVE Core
            </text>
          </g>
        ))}

        {/* === CONNECTING LINES (BOTTOM) === */}
        {/* Vertical lines from products */}
        {products.map((p) => (
          <line key={`bot-${p.name}`} x1={p.x} y1="278" x2={p.x} y2="298" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        ))}
        
        {/* Horizontal collection line */}
        <line x1="110" y1="298" x2="590" y2="298" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        
        {/* Vertical to EVE VERIFIED */}
        <line x1="350" y1="298" x2="350" y2="330" stroke="#00ff88" strokeWidth="1" strokeOpacity="0.5" />

        {/* === EVE VERIFIED (BOTTOM) === */}
        <g>
          {/* Main box */}
          <rect
            x="260" y="350"
            width="180" height="80"
            rx="12"
            fill="rgba(0,255,136,0.04)"
            stroke="#00ff88"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 15px rgba(0,255,136,0.2))' }}
          />
          
          {/* Text */}
          <motion.text
            x="350" y="388"
            textAnchor="middle"
            fill="#00ff88"
            fontSize="15"
            fontWeight="600"
            letterSpacing="0.1em"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: E, repeat: Infinity, ease: "easeInOut" }}
          >
            EVE VERIFIED
          </motion.text>
          <text x="350" y="410" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">
            exposes proof of correctness
          </text>
        </g>
      </svg>
    </div>
  )
}

export default function EveVerifiedClient() {
  // Verification state
  const [verifyId, setVerifyId] = useState('')
  const [state, setState] = useState<VerifyState>('idle')
  const [result, setResult] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Handle verification (READ-ONLY, witness only)
  const handleVerify = async () => {
    if (!verifyId.trim()) return
    
    setState('loading')
    setResult(null)
    setErrorMsg('')
    
    try {
      const res = await fetch(`http://127.0.0.1:8004/verify/${encodeURIComponent(verifyId.trim())}`)
      
      if (res.status === 404) {
        setState('not_found')
        return
      }
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      
      const data = await res.json()
      setResult(data)
      
      // Check if verified (all conditions met)
      const isVerified = data.verified === true
      setState(isVerified ? 'verified' : 'not_found')
      
    } catch (err: any) {
      setState('error')
      setErrorMsg('Verification service offline (8004)')
    }
  }

  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-eve-green/10 border border-eve-green/30 mb-8">
          <span className="text-eve-green text-2xl">◉</span>
          <span className="text-eve-green text-lg tracking-wide font-medium">EVE VERIFIED</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extralight tracking-wide text-white/90 mb-4">
          Deterministic verification. Publicly auditable proof.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          EVE VERIFIED is the public verification layer of the EVE ecosystem. 
          It exists for one purpose: to let anyone independently verify that a system output 
          is real, traceable, and produced under deterministic control.
        </p>
      </section>

      {/* What EVE VERIFIED Means */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            What EVE VERIFIED Means
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              'The output was produced under EVE Core (not Play mode)',
              'Every step is traceable to its source',
              'Evidence is cryptographically signed',
              'The process is deterministic and reproducible',
              'A witness layer observed the operation',
              'The result can be cryptographically verified',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-eve-green">✓</span>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-eve-green text-sm">
            EVE VERIFIED does not rely on trust. It relies on proof.
          </p>
        </div>
      </section>

      {/* How Verification Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            How Verification Works
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {[
              { step: '1', label: 'PRODUCE', desc: 'Artifact created' },
              { step: '2', label: 'WITNESS', desc: 'Operation observed' },
              { step: '3', label: 'LOG', desc: 'Evidence stored' },
              { step: '4', label: 'SIGN', desc: 'Proofs generated' },
              { step: '5', label: 'VERIFY', desc: 'Reference issued' },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 border-eve-green/50 text-eve-green">
                    {item.step}
                  </div>
                  <div className="text-white text-xs mt-2 font-medium">{item.label}</div>
                  <div className="text-gray-600 text-[10px] mt-0.5 text-center">{item.desc}</div>
                </div>
                {i < 4 && (
                  <div className="hidden md:block w-8 h-px bg-eve-green/30 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What EVE VERIFIED Is Not */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            What EVE VERIFIED Is Not
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'An AI system',
              'A generator or editor',
              'A wallet or financial service',
              'A marketplace or exchange',
              'A decision-making authority',
              'A sandbox environment',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                <span className="text-red-400 text-sm">✕</span>
                <span className="text-gray-400 text-xs">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-gray-500 text-sm">
            EVE VERIFIED is <span className="text-white">read-only</span>, <span className="text-white">evidence-based</span>, and <span className="text-white">deterministic</span>.
          </p>
        </div>
      </section>

      {/* Ecosystem Visualization */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-extralight tracking-wide mb-4 text-center text-white/90">
          Relationship to EVE Core & Products
        </h2>
        <EcosystemViz />
        <p className="text-center text-gray-500 text-sm mt-4">
          EVE VERIFIED is the <span className="text-white">public trust boundary</span> of the ecosystem.
        </p>
      </section>

      {/* Verify an Artifact */}
      <section id="verify" className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-extralight tracking-wide mb-4 text-white/90">
            Verify an Artifact
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Enter a verification reference or hash to check verification status.
          </p>

          <div className="p-6 rounded-xl bg-black/40 border border-white/10">
            <div className="flex gap-3">
              <input 
                type="text"
                placeholder="Enter EVE Decision ID (e.g., EVE-2026-000001)"
                value={verifyId}
                onChange={(e) => setVerifyId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-eve-green/50 transition-colors"
              />
              <button 
                onClick={handleVerify}
                disabled={state === 'loading' || !verifyId.trim()}
                className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all
                  ${state === 'loading' || !verifyId.trim()
                    ? 'bg-eve-green/10 border-eve-green/20 text-eve-green/50 cursor-not-allowed'
                    : 'bg-eve-green/20 border-eve-green/30 text-eve-green hover:bg-eve-green/30'
                  }`}
              >
                {state === 'loading' ? 'Verifying...' : 'Verify'}
              </button>
            </div>

            {/* Result display */}
            <div className="mt-6 min-h-[80px]">
              {/* Verified */}
              {state === 'verified' && result && (
                <div className="p-4 rounded-lg bg-eve-green/10 border border-eve-green/30 text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-eve-green text-xl">✓</span>
                    <span className="text-eve-green font-medium tracking-wide">EVE VERIFIED</span>
                  </div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <p>Decision ID: <span className="text-white font-mono">{result.eve_decision_id}</span></p>
                    {result.verification?.decision?.created_at && (
                      <p>Created: <span className="text-white">{new Date(result.verification.decision.created_at).toLocaleString()}</span></p>
                    )}
                    {result.verification?.decision?.type && (
                      <p>Type: <span className="text-white">{result.verification.decision.type}</span></p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Not found */}
              {state === 'not_found' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 text-xl">✕</span>
                    <span className="text-red-400 font-medium tracking-wide">NOT VERIFIED</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">Decision not found or invalid reference.</p>
                </div>
              )}
              
              {/* Error (service offline) */}
              {state === 'error' && (
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-xl">⚠</span>
                    <span className="text-yellow-400 font-medium">{errorMsg}</span>
                  </div>
                </div>
              )}
              
              {/* Idle */}
              {state === 'idle' && (
                <p className="text-gray-600 text-xs">
                  Enter an EVE Decision ID to verify its authenticity.
                </p>
              )}
            </div>
          </div>

          <p className="mt-8 text-eve-green text-sm">
            Trust is optional. Verification is not.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
