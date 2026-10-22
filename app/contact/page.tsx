import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { BookingForm } from '@/components/contact/booking-form'
import { Faq } from '@/components/contact/faq'
import { Reveal } from '@/components/site/motion'
import { PageIntro } from '@/components/site/page-intro'
import { SampleBadge } from '@/components/site/sample-badge'
import { Section } from '@/components/site/section'
import { site } from '@/src/content/site'

export const metadata: Metadata = {
  title: 'Contact & Booking',
  description: 'Send a booking request and read answers to common questions about power, fees, refunds and payments.',
}

type Props = { searchParams: Promise<{ apartment?: string }> }

export default async function ContactPage({ searchParams }: Props) {
  const { apartment } = await searchParams
  const { contact } = site
  const wa = contact.whatsapp.value.replace(/\D/g, '')
  const info = [
    { icon: Phone, label: 'Call', value: contact.phone.value, href: `tel:${contact.phone.value.replace(/[^\d+]/g, '')}`, demo: contact.phone.demo },
    { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsapp.value, href: `https://wa.me/${wa}`, demo: contact.whatsapp.demo },
    { icon: Mail, label: 'Email', value: contact.email.value, href: `mailto:${contact.email.value}`, demo: contact.email.demo },
    { icon: Clock, label: 'Hours', value: contact.hours.value, demo: contact.hours.demo },
    { icon: MapPin, label: 'Address', value: site.address.value, demo: site.address.demo },
  ]
  return (
    <main id="main">
      <PageIntro
        eyebrow="Contact"
        title="Request a booking"
        description="Tell us your dates. We reply with your fees, power details and refund terms in writing."
      />

      <Section tone="light" aria-label="Booking request">
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <Reveal>
            <BookingForm initialApartment={apartment} />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-2xl">Reach us directly</h2>
              <ul className="flex flex-col gap-4">
                {info.map(({ icon: Icon, label, value, href, demo }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-strong">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold break-words text-accent-strong underline-offset-4 hover:underline">
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold">{value}</p>
                      )}
                      <SampleBadge show={demo} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 rounded-3xl border-2 border-dashed border-accent-strong/50 bg-accent p-6">
              <h2 className="text-xl">Prefer to chat?</h2>
              <p className="text-muted-foreground">
                Use the chat bubble for quick answers about power, fees and refunds. For bookings, use the form.
              </p>
              <Link href="#faq" className="inline-flex min-h-11 items-center font-semibold text-accent-strong underline-offset-4 hover:underline">
                Read the FAQ
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" id="faq" aria-labelledby="faq-title">
        <div className="mb-10 flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Answers</p>
          <h2 id="faq-title" className="text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <Reveal>
          <Faq />
        </Reveal>
      </Section>
    </main>
  )
}
