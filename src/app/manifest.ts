import { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = 'pt'
  const t = await getTranslations({ locale, namespace: 'Manifest' })

  return {
    name: t('name'),
    short_name: t('shortName'),
    description: t('description'),
    start_url: '/pt',
    display: 'standalone',
    background_color: '#0f0d17',
    theme_color: '#0f0d17',
    icons: [{ src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' }],
  }
}
