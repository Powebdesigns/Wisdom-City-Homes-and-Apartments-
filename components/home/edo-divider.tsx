/** Faint repeating lozenge-and-dot band, inspired by Edo bronze-plaque borders. */
export function EdoDivider() {
  return (
    <svg className="block h-6 w-full text-brand-teal" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="edo-band" width="48" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 1.5H48M0 22.5H48" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
          <polygon
            points="24,4 42,12 24,20 6,12"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.25"
          />
          <circle cx="24" cy="12" r="2.5" fill="currentColor" fillOpacity="0.35" />
          <circle cx="0" cy="12" r="1.5" fill="currentColor" fillOpacity="0.3" />
          <circle cx="48" cy="12" r="1.5" fill="currentColor" fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="24" fill="url(#edo-band)" />
    </svg>
  )
}
