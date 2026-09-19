import * as motion from 'motion/react-client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const inView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8 },
}

export function AboutMeSection() {
  const t = useTranslations('About')
  const paragraphs = t.raw('bio') as string[]

  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1180px] items-start gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
        <motion.div className="relative mx-auto w-full max-w-[320px] lg:max-w-none" {...inView}>
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[var(--violet)]/15 to-[var(--cyan)]/15 blur-[30px]"
          />
          <Image
            src="/profile-image.png"
            alt="Lucas de Paula"
            width={480}
            height={600}
            className="relative aspect-[4/5] w-full rounded-3xl border border-[var(--line-strong)] object-cover"
          />
          <div className="absolute -bottom-[18px] left-6 flex items-center gap-2.5 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-[18px] py-3 font-mono text-xs text-muted-foreground">
            <span className="size-[7px] rounded-full bg-green-400" />
            Based in Brazil
          </div>
        </motion.div>

        <motion.div {...inView} transition={{ duration: 0.8, delay: 0.1 }}>
          <div className="eyebrow mb-5">01 · {t('title')}</div>
          <h2 className="mb-9 max-w-[520px] font-display text-4xl font-bold leading-[1.08] tracking-tight lg:text-[44px]">
            {t('subtitle')}
          </h2>
          <div className="space-y-5 text-[17px] leading-[1.75] text-muted-foreground">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'text-[19px] text-foreground' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
