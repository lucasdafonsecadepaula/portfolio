import { StatusView, statusActionClass } from '@/components/seo/status-view'
import type { Metadata } from 'next'
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

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

export const metadata: Metadata = {
  title: '404 | Lucas de Paula',
  robots: { index: false },
}

// Rendered for URLs that match no route at all (no locale layout around it),
// so it owns <html>/<body> and shows both languages.
export default function NotFound() {
  return (
    <html lang="pt" className="dark">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} relative min-h-screen overflow-x-clip bg-background font-sans text-foreground antialiased`}
      >
        <main>
          <StatusView
            code="404"
            title="Página não encontrada"
            description="A página que você procura não existe ou mudou de lugar. / The page you are looking for does not exist or has moved."
          >
            <Link href="/pt" className={statusActionClass}>
              <span aria-hidden="true">←</span> Voltar ao início
            </Link>
            <Link href="/en" lang="en" className={statusActionClass}>
              <span aria-hidden="true">←</span> Back to home
            </Link>
          </StatusView>
        </main>
      </body>
    </html>
  )
}
