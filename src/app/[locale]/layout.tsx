import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Intro } from '@/components/layout/intro'
import { ScrollProgress } from '@/components/layout/scroll-progress'
import { SectionDots } from '@/components/layout/section-dots'
import { PageOrb } from '@/components/layout/page-orb'
import { PersonJsonLd } from '@/components/seo/person-json-ld'
import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from 'next/font/google'
import { notFound } from 'next/navigation'
import type React from 'react'
import '../globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})
const body = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const SITE_URL = 'https://lucasdafonsecadepaula.vercel.app'
export const viewport: Viewport = { themeColor: '#0f0d17', colorScheme: 'dark' }

const OG_LOCALES = { en: 'en_US', pt: 'pt_BR' } as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const title = t('title')
  const description = t('description')
  const other = locale === 'en' ? 'pt' : 'en'

  return {
    title: { default: title, template: '%s | Lucas de Paula' },
    description,
    keywords: t.raw('keywords') as string[],
    authors: [{ name: 'Lucas de Paula', url: SITE_URL }],
    creator: 'Lucas de Paula',
    publisher: 'Lucas de Paula',
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'pt-BR': '/pt',
        'x-default': '/pt',
      },
    },
    openGraph: {
      title,
      description: t('ogDescription'),
      url: `/${locale}`,
      siteName: 'Lucas de Paula',
      locale: OG_LOCALES[locale],
      alternateLocale: OG_LOCALES[other],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('ogDescription'),
      creator: '@lucasdepaula_',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'rtA57NLk3WUK1YrOBcpYX1AwgeTC8ZJQT4DqpPH9414',
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} relative min-h-screen overflow-x-clip bg-background font-sans text-foreground antialiased`}
      >
        <PersonJsonLd locale={locale} />
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" forcedTheme="dark">
            <Intro />
            <ScrollProgress />
            <PageOrb />
            <Header />
            <SectionDots />
            <main className="relative z-10">{children}</main>
            <div className="relative z-10">
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
