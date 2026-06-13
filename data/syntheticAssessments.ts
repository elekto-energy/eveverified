// ═══════════════════════════════════════════════════════════════════════════
// Synthetic assessment demo data — GENERATED FROM REAL OUTPUT, DO NOT HAND-EDIT
//
// Source: eve-verified-grc/samples/synthetic_starter/live_run/ (2026-06-13)
// Production run on grc.eveverified.com. Vendors are 100% fictitious
// ("EVE Synthetic Vendor A/B" — names that cannot exist as real companies).
// Every value below (verdicts, coverage, hashes, seal IDs, excerpts) is real
// machine output from the sealed assessments assess_9757896f (A) and
// assess_a053ccca (B), verified 16/16 content hashes against an independent
// local resolver run.
//
// IMPORTANT: this run was made AFTER Trinity rule approval (2026-06-13). All four
// source rules now read rule_provenance = VERIFIED (decisions EVE-2026-000002 /
// 000010 / 000011 / 000012). The assessment therefore runs against APPROVED
// source rules. Resolver authority remains blocked_pending_sme (SME gate, ADR-004).
//
// If the demo vendors are ever re-run, regenerate this file from the new
// live_run artefacts — never edit values by hand.
// ═══════════════════════════════════════════════════════════════════════════

export interface DemoDocument {
  file: string
  sha16: string
  chars: number
}

export interface DemoFinding {
  ruleId: string
  title: string
  version: string
  result: 'Supported' | 'Partial' | 'NO_ANSWER'
  coverage: string
  strength: string | null
  epCounts: string // strong/supporting/missing
  findingSeal: string
  contentHash: string
  provenance: 'VERIFIED' | 'NO_ANSWER'
  decisionId: string
  note: string | null
  excerpt?: { term: string; text: string; doc: string } // verbatim from matched_excerpts
}

export interface DemoVendor {
  id: 'A' | 'B'
  name: string
  tagline: string
  profileId: string
  assessmentId: string
  manifestSeal: string
  verifyUrl: string
  workpaperUrl: string
  summary: string
  documents: DemoDocument[]
  findings: DemoFinding[]
}

