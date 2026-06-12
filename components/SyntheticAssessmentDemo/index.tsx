'use client'

// ═══════════════════════════════════════════════════════════════════════════
// SyntheticAssessmentDemo — "Try the verified synthetic assessment"
//
// Replays the SEALED production runs of the two synthetic demo vendors,
// step by step: documents → resolver → verdicts → sealed record.
//
// Honesty rules:
//   - No backend call: a public "run" would require an exposed partner token
//     and would mint new seals in the append-only chain on every click.
//     This is a replay of a sealed production run — labelled exactly as such.
//   - Every value shown (hashes, verdicts, coverage, seal IDs) is real machine
//     output from data/syntheticAssessments.ts (generated from live_run).
//   - The verify links hit the live public verification chain.
//   - No arbitrary public upload in v1 — that belongs in the pilot flow.
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react'
import { DEMO_VENDORS, DemoVendor } from '@/data/syntheticAssessments'

type Stage = 0 | 1 | 2 | 3 | 4
// 0 idle · 1 documents · 2 resolver · 3 verdicts · 4 sealed record

const RESULT_COLOR: Record<string, string> = {
  Supported: '#00ff88',
  Partial: '#f59e0b',
  NO_ANSWER: '#9ca3af',
}

export default function SyntheticAssessmentDemo() {
  const [vendor, setVendor] = useState<DemoVendor>(DEMO_VENDORS[0])
  const [stage, setStage] = useState<Stage>(0)
  const [verdictCount, setVerdictCount] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  function selectVendor(v: DemoVendor) {
    clearTimers()
    setVendor(v)
    setStage(0)
    setVerdictCount(0)
  }

  function replay() {
    clearTimers()
    setStage(0)
    setVerdictCount(0)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setStage(4)
      setVerdictCount(vendor.findings.length)
      return
    }

    const t = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))
    t(60, () => setStage(1))
    t(900, () => setStage(2))
    t(1800, () => setStage(3))
    vendor.findings.forEach((_, i) => {
      t(1800 + 450 * (i + 1), () => setVerdictCount(i + 1))
    })
    t(1800 + 450 * (vendor.findings.length + 1), () => setStage(4))
  }

  return (
    <section id="demo" className="border-t border-slate-500/20 bg-[#0c0f15]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">LIVE VERIFICATION DEMO</p>
        <h2 className="text-3xl font-light mb-4">Try the verified synthetic assessment</h2>
        <p className="text-gray-400 max-w-3xl leading-relaxed mb-2">
          The documents are synthetic. The resolver, Excel export, seal and
          verification chain are real.
        </p>
        <p className="text-sm text-gray-500 max-w-3xl leading-relaxed mb-10">
          This demo replays a sealed production run — it is not a fake
          screenshot. The assessment records are sealed and independently
          verifiable; the verify links below hit the live verification chain.
        </p>

        {/* Vendor selector */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {DEMO_VENDORS.map((v) => (
            <button
              key={v.id}
              onClick={() => selectVendor(v)}
              className={`text-left border rounded-sm p-5 transition-colors ${
                vendor.id === v.id
                  ? 'border-slate-300/60 bg-slate-400/[0.06]'
                  : 'border-slate-500/25 hover:border-slate-400/40'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-white text-sm">{v.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {v.tagline} · {v.documents.length} documents
                  </p>
                </div>
                <span
                  className="font-mono text-[11px] whitespace-nowrap"
                  style={{ color: v.id === 'A' ? '#00ff88' : '#f59e0b' }}
                >
                  {v.summary}
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={replay}
          className="px-6 py-3 rounded-sm border border-slate-400/50 text-slate-200 text-sm font-medium
                     hover:border-slate-300/80 hover:text-white transition-colors"
        >
          Replay sealed assessment
        </button>

        {/* ── Replay stages ─────────────────────────────────────────────── */}
        {stage >= 1 && (
          <div className="mt-10 space-y-6">
            {/* 1: Documents ingested */}
            <div className="border border-slate-500/25 rounded-sm p-5 bg-[#0e1218]">
              <p className="font-mono text-[11px] tracking-[0.2em] text-gray-500 mb-3">
                01 · DOCUMENTS INGESTED — SHA-256 RECORDED AT INTAKE
              </p>
              <div className="space-y-1.5">
                {vendor.documents.map((d) => (
                  <div key={d.file} className="flex flex-wrap items-baseline justify-between gap-x-6 text-sm">
                    <span className="text-gray-400">{d.file}</span>
                    <span className="font-mono text-xs text-gray-600">
                      sha256:{d.sha16} · {d.chars} chars
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2: Resolver */}
            {stage >= 2 && (
              <div className="border border-slate-500/25 rounded-sm p-5 bg-[#0e1218]">
                <p className="font-mono text-[11px] tracking-[0.2em] text-gray-500 mb-2">
                  02 · DETERMINISTIC RESOLVER — v1.1, NO AI IN THE MATCHING PATH
                </p>
                <p className="text-sm text-gray-400">
                  4 rules evaluated against every document. Same input, same
                  output, same hash — this run was reproduced on an independent
                  machine with 16/16 identical content hashes.
                </p>
              </div>
            )}

            {/* 3: Verdicts, one by one */}
            {stage >= 3 && (
              <div className="border border-slate-500/25 rounded-sm p-5 bg-[#0e1218]">
                <p className="font-mono text-[11px] tracking-[0.2em] text-gray-500 mb-3">
                  03 · VERDICTS
                </p>
                <div className="space-y-4">
                  {vendor.findings.slice(0, verdictCount).map((f) => (
                    <div key={f.ruleId} className="text-sm">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                        <span className="text-gray-300">
                          {f.title}
                          <span className="text-gray-600 font-mono text-xs ml-2">
                            {f.ruleId} v{f.version}
                          </span>
                        </span>
                        <span className="font-mono text-xs" style={{ color: RESULT_COLOR[f.result] }}>
                          {f.result}
                          {f.coverage !== '—' ? ` · ${f.coverage}/100` : ''}
                          {f.strength ? ` · ${f.strength}` : ''}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-gray-600 mt-1">
                        finding {f.findingSeal} · content_hash {f.contentHash.slice(0, 16)}…
                      </div>
                      {f.note && <p className="text-xs text-gray-500 mt-1">{f.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4: Sealed record */}
            {stage >= 4 && (
              <div className="border border-slate-400/40 rounded-sm p-5 bg-[#0e1218]">
                <p className="font-mono text-[11px] tracking-[0.2em] text-gray-400 mb-3">
                  04 · SEALED RECORD — LIVE IN THE VERIFICATION CHAIN
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
                  <span className="font-mono text-xs text-gray-300">{vendor.manifestSeal}</span>
                  <span className="font-mono text-xs text-gray-500">
                    {vendor.assessmentId} · manifest schema 1.2 ·{' '}
                    <span className="text-eve-green">valid: true</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href={vendor.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-sm border border-eve-green/50 text-eve-green
                               hover:bg-eve-green/10 transition-colors"
                  >
                    Verify this record →
                  </a>
                  <a
                    href={vendor.workpaperUrl}
                    download
                    className="text-xs px-4 py-2 rounded-sm border border-slate-400/40 text-slate-300
                               hover:border-slate-300/70 hover:text-white transition-colors"
                  >
                    Download the Excel workpaper
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  The seal proves the workpaper has not changed after sealing.
                  It does not prove that the assessment is correct.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
