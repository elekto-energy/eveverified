'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function MedicalLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        // Redirect to medical.eveverified.com after successful login
        window.location.href = process.env.NEXT_PUBLIC_MEDICAL_APP_URL || 'http://localhost:3051/medical'
      }
    } catch (err) {
      setError('Ett fel uppstod. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-eve-dark relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-eve-green/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-eve-purple/5 rounded-full blur-[120px]" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Back link */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-8 left-8 text-sm text-gray-500 hover:text-eve-green transition-colors"
        >
          ← eveverified.com
        </motion.a>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span 
                className="text-4xl text-eve-green"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                e
              </span>
              <span className="text-sm tracking-[0.3em] text-gray-400">MEDICAL</span>
            </div>
            <h1 className="text-2xl font-extralight tracking-wide text-white/90 mb-4">
              Evidence & Verification Engine
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Verifierbar navigering av läkemedelssäkerhetsdata från FDA FAERS. 
              AI under kontroll — aldrig rådgivning, alltid fakta.
            </p>
          </div>

          {/* Patent line */}
          <div className="mb-8 text-center">
            <p className="text-xs text-gray-600">
              EVE · Evidence & Verification Engine · Patent Pending
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                E-post <span className="text-eve-green">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-white/10 rounded-lg 
                         text-white placeholder-gray-600 focus:border-eve-green/30 focus:outline-none
                         transition-colors text-sm"
                style={{ backgroundColor: '#0d0d0d', colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Lösenord <span className="text-eve-green">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-white/10 rounded-lg 
                         text-white placeholder-gray-600 focus:border-eve-green/30 focus:outline-none
                         transition-colors text-sm"
                style={{ backgroundColor: '#0d0d0d', colorScheme: 'dark' }}
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-lg bg-eve-green/90 text-eve-dark font-medium
                       hover:bg-eve-green transition-all disabled:opacity-50 text-sm"
            >
              {loading ? 'Loggar in...' : 'Logga in'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600">
              Endast inbjudna användare. Kontakta{' '}
              <a href="mailto:info@eveverified.com" className="text-eve-green hover:underline">
                info@eveverified.com
              </a>
              {' '}för åtkomst.
            </p>
          </div>
        </motion.div>

        {/* Patent notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 text-center"
        >
          <p className="text-xs text-gray-700">
            Patent Pending EVE-PAT-2026-001 · © 2026 Organiq Sweden AB
          </p>
        </motion.div>
      </div>
    </main>
  )
}
