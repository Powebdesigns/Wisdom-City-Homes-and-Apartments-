import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SampleBadge } from '@/components/site/sample-badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatNaira, site, type Apartment } from '@/src/content/site'

/** Desktop: sticky card. Mobile: <BookingBar /> pinned to the bottom. */
export function BookingCard({ apt }: { apt: Apartment }) {
  const { fees } = site
  const rent = apt.price.value
  const firstNight = rent + fees.caution.value + fees.cleaning.value + fees.electricity.value
  const rows: [string, string][] = [
    ['Rent (per night)', formatNaira(rent)],
    ['Caution deposit (refundable)', formatNaira(fees.caution.value)],
    ['Cleaning (one-time)', formatNaira(fees.cleaning.value)],
    ['Electricity', fees.electricity.value === 0 ? 'Included' : formatNaira(fees.electricity.value)],
  ]
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft-lg">
      <div>
        <p className="text-sm text-muted-foreground">From</p>
        <p className="font-heading text-4xl">
          {formatNaira(rent)} <span className="text-base font-sans text-muted-foreground">/ night</span>
        </p>
      </div>
      <dl className="flex flex-col gap-3 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-border pb-3">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 pt-1 text-base">
          <dt className="font-semibold">Total for 1 night</dt>
          <dd className="font-heading text-xl">{formatNaira(firstNight)}</dd>
        </div>
      </dl>
      <SampleBadge show={apt.price.demo} className="self-start" />
      <Link href={`/contact?apartment=${apt.slug}`} className={cn(buttonVariants({ size: 'lg' }), 'w-full')}>
        Request a booking
        <ArrowRight aria-hidden="true" />
      </Link>
      <Link
        href={`/fees?apartment=${apt.slug}`}
        className="inline-flex min-h-11 items-center justify-center font-semibold text-accent-strong underline-offset-4 hover:underline"
      >
        Calculate my exact total
      </Link>
    </div>
  )
}

export function BookingBar({ apt }: { apt: Apartment }) {
  return (
    <div className="surface-dark fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="font-heading text-xl leading-none">{formatNaira(apt.price.value)}</p>
          <p className="text-xs text-muted-foreground">per night</p>
        </div>
        <Link href={`/contact?apartment=${apt.slug}`} className={cn(buttonVariants(), 'px-5')}>
          Request a booking
        </Link>
      </div>
    </div>
  )
}
