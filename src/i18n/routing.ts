import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  pathnames: {
    '/': '/',
    '/articles': '/articles',
    '/projects': '/projects',
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing)
