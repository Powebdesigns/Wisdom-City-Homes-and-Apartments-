import type { ReactNode } from 'react'
import { EdoDivider } from '@/components/home/edo-divider'
import { Reveal } from '@/components/site/motion'
import { Section } from '@/components/site/section'

/** Dark page header with a soft teal glow and an Edo-inspired divider. */
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div className="surface-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] size-[28rem] rounded-full bg-brand-teal/15 blur-3xl"
      />
      <Section tone="dark" aria-labelledby="page-title" className="relative pb-12 md:pb-16">
        <Reveal className="flex max-w-3xl flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">{eyebrow}</p>
          <h1 id="page-title" className="text-4xl md:text-6xl">
            {title}
          </h1>
          <p className="max-w-prose text-lg text-muted-foreground">{description}</p>
          {children}
        </Reveal>
      </Section>
      <EdoDivider />
    </div>
  )
}
