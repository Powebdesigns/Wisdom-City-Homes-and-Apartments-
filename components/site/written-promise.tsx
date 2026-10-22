import { BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Ticket-style "Written Promise" seal repeated on the trust pages. */
export function WrittenPromise({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        'relative flex items-start gap-4 overflow-hidden rounded-3xl border-2 border-dashed border-accent-strong/50 bg-accent p-5 sm:p-6',
        className,
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-accent-strong shadow-soft">
        <BadgeCheck className="size-6" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-strong">Written Promise</p>
        <h2 className="text-xl">{title}</h2>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </aside>
  )
}
