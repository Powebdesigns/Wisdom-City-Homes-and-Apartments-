import type { Transition, Variants } from 'framer-motion'

/** Shared motion presets. Only opacity and transform are animated. */
export const easeOut: Transition['ease'] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easeOut } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

export const inViewOnce = { once: true, margin: '-10% 0px' } as const

/** Parallax range in px; applied as translateY against scroll progress. */
export const parallaxRange = 48
