'use client'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        {/* <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {t.raw('links').map((item: string) => (
            <div key={item} className="pb-6">
              <Link
                href="https://www.flowersandsaints.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-6 text-muted-foreground hover:text-foreground"
              >
                {item}
              </Link>
            </div>
          ))}
        </nav> */}
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          {t('copyright')}
        </p>
      </div>
    </footer>
  )
}
