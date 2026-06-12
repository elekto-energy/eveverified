'use client'

// ═══════════════════════════════════════════════════════════════════════════
// EvidenceSealField — deterministic WebGL hero background for /solutions/tprm
//
// Visual semantics (product-true, not decoration):
//   evidence particles (left) → resolver core → three verdict lanes
//   SUPPORTED (green) / PARTIAL (amber) / NO_ANSWER (gray, fades)
//   → a thin seal ring closes around the settled output each cycle.
//
// Rules honoured:
//   - deterministic: all particle fates are seeded from the digits of e
//     (E_DIGITS) — no per-frame randomness, same motion every load.
//   - calm, audit-grade: low velocities, no neon bloom, no "AI brain".
//   - respects prefers-reduced-motion: renders one static settled frame.
//   - degrades gracefully: if WebGL is unavailable, a static CSS layer shows.
//   - pauses when off-screen or tab hidden.
//   - hero background only — carries no product logic, no live data.
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react'
import { E_DIGITS } from '@/lib/constants'

const N_PARTICLES = 44

// Verdict palette (matches site verdict colors exactly) — colour only ever
// MEANS something (a verdict); inbound evidence is quiet monochrome.
const C_SUPPORTED = [0.0, 1.0, 0.533]   // #00ff88
const C_PARTIAL = [0.961, 0.62, 0.043]  // #f59e0b
const C_NOANSWER = [0.42, 0.447, 0.502] // #6b7280
const C_INBOUND = [0.58, 0.62, 0.68]    // quiet gray — unresolved evidence has no colour

// Layout anchors in normalized coords (x right, y up, -1..1)
const CORE = { x: -0.18, y: 0.0 }
const RING = { x: 0.62, y: 0.0, r: 0.42 }
const LANES = [
  { x: 0.62, y: 0.22 },  // SUPPORTED
  { x: 0.62, y: 0.0 },   // PARTIAL
  { x: 0.62, y: -0.22 }, // NO_ANSWER (fades before settling)
]

const POINT_VS = `
attribute vec2 a_pos;
attribute float a_size;
attribute vec3 a_color;
attribute float a_alpha;
uniform float u_dpr;
varying vec3 v_color;
varying float v_alpha;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  gl_PointSize = a_size * u_dpr;
  v_color = a_color;
  v_alpha = a_alpha;
}`

const POINT_FS = `
precision mediump float;
varying vec3 v_color;
varying float v_alpha;
void main() {
  vec2 d = gl_PointCoord - vec2(0.5);
  float r = length(d) * 2.0;
  float a = smoothstep(1.0, 0.0, r);
  a *= a;
  gl_FragColor = vec4(v_color * a * v_alpha, 0.0);
}`

const QUAD_VS = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

// Trail fade: copy previous frame, slightly dimmed (deterministic decay)
const FADE_FS = `
precision mediump float;
uniform sampler2D u_tex;
varying vec2 v_uv;
void main() {
  vec3 c = texture2D(u_tex, v_uv).rgb * 0.895;
  gl_FragColor = vec4(c, 1.0);
}`

// Final composite: trails + seal ring + soft vignette
const COMPOSE_FS = `
precision mediump float;
uniform sampler2D u_tex;
uniform float u_arc;      // 0..1 seal ring progress
uniform float u_pulse;    // brief pulse when ring completes
uniform vec2 u_ring;      // ring center (ndc)
uniform float u_radius;   // ring radius (ndc, y-based)
uniform vec2 u_aspect;    // aspect correction
varying v_uv_decl
void main() {
  vec3 c = texture2D(u_tex, v_uv).rgb;

  // position in aspect-corrected ndc
  vec2 p = (v_uv * 2.0 - 1.0) * u_aspect;
  vec2 rc = u_ring * u_aspect;
  vec2 d = p - rc;
  float dist = length(d);

  // thin seal ring: arc from top, clockwise, progress u_arc
  float ang = atan(d.x, d.y);              // 0 at top
  float prog = (ang + 3.14159265) / 6.2831853; // 0..1
  prog = fract(1.0 - prog);
  float onArc = step(prog, u_arc);
  float ring = smoothstep(0.005, 0.0, abs(dist - u_radius)) * onArc;
  vec3 ringColor = vec3(0.0, 1.0, 0.533) * (0.20 + 0.10 * u_pulse);
  c += ringColor * ring;

  // faint ring track (always visible, very quiet)
  float track = smoothstep(0.0035, 0.0, abs(dist - u_radius));
  c += vec3(1.0) * track * 0.025;

  // vignette to protect text readability
  float vig = smoothstep(1.55, 0.45, length(p));
  c *= 0.35 + 0.65 * vig;

  gl_FragColor = vec4(c, 1.0);
}`

