import { useTranslations } from 'next-intl'

export default function Curriculum() {
  const t = useTranslations('Curriculum')
  const locale = useTranslations()('locale')

  const pdfFile =
    locale === 'pt'
      ? '/lucas_da_fonseca_de_paula.pdf'
      : '/lucas_da_fonseca_de_paula-english_version.pdf'

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
