import { Section } from '@/components/site/section'
import { site } from '@/src/content/site'
import { BookingTimeline } from './booking-timeline'

export function HowBookingWorks() {
  return (
    <Section tone="light" aria-labelledby="booking-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Four steps</p>
          <h2 id="booking-title" className="text-4xl">
            How booking works
          </h2>
          <p className="max-w-prose text-lg text-muted-foreground">
            Every step happens in writing, so you always know what comes next.
          </p>
        </div>
        <BookingTimeline steps={site.home.steps} />
      </div>
    </Section>
  )
}
