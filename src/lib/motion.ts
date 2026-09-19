// Shared motion vocabulary: reuse these so every animation feels like one system.
export const ease = {
  out: [0.2, 0.7, 0.2, 1],
  inOut: [0.65, 0, 0.2, 1],
} as const

export const duration = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
  glide: 1.5,
} as const

export const stagger = 0.08

export const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
