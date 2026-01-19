'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

// ════════════════════════════════════════════════════════════════════════════
// HUMAN IN CONTROL - Core Principle Display
// ════════════════════════════════════════════════════════════════════════════

export function HumanInControl() {
  return (
    <div className="relative">
      {/* Main principle */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-6"
        >
          <span className="text-2xl">👤</span>
          <span className="text-white font-medium">Human-in-Control</span>
          <span className="text-eve-green text-xs px-2 py-0.5 rounded bg-eve-green/10">ABSOLUTE</span>
        </motion.div>
        
        <h3 className="text-xl md:text-2xl text-white/90 font-extralight mb-4">
          You own the idea, the project, and the decision
        </h3>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          EVE interprets, suggests, and executes — but only after explicit human approval.
          The system never starts projects, changes goals, or acts autonomously.
        </p>
      </div>

      {/* What EVE can and cannot do */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="p-5 rounded-xl bg-eve-green/5 border border-eve-green/20">
          <div className="text-eve-green text-xs font-medium mb-4 flex items-center gap-2">
            <span>✓</span> EVE CAN
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-eve-green mt-0.5">→</span>
              Interpret your intention
            </li>
            <li className="flex items-start gap-2">
              <span className="text-eve-green mt-0.5">→</span>
              Suggest plans and alternatives
            </li>
            <li className="flex items-start gap-2">
              <span className="text-eve-green mt-0.5">→</span>
              Execute after your approval
            </li>
            <li className="flex items-start gap-2">
              <span className="text-eve-green mt-0.5">→</span>
              Verify and audit every output
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
          <div className="text-red-400 text-xs font-medium mb-4 flex items-center gap-2">
            <span>✕</span> EVE CANNOT
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✕</span>
              Start projects autonomously
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✕</span>
              Change goals or direction
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✕</span>
              Execute without approval (in Core)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">✕</span>
              Bypass governance rules
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// EVE CORE vs EVE PLAY - Mode Distinction
// ════════════════════════════════════════════════════════════════════════════

export function CoreVsPlay() {
  const [activeMode, setActiveMode] = useState<'core' | 'play'>('core')

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveMode('core')}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeMode === 'core'
              ? 'bg-eve-green/20 text-eve-green border border-eve-green/30'
              : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10'
          }`}
        >
          <span className="mr-2">◉</span>
          EVE Core
          {activeMode === 'core' && <span className="ml-2 text-xs opacity-60">DEFAULT</span>}
        </button>
        <button
          onClick={() => setActiveMode('play')}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeMode === 'play'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10'
          }`}
        >
          <span className="mr-2">◇</span>
          EVE Play
        </button>
      </div>

      {/* Mode Details */}
      <div className="max-w-3xl mx-auto">
        {activeMode === 'core' ? (
          <motion.div
            key="core"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-eve-green/5 border border-eve-green/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-eve-green/10 border border-eve-green/30 flex items-center justify-center">
                <span className="text-eve-green text-xl">◉</span>
              </div>
              <div>
                <div className="text-white font-medium">EVE Core</div>
                <div className="text-eve-green text-xs">Production Mode • Default</div>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 rounded-full bg-eve-green/20 text-eve-green text-xs font-medium">
                  VERIFIED
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              The standard mode for all production work. Every output is deterministic, 
              verifiable, and logged with full audit trail.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Determinism', 'Verification', 'Audit Trail', 'X-Vault'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-eve-green">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <span className="text-amber-400 text-xl">◇</span>
              </div>
              <div>
                <div className="text-white font-medium">EVE Play</div>
                <div className="text-amber-400 text-xs">Sandbox Mode • Explicit Opt-in</div>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                  EXPERIMENTAL
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              For experiments, creative exploration, and rapid iteration. 
              Must be explicitly selected. No verification guarantees.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Experiments', 'Creative Mode', 'Fast Iteration', 'Dev Testing'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-amber-400">◇</span>
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-2">
                <span className="text-amber-400">⚠</span>
                <p className="text-amber-400/80 text-xs">
                  Play mode outputs are not verified and should not be used for production or compliance purposes.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// TRINITY ORCHESTRATION - Not a model, but orchestration
// ════════════════════════════════════════════════════════════════════════════

export function TrinityOrchestration() {
  return (
    <div>
      {/* Clarification */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs mb-4">
          <span>ℹ</span>
          Trinity is not a model — it's an orchestration
        </div>
      </div>

      {/* Three-part flow */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {/* LLM Layer */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-eve-cyan/20 relative">
          <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-eve-dark text-eve-cyan text-xs">
            1. INTERPRET
          </div>
          <div className="flex items-center gap-3 mb-3 mt-2">
            <div className="w-10 h-10 rounded-lg bg-eve-cyan/10 flex items-center justify-center text-eve-cyan">
              🧠
            </div>
            <div className="text-white font-medium text-sm">LLM Layer</div>
          </div>
          <p className="text-gray-500 text-xs mb-3">
            Interprets user intent, breaks down to structure, suggests plans.
          </p>
          <div className="text-xs text-gray-600">
            <div>✓ Parse free text</div>
            <div>✓ Propose alternatives</div>
            <div className="text-red-400/60">✕ Cannot decide</div>
            <div className="text-red-400/60">✕ Cannot execute</div>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-eve-cyan/40 text-xl hidden md:block">→</div>
        </div>

        {/* EVE Verification */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-eve-green/20 relative">
          <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-eve-dark text-eve-green text-xs">
            2. VERIFY
          </div>
          <div className="flex items-center gap-3 mb-3 mt-2">
            <div className="w-10 h-10 rounded-lg bg-eve-green/10 flex items-center justify-center text-eve-green">
              ◉
            </div>
            <div className="text-white font-medium text-sm">EVE Governance</div>
          </div>
          <p className="text-gray-500 text-xs mb-3">
            Verifies plans, applies rules, requires explicit approval.
          </p>
          <div className="text-xs text-gray-600">
            <div>✓ Validate against rules</div>
            <div>✓ Require human approval</div>
            <div>✓ Log everything</div>
            <div className="text-red-400/60">✕ Cannot skip steps</div>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-eve-green/40 text-xl hidden md:block">→</div>
        </div>

        {/* Code Factory */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-eve-purple/20 relative">
          <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-eve-dark text-eve-purple text-xs">
            3. EXECUTE
          </div>
          <div className="flex items-center gap-3 mb-3 mt-2">
            <div className="w-10 h-10 rounded-lg bg-eve-purple/10 flex items-center justify-center text-eve-purple">
              ⚙
            </div>
            <div className="text-white font-medium text-sm">Code Factory</div>
          </div>
          <p className="text-gray-500 text-xs mb-3">
            Executes only approved plans. Deterministic output.
          </p>
          <div className="text-xs text-gray-600">
            <div>✓ Run approved plans only</div>
            <div>✓ Same input → same output</div>
            <div>✓ Hash-verified artifacts</div>
            <div>✓ Full reproducibility</div>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center mt-8">
        <p className="text-gray-600 text-xs max-w-xl mx-auto">
          LLM interprets → EVE verifies → Factory executes. 
          Each stage has clear boundaries. No stage can bypass another.
        </p>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// CREATE UI PREVIEW - Simple interface
// ════════════════════════════════════════════════════════════════════════════

export function CreateUIPreview() {
  const [step, setStep] = useState(1)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
        {/* Fake UI */}
        <div className="space-y-4">
          {/* Input field */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Describe what you want to build</label>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm">
              Generate a GDPR-compliant privacy policy for my SaaS company...
              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Output type selector */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Output type</label>
            <div className="flex gap-2">
              {['Document', 'Code', 'Analysis'].map((type, i) => (
                <div 
                  key={type}
                  className={`px-3 py-1.5 rounded text-xs ${
                    i === 0 
                      ? 'bg-eve-green/20 text-eve-green border border-eve-green/30' 
                      : 'bg-white/5 text-gray-500 border border-white/10'
                  }`}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button 
              onClick={() => setStep(2)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                step === 1
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-eve-green/10 text-eve-green border border-eve-green/30'
              }`}
            >
              {step === 1 ? '1. Generate Plan' : '✓ Plan Generated'}
            </button>
            <button 
              onClick={() => setStep(3)}
              disabled={step < 2}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                step < 2
                  ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
                  : step === 2
                    ? 'bg-eve-green/20 text-eve-green border border-eve-green/30'
                    : 'bg-eve-green text-eve-dark'
              }`}
            >
              {step < 3 ? '2. Approve & Run' : '✓ Completed'}
            </button>
          </div>

          {/* Status indicator */}
          {step >= 2 && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-eve-green animate-pulse" />
              {step === 2 ? 'Plan ready for review. Nothing runs without your approval.' : 'Output verified and sealed.'}
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-gray-600 text-xs mt-4">
        Simple interface. Full control. Nothing happens without explicit approval.
      </p>
    </div>
  )
}

export default { HumanInControl, CoreVsPlay, TrinityOrchestration, CreateUIPreview }