// e-digit seeded pseudo-values in [0,1), fully deterministic
function eVal(i: number): number {
  const a = parseInt(E_DIGITS[i % E_DIGITS.length])
  const b = parseInt(E_DIGITS[(i * 7 + 3) % E_DIGITS.length])
  return (a * 10 + b) / 100
}

interface Particle {
  seed: number
  period: number   // seconds per full journey
  offset: number   // phase offset 0..1
  startY: number
  ctrlY: number
  lane: number     // 0 supported, 1 partial, 2 no_answer
  size: number
}

function buildParticles(): Particle[] {
  const ps: Particle[] = []
  for (let i = 0; i < N_PARTICLES; i++) {
    const s1 = eVal(i)
    const s2 = eVal(i + 31)
    const s3 = eVal(i + 67)
    // verdict distribution: 50% supported, 30% partial, 20% no_answer
    const lane = s1 < 0.5 ? 0 : s1 < 0.8 ? 1 : 2
    ps.push({
      seed: s1,
      period: 17 + s2 * 9,           // 17–26 s, ledger-calm
      offset: (i / N_PARTICLES + s3 * 0.13) % 1,
      startY: (s2 - 0.5) * 1.7,
      ctrlY: (s3 - 0.5) * 0.9,
      lane,
      size: 1.8 + s3 * 1.7,
    })
  }
  return ps
}

function easeInOut(t: number): number {
  return t * t * (3 - 2 * t)
}

// Position + color + alpha for a particle at global time t (seconds)
function sample(p: Particle, t: number, out: { x: number; y: number; c: number[]; a: number; sz: number }) {
  const phase = ((t / p.period) + p.offset) % 1
  const lane = LANES[p.lane]
  if (phase < 0.42) {
    // inbound: left edge → resolver core (quadratic bezier)
    const u = easeInOut(phase / 0.42)
    const x0 = -1.15, y0 = p.startY
    const cx = (x0 + CORE.x) / 2, cy = p.ctrlY
    out.x = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * cx + u * u * CORE.x
    out.y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * cy + u * u * CORE.y
    out.c = C_INBOUND
    out.a = 0.09 + 0.14 * u
    out.sz = p.size * 0.8
  } else if (phase < 0.52) {
    // at the core: brief deterministic orbit (resolution moment)
    const u = (phase - 0.42) / 0.1
    const ang = p.seed * 6.2831 + u * 1.8
    const r = 0.02 * (1 - u * 0.4)
    out.x = CORE.x + Math.cos(ang) * r
    out.y = CORE.y + Math.sin(ang) * r * 0.7
    out.c = C_INBOUND
    out.a = 0.3
    out.sz = p.size
  } else if (phase < 0.92) {
    // outbound: core → verdict lane
    const u = easeInOut((phase - 0.52) / 0.4)
    out.x = CORE.x + (lane.x - CORE.x) * u
    out.y = CORE.y + (lane.y - CORE.y) * u + Math.sin(u * 3.14159) * 0.04 * (p.seed - 0.5)
    if (p.lane === 0) { out.c = C_SUPPORTED; out.a = 0.34 }
    else if (p.lane === 1) { out.c = C_PARTIAL; out.a = 0.3 }
    else { out.c = C_NOANSWER; out.a = 0.26 * (1 - u * 0.85) } // NO_ANSWER fades — never settles
    out.sz = p.size
  } else {
    // settled inside the seal ring, then fade for respawn
    const u = (phase - 0.92) / 0.08
    out.x = lane.x + (p.seed - 0.5) * 0.05
    out.y = lane.y + (eVal(Math.floor(p.seed * 90)) - 0.5) * 0.04
    if (p.lane === 0) { out.c = C_SUPPORTED }
    else if (p.lane === 1) { out.c = C_PARTIAL }
    else { out.c = C_NOANSWER }
    out.a = (p.lane === 2 ? 0.04 : 0.32) * (1 - u)
    out.sz = p.size * (1 - u * 0.3)
  }
}

function compileProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const v = gl.createShader(gl.VERTEX_SHADER)!
  gl.shaderSource(v, vs); gl.compileShader(v)
  if (!gl.getShaderParameter(v, gl.COMPILE_STATUS)) return null
  const f = gl.createShader(gl.FRAGMENT_SHADER)!
  gl.shaderSource(f, fs); gl.compileShader(f)
  if (!gl.getShaderParameter(f, gl.COMPILE_STATUS)) return null
  const p = gl.createProgram()!
  gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null
  return p
}

