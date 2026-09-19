import { BackToTop } from '@/components/layout/back-to-top'
import { useTranslations } from 'next-intl'

const socials = [
  { label: 'GitHub', href: 'https://github.com/lucasdafonsecadepaula' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucas-da-fonseca-de-paula/',
  },
]

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)]">
      <div className="px-5 pt-14 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <BackToTop label={t('backToTop')} />
          <ul className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.12em]">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/s relative inline-block rounded py-1 text-foreground outline-none focus-visible:ring-1 focus-visible:ring-[var(--cyan)]"
                >
                  {s.label} <span aria-hidden="true">↗</span>
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] transition-transform duration-500 group-hover/s:scale-x-100 group-focus-visible/s:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mt-10 select-none whitespace-nowrap px-3 text-center font-display text-[12vw] font-extrabold leading-[0.82] tracking-tight text-transparent [-webkit-text-stroke:1px_var(--line-strong)] sm:px-6"
      >
        LUCAS DE PAULA
      </div>

      <div className="relative px-5 py-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-2 border-t border-[var(--line)] pt-5 font-mono text-[12.5px] text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Lucas de Paula</p>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
