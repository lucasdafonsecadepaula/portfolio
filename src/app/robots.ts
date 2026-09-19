import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://lucasdafonsecadepaula.vercel.app/sitemap.xml',
    host: 'https://lucasdafonsecadepaula.vercel.app',
  }
}
