import { MetadataRoute } from 'next'
import { getTranslations } from 'next-intl/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = 'pt'
  const t = await getTranslations({ locale, namespace: 'Manifest' })

  return {
    name: t('name'),
    short_name: t('shortName'),
    description: t('description'),
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#050505',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}