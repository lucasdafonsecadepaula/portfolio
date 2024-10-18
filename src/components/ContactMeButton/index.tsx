'use client'
import { MailIcon } from '@/src/components/icons'
import { scrollTo } from '@/src/utils/scrollTo'
import { useTranslations } from 'next-intl'

export function ContactMeButton() {
  const t = useTranslations('HomePage')

  function goToBottomOfThePage() {
    const endPageY =
      document.getElementById('footer')?.getBoundingClientRect().top ?? 1000
    scrollTo(endPageY)()
  }

  return (
    <button
      onClick={goToBottomOfThePage}
      className="w-full py-3 bg-[#121212] rounded-xl flex items-center justify-center gap-2 fill-primary-750 text-primary-750 outline outline-1 outline-[#19191a] hover:outline-primary-500"
    >
      <MailIcon size={22} />
      {t('HeroSection.button')}
    </button>
  )
}
