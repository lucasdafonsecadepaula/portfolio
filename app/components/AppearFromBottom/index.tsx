'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AppearFromBottomProps {
  className?: string
  delay?: number
  children: ReactNode
}

export function AppearFromBottom({
  className,
  delay = 0,
  children,
}: AppearFromBottomProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
