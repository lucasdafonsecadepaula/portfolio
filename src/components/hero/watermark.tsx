'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

/** Outlined "LP" that drifts against the scroll so the hero feels layered. */
export function Watermark() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -110])
  const x = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 60])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute right-[-2%] top-1/2 z-0 -translate-y-[52%] select-none"
    >
      <motion.div
        style={{ x, y }}
        className="font-display text-[58vw] font-extrabold leading-none text-transparent opacity-40 [-webkit-text-stroke:1px_var(--line-strong)] lg:text-[46vw] lg:opacity-60"
      >
        LP
      </motion.div>
    </div>
  )
}
