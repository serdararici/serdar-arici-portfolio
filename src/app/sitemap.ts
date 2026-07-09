import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://serdararici.vercel.app';
const locales = ['tr', 'en'] as const;
const staticRoutes = ['', '/about', '/projects', '/blogs', '/contact'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, project_date');

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'yearly' : 'monthly') as 'yearly' | 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  const projectEntries: MetadataRoute.Sitemap = (projects ?? []).flatMap(
    ({ slug, project_date }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/projects/${slug}`,
        lastModified: project_date ? new Date(project_date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  );

  return [...staticEntries, ...projectEntries];
}
