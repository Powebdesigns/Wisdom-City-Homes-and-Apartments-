import Link from 'next/link'
import { ArrowRight, CalendarCheck, DoorOpen, Zap, type LucideIcon } from 'lucide-react'
import { SampleBadge } from '@/components/site/sample-badge'
import { Section } from '@/components/site/section'
import { Stagger, StaggerItem } from '@/components/site/motion'
import { site } from '@/src/content/site'

const icons: Record<string, LucideIcon> = { ready: DoorOpen, power: Zap, refund: CalendarCheck }

export function TrustPromises() {
  return (
    <Section tone="light" aria-labelledby="trust-title">
      <div className="mb-10 flex max-w-2xl flex-col gap-3 md:mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Written promises</p>
        <h2 id="trust-title" className="text-4xl">
          Why guests trust us
        </h2>
      </div>

      <Stagger className="grid gap-6 md:grid-cols-3" gap={0.12}>
        {site.home.promises.map((promise) => {
          const Icon = icons[promise.id]
          return (
            <StaggerItem key={promise.id}>
              <Link
                href={promise.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-soft transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent-strong">
                      Written Promise
                    </span>
                    <span className="font-heading text-sm text-muted-foreground">No. {promise.number}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-strong">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-2xl">{promise.title.value}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    {'“'}
                    {promise.fear}
                    {'”'}
                  </p>
                </div>

                <div className="relative" aria-hidden="true">
                  <div className="mx-6 border-t-2 border-dashed border-border" />
                  <span className="absolute top-1/2 -left-4 size-8 -translate-y-1/2 rounded-full border border-border bg-background" />
                  <span className="absolute top-1/2 -right-4 size-8 -translate-y-1/2 rounded-full border border-border bg-background" />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <p className="leading-relaxed">
                    {promise.body.value} <SampleBadge show={promise.body.demo} />
                  </p>
                  <span className="mt-auto inline-flex min-h-11 items-center gap-2 font-semibold text-accent-strong">
                    {promise.linkLabel}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
