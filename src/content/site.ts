/**
 * ============================================================
 *  SITE CONTENT — SINGLE SOURCE OF TRUTH
 * ============================================================
 *  Every value wrapped in `demo(...)` is PLACEHOLDER content,
 *  NOT a real business fact. The UI renders a "Sample" badge
 *  wherever demo data appears.
 *
 *  To go live: replace the value with the confirmed real fact
 *  and change `demo(...)` to `real(...)`. Do not invent facts.
 * ============================================================
 */

/** Master switch: set to false to hide every "Sample" badge on the site at once. */
export const SHOW_SAMPLE_BADGES = true

export type Demo<T> = { value: T; demo: boolean }

const nairaFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

/** Formats a nightly price as "₦45,000 per night"; never renders a dash or NaN. */
export function formatPricePerNight(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return 'Price on request'
  return `₦${nairaFormatter.format(amount)} per night`
}

/** Formats an amount as "₦45,000"; never renders a dash or NaN. */
export function formatNaira(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return '₦0'
  return `₦${nairaFormatter.format(amount)}`
}

/** Public site URL used for metadata, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

const demo = <T>(value: T): Demo<T> => ({ value, demo: true })
const real = <T>(value: T): Demo<T> => ({ value, demo: false })

export type ImagePlaceholder = {
  label: string
  /** Tailwind gradient classes for the labeled placeholder block */
  gradient: string
  demo: boolean
}

export const navLinks = [
  { href: '/apartments', label: 'Apartments' },
  { href: '/power', label: 'Power' },
  { href: '/fees', label: 'Fees & Refunds' },
  { href: '/check-in', label: 'Check-in' },
  { href: '/contact', label: 'Contact' },
] as const

