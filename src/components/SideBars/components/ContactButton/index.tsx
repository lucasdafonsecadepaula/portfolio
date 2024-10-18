'use client'

import { scrollTo } from '@/src/utils/scrollTo'
import { IconButton } from '@/src/components/buttons/Icon'
import { MailIcon } from '@/src/components/icons'

export function ContactButton({ tooltipText }: { tooltipText: string }) {
  function goToBottomOfThePage() {
    const endPageY =
      document.getElementById('footer')?.getBoundingClientRect().top ?? 1000
    scrollTo(endPageY)()
  }

  return (
    <IconButton tooltipText={tooltipText} onClick={goToBottomOfThePage}>
      <MailIcon size={28} />
    </IconButton>
  )
}
