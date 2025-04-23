import { motion } from 'framer-motion'

export function Underline() {
  return (
    <motion.svg
      className="absolute w-full stroke-primary"
      viewBox="-158.17 -22.0172 289.2 53.8"
      stroke="currentColor"
      fill="none"
      role="presentation"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: [0.5, 0.05, 0.5, 1] }}
    >
      <motion.path
        strokeLinecap="round"
        strokeWidth="8"
        pathLength="1"
        d="M -153.17 20.736 C -153.17 20.736 -135 -1 -118 -1 C -99 -1 -136.093 33.632 -117 26 C -105 18 -80 5 -74 1 C -51 -10 -63 9 -58.375 20.387 C -54.89 29.449 -26 3 -9 -1 C 14 -8 -17.599 24.918 1.917 22.827 C 21.434 20.735 37 3 49 0 C 62 -3 55.24 32.585 75 23 C 95 12 95 -1 114 -2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: [0.5, 0.05, 0.5, 1] }}
      />
    </motion.svg>
  )
}
