import { Reveal } from '@/components/motion/reveal'
import { useTranslations } from 'next-intl'
import { TimelineList } from './timeline-list'

export function TimelineSection() {
  const t = useTranslations('Timeline')

  return (
    <section
      id="experience"
      data-orb="0.02,520,0.4,1.05"
      aria-label={t('eyebrow')}
      className="relative border-y border-[var(--line)] bg-card/50 px-5 py-28 sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mb-16 flex max-w-[640px] flex-col gap-5 lg:mb-20">
          <div className="eyebrow">02 · {t('eyebrow')}</div>
          <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight lg:text-[44px]">
            {t('title')}
          </h2>
          <p className="text-[17px] leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </Reveal>
        <TimelineList />
      </div>
    </section>
  )
}
