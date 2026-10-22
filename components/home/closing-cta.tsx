import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/components/site/motion'
import { SampleBadge } from '@/components/site/sample-badge'
import { Section } from '@/components/site/section'
import { cn } from '@/lib/utils'
import { site } from '@/src/content/site'

export function ClosingCta() {
  const { headline } = site.home.closing
  return (
    <Section tone="dark" aria-labelledby="closing-title">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-12 shadow-soft-lg sm:px-12 md:py-16">
        <div
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(25_211_197/0.2),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative flex max-w-3xl flex-col gap-6">
          <SampleBadge show={headline.demo} className="self-start" />
          <h2 id="closing-title" className="text-5xl leading-[1.05]">
            {headline.value}
          </h2>
          <Link href="/contact" className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto sm:self-start')}>
            Request a booking
            <ArrowRight aria-hidden="true" />
          </Link>
          <p className="flex items-start gap-3 text-muted-foreground">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-accent-strong" aria-hidden="true" />
            <span>
              {site.paymentSafetyNote.value}{' '}
              <Link
                href="/fees"
                className="font-semibold text-accent-strong underline underline-offset-4"
              >
                Go to Fees &amp; Refunds
              </Link>
            </span>
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
