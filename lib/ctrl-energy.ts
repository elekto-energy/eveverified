// Server-side helper for the ENERGY control-chain proxy.
// Talks to the internal eve-ctrl-poc service (VPS, 127.0.0.1:3210) through the
// nginx gate. Secrets live in env only — never NEXT_PUBLIC, never in the client.
//
// Env:
//   CTRL_ENERGY_BASE  e.g. https://api.eveverified.com/ctrl-energy   (Vercel)
//                     or  http://127.0.0.1:3210                       (local dev)
//   CTRL_ENERGY_KEY   nginx gate secret (X-Ctrl-Energy-Key). Optional for local dev.
//
// Fail-closed: if env is missing or upstream is unreachable, callers receive
// { ok: false } and the UI must show UNKNOWN/OFFLINE — never simulated success.

const TIMEOUT_MS = 8000

export interface UpstreamResult {
  ok: boolean
  status: number
  body: unknown
}

export async function ctrlEnergyFetch(
  path: string,
  init?: { method?: 'GET' | 'POST'; json?: unknown },
): Promise<UpstreamResult> {
  const base = process.env.CTRL_ENERGY_BASE
  if (!base) {
    return { ok: false, status: 503, body: { error: 'ctrl_energy_not_configured', mode: 'OFFLINE' } }
  }
  const headers: Record<string, string> = {}
  const key = process.env.CTRL_ENERGY_KEY
  if (key) headers['X-Ctrl-Energy-Key'] = key

  const hasBody = init?.json !== undefined
  if (hasBody) headers['Content-Type'] = 'application/json'

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${base}${path}`, {
      method: init?.method ?? 'GET',
      headers,
      body: init?.json !== undefined ? JSON.stringify(init.json) : undefined,
      cache: 'no-store',
      signal: controller.signal,
    })
    const body = await res.json().catch(() => ({ error: 'invalid_upstream_json' }))
    return { ok: res.ok, status: res.status, body }
  } catch {
    // Unreachable / timeout → OFFLINE, fail closed. No synthetic fallback exists.
    return { ok: false, status: 503, body: { error: 'ctrl_energy_unreachable', mode: 'OFFLINE' } }
  } finally {
    clearTimeout(timer)
  }
}

// The ONLY step ids the proxy will ever forward (mirrors the service allowlist).
export const ENERGY_STEPS = [
  'break_grid',
  'enter_island_mode',
  'protect_critical_loads',
  'pause_guest_charging',
  'mint_verified_surplus',
  'restore_grid',
  'request_resync',
] as const
export type EnergyStepId = (typeof ENERGY_STEPS)[number]

export function isEnergyStep(v: unknown): v is EnergyStepId {
  return typeof v === 'string' && (ENERGY_STEPS as readonly string[]).includes(v)
}

const SESSION_ID = /^esn-\d{6}$/
export function isSessionId(v: string): boolean {
  return SESSION_ID.test(v)
}
