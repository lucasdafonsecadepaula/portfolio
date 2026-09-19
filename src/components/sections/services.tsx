import { Reveal } from '@/components/motion/reveal'
import { useTranslations } from 'next-intl'
import type { GlyphKey } from './service-glyphs'
import { ServicesList } from './services-list'

const keys: GlyphKey[] = [
  'responsiveDesign',
  'backendSolutions',
  'performance',
  'uxui',
  'webApps',
  'refactoring',
]

export function ServicesSection() {
  const t = useTranslations('Services')
  const items = keys.map((key) => ({
    key,
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
  }))

  return (
    <section
      id="services"
      data-orb="0.04,240,0.36,0.9"
      aria-label={t('eyebrow')}
      className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="eyebrow">04 · {t('eyebrow')}</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight lg:text-[44px]">
                {t('title')}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[17px] leading-relaxed text-muted-foreground">
                {t('subtitle')}
              </p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 lg:pr-12 xl:pr-0">
          <ServicesList items={items} />
        </div>
      </div>
    </section>
  )
}
