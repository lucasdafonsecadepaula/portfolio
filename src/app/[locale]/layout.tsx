import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server'
import localFont from 'next/font/local'
import './globals.css'
import { ReactNode } from 'react'
import { routing } from '@/src/i18n/routing'

const geistSans = localFont({
  src: '../../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: '../../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const spaceGrotesk = localFont({
  src: '../../assets/fonts/SpaceGrotesk.ttf',
  variable: '--font-space-grotesk',
  weight: '300 400 500 600 700',
})

type Props = {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale = 'pt' },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

  return {
    title: t('title'),
    description: t('description'),
    keywords:
      'Lucas de Paula, Frontend Developer, React, TypeScript, Portfólio, JavaScript, NextJS, HTML, CSS, TailwindCSS, Web Developer',
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        'pt-BR': '/pt',
      },
    },
    metadataBase: new URL('https://lucasdafonsecadepaula.vercel.app'),
    openGraph: {
      images: '/images/og-image.png',
    },
    twitter: {
      images: '/images/twitter-image.png',
    },
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased scroll-smooth overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
