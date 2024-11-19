import { useLocale } from 'next-intl'

export default function Page() {
  const locale = useLocale()

  const text =
    locale === 'pt'
      ? 'Bem-vindo ao meu currículo!'
      : 'Welcome to my curriculum!'
  const url =
    locale === 'pt'
      ? '/lucas_da_fonseca_de_paula.pdf'
      : '/lucas_da_fonseca_de_paula-english_version.pdf'

  return (
    <div className="2xl:px-[8vw] py-16">
      <h1 className="font-bold lg:text-[36px] text-[24px] leading-[42px] text-white mb-8">
        {text}
      </h1>
      <div className="h-screen">
        <iframe
          src={url}
          style={{ height: '100%', width: '100%', border: 'none' }}
          title="PDF Viewer"
        />
      </div>
    </div>
  )
}
