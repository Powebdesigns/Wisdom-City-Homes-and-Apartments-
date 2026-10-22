# AGENTS.md — Wisdom City Homes and Apartment

Real short-let business in Benin City, Nigeria. A Chatbase chatbot is added later.
**The site's job is TRUST.** Guests fear: (1) apartment not ready / not real, (2) power or AC not as advertised, (3) deposit not refunded. Every page must reduce these worries.

This is a **full multi-page website, NOT a landing page.** Each page keeps its own route. Never merge pages.

## Already built (do not rebuild or restyle)
- Design system: Tailwind v4 tokens in `app/globals.css` (`brand-night`, `brand-night-card`, `brand-mist`, `brand-teal`, `brand-teal-deep`, `brand-amber`, `brand-muted`, `shadow-soft`, `surface-dark`, `surface-light`), Fraunces + Inter, shadcn-style components in `components/ui/`.
- Shell: `components/site/site-header.tsx`, `site-footer.tsx`, `chat-widget-slot.tsx`.
- Helpers: `Section` (tone="dark"|"light"), `PageIntro`, `PlaceholderImage`, `SampleBadge`, and motion helpers `Reveal`, `Stagger`, `StaggerItem`, `Parallax` in `components/site/motion.tsx`; presets in `lib/motion.ts`.
- Home page (`app/page.tsx` + `components/home/*`).
- Routes exist as stubs: /apartments, /power, /fees, /check-in, /contact, /design-test.

## Rules
- Stack: Next.js App Router, TypeScript, Tailwind v4, Framer Motion. No new heavy libraries. Ask before adding any dependency.
- Import content from `@/src/content/site`. **All business content lives in `src/content/site.ts`.** Never hardcode business facts in components.
- Never invent real facts (prices, hours, addresses, fees, phones, reviews). Use `demo(...)` values; `real(...)` only for facts the owner confirmed.
- Show `<SampleBadge show={x.demo} />` once per block, not on every line. `SHOW_SAMPLE_BADGES` switches them all off.
- Reuse existing components and tokens. Amber (`brand-amber`) is ONLY for main CTA buttons, with dark text.
- Animate only transform and opacity. Respect prefers-reduced-motion. Mobile-first from 360px. Touch targets 44px+. Visible focus rings. WCAG AA contrast.
- Placeholder images = `PlaceholderImage` with a clear label until real photos exist.
- Never render NaN or a dash for money. Use `Intl.NumberFormat` and sensible defaults.
- Do ONLY the current step. Keep earlier work working. End each step with a short summary and any new demo values added.

## STEP A — Data fix (do this first; the calculators depend on it)
In `src/content/site.ts`, `fees` and `refund` are strings, which will break math. Change them to numbers, all `// DEMO`:
- `fees.rent` = nightly rent per apartment (read from each apartment's `price`, so no duplicate).
- `fees.caution` = 30000, `fees.cleaning` = 10000, `fees.electricity` = 0 plus `electricityNote` (text).
- `refund.days` = 7 (number), `refund.rule` text.
- `power`: add `gridHoursPerDay` (number, e.g. 12) and `gridWindows` (array of `{ start: number; end: number }` in 24h, DEMO) so a 24-hour bar can be drawn. Keep the text fields.
- Add a `formatNaira(amount)` helper next to `formatPricePerNight`.
- Remove the unused old `trust` block (it promises a "dated walkthrough" the owner never confirmed) if nothing imports it.
Update any component that read the old strings. Do not change the design.

## STEP B — /apartments and /apartments/[slug]
- /apartments: filterable grid (bedrooms, price range) from `site.apartments`, smooth layout animation, result count, empty state.
- /apartments/[slug]: use `generateStaticParams`. Swipeable, keyboard-accessible gallery of labelled placeholder slots ("Real photo slot 1"), feature list, price breakdown from `fees`, sticky booking card on desktop that becomes a bottom bar on mobile, and the notice "Real photos, real address, pay only to {payment.accountName}."
- Unknown slug → `notFound()`.

## STEP C — /power
Cards for grid hours, backup, fuel policy, AC rule. Animated 24-hour bar built from `gridWindows` (grid vs backup) with a pulsing teal "Power Pulse" dot. A "What happens when the light goes off" mini-timeline. Add a "Written Promise" stamp styled like the home trust cards.

## STEP D — /fees
Itemised fee table from `fees`. Live total calculator: apartment select + nights × rent + caution + cleaning + electricity, formatted in naira, never NaN, nights clamped to 1–90. Caution refund rule. Refund-date calculator: pick check-out date, show exact refund date (`refund.days` after check-out) in a clear format. The payment account name is shown prominently with the safety note.

## STEP E — /check-in
Video slot labelled "Fresh walk-through video", map pin slot, meeting person's name and number (from `checkin` and `contact`), check-in/out times, and an "Is everything ready?" checklist with check animations (state in memory only).

## STEP F — /contact
Booking-request form (name, phone, email, dates, apartment, guests, message): inline validation, loading and success states, posts to `process.env.FORM_ENDPOINT` (placeholder; if missing, show a friendly "not configured yet" message in dev). FAQ accordion on power, fees, refunds, cancellation, payment safety, with answers read from `site.ts`.

## STEP G — Chatbase
Rewrite `chat-widget-slot.tsx` as a client component using `next/script` (`lazyOnload`) and `process.env.NEXT_PUBLIC_CHATBASE_ID`. Render nothing if the ID is missing. Add a clearly commented block for pasting the dashboard snippet. Add a "Chat with us" fallback link to /contact. Mount it in `app/layout.tsx`. Keep it from covering the mobile sticky booking bar.

## STEP H — Polish and QA
Page transitions, consistent scroll-reveal, per-page metadata + Open Graph, `app/sitemap.ts`, `app/robots.ts`, favicon, alt text, branded `app/not-found.tsx`. Check 360 / 768 / 1280px, keyboard navigation, reduced motion. Run `pnpm build` and fix errors. Finish by listing every value still using demo data.
