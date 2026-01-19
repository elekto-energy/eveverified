'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

// Euler's number for timing
const E = 2.71828182845904

export default function PilotClient() {
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    useCase: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // TODO: Connect to Supabase
    // For now, just simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-eve-green/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-eve-green/5" />
        </div>

        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eve-green/10 border border-eve-green/30 mb-8"
        >
          <span className="text-eve-green text-sm font-medium">PILOT PROGRAM</span>
          <span className="text-eve-green/60 text-sm">5 spots available</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extralight tracking-wide text-white mb-6"
        >
          Shape the Future of
          <br />
          <span className="text-eve-green">Deterministic AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-4"
        >
          Join 5 selected organizations in co-developing EVE Verified — 
          the verification layer for AI systems that never guess, only know.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-sm"
        >
          Q1 2026 · Limited availability · Direct collaboration with core team
        </motion.p>
      </section>

      {/* What You Get */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-12 text-center text-white/90">
            What Pilot Partners Receive
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '◉',
                title: 'Early Access',
                desc: 'Full access to EVE Verified platform before public launch'
              },
              {
                icon: '⚛',
                title: 'Co-Development',
                desc: 'Direct input on features, integrations, and roadmap priorities'
              },
              {
                icon: '🔐',
                title: 'Priority Support',
                desc: 'Dedicated technical support and integration assistance'
              },
              {
                icon: '📋',
                title: 'Custom Templates',
                desc: 'Industry-specific compliance templates tailored to your needs'
              },
              {
                icon: '💰',
                title: 'Founder Pricing',
                desc: 'Locked-in pricing for life as a founding pilot partner'
              },
              {
                icon: '🤝',
                title: 'Advisory Role',
                desc: 'Seat on product advisory board, shape the ecosystem'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-eve-green/20 transition-colors"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            Ideal Pilot Partners
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Organizations needing GDPR, NIS2, or AI Act compliance',
              'Companies building AI-powered products requiring audit trails',
              'Energy sector: marinas, camping, housing cooperatives',
              'Regulated industries: finance, healthcare, legal',
              'Tech companies wanting deterministic AI verification',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-eve-green">✓</span>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-4 text-center text-white/90">
            Apply for Pilot Program
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            Tell us about your organization and how EVE Verified could help.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-xl bg-eve-green/5 border border-eve-green/20 text-center"
            >
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-white text-xl mb-2">Application Received</h3>
              <p className="text-gray-400">
                Thank you for your interest! We'll review your application and respond within 48 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-2">Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-eve-green/50 focus:outline-none transition-colors"
                    placeholder="Acme AB"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-2">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-eve-green/50 focus:outline-none transition-colors"
                    placeholder="Anna Andersson"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-eve-green/50 focus:outline-none transition-colors"
                  placeholder="anna@acme.se"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-2">Primary Use Case *</label>
                <select
                  required
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-eve-green/50 focus:outline-none transition-colors"
                >
                  <option value="" className="bg-eve-dark">Select use case...</option>
                  <option value="compliance" className="bg-eve-dark">Compliance Documentation (GDPR, NIS2, AI Act)</option>
                  <option value="energy" className="bg-eve-dark">Energy Verification (ELEKTO)</option>
                  <option value="ai-audit" className="bg-eve-dark">AI System Audit Trails</option>
                  <option value="document" className="bg-eve-dark">Document Verification</option>
                  <option value="other" className="bg-eve-dark">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-2">Tell us more about your needs</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-eve-green/50 focus:outline-none transition-colors resize-none"
                  placeholder="What challenges are you facing? What would you like to achieve with EVE Verified?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-eve-green/20 border border-eve-green/30 text-eve-green font-medium hover:bg-eve-green/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>

              <p className="text-gray-600 text-xs text-center">
                By submitting, you agree to be contacted regarding the pilot program.
                <br />
                We respect your privacy and will never share your information.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extralight tracking-wide mb-8 text-center text-white/90">
            Pilot Timeline
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {[
              { date: 'Jan 2026', label: 'Applications Open', status: 'active' },
              { date: 'Feb 2026', label: 'Partner Selection', status: 'upcoming' },
              { date: 'Mar 2026', label: 'Onboarding', status: 'upcoming' },
              { date: 'Q2 2026', label: 'Co-Development', status: 'upcoming' },
              { date: 'Q3 2026', label: 'Public Launch', status: 'upcoming' },
            ].map((item, i) => (
              <div key={i} className="flex md:flex-col items-center md:items-center gap-3 md:gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'active' ? 'bg-eve-green' : 'bg-gray-700'
                }`} />
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    item.status === 'active' ? 'text-eve-green' : 'text-gray-500'
                  }`}>{item.date}</div>
                  <div className="text-gray-600 text-xs">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white/[0.01]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-4">
            Questions about the pilot program?
          </p>
          <a 
            href="mailto:info@eveverified.com"
            className="text-eve-green hover:underline"
          >
            info@eveverified.com
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
