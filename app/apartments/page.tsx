import type { Metadata } from 'next'
import { ApartmentGrid } from '@/components/apartments/apartment-grid'
import { PageIntro } from '@/components/site/page-intro'
import { Section } from '@/components/site/section'

export const metadata: Metadata = {
  title: 'Apartments',
  description: 'Browse short-let apartments in Benin City with clear prices, features and fees.',
}

export default function ApartmentsPage() {
  return (
    <main id="main">
      <PageIntro
        eyebrow="Apartments"
        title="Find your apartment"
        description="Filter by bedrooms and price. Every listing shows its fees up front."
      />
      <Section tone="light" aria-label="Apartment listings">
        <ApartmentGrid />
      </Section>
    </main>
  )
}
