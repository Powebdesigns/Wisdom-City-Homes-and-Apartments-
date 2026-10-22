# Wisdom City Homes and Apartment

Multi-page Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion site built around one idea: TRUST.

## Run it
```bash
pnpm install        # or npm install
cp .env.example .env.local
pnpm dev            # http://localhost:3000
pnpm build && pnpm start   # production check
```

## Where things live
- **All business content:** `src/content/site.ts` (values wrapped in `demo(...)` show a "Sample" badge; switch every badge off with `SHOW_SAMPLE_BADGES = false`).
- **Booking form:** posts to `/api/booking`, which forwards to `FORM_ENDPOINT` (server-side only).
- **Chatbase:** set `NEXT_PUBLIC_CHATBASE_ID` in `.env.local` (see `components/site/chat-widget-slot.tsx`).
- **Live domain:** set `NEXT_PUBLIC_SITE_URL` for sitemap and social previews.

## Before going live
1. Replace every `demo(...)` in `site.ts` with `real(...)` and confirmed facts (address, phones, prices, fees, refund days, power schedule, account details, host name).
2. Replace placeholder photos, the walk-through video and the map pin slot.
3. Turn TypeScript build checking back on in `next.config.mjs` after running `pnpm exec tsc --noEmit` and fixing anything it reports.
