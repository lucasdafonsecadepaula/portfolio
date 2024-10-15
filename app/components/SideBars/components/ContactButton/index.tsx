'use client'
import { IconButton } from '@/app/components/buttons/Icon'
import { MailIcon } from '@/app/components/icons'
import { scrollTo } from '@/app/utils/scrollTo'

export function ContactButton() {
  function goToBottomOfThePage() {
    const endPageY =
      document.getElementById('footer')?.getBoundingClientRect().top ?? 1000
    scrollTo(endPageY)()
  }

  return (
    <IconButton tooltipText="CONTATO" onClick={goToBottomOfThePage}>
      <MailIcon size={28} />
    </IconButton>
  )
}
