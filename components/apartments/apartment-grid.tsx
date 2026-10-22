'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatNaira, site } from '@/src/content/site'
import { ApartmentCard } from './apartment-card'

export function ApartmentGrid() {
  const reduce = useReducedMotion()
  const apartments = site.apartments

  const bedOptions = useMemo(
    () => Array.from(new Set(apartments.map((a) => a.bedrooms.value))).sort((a, b) => a - b),
    [apartments],
  )
  const prices = apartments.map((a) => a.price.value)
  const minPrice = Math.floor(Math.min(...prices) / 5000) * 5000
  const maxPrice = Math.ceil(Math.max(...prices) / 5000) * 5000
  const canFilterPrice = maxPrice > minPrice

  const [beds, setBeds] = useState<number | null>(null)
  const [cap, setCap] = useState(maxPrice)

  const results = apartments.filter(
    (a) => (beds === null || a.bedrooms.value === beds) && a.price.value <= cap,
  )
  const reset = () => {
    setBeds(null)
    setCap(maxPrice)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6 md:flex-row md:items-end md:justify-between">
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-sm font-semibold">Bedrooms</legend>
          <div className="flex flex-wrap gap-2">
            {[null, ...bedOptions].map((b) => {
              const active = beds === b
              return (
                <button
                  key={b ?? 'all'}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setBeds(b)}
                  className={cn(
                    'min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors',
                    active
                      ? 'border-transparent bg-primary text-primary-foreground'
                      : 'border-border hover:bg-accent',
                  )}
                >
                  {b === null ? 'Any' : `${b} bed${b === 1 ? '' : 's'}`}
                </button>
              )
            })}
          </div>
        </fieldset>

        {canFilterPrice && (
          <div className="flex flex-col gap-3 md:w-72">
            <label htmlFor="price-cap" className="flex items-center justify-between text-sm font-semibold">
              <span>Max price per night</span>
              <span className="text-accent-strong">{formatNaira(cap)}</span>
            </label>
            <input
              id="price-cap"
              type="range"
              min={minPrice}
              max={maxPrice}
              step={5000}
              value={cap}
              onChange={(e) => setCap(Number(e.target.value))}
              className="h-11 w-full cursor-pointer accent-[var(--accent-strong)]"
            />
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
        Showing {results.length} of {apartments.length} {apartments.length === 1 ? 'apartment' : 'apartments'}
      </p>

      <motion.ul layout={!reduce} className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {results.map((apt) => (
            <motion.li
              key={apt.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <ApartmentCard apt={apt} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {results.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border p-10 text-center">
          <SearchX className="size-10 text-accent-strong" aria-hidden="true" />
          <p className="text-lg font-semibold">No apartments match those filters</p>
          <Button type="button" variant="secondary" onClick={reset}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
