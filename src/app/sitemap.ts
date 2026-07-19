import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.vercel.app';
const locales = ['tr', 'en'] as const;
const staticRoutes = ['', '/about', '/projects', '/blogs', '/contact'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: projects }, { data: blogs }] = await Promise.all([
    supabase.from('projects').select('slug, project_date'),
    supabase.from('blogs').select('slug, published_date'),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'yearly' : 'monthly') as 'yearly' | 'monthly',
      priority: route === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          tr: `${BASE_URL}/tr${route}`,
          en: `${BASE_URL}/en${route}`,
        },
      },
    }))
  );

  const projectEntries: MetadataRoute.Sitemap = (projects ?? []).flatMap(
    ({ slug, project_date }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/projects/${slug}`,
        lastModified: project_date ? new Date(project_date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr/projects/${slug}`,
            en: `${BASE_URL}/en/projects/${slug}`,
          },
        },
      }))
  );

  const blogEntries: MetadataRoute.Sitemap = (blogs ?? []).flatMap(
    ({ slug, published_date }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/blogs/${slug}`,
        lastModified: published_date ? new Date(published_date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr/blogs/${slug}`,
            en: `${BASE_URL}/en/blogs/${slug}`,
          },
        },
      }))
  );

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
