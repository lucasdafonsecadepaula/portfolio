import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) notFound()

  return {
    messages: (
      await (locale === 'pt'
        ? // When using Turbopack, this will enable HMR for `en`
          import('../../messages/pt.json')
        : import(`../../messages/${locale}.json`))
    ).default,
  }
})