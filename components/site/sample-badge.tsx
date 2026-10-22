import { cn } from '@/lib/utils'
import { SHOW_SAMPLE_BADGES } from '@/src/content/site'

type SampleBadgeProps = {
  /** Only renders when true — pass the `demo` flag from site.ts */
  show?: boolean
  className?: string
}

export function SampleBadge({ show = true, className }: SampleBadgeProps) {
  if (!show || !SHOW_SAMPLE_BADGES) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-dashed border-current px-2 py-0.5 align-middle font-sans text-xs font-semibold uppercase tracking-wider text-accent-strong',
        className,
      )}
      title="Placeholder content — not a confirmed business fact"
    >
      Sample
      <span className="sr-only">: placeholder content, not confirmed</span>
    </span>
  )
}
