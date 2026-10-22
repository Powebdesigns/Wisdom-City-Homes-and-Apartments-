import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { MotionProvider } from '@/components/site/motion'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { ChatWidgetSlot } from '@/components/site/chat-widget-slot'
import { SITE_URL, site } from '@/src/content/site'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name.value} — Short-let apartments in Benin City`,
    template: `%s | ${site.name.value}`,
  },
  description: site.description.value,
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: site.name.value,
    title: `${site.name.value} — Short-let apartments in Benin City`,
    description: site.description.value,
  },
  twitter: { card: 'summary_large_image' },
  
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B1426',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-NG" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-xl bg-cta px-4 py-3 font-semibold text-cta-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
        {/* Chatbase: set NEXT_PUBLIC_CHATBASE_ID in .env.local (see components/site/chat-widget-slot.tsx) */}
        <ChatWidgetSlot />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
