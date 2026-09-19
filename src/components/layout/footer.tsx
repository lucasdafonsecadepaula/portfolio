import { LogoMark } from '@/components/ui/logo-mark'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 font-mono text-[15px] font-semibold">
          <LogoMark size={32} className="text-sm" />
          Lucas de Paula
        </div>
        <p className="font-mono text-[12.5px] text-muted-foreground">
          {t('copyright')}
        </p>
        </div>
      </div>
    </footer>
  )
}
