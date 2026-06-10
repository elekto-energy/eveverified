'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const USE_CASE_CATEGORIES = [
  { value: 'compliance_governance', label: 'Compliance & Governance' },
  { value: 'ai_verification_audit', label: 'AI Verification / Audit' },
  { value: 'cyber_physical_systems', label: 'Cyber-Physical Systems' },
  { value: 'energy_infrastructure', label: 'Energy / Infrastructure' },
  { value: 'research_experimental', label: 'Research / Experimental' },
]

function PilotForm() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [applicantType, setApplicantType] = useState<'company' | 'individual' | ''>('')
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  
  // Update category if URL param changes
  useEffect(() => {
    if (categoryParam && USE_CASE_CATEGORIES.some(c => c.value === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const submittingRef = useRef(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submittingRef.current) return   // double-click guard
    submittingRef.current = true
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const body = {
      applicant_type: formData.get('applicant_type') as string,
      organization_name: formData.get('organization_name') as string || '',
      contact_name: formData.get('contact_name') as string,
      email: formData.get('email') as string,
      country: formData.get('country') as string,
      use_case_category: formData.get('use_case_category') as string,
      use_case_description: formData.get('use_case_description') as string,
      contribution_intent: formData.get('contribution_intent') as string,
      technical_background: formData.get('technical_background') as string || '',
    }

    try {
      const res = await fetch('/api/pilot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Something went wrong. Please try again.')
        submittingRef.current = false
      } else {
        setIsSubmitted(true)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
      submittingRef.current = false
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-eve-green/10 border border-eve-green/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-eve-green text-2xl">✓</span>
        </div>
        <h1 className="text-2xl font-extralight tracking-wide text-white/90 mb-4">
          Application Received
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your application has been submitted for review.<br />
          Selected pilots will be contacted directly.
        </p>
        <a 
          href="/"
          className="inline-block mt-8 text-sm text-eve-green hover:text-eve-green/80 transition-colors"
        >
          ← Back to EVE VERIFIED
        </a>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-eve-green text-sm">◉</span>
            <span className="text-gray-400 text-xs tracking-wide">PILOT PROGRAM</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extralight tracking-wide text-white/90 mb-6">
            EVE VERIFIED — Pilot Program
          </h1>
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
            We are selecting <span className="text-white">3–5 pilot participants</span> to help validate, 
            stress-test, and refine the EVE verification ecosystem.
          </p>
          
          <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/5 max-w-md mx-auto">
            <p className="text-gray-500 text-xs leading-relaxed">
              This is not a beta program.<br />
              It is a collaborative pilot focused on <span className="text-white">correctness</span>, <span className="text-white">stability</span>, and <span className="text-white">accountability</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Who should apply */}
      <section className="py-8 px-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-medium text-white/80 mb-4">Who should apply</h2>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-eve-green/60 mt-0.5">→</span>
            Companies operating in regulated or critical environments
          </li>
          <li className="flex items-start gap-2">
            <span className="text-eve-green/60 mt-0.5">→</span>
            Engineers, researchers, or practitioners with relevant domain expertise
          </li>
          <li className="flex items-start gap-2">
            <span className="text-eve-green/60 mt-0.5">→</span>
            Individuals interested in verification logic, governance signals, evidence workflows, or system stability
          </li>
        </ul>
        <p className="text-gray-600 text-xs mt-4">
          Pilots may be companies or individuals.
        </p>
      </section>

      {/* What participation involves */}
      <section className="py-8 px-6 max-w-3xl mx-auto">
        <h2 className="text-sm font-medium text-white/80 mb-4">What participation involves</h2>
        <p className="text-gray-500 text-sm mb-4">
          Pilots are expected to actively contribute through one or more of the following:
        </p>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-white/40">•</span>
            Providing real-world verification use cases
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/40">•</span>
            Stress-testing deterministic agents and factories
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/40">•</span>
            Reviewing verification outputs and evidence flows
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/40">•</span>
            Reviewing governance signals such as authority boundaries, approval chains, accountability continuity, and approval scope mismatch
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/40">•</span>
            Contributing feedback on governance, constraints, and stability
          </li>
        </ul>
        <p className="text-gray-600 text-xs mt-4 italic">
          Passive participation is not expected.
        </p>
      </section>

      {/* What the pilot is NOT */}
      <section className="py-8 px-6 max-w-3xl mx-auto">
        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
          <h2 className="text-sm font-medium text-white/80 mb-3">This pilot does not include</h2>
          <ul className="space-y-1 text-gray-500 text-xs">
            <li className="flex items-center gap-2">
              <span className="text-red-400/60">✕</span>
              Early access to commercial products
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400/60">✕</span>
              Tokens, wallets, or financial services
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400/60">✕</span>
              Automated onboarding or self-service access
            </li>
          </ul>
          <p className="text-gray-600 text-xs mt-3">
            Participation is manual and selective.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 px-6 max-w-2xl mx-auto">
        <h2 className="text-lg font-extralight tracking-wide text-white/90 mb-8 text-center">
          Pilot Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Applicant Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Applicant type <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="applicant_type"
                  value="company"
                  required
                  onChange={(e) => setApplicantType(e.target.value as 'company')}
                  className="w-4 h-4 text-eve-green bg-transparent border-white/20 focus:ring-eve-green/50"
                />
                <span className="text-sm text-gray-300">Company</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="applicant_type"
                  value="individual"
                  required
                  onChange={(e) => setApplicantType(e.target.value as 'individual')}
                  className="w-4 h-4 text-eve-green bg-transparent border-white/20 focus:ring-eve-green/50"
                />
                <span className="text-sm text-gray-300">Individual</span>
              </label>
            </div>
          </div>

          {/* Organization Name (conditional) */}
          {applicantType === 'company' && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Organization name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="organization_name"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                         placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors"
                placeholder="Organization name"
              />
            </div>
          )}

          {/* Contact Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Contact name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="contact_name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                       placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                       placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Country <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="country"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                       placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors"
              placeholder="Country"
            />
          </div>

          {/* Use Case Category */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Use case category <span className="text-red-400">*</span>
            </label>
            <select
              name="use_case_category"
              required
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                       focus:border-eve-green/50 focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-eve-dark">Select category</option>
              {USE_CASE_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-eve-dark">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Use Case Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Use case description <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Describe what you want to verify, build, or stress-test with EVE VERIFIED.
            </p>
            <textarea
              name="use_case_description"
              required
              maxLength={800}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                       placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors resize-none"
              placeholder="Your use case..."
            />
          </div>

          {/* Contribution Intent (KEY FIELD) */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Contribution intent <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-2">
              How do you want to contribute to the EVE ecosystem?
              <br />
              <span className="text-gray-500">(e.g. agent development, stability testing, verification feedback, governance input)</span>
            </p>
            <textarea
              name="contribution_intent"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                       placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors resize-none"
              placeholder="How you intend to contribute..."
            />
          </div>

          {/* Technical Background (optional) */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Technical background <span className="text-gray-600">(optional)</span>
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Relevant technical or domain background.
            </p>
            <textarea
              name="technical_background"
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm 
                       placeholder:text-gray-600 focus:border-eve-green/50 focus:outline-none transition-colors resize-none"
              placeholder="Optional..."
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg bg-eve-green/10 border border-eve-green/30 text-eve-green 
                       font-medium hover:bg-eve-green/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <p className="text-center text-gray-600 text-xs mt-4">
              Applications are reviewed manually.<br />
              Selected pilots will be contacted directly.
            </p>
          </div>
        </form>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-6 max-w-2xl mx-auto">
        <p className="text-center text-gray-600 text-xs">
          This pilot does not provide early access to commercial products, tokens, or services.
        </p>
      </section>
    </>
  )
}

function PilotFormFallback() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-white/5 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-white/5 rounded w-48 mx-auto"></div>
      </div>
    </section>
  )
}

export default function PilotPage() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />
      <Suspense fallback={<PilotFormFallback />}>
        <PilotForm />
      </Suspense>
      <Footer />
    </main>
  )
}
