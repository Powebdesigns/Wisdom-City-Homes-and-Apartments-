import type { Metadata } from 'next'
import { ComponentShowcase } from '@/components/site/component-showcase'
import { Section } from '@/components/site/section'

export const metadata: Metadata = { title: 'Design test', robots: { index: false } }

export default function DesignTestPage() {
  return (
    <main id="main">
      <Section tone="dark" aria-labelledby="dt-dark">
        <ComponentShowcase id="dt-dark" tone="Dark surface" />
      </Section>
      <Section tone="light" aria-labelledby="dt-light">
        <ComponentShowcase id="dt-light" tone="Light surface" />
      </Section>
    </main>
  )
}
