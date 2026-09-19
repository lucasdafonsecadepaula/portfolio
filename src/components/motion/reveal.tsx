'use client'
import { duration, ease, rise } from '@/lib/motion'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Animate on mount instead of when scrolled into view (for above-the-fold content). */
  immediate?: boolean
  as?: 'div' | 'li' | 'p' | 'span' | 'section' | 'h2' | 'h3'
}

export function Reveal({
  children,
  className,
  delay = 0,
  immediate,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : rise}
      initial="hidden"
      animate={immediate ? 'visible' : undefined}
      whileInView={immediate ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: duration.slow, delay, ease: ease.out }}
    >
      {children}
    </Component>
  )
}
