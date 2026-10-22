'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Field, selectClass } from '@/components/site/field'
import { SampleBadge } from '@/components/site/sample-badge'
import { Button } from '@/components/ui/button'
import { formatNaira, site } from '@/src/content/site'

const MIN_NIGHTS = 1
const MAX_NIGHTS = 90

export function FeeCalculator({ initialSlug }: { initialSlug?: string }) {
  const first = site.apartments.find((a) => a.slug === initialSlug) ?? site.apartments[0]
  const [slug, setSlug] = useState<string>(first.slug)
  const [nights, setNights] = useState(3)

  const apt = site.apartments.find((a) => a.slug === slug) ?? site.apartments[0]
  const safeNights = Number.isFinite(nights) ? Math.min(MAX_NIGHTS, Math.max(MIN_NIGHTS, Math.round(nights))) : MIN_NIGHTS
  const { fees } = site
  const rentTotal = apt.price.value * safeNights
  const total = rentTotal + fees.caution.value + fees.cleaning.value + fees.electricity.value
  const refundable = fees.caution.value

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl">Total calculator</h2>
        <SampleBadge show={apt.price.demo} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="calc-apartment" label="Apartment">
          <select id="calc-apartment" className={selectClass} value={slug} onChange={(e) => setSlug(e.target.value)}>
            {site.apartments.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name.value} — {formatNaira(a.price.value)}/night
              </option>
            ))}
          </select>
        </Field>

        <Field id="calc-nights" label="Number of nights">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-touch"
              aria-label="Fewer nights"
              onClick={() => setNights(Math.max(MIN_NIGHTS, safeNights - 1))}
            >
              <Minus aria-hidden="true" />
            </Button>
            <input
              id="calc-nights"
              type="number"
              inputMode="numeric"
              min={MIN_NIGHTS}
              max={MAX_NIGHTS}
              value={Number.isFinite(nights) ? nights : ''}
              onChange={(e) => setNights(e.target.value === '' ? NaN : Number(e.target.value))}
              onBlur={() => setNights(safeNights)}
              className={`${selectClass} text-center`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon-touch"
              aria-label="More nights"
              onClick={() => setNights(Math.min(MAX_NIGHTS, safeNights + 1))}
            >
              <Plus aria-hidden="true" />
            </Button>
          </div>
        </Field>
      </div>

      <dl className="flex flex-col gap-3 text-base">
        {[
          [`Rent (${safeNights} × ${formatNaira(apt.price.value)})`, formatNaira(rentTotal)],
          ['Caution deposit (refundable)', formatNaira(fees.caution.value)],
          ['Cleaning fee (one-time)', formatNaira(fees.cleaning.value)],
          ['Electricity', fees.electricity.value === 0 ? 'Included' : formatNaira(fees.electricity.value)],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-border pb-3">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-2xl bg-primary p-5 text-primary-foreground" role="status" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Total to pay</p>
        <p className="font-heading text-4xl sm:text-5xl">{formatNaira(total)}</p>
        <p className="mt-2 text-sm opacity-90">
          {formatNaira(refundable)} of this is your refundable caution deposit.
        </p>
      </div>
    </div>
  )
}