export default function EvidenceSealField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false })
    if (!gl) { setWebglFailed(true); return }

    const fadeFix = COMPOSE_FS.replace('varying v_uv_decl', 'varying vec2 v_uv;')
    const pointProg = compileProgram(gl, POINT_VS, POINT_FS)
    const fadeProg = compileProgram(gl, QUAD_VS, FADE_FS)
    const composeProg = compileProgram(gl, QUAD_VS, fadeFix)
    if (!pointProg || !fadeProg || !composeProg) { setWebglFailed(true); return }

    // fullscreen quad
    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    // particle buffers (pos2 + size1 + color3 + alpha1 = 7 floats)
    const stride = 7
    const data = new Float32Array(N_PARTICLES * stride)
    const pbuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, pbuf)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)

    // ping-pong trail textures
    let texA: WebGLTexture | null = null, texB: WebGLTexture | null = null
    let fbA: WebGLFramebuffer | null = null, fbB: WebGLFramebuffer | null = null
    let W = 0, H = 0

    function makeTarget() {
      const tex = gl!.createTexture()!
      gl!.bindTexture(gl!.TEXTURE_2D, tex)
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, W, H, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, null)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
      const fb = gl!.createFramebuffer()!
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fb)
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0)
      return { tex, fb }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.floor(canvas!.clientWidth * dpr)
      const h = Math.floor(canvas!.clientHeight * dpr)
      if (w === W && h === H) return
      W = w; H = h
      canvas!.width = W; canvas!.height = H
      const a = makeTarget(); const b = makeTarget()
      texA = a.tex; fbA = a.fb; texB = b.tex; fbB = b.fb
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbA); gl!.clearColor(0.028, 0.034, 0.05, 1); gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbB); gl!.clearColor(0.028, 0.034, 0.05, 1); gl!.clear(gl!.COLOR_BUFFER_BIT)
    }

    const particles = buildParticles()
    const tmp = { x: 0, y: 0, c: C_INBOUND, a: 0, sz: 2 }
    const CYCLE = 18 // seal ring closes every 18 s — unhurried

    function writeParticles(t: number) {
      for (let i = 0; i < N_PARTICLES; i++) {
        sample(particles[i], t, tmp)
        const o = i * stride
        data[o] = tmp.x; data[o + 1] = tmp.y
        data[o + 2] = tmp.sz
        data[o + 3] = tmp.c[0]; data[o + 4] = tmp.c[1]; data[o + 5] = tmp.c[2]
        data[o + 6] = tmp.a
      }
      gl!.bindBuffer(gl!.ARRAY_BUFFER, pbuf)
      gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, data)
    }

    function bindQuadAttr(prog: WebGLProgram) {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quad)
      const loc = gl!.getAttribLocation(prog, 'a_pos')
      gl!.enableVertexAttribArray(loc)
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0)
    }

    function frame(t: number) {
      resize()
      const aspect: [number, number] = W > H ? [W / H, 1] : [1, H / W]

      // 1) fade previous trails into B
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbB)
      gl!.viewport(0, 0, W, H)
      gl!.disable(gl!.BLEND)
      gl!.useProgram(fadeProg)
      bindQuadAttr(fadeProg!)
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, texA)
      gl!.uniform1i(gl!.getUniformLocation(fadeProg!, 'u_tex'), 0)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)

      // 2) draw particles additively into B
      writeParticles(t)
      gl!.enable(gl!.BLEND)
      gl!.blendFunc(gl!.ONE, gl!.ONE)
      gl!.useProgram(pointProg)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, pbuf)
      const bytes = stride * 4
      const aPos = gl!.getAttribLocation(pointProg!, 'a_pos')
      const aSize = gl!.getAttribLocation(pointProg!, 'a_size')
      const aColor = gl!.getAttribLocation(pointProg!, 'a_color')
      const aAlpha = gl!.getAttribLocation(pointProg!, 'a_alpha')
      gl!.enableVertexAttribArray(aPos); gl!.vertexAttribPointer(aPos, 2, gl!.FLOAT, false, bytes, 0)
      gl!.enableVertexAttribArray(aSize); gl!.vertexAttribPointer(aSize, 1, gl!.FLOAT, false, bytes, 8)
      gl!.enableVertexAttribArray(aColor); gl!.vertexAttribPointer(aColor, 3, gl!.FLOAT, false, bytes, 12)
      gl!.enableVertexAttribArray(aAlpha); gl!.vertexAttribPointer(aAlpha, 1, gl!.FLOAT, false, bytes, 24)
      gl!.uniform1f(gl!.getUniformLocation(pointProg!, 'u_dpr'), Math.min(window.devicePixelRatio || 1, 1.5))
      gl!.drawArrays(gl!.POINTS, 0, N_PARTICLES)
      gl!.disable(gl!.BLEND)

      // 3) composite B to screen with seal ring + vignette
      const cyc = (t % CYCLE) / CYCLE
      const pulse = cyc > 0.97 ? (cyc - 0.97) / 0.03 : (cyc < 0.06 ? 1 - cyc / 0.06 : 0)
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
      gl!.viewport(0, 0, W, H)
      gl!.useProgram(composeProg)
      bindQuadAttr(composeProg!)
      gl!.bindTexture(gl!.TEXTURE_2D, texB)
      gl!.uniform1i(gl!.getUniformLocation(composeProg!, 'u_tex'), 0)
      gl!.uniform1f(gl!.getUniformLocation(composeProg!, 'u_arc'), cyc)
      gl!.uniform1f(gl!.getUniformLocation(composeProg!, 'u_pulse'), pulse)
      gl!.uniform2f(gl!.getUniformLocation(composeProg!, 'u_ring'), RING.x, RING.y)
      gl!.uniform1f(gl!.getUniformLocation(composeProg!, 'u_radius'), RING.r)
      gl!.uniform2f(gl!.getUniformLocation(composeProg!, 'u_aspect'), aspect[0], aspect[1])
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)

      // swap
      const tt = texA; texA = texB; texB = tt
      const tf = fbA; fbA = fbB; fbB = tf
    }

    let raf = 0
    let running = true
    let visible = true
    let looping = false
    const t0 = performance.now()

    function loop(now: number) {
      if (!running || !visible) { looping = false; return }
      frame((now - t0) / 1000)
      raf = requestAnimationFrame(loop)
    }

    function startLoop() {
      if (looping || reduced || !running || !visible) return
      looping = true
      raf = requestAnimationFrame(loop)
    }

    resize()

    if (reduced) {
      // static settled frame: pre-roll the trail buffer, then stop
      for (let i = 0; i < 90; i++) frame(40 + i * 0.12)
    } else {
      startLoop()
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) startLoop()
    })
    io.observe(canvas)

    const onVis = () => {
      visible = !document.hidden
      if (visible) startLoop()
    }
    document.addEventListener('visibilitychange', onVis)
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {webglFailed ? (
        // graceful static fallback: quiet grid + verdict glows + ring
        <div className="absolute inset-0 bg-grid">
          <div className="absolute inset-0"
            style={{
              background:
                'radial-gradient(420px 280px at 38% 50%, rgba(148,163,184,0.05), transparent 70%),' +
                'radial-gradient(220px 140px at 78% 38%, rgba(0,255,136,0.08), transparent 70%),' +
                'radial-gradient(220px 140px at 78% 50%, rgba(245,158,11,0.07), transparent 70%),' +
                'radial-gradient(220px 140px at 78% 62%, rgba(107,114,128,0.06), transparent 70%)',
            }}
          />
          <div className="absolute rounded-full border border-white/10"
            style={{ left: '64%', top: '50%', width: 'min(46vh, 40vw)', height: 'min(46vh, 40vw)', transform: 'translate(-50%, -50%)' }}
          />
        </div>
      ) : (
        <canvas ref={canvasRef} className="w-full h-full block" />
      )}
      {/* readability scrim over the text column */}
      <div className="absolute inset-0 bg-gradient-to-r from-eve-dark via-eve-dark/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-eve-dark to-transparent" />
      {/* technical annotation rail — instrument axis, drawn above scrims */}
      <div className="absolute inset-x-0 bottom-[11%] hidden lg:block pointer-events-none" aria-hidden="true">
        {[
          { label: 'EVIDENCE IN', left: '8%' },
          { label: 'RESOLVER', left: '41%' },
          { label: 'VERDICT', left: '66%' },
          { label: 'SEALED', left: '81%' },
          { label: 'VERIFY', left: '93%' },
        ].map((a) => (
          <div key={a.label} className="absolute -translate-x-1/2" style={{ left: a.left }}>
            <div className="w-px h-3 bg-white/15 mx-auto mb-1.5" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-gray-600 whitespace-nowrap">
              {a.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
