'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

// ───────────────────────────────────────────────────────────────────────────
// Small helpers for consistent inline styling
// ───────────────────────────────────────────────────────────────────────────

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/[0.05] text-eve-green/90 text-[0.875em] font-mono whitespace-nowrap">
      {children}
    </code>
  )
}

function CodeLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-1.5 py-0.5 rounded bg-white/[0.05] text-eve-green/90 hover:text-eve-green text-[0.875em] font-mono whitespace-nowrap underline underline-offset-4 decoration-eve-green/20 hover:decoration-eve-green/60 transition-colors"
    >
      {children}
    </a>
  )
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-white font-medium">{children}</strong>
}

function Em({ children }: { children: React.ReactNode }) {
  return <em className="text-white/90 not-italic font-medium">{children}</em>
}

function Section({
  num,
  title,
  shade = false,
  children,
}: {
  num: string
  title: string
  shade?: boolean
  children: React.ReactNode
}) {
  return (
    <section className={`py-12 md:py-20 px-6 ${shade ? 'bg-white/[0.012]' : ''}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-eve-green/40 text-xs font-mono tracking-[0.15em] shrink-0">
            §{num}
          </span>
          <h2 className="text-xl md:text-2xl font-extralight tracking-wide text-white/90">
            {title}
          </h2>
        </div>
        <div className="space-y-5 text-gray-300 text-base leading-[1.75]">
          {children}
        </div>
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Article
// ───────────────────────────────────────────────────────────────────────────

export default function ArticleClient() {
  return (
    <main className="min-h-screen bg-eve-dark">
      <Navigation />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eve-green/10 border border-eve-green/30 mb-10">
              <span className="text-eve-green text-xs">◉</span>
              <span className="text-eve-green text-[10px] tracking-[0.25em] font-medium">
                INSIGHTS
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide text-white/95 mb-6 leading-[1.15]">
              From AI Act Documents to Verifiable Proof
            </h1>

            {/* Lede */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed italic max-w-2xl">
              Most AI Act work ends in documents. We wanted artifacts that could be verified:
              who approved them, what they contain, when they were sealed, and whether the
              evidence actually supports the claim.
            </p>

            {/* Byline */}
            <div className="mt-10 flex items-center gap-3 text-xs text-gray-600 tracking-wide">
              <span className="text-gray-500">Joakim Eklund</span>
              <span className="text-gray-700">·</span>
              <span>May 24, 2026</span>
              <span className="text-gray-700">·</span>
              <span>~15 min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-eve-green/20 to-transparent" />
      </div>

      {/* ─── §1 — The gap ─────────────────────────────────────────────── */}
      <Section num="1" title="The gap">
        <p>
          The EU AI Act has produced more whitepapers than working implementations. Article 5
          prohibitions and AI literacy obligations began applying in February 2025. Governance
          rules and GPAI obligations followed in August 2025. The Act&apos;s obligations are
          phasing in across 2025–2028, with different timelines for prohibited practices, GPAI
          obligations, and high-risk systems.
        </p>

        <p>
          What most organisations have today: policy documents, gap analyses, and PDF binders
          mapped against the Act&apos;s structure. What almost no one has: verifiable runtime
          artifacts that prove a system&apos;s documentation state at a given moment, with
          cryptographic integrity that survives external audit.
        </p>

        <p>
          We built a verifiable governance primitive — EVE Bridge combined with a human-governed
          approval layer — then used it in two ways: first to seal our own voluntary AI
          Act-grade documentation, then to test deterministic evidence resolution against
          uploaded GRC documents.
        </p>

        <p>
          <B>Application 1 — EVE-AIACT-PROOF-V1.</B> ComplieDocs is voluntarily declared not
          high-risk under Article 6(3). We still produced and sealed AI Act-grade documentation
          as due diligence. Six articles (6, 9, 10, 11, 14, 47), nineteen Bridge entries,
          complete. Public master manifest: <Code>EVE-COMPLIEDOCS-00001125</Code>. Anyone can
          verify it at{' '}
          <CodeLink href="https://verify.eveverified.com/aiact-proof.html">
            https://verify.eveverified.com/aiact-proof.html
          </CodeLink>
          .
        </p>

        <p>
          <B>Application 2 — EVE GRC Witness.</B> A private preview, live at{' '}
          <CodeLink href="https://grc.eveverified.com">https://grc.eveverified.com</CodeLink>.
          Same primitive, applied differently: deterministic evidence resolution against
          uploaded documents for Article 9 requirements. Three states only — Supported,
          Partial, NO_ANSWER. No LLM in the resolver path. The public Demo AI sample result is
          sealed and publicly verifiable; user-uploaded preview documents are processed
          temporarily and are not sealed in this version.
        </p>

        <p>
          I am writing this to make a rare implementation visible — and to invite scrutiny from
          the people who will eventually audit work like this.
        </p>
      </Section>

      {/* ─── §2 — The primitive ───────────────────────────────────────── */}
      <Section num="2" title="The primitive" shade>
        <p>
          The primitive has five components — three shared by every application (a
          human-governed approval layer, EVE Bridge, and public verification), and two pipeline
          elements applied per use case (AI in witness mode and a deterministic resolver). The
          discipline is to compose them explicitly, and to be honest about which components run
          in which application.
        </p>

        <p>
          <B>Human-governed approval layer (internally: Trinity).</B> Trinity is the system of
          record for governance decisions. Every artifact that is part of a sealed proof
          package, every approved derived knowledge entry, and every governed configuration
          change passes through it before sealing. Each approval records, as a single signed
          event: the approver&apos;s identity, a decision ID (e.g.{' '}
          <Code>EVE-2026-002475</Code>, <Code>EVE-2026-002486</Code>), the SHA-256 of the
          content approved, a timestamp, a vault proof, and a status — <Code>APPROVED</Code>,{' '}
          <Code>APPROVED_WITH_NOTE</Code>, or <Code>REVOKED</Code>. For the ComplieDocs
          project, Trinity enforces a T3 trust tier: forced human sign-off, override disabled.
          There is no AI-write path into Trinity. Audit history is append-only — revoked and
          superseded entries are preserved, never deleted.
        </p>

        <p>
          <B>AI in witness mode.</B> Where AI is used, it is constrained. Claude and Qwen can
          read approved sources, summarise, and render structured data into prose. They cannot
          write to Trinity. They cannot make decisions. Their output passes a{' '}
          <Code>contains_blocked_phrase()</Code> filter before it reaches a human reviewer —
          advisory and synthesising phrases are rejected: <Em>&quot;you should&quot;</Em>,{' '}
          <Em>&quot;we recommend&quot;</Em>, <Em>&quot;must implement&quot;</Em>,{' '}
          <Em>&quot;is compliant&quot;</Em>, <Em>&quot;is sufficient&quot;</Em>. The filter
          prevents advisory language; it does not, on its own, prevent factual fabrication. The
          system is designed to fail closed — if the LLM is unavailable, a deterministic
          template renders the same output structure from the same data. The system functions
          without AI. AI accelerates without taking responsibility.
        </p>

        <p>
          <B>Deterministic resolver.</B> When evidence matching against an approved requirement
          set is required, a deterministic resolver runs — no LLM, no randomness, identical
          output across runs given identical inputs. The resolver returns three states only:{' '}
          <Code>Supported</Code>, <Code>Partial</Code>, or <Code>NO_ANSWER</Code>. It is used
          in Application 2 (GRC Witness); Application 1 does not use it, because the artifacts
          there are voluntary compliance documents drafted in advance, not evidence-matched
          against an external corpus.
        </p>

        <p>
          <B>EVE Bridge — cryptographic witness sealing.</B> Once an artifact is approved in
          Trinity, or a resolver run is ready to be sealed, a sealing call is made to the EVE
          Bridge API. Bridge computes a SHA-256 of the payload, assigns a sequential identifier
          (<Code>EVE-COMPLIEDOCS-00001119</Code>, <Code>00001120</Code>, and so on), and writes
          a new entry to the chain. Each seal&apos;s <Code>chain_seal</Code> field is a hash
          that anchors to the previous entry. Retrospective modification of any sealed record
          would break the chain on the next verification. The chain is currently at integrity
          version v1.1.0.
        </p>

        <p>
          <B>Public verification.</B> Every sealed record marked as public is retrievable from{' '}
          <Code>https://api.eveverified.com/eve/verify/{'{eve_id}'}</Code> (JSON, read-only, no
          authentication) or rendered as HTML at{' '}
          <Code>https://verify.eveverified.com/?id={'{eve_id}'}</Code>. The response includes
          the full sealed payload, the SHA-256 seal, the chain seal, and a{' '}
          <Code>valid: true</Code> flag. Anyone can verify any public sealed record without
          access to our internal systems. This is the trust surface external parties rely on:
          they verify directly, not through us.
        </p>

        <p>
          <B>How the components compose.</B> EVE-AIACT-PROOF-V1 (Application 1, complete) uses
          Trinity + AI in witness mode + Bridge + public verification across nineteen sealed
          entries. EVE GRC Witness (Application 2, private preview) uses Trinity + the
          deterministic resolver + Bridge + public verification for the Demo AI sample result;
          user-uploaded preview documents are processed temporarily and are not sealed in this
          version. The next two sections describe each application in turn.
        </p>
      </Section>

      {/* ─── §3 — Application 1 ───────────────────────────────────────── */}
      <Section num="3" title="Application 1: EVE-AIACT-PROOF-V1">
        <p>
          ComplieDocs is voluntarily declared not high-risk under Article 6(3) of the AI Act:
          it has no trained model, no training datasets, no automated decision-making, and
          architectural controls prevent the residual-risk vectors that would otherwise
          classify it. The declaration is itself documented, sealed, and publicly verifiable.
        </p>

        <p>
          A system that is not high-risk has no mandatory Article 11 technical documentation,
          no mandatory Article 47 declaration of conformity, no mandatory Article 9 risk
          management system. We produced all of these voluntarily, as due diligence. The point:
          if we cannot build verifiable AI Act-grade documentation for our own low-risk system,
          we cannot credibly claim to do it for anyone else&apos;s.
        </p>

        <p>
          The result is EVE-AIACT-PROOF-V1: nineteen sealed Bridge entries, six AI Act articles
          documented to high-risk equivalent standard.
        </p>

        <p>
          <B>Three sealed records per article.</B> Each article is anchored by three distinct
          sealed records, each citing the others by EVE-ID:
        </p>

        <ul className="space-y-3 pl-0 list-none">
          <li className="flex gap-3">
            <span className="text-eve-green/60 shrink-0 mt-2">·</span>
            <span>
              <B>Regulatory representation.</B> The verbatim text of the EU AI Act article is
              fetched from EUR-Lex (CELEX <Code>32024R1689</Code>), hashed with SHA-256, and
              sealed. This is the ground-truth anchor: the source the rest of the proof refers
              to. Sealed once, on 27 January 2026.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-eve-green/60 shrink-0 mt-2">·</span>
            <span>
              <B>Authenticity proof.</B> A secondary attestation that confirms the regulatory
              representation seal was produced through the approved corpus-ingestion path, not
              back-channelled or substituted. Sealed during the proof project&apos;s Phase 3.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-eve-green/60 shrink-0 mt-2">·</span>
            <span>
              <B>Voluntary compliance document.</B> The actual ComplieDocs documentation for
              that article — risk management text, technical documentation, classification
              analysis, declaration of conformity. Each compliance document carries a{' '}
              <Code>cited_articles</Code> field that lists all six articles by both their
              regulatory representation and authenticity proof EVE-IDs. Tampering with any
              sealed record would invalidate the cross-reference graph on next verification.
            </span>
          </li>
        </ul>

        <p>
          <B>The six articles:</B>
        </p>

        {/* Article table */}
        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-xs md:text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-medium text-gray-500 tracking-wide">
                  Article
                </th>
                <th className="text-left py-3 pr-4 font-medium text-gray-500 tracking-wide">
                  Topic
                </th>
                <th className="text-left py-3 pr-4 font-medium text-gray-500 tracking-wide font-mono">
                  Source
                </th>
                <th className="text-left py-3 pr-4 font-medium text-gray-500 tracking-wide font-mono">
                  Auth proof
                </th>
                <th className="text-left py-3 pr-4 font-medium text-gray-500 tracking-wide font-mono">
                  Doc
                </th>
                <th className="text-left py-3 font-medium text-gray-500 tracking-wide">
                  Sealed
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {[
                ['Art 6', 'Classification of high-risk AI', '00000902', '00001021', '00001121', '2026-05-13'],
                ['Art 9', 'Risk management system', '00000903', '00001022', '00001122', '2026-05-15'],
                ['Art 10', 'Data and data governance', '00000904', '00001023', '00001123', '2026-05-15'],
                ['Art 11', 'Technical documentation', '00000905', '00001024', '00001119', '2026-05-07'],
                ['Art 14', 'Human oversight', '00000906', '00001025', '00001124', '2026-05-15'],
                ['Art 47', 'EU declaration of conformity', '00000907', '00001026', '00001120', '2026-05-13'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 text-white whitespace-nowrap">{row[0]}</td>
                  <td className="py-3 pr-4">{row[1]}</td>
                  <td className="py-3 pr-4 font-mono text-eve-green/80 whitespace-nowrap">
                    -{row[2]}
                  </td>
                  <td className="py-3 pr-4 font-mono text-eve-green/80 whitespace-nowrap">
                    -{row[3]}
                  </td>
                  <td className="py-3 pr-4 font-mono text-eve-green/80 whitespace-nowrap">
                    -{row[4]}
                  </td>
                  <td className="py-3 whitespace-nowrap text-gray-500">{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-600 mt-3 italic">
            All EVE-IDs prefixed <Code>EVE-COMPLIEDOCS-</Code>. Regulatory representation seals
            all date to 27 January 2026; authenticity proof seals are contemporaneous Phase 3
            attestations.
          </p>
        </div>

        <p>
          <B>The master manifest.</B> All eighteen layer entries above are bound together by a
          final sealed record — <Code>EVE-COMPLIEDOCS-00001125</Code> — that lists every
          constituent EVE-ID, the SHA-256 of every compliance document on disk, and the chain
          seal hash that anchors the manifest into the chain at the moment of sealing. The
          manifest is the single canonical handle for the proof package; a verifier who wants
          one entry point starts there.
        </p>

        <p>
          <B>Public verification.</B> The proof is published at{' '}
          <CodeLink href="https://verify.eveverified.com/aiact-proof.html">
            https://verify.eveverified.com/aiact-proof.html
          </CodeLink>
          . The page lists all nineteen entries with direct links to the verification API for
          each. No login. No credentials. Any reader can pull the JSON for each public entry,
          inspect the sealed payload, verify the recorded SHA-256 seals, and follow the chain
          integrity fields exposed by EVE Verify. This is what verifiable should mean.
        </p>
      </Section>

      {/* ─── §4 — Application 2 ───────────────────────────────────────── */}
      <Section num="4" title="Application 2: EVE GRC Witness" shade>
        <p>
          The first application demonstrated the primitive on our own documentation. The second
          applies the same primitive to a different problem: given an arbitrary corpus of
          customer documents and an approved regulatory requirement set, what evidence is
          actually present, what is partial, and what is missing?
        </p>

        <p>
          EVE GRC Witness is the private preview of this pilot, live at{' '}
          <CodeLink href="https://grc.eveverified.com">https://grc.eveverified.com</CodeLink>.
          Scope is deliberately narrow: Article 9 only, English documents supported best
          (Swedish terminology support is being expanded), no other regulations.
        </p>

        <p>
          <B>The flow.</B> Three approved anchors exist before any customer uploads anything:
        </p>

        <ul className="space-y-3 pl-0 list-none">
          <li className="flex gap-3">
            <span className="text-eve-green/60 shrink-0 mt-2">·</span>
            <span>
              The Article 9 regulatory text, sealed at{' '}
              <Code>EVE-COMPLIEDOCS-00000903</Code> (the same regulatory representation cited
              in §3).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-eve-green/60 shrink-0 mt-2">·</span>
            <span>
              A mapping of Article 9 into 18 individual requirements, with required evidence
              types and matching terms per requirement. This mapping was human-authored and
              Trinity-approved under decision ID <Code>EVE-2026-002486</Code>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-eve-green/60 shrink-0 mt-2">·</span>
            <span>
              A terminology asset — Evidence Lexicon v2.1 — that defines the concepts, terms,
              and synonyms (English + Swedish) that count as evidence for each requirement,
              including normalisation rules for Swedish compound words.
            </span>
          </li>
        </ul>

        <p>
          When a user uploads a document (PDF, DOCX, or TXT, processed server-side in a
          temporary preview session; retention is limited for the preview and no user-uploaded
          documents are sealed), the system runs the deterministic resolver from §2: no LLM,
          no randomness, identical output across runs given identical inputs. The result is a
          per-requirement determination using three values only: <Code>Supported</Code>,{' '}
          <Code>Partial</Code>, or <Code>NO_ANSWER</Code>. There is no confidence score, no
          probability, no guess. When evidence is insufficient, the system says so as a
          first-class output value.
        </p>

        <p>
          <B>The Demo AI sample.</B> A public sample result is sealed and publicly verifiable:{' '}
          <Code>EVE-COMPLIEDOCS-00001129</Code>. It is the resolver&apos;s output against a
          deliberately incomplete fictional corpus (marked <Code>_FICTIONAL_DEMO_ONLY</Code> on
          every file) for a synthetic organisation called Demo AI. The result:
        </p>

        {/* Demo result stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 not-prose">
          {[
            { label: 'Supported', value: '7', color: 'text-eve-green' },
            { label: 'Partial', value: '5', color: 'text-eve-orange' },
            { label: 'NO_ANSWER', value: '4', color: 'text-red-400' },
            { label: 'Optional', value: '2', color: 'text-gray-400' },
          ].map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center"
            >
              <div className={`text-3xl font-extralight ${s.color} mb-1`}>{s.value}</div>
              <div className="text-[10px] tracking-[0.15em] text-gray-500 uppercase font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="not-prose pt-2">
          <div className="text-center text-sm text-gray-500">
            Overall evidence coverage:{' '}
            <span className="text-eve-green font-mono text-base">66.7%</span>
          </div>
        </div>

        <p>
          The gaps are deliberate. The Demo AI corpus does not document post-market monitoring,
          does not describe deployer obligations, does not assess vulnerable-group risk, and
          does not specify a lifecycle review frequency. These all map directly to specific
          Article 9 sub-paragraphs and surface as <Code>NO_ANSWER</Code> in the output. The
          point of the demo is to make the missing evidence as visible and as attributable as
          the present evidence.
        </p>

        <p>
          <B>What is not yet sealed.</B> User-uploaded documents in the private preview are
          processed temporarily and are not sealed. Sealing a per-customer result requires
          Trinity approval of the resolver run, which is currently retained for the Demo AI
          sample only. Production sealing of customer results would compose Application 1&apos;s
          three-record pattern and is on the path for a later phase.
        </p>

        <p>
          <B>NO_ANSWER as a first-class result.</B> Most compliance tooling treats missing
          evidence as something to hide or interpolate. EVE GRC Witness treats it as a
          deliverable. When you receive 4 <Code>NO_ANSWER</Code> rows alongside 7{' '}
          <Code>Supported</Code> and 5 <Code>Partial</Code>, you know exactly which Article 9
          sub-paragraphs your existing documentation does not address. That visibility — not a
          percentage — is the point.
        </p>
      </Section>

      {/* ─── §5 — The hard parts ──────────────────────────────────────── */}
      <Section num="5" title="The hard parts">
        <p>
          The architecture was the easier part. The harder part was forcing the system to say
          exactly what it knows — and no more.
        </p>

        <p>
          <B>Not overclaiming compliance.</B> A sealed document is not a compliant document.
          Evidence coverage is not a compliance status. A public verification link proves that
          a specific artifact existed, with a specific hash, at a specific time. It does not
          prove that a regulator, auditor, notified body, or court would accept the underlying
          content as sufficient. That distinction matters. We removed language that sounded
          like &quot;compliant&quot;, &quot;certified&quot;, or &quot;audited&quot; unless the
          system could actually support that claim. The wording we settled on is{' '}
          <Em>documentation state</Em>, not <Em>compliance state</Em>. The GRC Witness demo
          says this directly: &quot;Evidence coverage does not equal compliance status.&quot;
        </p>

        <p>
          <B>Separating voluntary documentation from legal classification.</B> ComplieDocs is
          voluntarily declared not high-risk under Article 6(3). We still produced Article 11
          technical documentation, Article 9 risk management documentation, and an Article 47
          declaration of conformity as voluntary due diligence. That does not turn ComplieDocs
          into a high-risk system, and it does not create a legal certification. The documents
          are AI Act-grade documentation artifacts, not a claim that a legal threshold has been
          met. Each sealed compliance document carries <Code>classification: voluntary</Code>{' '}
          and states what it does not assert: not a CE marking, not a notified-body assessment,
          not a binding regulatory determination. Keeping that line clear is part of the system
          design, not a footnote.
        </p>

        <p>
          <B>Keeping AI in witness mode.</B> Where AI is used, it cannot become the authority.
          Claude and Qwen do not write to the approval layer. They do not approve artifacts.
          They do not decide that a requirement is satisfied. Their role is to help render,
          summarise, or explain already-governed data. Their output passes a blocklist filter
          that rejects advisory and compliance-claiming language such as &quot;you
          should&quot;, &quot;we recommend&quot;, &quot;must implement&quot;, &quot;is
          compliant&quot;, and &quot;is sufficient&quot;. That filter is useful, but it is not
          a truth engine. It does not, by itself, prevent factual mistakes. The defence is
          architectural: AI has no write path into the system of record, deterministic fallback
          exists, and a human reviewer must approve content before anything is sealed. AI can
          assist the witness layer. It cannot own the decision.
        </p>

        <p>
          <B>Avoiding fake green results.</B> The most dangerous failure mode in compliance
          tooling is a false positive: marking something as <Code>Supported</Code> when the
          evidence does not actually support it. That creates false assurance, which is worse
          than a visible gap. For GRC Witness, we encoded a simple rule: no{' '}
          <Code>Supported</Code> from headings alone. A heading can show that a document is
          relevant, but it cannot prove that the required evidence exists. The resolver should
          show the matched terms, the source document, and the missing evidence so a reviewer
          can see why the result was produced. This makes the system stricter. More rows become{' '}
          <Code>Partial</Code> or <Code>NO_ANSWER</Code>. That is intentional.
        </p>

        <p>
          <B>False positives and false negatives in evidence matching.</B> Deterministic
          matching is not the same as correct matching. A deterministic resolver can still miss
          evidence if the vocabulary is too narrow. We saw that directly with Swedish text. The
          first Swedish test returned 0% coverage because the lexicon expected English
          terminology. The evidence was not necessarily absent; the resolver simply could not
          see it. After adding Swedish terms such as <Em>funktionsregression</Em>,{' '}
          <Em>testfall</Em>, and <Em>prestandatestning</Em>, the same test moved to 75% on the
          checked items. That was an important product lesson. The lexicon is part of the
          control surface. If it is too narrow, real evidence is missed. If it is too broad,
          weak evidence becomes green. It has to be governed like the rest of the system.
        </p>

        <p>
          <B>The hardest part is discipline.</B> It is tempting to make the output look better:
          fewer <Code>NO_ANSWER</Code> rows, more green badges, broader matching, more
          confident prose. But that would defeat the purpose. EVE is not trying to make
          documentation look complete. It is trying to show what can be supported, what is
          partial, what is missing, and what has actually been approved and sealed. The value
          is not that the system always produces a reassuring answer. The value is that it can
          refuse to.
        </p>
      </Section>

      {/* ─── §6 — What is open ────────────────────────────────────────── */}
      <Section num="6" title="What is open" shade>
        <p>
          The system described in §3 and §4 is not finished. The work below is named, scoped,
          or running, but not yet sealed in the same way the existing applications are.
        </p>

        <p>
          <B>Evidence Builder.</B> Today, GRC Witness asks:{' '}
          <Em>
            here is your corpus — what evidence is present, what is partial, what is missing?
          </Em>{' '}
          The next pipeline step inverts the question:{' '}
          <Em>
            here is your organisation and your AI system — what evidence and documentation
            sections are required, and what can the system propose as a draft?
          </Em>{' '}
          AI assistance is allowed at this layer, but in the same witness mode described in §2:
          every proposed paragraph is tagged as provided-by-user, inferred-from-context, or
          missing — and inferred or missing items are flagged for human decision before
          anything is sealed. The point is to compress the time from{' '}
          <Em>&quot;I have a system&quot;</Em> to{' '}
          <Em>&quot;I have a defensible documentation draft&quot;</Em>, without ever crossing
          into compliance-claim territory.
        </p>

        <p>
          <B>Lexicons and languages.</B> Evidence Lexicon v2.1 supports English and Swedish;
          the Swedish work taught us that lexicon coverage is not a one-time task. Other Nordic
          languages, German, French, and the controlled vocabularies that each AI Act language
          version uses are all open. Lexicon expansion is the highest-leverage, lowest-glamour
          work in the system.
        </p>

        <p>
          <B>More AI Act articles.</B> Six articles are voluntarily sealed; the rest of the
          high-risk obligations (Articles 8, 12, 13, 15, 16, 26, 49, and the relevant Annexes)
          are not yet covered. We expect to expand article coverage in line with what design
          partners actually need, not in numerical order.
        </p>

        <p>
          <B>Customer workspaces.</B> Today GRC Witness has a single shared preview surface. A
          per-customer workspace — separate session namespace, separate approval scope,
          optional separate governed approval instance — is a natural step before any
          production rollout. The architectural primitives are in place; the multi-tenancy is
          not yet built.
        </p>

        <p>
          <B>Session retention.</B> User-uploaded preview documents in GRC Witness are
          processed in temporary sessions. Session cleanup runs at server startup but not
          periodically; a long-running instance accumulates sessions until restart. Cleanup at
          request-time or via a scheduled task is a concrete, named open item — small in code,
          important for the retention claim to hold tightly.
        </p>

        <p>
          <B>Optional air-gapped mode.</B> For organisations that will not upload documents to
          a hosted service at all, a local-only or air-gapped resolver — same code, same
          approved sources, no outbound Bridge call during local operation — is a credible
          option. Sealing in that mode would happen against a local chain, with optional public
          anchoring later.
        </p>

        <p>
          <B>Design partners.</B> We are accepting one to two design partners for the Evidence
          Builder phase — EU companies with active AI Act compliance work, ideally in
          manufacturing, healthcare, or financial services — to shape it against real use cases
          rather than guesses. Contact:{' '}
          <a
            href="mailto:joakim@organiq.se"
            className="text-eve-green/90 hover:text-eve-green underline underline-offset-4 decoration-eve-green/30 hover:decoration-eve-green/60 transition-colors"
          >
            joakim@organiq.se
          </a>
          .
        </p>
      </Section>

      {/* ─── §7 — Origin ──────────────────────────────────────────────── */}
      <Section num="7" title="Origin: this started somewhere else">
        <p>
          EVE was not originally built as a compliance product. It was built as a trust layer
          for systems where guessing is unacceptable.
        </p>

        <p>
          The first problem was local energy sharing. A local energy network that lets
          households share solar production, battery capacity and charging infrastructure needs
          to prove what happened: which meter produced which reading, which rule was applied,
          which balance changed, and what evidence was missing if a settlement is disputed.
        </p>

        <p>
          In that context, a system that guesses is not useful. If settlement, money or
          responsibility depends on the result, the system has to show its source, its rule and
          its evidence — or say that it cannot answer.
        </p>

        <p>
          That problem led to the same primitives described in this post: approved sources,
          governed decisions, deterministic resolution, missing-evidence states, and public
          verification.
        </p>

        <p>
          The domains are different, but the control problem is similar. In energy sharing, the
          question is whether a kilowatt-hour, meter reading or settlement event can be
          trusted. In GRC, the question is whether a requirement, document claim or evidence
          path can be trusted.
        </p>

        <p>
          My background is not traditional compliance consulting. It is building verifiable
          systems where measurement, settlement, evidence and responsibility have to survive
          scrutiny.
        </p>

        <p>
          This post describes what happened when a trust primitive originally shaped by
          measurement and settlement was pointed at regulation.
        </p>
      </Section>

      {/* ─── §8 — Verify it yourself ──────────────────────────────────── */}
      <Section num="8" title="Verify it yourself" shade>
        <p>Everything described above can be checked without contacting us.</p>

        <div className="not-prose space-y-4">
          {/* Manifest page */}
          <div className="p-5 rounded-lg bg-black/40 border border-white/10">
            <div className="text-xs tracking-[0.15em] text-gray-500 uppercase mb-2">
              Full EVE-AIACT-PROOF-V1 manifest
            </div>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              All nineteen sealed entries with their relationships, hashes, and verification
              links.
            </p>
            <a
              href="https://verify.eveverified.com/aiact-proof.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-xs md:text-sm text-eve-green hover:text-eve-green/80 underline underline-offset-4 decoration-eve-green/30 hover:decoration-eve-green/60 transition-colors break-all"
            >
              https://verify.eveverified.com/aiact-proof.html
            </a>
          </div>

          {/* Per-seal verify */}
          <div className="p-5 rounded-lg bg-black/40 border border-white/10">
            <div className="text-xs tracking-[0.15em] text-gray-500 uppercase mb-2">
              Any individual seal — public verify API
            </div>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              Retrieve any sealed record by its EVE-ID. JSON, read-only, no authentication.
            </p>
            <div className="font-mono text-xs md:text-sm text-eve-green/70 mb-3 break-all">
              https://api.eveverified.com/eve/verify/{'{eve_id}'}
            </div>
            <div className="text-xs text-gray-500 mb-2">Example — master manifest:</div>
            <a
              href="https://api.eveverified.com/eve/verify/EVE-COMPLIEDOCS-00001125"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-xs md:text-sm text-eve-green hover:text-eve-green/80 underline underline-offset-4 decoration-eve-green/30 hover:decoration-eve-green/60 transition-colors break-all"
            >
              https://api.eveverified.com/eve/verify/EVE-COMPLIEDOCS-00001125
            </a>
          </div>

          {/* GRC Witness */}
          <div className="p-5 rounded-lg bg-black/40 border border-white/10">
            <div className="text-xs tracking-[0.15em] text-gray-500 uppercase mb-2">
              GRC Witness private preview
            </div>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              The Demo AI sample result is sealed at{' '}
              <Code>EVE-COMPLIEDOCS-00001129</Code> and can be verified independently.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://grc.eveverified.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs md:text-sm text-eve-green hover:text-eve-green/80 underline underline-offset-4 decoration-eve-green/30 hover:decoration-eve-green/60 transition-colors break-all"
              >
                https://grc.eveverified.com
              </a>
              <span className="text-gray-700">·</span>
              <a
                href="https://verify.eveverified.com/?id=EVE-COMPLIEDOCS-00001129"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs md:text-sm text-eve-green hover:text-eve-green/80 underline underline-offset-4 decoration-eve-green/30 hover:decoration-eve-green/60 transition-colors break-all"
              >
                verify/?id=EVE-COMPLIEDOCS-00001129
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 mt-12">
          <p className="text-gray-400 leading-relaxed">
            If you find inconsistencies, gaps, or claims that do not hold up to scrutiny, we
            want to hear about them. Contact:{' '}
            <a
              href="mailto:joakim@organiq.se"
              className="text-eve-green/90 hover:text-eve-green underline underline-offset-4 decoration-eve-green/30 hover:decoration-eve-green/60 transition-colors"
            >
              joakim@organiq.se
            </a>
            .
          </p>
        </div>

        {/* Related insight */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">Related</div>
          <a
            href="/insights/accountability-continuity-checkpoint"
            className="block p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-2 mb-2">
                  {['AI Governance', 'EVE Signals', 'Design validation'].map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                  Accountability-Continuity Checkpoint for Chained AI Workflows
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  Reviewer-informed design validation. EVE surfaces the signal; humans decide.
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors ml-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </Section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <Footer />
    </main>
  )
}
