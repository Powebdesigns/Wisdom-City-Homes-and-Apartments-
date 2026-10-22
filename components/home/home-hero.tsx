import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { SampleBadge } from '@/components/site/sample-badge'
import { Stagger, StaggerItem } from '@/components/site/motion'
import { cn } from '@/lib/utils'
import { site } from '@/src/content/site'
import { EdoDivider } from './edo-divider'
import { HeroSkyline } from './hero-skyline'

export function HomeHero() {
  const sub = site.home.heroSubheading
  return (
    <section className="surface-dark relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 md:pt-24">
        <Stagger className="flex max-w-3xl flex-col gap-6" gap={0.1}>
          <StaggerItem>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">
              {site.name.value} · {site.city.value}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 id="hero-title" className="text-5xl leading-[1.05]">
              {site.tagline.value}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-prose text-lg text-muted-foreground">
              {sub.value} <SampleBadge show={sub.demo} />
            </p>
          </StaggerItem>
          <StaggerItem className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}>
              Request a booking
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/power" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-full sm:w-auto')}>
              See power &amp; fees
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
      <HeroSkyline />
      <EdoDivider />
    </section>
  )
}
