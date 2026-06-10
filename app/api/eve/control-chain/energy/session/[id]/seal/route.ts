import { NextRequest, NextResponse } from 'next/server'
import { ctrlEnergyFetch, isSessionId } from '@/lib/ctrl-energy'

export const dynamic = 'force-dynamic'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isSessionId(id)) {
    return NextResponse.json({ error: 'invalid session id' }, { status: 400 })
  }
  const upstream = await ctrlEnergyFetch(`/energy/session/${id}/seal`, { method: 'POST' })
  if (!upstream.ok && upstream.status === 503) {
    return NextResponse.json({ live: false, mode: 'OFFLINE', detail: upstream.body }, { status: 503 })
  }
  return NextResponse.json(upstream.body, { status: upstream.status })
}
