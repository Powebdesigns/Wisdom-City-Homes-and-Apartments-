import Link from 'next/link'
import { ArrowRight, BedDouble, Check, Users } from 'lucide-react'
import { PlaceholderImage } from '@/components/site/placeholder-image'
import { SampleBadge } from '@/components/site/sample-badge'
import { formatNaira, type Apartment } from '@/src/content/site'

export function ApartmentCard({ apt }: { apt: Apartment }) {
  const beds = apt.bedrooms.value
  return (
    <article className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-3 shadow-soft transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <PlaceholderImage image={apt.image} icon={BedDouble} pattern />
      <div className="flex flex-1 flex-col gap-4 px-3 pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl text-balance">{apt.name.value}</h3>
          <div className="shrink-0 text-right">
            <p className="text-xl font-semibold">{formatNaira(apt.price.value)}</p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{apt.summary.value}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <BedDouble className="size-4 text-accent-strong" aria-hidden="true" />
            {beds} {beds === 1 ? 'bedroom' : 'bedrooms'}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="size-4 text-accent-strong" aria-hidden="true" />
            Up to {apt.maxGuests.value} guests
          </span>
          <SampleBadge show={apt.price.demo} />
        </div>
        <ul className="flex flex-col gap-2 text-sm">
          {apt.features.value.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <Link
          href={`/apartments/${apt.slug}`}
          className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-semibold text-accent-strong underline-offset-4 hover:underline"
        >
          View details<span className="sr-only"> for {apt.name.value}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
