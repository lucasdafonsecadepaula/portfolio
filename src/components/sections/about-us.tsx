import { Reveal } from '@/components/motion/reveal'
import { useTranslations } from 'next-intl'
import { AboutPhoto } from './about-photo'
import { WordReveal } from './word-reveal'

type Fact = { label: string; value: string }

export function AboutMeSection() {
  const t = useTranslations('About')
  const [lead, ...rest] = t.raw('bio') as string[]
  const facts = t.raw('facts') as Fact[]

  return (
    <section
      id="about"
      data-orb="0.9,520,0.34,0.85"
      aria-label={t('title')}
      className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-12 lg:py-36"
    >
      {/* oversized outline numeral */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-16 select-none font-display text-[clamp(200px,32vw,460px)] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--line)] lg:top-10"
      >
        01
      </div>

      <div className="relative mx-auto max-w-[1180px]">
        <Reveal>
          <div className="eyebrow mb-6">01 · {t('title')}</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-[860px] font-display text-[clamp(38px,6.2vw,84px)] font-bold leading-[1] tracking-tight">
            {t('subtitle')}
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-16 lg:mt-[-24px] lg:grid-cols-12 lg:gap-8">
          <Reveal className="mx-auto w-full max-w-[340px] lg:col-span-5 lg:mx-0 lg:mt-24 lg:max-w-[400px]">
            <AboutPhoto alt={t('photoAlt')} location={t('location')} />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:mt-56">
            <WordReveal
              text={lead}
              className="font-display text-2xl font-medium leading-[1.35] tracking-tight text-foreground sm:text-[28px]"
            />
            <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-muted-foreground">
              {rest.map((p, i) => (
                <Reveal key={i} as="p" delay={0.05 * i}>
                  {p}
                </Reveal>
              ))}
            </div>

            <dl className="mt-12 grid border-t border-[var(--line-strong)] font-mono text-xs">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[96px_1fr] gap-4 border-b border-[var(--line)] py-3.5 sm:grid-cols-[120px_1fr]"
                >
                  <dt className="uppercase tracking-[0.1em] text-[var(--violet)]">
                    {f.label}
                  </dt>
                  <dd className="text-foreground/90">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
