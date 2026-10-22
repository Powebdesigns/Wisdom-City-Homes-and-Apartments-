'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { SampleBadge } from '@/components/site/sample-badge'
import { cn } from '@/lib/utils'
import { site } from '@/src/content/site'

export function ReadyChecklist() {
  const reduce = useReducedMotion()
  const items = site.checkin.checklist.value
  const [done, setDone] = useState<Record<number, boolean>>({})
  const count = Object.values(done).filter(Boolean).length
  const all = count === items.length

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl">Is everything ready?</h2>
        <SampleBadge show={site.checkin.checklist.demo} />
      </div>
      <p className="text-muted-foreground">Tick each item as you check it on arrival.</p>

      <div
        className="h-2 overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={count}
        aria-label="Checklist progress"
      >
        <motion.div
          className="h-full origin-left rounded-full bg-accent-strong"
          animate={{ scaleX: count / items.length }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        />
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item, i) => {
          const checked = !!done[i]
          return (
            <li key={item}>
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                className={cn(
                  'flex min-h-14 w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors',
                  checked ? 'border-accent-strong bg-accent' : 'border-border hover:bg-accent',
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    checked ? 'border-accent-strong bg-accent-strong text-background' : 'border-input',
                  )}
                >
                  <motion.span
                    initial={false}
                    animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25, duration: reduce ? 0 : undefined }}
                  >
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </motion.span>
                </span>
                <span className={cn('font-medium', checked && 'text-foreground')}>{item}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          'flex items-center gap-2 rounded-2xl p-4 font-semibold',
          all ? 'bg-accent text-accent-strong' : 'text-muted-foreground',
        )}
      >
        {all ? (
          <>
            <PartyPopper className="size-5" aria-hidden="true" /> All set. Enjoy your stay!
          </>
        ) : (
          `${count} of ${items.length} checked`
        )}
      </p>
      {!all && count > 0 && (
        <p className="text-sm text-muted-foreground">
          Something not right? Call your host straight away so it can be fixed.
        </p>
      )}
    </div>
  )
}
