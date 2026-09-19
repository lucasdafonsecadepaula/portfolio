'use client'
import { ease } from '@/lib/motion'
import { motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type PointerEvent } from 'react'
import { ServiceGlyph, type GlyphKey } from './service-glyphs'

export type ServiceItem = { key: GlyphKey; title: string; description: string }

export function ServicesList({ items }: { items: ServiceItem[] }) {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLUListElement>(null)
  const reduce = useReducedMotion()

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
    ref.current.style.setProperty('--spot', '1')
  }
  const onLeave = () => ref.current?.style.setProperty('--spot', '0')

  return (
    <ul
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative border-t border-[var(--line-strong)]"
    >
      {/* cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[var(--spot,0)] transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--violet) 14%, transparent), transparent 70%)',
        }}
      />
      {items.map((item, i) => {
        const isActive = active === i
        return (
          <motion.li
            key={item.key}
            className="group relative border-b border-[var(--line)]"
            data-active={isActive}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: ease.out }}
          >
            {/* animated hairline */}
            <span
              aria-hidden="true"
              className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.7,.2,1)] group-data-[active=true]:scale-x-100"
            />
            <button
              type="button"
              id={`service-btn-${item.key}`}
              aria-expanded={isActive}
              aria-controls={`service-panel-${item.key}`}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-0 rounded-sm py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--violet)] sm:grid-cols-[64px_1fr_56px] sm:gap-x-6 sm:py-7"
            >
              <span className="pt-1.5 font-mono text-xs tracking-[0.1em] text-muted-foreground transition-colors group-data-[active=true]:text-[var(--violet)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="block">
                <span className="block font-display text-xl font-semibold leading-snug tracking-tight text-foreground/70 transition-[color,transform] duration-500 group-data-[active=true]:text-foreground sm:text-[26px]">
                  {item.title}
                </span>
                <span
                  id={`service-panel-${item.key}`}
                  role="region"
                  aria-labelledby={`service-btn-${item.key}`}
                  className="grid grid-rows-[0fr] transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(.2,.7,.2,1)] opacity-0 group-data-[active=true]:grid-rows-[1fr] group-data-[active=true]:opacity-100 motion-reduce:transition-none"
                >
                  <span className="block overflow-hidden">
                    <span className="block max-w-[520px] pt-3 text-[15px] leading-[1.7] text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                </span>
              </span>
              <span
                className={`size-10 text-muted-foreground transition-colors duration-500 group-data-[active=true]:text-[var(--cyan)] sm:size-12 ${reduce ? '' : ''}`}
              >
                <ServiceGlyph name={item.key} />
              </span>
            </button>
          </motion.li>
        )
      })}
    </ul>
  )
}
