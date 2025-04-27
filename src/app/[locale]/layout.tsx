import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Cairo, Cuprum } from 'next/font/google'
import { notFound } from 'next/navigation'
import type React from 'react'
import '../globals.css'

const cuprum = Cuprum({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cuprum',
})
const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: {
    default: 'Lucas de Paula - Fullstack Software Developer',
    template: '%s | Lucas de Paula',
  },
  description:
    'Explore the fullstack portfolio of Lucas de Paula, a software developer with expertise in crafting scalable web and mobile applications. From real-time dashboards to UX-focused platforms, discover how design and engineering meet.',
  keywords: [
    'fullstack developer',
    'software engineer',
    'web developer portfolio',
    'UI/UX developer',
    'frontend engineer',
    'backend developer',
    'React developer',
    'Node.js developer',
    'developer portfolio',
    'real-time applications',
  ],
  authors: [{ name: 'Lucas de Paula' }],
  creator: 'Lucas de Paula',
  publisher: 'Lucas de Paula',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lucasdafonsecadepaula.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'pt-BR': '/pt',
    },
  },
  openGraph: {
    title: 'Lucas de Paula - Fullstack Software Developer',
    description:
      'Fullstack portfolio of Lucas de Paula. Explore cutting-edge web and mobile development projects, technical insights, and real-world solutions built with modern technologies.',
    url: 'https://lucasdafonsecadepaula.vercel.app/',
    siteName: 'Lucas de Paula - Fullstack Software Developer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lucas de Paula - Fullstack Software Developer',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas de Paula - Fullstack Software Developer',
    description:
      'Discover the portfolio of Lucas de Paula: innovative fullstack applications, intuitive interfaces, and high-performance solutions.',
    images: ['/twitter-image.png'],
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
        className={`${cuprum.variable} ${cairo.variable} font-cairo min-h-screen bg-background text-foreground`}
      >
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
