'use client'

// ═══════════════════════════════════════════════════════════════════════════
// EVIDENCE COMMITMENTS PANEL — layer 4
//
// Governed by app/stories/PROVIDER_BACKED_STORY_MODEL.md v1.2
//   c293fb6fac0f483b0a37659111a074c45ef8196c5de08034a70380eb3a36ff5b
//
// Copy source (release input): PUBLIC_EVIDENCE_COMMITMENTS.md v1.1
//   eb49434f3640e8e4df2c7b0c106d81c27a7c22c91220588884b1eafdd4ac0219
//
// The eighteen digests below were EXTRACTED from that file, not transcribed by
// hand. If they are ever edited here they stop being commitments and become
// decoration: a published digest that does not match the artifact it names is
// worse than publishing nothing.
//
// VISUAL LANGUAGE — grc.eveverified.com/chain/pre-action:
//   light body #f7f8fa · white cards, #e5e7eb borders, 10px radius ·
//   uppercase mono section labels in #9ca3af · digests in the benchmark's
//   navy code block (#0f172a / #e2e8f0), which is where monospace payloads
//   belong in this system · cyan #ecfeff/#a5f3fc/#155e75 for boundary
//   statements, because limits are their own visual category here.
//
// PROGRESSIVE DISCLOSURE — three levels, each named for what it reveals.
// Generic "More" / "Details" are forbidden: a visitor must be able to decide
// whether to open a level without opening it first.
//
// NEVER TRUNCATED in the verifiable view. On narrow screens the digest wraps
// with break-all, but the byte string is complete. An abbreviated digest looks
// tidy and cannot be checked, which defeats the entire purpose.
//
// NO "Verify" CTA — no public endpoint re-checks these artifacts. No live
// status: no effects, no timers, no network calls.
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react'

interface Commitment {
  stage: string
  /** Plain-language description. No internal vocabulary. */
  what: string
  recordSha256: string
  manifestSha256: string
}

const COMMITMENTS: Commitment[] = [
  {
    stage: 'DEPLOY-1',
    what: 'The runtime code was put in place and checked against the published source.',
    recordSha256: '5f56d21364c0780ff43c6ffceab8b4aab0134b4e699669abda9d11195803c394',
    manifestSha256: 'fb315763dfc4abb7d28ac2e3130e2f51b001cd96e08ff705ec42359e83cf258e',
  },
  {
    stage: 'DEPLOY-2',
    what: 'A second deployment completed the contract layer the first one relied on.',
    recordSha256: '1340c2397a7e5b45ce04e1650812ba94dba27a05d84732f7eeb1de23154d1e71',
    manifestSha256: '1cb7b3fa3287e523293c77ffb9d898253247cda7166a9f0164b54830294c7bcf',
  },
  {
    stage: 'P2',
    what: 'EVE recorded and sealed what it would require, while the work was still open.',
    recordSha256: '1056af551643e7ba214a38cf9d8ca35bc96079dcd8cb31bb0dd72b7de8f5e7bd',
    manifestSha256: '34db87dd05c98af097c9c1a1dfb380d72a9e84eb3eae12a074ae92b65abded56',
  },
  {
    stage: 'P3',
    what: 'The source was not available. EVE refused and recorded nothing.',
    recordSha256: '1031ecb4048dac85f90c3cf20cfbf1f1767ecb47a469aba5d8f0de82ecbe84a3',
    manifestSha256: '30d5425c46fcce9ee2d934fcb1233e8cba974ea5542d557f434ddb9869500d85',
  },
  {
    stage: 'P4',
    what: 'The operator made the source available.',
    recordSha256: '2425ed4a382c40ab40ba71b36cd67fbfb7e033ea5e2731b193f5fded1a5d27db',
    manifestSha256: '18d3f98810827cebf8d9f834231734ae0424e949a8980623200ad72f7e8fb4c7',
  },
  {
    stage: 'P5',
    what: 'The credential was not available. EVE refused again, for a different reason.',
    recordSha256: 'c83cee5a96b03b193dc52e109341e5bf809eed6be8b6efbccf18085ace4d0995',
    manifestSha256: '56e99d90e04b03e5149e23a1d615c6cefd4f7eaa7e4a20cf48e5c54eb8c685dc',
  },
  {
    stage: 'P6',
    what: 'The operator made the credential available.',
    recordSha256: '8f1c19e91e61b924240b68ac57359fe0d4846283e5d864e95c30ee7ff3ca73e3',
    manifestSha256: '93cf2cabe54eb90f9edca291dfccbed7c985d3009c4bb7dc39532160fdbeaa74',
  },
  {
    stage: 'P7',
    what: 'The work concluded. Only now did an outcome exist.',
    recordSha256: '46b44126f0c359ecd2f4702fba8e328900b5c59a0c86c4d13926656ebc775401',
    manifestSha256: '21b218de484e5138797ed775fcae0f47df6a58c6a0b32bac63ee513dbfa96788',
  },
  {
    stage: 'P8',
    what: 'EVE read the provider itself and checked it against what it had sealed.',
    recordSha256: 'b82ceac414656a4c6676ec353a71f0620aff41613cb606804314b9c0ac2be5ba',
    manifestSha256: '29eb336857598afdb510327ecdc362303c9cce9dd47f1525b1f281335f5668f5',
  },
]

