'use client'
import { IconButton } from '@/app/components/buttons/Icon'
import { ArrowUpwardIcon } from '@/app/components/icons'
import { scrollTo } from '@/app/utils/scrollTo'

export function ArrowUp() {
  return (
    <IconButton onClick={scrollTo(0)} tooltipText="VOLTAR" tooltipPos="top">
      <ArrowUpwardIcon size={28} />
    </IconButton>
  )
}
