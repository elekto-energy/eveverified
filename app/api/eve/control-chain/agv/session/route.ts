import { NextResponse } from 'next/server'
import { ctrlAgvFetch } from '@/lib/ctrl-agv'

export const dynamic = 'force-dynamic'

export async function POST() {
  const upstream = await ctrlAgvFetch('/agv/session', { method: 'POST' })
  if (!upstream.ok) {
    return NextResponse.json({ live: false, mode: 'OFFLINE', detail: upstream.body }, { status: 503 })
  }
  return NextResponse.json(upstream.body)
}
