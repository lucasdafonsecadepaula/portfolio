'use client'
import { useEffect, useRef } from 'react'

type Pt = [number, number]
type Trace = { pts: Pt[]; violet?: boolean; speed: number; start: number }

// Corners of each trace. Nodes sit on every corner after the first point and light up
// exactly when the travelling pulse reaches them.
const traces: Trace[] = [
  {
    pts: [
      [40, 70],
      [190, 70],
      [190, 230],
      [370, 230],
    ],
    speed: 95,
    start: 0,
  },
  {
    pts: [
      [486, 44],
      [486, 168],
      [310, 168],
      [310, 330],
    ],
    violet: true,
    speed: 80,
    start: 0.5,
  },
  {
    pts: [
      [60, 352],
      [228, 352],
      [228, 492],
      [428, 492],
      [428, 626],
    ],
    speed: 105,
    start: 1.1,
  },
  {
    pts: [
      [448, 528],
      [268, 528],
      [268, 684],
    ],
    violet: true,
    speed: 90,
    start: 0.3,
  },
  {
    pts: [
      [20, 608],
      [146, 608],
      [146, 726],
    ],
    speed: 85,
    start: 1.8,
  },
]

const blips: Pt[] = [
  [90, 150],
  [500, 450],
  [170, 700],
]

const PULSE = 16
const TAIL = 80

function build(t: Trace) {
  let total = 0
  const cum: number[] = [0]
  for (let i = 1; i < t.pts.length; i++) {
    total +=
      Math.abs(t.pts[i][0] - t.pts[i - 1][0]) +
      Math.abs(t.pts[i][1] - t.pts[i - 1][1])
    cum.push(total)
  }
  return { ...t, total, cum, d: 'M' + t.pts.map((p) => p.join(',')).join(' L') }
}
const model = traces.map(build)

function segDist(p: Pt, a: Pt, b: Pt) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const l2 = dx * dx + dy * dy || 1
  const t = Math.max(
    0,
    Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2),
  )
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
}

export function Circuit() {
  const wrap = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const pulseEls = useRef<(SVGPathElement | null)[]>([])
  const nodeEls = useRef<(SVGGElement | null)[][]>(model.map(() => []))

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !wrap.current || !svg.current) return

    const state = model.map((m) => ({
      pos: -PULSE - m.start * m.speed,
      mult: 1,
    }))
    let mouse: { x: number; y: number } | null = null // svg coords
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let visible = true
    let raf = 0
    let last = performance.now()
    const t0 = last

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !svg.current) return
      const r = svg.current.getBoundingClientRect()
      const s = Math.min(r.width / 520, r.height / 760)
      const ox = r.left + (r.width - 520 * s) / 2
      const oy = r.top + (r.height - 760 * s) / 2
      mouse = { x: (e.clientX - ox) / s, y: (e.clientY - oy) / s }
      tx = (e.clientX / window.innerWidth - 0.5) * -18
      ty = (e.clientY / window.innerHeight - 0.5) * -12
    }
    const onLeave = () => {
      mouse = null
      tx = 0
      ty = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      if (visible) last = performance.now()
    })
    io.observe(wrap.current)

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      // a burst of extra energy on load that settles into the idle rhythm
      const burst = 1 + 3.5 * Math.exp(-(now - t0) / 1400)

      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      wrap.current!.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`

      model.forEach((m, i) => {
        const s = state[i]
        let target = 1
        if (mouse) {
          let d = Infinity
          for (let k = 1; k < m.pts.length; k++)
            d = Math.min(d, segDist([mouse.x, mouse.y], m.pts[k - 1], m.pts[k]))
          target = 1 + 3.2 * Math.max(0, 1 - d / 170)
        }
        s.mult += (target - s.mult) * 0.08
        s.pos += m.speed * s.mult * burst * dt
        if (s.pos > m.total + TAIL + 60 + i * 40)
          s.pos = -PULSE - Math.random() * 90

        const p = pulseEls.current[i]
        if (p) p.style.strokeDashoffset = String(-s.pos)

        for (let k = 1; k < m.pts.length; k++) {
          const el = nodeEls.current[i][k]
          if (!el) continue
          const age = s.pos - m.cum[k]
          const v = age >= 0 && age < TAIL ? (1 - age / TAIL) ** 2 : 0
          const halo = el.firstElementChild as SVGElement
          halo.style.opacity = (v * 0.55).toFixed(3)
          ;(el.lastElementChild as SVGElement).style.opacity = (
            0.3 +
            v * 0.7
          ).toFixed(3)
          el.style.transform = `scale(${(1 + v * 0.5).toFixed(3)})`
        }
      })
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-[15%] z-0 h-[76%] w-full select-none opacity-40 lg:right-[1%] lg:w-[min(44%,580px)] lg:opacity-100"
    >
      <div ref={wrap} className="h-full w-full will-change-transform">
        <svg
          ref={svg}
          viewBox="0 0 520 760"
          className="block h-full w-full overflow-visible"
        >
          {model.map((m, i) => (
            <path
              key={`l${i}`}
              d={m.d}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth={1}
            />
          ))}
          {model.map((m, i) => (
            <path
              key={`p${i}`}
              ref={(el) => {
                pulseEls.current[i] = el
              }}
              d={m.d}
              fill="none"
              stroke={m.violet ? 'var(--violet)' : 'var(--cyan)'}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeDasharray={`${PULSE} 4000`}
              style={{
                strokeDashoffset: PULSE + 10,
                filter: `drop-shadow(0 0 5px ${m.violet ? 'var(--violet)' : 'var(--cyan)'})`,
              }}
            />
          ))}
          {model.map((m, i) =>
            m.pts.slice(1).map((p, j) => {
              const k = j + 1
              return (
                <g
                  key={`n${i}-${k}`}
                  ref={(el) => {
                    nodeEls.current[i][k] = el
                  }}
                  style={{
                    color: m.violet ? 'var(--violet)' : 'var(--cyan)',
                    transformOrigin: `${p[0]}px ${p[1]}px`,
                  }}
                >
                  <circle
                    cx={p[0]}
                    cy={p[1]}
                    r={11}
                    fill="currentColor"
                    style={{ opacity: 0 }}
                  />
                  <circle
                    cx={p[0]}
                    cy={p[1]}
                    r={3.5}
                    fill="currentColor"
                    style={{ opacity: 0.3 }}
                  />
                </g>
              )
            }),
          )}
          {blips.map(([x, y], i) => (
            <circle
              key={`b${i}`}
              className="circuit-blip"
              cx={x}
              cy={y}
              r={2.5}
              style={{ animationDelay: `${i * 1.4}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
