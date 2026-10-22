'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Field, selectClass } from '@/components/site/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/src/content/site'

type Values = {
  name: string
  phone: string
  email: string
  checkIn: string
  checkOut: string
  apartment: string
  guests: string
  message: string
  website: string
}
type Errors = Partial<Record<keyof Values, string>>

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^\+?[\d\s()-]{7,20}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!v.checkIn) e.checkIn = 'Choose your check-in date.'
  if (!v.checkOut) e.checkOut = 'Choose your check-out date.'
  if (v.checkIn && v.checkOut && v.checkOut <= v.checkIn) e.checkOut = 'Check-out must be after check-in.'
  if (!v.apartment) e.apartment = 'Choose an apartment.'
  const g = Number(v.guests)
  if (!Number.isInteger(g) || g < 1 || g > 20) e.guests = 'Enter 1 to 20 guests.'
  if (v.message.length > 1500) e.message = 'Please keep your message under 1,500 characters.'
  return e
}

export function BookingForm({ initialApartment }: { initialApartment?: string }) {
  const reduce = useReducedMotion()
  const preset = site.apartments.some((a) => a.slug === initialApartment) ? (initialApartment as string) : ''
  const [values, setValues] = useState<Values>({
    name: '', phone: '', email: '', checkIn: '', checkOut: '', apartment: preset, guests: '2', message: '', website: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [serverMsg, setServerMsg] = useState('')
  const [demo, setDemo] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const set = (k: keyof Values, val: string) => {
    const next = { ...values, [k]: val }
    setValues(next)
    if (touched[k] || Object.keys(errors).length) setErrors(validate(next))
  }
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(values))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, phone: true, email: true, checkIn: true, checkOut: true, apartment: true, guests: true, message: true })
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`bf-${first}`)?.focus()
      return
    }
    setStatus('sending')
    setServerMsg('')
    try {
      const apt = site.apartments.find((a) => a.slug === values.apartment)
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, apartment: apt?.name.value ?? values.apartment }),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; demo?: boolean; message?: string }
      if (!res.ok || !json.ok) {
        setServerMsg(json.message ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setDemo(!!json.demo)
      setStatus('success')
    } catch {
      setServerMsg('Network problem. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12"
      >
        <CheckCircle2 className="size-14 text-accent-strong" aria-hidden="true" />
        <h2 className="text-3xl">Request received</h2>
        <p className="max-w-md text-muted-foreground">
          Thank you, {values.name.split(' ')[0]}. We will reply to {values.email} with your fees, power details and refund terms in writing.
        </p>
        {demo && (
          <p className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-strong">
            Demo mode: the form endpoint is not connected yet, so nothing was sent.
          </p>
        )}
        <Button type="button" variant="secondary" onClick={() => { setStatus('idle'); setTouched({}); setErrors({}) }}>
          Send another request
        </Button>
      </motion.div>
    )
  }

  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined)
  const aria = (k: keyof Values) => ({ 'aria-invalid': !!err(k) || undefined, 'aria-describedby': err(k) ? `bf-${k}-error` : undefined })

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="bf-name" label="Full name" error={err('name')}>
          <Input id="bf-name" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} {...aria('name')} />
        </Field>
        <Field id="bf-phone" label="Phone / WhatsApp" error={err('phone')}>
          <Input id="bf-phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} {...aria('phone')} />
        </Field>
        <Field id="bf-email" label="Email" error={err('email')} className="sm:col-span-2">
          <Input id="bf-email" type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} {...aria('email')} />
        </Field>
        <Field id="bf-checkIn" label="Check-in date" error={err('checkIn')}>
          <input id="bf-checkIn" type="date" min={today} value={values.checkIn} onChange={(e) => set('checkIn', e.target.value)} onBlur={() => blur('checkIn')} className={selectClass} {...aria('checkIn')} />
        </Field>
        <Field id="bf-checkOut" label="Check-out date" error={err('checkOut')}>
          <input id="bf-checkOut" type="date" min={values.checkIn || today} value={values.checkOut} onChange={(e) => set('checkOut', e.target.value)} onBlur={() => blur('checkOut')} className={selectClass} {...aria('checkOut')} />
        </Field>
        <Field id="bf-apartment" label="Apartment" error={err('apartment')}>
          <select id="bf-apartment" value={values.apartment} onChange={(e) => set('apartment', e.target.value)} onBlur={() => blur('apartment')} className={selectClass} {...aria('apartment')}>
            <option value="">Choose an apartment</option>
            {site.apartments.map((a) => (
              <option key={a.slug} value={a.slug}>{a.name.value}</option>
            ))}
          </select>
        </Field>
        <Field id="bf-guests" label="Guests" error={err('guests')}>
          <Input id="bf-guests" type="number" inputMode="numeric" min={1} max={20} value={values.guests} onChange={(e) => set('guests', e.target.value)} onBlur={() => blur('guests')} {...aria('guests')} />
        </Field>
        <Field id="bf-message" label="Message (optional)" error={err('message')} className="sm:col-span-2">
          <Textarea id="bf-message" value={values.message} onChange={(e) => set('message', e.target.value)} onBlur={() => blur('message')} {...aria('message')} />
        </Field>
      </div>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="bf-website">Website</label>
        <input id="bf-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-2xl bg-destructive/10 p-4 font-medium text-destructive">{serverMsg}</p>
      )}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto sm:self-start">
        {status === 'sending' ? (<><Loader2 className="animate-spin" aria-hidden="true" /> Sending…</>) : (<>Send booking request <Send aria-hidden="true" /></>)}
      </Button>
      <p className="text-sm text-muted-foreground">
        This is a request, not a confirmed booking. {site.paymentSafetyNote.value}
      </p>
    </form>
  )
}
