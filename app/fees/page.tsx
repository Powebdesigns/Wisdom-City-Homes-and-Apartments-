import type { Metadata } from 'next'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import { FeeCalculator } from '@/components/fees/fee-calculator'
import { RefundCalculator } from '@/components/fees/refund-calculator'
import { Reveal } from '@/components/site/motion'
import { PageIntro } from '@/components/site/page-intro'
import { SampleBadge } from '@/components/site/sample-badge'
import { Section } from '@/components/site/section'
import { WrittenPromise } from '@/components/site/written-promise'
import { formatNaira, site } from '@/src/content/site'

export const metadata: Metadata = {
  title: 'Fees & Refunds',
  description: 'Every fee itemised, a live total calculator and the exact date your caution deposit is refunded.',
}

type Props = { searchParams: Promise<{ apartment?: string }> }

export default async function FeesPage({ searchParams }: Props) {
  const { apartment } = await searchParams
  const { fees, refund, payment, cancellation } = site
  const rows: { label: string; value: string; demo: boolean }[] = [
    ...site.apartments.map((a) => ({
      label: `Rent — ${a.name.value} (per night)`,
      value: formatNaira(a.price.value),
      demo: a.price.demo,
    })),
    { label: 'Caution deposit (refundable)', value: formatNaira(fees.caution.value), demo: fees.caution.demo },
    { label: 'Cleaning fee (one-time)', value: formatNaira(fees.cleaning.value), demo: fees.cleaning.demo },
    {
      label: 'Electricity',
      value: fees.electricity.value === 0 ? 'Included in rent' : formatNaira(fees.electricity.value),
      demo: fees.electricity.demo,
    },
  ]

  return (
    <main id="main">
      <PageIntro
        eyebrow="Fees & Refunds"
        title="Every fee, in writing"
        description="See exactly what you pay and the exact date your deposit comes back."
      />

      <Section tone="light" aria-label="Fees">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <h2 className="border-b border-border p-6 text-2xl">Itemised fees</h2>
              <table className="w-full text-left">
                <caption className="sr-only">Itemised fees in naira</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-border last:border-0">
                      <th scope="row" className="p-4 pl-6 text-base font-normal text-muted-foreground">
                        {r.label}
                      </th>
                      <td className="p-4 pr-6 text-right font-semibold">
                        {r.value} <SampleBadge show={r.demo} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-border p-6 text-sm text-muted-foreground">
                {fees.electricityNote.value} <SampleBadge show={fees.electricityNote.demo} />
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <FeeCalculator initialSlug={apartment} />
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="refund-title">
        <div className="mb-10 flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Your deposit</p>
          <h2 id="refund-title" className="text-4xl">
            Caution fee refund
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="text-lg">
              {refund.rule.value} <SampleBadge show={refund.rule.demo} />
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Cancellation:</span> {cancellation.value}{' '}
              <SampleBadge show={cancellation.demo} />
            </p>
          </div>
          <RefundCalculator />
        </div>
      </Section>

      <Section tone="light" aria-label="Payment safety" className="flex flex-col gap-6">
        <div className="rounded-3xl border-2 border-accent-strong bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 size-8 shrink-0 text-accent-strong" aria-hidden="true" />
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl">Pay only to this account</h2>
              <dl className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Account name', payment.accountName],
                  ['Bank', payment.bank],
                  ['Account number', payment.number],
                ].map(([label, item]) => {
                  const v = item as typeof payment.bank
                  return (
                    <div key={label as string}>
                      <dt className="text-sm text-muted-foreground">{label as string}</dt>
                      <dd className="text-lg font-semibold">
                        {v.value} <SampleBadge show={v.demo} />
                      </dd>
                    </div>
                  )
                })}
              </dl>
              <p className="flex items-start gap-2 text-muted-foreground">
                <AlertTriangle className="mt-1 size-4 shrink-0" aria-hidden="true" />
                {site.paymentSafetyNote.value} If the name differs, stop and call us first.
              </p>
            </div>
          </div>
        </div>
        <WrittenPromise title="Refund date in writing">
          We state your refund date before you pay, so you always know when your caution deposit is returned.
        </WrittenPromise>
      </Section>
    </main>
  )
}
