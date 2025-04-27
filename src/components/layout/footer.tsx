import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          {t('copyright')}
        </p>
      </div>
    </footer>
  )
}
