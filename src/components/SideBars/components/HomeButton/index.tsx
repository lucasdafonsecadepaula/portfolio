'use client'

import { scrollTo } from '@/src/utils/scrollTo'
import { IconButton } from '@/src/components/buttons/Icon'
import { HomeIcon } from '@/src/components/icons'

export function HomeButton({ tooltipText }: { tooltipText: string }) {
  return (
    <IconButton onClick={scrollTo(0)} isActive tooltipText={tooltipText}>
      <HomeIcon size={28} />
    </IconButton>
  )
}
