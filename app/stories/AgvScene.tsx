'use client'

// EVE Control Chain — AGV scene (proof-of-concept narrative)
// Visual rendering of the AGV control-chain verdict for the warehouse-robot demo.
// Steps mirror SCENARIO_B_STEPS in AgvControlClient.tsx exactly — nothing invented.
//   mission_start → route_assigned (FULL_SPEED) → human_detected @ 2.4 m
//   → continue_at_full_speed (unsafe intent recorded FIRST) → DENIED (action_applied: false, HTTP 409, MISSION_HELD)
// No WebGL, no canvas, no three.js. Pure SVG + requestAnimationFrame. prefers-reduced-motion aware.
// Scene = visual explanation. Verify button links to the real Bridge-sealed record.
// EVE-CTRL-AGV-00004658 sealed 2026-06-13, bridges ctrl-poc record EVE-CTRL-AGV-000013, DENIED, action_applied: false.
import { useEffect, useRef, useState } from 'react'

const VERIFY_URL = 'https://verify.eveverified.com/?id=EVE-CTRL-AGV-00004658'

const GREEN = '#00ff88' // FULL_SPEED
const AMBER = '#f59e0b' // unsafe intent
const RED = '#ef4444' // DENIED

interface StepDef {
  n: string
  cap: string
  sub: string
  ev: { t: string; c: string } | null
}

// Mirror of SCENARIO_B_STEPS + the 409/DENIED outcome.
const STEPS: StepDef[] = [
  { n: 'STEP 1 / 4', cap: 'Mission start — EVE opens a session.', sub: 'mission_mode: MISSION_ACTIVE', ev: null },
  { n: 'STEP 2 / 4', cap: 'Route A assigned — motion begins at full speed.', sub: 'robot_motion: FULL_SPEED', ev: null },
  { n: 'STEP 3 / 4', cap: 'Human worker detected at 2.4 m.', sub: 'human_detected: true · proximity event hashed', ev: { t: 'human_proximity_detected', c: '#fca5a5' } },
  { n: 'STEP 4 / 4', cap: 'Operator requests: continue at full speed.', sub: 'unsafe intent recorded to chain FIRST, then evaluated', ev: { t: 'unsafe_action_requested', c: RED } },
  { n: 'VERDICT', cap: 'EVE evaluates the governed conditions — and denies.', sub: '', ev: { t: 'unsafe_action_denied', c: RED } },
]

