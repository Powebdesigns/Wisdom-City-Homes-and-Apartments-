import { NextResponse } from 'next/server'

type Payload = Record<string, unknown>

const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/**
 * Receives the booking form and forwards it to FORM_ENDPOINT (e.g. Formspree, Getform, a Zapier
 * or Make webhook). The endpoint stays on the server and is never exposed to the browser.
 */
export async function POST(req: Request) {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real people never fill this hidden field.
  if (str(body.website)) return NextResponse.json({ ok: true })

  const data = {
    name: str(body.name, 120),
    phone: str(body.phone, 40),
    email: str(body.email, 160),
    checkIn: str(body.checkIn, 20),
    checkOut: str(body.checkOut, 20),
    apartment: str(body.apartment, 120),
    guests: str(body.guests, 4),
    message: str(body.message, 2000),
  }
  if (!data.name || !data.phone || !data.email || !data.checkIn || !data.checkOut || !data.apartment) {
    return NextResponse.json({ ok: false, message: 'Please fill in all required fields.' }, { status: 400 })
  }

  const endpoint = process.env.FORM_ENDPOINT
  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[booking] FORM_ENDPOINT not set. Demo mode, request not sent:', data)
      return NextResponse.json({ ok: true, demo: true })
    }
    return NextResponse.json(
      { ok: false, message: 'Booking requests are not available right now. Please call or WhatsApp us.' },
      { status: 503 },
    )
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Endpoint responded ${res.status}`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[booking] forward failed', err)
    return NextResponse.json(
      { ok: false, message: 'We could not send your request. Please try again or call us.' },
      { status: 502 },
    )
  }
}
