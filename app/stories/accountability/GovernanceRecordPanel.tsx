'use client'

// Live record panel for EVE-ISO42001-00004652
// Fetches verify endpoint and renders: result, trigger_basis, required_human_confirmation, VALID
import { useEffect, useState } from 'react'

const EVE_ID = 'EVE-ISO42001-00004652'
const VERIFY_API = `https://api.eveverified.com/eve/verify/${EVE_ID}`
const VERIFY_URL = `https://verify.eveverified.com/?id=${EVE_ID}`
const GREEN = '#00ff88'
const RED = '#ef4444'
const AMBER = '#f59e0b'

interface VerifyData {
  valid: boolean
  eve_id: string
  payload: {
    data: {
      result: string
      trigger_basis: string[]
      required_human_confirmation: string[]
      materiality_assessed_by_eve: boolean
      is_compliance_score: boolean
      boundary_note: string
    }
  }
}
type VS = { status: 'loading' } | { status: 'ok'; d: VerifyData } | { status: 'error'; reason: string }

const BASIS_GLOSS: Record<string, string> = {
  approval_scope_mismatch: 'approval no longer covers the running system',
  authority_invalid_after_changes: 'the facts it rested on were replaced',
  declared_authority_unconfirmed: 'the authority it was granted under is unconfirmed',
  accountable_owner_unconfirmed: 'no named owner currently stands behind it',
  last_human_review_stale: 'the last human review is stale',
}

function verdictColor(v: string) {
  if (v === 'VALID') return GREEN
  if (v.includes('GAP')) return RED
  return '#9ca3af'
}

export default function GovernanceRecordPanel() {
  const [v, setV] = useState<VS>({ status: 'loading' })

  useEffect(() => {
    let alive = true
    fetch(VERIFY_API, { cache: 'no-store' })
      .then(r => r.json())
      .then((j: VerifyData) => {
        if (!alive) return
        if (j?.valid === true && j?.payload?.data) setV({ status: 'ok', d: j })
        else setV({ status: 'error', reason: 'record did not verify' })
      })
      .catch(() => { if (alive) setV({ status: 'error', reason: 'backend unreachable' }) })
    return () => { alive = false }
  }, [])

  if (v.status === 'loading') return (
    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 text-center">
      <p className="text-gray-500 text-sm font-mono italic">Verifying {EVE_ID}…</p>
    </div>
  )
  if (v.status === 'error') return (
    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 text-center">
      <p className="text-gray-500 text-sm font-mono">Could not verify — {v.reason}</p>
    </div>
  )

  const d = v.d.payload.data

  return (
    <div className="space-y-4">
      {/* Record header */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-1">Sealed record</div>
            <div className="text-white font-mono">{v.d.eve_id}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-1">Verify</div>
            <div className="font-mono text-xl" style={{ color: v.d.valid ? GREEN : RED }}>
              {v.d.valid ? 'VALID' : 'INVALID'}
            </div>
          </div>
        </div>
        <a href={VERIFY_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-xs px-4 py-2 rounded-full border transition-colors"
          style={{ color: GREEN, borderColor: `${GREEN}40`, background: `${GREEN}0a` }}>
          Verify record →
        </a>
      </div>

      {/* Result */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-3">Result</div>
        <div className="font-mono text-lg" style={{ color: verdictColor(d.result) }}>{d.result}</div>
        <div className="flex flex-wrap gap-4 mt-3">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded border" style={{ color: GREEN, borderColor: `${GREEN}25`, background: `${GREEN}08` }}>
            is_compliance_score: {String(d.is_compliance_score)}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded border" style={{ color: GREEN, borderColor: `${GREEN}25`, background: `${GREEN}08` }}>
            materiality_assessed_by_eve: {String(d.materiality_assessed_by_eve)}
          </span>
        </div>
      </div>

      {/* Trigger basis */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-4">
          Trigger basis — why the chain broke
        </div>
        <div className="space-y-3">
          {d.trigger_basis.map((b) => (
            <div key={b}>
              <div className="text-sm font-mono" style={{ color: RED }}>{b}</div>
              <div className="text-xs text-gray-500 mt-0.5">{BASIS_GLOSS[b] ?? b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Required human confirmation */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono mb-4">
          Required human confirmation
        </div>
        <div className="space-y-3">
          {d.required_human_confirmation.map((q, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono mt-0.5"
                style={{ borderColor: `${AMBER}40`, color: AMBER }}>{i + 1}</span>
              <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-xs leading-relaxed mt-4 italic border-t border-white/5 pt-3">
          {d.boundary_note}
        </p>
      </div>
    </div>
  )
}
