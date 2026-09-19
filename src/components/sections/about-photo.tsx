'use client'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import Image from 'next/image'
import type { PointerEvent } from 'react'

export function AboutPhoto({
  alt,
  location,
}: {
  alt: string
  location: string
}) {
  const reduce = useReducedMotion()
  const rx = useSpring(0, { stiffness: 140, damping: 18 })
  const ry = useSpring(0, { stiffness: 140, damping: 18 })
  const hx = useMotionValue(50)
  const hy = useMotionValue(30)
  const hlOpacity = useSpring(0, { stiffness: 120, damping: 20 })
  const highlight = useMotionTemplate`radial-gradient(360px circle at ${hx}% ${hy}%, rgba(190,170,255,0.28), transparent 60%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10)
    rx.set((0.5 - py) * 10)
    hx.set(px * 100)
    hy.set(py * 100)
    hlOpacity.set(1)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    hlOpacity.set(0)
  }

  return (
    <div
      className="relative [perspective:1000px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="relative"
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      >
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[var(--violet)]/20 to-[var(--cyan)]/15 blur-[34px]"
        />
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line-strong)]">
          <Image
            src="/profile-image.png"
            alt={alt}
            width={480}
            height={600}
            priority={false}
            className="aspect-[4/5] w-full object-cover"
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: highlight, opacity: hlOpacity }}
          />
        </div>
        <div
          className="absolute -bottom-[18px] right-0 flex items-center gap-2.5 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-[18px] py-3 font-mono text-xs text-muted-foreground sm:-right-8"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="relative flex size-[7px]">
            <span
              className={`absolute inset-0 rounded-full bg-green-400 ${reduce ? '' : 'animate-ping'} opacity-70`}
            />
            <span className="relative size-[7px] rounded-full bg-green-400" />
          </span>
          {location}
        </div>
      </motion.div>
    </div>
  )
}
