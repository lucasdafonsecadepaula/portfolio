'use client'
import { LogoMark } from '@/components/ui/logo-mark'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

export function Header() {
  const t = useTranslations('Header')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname() ?? ''
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'pt'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleLanguage = () => {
    const next = currentLocale === 'en' ? 'pt' : 'en'
    router.push(pathname.replace(`/${currentLocale}`, `/${next}`))
    setOpen(false)
  }

  const linkClass =
    'block font-display text-4xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:text-6xl'

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter] duration-300 ${scrolled ? 'bg-background/70 backdrop-blur-md' : ''}`}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav
          className={`flex items-center justify-between px-5 sm:px-8 lg:px-12 transition-[padding] duration-300 ${scrolled ? 'py-3.5' : 'py-6 lg:py-8'}`}
          aria-label="Global"
        >
          <Link href="/" aria-label="Lucas de Paula">
            <LogoMark />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="flex cursor-pointer items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground"
          >
            {t('menu')}
            <span className="flex flex-col items-end gap-1" aria-hidden="true">
              <span className="h-[1.5px] w-[22px] bg-foreground" />
              <span className="h-[1.5px] w-[14px] bg-foreground" />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 px-5 py-6 backdrop-blur-xl sm:px-8 lg:px-12 lg:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <LogoMark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.12em] text-foreground"
              >
                {t('close')}
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4 sm:gap-6">
              <Link
                href="/curriculum"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {t('curriculum')}
              </Link>
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="#contact"
                className={`${linkClass} grad-text w-fit`}
                onClick={() => setOpen(false)}
              >
                {t('contactMe')}
              </Link>
            </div>
            <button
              type="button"
              onClick={toggleLanguage}
              className="w-fit cursor-pointer font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {currentLocale === 'en' ? 'Português' : 'English'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
