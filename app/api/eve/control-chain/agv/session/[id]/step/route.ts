import { NextRequest, NextResponse } from 'next/server'
import { ctrlAgvFetch, isAgvStep, isAgvSessionId } from '@/lib/ctrl-agv'

export const dynamic = 'force-dynamic'

// The proxy forwards ONLY { step_id } — never the raw client body.
// Allowlist enforced here AND in the internal service (BUILD_SPEC §8).
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isAgvSessionId(id)) {
    return NextResponse.json({ error: 'invalid session id' }, { status: 400 })
  }
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }
  const stepId = (body as { step_id?: unknown })?.step_id
  if (!isAgvStep(stepId)) {
    return NextResponse.json({ error: 'step_id must be in the AGV step allowlist' }, { status: 400 })
  }
  const upstream = await ctrlAgvFetch(`/agv/session/${id}/step`, {
    method: 'POST',
    json: { step_id: stepId },
  })
  // 409 from backend = DENIED verdict — pass through with full body so UI renders it.
  if (upstream.status === 409) {
    return NextResponse.json(upstream.body, { status: 409 })
  }
  if (!upstream.ok && upstream.status === 503) {
    return NextResponse.json({ live: false, mode: 'OFFLINE', detail: upstream.body }, { status: 503 })
  }
  return NextResponse.json(upstream.body, { status: upstream.status })
}
