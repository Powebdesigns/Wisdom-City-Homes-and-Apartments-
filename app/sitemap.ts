import type { MetadataRoute } from 'next'
import { SITE_URL, site } from '@/src/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = ['', '/apartments', '/power', '/fees', '/check-in', '/contact']
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 })),
    ...site.apartments.map((a) => ({ url: `${SITE_URL}/apartments/${a.slug}`, lastModified: now, priority: 0.7 })),
  ]
}
