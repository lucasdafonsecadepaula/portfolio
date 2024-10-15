'use client'
import { IconButton } from '@/app/components/buttons/Icon'
import { HomeIcon } from '@/app/components/icons'
import { scrollTo } from '@/app/utils/scrollTo'

export function HomeButton() {
  return (
    <IconButton onClick={scrollTo(0)} isActive tooltipText="INICIO">
      <HomeIcon size={28} />
    </IconButton>
  )
}
