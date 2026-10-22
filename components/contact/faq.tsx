'use client'

import { SampleBadge } from '@/components/site/sample-badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { formatNaira, site } from '@/src/content/site'

export function Faq() {
  const { power, fees, refund, cancellation, payment } = site
  const items = [
    {
      id: 'power',
      q: 'How does power and AC work?',
      a: `${power.gridHours.value}. Backup: ${power.backup.value}. Fuel: ${power.fuelPolicy.value}. AC: ${power.acRule.value}.`,
      demo: power.gridHours.demo,
    },
    {
      id: 'fees',
      q: 'What fees will I pay?',
      a: `Nightly rent, a refundable caution deposit (${formatNaira(fees.caution.value)}) and a one-time cleaning fee (${formatNaira(fees.cleaning.value)}). ${fees.electricityNote.value} The Fees page has a calculator for your exact total.`,
      demo: fees.caution.demo,
    },
    {
      id: 'refund',
      q: 'When do I get my caution deposit back?',
      a: `${refund.rule.value} Refunds are made ${refund.days.value === 0 ? 'on the day of check-out' : `${refund.days.value} days after check-out`}. Use the refund date calculator on the Fees page to see your exact date.`,
      demo: refund.days.demo,
    },
    { id: 'cancel', q: 'What is the cancellation policy?', a: cancellation.value, demo: cancellation.demo },
    {
      id: 'pay',
      q: 'How do I pay safely?',
      a: `${site.paymentSafetyNote.value} The account name is ${payment.accountName.value}. If the name on your transfer screen is different, stop and call us.`,
      demo: payment.accountName.demo,
    },
  ]
  return (
    <Accordion className="rounded-3xl border border-border bg-card px-5 shadow-soft sm:px-8">
      {items.map((it) => (
        <AccordionItem key={it.id} value={it.id}>
          <AccordionTrigger className="text-lg">{it.q}</AccordionTrigger>
          <AccordionContent>
            <p>
              {it.a} <SampleBadge show={it.demo} />
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
