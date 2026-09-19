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
        'logo-mark inline-flex items-center justify-center rounded-[9px] border border-white/15 bg-black font-mono text-[13px] font-bold text-white',
        'shadow-[0_0_14px_-2px_oklch(0.72_0.18_302/0.55),0_0_30px_-6px_oklch(0.78_0.14_199/0.45)]',
        '[text-shadow:0_0_8px_oklch(0.72_0.18_302/0.6)]',
        'transition-[box-shadow,border-color,text-shadow] duration-300',
        'group-hover/logo:border-white/40 group-hover/logo:shadow-[0_0_22px_0_oklch(0.72_0.18_302/0.95),0_0_46px_-2px_oklch(0.78_0.14_199/0.8)] group-hover/logo:[text-shadow:0_0_12px_oklch(0.78_0.14_199/0.95)]',
        'group-focus-visible/logo:border-white/40',
        className,
      )}
      style={{ width: size, height: size }}
    >
      LP
    </span>
  )
}
