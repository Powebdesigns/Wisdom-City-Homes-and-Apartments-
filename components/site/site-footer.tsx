import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { SampleBadge } from '@/components/site/sample-badge'
import { navLinks, site } from '@/src/content/site'

const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`
const waHref = (n: string) => `https://wa.me/${n.replace(/\D/g, '')}`

export function SiteFooter() {
  const { contact, address, payment } = site
  return (
    <footer className="surface-dark border-t px-4 pt-16 pb-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div
          role="note"
          className="flex flex-col gap-3 rounded-3xl border border-brand-teal/40 bg-card p-6 sm:flex-row sm:items-start sm:gap-4"
        >
          <ShieldCheck className="size-7 shrink-0 text-accent-strong" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="font-heading text-xl font-semibold">Payment safety</p>
            <p className="text-muted-foreground">
              Pay only to the account name on our{' '}
              <Link href="/fees" className="font-semibold text-accent-strong underline underline-offset-4">
                Fees page
              </Link>
              : <span className="font-semibold text-foreground">{payment.accountName.value}</span>{' '}
              <SampleBadge show={payment.accountName.demo} />
            </p>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <p className="font-heading text-2xl font-semibold">{site.name.value}</p>
            <p className="max-w-prose text-muted-foreground">
              {site.tagline.value} <SampleBadge show={site.tagline.demo} />
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </h2>
            <address className="flex flex-col gap-1 not-italic">
              <span className="flex items-start gap-2 py-2">
                <MapPin className="mt-1 size-4 shrink-0 text-accent-strong" aria-hidden="true" />
                <span>
                  {address.value} <SampleBadge show={address.demo} />
                </span>
              </span>
              <FooterContact href={telHref(contact.phone.value)} icon={Phone} label="Phone" item={contact.phone} />
              <FooterContact
                href={waHref(contact.whatsapp.value)}
                icon={MessageCircle}
                label="WhatsApp"
                item={contact.whatsapp}
              />
              <FooterContact href={`mailto:${contact.email.value}`} icon={Mail} label="Email" item={contact.email} />
            </address>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Quick links
            </h2>
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-lg hover:text-accent-strong"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="border-t pt-6 text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} ${site.name.value}. ${site.city.value}.`} Items marked{' '}
          <SampleBadge /> are placeholders pending confirmation.
        </p>
      </div>
    </footer>
  )
}

function FooterContact({
  href,
  icon: Icon,
  label,
  item,
}: {
  href: string
  icon: typeof Phone
  label: string
  item: { value: string; demo: boolean }
}) {
  return (
    <a href={href} className="flex min-h-11 items-center gap-2 rounded-lg hover:text-accent-strong">
      <Icon className="size-4 shrink-0 text-accent-strong" aria-hidden="true" />
      <span className="sr-only">{label}:</span>
      <span>{item.value}</span>
      <SampleBadge show={item.demo} />
    </a>
  )
}
