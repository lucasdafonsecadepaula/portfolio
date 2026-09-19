'use client'
import { animate, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

const KEY = 'lp-intro-seen'
const CLS = 'intro-pending'

// SSR renders a hidden overlay. A tiny inline script (before first paint) flags
// <html> when this session hasn't seen the intro; CSS then shows the overlay.
// No JS / crawlers never get the flag, so content is never blocked. A CSS
// animation fallback also removes the overlay if hydration never happens.
const bootScript = `try{if(!sessionStorage.getItem('${KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('${CLS}')}catch(e){}`

export function Intro() {
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const html = document.documentElement
    const done = () => {
      html.classList.remove(CLS)
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {}
    }
    if (!html.classList.contains(CLS) || reduce) {
      done()
      return
    }
    const el = root.current
    if (!el) return
    const stroke = el.querySelector('rect')
    const letters = el.querySelector('.intro-lp')
    const controls = [
      animate(
        stroke!,
        { strokeDashoffset: [1, 0] },
        { duration: 0.6, ease: [0.65, 0, 0.2, 1] },
      ),
      animate(
        letters!,
        { opacity: [0, 1], y: [6, 0] },
        { duration: 0.35, delay: 0.4, ease: [0.2, 0.7, 0.2, 1] },
      ),
      animate(
        el,
        { opacity: [1, 0] },
        { duration: 0.35, delay: 0.85, ease: 'easeOut' },
      ),
    ]
    const timer = window.setTimeout(done, 1200)
    return () => {
      controls.forEach((c) => c.stop())
      window.clearTimeout(timer)
    }
  }, [reduce])

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <div
        ref={root}
        aria-hidden="true"
        className="intro-overlay pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background"
      >
        <div className="relative size-[76px]">
          <svg
            viewBox="0 0 76 76"
            className="absolute inset-0 size-full overflow-visible"
          >
            <rect
              x="1"
              y="1"
              width="74"
              height="74"
              rx="17"
              fill="none"
              stroke="var(--violet)"
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              style={{ filter: 'drop-shadow(0 0 8px var(--violet))' }}
            />
          </svg>
          <span className="intro-lp absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-white opacity-0 [text-shadow:0_0_14px_var(--violet)]">
            LP
          </span>
        </div>
      </div>
    </>
  )
}
