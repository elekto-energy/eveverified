'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Euler's number for timing
const E = 2.71828182845904

// ════════════════════════════════════════════════════════════════════════════
// AGENT ECOSYSTEM VISUALIZATION
// ════════════════════════════════════════════════════════════════════════════

export function AgentEcosystemViz() {
  const [activeTab, setActiveTab] = useState<'core' | 'custom' | 'compare'>('core')
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)

  const coreAgents = [
    {
      category: 'MODELS',
      symbol: '△',
      color: '#00d4ff',
      desc: 'Multi-model consensus',
      agents: [
        { id: 'claude', name: 'Claude API', symbol: 'C', desc: 'Creative reasoning & complex analysis' },
        { id: 'qwen', name: 'Qwen Local', symbol: 'Q', desc: 'Offline privacy-critical operations' },
        { id: 'router', name: 'Det. Router', symbol: 'D', desc: 'Intelligent task routing' },
      ]
    },
    {
      category: 'WITNESS',
      symbol: '◉',
      color: '#ff6b00',
      desc: 'Verification & audit',
      agents: [
        { id: 'xvault', name: 'X-Vault', symbol: '🔐', desc: 'Cryptographic sealing & proof' },
        { id: 'audit', name: 'Audit Trail', symbol: '📋', desc: 'Complete operation history' },
        { id: 'verify', name: 'Verifier', symbol: '✓', desc: 'Claim verification engine' },
      ]
    },
    {
      category: 'FACTORY',
      symbol: '⚙',
      color: '#a855f7',
      desc: 'Deterministic generation',
      agents: [
        { id: 'compliance', name: 'Compliance', symbol: '§', desc: 'GDPR, NIS2, AI Act templates' },
        { id: 'document', name: 'Document Gen', symbol: '◧', desc: 'PDF, DOCX, Markdown output' },
        { id: 'video', name: 'Video Pipeline', symbol: '▶', desc: 'Script to render automation' },
        { id: 'analysis', name: 'Analysis', symbol: '◫', desc: 'Data processing & reports' },
      ]
    },
    {
      category: 'KNOWLEDGE',
      symbol: '◇',
      color: '#00ff88',
      desc: 'Information management',
      agents: [
        { id: 'kb', name: 'Knowledge Core', symbol: 'K', desc: '325K indexed chunks' },
        { id: 'search', name: 'Semantic Search', symbol: '⌕', desc: 'Context-aware retrieval' },
        { id: 'learn', name: 'AutoLearn', symbol: '↻', desc: 'Automatic knowledge indexing' },
      ]
    },
  ]

  const customAgentExamples = [
    {
      industry: 'Legal Firm',
      color: '#f59e0b',
      agents: [
        { name: 'Contract Analyzer', desc: 'Parse and extract key terms from contracts' },
        { name: 'Case Researcher', desc: 'Search precedents in internal case database' },
        { name: 'Due Diligence Bot', desc: 'Automated compliance checking' },
      ]
    },
    {
      industry: 'Healthcare',
      color: '#10b981',
      agents: [
        { name: 'Patient Summarizer', desc: 'Summarize patient history from records' },
        { name: 'Protocol Checker', desc: 'Verify treatment against guidelines' },
        { name: 'Research Assistant', desc: 'Search medical literature with citations' },
      ]
    },
    {
      industry: 'Finance',
      color: '#3b82f6',
      agents: [
        { name: 'Risk Assessor', desc: 'Analyze portfolio risk factors' },
        { name: 'Compliance Monitor', desc: 'Real-time regulatory monitoring' },
        { name: 'Report Generator', desc: 'Automated quarterly reports' },
      ]
    },
    {
      industry: 'Manufacturing',
      color: '#ef4444',
      agents: [
        { name: 'Quality Inspector', desc: 'Defect detection from sensor data' },
        { name: 'Maintenance Predictor', desc: 'Predictive maintenance scheduling' },
        { name: 'Supply Chain Optimizer', desc: 'Inventory and logistics optimization' },
      ]
    },
  ]

  const comparison = [
    {
      feature: 'Agent Creation',
      eve: 'Users define custom agents with own knowledge bases',
      others: 'Pre-built assistants, limited customization',
      eveAdvantage: true
    },
    {
      feature: 'Knowledge Source',
      eve: 'Your data only — synthesis bound to your sources',
      others: 'Internet-trained, prone to hallucination',
      eveAdvantage: true
    },
    {
      feature: 'Verification',
      eve: 'Every output cryptographically sealed & auditable',
      others: 'No verification, trust required',
      eveAdvantage: true
    },
    {
      feature: 'Multi-Model',
      eve: '3-model routing with consensus',
      others: 'Single model, no consensus',
      eveAdvantage: true
    },
    {
      feature: 'Offline Mode',
      eve: 'Full functionality with local Qwen models',
      others: 'Cloud-dependent, no offline option',
      eveAdvantage: true
    },
    {
      feature: 'Determinism',
      eve: 'Same input = Same output (Factory engines)',
      others: 'Non-deterministic, different results each time',
      eveAdvantage: true
    },
    {
      feature: 'Privacy',
      eve: 'Data never leaves your infrastructure',
      others: 'Data sent to external servers for training',
      eveAdvantage: true
    },
    {
      feature: 'Compliance',
      eve: '53 legal-grade templates (GDPR, NIS2, AI Act)',
      others: 'Generic outputs, manual compliance review needed',
      eveAdvantage: true
    },
  ]

  return (
    <div className="py-12">
      {/* Tab Navigation */}
      <div className="flex justify-center gap-2 mb-10">
        {[
          { id: 'core', label: 'Core Agents', icon: '⚙' },
          { id: 'custom', label: 'Custom Agents', icon: '✦' },
          { id: 'compare', label: 'Why EVE?', icon: '◈' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-eve-green/20 text-eve-green border border-eve-green/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Core Agents Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'core' && (
          <motion.div
            key="core"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-xl text-white font-medium mb-2">25+ Built-in Agents</h3>
              <p className="text-gray-500 text-sm">Specialized agents working through coordinated model routing</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {coreAgents.map((category) => (
                <div 
                  key={category.category}
                  className="bg-white/[0.02] rounded-xl border border-white/5 p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${category.color}15`, color: category.color }}
                    >
                      {category.symbol}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{category.category}</div>
                      <div className="text-gray-500 text-xs">{category.desc}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {category.agents.map((agent) => (
                      <div
                        key={agent.id}
                        onMouseEnter={() => setHoveredAgent(agent.id)}
                        onMouseLeave={() => setHoveredAgent(null)}
                        className={`flex items-center gap-3 p-2.5 rounded-lg transition-all cursor-pointer ${
                          hoveredAgent === agent.id 
                            ? 'bg-white/5' 
                            : 'bg-transparent hover:bg-white/[0.02]'
                        }`}
                      >
                        <div 
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs border"
                          style={{ 
                            borderColor: `${category.color}40`,
                            color: category.color,
                            backgroundColor: hoveredAgent === agent.id ? `${category.color}15` : 'transparent'
                          }}
                        >
                          {agent.symbol}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white/80 text-sm">{agent.name}</div>
                          <div className="text-gray-600 text-xs truncate">{agent.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Custom Agents Tab */}
        {activeTab === 'custom' && (
          <motion.div
            key="custom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-xl text-white font-medium mb-2">Define Your Own Agents</h3>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Configure specialized agents constrained to your data. They inherit EVE's verification 
                and determinism guarantees while operating within your defined boundaries.
              </p>
            </div>

            {/* How it works */}
            <div className="bg-white/[0.02] rounded-xl border border-eve-green/20 p-6 mb-8">
              <div className="text-eve-green text-xs font-medium mb-4">HOW IT WORKS</div>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: '1', title: 'Upload Knowledge', desc: 'Documents, databases, or APIs' },
                  { step: '2', title: 'Define Role', desc: 'Name, purpose, constraints' },
                  { step: '3', title: 'Set Boundaries', desc: 'What it can and cannot do' },
                  { step: '4', title: 'Deploy & Verify', desc: 'Every output is auditable' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 rounded-full border border-eve-green/30 bg-eve-green/10 flex items-center justify-center text-eve-green font-bold mx-auto mb-3">
                      {item.step}
                    </div>
                    <div className="text-white text-sm font-medium mb-1">{item.title}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Examples */}
            <div className="text-gray-400 text-xs uppercase tracking-wider mb-4">Industry Examples</div>
            <div className="grid md:grid-cols-2 gap-4">
              {customAgentExamples.map((industry) => (
                <div 
                  key={industry.industry}
                  className="bg-white/[0.02] rounded-xl border border-white/5 p-5"
                >
                  <div 
                    className="text-sm font-medium mb-4 pb-2 border-b border-white/5"
                    style={{ color: industry.color }}
                  >
                    {industry.industry}
                  </div>
                  <div className="space-y-3">
                    {industry.agents.map((agent, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center text-xs mt-0.5"
                          style={{ backgroundColor: `${industry.color}15`, color: industry.color }}
                        >
                          ✦
                        </div>
                        <div>
                          <div className="text-white/80 text-sm">{agent.name}</div>
                          <div className="text-gray-600 text-xs">{agent.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Benefit */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-eve-green/5 to-eve-purple/5 border border-eve-green/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-eve-green/10 flex items-center justify-center text-eve-green text-xl">
                  🔒
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Your Data, Your Rules, Your Control</div>
                  <p className="text-gray-400 text-sm">
                  Unlike ChatGPT or Copilot, your configured agents operate exclusively on your knowledge base. 
                  No external data mixing, no hallucination from internet training. Every response is 
                  traceable to your verified sources. Agents follow your constraints — they cannot bypass them.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'compare' && (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-xl text-white font-medium mb-2">Why EVE is Different</h3>
              <p className="text-gray-500 text-sm">Designed to prevent unsupported claims from becoming approved facts</p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left text-gray-400 text-xs font-medium p-4 w-1/4">Feature</th>
                    <th className="text-left text-xs font-medium p-4 w-[37.5%]">
                      <span className="text-eve-green">EVE</span>
                    </th>
                    <th className="text-left text-xs font-medium p-4 w-[37.5%]">
                      <span className="text-gray-500">ChatGPT / Copilot / Others</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr 
                      key={row.feature}
                      className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}
                    >
                      <td className="p-4 text-white/80 text-sm font-medium">{row.feature}</td>
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <span className="text-eve-green mt-0.5">✓</span>
                          <span className="text-gray-300 text-sm">{row.eve}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">✗</span>
                          <span className="text-gray-500 text-sm">{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Quote */}
            <div className="mt-8 text-center">
              <div className="inline-block p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-gray-300 text-lg italic mb-3">
                  "AI bound to retrieved sources — synthesis is constrained by approved evidence"
                </p>
                <div className="text-eve-green text-sm">The EVE Architecture Principle</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AgentEcosystemViz
