'use client'

import { StatusView, statusActionClass } from '@/components/seo/status-view'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Error')
  return (
    <StatusView code="500" title={t('title')} description={t('description')}>
      <button
        type="button"
        onClick={() => reset()}
        className={statusActionClass}
      >
        {t('retry')}
      </button>
      <Link href="/" className={statusActionClass}>
        <span aria-hidden="true">←</span> {t('home')}
      </Link>
    </StatusView>
  )
}