export default function AgvScene() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const verifyRef = useRef<HTMLAnchorElement | null>(null)
  const playRef = useRef<(() => void) | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const byId = (id: string) => svg.querySelector(`#${id}`)
    const robot = byId('ag-robot') as SVGGElement | null
    const motion = byId('ag-motion') as SVGGElement | null
    const human = byId('ag-human') as SVGGElement | null
    const dist = byId('ag-dist') as SVGGElement | null
    const stepEl = byId('ag-step') as SVGTextElement | null
    const capEl = byId('ag-cap') as SVGTextElement | null
    const subEl = byId('ag-sub') as SVGTextElement | null
    const eventsG = byId('ag-events') as SVGGElement | null
    const verdict = byId('ag-verdict') as SVGGElement | null
    const verifyLink = verifyRef.current
    const robotShell = robot ? robot.querySelector('rect') : null
    const wheels = robot ? Array.from(robot.querySelectorAll('circle')) : []

    if (!robot || !motion || !human || !dist || !stepEl || !capEl || !subEl || !eventsG || !verdict || !verifyLink || !robotShell) {
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let timers: number[] = []
    let raf = 0
    let curX = 0
    let evY = 318

    const clear = () => { timers.forEach((t) => window.clearTimeout(t)); timers = []; if (raf) cancelAnimationFrame(raf) }
    const at = (ms: number, fn: () => void) => { timers.push(window.setTimeout(fn, ms)) }

    const addEvent = (seq: number, ev: { t: string; c: string }) => {
      const row = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      row.setAttribute('x', '40'); row.setAttribute('y', String(evY))
      row.setAttribute('fill', ev.c); row.setAttribute('font-family', 'monospace'); row.setAttribute('font-size', '11')
      row.style.opacity = '0'
      row.innerHTML = `#${seq}  ${ev.t}   <tspan fill="#4b5563">recorded to control chain</tspan>`
      eventsG.appendChild(row)
      requestAnimationFrame(() => { row.style.transition = 'opacity .4s'; row.style.opacity = '1' })
      evY += 16
    }

    const glideTo = (dx: number, dur: number) => {
      if (reduce) { robot.setAttribute('transform', `translate(${dx},0)`); return }
      const from = curX; const to = dx; let start: number | null = null
      const frame = (ts: number) => {
        if (start === null) start = ts
        const p = Math.min((ts - start) / dur, 1)
        const e = 1 - Math.pow(1 - p, 3)
        const x = from + (to - from) * e
        robot.setAttribute('transform', `translate(${x},0)`); curX = x
        if (p < 1) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    const applyStep = (i: number) => {
      const s = STEPS[i]!
      stepEl.textContent = s.n; capEl.textContent = s.cap; subEl.textContent = s.sub
      if (i === 1) { motion.style.transition = 'opacity .3s'; motion.style.opacity = '1' }
      if (i === 2) {
        dist.style.transition = 'opacity .4s'; dist.style.opacity = '1'
        human.style.transition = 'opacity .4s'; human.style.opacity = '1'
      }
      if (i === 3) {
        robotShell.setAttribute('stroke', AMBER)
        wheels.forEach((w) => w.setAttribute('stroke', AMBER))
      }
      if (i === 4) {
        robotShell.setAttribute('stroke', RED)
        wheels.forEach((w) => w.setAttribute('stroke', RED))
        motion.style.opacity = '0'
        verdict.style.transition = 'opacity .5s'; verdict.style.opacity = '1'
        verifyLink.style.transition = 'opacity .5s'; verifyLink.style.opacity = '1'; verifyLink.style.pointerEvents = 'auto'
      }
      if (s.ev) addEvent(i + 1, s.ev)
    }

    const reset = () => {
      clear()
      stepEl.textContent = ''; capEl.textContent = ''; subEl.textContent = ''
      eventsG.innerHTML = ''; evY = 318; curX = 0
      motion.style.opacity = '0'; human.style.opacity = '0'; dist.style.opacity = '0'
      verdict.style.opacity = '0'; verifyLink.style.opacity = '0'; verifyLink.style.pointerEvents = 'none'
      robotShell.setAttribute('stroke', GREEN)
      wheels.forEach((w) => w.setAttribute('stroke', GREEN))
      robot.setAttribute('transform', 'translate(0,0)')
    }

    const play = () => {
      reset()
      if (reduce) {
        for (let k = 0; k < STEPS.length; k++) { const s = STEPS[k]!; if (s.ev) addEvent(k + 1, s.ev) }
        applyStep(4)
        robot.setAttribute('transform', 'translate(140,0)')
        return
      }
      at(150, () => applyStep(0))
      at(1500, () => { applyStep(1); glideTo(70, 1400) })
      at(3200, () => applyStep(2))
      at(3300, () => glideTo(140, 1200))
      at(4900, () => applyStep(3))
      at(6300, () => applyStep(4))
    }

    playRef.current = play
    // Render the initial (static) frame — STEP 1 setup, no motion. Do NOT autoplay.
    reset()
    applyStep(0)
    return () => clear()
  }, [])

  const startPlay = () => {
    setHasPlayed(true)
    playRef.current?.()
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#0a0e14' }}>
      <svg viewBox="0 0 680 360" role="img" ref={svgRef} className="block w-full" aria-label="Animated scene: an autonomous warehouse robot requests full speed with a human detected at 2.4 m; the unsafe command is recorded to the chain, then EVE returns a DENIED verdict with action_applied false.">
        <title>AGV unsafe continue denied — verdict chain</title>
        <desc>Robot moving along an aisle, human detected at 2.4 metres, full-speed command recorded then denied.</desc>

        <line x1="40" y1="250" x2="640" y2="250" stroke="#1f2630" strokeWidth="1" />
        <line x1="40" y1="190" x2="640" y2="190" stroke="#1f2630" strokeWidth="0.5" strokeDasharray="4 6" />

        <g id="ag-dist" opacity="0">
          <line x1="250" y1="222" x2="430" y2="222" stroke={RED} strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="250" y1="216" x2="250" y2="228" stroke={RED} strokeWidth="0.5" />
          <line x1="430" y1="216" x2="430" y2="228" stroke={RED} strokeWidth="0.5" />
          <text x="340" y="214" textAnchor="middle" fill={RED} fontFamily="monospace" fontSize="11">2.4 m</text>
        </g>

        <g id="ag-human" opacity="0">
          <circle cx="445" cy="208" r="9" fill="none" stroke={RED} strokeWidth="1.5" />
          <line x1="445" y1="217" x2="445" y2="240" stroke={RED} strokeWidth="1.5" />
          <line x1="445" y1="224" x2="436" y2="234" stroke={RED} strokeWidth="1.5" />
          <line x1="445" y1="224" x2="454" y2="234" stroke={RED} strokeWidth="1.5" />
          <line x1="445" y1="240" x2="437" y2="250" stroke={RED} strokeWidth="1.5" />
          <line x1="445" y1="240" x2="453" y2="250" stroke={RED} strokeWidth="1.5" />
        </g>

        <g id="ag-robot">
          <rect x="190" y="212" width="44" height="30" rx="4" fill="#0f1620" stroke={GREEN} strokeWidth="1.2" />
          <rect x="198" y="219" width="12" height="8" rx="2" fill={GREEN} opacity="0.85" />
          <circle cx="200" cy="246" r="4.5" fill="none" stroke={GREEN} strokeWidth="1.2" />
          <circle cx="224" cy="246" r="4.5" fill="none" stroke={GREEN} strokeWidth="1.2" />
          <g id="ag-motion" opacity="0">
            <line x1="176" y1="220" x2="186" y2="220" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="172" y1="227" x2="184" y2="227" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="176" y1="234" x2="186" y2="234" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>

        <text id="ag-step" x="40" y="40" fill="#9ca3af" fontFamily="monospace" fontSize="11" letterSpacing="0.12em">STEP 1 / 4</text>
        <text id="ag-cap" x="40" y="64" fill="#e5e7eb" fontFamily="sans-serif" fontSize="15">Mission start — EVE opens a session.</text>
        <text id="ag-sub" x="40" y="86" fill="#6b7280" fontFamily="monospace" fontSize="11"></text>

        <text x="40" y="300" fill="#4b5563" fontFamily="monospace" fontSize="10" letterSpacing="0.12em">EVENT CHAIN — hashed, append-only</text>
        <g id="ag-events" fontFamily="monospace" fontSize="11"></g>

        <g id="ag-verdict" opacity="0">
          <rect x="40" y="110" width="600" height="92" rx="10" fill="#ef44440f" stroke="#ef444455" strokeWidth="0.5" />
          <text x="60" y="140" fill={RED} fontFamily="monospace" fontSize="22" fontWeight="500">DENIED</text>
          <text x="60" y="164" fill="#9ca3af" fontFamily="monospace" fontSize="11">basis: human_proximity_unsafe</text>
          <text x="60" y="184" fill="#9ca3af" fontFamily="monospace" fontSize="11">action_applied: <tspan fill={RED}>false</tspan>  ·  HTTP 409  ·  mission: <tspan fill={RED}>HELD</tspan></text>
        </g>

        {!hasPlayed && (
          <g onClick={startPlay} style={{ cursor: 'pointer' }} role="button" aria-label="Play scene">
            <rect x="0" y="0" width="680" height="360" fill="#0a0e14" opacity="0.55" />
            <circle cx="340" cy="180" r="34" fill="#0f1620" stroke={GREEN} strokeWidth="1.5" />
            <path d="M331 165 L331 195 L356 180 Z" fill={GREEN} />
            <text x="340" y="238" textAnchor="middle" fill="#e5e7eb" fontFamily="monospace" fontSize="12" letterSpacing="0.12em">PLAY SCENE</text>
          </g>
        )}
      </svg>

      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/10">
        <button
          onClick={startPlay}
          className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] text-gray-400 hover:bg-white/10 transition-colors"
        >
          <span aria-hidden="true">{hasPlayed ? '↻' : '▶'}</span> {hasPlayed ? 'Replay' : 'Play scene'}
        </button>
        <a
          ref={verifyRef}
          href={VERIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full border transition-colors"
          style={{ opacity: 0, pointerEvents: 'none', color: '#fca5a5', borderColor: '#ef444466', background: '#ef44441a' }}
        >
          Verify record →
        </a>
      </div>
    </div>
  )
}
