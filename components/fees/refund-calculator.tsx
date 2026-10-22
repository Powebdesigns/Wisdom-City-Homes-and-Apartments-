'use client'

import { CalendarCheck } from 'lucide-react'
import { useState } from 'react'
import { Field, selectClass } from '@/components/site/field'
import { SampleBadge } from '@/components/site/sample-badge'
import { site } from '@/src/content/site'

/** Adds whole days to a yyyy-mm-dd string using UTC so time zones never shift the date. */
function addDays(iso: string, days: number): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return null
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + days))
  return Number.isNaN(d.getTime()) ? null : d
}

const fmt = new Intl.DateTimeFormat('en-NG', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function RefundCalculator() {
  const [checkout, setCheckout] = useState('')
  const days = site.refund.days.value
  const refundDate = checkout ? addDays(checkout, days) : null

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl">Refund date calculator</h2>
        <SampleBadge show={site.refund.days.demo} />
      </div>
      <Field
        id="checkout-date"
        label="Your check-out date"
        hint={`Caution deposits are refunded ${days === 0 ? 'on the day of check-out' : `${days} ${days === 1 ? 'day' : 'days'} after check-out`}.`}
      >
        <input
          id="checkout-date"
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className={selectClass}
        />
      </Field>

      <div className="flex items-start gap-4 rounded-2xl bg-accent p-5" role="status" aria-live="polite">
        <CalendarCheck className="mt-1 size-6 shrink-0 text-accent-strong" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Refund date</p>
          <p className="font-heading text-2xl">{refundDate ? fmt.format(refundDate) : 'Pick a check-out date'}</p>
        </div>
      </div>
    </div>
  )
}
