import * as motion from 'motion/react-client'
import { useTranslations } from 'next-intl'

const keys = [
  'responsiveDesign',
  'backendSolutions',
  'performance',
  'uxui',
  'webApps',
  'refactoring',
] as const

export function ServicesSection() {
  const t = useTranslations('Services')

  return (
    <section id="services" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-16 flex max-w-[640px] flex-col gap-5">
          <div className="eyebrow">03 · Services</div>
          <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight lg:text-[44px]">
            {t('title')}
          </h2>
          <p className="text-[17px] leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, index) => (
            <motion.div
              key={key}
              className="flex flex-col gap-5 bg-card p-9 transition-colors hover:bg-[var(--surface-2)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
            >
              <span className="font-mono text-xs tracking-[0.1em] text-[var(--violet)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold leading-snug">
                {t(`services.${key}.title`)}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-muted-foreground">
                {t(`services.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
