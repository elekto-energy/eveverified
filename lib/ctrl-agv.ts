// Server-side helper for the AGV control-chain proxy.
// Talks to the internal eve-ctrl-poc service (VPS, 127.0.0.1:3210) through the
// nginx gate. Secrets live in env only — never NEXT_PUBLIC, never in the client.
//
// Env:
//   CTRL_ENERGY_BASE  shared with Energy — same gate, same service
//   CTRL_ENERGY_KEY   shared with Energy — same nginx gate secret
//
// Fail-closed: if env is missing or upstream is unreachable, callers receive
// { ok: false } and the UI must show UNKNOWN/OFFLINE — never simulated success.

const TIMEOUT_MS = 8000

export interface UpstreamResult {
  ok: boolean
  status: number
  body: unknown
}

export async function ctrlAgvFetch(
  path: string,
  init?: { method?: 'GET' | 'POST'; json?: unknown },
): Promise<UpstreamResult> {
  // AGV shares the same gate as Energy — same base URL, same key, same service.
  const base = process.env.CTRL_ENERGY_BASE
  if (!base) {
    return { ok: false, status: 503, body: { error: 'ctrl_agv_not_configured', mode: 'OFFLINE' } }
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
    return { ok: false, status: 503, body: { error: 'ctrl_agv_unreachable', mode: 'OFFLINE' } }
  } finally {
    clearTimeout(timer)
  }
}

// AGV step allowlist — mirrors the backend AGV_STEP_ALLOWLIST exactly.
export const AGV_STEPS = [
  'mission_start',
  'route_assigned',
  'human_detected',
  'reduce_speed',
  'obstacle_detected',
  'request_reroute',
  'authority_checked',
  'continue_on_safe_route',
  'continue_at_full_speed',
  'mission_complete',
] as const
export type AgvStepId = (typeof AGV_STEPS)[number]

export function isAgvStep(v: unknown): v is AgvStepId {
  return typeof v === 'string' && (AGV_STEPS as readonly string[]).includes(v)
}

const AGV_SESSION_ID = /^agv-\d{6}$/
export function isAgvSessionId(v: string): boolean {
  return AGV_SESSION_ID.test(v)
}
