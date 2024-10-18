'use client'

import { scrollTo } from '@/src/utils/scrollTo'
import { IconButton } from '@/src/components/buttons/Icon'
import { ArrowUpwardIcon } from '@/src/components/icons'

export function ArrowUp({ tooltipText }: { tooltipText: string }) {
  return (
    <IconButton
      onClick={scrollTo(0)}
      tooltipText={tooltipText}
      tooltipPos="top"
    >
      <ArrowUpwardIcon size={28} />
    </IconButton>
  )
}
