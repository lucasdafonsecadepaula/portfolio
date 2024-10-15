import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const spaceGrotesk = localFont({
  src: './assets/fonts/SpaceGrotesk.ttf',
  variable: '--font-space-grotesk',
  weight: '300 400 500 600 700',
})

export const metadata: Metadata = {
  title: 'Lucas de Paula - Frontend Developer | React & TypeScript Specialist',
  description:
    'Portfólio de Lucas de Paula, desenvolvedor frontend com experiência em React, TypeScript, e liderança técnica. Veja projetos, experiências e contato.',
  keywords:
    'Lucas de Paula, Frontend Developer, React, TypeScript, Portfólio, JavaScript, Web Developer',
  openGraph: {
    title:
      'Lucas de Paula - Frontend Developer | React & TypeScript Specialist',
    description:
      'Portfólio profissional de Lucas de Paula, especialista em React, TypeScript e liderança técnica.',
    url: 'https://lucasdafonsecadepaula.vercel.app/',
    type: 'website',
    // images: [
    //   {
    //     url: '/assets/imgs/me.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Lucas de Paula Portfólio',
    //   },
    // ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased scroll-smooth`}
      >
        {children}
      </body>
    </html>
  )
}
