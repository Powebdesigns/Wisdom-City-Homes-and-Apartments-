import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BedDouble, Check, ShieldCheck, Users } from 'lucide-react'
import { BookingBar, BookingCard } from '@/components/apartments/booking-card'
import { Gallery } from '@/components/apartments/gallery'
import { SampleBadge } from '@/components/site/sample-badge'
import { Section } from '@/components/site/section'
import { site } from '@/src/content/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return site.apartments.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const apt = site.apartments.find((a) => a.slug === slug)
  if (!apt) return { title: 'Apartment not found' }
  return { title: apt.name.value, description: apt.summary.value }
}

export default async function ApartmentPage({ params }: Props) {
  const { slug } = await params
  const apt = site.apartments.find((a) => a.slug === slug)
  if (!apt) notFound()
  const beds = apt.bedrooms.value

  return (
    <main id="main">
      <Section tone="light" className="pb-28 md:pb-24 lg:pb-24" aria-labelledby="apt-title">
        <Link
          href="/apartments"
          className="mb-6 inline-flex min-h-11 items-center gap-2 font-semibold text-accent-strong underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All apartments
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="flex min-w-0 flex-col gap-8">
            <Gallery name={apt.name.value} />

            <div className="flex flex-col gap-4">
              <h1 id="apt-title" className="text-4xl md:text-5xl">
                {apt.name.value}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <BedDouble className="size-5 text-accent-strong" aria-hidden="true" />
                  {beds} {beds === 1 ? 'bedroom' : 'bedrooms'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="size-5 text-accent-strong" aria-hidden="true" />
                  Up to {apt.maxGuests.value} guests
                </span>
                <SampleBadge show={apt.name.demo} />
              </div>
              <p className="max-w-prose text-lg">{apt.summary.value}</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="mb-4 text-2xl">What&apos;s included</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {apt.features.value.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-strong">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Power and AC details are on the{' '}
                <Link href="/power" className="font-semibold text-accent-strong underline underline-offset-4">
                  Power page
                </Link>
                .
              </p>
            </div>

            <aside className="flex items-start gap-4 rounded-3xl border-2 border-dashed border-accent-strong/50 bg-accent p-5">
              <ShieldCheck className="mt-0.5 size-6 shrink-0 text-accent-strong" aria-hidden="true" />
              <p className="font-semibold">
                Real photos, real address, pay only to {site.payment.accountName.value}.{' '}
                <SampleBadge show={site.payment.accountName.demo} />
              </p>
            </aside>
          </div>

          <div className="hidden lg:sticky lg:top-28 lg:block">
            <BookingCard apt={apt} />
          </div>
          {/* On mobile the full breakdown sits in the page flow, the bar stays pinned */}
          <div className="lg:hidden">
            <BookingCard apt={apt} />
          </div>
        </div>
      </Section>
      <BookingBar apt={apt} />
    </main>
  )
}
