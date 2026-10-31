'use client'

// Scroll-driven presentation for /services only - WEB_RELEASE_MODEL v1.7 section K.
// Presentation only: no copy, figure or link is added or removed here; every
// component renders the same text as the static layout. Pinned and horizontal
// effects run only on desktop (>= 1024px) and never when the visitor has
// "reduce motion" enabled; then the static layout is rendered instead.

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

const serif = 'font-[family-name:var(--ev-font-serif)]'
const mono = 'font-[family-name:var(--ev-font-mono)]'
const label = `${mono} text-[11px] font-medium uppercase tracking-[0.16em]`
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ev-accent)]'
const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8'

function useDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)')
    const update = () => setDesktop(m.matches)
    update()
    m.addEventListener('change', update)
    return () => m.removeEventListener('change', update)
  }, [])
  return desktop
}

/** True when pinned / horizontal effects may run. */
function usePinning() {
  const reduce = useReducedMotion()
  const desktop = useDesktop()
  return desktop && !reduce
}

/* ------------------------------------------------------------------ */
/* Reveal: fade and rise once when the element enters the viewport.    */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero: pinned while the verification chain lights up stage by stage. */
/* ------------------------------------------------------------------ */

export function HeroChain({
  intro,
  chain,
  caption,
}: {
  intro: ReactNode
  chain: string[]
  caption: string
}) {
  const pin = usePinning()
  const ref = useRef<HTMLElement>(null)
  const last = chain.length - 1
  const [active, setActive] = useState(last)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const fill = useTransform(scrollYProgress, [0, 0.85], [0, 1])
  const exitScale = useTransform(scrollYProgress, [0.86, 1], [1, 0.93])
  const exitOpacity = useTransform(scrollYProgress, [0.86, 1], [1, 0.35])

  // Stage i lights up after (i / stages) of the first 85% of the pinned scroll.
  const stageFor = (v: number) => Math.max(0, Math.min(last, Math.floor((v / 0.85) * (last + 0.999))))

  useEffect(() => {
    setActive(pin ? stageFor(scrollYProgress.get()) : last)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, last])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (pin) setActive(stageFor(v))
  })

  return (
    <section ref={ref} className={`ev-ink bg-[var(--ev-ink)] text-[var(--ev-on-ink)] ${pin ? 'h-[240vh]' : ''}`}>
      <div className={pin ? 'sticky top-0 flex h-screen items-center pt-16' : 'pb-20 pt-32 md:pb-28 md:pt-40'}>
        <motion.div
          style={pin ? { scale: exitScale, opacity: exitOpacity } : undefined}
          className={`${wrap} grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:items-end`}
        >
          {intro}

          <figure className="relative">
            <div className="rounded-sm border border-dashed border-[var(--ev-rule)] p-6 sm:p-8">
              <p className={`${label} absolute -top-2.5 left-5 bg-[var(--ev-ink)] px-2 text-[var(--ev-on-ink-muted)]`}>
                Agreed scope
              </p>
              <ol className="relative space-y-3">
                <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-[var(--ev-rule)]" />
                {pin && (
                  <motion.span
                    aria-hidden="true"
                    style={{ scaleY: fill }}
                    className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-[var(--ev-accent)]"
                  />
                )}
                {chain.map((stage, i) => {
                  const lit = i <= active
                  const isLast = i === last
                  return (
                    <li key={stage} className="relative flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className={`relative z-10 h-[15px] w-[15px] shrink-0 border-2 transition-colors duration-300 ${
                          isLast && lit
                            ? 'border-[var(--ev-accent)] bg-[var(--ev-accent)]'
                            : lit && pin
                              ? 'border-[var(--ev-accent)] bg-[var(--ev-ink)]'
                              : 'border-[var(--ev-on-ink-muted)] bg-[var(--ev-ink)]'
                        }`}
                      />
                      <span
                        className={`${mono} text-[13px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                          lit ? 'text-[var(--ev-on-ink)]' : 'text-[var(--ev-on-ink-muted)]'
                        }`}
                      >
                        {stage}
                      </span>
                    </li>
                  )
                })}
              </ol>
            </div>
            <figcaption className="mt-4 text-sm leading-relaxed text-[var(--ev-on-ink-muted)]">{caption}</figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Branches: pinned horizontal track on desktop, static grid otherwise. */
/* ------------------------------------------------------------------ */

type BranchCard = { id: string; index: string; name: string; line: string }

export function BranchesTrack({ branches }: { branches: BranchCard[] }) {
  const pin = usePinning()
  if (pin) return <PinnedBranches branches={branches} />
  return (
    <section id="services" className="scroll-mt-20 bg-[var(--ev-bg)] py-20 md:py-24">
      <div className={wrap}>
        <p className={label}>Three service branches</p>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {branches.map((b) => (
            <li key={b.id}>
              <BranchCardLink b={b} big={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function BranchCardLink({ b, big, onFocus }: { b: BranchCard; big: boolean; onFocus?: () => void }) {
  return (
    <a
      href={`#${b.id}`}
      onFocus={onFocus}
      className={`group flex h-full flex-col border border-[var(--ev-border)] bg-[var(--ev-surface)] transition-colors hover:border-[var(--ev-border-strong)] ${focus} ${
        big ? 'p-10' : 'p-6'
      }`}
    >
      <span aria-hidden="true" className={`mb-6 h-1 bg-[var(--ev-accent)] ${big ? 'w-16' : 'w-10'}`} />
      <span className={`${mono} ${big ? 'text-base' : 'text-sm'}`}>{b.index}</span>
      <span className={`${serif} mt-2 font-semibold leading-snug ${big ? 'text-[40px]' : 'text-2xl'}`}>
        {b.name}
      </span>
      <span className={`mt-3 flex-1 leading-relaxed ${big ? 'text-lg' : 'text-[15px]'}`}>{b.line}</span>
      <span className="mt-6 text-sm font-semibold underline decoration-[var(--ev-accent)] decoration-2 underline-offset-[6px] group-hover:decoration-[var(--ev-text)]">
        Details <span aria-hidden="true">↓</span>
      </span>
    </a>
  )
}

// Mounted only when pinning is allowed, so useScroll binds to a section that
// already exists in the DOM.
function PinnedBranches({ branches }: { branches: BranchCard[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const [dist, setDist] = useState(0)
  const distRef = useRef(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => {
    const p = Math.min(1, Math.max(0, (v - 0.08) / 0.84))
    return -p * distRef.current
  })

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current
      if (!t) return
      const d = Math.max(0, t.scrollWidth - window.innerWidth)
      distRef.current = d
      setDist(d)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Keyboard users: bring a focused card into view by scrolling the page to
  // the matching point of the pinned track.
  const onFocusCard = (i: number) => {
    const s = sectionRef.current
    if (!s || branches.length < 2) return
    const top = s.getBoundingClientRect().top + window.scrollY
    const range = s.offsetHeight - window.innerHeight
    const p = 0.08 + (i / (branches.length - 1)) * 0.84
    window.scrollTo({ top: top + p * range })
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[var(--ev-bg)]"
      style={{ height: `calc(100vh + ${Math.round(dist * 1.25)}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <div className={wrap}>
          <p className={label}>Three service branches</p>
        </div>
        <motion.ol
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex w-max gap-8 pl-[max(20px,calc((100vw-72rem)/2+32px))] pr-[12vw]"
        >
          {branches.map((b, i) => (
            <li key={b.id} className="h-[min(440px,56vh)] w-[min(560px,62vw)] shrink-0">
              <BranchCardLink b={b} big onFocus={() => onFocusCard(i)} />
            </li>
          ))}
        </motion.ol>
        <div className={`${wrap} mt-10`}>
          <div aria-hidden="true" className="h-px w-full bg-[var(--ev-border)]">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-[var(--ev-accent)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Theme switch: Evidence / Light / Dark (variables in theme.css).     */
/* ------------------------------------------------------------------ */

const THEMES = [
  { id: 'evidence', name: 'Evidence' },
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
] as const

export function ThemeSwitch() {
  const ref = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    const root = ref.current?.closest('[data-ev-theme]')
    setTheme(root?.getAttribute('data-ev-theme') ?? null)
  }, [])

  const choose = (id: string) => {
    const root = ref.current?.closest('[data-ev-theme]')
    if (!root) return
    root.setAttribute('data-ev-theme', id)
    setTheme(id)
    try {
      localStorage.setItem('ev-theme', id)
    } catch {
      /* storage unavailable: choice applies to this view only */
    }
  }

  return (
    <div ref={ref} role="group" aria-label="Colour theme" className="flex items-center gap-1">
      <span className={`${label} mr-2 text-[var(--ev-on-ink-muted)]`}>Theme</span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-pressed={theme === t.id}
          onClick={() => choose(t.id)}
          className={`${mono} border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors ${focus} ${
            theme === t.id
              ? 'border-[var(--ev-on-ink)] bg-[var(--ev-on-ink)] text-[var(--ev-ink)]'
              : 'border-[var(--ev-on-ink-muted)] text-[var(--ev-on-ink)] hover:border-[var(--ev-on-ink)]'
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* WordReveal: heading builds up word by word when it enters the view.  */
/* ------------------------------------------------------------------ */

export function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <h2 className={className}>{text}</h2>
  const words = text.split(' ')
  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ staggerChildren: 0.07 }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '105%', opacity: 0 },
              shown: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.h2>
  )
}

/* ------------------------------------------------------------------ */
/* CountUp: animates the single number in a value string to its final  */
/* value once in view. Strings with zero or several numbers are shown   */
/* unchanged. The final rendered text is always the original string.   */
/* ------------------------------------------------------------------ */

export function CountUp({ value }: { value: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const matches = value.match(/\d[\d,]*(\.\d+)?/g)
  const single = matches && matches.length === 1 ? matches[0] : null
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (reduce || !single || !ref.current) return
    const el = ref.current
    const target = parseFloat(single.replace(/,/g, ''))
    const decimals = single.includes('.') ? single.split('.')[1].length : 0
    const grouped = single.includes(',')
    const fmt = (n: number) => {
      const s = n.toFixed(decimals)
      return grouped ? Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals }) : s
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const dur = 1100
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setShown(p < 1 ? value.replace(single, fmt(target * eased)) : value)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        setShown(value.replace(single, fmt(0)))
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduce, single, value])

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* ClipReveal: opens a block from the bottom edge when it enters view.  */
/* ------------------------------------------------------------------ */

export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(18% 0% 0% 0%)', opacity: 0, y: 40 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
