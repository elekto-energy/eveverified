'use client'

import { useState } from 'react'

type State = 'idle' | 'sending' | 'sent' | 'error'

const audiences = [
  { value: 'developer', label: 'Developer / AI builder' },
  { value: 'enterprise', label: 'Enterprise / GRC' },
  { value: 'partner', label: 'Partner / consultant' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', company: '', audience: 'developer', message: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    setError('')
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email and message are required.')
      return
    }
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send.')
      setState('sent')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send.')
      setState('error')
    }
  }

  const inputCls =
    'w-full rounded-lg border border-ent-border bg-ent-card px-4 py-2.5 text-sm text-ent-text ' +
    'placeholder:text-ent-muted focus:outline-none focus:border-ent-accent transition-colors'

  return (
    <main className="min-h-screen bg-ent-panel flex flex-col">
      {/* Top bar */}
      <div className="border-b border-ent-border px-6 h-14 flex items-center">
        <a href="/" className="flex items-center gap-2.5 group">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md border border-ent-border bg-ent-card text-lg text-ent-accent-hi italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            e
          </span>
          <span className="text-sm font-semibold tracking-[0.06em] text-ent-text">EVE Verified</span>
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          {state === 'sent' ? (
            <div className="rounded-xl border border-ent-verified/30 bg-ent-verified/[0.06] p-8 text-center">
              <div className="text-ent-verified text-base font-semibold mb-2">Message sent</div>
              <p className="text-sm text-ent-dim leading-relaxed">
                Thank you. Your message has reached us and we will reply to {form.email.trim()}.
              </p>
              <a href="/" className="inline-block mt-6 text-sm font-semibold text-ent-accent-hi hover:underline">
                Back to home →
              </a>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ent-accent-hi">Contact</span>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-ent-text">Get in touch</h1>
                <p className="mt-3 text-sm text-ent-dim leading-relaxed">
                  Questions about Pre-Action verification, a pilot, or governance use cases?
                  Send a message and we will get back to you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ent-dim mb-1.5">Name *</label>
                    <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ent-dim mb-1.5">Email *</label>
                    <input className={inputCls} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@company.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ent-dim mb-1.5">Company <span className="text-ent-muted font-normal">(optional)</span></label>
                  <input className={inputCls} value={form.company} onChange={e => set('company', e.target.value)} placeholder="Organisation" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ent-dim mb-1.5">I am a</label>
                  <select className={inputCls} value={form.audience} onChange={e => set('audience', e.target.value)}>
                    {audiences.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ent-dim mb-1.5">Message *</label>
                  <textarea className={inputCls + ' resize-none'} rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="How can we help?" />
                </div>

                {error && (
                  <div className="rounded-lg border border-ent-warn/30 bg-ent-warn/[0.08] px-4 py-2.5 text-sm text-ent-warn">
                    {error}
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={state === 'sending'}
                  className="w-full rounded-lg bg-ent-verified px-5 py-3 text-sm font-bold text-[#04140d] transition-colors hover:bg-[#0ea371] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === 'sending' ? 'Sending…' : 'Send message'}
                </button>

                <p className="text-xs text-ent-muted text-center">
                  Or email <a href="mailto:joakim@organiq.se" className="text-ent-accent-hi hover:underline">joakim@organiq.se</a> directly.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
