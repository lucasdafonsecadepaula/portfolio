'use client'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

// Sections register themselves with data-orb="x,y,opacity,scale":
//   x: fraction of page width (orb centre), y: px below the section's top (orb centre)
// e.g. <section id="about" data-orb="0.86,260,0.34,0.85">. Document order = travel order.
const SIZE = 560

type Placement = { x: number; y: number; opacity: number; scale: number }

export function PageOrb() {
  const reduceMotion = useReducedMotion()
  const [placement, setPlacement] = useState<Placement | null>(null)
  const current = useRef(-1)

  useEffect(() => {
    const read = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-orb]')).map((el) => {
        const [x, y, opacity, scale] = el.dataset.orb!.split(',').map(Number)
        return { el, x, y, opacity, scale }
      })

    const place = (index: number) => {
      const anchor = read()[index]
      if (!anchor) return
      const top = anchor.el.getBoundingClientRect().top + window.scrollY
      setPlacement({
        x: anchor.x * document.documentElement.clientWidth - SIZE / 2,
        y: top + anchor.y - SIZE / 2,
        opacity: anchor.opacity,
        scale: anchor.scale,
      })
      current.current = index
    }

    // Move only when a new section takes over the viewport; otherwise the orb
    // stays put in the layout and scrolls with the page.
    const pick = () => {
      const line = window.innerHeight * 0.55
      let index = 0
      read().forEach((anchor, i) => {
        if (anchor.el.getBoundingClientRect().top <= line) index = i
      })
      if (index !== current.current) place(index)
    }

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        pick()
      })
    }
    const onResize = () => place(Math.max(current.current, 0))

    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const observer = new ResizeObserver(onResize)
    observer.observe(document.body)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      className="orb"
      style={{ top: 0, left: 0 }}
      initial={false}
      animate={
        placement ?? { x: -120, y: -160, opacity: 0.5, scale: 1 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 1.5, ease: [0.65, 0, 0.2, 1] }
      }
    />
  )
}
