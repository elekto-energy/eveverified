import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Synthetic fixtures ──────────────────────────────────────────────────────
// No real hardware, SCADA, or grid control. Demo only.

const CASES = {
  A: {
    case_id: 'CRITICAL_LOAD_RECONNECT_ALLOWED',
    label: 'Critical load reconnect — allowed',
    node: 'BatteryNode-01',
    attestation: 'VALID',
    token: 'VALID',
    snapshot_ttl: 'VALID',
    human_authority: 'CONFIRMED',
    governance_signal: 'NO_GAP',
    secondary_signal: null,
    execution: 'ALLOWED',
    record: 'EVE-CTRL-DEMO-000001',
    verify_status: 'VALID',
    chain: [
      { step: 'Critical action requested',    status: 'ok',   detail: 'BatteryNode-01 requests reconnect' },
      { step: 'EVE Signal evaluated',          status: 'ok',   detail: 'NO_GAP — no governance gap detected' },
      { step: 'Human authority confirmed',     status: 'ok',   detail: 'Named owner confirmed, authority valid' },
      { step: 'Attestation and token checked', status: 'ok',   detail: 'Node attested, token valid, snapshot current' },
      { step: 'Execution decision',            status: 'ok',   detail: 'ALLOWED — all conditions met' },
      { step: 'Record sealed',                 status: 'ok',   detail: 'EVE-CTRL-DEMO-000001' },
    ],
    boundary_note: 'EVE surfaces the signal. A named human owner authorizes. The critical execution layer allows or holds execution. The resulting record is sealed for later verification.',
    is_demo: true,
    detector_version: 'control_chain_v0',
  },
  B: {
    case_id: 'SCADA_LINK_RECONNECT_HELD',
    label: 'SCADA link reconnect — held',
    node: 'SCADA-Link-02',
    attestation: 'VALID',
    token: 'VALID',
    snapshot_ttl: 'EXPIRED',
    human_authority: 'UNCONFIRMED',
    governance_signal: 'ACCOUNTABILITY_CONTINUITY_GAP',
    secondary_signal: 'APPROVAL_SCOPE_MISMATCH',
    execution: 'HELD',
    record: 'EVE-CTRL-DEMO-000002',
    verify_status: 'VALID',
    chain: [
      { step: 'Critical action requested',    status: 'ok',      detail: 'SCADA-Link-02 requests reconnect' },
      { step: 'EVE Signal evaluated',          status: 'warning', detail: 'ACCOUNTABILITY_CONTINUITY_GAP + APPROVAL_SCOPE_MISMATCH detected' },
      { step: 'Human authority confirmed',     status: 'fail',    detail: 'Accountable owner unconfirmed — human review required' },
      { step: 'Attestation and token checked', status: 'warning', detail: 'Node attested, token valid, but snapshot TTL expired' },
      { step: 'Execution decision',            status: 'fail',    detail: 'HELD — governance gaps must be resolved before execution' },
      { step: 'Record sealed',                 status: 'ok',      detail: 'EVE-CTRL-DEMO-000002 — held state recorded' },
    ],
    boundary_note: 'EVE surfaces the signal. A named human owner authorizes. The critical execution layer allows or holds execution. The resulting record is sealed for later verification.',
    is_demo: true,
    detector_version: 'control_chain_v0',
  },
} as const

type CaseKey = keyof typeof CASES

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const caseParam = (searchParams.get('case') ?? '').toUpperCase()

  if (caseParam && caseParam !== 'A' && caseParam !== 'B') {
    return NextResponse.json(
      { error: 'Invalid case. Use ?case=A or ?case=B' },
      { status: 400 }
    )
  }

  const envelope = {
    detector_version: 'control_chain_v0',
    is_demo: true,
    synthetic_fixtures: true,
    boundary: 'No real hardware, SCADA or grid control. Synthetic demo only.',
  }

  if (caseParam === 'A' || caseParam === 'B') {
    return NextResponse.json({
      ...envelope,
      requested_case: caseParam,
      result: CASES[caseParam as CaseKey],
    })
  }

  // Return both cases if no ?case= param
  return NextResponse.json({
    ...envelope,
    cases: [CASES.A, CASES.B],
  })
}
