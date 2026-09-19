import type { ReactNode } from 'react'

export const statusActionClass =
  'inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors hover:border-[var(--violet)] hover:text-[var(--violet)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cyan)]'

// Shared full-bleed status screen (404 / error): outlined watermark code, editorial copy left-aligned.
export function StatusView({
  code,
  title,
  description,
  children,
  data,
}: {
  code: string
  title: string
  description: string
  children: ReactNode
  data?: string
}) {
  return (
    <section
      data-orb={data ?? '0.8,240,0.4,0.9'}
      className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-[2vw] top-16 select-none font-display text-[clamp(220px,46vw,640px)] font-extrabold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--line-strong)]"
      >
        {code}
      </p>
      <div className="relative max-w-xl">
        <p className="eyebrow mb-6">{code}</p>
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
          <span className="grad-text">{title}</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  )
}
