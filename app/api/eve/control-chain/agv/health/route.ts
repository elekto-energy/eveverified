import { NextResponse } from 'next/server'
import { ctrlAgvFetch } from '@/lib/ctrl-agv'

export const dynamic = 'force-dynamic'

export async function GET() {
  const upstream = await ctrlAgvFetch('/health')
  if (!upstream.ok) {
    return NextResponse.json({ live: false, mode: 'OFFLINE', detail: upstream.body }, { status: 503 })
  }
  return NextResponse.json(
    { live: true, upstream: upstream.body },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
