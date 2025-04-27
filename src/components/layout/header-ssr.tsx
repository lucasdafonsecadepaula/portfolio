import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function HeaderLogo() {
  return (
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
  )
}

export function HeaderDesktopNavigation() {
  const t = useTranslations('Header')

  return (
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
  )
}

export function HeaderContactMe() {
  const t = useTranslations('Header')

  return (
    <Link
      href="#contact"
      className="text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
    >
      {t('contactMe')}
    </Link>
  )
}
