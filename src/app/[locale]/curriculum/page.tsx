'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export default function Curriculum() {
  const t = useTranslations('Curriculum')
  const locale = useTranslations()('locale')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pdfFile =
    locale === 'pt'
      ? '/lucas_da_fonseca_de_paula.pdf'
      : '/lucas_da_fonseca_de_paula-english_version.pdf'

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl h-[800px] flex items-center justify-center">
            <p>Loading PDF...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <iframe
            src={`${pdfFile}#navpanes=0&zoom=page-fit`}
            className="w-full h-[800px] shadow-lg"
            title="Curriculum PDF"
          />
        </div>
      </div>
    </div>
  )
}
