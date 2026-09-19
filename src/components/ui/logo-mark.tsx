import { cn } from '@/lib/utils'

export function LogoMark({
  className,
  size = 34,
}: {
  className?: string
  size?: number
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-[9px] border border-white/15 bg-black font-mono text-[13px] font-bold text-white',
        'shadow-[0_0_14px_-2px_oklch(0.72_0.18_302/0.55),0_0_30px_-6px_oklch(0.78_0.14_199/0.45)]',
        '[text-shadow:0_0_8px_oklch(0.72_0.18_302/0.6)]',
        className,
      )}
      style={{ width: size, height: size }}
    >
      LP
    </span>
  )
}