export const DEMO_VENDORS: DemoVendor[] = [
  {
    id: 'A',
    name: 'EVE Synthetic Vendor A',
    tagline: 'Strong evidence package (fictitious)',
    profileId: 'tprm_vendor_eve_synthetic_vendor_a_synthetic_demo_service_a',
    assessmentId: 'assess_9757896f',
    manifestSeal: 'EVE-TPRM-00004556',
    verifyUrl: 'https://verify.eveverified.com/?id=EVE-TPRM-00004556',
    workpaperUrl: '/demo/EVE_TPRM_Workpaper_SyntheticVendorA.xlsx',
    summary: '4/4 SUPPORTED',
    documents: [
      { file: 'sva_change_management_policy.txt', sha16: 'ebb5a0f1bb17ffe6', chars: 1639 },
      { file: 'sva_information_security_policy.txt', sha16: 'f5db23a86c878eb0', chars: 1924 },
      { file: 'sva_vendor_risk_policy.txt', sha16: '1b21ef7822ca0700', chars: 1228 },
    ],
    findings: [
      {
        ruleId: 'TPRM_ACCESS_001',
        title: 'Privileged Access Control / MFA',
        version: '1.1.2',
        result: 'Supported',
        coverage: '100',
        strength: null,
        epCounts: '3/0/0',
        findingSeal: 'EVE-TPRM-00004552',
        contentHash: '0ec5f3f46e1729d00294e62909f0a3380e3a32616bb875af61d80ccd8e47046b',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000002',
        note: null,
        excerpt: {
          term: 'privileged access is restricted',
          text: 'Privileged access is restricted to named roles within the Platform Engineering and Site Reliability teams.',
          doc: 'sva_information_security_policy.txt',
        },
      },
      {
        ruleId: 'TPRM_CHANGE_001',
        title: 'Change Management Authorization & Testing',
        version: '1.1.2',
        result: 'Supported',
        coverage: '100',
        strength: null,
        epCounts: '5/0/0',
        findingSeal: 'EVE-TPRM-00004553',
        contentHash: 'e4f6b502b21cb13714076c11c245b1a4612d323ac774382188174969b9f08af9',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000010',
        note: null,
        excerpt: {
          term: 'all changes require prior approval',
          text: 'All changes require prior approval. No change is implemented without approval from an authorized reviewer.',
          doc: 'sva_change_management_policy.txt',
        },
      },
      {
        ruleId: 'TPRM_VENDOR_001',
        title: 'Vendor Risk Assessment & Due Diligence',
        version: '1.1.1',
        result: 'Supported',
        coverage: '100',
        strength: null,
        epCounts: '3/0/0',
        findingSeal: 'EVE-TPRM-00004554',
        contentHash: '3fff5df36626fb470f36d8f44f0ec86caea58e66a74528c7b12b76fa4498686d',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000011',
        note: null,
        excerpt: {
          term: 'due diligence is performed before',
          text: 'Due diligence is performed before any new supplier is engaged. Vendors are assessed before onboarding using a tiered risk model.',
          doc: 'sva_vendor_risk_policy.txt',
        },
      },
      {
        ruleId: 'TPRM_INCIDENT_001',
        title: 'Incident Response Evidence',
        version: '1.1.1',
        result: 'Supported',
        coverage: '100',
        strength: null,
        epCounts: '3/0/0',
        findingSeal: 'EVE-TPRM-00004555',
        contentHash: 'ae75930661e55fcd99da618e14224b1fc7a46440d9e3591ea65b679e92ff3890',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000012',
        note: null,
        excerpt: {
          term: 'documented incident response plan',
          text: 'The company maintains a documented incident response plan owned by the Chief Information Security Officer.',
          doc: 'sva_information_security_policy.txt',
        },
      },
    ],
  },
  {
    id: 'B',
    name: 'EVE Synthetic Vendor B',
    tagline: 'Weak / partial evidence package (fictitious)',
    profileId: 'tprm_vendor_eve_synthetic_vendor_b_synthetic_demo_service_b',
    assessmentId: 'assess_a053ccca',
    manifestSeal: 'EVE-TPRM-00004561',
    verifyUrl: 'https://verify.eveverified.com/?id=EVE-TPRM-00004561',
    workpaperUrl: '/demo/EVE_TPRM_Workpaper_SyntheticVendorB.xlsx',
    summary: '2 PARTIAL · 2 NO_ANSWER',
    documents: [
      { file: 'svb_it_security_overview.txt', sha16: '6d5cd4a2518d7262', chars: 773 },
      { file: 'svb_operations_handbook.txt', sha16: '04d58c0af63f8ca4', chars: 945 },
    ],
    findings: [
      {
        ruleId: 'TPRM_ACCESS_001',
        title: 'Privileged Access Control / MFA',
        version: '1.1.2',
        result: 'NO_ANSWER',
        coverage: '—',
        strength: null,
        epCounts: '0/0/3',
        findingSeal: 'EVE-TPRM-00004557',
        contentHash: '833a5d65edd6bf6f1865b4f380506829e78408edb568443c46c606e14e6f40a0',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000002',
        note: '6 negated findings: "MFA is available", "MFA enrollment is encouraged", "rollout is planned" — negated mentions are never counted as evidence.',
      },
      {
        ruleId: 'TPRM_CHANGE_001',
        title: 'Change Management Authorization & Testing',
        version: '1.1.2',
        result: 'Partial',
        coverage: '40',
        strength: 'Medium',
        epCounts: '1/1/3',
        findingSeal: 'EVE-TPRM-00004558',
        contentHash: 'ea1a12e4fa448e9115e12ecac3141b3b36cf125f931fb7f8f9eb50bad7d27f39',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000010',
        note: 'Change tracking strong; approval keyword-level only; pre-production testing absent. Combination "authorization AND testing" unsatisfied.',
        excerpt: {
          term: 'all changes are tracked in',
          text: 'All changes are tracked in our internal ticket system.',
          doc: 'svb_operations_handbook.txt',
        },
      },
      {
        ruleId: 'TPRM_VENDOR_001',
        title: 'Vendor Risk Assessment & Due Diligence',
        version: '1.1.1',
        result: 'Partial',
        coverage: '0',
        strength: 'Low',
        epCounts: '1/0/2',
        findingSeal: 'EVE-TPRM-00004559',
        contentHash: 'ddecc61109f0ec571d87caaeefb2d82a6b34ff321c4e3c241a7167b132e2a94f',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000011',
        note: 'A vendor risk process exists, but due diligence is "planned for the 2027 roadmap" — negating language detected, score capped.',
        excerpt: {
          term: 'vendor risk management process',
          text: 'The company maintains a vendor risk management process for key suppliers.',
          doc: 'svb_operations_handbook.txt',
        },
      },
      {
        ruleId: 'TPRM_INCIDENT_001',
        title: 'Incident Response Evidence',
        version: '1.1.1',
        result: 'NO_ANSWER',
        coverage: '—',
        strength: null,
        epCounts: '0/0/3',
        findingSeal: 'EVE-TPRM-00004560',
        contentHash: 'f3a42e152862e36ebbc7c0b86ab03e13612b64b8207af59b7a9ae47ba65fa50d',
        provenance: 'VERIFIED',
        decisionId: 'EVE-2026-000012',
        note: 'No incident-response evidence anywhere in the submitted package. EVE never guesses.',
      },
    ],
  },
]
