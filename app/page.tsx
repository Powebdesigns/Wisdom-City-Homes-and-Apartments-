import { ClosingCta } from '@/components/home/closing-cta'
import { FeaturedApartments } from '@/components/home/featured-apartments'
import { HomeHero } from '@/components/home/home-hero'
import { HowBookingWorks } from '@/components/home/how-booking-works'
import { TrustPromises } from '@/components/home/trust-promises'

export default function Page() {
  return (
    <main id="main">
      <HomeHero />
      <TrustPromises />
      <FeaturedApartments />
      <HowBookingWorks />
      <ClosingCta />
    </main>
  )
}
