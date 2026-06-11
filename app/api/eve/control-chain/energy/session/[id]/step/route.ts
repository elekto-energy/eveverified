import { NextRequest, NextResponse } from 'next/server'
import { ctrlEnergyFetch, isEnergyStep, isSessionId } from '@/lib/ctrl-energy'

export const dynamic = 'force-dynamic'

// The proxy forwards ONLY { step_id, options.stale_snapshot, options.reserve_breach } — never the raw
// client body. Allowlist enforced here AND in the internal service.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isSessionId(id)) {
    return NextResponse.json({ error: 'invalid session id' }, { status: 400 })
  }
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }
  const stepId = (body as { step_id?: unknown })?.step_id
  if (!isEnergyStep(stepId)) {
    return NextResponse.json({ error: 'step_id must be in the energy step allowlist' }, { status: 400 })
  }
  const opts = (body as { options?: { stale_snapshot?: unknown; reserve_breach?: unknown } })?.options
  const stale = opts?.stale_snapshot
  const breach = opts?.reserve_breach
  const forward: { step_id: string; options?: { stale_snapshot?: boolean; reserve_breach?: boolean } } = { step_id: stepId }
  if (typeof stale === 'boolean' || typeof breach === 'boolean') {
    forward.options = {}
    if (typeof stale === 'boolean') forward.options.stale_snapshot = stale
    if (typeof breach === 'boolean') forward.options.reserve_breach = breach
  }

  const upstream = await ctrlEnergyFetch(`/energy/session/${id}/step`, { method: 'POST', json: forward })
  if (!upstream.ok && upstream.status === 503) {
    return NextResponse.json({ live: false, mode: 'OFFLINE', detail: upstream.body }, { status: 503 })
  }
  return NextResponse.json(upstream.body, { status: upstream.status })
}
