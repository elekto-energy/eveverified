# EVE Verified TPRM — Evidence Coverage v1

**Design Partner Scope**

---

## Purpose

EVE Verified TPRM is a focused evidence coverage workflow for third-party risk management. It helps a consultant evaluate uploaded vendor or client evidence against approved evidence rules and produce structured workpapers and auditor-facing reports.

The system does not provide legal advice, audit certification, or a compliance score. It provides deterministic evidence coverage: **Supported / Partial / NO_ANSWER**.

The key principle:

> EVE does not learn from client documents.
> EVE evaluates client documents against approved evidence rules.

Client evidence is hashed, parsed, classified, matched and reported — but never added to the EVE knowledge tree and never used for training.

---

## Initial Design Partner Lane

**Primary use case:** TPRM evidence review for vendor or client assessments.

**Initial framework direction:** SOC 2 and NIST 800-53, starting with a TPRM-critical control subset — not the entire framework.

**Initial focus areas:**

- Access control
- MFA / authentication
- Privileged access
- User provisioning and deprovisioning
- Vendor management
- Supply chain risk
- Incident response
- Vulnerability management
- Penetration testing
- Logging and monitoring
- Backup / recovery
- Business continuity
- Encryption
- Data retention / deletion

v1 starts with a limited, practical subset. Michael validates which controls belong in the first 10–20 rules based on real consulting practice.

**SOC 2 licensing note:** AICPA's Trust Services Criteria are licensed material. EVE references TSC controls by identifier (e.g. CC6.1) and builds evidence expectations around them, without reproducing the full criterion text. Customers using SOC 2 coverage should hold appropriate AICPA licensing.

---

## Deployment Modes

EVE Verified TPRM supports three deployment modes, chosen per engagement based on evidence sensitivity.

**Hosted** — for demos, low-sensitivity testing and fast onboarding.

**Local / offline** — for sensitive TPRM work where evidence must remain inside the consultant or client environment. Documents stay local. Resolver runs local. Reports are generated locally with optional local sealing.

**Hybrid** — for engagements that need proof without exposing evidence. Documents stay local, but hashes, manifests or report proof are exported to a public verification endpoint. Auditors can confirm authenticity without seeing the underlying evidence.

This is especially important for TPRM: the product should reduce vendor risk, not become a new vendor data risk.

---

## v1 Workflow

1. Create a client or vendor workspace
2. Upload policies, questionnaires, reports, contracts or evidence files
3. Hash each file (SHA-256, before any extraction)
4. Extract text from each document
5. Classify document type (heuristic, with manual override)
6. Match evidence against approved evidence rules
7. Produce Supported / Partial / NO_ANSWER findings per control
8. Export Excel workpaper
9. Export PDF report
10. Optionally seal report locally or publicly

---

## v1 Outputs

### Excel workpaper (internal consulting use)

Per-control rows with columns for: framework, control ID, control title, evidence expected, result (Supported / Partial / NO_ANSWER), matched file, matched excerpt, missing detail, negative finding, and a reviewer notes column for the consultant.

### PDF report (auditor or client-facing)

Sections for: scope and methodology, evidence inventory summary, framework/control coverage, per-control findings with matched excerpts, NO_ANSWER gaps, rule versions used, and optional seal / verification reference.

---

## Evidence Handling

Each uploaded document gets an inventory record: document hash, filename, file size, upload time, format, extraction status and confidence, classification and confidence, matched rules, and version chain.

Customer documents are never approved as EVE knowledge. They are evaluated against pre-approved rules and then reported on. The technical details of evidence handling, inventory schema, and audit trail requirements are locked in `ARCH_RUNTIME_EVIDENCE_HANDLING_v1.md`.

---

## Evidence Rule Model

Each evidence rule defines: what control it covers, what evidence is expected, which phrases strongly or weakly indicate that evidence, which phrases negate a match, what combinations of evidence are required, and what missing details to flag.

The result logic for each rule:

- **Supported:** All required evidence points found with strong matches and no negative context.
- **Partial:** Some relevant evidence found, but required details are missing or only weak matches exist.
- **NO_ANSWER:** No relevant evidence found.

This avoids the weak pattern of "keyword found = supported." Instead, EVE reports what evidence was found, what is missing, why the result was assigned, and that human review is required.

The full evidence rule schema, term construction discipline, and matching algorithm are locked in `ARCH_EVIDENCE_RULE_v1.md`. The first example instance (`TPRM_ACCESS_001` — Privileged access control with enforced MFA) is available for review.

---

## Design Partner Contribution (Michael)

Michael's role as TPRM SME is central to v1 quality. The design partner contribution consists of:

**1. Validate 10–20 TPRM evidence rules**
Review the strong terms, supporting terms, and negative terms in each rule. Confirm that the evidence expectations match real TPRM consulting practice. Flag false positives (rule fires when it should not) and false negatives (rule misses what a consultant would catch).

**2. Provide representative evidence documents for calibration**
5+ documents per control area for calibration testing. Anonymized or synthetic documents are fine. The purpose is to test whether the rules produce correct Supported / Partial / NO_ANSWER results against real-world evidence.

**3. Monthly written feedback**
Structured feedback on workflow, outputs, gaps, and rule accuracy. This can be async — written notes, annotated reports, or brief summaries.

**4. SME validation signature**
Each evidence rule carries a two-signature model: one technical (Trinity/Joakim) and one substantive (SME/Michael). Michael's validation is recorded in the rule metadata, making the TPRM expertise cryptographically traceable in every rule and every report that uses it.

---

## Delivery Sequence

**Phase 1 — Foundation**
First 10 evidence rules covering the TPRM-critical control subset. Evidence Inventory. Document hash and extraction pipeline. Deterministic resolver. Excel and PDF export. Michael validates rules against real evidence sets.

**Phase 2 — Expand and calibrate**
Expand to 20 rules based on Phase 1 feedback. Local/offline mode packaging. Calibration pass per rule (refine terms based on false positives and negatives from real use).

**Phase 3 — Additional frameworks**
Additional framework packs (HIPAA, PCI, DORA, EU AI Act) based on the validated Phase 1–2 pattern. Each pack follows the same evidence rule model.

---

## v1 Success Criteria

v1 is successful if Michael can:

- Review a client or vendor evidence set
- Identify which controls have evidence support
- Identify where evidence is partial
- Identify where EVE returns NO_ANSWER
- Export a useful Excel workpaper
- Export a credible PDF report
- Show a clear audit trail from report back to evidence and rules
- Confirm that no client evidence was used for training or knowledge ingestion

The strongest user reaction would be:

> "This helps me review vendor evidence faster and produce better workpapers without pretending the system is giving a compliance opinion."

---

## Explicit Non-Goals for v1

v1 is not:

- A full GRC platform
- A legal advice tool
- An audit certification tool
- A compliance scoring engine
- A replacement for auditor judgment
- A full SOC 2 or NIST 800-53 implementation
- A SaaS-only upload platform
- An AI chatbot over policies

---

*EVE Verified — Evidence Verification Engine*
*© 2026 Organiq Sweden AB*
