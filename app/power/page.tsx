import type { Metadata } from 'next'
import { BatteryCharging, Fuel, Snowflake, Zap } from 'lucide-react'
import { PowerBar } from '@/components/power/power-bar'
import { Reveal, Stagger, StaggerItem } from '@/components/site/motion'
import { PageIntro } from '@/components/site/page-intro'
import { SampleBadge } from '@/components/site/sample-badge'
import { Section } from '@/components/site/section'
import { WrittenPromise } from '@/components/site/written-promise'
import { site } from '@/src/content/site'

export const metadata: Metadata = {
  title: 'Power & AC',
  description: 'Grid hours, backup power, fuel policy and AC rules, stated plainly before you book.',
}

export default function PowerPage() {
  const { power } = site
  const cards = [
    { icon: Zap, title: 'Grid hours', item: power.gridHours },
    { icon: BatteryCharging, title: 'Backup system', item: power.backup },
    { icon: Fuel, title: 'Fuel policy', item: power.fuelPolicy },
    { icon: Snowflake, title: 'AC rule', item: power.acRule },
  ]
  return (
    <main id="main">
      <PageIntro
        eyebrow="Power"
        title="Power & AC, stated plainly"
        description="No surprises. Here is how power and air-conditioning work, before you pay."
      />

      <Section tone="light" aria-label="Power details">
        <Stagger className="grid gap-6 sm:grid-cols-2" gap={0.1}>
          {cards.map(({ icon: Icon, title, item }) => (
            <StaggerItem key={title}>
              <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-strong">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h2 className="text-2xl">{title}</h2>
                <p className="text-lg">{item.value}</p>
                <SampleBadge show={item.demo} className="self-start" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <PowerBar />
        </Reveal>
      </Section>

      <Section tone="dark" aria-labelledby="outage-title">
        <div className="mb-10 flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Be prepared</p>
          <h2 id="outage-title" className="text-4xl">
            What happens when the light goes off
          </h2>
        </div>
        <ol className="relative flex max-w-2xl flex-col gap-8 border-l-2 border-dashed border-border pl-8">
          {power.outageSteps.value.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="absolute top-0 -left-[3.1rem] flex size-9 items-center justify-center rounded-full bg-primary font-heading text-primary-foreground">
                {i + 1}
              </span>
              <Reveal delay={i * 0.05}>
                <h3 className="text-xl">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <SampleBadge show={power.outageSteps.demo} className="mt-8" />
      </Section>

      <Section tone="light" aria-label="Power promise">
        <WrittenPromise title="Power stated clearly">
          What we tell you here is what you get. If anything is unclear, ask before you pay.
        </WrittenPromise>
      </Section>
    </main>
  )
}
