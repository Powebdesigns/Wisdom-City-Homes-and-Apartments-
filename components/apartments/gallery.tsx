'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BedDouble, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { PlaceholderImage } from '@/components/site/placeholder-image'
import { cn } from '@/lib/utils'
import type { ImagePlaceholder } from '@/src/content/site'

const ROOMS = ['Living room', 'Bedroom', 'Kitchen', 'Bathroom']
const GRADIENTS = [
  'from-[#121D36] via-[#0B7A72] to-[#19D3C5]',
  'from-[#0B1426] via-[#121D36] to-[#0B7A72]',
  'from-[#121D36] via-[#1B2A4A] to-[#19D3C5]',
  'from-[#0B1426] via-[#0B7A72] to-[#121D36]',
]

/** Swipeable, keyboard-accessible gallery. Replace each slot with a real photo later. */
export function Gallery({ name }: { name: string }) {
  const reduce = useReducedMotion()
  const slides: ImagePlaceholder[] = ROOMS.map((room, i) => ({
    label: `Real photo slot ${i + 1} — ${room}`,
    gradient: GRADIENTS[i],
    demo: true,
  }))
  const [[index, dir], setPage] = useState<[number, number]>([0, 0])

  const go = (next: number) => {
    const n = (next + slides.length) % slides.length
    setPage([n, next > index ? 1 : -1])
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${name} photos`}
      tabIndex={0}
      onKeyDown={onKey}
      className="flex flex-col gap-3 rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="relative touch-pan-y overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={index}
            drag={reduce ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1)
              else if (info.offset.x > 60) go(index - 1)
            }}
            initial={reduce ? false : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.25 }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <PlaceholderImage image={slides[index]} icon={BedDouble} pattern aspect="aspect-[4/3] md:aspect-[16/10]" />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-night/80 text-brand-mist backdrop-blur hover:bg-brand-night"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-night/80 text-brand-mist backdrop-blur hover:bg-brand-night"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-1" role="tablist" aria-label="Choose photo">
        {slides.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show photo ${i + 1}`}
            onClick={() => go(i)}
            className="flex size-11 items-center justify-center"
          >
            <span
              className={cn(
                'h-2 rounded-full transition-all',
                i === index ? 'w-8 bg-accent-strong' : 'w-2 bg-border',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