export const site = {
  /* Provided by the owner — real */
  name: real('Wisdom City Homes and Apartment'),
  category: real('Short-let apartments'),
  city: real('Benin City, Nigeria'),

  /* ---------------- DEMO: brand copy ---------------- */
  tagline: real('Clear power. Clear fees. Written promises.'),
  description: demo(
    'Short-let apartments with transparent power details, live readiness checks and a clear deposit refund policy.',
  ),

  /* ---------------- DEMO: address & contact ---------------- */
  address: demo('Street address to be confirmed, Benin City, Edo State'),
  contact: {
    phone: demo('+234 000 000 0000'),
    whatsapp: demo('+234 000 000 0000'),
    email: demo('bookings@example.com'),
    hours: demo('Mon–Sun, 8:00am – 9:00pm'),
  },

  /* ---------------- DEMO: listings ---------------- */
  apartments: [
    {
      slug: 'sample-one-bedroom',
      name: demo('1-Bedroom Apartment'), // DEMO
      bedrooms: demo(1), // DEMO
      price: demo(45000), // DEMO — naira per night
      features: demo(['AC in bedroom', 'Wi-Fi', 'Kitchen']), // DEMO
      maxGuests: demo(2), // DEMO
      summary: demo('A compact, comfortable apartment for solo travellers and couples.'), // DEMO
      image: {
        label: 'Photo coming soon — living room',
        gradient: 'from-[#121D36] via-[#0B7A72] to-[#19D3C5]',
        demo: true,
      } satisfies ImagePlaceholder,
    },
    {
      slug: 'sample-two-bedroom',
      name: demo('2-Bedroom Apartment'), // DEMO
      bedrooms: demo(2), // DEMO
      price: demo(65000), // DEMO — naira per night
      features: demo(['AC in all rooms', 'Smart TV', 'Parking']), // DEMO
      maxGuests: demo(4), // DEMO
      summary: demo('A roomier apartment for families, friends or longer work stays.'), // DEMO
      image: {
        label: 'Photo coming soon — bedroom',
        gradient: 'from-[#0B1426] via-[#121D36] to-[#0B7A72]',
        demo: true,
      } satisfies ImagePlaceholder,
    },
  ],

  /* ---------------- DEMO: power ---------------- */
  power: {
    gridHours: demo('About 12 hours of grid power per day (sample figure)'),
    backup: demo('Inverter and generator backup (sample)'),
    fuelPolicy: demo('Generator fuel is included in the nightly rent (sample)'),
    acRule: demo('AC can run on grid and generator power, not on the inverter (sample)'),
    /** Numeric schedule behind the 24-hour bar. Hours in 24h clock; backup runs whenever grid does not. */
    gridWindows: demo([
      { start: 6, end: 10 },
      { start: 14, end: 20 },
      { start: 22, end: 24 },
    ]),
    outageSteps: demo([
      { title: 'Grid goes off', body: 'Backup power starts. Lights, fans and sockets stay on.' },
      { title: 'Backup takes over', body: 'The inverter or generator carries the apartment.' },
      { title: 'AC follows the AC rule', body: 'AC runs only where the AC rule above allows it.' },
      { title: 'Need help?', body: 'Call your host. Their number is on the Check-in page.' },
    ]),
  },

  /* ---------------- DEMO: fees (numbers are naira) ----------------
     Nightly rent comes from each apartment's `price`. */
  fees: {
    caution: demo(30000), // DEMO — refundable caution deposit
    cleaning: demo(10000), // DEMO — one-time cleaning fee
    electricity: demo(0), // DEMO — 0 means included in rent
    electricityNote: demo('Electricity is included in the nightly rent (sample).'),
  },

  /* ---------------- DEMO: deposit refund ---------------- */
  refund: {
    days: demo(7), // DEMO — days after check-out
    rule: demo(
      'The caution deposit is refunded after the check-out inspection, minus any documented damage shown with photos.',
    ),
  },

  cancellation: demo('Cancellation terms are confirmed in writing with your booking. Owner to confirm exact terms.'),

  /* ---------------- DEMO: payment ----------------
     Guests are told to pay ONLY to this account name. */
  payment: {
    accountName: demo('Account name to be confirmed'),
    bank: demo('Bank to be confirmed'),
    number: demo('0000000000'),
  },

  /* ---------------- DEMO: check-in ---------------- */
  checkin: {
    times: demo({ checkIn: 'From 2:00pm (sample)', checkOut: 'By 12:00pm (sample)' }),
    meetPerson: demo('Name of on-site host to be confirmed'),
    meetPhone: demo('+234 000 000 0000'),
    mapNote: demo('Exact pin and directions will be added once the address is confirmed.'),
    checklist: demo([
      'Photos on this site match the apartment',
      'Power and AC work as described on the Power page',
      'Water and bathroom are ready to use',
      'Keys and access are handed over by the named host',
      'Refund terms were shared in writing before payment',
    ]),
  },

  /* ---------------- DEMO: trust pillars (existing) ---------------- */
  trust: {
    readiness: {
      fear: 'Is the apartment real and actually ready?',
      title: demo('Ready-on-arrival check'),
      body: demo(
        'We confirm your apartment is ready before you arrive.',
      ),
    },
    power: {
      fear: 'Will the power and AC work as advertised?',
      title: demo('Power & AC, stated plainly'),
      body: demo('Each listing states its power sources and AC rules so expectations match reality.'),
    },
    deposit: {
      fear: 'Will I get my caution deposit back?',
      title: demo('Written deposit refund terms'),
      body: demo('Refund timeline and deduction rules are written down and shared before payment.'),
    },
  },

  /* ---------------- DEMO: reviews ---------------- */
  reviews: [
    {
      id: 'review-1',
      author: demo('Sample Guest'),
      quote: demo('Placeholder review text. Replace with a real guest review.'),
      rating: demo(5),
    },
  ],

  /* Provided by the owner — real */
  paymentSafetyNote: real('Pay only to the account name on our Fees page.'),

  /* ---------------- HOME PAGE COPY ---------------- */
  home: {
    heroSubheading: demo('Short-lets in Benin City with power, fees and refund dates written down before you pay.'),

    /* Titles provided by the owner; supporting copy is DEMO */
    promises: [
      {
        id: 'ready',
        number: '01',
        title: real('Ready on arrival'),
        fear: 'Is the apartment real and actually ready?',
        body: demo('We confirm your apartment is ready before you arrive.'), // DEMO
        href: '/apartments',
        linkLabel: 'See the apartments',
      },
      {
        id: 'power',
        number: '02',
        title: real('Power stated clearly'),
        fear: 'Will the power and AC work as advertised?',
        body: demo('We explain how power and AC work at each apartment before you book.'), // DEMO
        href: '/power',
        linkLabel: 'Read the power details',
      },
      {
        id: 'refund',
        number: '03',
        title: real('Refund date in writing'),
        fear: 'Will I get my caution deposit back?',
        body: demo('We share our deposit refund terms in writing before you pay.'), // DEMO
        href: '/fees',
        linkLabel: 'See fees & refunds',
      },
    ],

    steps: [
      {
        id: 'request',
        title: demo('Send a booking request'),
        body: demo('Share your dates and preferred apartment through the contact page.'),
      },
      {
        id: 'confirm',
        title: demo('Get written terms in writing'),
        body: demo('Receive the fees, power details and refund terms for your stay.'),
      },
      {
        id: 'pay',
        title: demo('Pay to the listed account name only'),
        body: demo('Transfer only to the account name shown on the Fees page, then keep your receipt.'),
      },
      {
        id: 'arrive',
        title: demo('Meet your host and check in'),
        body: demo('Your host meets you at the agreed time and shows you around the apartment.'),
      },
    ],

    closing: {
      headline: demo('Know every detail before you pay a single naira.'),
    },
  },
} as const

export type Site = typeof site
export type Apartment = (typeof site.apartments)[number]
