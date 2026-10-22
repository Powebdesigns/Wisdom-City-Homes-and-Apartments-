'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { navLinks, site } from '@/src/content/site'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  return (
    <header
      className={cn(
        'surface-dark sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-border bg-brand-night/80 shadow-soft-lg supports-backdrop-filter:backdrop-blur-md'
          : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground',
                      active ? 'text-accent-strong' : 'text-muted-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={cn(buttonVariants(), 'hidden sm:inline-flex')}>
            Request a booking
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon-touch' }), 'lg:hidden')}
          >
            <Menu className="size-6" aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </header>
  )
}

function Wordmark() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2 rounded-xl">
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl bg-brand-teal font-heading text-lg font-bold text-brand-night"
      >
        W
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-semibold text-foreground">Wisdom City</span>
        <span className="text-xs text-muted-foreground">Homes and Apartment</span>
      </span>
      <span className="sr-only">{site.name.value} — home</span>
    </Link>
  )
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="surface-dark fixed inset-0 z-50 flex flex-col lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Wordmark />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className={buttonVariants({ variant: 'ghost', size: 'icon-touch' })}
            >
              <X className="size-6" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-between gap-8 overflow-y-auto px-4 pt-8 pb-8 sm:px-6">
            <motion.ul
              className="flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-14 items-center rounded-2xl px-4 font-heading text-3xl transition-colors hover:bg-accent',
                        active ? 'text-accent-strong' : 'text-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>

            <Link href="/contact" onClick={onClose} className={cn(buttonVariants({ size: 'lg' }), 'w-full')}>
              Request a booking
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
