import { statusActionClass } from '@/components/seo/status-view'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

const PDF = {
  pt: '/lucas_da_fonseca_de_paula.pdf',
  en: '/lucas_da_fonseca_de_paula-english_version.pdf',
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('curriculumTitle'),
    description: t('curriculumDescription'),
    alternates: {
      canonical: `/${locale}/curriculum`,
      languages: {
        'en-US': '/en/curriculum',
        'pt-BR': '/pt/curriculum',
        'x-default': '/pt/curriculum',
      },
    },
    openGraph: { url: `/${locale}/curriculum`, title: t('curriculumTitle') },
  }
}

export default async function Curriculum({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('Curriculum')
  const file = PDF[locale]

  return (
    <section
      data-orb="0.9,200,0.35,0.9"
      className="relative px-6 pb-24 pt-32 sm:px-10 lg:px-16 lg:pt-40"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-6">{t('eyebrow')}</p>
          <h1 className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-7xl">
            <span className="grad-text">{t('title')}</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
            {t('lead')}
          </p>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
            {t('format')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={file} download className={statusActionClass}>
              <span aria-hidden="true">↓</span> {t('download')}
            </a>
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className={statusActionClass}
            >
              {t('open')} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-card lg:block">
          <object
            data={`${file}#navpanes=0&view=FitH`}
            type="application/pdf"
            aria-label={t('previewTitle')}
            className="h-[85vh] min-h-[600px] w-full"
          >
            <p className="p-6 text-sm text-muted-foreground">{t('fallback')}</p>
          </object>
        </div>
      </div>
    </section>
  )
}
