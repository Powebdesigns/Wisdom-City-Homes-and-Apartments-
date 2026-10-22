import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import { EdoDivider } from '@/components/home/edo-divider'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <main id="main" className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-brand-teal/15 blur-3xl" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <Compass className="size-14 text-accent-strong" aria-hidden="true" />
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-strong">Error 404</p>
        <h1 className="text-5xl">This page took a wrong turn</h1>
        <p className="text-lg text-muted-foreground">
          The page you wanted is not here. Let&apos;s get you back to somewhere useful.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}>
            Back to home <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/apartments" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-full sm:w-auto')}>
            See apartments
          </Link>
        </div>
      </div>
      <EdoDivider />
    </main>
  )
}
