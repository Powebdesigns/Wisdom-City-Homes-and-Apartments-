'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SampleBadge } from '@/components/site/sample-badge'
import { site } from '@/src/content/site'

const TICKS = [0, 6, 12, 18, 24]

/** 24-hour bar: teal = grid power, navy = backup power. Window data lives in site.ts. */
export function PowerBar() {
  const reduce = useReducedMotion()
  const windows = site.power.gridWindows
  const [hour, setHour] = useState<number | null>(null)

  useEffect(() => {
    const read = () => {
      const now = new Date()
      setHour(now.getHours() + now.getMinutes() / 60)
    }
    read()
    const id = setInterval(read, 60_000)
    return () => clearInterval(id)
  }, [])

  const gridTotal = windows.value.reduce((sum, w) => sum + (w.end - w.start), 0)
  const onGrid = hour !== null && windows.value.some((w) => hour >= w.start && hour < w.end)

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl">A typical 24 hours</h2>
        <SampleBadge show={windows.demo} />
      </div>

      <div className="relative pt-2 pb-8">
        <div
          role="img"
          aria-label={`Grid power runs about ${gridTotal} hours a day. Backup power covers the rest.`}
          className="relative h-12 overflow-hidden rounded-2xl bg-brand-night-card ring-1 ring-border"
        >
          {windows.value.map((w) => (
            <motion.div
              key={`${w.start}-${w.end}`}
              className="absolute inset-y-0 origin-left bg-brand-teal-deep"
              style={{ left: `${(w.start / 24) * 100}%`, width: `${((w.end - w.start) / 24) * 100}%` }}
              initial={reduce ? false : { scaleX: 0, opacity: 0.4 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        {hour !== null && (
          <div
            aria-hidden="true"
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${(hour / 24) * 100}%` }}
          >
            <span className="h-16 w-0.5 bg-foreground" />
            <span className="mt-1 rounded-full bg-foreground px-2 py-0.5 text-xs font-semibold text-background">Now</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t}>{t === 24 ? '12am' : t === 0 ? '12am' : t === 12 ? '12pm' : t < 12 ? `${t}am` : `${t - 12}pm`}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="size-4 rounded bg-brand-teal-deep" aria-hidden="true" /> Grid power
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-4 rounded bg-brand-night-card ring-1 ring-border" aria-hidden="true" /> Backup power
        </span>
        <span className="text-muted-foreground">About {gridTotal} hours of grid per day</span>
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-accent p-4" role="status" aria-live="polite">
        <span className="relative flex size-3" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-strong opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-3 rounded-full bg-accent-strong" />
        </span>
        <p className="font-semibold">
          {hour === null ? 'Checking the schedule…' : onGrid ? 'Right now: grid power expected' : 'Right now: backup power expected'}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        This is the planned schedule, not a live meter. Grid supply can change without notice, which is why backup power is always ready.
      </p>
    </div>
  )
}
