import { timelineData } from '@/data/timeline'
import * as motion from 'motion/react-client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function TimelineSection() {
  const t = useTranslations('Timeline')

  return (
    <section
      id="experience"
      className="relative border-y border-[var(--line)] bg-card/50 px-5 py-28 sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-16 flex max-w-[640px] flex-col gap-5">
          <div className="eyebrow">02 · Experience</div>
          <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight lg:text-[44px]">
            {t('title')}
          </h2>
          <p className="text-[17px] leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-3 top-3 hidden w-px bg-gradient-to-b from-[var(--line-strong)] to-[var(--line)] md:left-[130px] md:block"
          />
          {timelineData.map((item) => (
            <motion.li
              key={item.year}
              className="grid gap-3 border-b border-[var(--line)] py-11 last:border-b-0 md:grid-cols-[130px_1fr] md:gap-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative pt-1 font-mono text-[15px] font-semibold text-muted-foreground">
                {item.year}
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-2 hidden size-[9px] rounded-full bg-[var(--violet)] shadow-[0_0_0_4px_hsl(var(--background)),0_0_16px_2px_var(--violet)] md:left-[126px] md:block"
                />
              </div>
              <div className="grid items-start gap-5 md:grid-cols-[1fr_200px] md:gap-10 md:pl-14">
                <div>
                  <h3 className="mb-3.5 font-mono text-[15px] font-semibold tracking-[0.02em]">
                    {item.company}
                  </h3>
                  <p className="max-w-[560px] text-[15.5px] leading-[1.7] text-muted-foreground">
                    {t(`descriptions.${item.descriptionKey}`)}
                  </p>
                </div>
                <div className="relative order-first h-44 overflow-hidden rounded-[14px] border border-[var(--line-strong)] md:order-none md:h-[130px]">
                  <Image
                    src={item.images[0]}
                    alt={`${item.company} project`}
                    fill
                    sizes="(min-width: 768px) 200px, 100vw"
                    className="object-cover object-top opacity-90"
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