function Digest({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
      <span className="shrink-0 text-[.56rem] font-bold uppercase tracking-[.06em] text-[#64748b] sm:w-[68px]">
        {label}
      </span>
      {/* break-all wraps the digest visually. The string itself is complete. */}
      <span className="break-all font-mono text-[.68rem] leading-[1.55] text-[#e2e8f0]">
        {value}
      </span>
    </div>
  )
}

function Level({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string
  label: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const panelId = `${id}-panel`
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#e5e7eb] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-[#f7f8fa]"
      >
        <span className="text-[.82rem] font-bold text-[#0f172a]">{label}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div id={panelId} className="border-t border-[#e5e7eb] px-4 py-5">
          {children}
        </div>
      )}
    </div>
  )
}

export default function EvidenceCommitmentsPanel() {
  const [chainOpen, setChainOpen] = useState(false)
  const [digestsOpen, setDigestsOpen] = useState(false)
  const [boundariesOpen, setBoundariesOpen] = useState(false)

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-[980px]">
        {/* LEVEL 1 — one line, no digests */}
        <div className="text-[.62rem] font-bold uppercase tracking-[.1em] text-gray-400">
          Evidence commitments
        </div>
        <h2 className="mt-1.5 text-[1.25rem] font-bold tracking-[-.01em] text-[#0f172a]">
          See how the proof was frozen.
        </h2>
        <p className="mt-2.5 max-w-2xl text-[.82rem] leading-[1.55] text-gray-600">
          Each stage was written down and fixed before the next one could change
          it. What is published below are the fingerprints of those records —
          enough for anyone who later receives the records themselves to check
          that they are the same ones.
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          {/* LEVEL 2 */}
          <Level
            id="evidence-chain"
            label="Show evidence chain"
            open={chainOpen}
            onToggle={() => setChainOpen((v) => !v)}
          >
            <ol className="flex flex-col gap-3">
              {COMMITMENTS.map((c) => (
                <li key={c.stage} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="shrink-0 font-mono text-[.66rem] font-bold uppercase tracking-[.06em] text-indigo-700 sm:w-[76px]">
                    {c.stage}
                  </span>
                  <span className="text-[.78rem] leading-[1.5] text-gray-600">{c.what}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-[6px] bg-[#f7f8fa] px-3 py-2.5 text-[.74rem] leading-[1.5] text-gray-600">
              Each stage carries two fingerprints. The{' '}
              <strong className="font-semibold text-[#111827]">record</strong>{' '}
              fingerprint covers the written account of that stage. The{' '}
              <strong className="font-semibold text-[#111827]">manifest</strong>{' '}
              fingerprint covers the evidence package behind it, and fixes which
              files were included at the moment it was frozen.
            </div>
          </Level>

          {/* LEVEL 3 — the verifiable view. Never truncated. */}
          <Level
            id="full-digests"
            label="Show full SHA-256 commitments"
            open={digestsOpen}
            onToggle={() => setDigestsOpen((v) => !v)}
          >
            <div className="flex flex-col gap-2">
              {COMMITMENTS.map((c) => (
                <div key={c.stage} className="rounded-[8px] bg-[#0f172a] px-4 py-3">
                  <div className="mb-2 font-mono text-[.62rem] font-bold uppercase tracking-[.08em] text-[#7dd3fc]">
                    {c.stage}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Digest label="record" value={c.recordSha256} />
                    <Digest label="manifest" value={c.manifestSha256} />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 rounded-[6px] bg-[#f7f8fa] px-3 py-2.5 text-[.74rem] leading-[1.5] text-gray-600">
              Algorithm: SHA-256. Eighteen commitments, shown in full. The
              complete records are retained for controlled diligence, where a
              recipient can check the supplied artifacts against the fingerprints
              published here.
            </p>
          </Level>

          {/* Boundaries — behind disclosure, but present */}
          <Level
            id="verification-boundaries"
            label="Show verification boundaries"
            open={boundariesOpen}
            onToggle={() => setBoundariesOpen((v) => !v)}
          >
            <div className="flex flex-col gap-2.5">
              {[
                'A fingerprint proves that a file has not changed since it was published. It does not prove when the file was created, and it does not prove that what the file says is true.',
                'The full records are not published here. They contain operational detail about how the systems are run, which a public page has no need to carry. They are available under controlled diligence.',
                'Edited copies are never published. An edited file no longer matches the fingerprint that represents it, and an artifact that fails its own published commitment would be worse than no artifact at all.',
              ].map((t) => (
                <p
                  key={t.slice(0, 24)}
                  className="rounded-[9px] border border-cyan-200 bg-cyan-50 px-4 py-3 text-[.76rem] leading-[1.5] text-cyan-800"
                >
                  {t}
                </p>
              ))}
            </div>
          </Level>
        </div>
      </div>
    </section>
  )
}
