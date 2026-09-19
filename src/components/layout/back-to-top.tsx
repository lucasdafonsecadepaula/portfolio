'use client'
import { LogoMark } from '@/components/ui/logo-mark'
import { useReducedMotion } from 'motion/react'

export function BackToTop({ label }: { label: string }) {
  const reduce = useReducedMotion()
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }
      className="group/logo logo-idle flex cursor-pointer items-center gap-4 rounded-[9px] text-left outline-none focus-visible:ring-1 focus-visible:ring-[var(--cyan)]"
    >
      <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] group-hover/logo:-translate-y-1.5">
        <LogoMark size={48} className="text-base" />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover/logo:text-foreground">
        {label} ↑
      </span>
    </button>
  )
}
