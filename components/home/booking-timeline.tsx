'use client'

import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '@/components/site/motion'
import { SampleBadge } from '@/components/site/sample-badge'
import type { Demo } from '@/src/content/site'

type Step = { id: string; title: Demo<string>; body: Demo<string> }

export function BookingTimeline({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })

  return (
    <div ref={ref} className="relative">
      <div className="absolute top-6 bottom-6 left-[21px] w-0.5 rounded-full bg-border" aria-hidden="true">
        <motion.div
          className="h-full w-full origin-top rounded-full bg-accent-strong"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />
      </div>
      <ol className="relative flex flex-col gap-8">
        {steps.map((step, i) => (
          <li key={step.id}>
            <Reveal className="flex gap-4 sm:gap-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-accent-strong bg-background font-heading text-lg font-semibold text-accent-strong">
                {i + 1}
              </span>
              <div className="flex flex-col gap-2 pt-2">
                <h3 className="text-xl">
                  {step.title.value} <SampleBadge show={step.title.demo} />
                </h3>
                <p className="text-muted-foreground">{step.body.value}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}
