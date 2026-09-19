import { Circuit } from '@/components/hero/circuit'
import { Status } from '@/components/hero/status'
import { Watermark } from '@/components/hero/watermark'
import { Magnetic } from '@/components/motion/magnetic'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

/** Words rise out of a clipped line. Pure CSS so it runs on first paint (SSR) with no layout shift. */
function MaskedLine({
  text,
  delay,
  className,
  wordClassName,
}: {
  text: string
  delay: number
  className: string
  wordClassName?: string
}) {
  return (
    <span className={`block ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i}>
          {i > 0 ? ' ' : null}
          <span className="mask-word">
            <span
              className={`mask-word-inner ${wordClassName ?? ''}`}
              style={{ animationDelay: `${delay + i * 0.07}s` }}
            >
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const t = useTranslations('Hero')

  return (
    <section
      id="hero"
      data-orb="0.04,80,0.5,1"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-56 -right-40 h-[520px] w-[520px] rounded-full bg-[var(--cyan)] opacity-30 blur-[90px]" />
        <div className="grid-overlay absolute inset-0 opacity-30" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_100%_80%_at_30%_30%,transparent_20%,hsl(var(--background))_96%)]" />
      </div>

      <Watermark />
      <Circuit />

      <div className="hero-fade relative z-10 flex flex-col gap-4 px-5 pt-24 sm:px-8 sm:pt-28 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:pt-32">
        <div className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="block h-px w-7 bg-[var(--violet)]" />
          {t('kicker')}
        </div>
        <Status location={t('location')} status={t('status')} />
      </div>

      <h1 className="relative z-10 px-5 pt-5 font-display sm:px-8 lg:px-12">
        <MaskedLine
          text={t('line1')}
          delay={0.1}
          className="text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-muted-foreground sm:text-4xl lg:text-[52px]"
        />
        <MaskedLine
          text={t('line2')}
          delay={0.25}
          className="text-[44px] font-bold leading-none tracking-[-0.03em] sm:text-6xl lg:text-[88px]"
        />
        <MaskedLine
          text={t('line3')}
          delay={0.4}
          wordClassName="grad-text"
          className="pb-2 text-[72px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[104px] lg:text-[150px]"
        />
      </h1>

      <div
        className="hero-fade relative z-10 flex flex-col items-start gap-7 px-5 pb-10 pt-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-12 lg:pb-14 lg:pt-16"
        style={{ animationDelay: '0.6s' }}
      >
        <p className="max-w-[320px] text-base leading-[1.7] text-muted-foreground">
          {t('description')}
        </p>

        <Link
          href="#about"
          className="group hidden shrink-0 flex-col items-center gap-2.5 rounded font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--violet)] lg:flex"
        >
          <span>{t('learnMore')}</span>
          <span className="scroll-drip relative block h-11 w-px overflow-hidden bg-gradient-to-b from-muted-foreground to-transparent" />
        </Link>

        <Magnetic strength={0.25} className="w-full sm:w-auto">
          <Link
            href="#contact"
            className="apple-button group w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--violet)] sm:w-auto"
          >
            {t('getInTouch')}
            <span className="relative block size-[17px] overflow-hidden">
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 size-full fill-none stroke-current stroke-[1.8] transition-transform duration-300 ease-out group-hover:translate-x-[160%]"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 size-full -translate-x-[160%] fill-none stroke-current stroke-[1.8] transition-transform duration-300 ease-out group-hover:translate-x-0"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  )
}
