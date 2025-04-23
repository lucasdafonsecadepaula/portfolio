import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'
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

export const metadata = {
  title: {
    default: 'Lucas de Paula - Fullstack Software Developer',
    template: '%s | Lucas de Paula',
  },
  description:
    'Apple-inspired design portfolio showcasing innovative and minimalist creative solutions',
  keywords: [
    'creative agency',
    'design portfolio',
    'minimalist design',
    'apple-inspired',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomain.com'),
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
      'Apple-inspired design portfolio showcasing innovative and minimalist creative solutions',
    url: 'https://yourdomain.com',
    siteName: 'Lucas de Paula - Fullstack Software Developer',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lucas de Paula - Fullstack Software Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas de Paula - Fullstack Software Developer',
    description:
      'Apple-inspired design portfolio showcasing innovative and minimalist creative solutions',
    images: ['/twitter-image.jpg'],
    creator: '@yourtwitter',
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
    google: 'your-google-site-verification',
  },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
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
