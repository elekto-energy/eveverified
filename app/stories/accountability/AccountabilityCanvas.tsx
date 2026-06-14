'use client'

// WebGL backdrop for the accountability scroll-story.
// PRINCIPLE (locked): WebGL explains the story — it never invents the proof.
// This layer is pure atmosphere driven by scroll progress (0..1). It renders:
//   - a particle field representing the "decision chain" (coherent early, fragmenting at the gap)
//   - a colour mood that shifts green -> amber -> red -> green across the acts
// No record data is shown here; all real fields live in the HTML scenes above this canvas.
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 1400

// Map scroll progress (0..1) to a mood colour for the field.
function moodColor(p: number): THREE.Color {
  // 0.0–0.25 green (approved) · 0.25–0.45 amber (drift) · 0.45–0.8 red (gap) · 0.8–1 green (verified)
  const green = new THREE.Color('#00ff88')
  const amber = new THREE.Color('#f59e0b')
  const red = new THREE.Color('#ef4444')
  if (p < 0.25) return green.clone().lerp(amber, (p / 0.25) * 0.4)
  if (p < 0.45) return amber.clone().lerp(red, (p - 0.25) / 0.2)
  if (p < 0.8) return red.clone()
  return red.clone().lerp(green, (p - 0.8) / 0.2)
}

function ParticleChain({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef = useRef<THREE.PointsMaterial>(null)

  // Two positions per particle: an ORDERED lattice (coherent chain) and a SCATTERED cloud (broken).
  const { ordered, scattered, geometry } = useMemo(() => {
    const ordered = new Float32Array(PARTICLE_COUNT * 3)
    const scattered = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // ordered: particles along a gently waving horizontal chain (the decision chain)
      const t = (i / PARTICLE_COUNT) * Math.PI * 8
      ordered[i * 3] = (i / PARTICLE_COUNT - 0.5) * 28
      ordered[i * 3 + 1] = Math.sin(t) * 1.4 + (Math.random() - 0.5) * 0.5
      ordered[i * 3 + 2] = Math.cos(t * 0.5) * 1.4 + (Math.random() - 0.5) * 0.5
      // scattered: random cloud (the chain pulled apart)
      scattered[i * 3] = (Math.random() - 0.5) * 34
      scattered[i * 3 + 1] = (Math.random() - 0.5) * 20
      scattered[i * 3 + 2] = (Math.random() - 0.5) * 16
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(ordered.slice(), 3))
    return { ordered, scattered, geometry }
  }, [])

  useFrame((state) => {
    const p = progressRef.current
    const pts = pointsRef.current
    if (!pts) return
    const posAttr = pts.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    // fragmentation factor: 0 ordered, ramps up through the "gap" acts, settles back toward order.
    // peak scatter around p≈0.45–0.75 (UNKNOWN -> GAP -> basis), re-cohere toward the sealed proof.
    let frag: number
    if (p < 0.3) frag = (p / 0.3) * 0.15
    else if (p < 0.75) frag = 0.15 + ((p - 0.3) / 0.45) * 0.85
    else frag = 1 - ((p - 0.75) / 0.25) * 0.6 // re-cohere, but never fully (chain was broken)

    const time = state.clock.elapsedTime
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const o = i * 3
      const drift = Math.sin(time * 0.3 + i) * 0.05
      arr[o] = THREE.MathUtils.lerp(ordered[o], scattered[o], frag) + drift
      arr[o + 1] = THREE.MathUtils.lerp(ordered[o + 1], scattered[o + 1], frag) + drift
      arr[o + 2] = THREE.MathUtils.lerp(ordered[o + 2], scattered[o + 2], frag)
    }
    posAttr.needsUpdate = true

    // slow rotation + mood colour
    pts.rotation.y = time * 0.04 + p * 0.6
    if (matRef.current) {
      matRef.current.color = moodColor(p)
      matRef.current.opacity = 0.55 + Math.sin(time) * 0.05
    }
    // camera eases in as the story progresses
    state.camera.position.z = THREE.MathUtils.lerp(22, 16, p)
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={matRef}
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={'#00ff88'}
      />
    </points>
  )
}

export default function AccountabilityCanvas({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 22], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <ParticleChain progressRef={progressRef} />
    </Canvas>
  )
}
