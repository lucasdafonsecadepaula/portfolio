'use client'
import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

type Item = { id: string; label: string }

// Derives the list from every [data-orb] section in DOM order, so sections added
// by anyone appear automatically. Label: data-label > aria-label > id.
function readSections(): { el: HTMLElement; item: Item }[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-orb]')).map(
    (el, i) => ({
      el,
      item: {
        id: el.id || `section-${i}`,
        label:
          el.dataset.label ||
          el.getAttribute('aria-label') ||
          el.id ||
          `${i + 1}`,
      },
    }),
  )
}

export function SectionDots() {
  const reduce = useReducedMotion()
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    let sections = readSections()
    setItems(sections.map((s) => s.item))

    const pick = () => {
      const line = window.innerHeight * 0.45
      let idx = 0
      sections.forEach((s, i) => {
        if (s.el.getBoundingClientRect().top <= line) idx = i
      })
      setActive(idx)
    }
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        pick()
      })
    }
    const refresh = () => {
      sections = readSections()
      setItems(sections.map((s) => s.item))
      pick()
    }
    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', refresh)
    const late = window.setTimeout(refresh, 1200)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', refresh)
      window.clearTimeout(late)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (items.length < 2) return null

  const go = (i: number) => {
    const el = readSections()[i]?.el
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-8"
    >
      <ul className="flex flex-col items-end gap-1">
        {items.map((item, i) => {
          const on = i === active
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={item.label}
                aria-current={on ? 'true' : undefined}
                className="group/dot flex cursor-pointer items-center gap-3 rounded py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] outline-none focus-visible:ring-1 focus-visible:ring-[var(--cyan)]"
              >
                <span
                  className={`translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover/dot:translate-x-0 group-hover/dot:opacity-100 group-focus-visible/dot:translate-x-0 group-focus-visible/dot:opacity-100 ${on ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {item.label}
                </span>
                <span
                  className={`tabular-nums transition-colors duration-300 ${on ? 'text-[var(--cyan)]' : 'text-muted-foreground/60 group-hover/dot:text-foreground'}`}
                >
                  {String(i).padStart(2, '0')}
                </span>
                <span
                  className={`h-px origin-right bg-current transition-[width,background-color] duration-300 ${on ? 'w-7 text-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]' : 'w-3 text-[var(--line-strong)] group-hover/dot:w-5 group-hover/dot:text-foreground'}`}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
