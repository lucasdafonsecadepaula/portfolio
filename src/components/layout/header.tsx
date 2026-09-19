'use client'
import { LogoMark } from '@/components/ui/logo-mark'
import { duration, ease } from '@/lib/motion'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const externalLinks = [
  {
    label: 'Figma',
    href: 'https://www.figma.com/design/nf1uTbPuCtqYPNl81ECWPt/Inpirations?node-id=0-1',
  },
  { label: 'GitHub', href: 'https://github.com/lucasdafonsecadepaula' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucas-da-fonseca-de-paula/',
  },
]

const FOCUSABLE = 'a[href], button:not([disabled])'

export function Header() {
  const t = useTranslations('Header')
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname() ?? ''
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'pt'
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    // Hide when scrolling down past the fold, come back on any upward scroll.
    if (y > prev && y > 480) setHidden(true)
    else if (y < prev - 2 || y < 480) setHidden(false)
  })

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const opener = triggerRef.current
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setOpen(false)
      if (e.key !== 'Tab' || !dialog) return
      const els = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    dialog?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [open])

  const toggleLanguage = () => {
    const next = currentLocale === 'en' ? 'pt' : 'en'
    setOpen(false)
    // let the overlay fade before the route swaps the copy underneath it
    window.setTimeout(
      () => router.push(pathname.replace(`/${currentLocale}`, `/${next}`)),
      reduce ? 0 : 260,
    )
  }

  const close = () => setOpen(false)

  const linkBase =
    'group/link relative inline-flex w-fit items-baseline gap-4 py-1 font-display text-[clamp(2.4rem,9vw,5.6rem)] font-semibold leading-[1.02] tracking-tight text-foreground outline-none transition-opacity duration-300 focus-visible:text-[var(--cyan)]'
  const underline =
    'pointer-events-none absolute inset-x-0 bottom-1 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100'

  type Row = {
    key: string
    label: string
    href: string
    external?: boolean
    grad?: boolean
  }
  const rows: Row[] = [
    { key: 'cv', label: t('curriculum'), href: '/curriculum' },
    ...externalLinks.map((l) => ({
      key: l.label,
      label: l.label,
      href: l.href,
      external: true,
    })),
    { key: 'contact', label: t('contactMe'), href: '#contact', grad: true },
  ]

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${scrolled ? 'border-b border-[var(--line)] bg-background/70 backdrop-blur-md' : 'border-b border-transparent'}`}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: hidden ? duration.fast : 0.5, ease: ease.out }}
      >
        <nav
          className={`flex items-center justify-between px-5 transition-[padding] duration-300 sm:px-8 lg:px-12 ${scrolled ? 'py-3' : 'py-6 lg:py-8'}`}
          aria-label="Global"
        >
          <Link
            href="/"
            aria-label="Lucas de Paula"
            className="group/logo logo-idle rounded-[9px] outline-none focus-visible:ring-1 focus-visible:ring-[var(--cyan)]"
          >
            <LogoMark />
          </Link>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="group/menu flex cursor-pointer items-center gap-3 rounded font-mono text-xs uppercase tracking-[0.12em] text-foreground outline-none focus-visible:ring-1 focus-visible:ring-[var(--cyan)]"
          >
            {t('menu')}
            <span className="flex flex-col items-end gap-1" aria-hidden="true">
              <span className="h-[1.5px] w-[22px] bg-foreground transition-[width] duration-300 group-hover/menu:w-[14px]" />
              <span className="h-[1.5px] w-[14px] bg-foreground transition-[width] duration-300 group-hover/menu:w-[22px]" />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background/95 px-5 py-6 backdrop-blur-xl sm:px-8 lg:px-12 lg:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <span className="logo-idle inline-flex">
                <LogoMark />
              </span>
              <button
                type="button"
                onClick={close}
                className="group/close flex cursor-pointer items-center gap-3 rounded font-mono text-xs uppercase tracking-[0.12em] text-foreground outline-none focus-visible:ring-1 focus-visible:ring-[var(--cyan)]"
              >
                {t('close')}
                <span className="relative size-[18px]" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full rotate-45 bg-foreground transition-transform duration-300 group-hover/close:rotate-[135deg]" />
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -rotate-45 bg-foreground transition-transform duration-300 group-hover/close:-rotate-[135deg]" />
                </span>
              </button>
            </div>

            <ul
              className="my-auto flex flex-col gap-1 py-10 sm:gap-2"
              onMouseLeave={() => setHovered(null)}
            >
              {rows.map((row, i) => {
                const cls = `${linkBase} ${hovered !== null && hovered !== i ? 'opacity-30' : ''}`
                const inner = (
                  <>
                    <span
                      className="font-mono text-xs font-medium tracking-[0.12em] text-[var(--violet)]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={row.grad ? 'grad-text pb-1' : ''}>
                      {row.label}
                    </span>
                    {row.external && (
                      <span
                        aria-hidden="true"
                        className="self-center font-mono text-2xl text-muted-foreground opacity-0 transition-[opacity,transform] duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-hover/link:opacity-100"
                      >
                        ↗
                      </span>
                    )}
                    <span className={underline} aria-hidden="true" />
                  </>
                )
                return (
                  <li key={row.key} className="overflow-hidden">
                    <motion.div
                      initial={reduce ? false : { y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: ease.out,
                        delay: 0.08 + i * 0.07,
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                    >
                      {row.external ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cls}
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link href={row.href} className={cls} onClick={close}>
                          {inner}
                        </Link>
                      )}
                    </motion.div>
                  </li>
                )
              })}
            </ul>

            <motion.div
              className="flex items-center justify-between gap-6 border-t border-[var(--line)] pt-5 font-mono text-xs uppercase tracking-[0.12em]"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className="flex items-center gap-3"
                role="group"
                aria-label={t('language')}
              >
                {(['en', 'pt'] as const).map((l, i) => (
                  <span key={l} className="flex items-center gap-3">
                    {i > 0 && (
                      <span
                        className="h-3 w-px bg-[var(--line-strong)]"
                        aria-hidden="true"
                      />
                    )}
                    <button
                      type="button"
                      onClick={currentLocale === l ? undefined : toggleLanguage}
                      aria-pressed={currentLocale === l}
                      lang={l}
                      className={`cursor-pointer rounded outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[var(--cyan)] ${currentLocale === l ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {l}
                    </button>
                  </span>
                ))}
              </div>
              <a
                href="mailto:lucasdafonsecadepaula@gmail.com"
                className="hidden rounded normal-case tracking-normal text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-[var(--cyan)] sm:block"
              >
                lucasdafonsecadepaula@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
