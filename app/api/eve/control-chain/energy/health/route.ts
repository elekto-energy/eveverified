import { NextResponse } from 'next/server'
import { ctrlEnergyFetch } from '@/lib/ctrl-energy'

export const dynamic = 'force-dynamic'

export async function GET() {
  const upstream = await ctrlEnergyFetch('/health')
  if (!upstream.ok) {
    // Fail closed: OFFLINE is reported as OFFLINE. Never simulated success.
    return NextResponse.json({ live: false, mode: 'OFFLINE', detail: upstream.body }, { status: 503 })
  }
  return NextResponse.json({ live: true, upstream: upstream.body }, { headers: { 'Cache-Control': 'no-store' } })
}
