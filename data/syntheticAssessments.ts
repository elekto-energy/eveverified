// ═══════════════════════════════════════════════════════════════════════════
// Synthetic assessment demo data — GENERATED FROM REAL OUTPUT, DO NOT HAND-EDIT
//
// Source: eve-verified-grc/samples/synthetic_starter/live_run/ (2026-06-12)
// Production run on grc.eveverified.com. Documents are synthetic; every value
// below (verdicts, coverage, hashes, seal IDs) is real machine output from the
// sealed assessments assess_fd9de68b (A) and assess_a4625a48 (B), verified
// 16/16 content hashes against an independent local resolver run.
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
    name: 'EVE Demo Vendor A — Northwind Cloud Services',
    tagline: 'Strong evidence package',
    profileId: 'tprm_vendor_northwind_cloud_services_ab_managed_cloud_platform',
    assessmentId: 'assess_fd9de68b',
    manifestSeal: 'EVE-TPRM-00004506',
    verifyUrl: 'https://verify.eveverified.com/?id=EVE-TPRM-00004506',
    workpaperUrl: '/demo/EVE_TPRM_Workpaper_Northwind.xlsx',
    summary: '4/4 SUPPORTED',
    documents: [
      { file: 'northwind_change_management_policy.txt', sha16: 'd5e5b651a311b2c1', chars: 1625 },
      { file: 'northwind_information_security_policy.txt', sha16: '522ee70be1165b81', chars: 1906 },
      { file: 'northwind_vendor_risk_policy.txt', sha16: '4fc1cea295f62e82', chars: 1210 },
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
        findingSeal: 'EVE-TPRM-00004502',
        contentHash: 'e1cdd912787805e94b4a2aad971d268a15b4d55313caac4de847685d80bfc6ac',
        note: null,
      },
      {
        ruleId: 'TPRM_CHANGE_001',
        title: 'Change Management Authorization & Testing',
        version: '1.1.2',
        result: 'Supported',
        coverage: '100',
        strength: null,
        epCounts: '5/0/0',
        findingSeal: 'EVE-TPRM-00004503',
        contentHash: '825313967515e8c37559854ccd047189feed7d239726c14904b4af487968baa2',
        note: null,
      },
      {
        ruleId: 'TPRM_VENDOR_001',
        title: 'Vendor Risk Assessment & Due Diligence',
        version: '1.1.1',
        result: 'Supported',
        coverage: '100',
        strength: null,
        epCounts: '3/0/0',
        findingSeal: 'EVE-TPRM-00004504',
        contentHash: '3c1af8f7653a19b70b34d3d93815b0ec0ecf635b27c6066708f1a5503e4efa2c',
        note: null,
      },
      {
        ruleId: 'TPRM_INCIDENT_001',
        title: 'Incident Response Evidence',
        version: '1.1.1',
        result: 'Supported',
        coverage: '100',
        strength: null,
        epCounts: '3/0/0',
        findingSeal: 'EVE-TPRM-00004505',
        contentHash: 'e44fec994de047158ef7de00f5293d933901508f8b6cd1d601cad402fddac20f',
        note: null,
      },
    ],
  },
  {
    id: 'B',
    name: 'EVE Demo Vendor B — Baltic Data Systems',
    tagline: 'Weak / partial evidence package',
    profileId: 'tprm_vendor_baltic_data_systems_ou_data_processing_services',
    assessmentId: 'assess_a4625a48',
    manifestSeal: 'EVE-TPRM-00004511',
    verifyUrl: 'https://verify.eveverified.com/?id=EVE-TPRM-00004511',
    workpaperUrl: '/demo/EVE_TPRM_Workpaper_Baltic.xlsx',
    summary: '2 PARTIAL · 2 NO_ANSWER',
    documents: [
      { file: 'baltic_it_security_overview.txt', sha16: 'ce46fddd3eb52ae4', chars: 753 },
      { file: 'baltic_operations_handbook.txt', sha16: '1bcdc87a024c40ce', chars: 920 },
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
        findingSeal: 'EVE-TPRM-00004507',
        contentHash: 'b28647e07639f24c60284016dfaa5d590f7dad7d63cdcb0aaa9b1fc89e49eef6',
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
        findingSeal: 'EVE-TPRM-00004508',
        contentHash: 'b2d155aaceeaa25696abf3e5ee2c927aed90ea199e2eec8c209ddcaf6439f418',
        note: 'Change tracking strong; approval keyword-level only; pre-production testing absent. Combination "authorization AND testing" unsatisfied.',
      },
      {
        ruleId: 'TPRM_VENDOR_001',
        title: 'Vendor Risk Assessment & Due Diligence',
        version: '1.1.1',
        result: 'Partial',
        coverage: '0',
        strength: 'Low',
        epCounts: '1/0/2',
        findingSeal: 'EVE-TPRM-00004509',
        contentHash: 'ee9c6daacdf276a014e63f3b08341797f315651ecea4232d258bc26ef5e0c590',
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
        findingSeal: 'EVE-TPRM-00004510',
        contentHash: '3d7d68fa9fcc8769867f1d9d3d3526917608a0bef07879e0d7d3c6affb8150ce',
        note: 'No incident-response evidence anywhere in the submitted package. EVE never guesses.',
      },
    ],
  },
]
