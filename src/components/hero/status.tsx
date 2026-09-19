'use client'
import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'America/Sao_Paulo',
})

/** Mono status line: local time in Brazil + availability. Time fills in after mount (no hydration mismatch). */
export function Status({
  location,
  status,
}: {
  location: string
  status: string
}) {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = setInterval(update, 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
      <span className="flex items-center gap-2.5">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--cyan)] opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-1.5 rounded-full bg-[var(--cyan)]" />
        </span>
        {status}
      </span>
      <span className="hidden h-3 w-px bg-[var(--line-strong)] sm:block" />
      <span className="tabular-nums">
        {location} · <span className="text-foreground">{time ?? '--:--'}</span>{' '}
        BRT
      </span>
    </div>
  )
}
