'use client'
import { useEffect, useRef } from 'react'

// Sections register themselves with data-orb="x,y,opacity,scale[,tint]":
//   x: fraction of page width (orb centre), y: px below the section's top (orb centre)
//   opacity / scale: resting look; tint: 0 = violet .. 1 = cyan (optional, default 0)
// e.g. <section id="about" data-orb="0.86,260,0.34,0.85,0.3">. Document order = travel order.
//
// The orb lives in the page layout (absolute, scrolls with content). It only travels when a
// new section takes over the viewport, driven by a small spring simulation so it can squash and
// stretch along its velocity, drag a cyan trail behind it and overshoot when it settles.
// Everything is transform/opacity; the rAF loop sleeps while the orb rests.

type Anchor = {
  el: HTMLElement
  x: number
  y: number
  opacity: number
  scale: number
  tint: number
}

const num = (v: number | undefined, d: number) =>
  v === undefined || Number.isNaN(v) ? d : v
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

// Spring constants (stiffness, damping). Core is slightly under-damped for a soft overshoot;
// the trail is looser so it lags visibly behind.
const CORE = { k: 24, c: 7.4 }
const TRAIL = { k: 14, c: 6.4 }

export function PageOrb() {
  const coreRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const core = coreRef.current!
    const trail = trailRef.current!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    let anchors: Anchor[] = []
    let index = -1
    let ready = false

    // Simulation state
    const c = { x: 0, y: 0, vx: 0, vy: 0 }
    const t = { x: 0, y: 0, vx: 0, vy: 0 }
    const look = { opacity: 0, scale: 1, tint: 0 }
    const goal = { x: 0, y: 0, opacity: 0, scale: 1, tint: 0 }
    let angle = 0
    let frame = 0
    let last = 0
    let scrollFrame = 0

    const measure = () => {
      anchors = Array.from(
        document.querySelectorAll<HTMLElement>('[data-orb]'),
      ).map((el) => {
        const [x, y, opacity, scale, tint] = el.dataset
          .orb!.split(',')
          .map((s) => parseFloat(s))
        return {
          el,
          x: num(x, 0.5),
          y: num(y, 0),
          opacity: num(opacity, 0.4),
          scale: num(scale, 1),
          tint: num(tint, 0),
        }
      })
    }

    // Size factor: smaller and dimmer on narrow screens so text stays readable.
    const responsive = () => {
      const w = document.documentElement.clientWidth
      return w < 640
        ? { size: 0.62, fade: 0.7 }
        : w < 1024
          ? { size: 0.85, fade: 0.9 }
          : { size: 1, fade: 1 }
    }

    const setGoal = () => {
      const a = anchors[index]
      if (!a) return
      const r = responsive()
      const top = a.el.getBoundingClientRect().top + window.scrollY
      goal.x = a.x * document.documentElement.clientWidth
      goal.y = top + a.y
      goal.opacity = a.opacity * r.fade
      goal.scale = a.scale * r.size
      goal.tint = a.tint
    }

    const paint = (stretch: number, dist: number) => {
      const deg = (angle * 180) / Math.PI
      core.style.transform = `translate3d(${c.x}px,${c.y}px,0) rotate(${deg}deg) scale(${look.scale * (1 + stretch)},${look.scale * (1 - stretch * 0.45)})`
      core.style.opacity = String(look.opacity)
      core.style.setProperty('--tint', look.tint.toFixed(3))
      const tp = clamp(dist / 300, 0, 1)
      trail.style.transform = `translate3d(${t.x}px,${t.y}px,0) scale(${look.scale * (0.55 + 0.25 * tp)})`
      trail.style.opacity = String(look.opacity * 1.2 * tp)
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30)
      last = now

      // semi-implicit Euler springs
      c.vx += (CORE.k * (goal.x - c.x) - CORE.c * c.vx) * dt
      c.vy += (CORE.k * (goal.y - c.y) - CORE.c * c.vy) * dt
      c.x += c.vx * dt
      c.y += c.vy * dt
      t.vx += (TRAIL.k * (c.x - t.x) - TRAIL.c * t.vx) * dt
      t.vy += (TRAIL.k * (c.y - t.y) - TRAIL.c * t.vy) * dt
      t.x += t.vx * dt
      t.y += t.vy * dt

      const ease = 1 - Math.exp(-dt * 3.2)
      look.opacity += (goal.opacity - look.opacity) * ease
      look.scale += (goal.scale - look.scale) * ease
      look.tint += (goal.tint - look.tint) * ease

      const speed = Math.hypot(c.vx, c.vy)
      if (speed > 40) angle = Math.atan2(c.vy, c.vx)
      const stretch = clamp(speed / 3000, 0, 0.32)
      const dist = Math.hypot(c.x - t.x, c.y - t.y)
      paint(stretch, dist)

      const resting =
        speed < 0.5 &&
        Math.hypot(t.vx, t.vy) < 0.5 &&
        Math.hypot(goal.x - c.x, goal.y - c.y) < 0.3 &&
        Math.hypot(c.x - t.x, c.y - t.y) < 0.3 &&
        Math.abs(goal.opacity - look.opacity) < 0.002 &&
        Math.abs(goal.scale - look.scale) < 0.002 &&
        Math.abs(goal.tint - look.tint) < 0.002
      if (resting) {
        Object.assign(c, { x: goal.x, y: goal.y, vx: 0, vy: 0 })
        Object.assign(t, { x: goal.x, y: goal.y, vx: 0, vy: 0 })
        Object.assign(look, {
          opacity: goal.opacity,
          scale: goal.scale,
          tint: goal.tint,
        })
        paint(0, 0)
        frame = 0
        return
      }
      frame = requestAnimationFrame(step)
    }

    const wake = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(step)
    }

    const jump = () => {
      Object.assign(c, { x: goal.x, y: goal.y, vx: 0, vy: 0 })
      Object.assign(t, { x: goal.x, y: goal.y, vx: 0, vy: 0 })
      Object.assign(look, {
        opacity: goal.opacity,
        scale: goal.scale,
        tint: goal.tint,
      })
      paint(0, 0)
    }

    const retarget = () => {
      setGoal()
      if (!ready) {
        jump()
        ready = true
      } else if (reduce.matches) jump()
      else wake()
    }

    // Move only when a new section takes over the viewport; otherwise the orb
    // stays put in the layout and scrolls with the page.
    const pick = () => {
      const line = window.innerHeight * 0.55
      let next = 0
      for (let i = 0; i < anchors.length; i++) {
        if (anchors[i].el.getBoundingClientRect().top <= line) next = i
      }
      if (next !== index && anchors[next]) {
        index = next
        retarget()
      }
    }

    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        pick()
      })
    }

    // Layout changed (resize, images/fonts loaded): re-read anchors, re-aim without changing section.
    let layoutFrame = 0
    const onLayout = () => {
      if (layoutFrame) return
      layoutFrame = requestAnimationFrame(() => {
        layoutFrame = 0
        measure()
        if (index === -1) pick()
        else if (anchors[index]) retarget()
        else {
          index = -1
          pick()
        }
      })
    }

    measure()
    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onLayout, { passive: true })
    const observer = new ResizeObserver(onLayout)
    observer.observe(document.body)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onLayout)
      observer.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(scrollFrame)
      cancelAnimationFrame(layoutFrame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div ref={trailRef} className="orb-trail" />
      <div ref={coreRef} className="orb" />
    </div>
  )
}
