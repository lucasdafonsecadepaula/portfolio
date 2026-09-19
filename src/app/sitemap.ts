import { routing } from '@/i18n/routing'
import type { MetadataRoute } from 'next'

const baseUrl = 'https://lucasdafonsecadepaula.vercel.app'
const routes = ['', '/curriculum']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l === 'pt' ? 'pt-BR' : 'en-US',
            `${baseUrl}/${l}${route}`,
          ]),
        ),
      },
    })),
  )
}
