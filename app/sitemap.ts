import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://njrajatmahotsav.com'

  const routes = [
    '',
    '/registration',
    '/latest-events',
    '/schedule',
    '/community-seva',
    '/spiritual-seva',
    '/guest-services',
    '/media',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/latest-events' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/registration' ? 0.9 : 0.8,
  }))
}
