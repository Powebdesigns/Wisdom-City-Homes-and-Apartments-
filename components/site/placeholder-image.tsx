import type { ImagePlaceholder } from '@/src/content/site'
import { cn } from '@/lib/utils'
import { ImageIcon, type LucideIcon } from 'lucide-react'
import { SampleBadge } from './sample-badge'

type PlaceholderImageProps = {
  image: ImagePlaceholder
  className?: string
  aspect?: string
  /** Large centered icon so the block doesn't feel empty */
  icon?: LucideIcon
  /** Faint Edo-inspired lozenge pattern overlay */
  pattern?: boolean
  /** Set false when the parent card already shows its own Sample badge */
  showBadge?: boolean
}

const EDO_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" stroke="#19D3C5" stroke-opacity="0.22" stroke-width="1.2"><polygon points="20,4 36,20 20,36 4,20"/><polygon points="20,13 27,20 20,27 13,20"/></g><circle cx="20" cy="20" r="1.8" fill="#19D3C5" fill-opacity="0.3"/><circle cx="0" cy="0" r="1.5" fill="#F4F7FB" fill-opacity="0.18"/><circle cx="40" cy="40" r="1.5" fill="#F4F7FB" fill-opacity="0.18"/></svg>',
)}")`

export function PlaceholderImage({
  image,
  className,
  aspect = 'aspect-[4/3]',
  icon: Icon,
  pattern = false,
  showBadge = true,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={image.label}
      className={cn(
        'surface-dark relative flex flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-4 shadow-soft',
        image.gradient,
        aspect,
        className,
      )}
    >
      {pattern && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: EDO_PATTERN, backgroundSize: '40px 40px' }}
          aria-hidden="true"
        />
      )}
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center pb-10" aria-hidden="true">
          <span className="flex size-20 items-center justify-center rounded-full border border-brand-teal/30 bg-brand-night/60 shadow-soft">
            <Icon className="size-9 text-brand-teal" strokeWidth={1.5} />
          </span>
        </div>
      )}
      <SampleBadge show={showBadge && image.demo} className="absolute top-4 left-4 bg-brand-night/80 text-brand-teal" />
      <div className="relative flex items-center gap-2 rounded-xl bg-brand-night/80 px-3 py-2 text-sm text-brand-mist">
        <ImageIcon className="size-4 shrink-0 text-brand-teal" aria-hidden="true" />
        <span>{image.label}</span>
      </div>
    </div>
  )
}
