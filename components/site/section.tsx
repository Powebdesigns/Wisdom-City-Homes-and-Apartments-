import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type SectionProps = ComponentProps<'section'> & {
  tone: 'dark' | 'light'
}

/** Page section on the 8px grid; `tone` switches the full token set. */
export function Section({ tone, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(tone === 'dark' ? 'surface-dark' : 'surface-light', 'px-4 py-16 sm:px-6 md:py-24', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
