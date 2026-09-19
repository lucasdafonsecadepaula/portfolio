'use client'
import { Reveal } from '@/components/motion/reveal'
import { duration, ease } from '@/lib/motion'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type Principle = { title: string; body: string; seen: string[] }
const KEYS = ['components', 'simple', 'accessible', 'fast', 'product'] as const

export function PrinciplesSection() {
  const t = useTranslations('Principles')
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  return (
    <section
      id="principles"
      data-orb="0.94,240,0.34,0.9"
      aria-label={t('eyebrow')}
      className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="eyebrow mb-5">
            {t('number')} · {t('eyebrow')}
          </div>
          <h2 className="mb-14 max-w-[760px] font-display text-4xl font-bold leading-[1.08] tracking-tight lg:mb-20 lg:text-[44px]">
            {t('title')}
          </h2>
        </Reveal>

        <ul className="border-t border-[var(--line-strong)]">
          {KEYS.map((key, i) => {
            const p = t.raw(`items.${key}`) as Principle
            const open = active === i
            const id = `principle-${key}`
            return (
              <li key={key} className="border-b border-[var(--line-strong)]">
                <button
                  type="button"
                  id={`${id}-btn`}
                  aria-expanded={open}
                  aria-controls={`${id}-panel`}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) =>
                    e.pointerType === 'mouse' && setActive(i)
                  }
                  onFocus={() => setActive(i)}
                  className="group grid w-full cursor-pointer grid-cols-[auto_1fr] items-baseline gap-x-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--violet)] sm:gap-x-10 sm:py-8 lg:grid-cols-[80px_1fr_auto]"
                >
                  <span
                    className={`font-mono text-[13px] tracking-[0.08em] transition-colors duration-300 ${open ? 'text-[var(--cyan)]' : 'text-muted-foreground'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-[clamp(1.9rem,5.4vw,4rem)] font-bold leading-[1.02] tracking-tight transition-[color,transform] duration-500 ${
                      open
                        ? 'grad-text translate-x-2 sm:translate-x-4'
                        : 'text-foreground/35 group-hover:text-foreground/60'
                    }`}
                  >
                    {p.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`hidden font-mono text-2xl transition-transform duration-500 lg:block ${open ? 'rotate-45 text-[var(--violet)]' : 'text-muted-foreground'}`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`${id}-panel`}
                      role="region"
                      aria-labelledby={`${id}-btn`}
                      initial={
                        reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }
                      }
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: duration.base, ease: ease.out }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-9 pl-10 sm:pl-[60px] lg:grid-cols-[80px_minmax(0,560px)_1fr] lg:gap-10 lg:pl-0">
                        <span className="hidden lg:block" />
                        <p className="text-[17px] leading-[1.75] text-muted-foreground">
                          {p.body}
                        </p>
                        <ul
                          aria-label={t('seenIn')}
                          className="flex flex-wrap content-start gap-2 lg:justify-end"
                        >
                          {p.seen.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-muted-foreground"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
