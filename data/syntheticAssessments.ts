// ═══════════════════════════════════════════════════════════════════════════
// Synthetic assessment demo data — GENERATED FROM REAL OUTPUT, DO NOT HAND-EDIT
//
// Source: eve-verified-grc/samples/synthetic_starter/live_run/ (2026-06-13)
// Production run on grc.eveverified.com. Vendors are 100% fictitious
// ("EVE Synthetic Vendor A/B" — names that cannot exist as real companies).
// Every value below (verdicts, coverage, hashes, seal IDs, excerpts) is real
// machine output from the sealed assessments assess_3ef8282a (A) and
// assess_4456b338 (B), verified 16/16 content hashes against an independent
// local resolver run.
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
    assessmentId: 'assess_3ef8282a',
    manifestSeal: 'EVE-TPRM-00004516',
    verifyUrl: 'https://verify.eveverified.com/?id=EVE-TPRM-00004516',
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
        findingSeal: 'EVE-TPRM-00004512',
        contentHash: '0ec5f3f46e1729d00294e62909f0a3380e3a32616bb875af61d80ccd8e47046b',
        note: null,
        excerpt: {
          term: 'privileged accounts are limited to',
          text: 'privileged accounts are limited to personnel with a documented business need.',
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
        findingSeal: 'EVE-TPRM-00004513',
        contentHash: 'f328f63250bb3d70dc9da44fbb5cbacadf964839695f65f70f62e496ce9ab0c3',
        note: null,
        excerpt: {
          term: 'change requests are logged',
          text: 'change requests are logged with a unique identifier. No change without a ticket.',
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
        findingSeal: 'EVE-TPRM-00004514',
        contentHash: 'c268a1b020f3d7b7063144b7d564a3b72cc22d4e287de83025f05cf53cf460de',
        note: null,
        excerpt: {
          term: 'third-party risk management process',
          text: 'The company operates a documented third-party risk management process, supported by a vendor risk management policy approved by executive management.',
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
        findingSeal: 'EVE-TPRM-00004515',
        contentHash: 'b596da0c44c436a41fa395782f9b3871eb4ade1aa7dfb88c46cc8f534c71a117',
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
    assessmentId: 'assess_4456b338',
    manifestSeal: 'EVE-TPRM-00004521',
    verifyUrl: 'https://verify.eveverified.com/?id=EVE-TPRM-00004521',
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
        findingSeal: 'EVE-TPRM-00004517',
        contentHash: '833a5d65edd6bf6f1865b4f380506829e78408edb568443c46c606e14e6f40a0',
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
        findingSeal: 'EVE-TPRM-00004518',
        contentHash: 'bc2703947c833c24d688153f5bca83ef127e7e5a50356e4283fc816fb7cf51bc',
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
        findingSeal: 'EVE-TPRM-00004519',
        contentHash: 'ff9f94be0e4a47343eecdfb37614d84a0095c9dc244865cfecf95477d85d34a2',
        note: 'A vendor risk process exists, but due diligence is "planned for the 2027 roadmap" — negating language detected, score capped.',
      },
      {
        ruleId: 'TPRM_INCIDENT_001',
        title: 'Incident Response Evidence',
        version: '1.1.1',
        result: 'NO_ANSWER',
        coverage: '—',
        strength: null,
        epCounts: '0/0/3',
        findingSeal: 'EVE-TPRM-00004520',
        contentHash: '9a1cbbcaf10aa8c12d39d6ad6f6f3b3215ab94d204ca86164b65ecaf8408d765',
        note: 'No incident-response evidence anywhere in the submitted package. EVE never guesses.',
      },
    ],
  },
]
