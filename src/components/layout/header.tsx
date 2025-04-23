'use client'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const LanguageToggle = () => {
  const router = useRouter()
  const pathname = usePathname() ?? ''
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'pt'

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'pt' : 'en'
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="cursor-pointer text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
    >
      {currentLocale === 'en' ? 'PT' : 'EN'}
    </button>
  )
}

export function Header() {
  const t = useTranslations('Header')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname() ?? ''

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 bg-background/80 backdrop-blur-md rounded-b-2xl"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Me</span>
            <Image
              className="h-8 w-auto rounded-full shadow-md ring-1 ring-gray-900/10"
              src="/profile-image.png"
              alt="me"
              width={32}
              height={32}
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/curriculum"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            {t('curriculum')}
          </Link>
          <Link
            href="https://www.figma.com/design/nf1uTbPuCtqYPNl81ECWPt/Inpirations?node-id=0-1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            Figma
          </Link>
          <Link
            href="https://github.com/lucasdafonsecadepaula"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/lucas-da-fonseca-de-paula/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <LanguageToggle />
          <Link
            href="#contact"
            className="text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {t('contactMe')}
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Me</span>
                <Image
                  className="h-8 w-auto rounded-full shadow-md ring-1 ring-gray-900/10"
                  src="/profile-image.png"
                  alt="me"
                  width={32}
                  height={32}
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/curriculum"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-primary/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('curriculum')}
                  </Link>
                  <Link
                    href="https://www.figma.com/design/nf1uTbPuCtqYPNl81ECWPt/Inpirations?node-id=0-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-primary/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Figma
                  </Link>
                  <Link
                    href="https://github.com/lucasdafonsecadepaula"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-primary/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/lucas-da-fonseca-de-paula/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-primary/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LinkedIn
                  </Link>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        const currentLocale = pathname.startsWith('/en')
                          ? 'en'
                          : 'pt'
                        const newLocale = currentLocale === 'en' ? 'pt' : 'en'
                        const newPath = pathname.replace(
                          `/${currentLocale}`,
                          `/${newLocale}`,
                        )
                        router.push(newPath)
                        setIsMenuOpen(false)
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-foreground hover:bg-primary/10 cursor-pointer"
                    >
                      {pathname.startsWith('/en') ? 'Português' : 'English'}
                    </button>
                    <Link
                      href="#contact"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-primary/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('contactMe')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}
