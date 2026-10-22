import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/src/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/design-test', '/api/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
