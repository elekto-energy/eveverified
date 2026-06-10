import { NextResponse } from 'next/server'
import { ctrlEnergyFetch } from '@/lib/ctrl-energy'

export const dynamic = 'force-dynamic'

export async function POST() {
  const upstream = await ctrlEnergyFetch('/energy/session', { method: 'POST' })
  if (!upstream.ok) {
    return NextResponse.json({ live: false, mode: 'OFFLINE', detail: upstream.body }, { status: 503 })
  }
  return NextResponse.json(upstream.body)
}
