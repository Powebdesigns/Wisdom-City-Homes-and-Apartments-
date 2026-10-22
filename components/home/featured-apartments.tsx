import Link from 'next/link'
import { ArrowRight, BedDouble, Check } from 'lucide-react'
import { PlaceholderImage } from '@/components/site/placeholder-image'
import { Reveal } from '@/components/site/motion'
import { Section } from '@/components/site/section'
import { formatPricePerNight, site } from '@/src/content/site'

export function FeaturedApartments() {
  return (
    <Section tone="dark" aria-labelledby="featured-title">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Stay with us</p>
          <h2 id="featured-title" className="text-4xl">
            Featured apartments
          </h2>
        </div>
        <Link
          href="/apartments"
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-semibold text-accent-strong underline-offset-4 hover:underline sm:self-auto"
        >
          View all apartments
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <Reveal>
        <ul
          aria-label="Featured apartments"
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-2 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {site.apartments.map((apt) => {
            const beds = apt.bedrooms.value
            return (
              <li key={apt.slug} className="w-[85%] shrink-0 snap-start sm:w-[70%] md:w-auto">
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-3 shadow-soft transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                  <PlaceholderImage image={apt.image} icon={BedDouble} pattern />
                  <div className="flex flex-1 flex-col gap-4 px-3 pb-3">
                    <h3 className="text-2xl text-balance hyphens-none">
                      <span className="whitespace-nowrap">{apt.name.value.split(' ')[0]}</span>{' '}
                      {apt.name.value.split(' ').slice(1).join(' ')}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <BedDouble className="size-4 text-accent-strong" aria-hidden="true" />
                        {beds} {beds === 1 ? 'bedroom' : 'bedrooms'}
                      </span>
                      <span className="font-semibold text-foreground">{formatPricePerNight(apt.price.value)}</span>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm">
                      {apt.features.value.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/apartments/${apt.slug}`}
                      className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-semibold text-accent-strong underline-offset-4 hover:underline"
                    >
                      View details<span className="sr-only"> for {apt.name.value}</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </Reveal>
      <p className="mt-2 text-sm text-muted-foreground md:hidden" aria-hidden="true">
        Swipe to see more
      </p>
    </Section>
  )
}
