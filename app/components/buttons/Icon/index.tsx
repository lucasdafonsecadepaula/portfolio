import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  isActive?: boolean
  tooltipText?: string
  tooltipPos?: 'left' | 'right' | 'top'
  variant?: 'primary' | 'secondary'
}

const button = tv({
  base: 'py-3 px-3 rounded-xl fill-primary-700 hover:fill-primary-1000',
  variants: {
    isActive: {
      true: 'bg-primary-200',
      false:
        'bg-inherit hover:bg-primary-100 hover:outline hover:outline-1 hover:outline-primary-200',
    },
    variant: {
      primary: '',
      secondary:
        'bg-primary-100 outline outline-1 outline-primary-200 hover:bg-primary-250',
    },
  },
})

const tooltip = tv({
  base: `
    absolute bg-primary-200 rounded py-[8px] px-[12px] 
    font-[family-name:var(--font-geist-mono)] text-white text-sm whitespace-nowrap 
    opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out 
    after:border-transparent after:border-r-primary-200 after:border-8 after:absolute after:content-['']
  `,
  variants: {
    tooltipPos: {
      left: `
        top-1/2 left-[120%] -translate-y-1/2 ml-2 
        after:-left-4 after:top-1/2 after:-translate-y-1/2 
        group-hover:translate-x-2
      `,
      right: `
        top-1/2 right-[120%] -translate-y-1/2 mr-2 
        after:-right-4 after:top-1/2 after:-translate-y-1/2 
        group-hover:-translate-x-2 after:rotate-180
      `,
      top: `
        top-[-120%] -translate-x-1/2 left-1/2 
        after:left-1/2 after:top-[100%] after:-translate-x-1/2 
        group-hover:-translate-y-1 after:-rotate-90
      `,
    },
  },
})

export function IconButton({
  children,
  isActive = false,
  tooltipText,
  tooltipPos = 'left',
  variant = 'primary',
  ...rest
}: IconButtonProps) {
  return (
    <div className="relative group">
      <button {...rest} className={button({ isActive, variant })}>
        {children}
      </button>

      <div className={tooltip({ tooltipPos })}>{tooltipText}</div>
    </div>
  )
}
