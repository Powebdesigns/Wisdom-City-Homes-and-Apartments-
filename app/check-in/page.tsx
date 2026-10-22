import type { Metadata } from 'next'
import { Clock, MapPin, Phone, Play, UserRound } from 'lucide-react'
import { ReadyChecklist } from '@/components/check-in/ready-checklist'
import { Reveal } from '@/components/site/motion'
import { PageIntro } from '@/components/site/page-intro'
import { SampleBadge } from '@/components/site/sample-badge'
import { Section } from '@/components/site/section'
import { WrittenPromise } from '@/components/site/written-promise'
import { site } from '@/src/content/site'

export const metadata: Metadata = {
  title: 'Check-in',
  description: 'Who meets you, where to go, and a checklist to confirm your apartment is ready.',
}

export default function CheckInPage() {
  const { checkin } = site
  const tel = checkin.meetPhone.value.replace(/[^\d+]/g, '')
  return (
    <main id="main">
      <PageIntro
        eyebrow="Check-in"
        title="Arrive with confidence"
        description="See the apartment, find the building and know who is meeting you."
      />

      <Section tone="light" aria-label="Check-in details">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-8">
            <figure className="flex flex-col gap-3">
              <div
                role="img"
                aria-label="Fresh walk-through video placeholder"
                className="surface-dark relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#121D36] via-[#0B7A72] to-[#19D3C5] shadow-soft"
              >
                <span className="flex size-20 items-center justify-center rounded-full bg-brand-night/70 text-brand-teal ring-1 ring-brand-teal/40">
                  <Play className="size-9" aria-hidden="true" />
                </span>
                <SampleBadge className="absolute top-4 left-4 bg-brand-night/80 text-brand-teal" />
              </div>
              <figcaption className="font-semibold">Fresh walk-through video</figcaption>
            </figure>

            <figure className="flex flex-col gap-3">
              <div
                role="img"
                aria-label="Map pin placeholder"
                className="surface-dark relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl bg-brand-night-card shadow-soft"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <span className="relative flex size-16 items-center justify-center rounded-full bg-brand-teal text-brand-night shadow-soft-lg">
                  <MapPin className="size-8" aria-hidden="true" />
                </span>
                <SampleBadge className="absolute top-4 left-4 bg-brand-night/80 text-brand-teal" />
              </div>
              <figcaption className="text-sm text-muted-foreground">
                {checkin.mapNote.value} <SampleBadge show={checkin.mapNote.demo} />
              </figcaption>
              <p className="text-sm">
                <span className="font-semibold">Address:</span> {site.address.value}{' '}
                <SampleBadge show={site.address.demo} />
              </p>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-2xl">Who will meet you</h2>
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-strong">
                  <UserRound className="size-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xl font-semibold">{checkin.meetPerson.value}</p>
                  <p className="text-muted-foreground">Your on-site host</p>
                </div>
              </div>
              <a
                href={`tel:${tel}`}
                className="inline-flex min-h-11 items-center gap-3 font-semibold text-accent-strong underline-offset-4 hover:underline"
              >
                <Phone className="size-5" aria-hidden="true" />
                {checkin.meetPhone.value}
              </a>
              <SampleBadge show={checkin.meetPerson.demo} className="self-start" />
              <div className="flex items-start gap-3 border-t border-border pt-5">
                <Clock className="mt-1 size-5 shrink-0 text-accent-strong" aria-hidden="true" />
                <p>
                  <span className="font-semibold">Check-in:</span> {checkin.times.value.checkIn}
                  <br />
                  <span className="font-semibold">Check-out:</span> {checkin.times.value.checkOut}
                </p>
              </div>
            </div>
            <ReadyChecklist />
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" aria-label="Ready promise">
        <WrittenPromise title="Ready on arrival">
          Your apartment is confirmed ready before you arrive, and your host is named here so you know who to expect.
        </WrittenPromise>
      </Section>
    </main>
  )
}
