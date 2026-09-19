'use client'
import { duration, ease } from '@/lib/motion'
import { timelineData, type TimelineItem } from '@/data/timeline'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Preview = { entry: number; shot: number } | null

export function TimelineList() {
  const t = useTranslations('Timeline')
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const [preview, setPreview] = useState<Preview>(null)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 65%', 'end 65%'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  })
  const fill = useTransform(reduce ? scrollYProgress : smooth, [0, 1], [0, 1])

  return (
    <>
      <ol ref={listRef} className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-0 w-px bg-[var(--line)] md:left-[7px]"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-gradient-to-b from-[var(--violet)] to-[var(--cyan)] md:left-[7px]"
        />
        {timelineData.map((item, i) => (
          <Entry
            key={item.year}
            item={item}
            index={i}
            onOpen={(shot) => setPreview({ entry: i, shot })}
          />
        ))}
      </ol>
      <Lightbox
        preview={preview}
        onChange={setPreview}
        closeLabel={t('close')}
      />
    </>
  )
}

function Entry({
  item,
  index,
  onOpen,
}: {
  item: TimelineItem
  index: number
  onOpen: (shot: number) => void
}) {
  const t = useTranslations('Timeline')
  const dotRef = useRef<HTMLSpanElement>(null)
  const [lit, setLit] = useState(false)
  const { scrollY } = useScroll()

  const check = useCallback(() => {
    const el = dotRef.current
    if (!el) return
    setLit(el.getBoundingClientRect().top < window.innerHeight * 0.65)
  }, [])
  useMotionValueEvent(scrollY, 'change', check)
  useEffect(check, [check])

  return (
    <li
      className="group/entry relative pb-20 pl-9 last:pb-0 md:pl-14 lg:pb-28"
      style={{ ['--accent' as string]: item.accent }}
    >
      <span
        ref={dotRef}
        aria-hidden="true"
        className="absolute left-0 top-[14px] z-10 size-[11px] rounded-full border transition-all duration-700 md:left-0 md:size-[15px]"
        style={{
          background: lit ? item.accent : 'hsl(var(--background))',
          borderColor: lit ? item.accent : 'var(--line-strong)',
          boxShadow: lit
            ? `0 0 0 4px hsl(var(--background)), 0 0 22px 3px ${item.accent}`
            : '0 0 0 4px hsl(var(--background))',
        }}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="font-display text-[64px] font-extrabold leading-none tracking-tight transition-colors duration-700 md:text-[88px]"
            style={{
              color: lit ? 'hsl(var(--foreground))' : 'var(--line-strong)',
            }}
          >
            {item.year}
          </div>
          <h3
            className="mt-4 font-mono text-[15px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: item.accent }}
          >
            {item.company}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('stack')}>
            {item.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-[var(--line-strong)] px-3 py-1 font-mono text-[11.5px] text-muted-foreground transition-colors group-hover/entry:border-[color-mix(in_oklab,var(--accent)_45%,transparent)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </header>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: duration.slow, ease: ease.out }}
        >
          <p className="max-w-[640px] text-[15.5px] leading-[1.75] text-muted-foreground">
            {t(`descriptions.${item.descriptionKey}`)}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
            {item.images.map((src, s) => (
              <Shot
                key={src}
                src={src}
                label={t('open', { company: item.company, n: s + 1 })}
                alt={t('shotAlt', { company: item.company })}
                offset={s === 1}
                index={index}
                onOpen={() => onOpen(s)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </li>
  )
}

function Shot({
  src,
  label,
  alt,
  offset,
  onOpen,
}: {
  src: string
  label: string
  alt: string
  offset: boolean
  index: number
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={`group/shot relative block cursor-zoom-in overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] text-left transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_55%,transparent)] hover:shadow-[0_18px_50px_-18px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${offset ? 'translate-y-4 sm:translate-y-6' : ''}`}
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3 py-2">
        <span className="size-1.5 rounded-full bg-[var(--line-strong)]" />
        <span className="size-1.5 rounded-full bg-[var(--line-strong)]" />
        <span className="size-1.5 rounded-full bg-[var(--line-strong)]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 380px, 45vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.05]"
        />
      </div>
    </button>
  )
}

function Lightbox({
  preview,
  onChange,
  closeLabel,
}: {
  preview: Preview
  onChange: (p: Preview) => void
  closeLabel: string
}) {
  const t = useTranslations('Timeline')
  const ref = useRef<HTMLDialogElement>(null)
  const last = useRef<Preview>(null)
  if (preview) last.current = preview
  const shown = preview ?? last.current

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (preview && !d.open) d.showModal()
    if (!preview && d.open) d.close()
  }, [preview])

  const item = shown ? timelineData[shown.entry] : null
  const move = (dir: number) => {
    if (!preview || !item) return
    const n = item.images.length
    onChange({ ...preview, shot: (preview.shot + dir + n) % n })
  }

  return (
    <dialog
      ref={ref}
      aria-label={item ? `${item.company}` : undefined}
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === ref.current) onChange(null)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') move(1)
        if (e.key === 'ArrowLeft') move(-1)
      }}
      className="m-auto w-[min(1200px,94vw)] max-w-none bg-transparent p-0 text-foreground backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {item && shown && (
        <div
          className="overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-background"
          style={{ boxShadow: `0 30px 120px -30px ${item.accent}` }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-4 py-3">
            <span
              className="font-mono text-xs uppercase tracking-[0.08em]"
              style={{ color: item.accent }}
            >
              {item.company} · {item.year} · {shown.shot + 1}/
              {item.images.length}
            </span>
            <div className="flex items-center gap-2">
              {item.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    aria-label={t('prev')}
                    className="rounded-md border border-[var(--line-strong)] px-2.5 py-1 font-mono text-xs hover:bg-[var(--surface-2)] focus-visible:outline-2 focus-visible:outline-[var(--violet)]"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    aria-label={t('next')}
                    className="rounded-md border border-[var(--line-strong)] px-2.5 py-1 font-mono text-xs hover:bg-[var(--surface-2)] focus-visible:outline-2 focus-visible:outline-[var(--violet)]"
                  >
                    →
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => onChange(null)}
                aria-label={closeLabel}
                autoFocus
                className="rounded-md border border-[var(--line-strong)] px-2.5 py-1 font-mono text-xs hover:bg-[var(--surface-2)] focus-visible:outline-2 focus-visible:outline-[var(--violet)]"
              >
                Esc
              </button>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.images[shown.shot]}
            alt={t('shotAlt', { company: item.company })}
            className="block max-h-[80vh] w-full object-contain"
          />
        </div>
      )}
    </dialog>
  )
}
