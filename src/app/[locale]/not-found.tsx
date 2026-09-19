import { StatusView, statusActionClass } from '@/components/seo/status-view'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function LocaleNotFound() {
  const t = await getTranslations('NotFound')
  return (
    <StatusView code="404" title={t('title')} description={t('description')}>
      <Link href="/" className={statusActionClass}>
        <span aria-hidden="true">←</span> {t('home')}
      </Link>
    </StatusView>
  )
}
