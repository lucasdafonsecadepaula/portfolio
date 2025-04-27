'use client'

import { AnimatePresence, motion } from 'motion/react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className }: AnimatedTextProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        className={`flex tracking-wide ${className || ''}`}
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {text.split('').map((char, i) => (
          <motion.span key={i} variants={letter} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  )
} 