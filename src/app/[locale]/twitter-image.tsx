import { ogSize, renderOg } from '@/lib/og'

export const size = ogSize
export const contentType = 'image/png'
export const alt = 'Lucas de Paula'

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return renderOg(locale)
}
