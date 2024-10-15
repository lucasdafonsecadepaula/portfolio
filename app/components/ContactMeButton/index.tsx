'use client'
import { MailIcon } from '@/app/components/icons'
import { scrollTo } from '@/app/utils/scrollTo'

export function ContactMeButton() {
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
      ME CONTATE
    </button>
  )
}
