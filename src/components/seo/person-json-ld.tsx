import { getTranslations } from 'next-intl/server'

const SITE_URL = 'https://lucasdafonsecadepaula.vercel.app'

export async function PersonJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lucas de Paula',
    jobTitle: t('jobTitle'),
    description: t('ogDescription'),
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en-US',
    sameAs: [
      'https://github.com/lucasdafonsecadepaula',
      'https://www.linkedin.com/in/lucas-da-fonseca-de-paula/',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  )
}
